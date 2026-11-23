import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContextStore";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
