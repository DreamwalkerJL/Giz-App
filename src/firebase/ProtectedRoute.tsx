import React, { ReactNode } from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (currentUser.displayName && currentUser.displayName.length === 100) {
    return <Navigate to="/need-username-site" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;