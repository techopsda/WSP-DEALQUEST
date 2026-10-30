import { Relation } from "../types/Relation";
import { oneToMany } from "../util/oneToMany";

export const Organisation_Organisation: Relation[] = oneToMany(
  {
    modelName: "Organisation",
    fieldName: "parent",
    options: {
      fields: ["parentId"],
      references: ["id"],
      name: "parentChild",
      optional: true,
    },
  },
  {
    modelName: "Organisation",
    fieldName: "children",
  }
);
