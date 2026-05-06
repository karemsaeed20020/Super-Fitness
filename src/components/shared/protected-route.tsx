import { useAuth } from '@/hooks/shared/use-auth';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.auth.login}`} replace />;
  }

  return <Outlet />;
}
