import { deleteFileFromSupabaseUsingFolderPath } from '@/submodules/supabase-functions/lib/fileUploading/deleteFileFromSupabaseUsingFolderPath';
import { SupabaseClient } from '@supabase/supabase-js';
import { DataProvider, DeleteManyParams } from 'react-admin';

export const handleSupabaseDeleteMany = async (
  resource: string,
  params: DeleteManyParams<any>,
  baseDataProvider: DataProvider<string>,
  supabase: SupabaseClient
) => {
  params.ids.forEach(async (id) => {
    deleteFileFromSupabaseUsingFolderPath(`${resource}/${id}`, supabase);
  });

  return baseDataProvider.deleteMany(resource, params);
};
