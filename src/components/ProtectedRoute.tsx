
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/utils/userDatabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useUserStore();
  const location = useLocation();

  // Simple check for authentication without side effects
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname, message: "You must be logged in to access this page" }} replace />;
  }

  // If authenticated, render the children
  console.log("User is authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
