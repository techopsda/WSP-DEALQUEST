import { SupabaseFile } from '../../types/SupabaseFile';
import { SupabaseClient } from '@supabase/supabase-js';
import { isArray } from 'lodash';

export const constructFileObjects = async (
  table: string,
  rowId: string,
  fileColumn: string,
  folderPath: string,
  formattedFileObjects: SupabaseFile[],
  supabase: SupabaseClient,
  allowMultiple?: boolean
) => {
  if (allowMultiple) {
    const { data: oldObject } = await supabase.from(table).select().eq('id', rowId).maybeSingle();

    const oldFileArray = oldObject?.[fileColumn];
    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/filebucket/${folderPath}`;

    return [
      ...(oldFileArray && isArray(oldFileArray)
        ? oldFileArray.filter(
            (file) => !formattedFileObjects.find((fileObject) => `${baseUrl}/${fileObject.title}` === file?.src)
          )
        : []),
      ...formattedFileObjects.map((formattedFileObject) => {
        return {
          src: `${baseUrl}/${formattedFileObject.title}`,
          title: formattedFileObject.title
        };
      })
    ];
  }

  return formattedFileObjects.map((formattedFileObject) => {
    return {
      src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/filebucket/${folderPath}/${formattedFileObject.title}`,
      title: formattedFileObject.title,
      path: `${folderPath}/${formattedFileObject.title}`
    };
  });
};
