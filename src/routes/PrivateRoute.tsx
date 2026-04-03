import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
