import { useAuth } from "@/hooks/shared/use-auth";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.app.root} replace />;
  }

  return <Outlet />;
}
