import { PrismaClient } from "@prisma/client";

export const upgradeUsers = async (
  prismaClient: PrismaClient,
  emailAddressToken: string,
  roleName: string
) => {
  console.log(`upgradeUsers() ${emailAddressToken} ${roleName}`);

  const dbRole = await prismaClient.role.findFirst({
    where: {
      name: roleName,
    },
  });

  if (!dbRole) {
    console.log("Failed to find role in DB");
    return;
  }

  const dbUsers = await prismaClient.user.findMany({
    where: {
      email: {
        contains: emailAddressToken,
      },
    },
  });
  console.log(`Found ${dbUsers.length} users matching email address token`);

  for (const dbUser of dbUsers) {
    const userOrganisation = await prismaClient.userOrganisation.findFirst({
      where: {
        userId: dbUser.id,
      },
    });

    if (!userOrganisation) {
      console.log("Failed to find user organisation in DB");
    } else {
      console.log(
        `Adding ${roleName} role to User Organisation ${userOrganisation.id}`
      );
      await prismaClient.userOrganisationRole.create({
        data: {
          userOrganisationId: userOrganisation.id,
          roleId: dbRole.id,
        },
      });
    }
  }
};
