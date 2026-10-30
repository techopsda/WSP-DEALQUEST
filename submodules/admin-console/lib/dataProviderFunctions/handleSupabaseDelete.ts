import { deleteFileFromSupabaseUsingFolderPath } from '@/submodules/supabase-functions/lib/fileUploading/deleteFileFromSupabaseUsingFolderPath';
import { SupabaseClient } from '@supabase/supabase-js';
import _, { isArray } from 'lodash';
import { DataProvider, DeleteParams } from 'react-admin';

export const handleSupabaseDelete = async (
  resource: string,
  params: DeleteParams<any>,
  baseDataProvider: DataProvider<string>,
  supabase: SupabaseClient
) => {
  const fileDataKeys = Object.keys(_.pickBy(params.previousData, (item) => isArray(item) && item[0]?.src));
  if (fileDataKeys.length > 0) {
    deleteFileFromSupabaseUsingFolderPath(`${resource}/${params.id}`, supabase);
  }

  return baseDataProvider.delete(resource, params);
};
