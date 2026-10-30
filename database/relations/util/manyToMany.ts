import { oneToMany } from "./oneToMany";
import { JoinRelation } from "../types/JoinRelation";
import { ManyRelationSide } from "../types/ManyRelationSide";
import { Relation } from "../types/Relation";

export const manyToMany = (
  fromSide: ManyRelationSide,
  toSide: ManyRelationSide,
  via: JoinRelation
): Relation[] => {
  return [
    ...oneToMany(via.fromSide, fromSide),
    ...oneToMany(via.toSide, toSide),
  ];
};
