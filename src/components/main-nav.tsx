
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { 
  Shield, 
  BarChart3, 
  Users, 
  Activity, 
  Settings, 
  Bell, 
  Eye, 
  Network, 
  Search, 
  FileCheck,
  Building2
} from "lucide-react";
import { Logo } from "./Logo";
import { OrganizationSwitcher } from "./organization-switcher";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  collapsed?: boolean;
}

function NavItem({ to, icon: Icon, children, collapsed }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
        "hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98]",
        isActive 
          ? "bg-primary/20 text-primary shadow-sm border border-primary/20" 
          : "text-muted-foreground hover:text-foreground",
        collapsed ? "justify-center px-2" : ""
      )}
    >
      <Icon 
        size={18} 
        className={cn(
          "transition-colors duration-200",
          isActive ? "text-primary" : "group-hover:text-primary"
        )} 
      />
      {!collapsed && (
        <span className={cn(
          "font-medium transition-colors duration-200",
          isActive ? "text-primary" : ""
        )}>
          {children}
        </span>
      )}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md border">
          {children}
        </span>
      )}
    </NavLink>
  );
}

interface MainNavProps {
  collapsed?: boolean;
}

export function MainNav({ collapsed = false }: MainNavProps) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Logo and branding */}
      <div className={cn(
        "p-4 border-b border-border/50",
        collapsed ? "px-2" : ""
      )}>
        <div className="flex items-center gap-2">
          <Logo />
          {!collapsed && (
            <div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SecureSentry
              </span>
              <div className="text-xs text-muted-foreground">Security Dashboard</div>
            </div>
          )}
        </div>
      </div>

      {/* Organization Switcher */}
      {!collapsed && (
        <div className="p-4 border-b border-border/50">
          <OrganizationSwitcher />
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          <NavItem to="/" icon={BarChart3} collapsed={collapsed}>
            Overview
          </NavItem>
          <NavItem to="/detection" icon={Eye} collapsed={collapsed}>
            Detection
          </NavItem>
          <NavItem to="/network" icon={Network} collapsed={collapsed}>
            Network
          </NavItem>
          <NavItem to="/analytics" icon={Search} collapsed={collapsed}>
            Analytics
          </NavItem>
          <NavItem to="/security" icon={Shield} collapsed={collapsed}>
            Security
          </NavItem>
          <NavItem to="/compliance" icon={FileCheck} collapsed={collapsed}>
            Compliance
          </NavItem>
          <NavItem to="/live-traffic" icon={Activity} collapsed={collapsed}>
            Live Traffic
          </NavItem>
        </div>

        <div className={cn(
          "pt-4 mt-4 border-t border-border/50 space-y-1",
          collapsed ? "border-t-0 pt-2 mt-2" : ""
        )}>
          <NavItem to="/users" icon={Users} collapsed={collapsed}>
            Users
          </NavItem>
          <NavItem to="/notifications" icon={Bell} collapsed={collapsed}>
            Notifications
          </NavItem>
          <NavItem to="/settings" icon={Settings} collapsed={collapsed}>
            Settings
          </NavItem>
        </div>
      </nav>
    </div>
  );
}
