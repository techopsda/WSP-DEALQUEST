export type FormatFilesFunction = (files: File[] | string[] | ArrayBuffer[]) => Promise<File[]>;
export type FormatFilesFunctionObject<T> = {
  [x in keyof T]?: File[] | string[] | ArrayBuffer[];
};
