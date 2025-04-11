
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface RouteInfo {
  title: string;
  path: string;
}

export function BreadcrumbNavigation() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Handle root path
  if (pathSegments.length === 0) {
    return (
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Map segments to readable titles
  const routeMap: Record<string, string> = {
    "detection": "Threat Detection",
    "network": "Network Security",
    "users": "User Management",
    "live-traffic": "Live Traffic",
    "analytics": "Security Analytics",
    "settings": "System Settings",
    "notifications": "Notifications"
  };

  // Build breadcrumb items
  const breadcrumbs: RouteInfo[] = pathSegments.map((segment, index) => {
    // Build the path up to this segment
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      title: routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      path
    };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.path}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.title}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
