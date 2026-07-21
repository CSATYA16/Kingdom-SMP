export type Role = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'PLAYER';

export interface RolePermissions {
  manageUsers: boolean;
  manageMedia: boolean;
  manageRoles: boolean;
  viewAdminPanel: boolean;
  viewDashboard: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  OWNER: {
    manageUsers: true,
    manageMedia: true,
    manageRoles: true,
    viewAdminPanel: true,
    viewDashboard: true,
  },
  ADMIN: {
    manageUsers: true,
    manageMedia: true,
    manageRoles: false,
    viewAdminPanel: true,
    viewDashboard: true,
  },
  MODERATOR: {
    manageUsers: true,
    manageMedia: false,
    manageRoles: false,
    viewAdminPanel: true,
    viewDashboard: true,
  },
  PLAYER: {
    manageUsers: false,
    manageMedia: false,
    manageRoles: false,
    viewAdminPanel: false,
    viewDashboard: true,
  }
};
