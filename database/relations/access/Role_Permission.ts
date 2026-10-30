import { manyToMany } from "../util/manyToMany";
import { Relation } from "../types/Relation";

export const Role_Permission: Relation[] = manyToMany(
  { modelName: "Role", fieldName: "permissions" },
  { modelName: "Permission", fieldName: "roles" },
  {
    fromSide: {
      modelName: "RolePermission",
      fieldName: "role",
      options: {
        fields: ["roleId"],
        references: ["id"],
      },
    },
    toSide: {
      modelName: "RolePermission",
      fieldName: "permission",
      options: {
        fields: ["permissionId"],
        references: ["id"],
      },
    },
  }
);
