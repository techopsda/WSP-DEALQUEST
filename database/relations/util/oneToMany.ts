import { ManyRelationSide } from "../types/ManyRelationSide";
import { OneRelationSide } from "../types/OneRelationSide";
import { Relation } from "../types/Relation";
import { RelationalFieldOptions } from "schemix/dist/typings/prisma-type-options";

export const oneToMany = (
  fromSide: OneRelationSide,
  toSide: ManyRelationSide
): Relation[] => {
  let manyOptions: RelationalFieldOptions = {
    list: true,
  };
  if (fromSide.options?.name) {
    manyOptions.name = fromSide.options.name;
  }
  return [
    {
      fromModelName: fromSide.modelName,
      fromField: fromSide.fieldName,
      options: fromSide.options,
      toModelName: toSide.modelName,
    },
    {
      fromModelName: toSide.modelName,
      fromField: toSide.fieldName,
      options: manyOptions,
      toModelName: fromSide.modelName,
    },
  ];
};
