import { SupabaseClient } from '@supabase/supabase-js';

export const deleteFileFromSupabaseUsingFolderPath = async (folderPath: string, supabase: SupabaseClient) => {
  const { data: filesToRemove } = await supabase.storage.from('filebucket').list(`${folderPath}`);
  const pathsToRemove = filesToRemove?.map((file) => `${folderPath}/${file.name}`) ?? [];

  if (pathsToRemove.length > 0) {
    await supabase.storage.from('filebucket').remove(pathsToRemove);
  }
};
