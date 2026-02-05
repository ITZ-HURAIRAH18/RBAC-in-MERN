import { Navigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ permission, children }) => {
  const { user } = useAuth();
  const allowed = usePermission(permission);

  // First check if user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Then check if user has the required permission
  return allowed ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;