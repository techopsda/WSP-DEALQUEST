import { OneRelationSide } from '../types/OneRelationSide';
import { Relation } from '../types/Relation';

export const oneToOne = (fromSide: OneRelationSide, toSide: OneRelationSide): Relation[] => {
  return [
    {
      fromModelName: fromSide.modelName,
      fromField: fromSide.fieldName,
      options: fromSide.options,
      toModelName: toSide.modelName,
      unique: true
    },
    {
      fromModelName: toSide.modelName,
      fromField: toSide.fieldName,
      options: toSide.options
        ? {
            optional: true,
            ...(toSide.options as any)
          }
        : { optional: true },
      toModelName: fromSide.modelName
    }
  ];
};
