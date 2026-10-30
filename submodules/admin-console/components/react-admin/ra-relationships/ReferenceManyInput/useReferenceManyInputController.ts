// @ts-nocheck
import get from 'lodash/get';
import { useRef, useCallback } from 'react';
import {
  SortPayload,
  useGetManyReference,
  useRecordContext,
  useResourceContext,
  Validator,
  ArrayInputContextValue,
  useRegisterMutationMiddleware,
  useDataProvider,
  useNotify,
  composeSyncValidators,
  useGetValidationErrorMessage,
  useSaveContext
} from 'react-admin';
import { useFieldArray, useFormContext } from 'react-hook-form';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

import { ReferenceManyInputPrefix } from './constants';

export const useReferenceManyInputController = (
  options: UseReferenceManyInputControllerOptions
): UseReferenceManyInputControllerValue => {
  const {
    reference,
    target,
    source = 'id',
    page = 1,
    perPage = 25,
    sort = { field: 'id', order: 'DESC' },
    filter,
    defaultValue,
    validate
  } = options;

  const saveContext = useSaveContext();

  if (saveContext.mutationMode === 'undoable') {
    throw new Error(
      'ReferenceManyInputController cannot be used with undoable mutations. Set mutationMode="optimistic" or mutationMode="pessimistic" in the parent <Edit> or <Create>.'
    );
  }
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const resource = useResourceContext(options);
  const record = useRecordContext(options);

  const sanitizedValidate = Array.isArray(validate) ? composeSyncValidators(validate) : validate;
  const getValidationErrorMessage = useGetValidationErrorMessage();

  /**
   * Prepare the field array
   *
   * As the edited record does not contains the references in a one-to-many
   * relationship, we have to store them in a temporary field in the current form,
   * named according to the one-to-many configuration.
   * This field will be removed from the form values before the final submit
   * */
  const temporaryFieldName = getReferenceManyFormField({
    resource,
    reference,
    target
  });

  const form = useFormContext();

  const fieldArray = useFieldArray({
    name: temporaryFieldName,
    rules: {
      validate: async (value) => {
        if (!sanitizedValidate) return true;
        const error = await sanitizedValidate(value, form.getValues(), options);

        if (!error) return true;
        return getValidationErrorMessage(error);
      }
    }
  });

  /**
   * Get the records related to the current value
   */
  const references = useRef([]);

  const { error, isLoading, isFetching, refetch } = useGetManyReference(
    reference,
    {
      target,
      id: get(record, source),
      pagination: { page, perPage },
      sort,
      filter
    },
    {
      enabled: typeof record === 'object' && record.hasOwnProperty(source),
      onSuccess: (res) => {
        // filter out not found references - happens when the dataProvider doesn't guarantee referential integrity
        const finalData = res.data ? res.data.filter(Boolean) : [];
        references.current = finalData;
        if (finalData.length === 0 && defaultValue) {
          form.setValue(
            temporaryFieldName,
            defaultValue.map((value) => ({
              ...value
            })),
            { shouldDirty: true }
          );
        } else {
          form.setValue(temporaryFieldName, finalData, {
            shouldDirty: false,
            shouldValidate: false,
            shouldTouch: false
          });
        }
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  /**
   * Handle the submit of the form
   */
  const middleware = useCallback(
    async (resource, params, options, next) => {
      const { data, ...otherParams } = params;
      const { onSuccess, ...otherOptions } = options;
      const newReferences = get(data, temporaryFieldName);
      const sanitizedData = omit(data, temporaryFieldName.split('.')[0]);

      /**
       * After the main record has been saved, we need to save the changes in the references.
       * Users can add, edit and remove references. We must compute the difference between the
       * old and the new references to know what to do.
       */
      const handleSuccess = async (data) => {
        // prepare dictionaries of old and new refrences to ease diffing
        // { 123: { id: 123, name: 'John' }, 456: { id: 456, name: 'Paul' } }
        const oldReferencesById = references.current.reduce(
          (acc, reference) => ({ ...acc, [reference.id]: reference }),
          {}
        );
        const newReferencesById = newReferences.reduce((acc, reference) => ({ ...acc, [reference.id]: reference }), {});

        // compute diff
        const removedReferences = references.current.filter(
          (reference) => !newReferencesById.hasOwnProperty(reference.id)
        );
        const addedReferences = newReferences.filter(
          // new references don't yet have an id
          (reference) => !reference.hasOwnProperty('id')
        );
        const updatedReferences = newReferences.filter(
          (reference) =>
            // not a new reference
            reference.hasOwnProperty('id') &&
            // reference has changed
            !isEqual(oldReferencesById[reference.id], reference)
        );

        // prepare queries for diff
        const queries = [];
        if (removedReferences.length > 0) {
          queries.push(
            dataProvider.deleteMany(reference, {
              ids: removedReferences.map(({ id }) => id)
            })
          );
        }
        if (addedReferences.length > 0) {
          addedReferences.forEach((addedReference) =>
            queries.push(
              dataProvider.create(reference, {
                data: {
                  ...addedReference,
                  [target]: get(data, source)
                }
              })
            )
          );
        }
        if (updatedReferences.length > 0) {
          updatedReferences.forEach((updatedReference) =>
            queries.push(
              dataProvider.update(reference, {
                id: updatedReference.id,
                data: updatedReference,
                previousData: references.current.find((oldRef) => oldRef.id === updatedReference.id)
              })
            )
          );
        }

        // run all queries in parallel
        try {
          await Promise.all(queries);
        } catch (error) {
          notify('ra-relationships.referenceManyInput.saveError', {
            type: 'error',
            messageArgs: {
              _: 'Server error: your changes were not completely saved'
            }
          });
          // do not execute success side effects
          return;
        }

        if (sanitizedData.hasOwnProperty(source)) {
          // if we're in an edit page (not a create page)
          // force refresh (and update of references.current) to allow further saves
          refetch();
        }

        if (onSuccess) {
          onSuccess(data);
        }
      };
      next(
        resource,
        {
          ...otherParams,
          data: sanitizedData
        },
        {
          ...otherOptions,
          onSuccess: handleSuccess
        }
      );
    },
    [dataProvider, notify, reference, refetch, source, target, temporaryFieldName]
  );
  useRegisterMutationMiddleware(middleware);

  return {
    fieldArray,
    error,
    isLoading,
    isFetching,
    refetch,
    temporaryFieldName
  };
};

export interface UseReferenceManyInputControllerOptions {
  debounce?: number;
  reference: string;
  record?: any;
  target: string;
  resource?: string;
  source?: string;
  page?: number;
  perPage?: number;
  sort?: SortPayload;
  filter?: any;
  validate?: Validator | Validator[];
  defaultValue?: any[];
}

export interface UseReferenceManyInputControllerValue {
  fieldArray: ArrayInputContextValue;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch?: () => void;
  temporaryFieldName: string;
}

/**
 * Get virtual field name
 *
 * The '0.{reference} suffix is there to trigger a correct default label
 * (see <FieldTitle> for details)
 *
 * @example
 * getReferenceManyFormField({ resource: 'teachers', referecne: 'students', target: 'teacher_id' })
 * // @@ra-many/teachers/students/teacher_id.0.students
 */
const getReferenceManyFormField = ({
  resource,
  reference,
  target
}: {
  resource: string;
  reference: string;
  target: string;
}): string => `${ReferenceManyInputPrefix}${resource}/${reference}/${target}.0.${reference}`;
