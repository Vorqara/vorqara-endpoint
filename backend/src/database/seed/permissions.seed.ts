import { PrismaClient } from '@prisma/client';

const permissions = [
  // Users
  'users.read',
  'users.create',
  'users.update',
  'users.delete',

  // Roles
  'roles.read',
  'roles.create',
  'roles.update',
  'roles.delete',

  // Permissions
  'permissions.read',
  'permissions.create',
  'permissions.update',
  'permissions.delete',

  // Organizations
  'organizations.read',
  'organizations.create',
  'organizations.update',
  'organizations.delete',

  // Endpoints
  'endpoints.read',
  'endpoints.register',
  'endpoints.update',
  'endpoints.delete',
  'endpoints.isolate',
  'endpoints.shutdown',
  'endpoints.restart',
  'endpoints.remote_terminal',

  // Policies
  'policies.read',
  'policies.create',
  'policies.update',
  'policies.delete',

  // Alerts
  'alerts.read',
  'alerts.create',
  'alerts.update',
  'alerts.delete',

  // Tasks
  'tasks.read',
  'tasks.create',
  'tasks.update',
  'tasks.delete',

  // Reports
  'reports.read',
  'reports.export',

  // Audit
  'audit.read',

  // AI
  'ai.ask',
];

export async function seedPermissions(
  prisma: PrismaClient,
) {
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

  console.log(
    `✅ ${permissions.length} permissions seeded.`,
  );
}