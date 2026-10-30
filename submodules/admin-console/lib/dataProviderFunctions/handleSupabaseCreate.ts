import { SupabaseClient } from '@supabase/supabase-js';
import _, { isArray } from 'lodash';
import { CreateParams, DataProvider } from 'react-admin';
import { SupabaseResource } from '../../types/SupabaseResource';
import { handleSupabaseUpdate } from './handleSupabaseUpdate';

export const handleSupabaseCreate = async (
  resource: string,
  params: CreateParams<any>,
  baseDataProvider: DataProvider<string>,
  resources: SupabaseResource[],
  supabase: SupabaseClient
) => {
  const fileDataKeys = Object.keys(_.pickBy(params.data, (item) => isArray(item) && item[0]?.rawFile));

  if (fileDataKeys?.length > 0) {
    const dataWithoutFiles = _.omit(params.data, fileDataKeys);
    const newData = await baseDataProvider.create(resource, { data: dataWithoutFiles, meta: undefined });

    return handleSupabaseUpdate(
      resource,
      { data: { ...params.data, id: newData?.data?.id }, previousData: {}, id: newData?.data?.id ?? '' },
      baseDataProvider,
      resources,
      supabase
    );
  }

  return baseDataProvider.create(resource, params);
};
