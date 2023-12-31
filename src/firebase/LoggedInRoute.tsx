import React, { ReactNode, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

interface LoggedInRouteType {
  children: ReactNode;
}

const LoggedInRoute: React.FC<LoggedInRouteType> = ({ children }) => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
  
    if (currentUser && currentUser.displayName && currentUser.displayName.length < 100) {
      navigate("/status-site");
    }
  }, [currentUser, navigate]);
  

  return <>{children}</>;
};

export default LoggedInRoute;
