export const formatFileForUpload = (file: File) => {
  return { title: file.name, rawFile: file, type: file.type };
};
