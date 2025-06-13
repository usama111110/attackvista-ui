
import { ReactNode } from "react";
import { useUserStore } from "@/utils/userDatabase";
import { useOrganizationStore } from "@/utils/organizationDatabase";

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
  organizationId?: string;
}

export function PermissionGuard({ 
  children, 
  permission, 
  fallback = null,
  organizationId 
}: PermissionGuardProps) {
  const { currentUser } = useUserStore();
  const { currentOrganization, hasPermission } = useOrganizationStore();
  
  if (!currentUser) return <>{fallback}</>;
  
  const orgId = organizationId || currentOrganization?.id;
  if (!orgId) return <>{fallback}</>;
  
  const hasAccess = hasPermission(currentUser.id, orgId, permission);
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
