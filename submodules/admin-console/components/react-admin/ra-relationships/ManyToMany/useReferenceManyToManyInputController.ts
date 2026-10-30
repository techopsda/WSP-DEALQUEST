// @ts-nocheck
import { useEffect, useState, useMemo } from 'react';
import {
  ChoicesContextValue,
  composeValidators,
  RaRecord,
  SortPayload,
  useGetList,
  useGetMany,
  useGetManyReference,
  useInput,
  useRecordContext,
  useResourceContext,
  Validator
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import sortBy from 'lodash/sortBy';

import { UsingRegexp } from './constants';
import getReferenceManyToManyFormField from './getReferenceManyToManyFormField';
import { useReferenceParams } from './useReferenceParams';
import { useRegisterManyToManyHandling } from './useRegisterManyToManyHandling';

/**
 * Hook that fetches records from another resource in a many to many scenario implemented with an associative resource.
 *
 * @example
 *
 * const { ids, data, error, loaded, loading, total } = useReferenceManyToManyInputController({
 *      record: { id: 1, name: 'Eric Clapton' },
 *      reference: 'events',
 *      resource: 'artists',
 *      sort: { field: 'name', order: 'ASC' },
 *      source: 'id',
 *      through: 'performances',
 *      using: 'artist_id,event_id'
 * });
 *
 * @param {Object} options
 * @param {boolean} options.filter Filters to send with the request
 * @param {string} options.reference The linked resource name
 * @param {string} options.resource The current resource name
 * @param {Object} options.sort The sort parameters
 * @param {string} options.sort.field The field used for sorting
 * @param {string} options.sort.order The sort order (asc, desc)
 * @param {string} options.source The key of the linked resource identifier
 * @param {string} options.through The name of the associative resource
 * @param {string} options.using A comma separated list of two field names which are the ids of the two linked resource in the associative resource
 * @param {number} options.perPage Optional. The number of events to fetch. Defaults to 25
 *
 * @returns {ReferenceArrayProps} The reference props
 */
export const useReferenceManyToManyInputController = <RecordType extends RaRecord = RaRecord>(
  options: UseReferenceManyToManyInputControllerOptions<RecordType>
): ChoicesContextValue<RecordType> => {
  const {
    debounce,
    filter,
    filterChoices: initialFilterChoices = options.filterEndResource,
    perPage: initialPerPage = 25,
    perPageChoices: initialPerPageChoices = options.perPageEndResource || 25,
    reference,
    sort: initialSort,
    sortChoices: initialSortChoices = options.sortEndResource,
    through,
    using,
    validate
  } = options;

  if (options.perPageEndResource != null && process.env.NODE_ENV === 'development') {
    console.warn(`The perPageEndResource prop is deprecated. You should provide the perPageChoices prop instead.`);
  }

  if (options.sortEndResource != null && process.env.NODE_ENV === 'development') {
    console.warn(`The sortEndResource prop is deprecated. You should provide the sortChoices prop instead.`);
  }

  if (options.filterEndResource != null && process.env.NODE_ENV === 'development') {
    console.warn(`The filterEndResource prop is deprecated. You should provide the filterChoices prop instead.`);
  }

  const resource = useResourceContext(options);

  useRegisterManyToManyHandling({
    reference,
    resource,
    through,
    using,
    perPage: initialPerPage
  });
  if (!using.match(UsingRegexp)) {
    throw new Error(
      'useReferenceManyToManyInputController incorrect `using` option format. `using` should be a string of two fields separated by a comma  such as `book_id,author_id`'
    );
  }

  const record = useRecordContext(options);
  const [, sourceField, targetField] = using.match(UsingRegexp);

  // As the edited record does not contains the references in a many-to-many
  // relationship, we have to store them in a temporary field in the current form,
  // named according to the many-to-many configuration.
  // This field will be removed from the form values before the final submit
  const temporaryFieldName = getReferenceManyToManyFormField({
    reference,
    resource,
    through
  });
  const [temporaryFieldInitialValue, setTemporaryFieldInitialValue] = useState();
  const form = useFormContext();
  const { fieldState } = useInput({
    source: temporaryFieldName,
    // Artificial pristine / dirty system
    defaultValue: temporaryFieldInitialValue,
    validate: composeValidators(validate)
  });

  const [params] = useReferenceParams({
    resource: reference,
    // TODO: Introduce real pagination (setters, etc.)
    page: 1,
    perPage: initialPerPage,
    sort: initialSort,
    debounce,
    filter
  });

  const throughManyReferences = useGetManyReference(
    through,
    {
      id: record?.id,
      target: sourceField,
      pagination: { page: params.page, perPage: params.perPage },
      sort: {
        field: params.sort,
        order: params.order
      },
      filter: params.filter
    },
    {
      enabled: !!record?.id
    }
  );
  const throughManyReferencesIds = throughManyReferences.data
    ? throughManyReferences.data.map((record) => record.id)
    : [];
  const referencesIds = throughManyReferencesIds.reduce((acc, id) => {
    const record = throughManyReferences.data.find((item) => item.id === id);
    if (record) {
      if (acc.indexOf(record[targetField]) === -1) {
        acc.push(record[targetField]);
      }
    }

    return acc;
  }, []);

  const referenceIdsEffectSignature = referencesIds.join(',');
  const { isDirty } = fieldState;
  // This hook is used to set the temporary field value when loading the form for the first time
  // and also after submission (because the temporary field is removed from the record)
  useEffect(
    () => {
      if (isDirty) {
        return;
      }
      if (referencesIds.length) {
        form.setValue(temporaryFieldName, referencesIds, {
          shouldDirty: false,
          shouldValidate: false,
          shouldTouch: false
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, referenceIdsEffectSignature, temporaryFieldName, temporaryFieldInitialValue, targetField]
  );

  // This hook is used to reset the temporary field's default value whenever the references ids
  // (fetched from the api) change
  useEffect(
    () => {
      form.resetField(temporaryFieldName, {
        defaultValue: referencesIds
      });
      setTemporaryFieldInitialValue(referencesIds);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceIdsEffectSignature, temporaryFieldName]
  );

  const [paramsEndResource, paramsEndResourceModifiers] = useReferenceParams({
    resource: reference,
    // TODO: Introduce real pagination (setters, etc.)
    page: 1,
    perPage: initialPerPageChoices,
    sort: initialSortChoices,
    debounce,
    filter: initialFilterChoices
  });
  // Load all possible references
  const possibleValues = useGetList<RecordType>(
    reference,
    {
      pagination: {
        page: paramsEndResource.page,
        perPage: paramsEndResource.perPage
      },
      sort: {
        field: paramsEndResource.sort,
        order: paramsEndResource.order
      },
      filter: paramsEndResource.filter
    },
    {
      keepPreviousData: true
    }
  );

  const currentValue = useWatch({
    name: temporaryFieldName,
    defaultValue: temporaryFieldInitialValue
  });

  useEffect(() => {
    if (
      !possibleValues.isLoading &&
      (currentValue || []).length > 0 &&
      (currentValue || []).some((id) => !possibleValues.data.some((record) => record.id === id))
    ) {
      possibleValues.refetch();
    }
  }, [(currentValue || []).join(), possibleValues.refetch]); // eslint-disable-line

  // Ensure the current references are loaded
  const references = useGetMany(reference, { ids: currentValue || [] });

  const currentSort = useMemo(
    () => ({
      field: params.sort,
      order: params.order
    }),
    [params.sort, params.order]
  );

  const allChoices = useMemo(() => {
    const choices = [...(possibleValues?.data ?? [])];

    // Only add the selected records if they are not already in the choices
    (references?.data ?? []).forEach((record) => {
      if (choices.find((choice) => choice.id === record.id) === undefined) {
        choices.push(record);
      }
    });

    const sorted = sortBy(choices, paramsEndResource.sort);
    if (paramsEndResource.order === 'DESC') {
      return sorted.reverse();
    }
    return sorted;
  }, [possibleValues.data, references.data, paramsEndResource.sort, paramsEndResource.order]);

  return {
    allChoices,
    availableChoices: possibleValues.data,
    displayedFilters: paramsEndResource.displayedFilters,
    error: throughManyReferences.error || references.error || possibleValues.error,
    filterValues: paramsEndResource.filterValues,
    hasNextPage: throughManyReferences.pageInfo
      ? throughManyReferences.pageInfo.hasNextPage
      : throughManyReferences.total != null
      ? params.page * params.perPage < throughManyReferences.total
      : undefined,
    hasPreviousPage: throughManyReferences.pageInfo ? throughManyReferences.pageInfo.hasPreviousPage : params.page > 1,
    hideFilter: paramsEndResourceModifiers.hideFilter,
    isFetching: throughManyReferences.isFetching || references.isFetching || possibleValues.isFetching,
    isLoading: throughManyReferences.isLoading || references.isLoading || possibleValues.isLoading,
    page: paramsEndResource.page,
    perPage: paramsEndResource.perPage,
    refetch: throughManyReferences.refetch,
    resource: reference,
    selectedChoices: references.data,
    setFilters: paramsEndResourceModifiers.setFilters,
    setPage: paramsEndResourceModifiers.setPage,
    setPerPage: paramsEndResourceModifiers.setPerPage,
    setSort: paramsEndResourceModifiers.setSort,
    showFilter: paramsEndResourceModifiers.showFilter,
    source: temporaryFieldName,
    sort: currentSort,
    total: throughManyReferences.total,
    isFromReference: true
  };
};

export interface UseReferenceManyToManyInputControllerOptions<RecordType extends RaRecord = RaRecord> {
  debounce?: number;
  filter?: Record<string, unknown>;
  /**
   * @deprecated filterEndResource is deprecated, use filterChoices instead
   */
  filterEndResource?: Record<string, unknown>;
  filterChoices?: Record<string, unknown>;
  perPage?: number;
  /**
   * @deprecated perPageEndResource is deprecated, use perPageChoices instead
   */
  perPageEndResource?: number;
  perPageChoices?: number;
  record?: RecordType;
  reference: string;
  resource?: string;
  sort?: SortPayload;
  /**
   * @deprecated sortEndResource is deprecated, use sortChoices instead
   */
  sortEndResource?: SortPayload;
  sortChoices?: SortPayload;
  source?: string;
  through: string;
  using: string;
  validate?: Validator | Validator[];
}
