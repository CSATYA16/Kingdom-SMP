import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';
import type { RolePermissions } from '../../data/roles';

interface ProtectedRouteProps {
  requiredPermission?: keyof RolePermissions;
}

export const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-accent-gold font-heading uppercase tracking-widest animate-pulse">Loading Identity...</div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
