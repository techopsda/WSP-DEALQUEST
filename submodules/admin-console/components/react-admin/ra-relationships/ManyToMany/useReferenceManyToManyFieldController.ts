// @ts-nocheck

import get from 'lodash/get';
import uniq from 'lodash/uniq';
import { RaRecord, SortPayload, useGetMany, useGetManyReference, Identifier, useRecordContext } from 'react-admin';

import { UsingRegexp } from './constants';

/**
 * Hook that fetches records from another resource in a many to many scenario implemented with an associative resource.
 *
 * @example
 *
 * const { data, error, isFetching, isLoading, total } = useReferenceArrayFieldController({
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
 * @param {Object} options.record The current resource record
 * @param {string} options.reference The linked resource name
 * @param {string} options.resource The current resource name
 * @param {Object} options.sort The sort parameters
 * @param {string} options.sort.field The field used for sorting
 * @param {string} options.sort.order The sort order (asc, desc)
 * @param {string} options.source The key of the linked resource identifier
 * @param {string} options.through The name of the associative resource
 * @param {string} options.using A comma separated list of two field names which are the ids of the two linked resource in the associative resource
 * @param {boolean} options.unique Remove duplicates from the target table. defaults to true.
 *
 * @returns {UseReferenceManyToManyFieldValue} The reference props
 */
export const useReferenceManyToManyFieldController = (
  props: UseReferenceManyToManyFieldOptions
): UseReferenceManyToManyFieldValue => {
  const { filter, reference, sort, source = 'id', through, using, perPage = 25, unique = true } = props;
  if (!using.match(UsingRegexp)) {
    throw new Error(
      'useReferenceManyToManyFieldController incorrect `using` option format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`'
    );
  }

  const [, sourceField, targetField] = using.match(UsingRegexp);
  const record = useRecordContext(props);
  // TODO: Introduce real pagination (setters, etc.)
  const page = 1;
  const throughManyReferences = useGetManyReference(through, {
    target: sourceField,
    id: get(record, source),
    pagination: { page, perPage },
    sort,
    filter
  });

  const allReferencesIds = throughManyReferences.data
    ? throughManyReferences.data
        .map((record) => {
          return record[targetField];
        })
        .filter((id) => !!id)
    : [];

  const referencesIds: Identifier[] = unique ? uniq(allReferencesIds) : allReferencesIds;

  const references = useGetMany(reference, { ids: referencesIds });

  return {
    resource: reference,
    data: references.data,
    sort,
    error: throughManyReferences.error || references.error,
    isLoading: throughManyReferences.isLoading || references.isLoading,
    isFetching: throughManyReferences.isFetching || references.isFetching,
    total: throughManyReferences.total,
    hasNextPage: throughManyReferences.total != null ? page * perPage < throughManyReferences.total : undefined,
    hasPreviousPage: page > 1,
    page,
    perPage,
    refetch: () => {
      throughManyReferences.refetch();
      references.refetch();
    }
  };
};

export interface UseReferenceManyToManyFieldOptions {
  filter?: Record<string, unknown>;
  perPage?: number;
  record: RaRecord;
  reference: string;
  resource: string;
  sort: SortPayload;
  source?: string;
  through: string;
  using: string;
  unique?: boolean;
}

/**
 * @typedef UseReferenceManyToManyFieldValue
 * @type {Object}
 * @property {Object} currentSort The current sort parameters (field & order).
 * @property {Array} data Array holding the reference data
 * @property {Object} error the error returned by the dataProvider
 * @property {boolean} isFetching is the reference currently fetching
 * @property {boolean} isLoading is the reference currently loading
 * @property {number} page The currently displayed page
 * @property {number} perPage The number of items displayed on a single page
 * @property {number} total The total number of items matching the current filters
 */
export interface UseReferenceManyToManyFieldValue {
  sort: SortPayload;
  data: RaRecord[];
  error?: Error;
  isFetching: boolean;
  isLoading: boolean;
  page: number;
  perPage: number;
  resource: string;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
}
