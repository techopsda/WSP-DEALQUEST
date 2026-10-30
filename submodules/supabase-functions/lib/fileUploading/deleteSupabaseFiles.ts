import { SupabaseClient } from '@supabase/supabase-js';
import { getDeletedFilesObject } from './getDeletedFilesObject';

export const deleteSupabaseFiles = async (
  previousData: { src: string; title: string }[],
  newData: { src: string; title: string }[],
  table: string,
  schema: string,
  fileColumn: string,
  rowId: string,
  supabase: SupabaseClient
) => {
  const deletedItems = previousData.filter((prevItem) => !newData.find((newItem) => newItem.src === prevItem.src));

  await supabase
    .from(table)
    .update({
      [fileColumn]: await getDeletedFilesObject(table, rowId, fileColumn, deletedItems, supabase)
    })
    .eq('id', rowId);

  deletedItems.forEach(async (deletedItem) => {
    await supabase.storage.from('filebucket').remove([`${schema}/${table}/${rowId}/${deletedItem.title}`]);
  });
};
