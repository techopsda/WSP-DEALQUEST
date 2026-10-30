import { RelationalFieldOptions } from "schemix/dist/typings/prisma-type-options";

export type OneRelationSide = {
  modelName: string;
  fieldName: string;
  options?: RelationalFieldOptions | undefined;
};
