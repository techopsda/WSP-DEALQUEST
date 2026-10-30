import { DataProvider } from 'react-admin';
import _, { isArray } from 'lodash';
import { UpdateParams } from 'react-admin';
import { SupabaseResource } from '../../types/SupabaseResource';
import { getSchemaForResource } from '../getSchemaForResource';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseFileObjectAndUploadToSupabase } from '@/submodules/supabase-functions/lib/fileUploading/createSupabaseFileObjectAndUploadToSupabase';
import { deleteSupabaseFiles } from '@/submodules/supabase-functions/lib/fileUploading/deleteSupabaseFiles';

export const handleSupabaseUpdate = async (
  resource: string,
  params: UpdateParams<any>,
  baseDataProvider: DataProvider<string>,
  resources: SupabaseResource[],
  supabase: SupabaseClient
) => {
  const schema = getSchemaForResource(resource, resources);

  return new Promise((resolve) => {
    let newParams = { ...params };
    Object.entries(params.data).forEach(async ([key, value]) => {
      if (isArray(value) && schema) {
        const fileArrayValues = value?.filter((arrayValue) => arrayValue?.src);

        await createSupabaseFileObjectAndUploadToSupabase(
          supabase,
          schema,
          resource,
          key,
          params?.data?.id,
          fileArrayValues,
          true
        );

        value.forEach(async (arrayValue) => {
          if (arrayValue?.src) {
            newParams.data = { ...newParams, data: _.omit(newParams.data, key) } as UpdateParams<any>;
          }
        });

        const filesMissing = params?.previousData[key]?.filter(
          (prevItem: { src: string }) =>
            !params?.data[key]?.find((newItem: { src: string }) => newItem.src === prevItem.src)
        );

        if (filesMissing?.length > 0) {
          await deleteSupabaseFiles(
            params?.previousData[key],
            params?.data[key],
            resource,
            schema,
            key,
            params?.data?.id,
            supabase
          );
        }
      }
    });

    resolve(newParams);
  }).then((newParams) => {
    return baseDataProvider.update(resource, newParams as UpdateParams<any>);
  });
};
