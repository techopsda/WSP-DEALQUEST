import { SupabaseClient } from '@supabase/supabase-js';

export const getDeletedFilesObject = async (
  table: string,
  rowId: string,
  fileColumn: string,
  deletedFiles: { src: string }[],
  supabase: SupabaseClient
) => {
  const { data: oldObject } = await supabase.from(table).select().eq('id', rowId).maybeSingle();

  if (oldObject?.[fileColumn]) {
    const newObject = oldObject?.[fileColumn]?.filter(
      (file: { src: string }) => !deletedFiles.find((deletedFile) => file.src === deletedFile.src)
    );

    return newObject;
  }

  return [];
};
