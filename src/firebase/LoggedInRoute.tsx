import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

interface LoggedInRouteType {
  children: ReactNode;
}

const LoggedInRoute: React.FC<LoggedInRouteType> = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser && currentUser.displayName && currentUser.displayName.length === 100) {
    return <Navigate to="/need-username-site" />;
  }
  else if (currentUser&& currentUser.displayName && currentUser.displayName.length < 99) {
    return <Navigate to="/status-site" />;
  }
  return <>{children}</>;
};

export default LoggedInRoute;
