import { manyToMany } from "../util/manyToMany";
import { Relation } from "../types/Relation";

export const User_Organisation: Relation[] = manyToMany(
  { modelName: "User", fieldName: "organisations" },
  { modelName: "Organisation", fieldName: "users" },
  {
    fromSide: {
      modelName: "UserOrganisation",
      fieldName: "user",
      options: {
        fields: ["userId"],
        references: ["id"],
      },
    },
    toSide: {
      modelName: "UserOrganisation",
      fieldName: "organisation",
      options: {
        fields: ["organisationId"],
        references: ["id"],
      },
    },
  }
);
