// @ts-nocheck
import { useCallback } from 'react';
import { Identifier, useDataProvider, useNotify, TransformData, GetManyReferenceResult } from 'react-admin';
import { useQueryClient, UseMutationOptions } from 'react-query';
import { UsingRegexp } from './constants';

export const useUpdateManyToManyReferences = (): UpdateManyToManyReferencesResult => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useCallback(
    async ({ newReferences, resourceId, through, using, perPage }, { mutationOptions = {}, transform } = {}) => {
      const { onError } = mutationOptions || {};
      const [, sourceField, targetField] = using.match(UsingRegexp);
      let throughManyReferences: GetManyReferenceResult;

      try {
        // Fetch the current associative records
        throughManyReferences = await dataProvider.getManyReference(through, {
          target: sourceField,
          id: resourceId,
          filter: {},
          sort: { field: 'id', order: 'ASC' },
          pagination: { page: 1, perPage: perPage }
        });
      } catch (error) {
        if (onError) {
          return onError(error, 'fetchLinkRecords');
        }
        const errorMessage =
          typeof error === 'string'
            ? error
            : // NOTE: We might have to introduce a new message instead of http_error
              error.message || 'ra.notification.http_error';
        notify(errorMessage, { type: 'warning' });
        return;
      }

      const previousReferences = throughManyReferences.data.map(
        (throughManyReference) => throughManyReference[targetField]
      );

      const { addedReferences, removedReferences } = computeReferencesDiff(previousReferences, newReferences);

      if (removedReferences.length > 0) {
        const ids = throughManyReferences.data
          .filter((throughManyReference) => removedReferences.includes(throughManyReference[targetField]))
          .map((throughManyReference) => throughManyReference.id);

        // We use the dataProvider directly here to avoid react-query cache updates
        // as it would make the input shows invalid data until everything is done
        // for the references update
        await dataProvider
          .deleteMany(through, {
            ids
          })
          .catch((error) => {
            if (onError) {
              return onError(error, 'deleteLinkRecords', ids);
            }
          });
      }

      if (addedReferences.length > 0) {
        await Promise.all(
          addedReferences.map((referenceId) => {
            const data = {
              [sourceField]: resourceId,
              [targetField]: referenceId
            };
            const finalData = transform ? transform(data) : data;
            // We use the dataProvider directly here to avoid react-query cache updates
            // as it would make the input shows invalid data until everything is done
            // for the references update
            return dataProvider
              .create(through, {
                data: finalData
              })
              .catch((error) => {
                if (onError) {
                  return onError(error, 'createLinkRecord', data);
                }
              });
          })
        );
      }

      if (addedReferences.length > 0 || removedReferences.length > 0) {
        // If we updated the references, we need to invalidate the cache for its queries
        await queryClient.invalidateQueries([through, 'getManyReference']);
      }
    },
    [dataProvider, notify, queryClient]
  );
};

export const computeReferencesDiff = (
  previousReferences: Identifier[],
  newReferences: Identifier[]
): {
  addedReferences: Identifier[];
  removedReferences: Identifier[];
} => {
  const removedReferences = previousReferences.filter(
    (previousReference) => !newReferences.includes(previousReference)
  );

  const addedReferences = newReferences.filter((referenceId) => !previousReferences.includes(referenceId));

  return {
    addedReferences,
    removedReferences
  };
};

export type UpdateManyToManyReferencesResult = (
  {
    newReferences,
    resourceId,
    through,
    using,
    perPage
  }: {
    newReferences: Identifier[];
    resourceId: Identifier;
    through: string;
    using: string;
    perPage: number;
  },
  {
    mutationOptions,
    transform
  }?: {
    mutationOptions?: UpdateManyToManyReferenceMutationOptions;
    transform?: TransformData;
  }
) => Promise<void>;

export type UpdateManyToManyReferenceMutationOptions = Omit<
  UseMutationOptions<unknown, unknown, unknown>,
  'onError'
> & {
  onError?: (error: unknown, stage: UpdateManyToManyReferenceMutationStages, data?: unknown) => void;
};

export type UpdateManyToManyReferenceMutationStages = 'fetchLinkRecords' | 'createLinkRecord' | 'deleteLinkRecords';
