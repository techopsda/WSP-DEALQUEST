import { filetypemime } from 'magic-bytes.js';
import { v4 } from 'uuid';

export const formatArrayBufferAsFileObject = (fileBuffers: ArrayBuffer[]) => {
  return fileBuffers.map((fileBuffer) => {
    const uint = new Uint8Array(fileBuffer);
    const blob = new Blob([uint]);

    return new File([blob], v4(), {
      type: filetypemime(uint as unknown as any[])[0]
    });
  });
};
