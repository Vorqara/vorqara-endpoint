export const PERMISSIONS = {
  DASHBOARD_READ: 'dashboard:read',

  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',

  ORGANIZATIONS_CREATE: 'organizations:create',
  ORGANIZATIONS_READ: 'organizations:read',
  ORGANIZATIONS_UPDATE: 'organizations:update',
  ORGANIZATIONS_DELETE: 'organizations:delete',

  DEVICES_CREATE: 'devices:create',
  DEVICES_READ: 'devices:read',
  DEVICES_UPDATE: 'devices:update',
  DEVICES_DELETE: 'devices:delete',

  POLICIES_CREATE: 'policies:create',
  POLICIES_READ: 'policies:read',
  POLICIES_UPDATE: 'policies:update',
  POLICIES_DELETE: 'policies:delete',

  ALERTS_READ: 'alerts:read',
  ALERTS_UPDATE: 'alerts:update',
  ALERTS_DELETE: 'alerts:delete',

  REPORTS_READ: 'reports:read',
  REPORTS_EXPORT: 'reports:export',

  ENDPOINT_SCAN: 'endpoint:scan',
  ENDPOINT_ISOLATE: 'endpoint:isolate',
  ENDPOINT_RESTORE: 'endpoint:restore',
} as const;