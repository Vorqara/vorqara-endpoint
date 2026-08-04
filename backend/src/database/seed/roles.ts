export const roles = [
  {
    name: 'SUPER_ADMIN',
    description: 'Platform Super Administrator',
    permissions: ['*'],
  },

  {
    name: 'ORG_ADMIN',
    description: 'Organization Administrator',
    permissions: [
      'dashboard:read',

      'users:create',
      'users:read',
      'users:update',
      'users:delete',

      'organizations:read',
      'organizations:update',

      'devices:create',
      'devices:read',
      'devices:update',
      'devices:delete',

      'policies:create',
      'policies:read',
      'policies:update',
      'policies:delete',

      'alerts:read',
      'alerts:update',

      'reports:read',
      'reports:export',

      'endpoint:isolate',
      'endpoint:scan',
      'endpoint:restore',
    ],
  },

  {
    name: 'SECURITY_ADMIN',
    description: 'Security Administrator',
    permissions: [
      'dashboard:read',

      'devices:read',
      'devices:update',

      'policies:read',
      'policies:update',

      'alerts:read',
      'alerts:update',

      'reports:read',
      'reports:export',

      'endpoint:isolate',
      'endpoint:scan',
      'endpoint:restore',
    ],
  },

  {
    name: 'SECURITY_ANALYST',
    description: 'Security Operations Analyst',
    permissions: [
      'dashboard:read',

      'devices:read',

      'alerts:read',

      'reports:read',

      'endpoint:scan',
    ],
  },

  {
    name: 'HELPDESK',
    description: 'Helpdesk Technician',
    permissions: [
      'dashboard:read',

      'users:read',

      'devices:read',

      'endpoint:scan',
    ],
  },

  {
    name: 'AUDITOR',
    description: 'Security Auditor',
    permissions: [
      'dashboard:read',

      'users:read',

      'organizations:read',

      'devices:read',

      'policies:read',

      'alerts:read',

      'reports:read',
    ],
  },

  {
    name: 'VIEWER',
    description: 'Read-only User',
    permissions: [
      'dashboard:read',
      'reports:read',
    ],
  },
];