import { manyToMany } from "../util/manyToMany";
import { Relation } from "../types/Relation";

export const UserOrganisation_Role: Relation[] = manyToMany(
  { modelName: "UserOrganisation", fieldName: "roles" },
  { modelName: "Role", fieldName: "userOrganisations" },
  {
    fromSide: {
      modelName: "UserOrganisationRole",
      fieldName: "userOrganisation",
      options: {
        fields: ["userOrganisationId"],
        references: ["id"],
      },
    },
    toSide: {
      modelName: "UserOrganisationRole",
      fieldName: "role",
      options: {
        fields: ["roleId"],
        references: ["id"],
      },
    },
  }
);
