import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseFile } from '../../types/SupabaseFile';
import { constructFileObjects } from './constructFileObjects';
import { deleteFileFromSupabaseUsingFolderPath } from './deleteFileFromSupabaseUsingFolderPath';
import { formatFileForUpload } from './formatFileForUpload';

export const createSupabaseFileObjectAndUploadToSupabase = async (
  supabase: SupabaseClient,
  schema: string,
  table: string,
  fileColumn: string,
  rowId: string,
  files?: (SupabaseFile | File | undefined)[],
  allowMultiple?: boolean,
  upsert?: boolean,
  updateFunction?: (fileObject: any[]) => void | Promise<void>
) => {
  const folderPath = `${schema}/${table}/${rowId}`;
  const formattedFileObjects = await Promise.all(
    files?.map(async (file) => {
      const formattedFileObject = file instanceof File ? formatFileForUpload(file) : file;

      if (formattedFileObject && formattedFileObject?.title && formattedFileObject?.rawFile && rowId) {
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
          const buffer = e?.target?.result;

          if (buffer) {
            if (!allowMultiple) {
              await deleteFileFromSupabaseUsingFolderPath(folderPath, supabase);
            }

            await supabase.storage.from('filebucket').upload(`${folderPath}/${formattedFileObject.title}`, buffer, {
              upsert,
              contentType: formattedFileObject.type
            });
          }
        };

        fileReader.readAsArrayBuffer(formattedFileObject.rawFile);
      }

      return formattedFileObject;
    }) ?? []
  );

  const fileObjects = await constructFileObjects(
    table,
    rowId,
    fileColumn,
    folderPath,
    (formattedFileObjects.filter((fileObject) => fileObject !== undefined) as SupabaseFile[]) ?? [],
    supabase,
    allowMultiple
  );

  if (updateFunction) {
    await updateFunction(fileObjects);
  } else {
    await supabase
      .from(table)
      .update({ [fileColumn]: fileObjects })
      .eq('id', rowId);
  }
};
