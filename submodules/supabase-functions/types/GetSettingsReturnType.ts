export type GetSettingsReturnType<T, K extends keyof T> = { [x in K]: T[x] };
