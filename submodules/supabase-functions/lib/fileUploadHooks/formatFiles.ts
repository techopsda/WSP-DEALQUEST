import { FormatFilesFunction } from '../../types/FormatFilesFunction';
import { formatArrayBufferAsFileObject } from './formatArrayBufferAsFileObject';
import { formatStringAsFileObject } from './formatStringAsFileObject';

export const formatFiles: FormatFilesFunction = async (files) => {
  if (typeof files[0] === 'string') {
    return await formatStringAsFileObject(files as string[]);
  }

  if (files[0] instanceof ArrayBuffer) {
    return formatArrayBufferAsFileObject(files as ArrayBuffer[]);
  }

  return files as File[];
};
