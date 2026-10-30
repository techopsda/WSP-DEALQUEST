import { RelationalFieldOptions } from "schemix/dist/typings/prisma-type-options";

export type Relation = {
  fromModelName: string;
  fromField: string;
  options?: RelationalFieldOptions | undefined;
  toModelName: string;
  unique?: boolean;
};
