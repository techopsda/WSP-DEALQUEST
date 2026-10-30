import { v4 } from 'uuid';

export const formatStringAsFileObject = async (fileUrls: string[]) => {
  return await Promise.all(
    fileUrls?.map(async (fileUrl) => {
      const dataUrlToBlob = await (await fetch(fileUrl))?.blob();

      return new File([dataUrlToBlob], v4(), { type: dataUrlToBlob?.type });
    })
  );
};
