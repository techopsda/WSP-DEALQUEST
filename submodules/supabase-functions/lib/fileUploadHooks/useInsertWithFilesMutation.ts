import { FormatFilesFunctionObject } from '../../types/FormatFilesFunction';
import { formatFiles } from '@/submodules/supabase-functions/lib/fileUploadHooks/formatFiles';
import {
  UsePostgrestSWRMutationOpts,
  useInsertMutation,
  useUpsertMutation
} from '@supabase-cache-helpers/postgrest-swr';
import { StorageFileApi, UploadFileResponse, useUpload } from '@supabase-cache-helpers/storage-swr';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';
import { GetResult } from '@supabase/postgrest-js/dist/module/select-query-parser';
import _ from 'lodash';
import { SWRMutationConfiguration } from 'swr/mutation';
import { GenericSchema, GenericTable, PostgrestError } from '@supabase/postgrest-js/dist/module/types';
import { StorageError } from '@supabase/storage-js';

type PostgrestConfig<R> = Pick<SWRMutationConfiguration<R[] | null, PostgrestError>, 'onSuccess' | 'onError'>;

type Config<R> = {
  insert: PostgrestConfig<R>;
  upload: Pick<SWRMutationConfiguration<UploadFileResponse[], StorageError>, 'onSuccess' | 'onError'>;
  upsert: PostgrestConfig<R>;
};

export const useInsertWithFilesMutation = <
  S extends GenericSchema,
  T extends GenericTable,
  Q extends string = '*',
  Re = T extends { Relationships: infer R } ? R : unknown,
  R = GetResult<S, T['Row'], Re, Q extends '*' ? '*' : Q>
>(
  qb: PostgrestQueryBuilder<S, T, Re>,
  fileApi: StorageFileApi,
  primaryKeys: (keyof T['Row'])[],
  query?: Q extends `${infer Any}*${infer Any}` ? 'Wildcard selector is not allowed' : Q | null,
  insertOpts?: UsePostgrestSWRMutationOpts<S, T, Re, 'Insert', Q, R>,
  updateOpts?: UsePostgrestSWRMutationOpts<S, T, Re, 'Upsert', Q, R>
) => {
  const { trigger: insert } = useInsertMutation(qb, primaryKeys, query, insertOpts);
  const { trigger: update } = useUpsertMutation(qb, primaryKeys, query, updateOpts);
  const { trigger: upload } = useUpload(fileApi);

  const querySchema = qb?.schema;
  const queryTable = qb?.url?.pathname?.split('/')?.at(-1);

  const insertWithFilesMutation = async (
    data: T['Insert'][],
    files: FormatFilesFunctionObject<T['Insert']>,
    config?: Config<R>
  ) => {
    await insert(data, {
      onSuccess: async (data) => {
        for (const dataItem of data ?? []) {
          const folderPath = `${querySchema}/${queryTable}/${(dataItem as { id: string })?.id}`;

          Object.entries(files).map(async ([fileColumn, fileArray]) => {
            if (fileArray)
              await upload(
                {
                  files: await formatFiles(fileArray),
                  path: folderPath
                },
                {
                  onSuccess: async (filePaths) => {
                    const filePath = filePaths[0]?.data?.path;
                    const src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/filebucket/${filePath}`;

                    void update(
                      [
                        {
                          ...dataItem,
                          [fileColumn]: [{ title: filePath?.split('/')?.at(-1), src }]
                        }
                      ],
                      config?.upsert
                    );
                  },
                  onError: config?.upload?.onError
                }
              );
          });
        }
      },
      onError: config?.insert?.onError
    });
  };

  return { trigger: insertWithFilesMutation };
};
