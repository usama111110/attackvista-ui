
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/utils/userDatabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, currentUser } = useUserStore();
  const location = useLocation();

  // Add more validation to prevent flickering
  if (!isAuthenticated || !currentUser) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location.pathname, message: "You must be logged in to access this page" }} replace />;
  }

  console.log("ProtectedRoute: User authenticated:", currentUser.name);
  return <>{children}</>;
};

export default ProtectedRoute;
