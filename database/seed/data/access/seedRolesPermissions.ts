import { PrismaClient, Role, Permission } from '@prisma/client';
import _ from 'lodash';

export const seedRolesPermissions = async (prismaClient: PrismaClient) => {
  const rolePermissions: { [roleName: string]: string[] } = {
    SuperAdmin: ['canManageAccess', 'canManageContent'],
    Admin: ['canManageContent'],
    User: ['canDoSomething']
  };

  interface createdRole {
    name: string;
    roleFactory: Pick<Role, 'id'>;
  }
  interface createdPermission {
    name: string;
    permissionFactory: Pick<Permission, 'id'>;
  }

  let createdRoles: createdRole[] = [];
  let createdPermissions: createdPermission[] = [];

  // Creating Roles
  const roles = Object.keys(rolePermissions);
  for (const [index, role] of roles.entries()) {
    console.log(`Creating Role ${index + 1} of ${roles.length}`);
    const existingRole = await prismaClient.role.findFirst({ where: { name: role } });
    createdRoles.push({
      name: role,
      roleFactory: existingRole ?? (await prismaClient.role.create({ data: { name: role } }))
    });
  }

  // Creating Permissions
  const permissions = _.uniq(Object.values(rolePermissions).flatMap((x) => x));
  for (const [index, permission] of permissions.entries()) {
    console.log(`Creating Permission ${index + 1} of ${permissions.length}`);
    const existingPermission = await prismaClient.permission.findFirst({ where: { name: permission } });
    createdPermissions.push({
      name: permission,
      permissionFactory:
        existingPermission ?? (await prismaClient.permission.create({ data: { name: permission } }))
    });
  }

  // Creating links between Roles & Permissions
  for (const [role, permissions] of Object.entries(rolePermissions)) {
    const createdRole = createdRoles.find((createdRole) => createdRole.name === role);
    for (const permission of permissions) {
      const createdPermission = createdPermissions.find((createdPermission) => createdPermission.name === permission);
      if (createdRole && createdPermission) {
        console.log(`Creating RolePermission for ${role} and ${permission}`);
        const existingRolePermission = await prismaClient.rolePermission.findFirst({
          where: {
            roleId: createdRole.roleFactory.id,
            permissionId: createdPermission.permissionFactory.id
          }
        });
        if (!existingRolePermission) {
          await prismaClient.rolePermission.create({
            data: {
              roleId: createdRole.roleFactory.id,
              permissionId: createdPermission.permissionFactory.id
            }
          });
        }
      }
    }
  }
};
