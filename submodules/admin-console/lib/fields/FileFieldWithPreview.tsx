import { isArray } from 'lodash';
import { FileField, FunctionField } from 'react-admin';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Property } from '../../types/Property';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

interface FileFieldWithPreviewProps {
  property: Property;
}

export const FileFieldWithPreview: React.FC<FileFieldWithPreviewProps> = ({ property }) => {
  const { supabase } = useSupabase();

  return (
    <>
      <FileField source={property.name} src="src" title="title" target="_blank" />
      <FunctionField
        source={property.name}
        render={async (record: any) => {
          const recordProperty = record?.[property.name] ?? [];

          return (
            <>
              {recordProperty && isArray(recordProperty) && (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={
                    (await Promise.all(
                      recordProperty?.map(async (file: { src: string; path: string }) => {
                        const { data: fileData } = file?.path
                          ? await supabase.storage.from('filebucket').download(file.path)
                          : { data: null };

                        return { fileData: await fileData?.arrayBuffer(), uri: file.src, fileType: fileData?.type };
                      })
                    )) ?? []
                  }
                />
              )}
            </>
          );
        }}
      />
    </>
  );
};
