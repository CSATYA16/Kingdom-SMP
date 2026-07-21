import { ROLE_PERMISSIONS } from '../data/roles';
import type { RolePermissions } from '../data/roles';
import type { User } from '../data/users';

/**
 * Checks if a user has a specific permission.
 */
export const hasPermission = (user: User | null, permission: keyof RolePermissions): boolean => {
  if (!user) return false;
  
  const rolePerms = ROLE_PERMISSIONS[user.role];
  if (!rolePerms) return false;
  
  return rolePerms[permission] === true;
};

/**
 * Checks if a user is an admin (or higher, like OWNER).
 */
export const isAdmin = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'ADMIN' || user.role === 'OWNER';
};

/**
 * Checks if a user is the owner.
 */
export const isOwner = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'OWNER';
};
