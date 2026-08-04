import { PrismaClient } from '@prisma/client';

import { permissions } from './permissions';
import { roles } from './roles';
import { superAdmin } from './super-admin';

import { seedRolePermissions } from './role-permissions';

const prisma = new PrismaClient();

async function seedPermissions() {
  console.log('🌱 Seeding permissions...');

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {},
      create: {
        name: permission,
        description: permission,
      },
    });
  }

  console.log('✅ Permissions seeded.');
}

async function seedRoles() {
  console.log('🌱 Seeding roles...');

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name_type: {
          name: role.name,
          type: 'SYSTEM',
        },
      },
      update: {
        description: role.description,
      },
      create: {
        name: role.name,
        description: role.description,
        type: 'SYSTEM',
      },
    });
  }

  console.log('✅ Roles seeded.');
}

async function seedSuperAdmin() {
  console.log('🌱 Seeding SUPER_ADMIN...');

  const admin = await superAdmin();

  await prisma.user.upsert({
    where: {
      email: admin.email,
    },
    update: {},
    create: admin,
  });

  console.log('✅ SUPER_ADMIN seeded.');
}

async function main() {
  console.log('🚀 Starting Vorqara seed...');

  await seedPermissions();

  await seedRoles();

  await seedSuperAdmin();

  await seedRolePermissions(prisma);

  console.log(
    '🎉 Vorqara database seeded successfully.',
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });