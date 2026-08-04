import { PrismaClient } from '@prisma/client';

import { roles } from './roles';

export async function seedRolePermissions(
  prisma: PrismaClient,
) {
  console.log('🌱 Assigning permissions to roles...');

  const allPermissions =
    await prisma.permission.findMany();

  for (const roleSeed of roles) {
    const role =
      await prisma.role.findFirst({
        where: {
          name: roleSeed.name,
        },
      });

    if (!role) {
      continue;
    }

    let permissionsToAssign = allPermissions;

    if (
      !roleSeed.permissions.includes('*')
    ) {
      permissionsToAssign =
        allPermissions.filter((permission) =>
          roleSeed.permissions.includes(
            permission.name,
          ),
        );
    }

    for (const permission of permissionsToAssign) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }

    console.log(
      `✅ ${role.name} -> ${permissionsToAssign.length} permissions`,
    );
  }

  console.log(
    '✅ Role permissions seeded successfully.',
  );
}