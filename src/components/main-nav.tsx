
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
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden",
        "hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98] hover:shadow-sm",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        isActive 
          ? "bg-primary/20 text-primary shadow-sm border border-primary/20 scale-[1.02]" 
          : "text-muted-foreground hover:text-foreground",
        collapsed ? "justify-center px-2" : ""
      )}
    >
      <Icon 
        size={18} 
        className={cn(
          "transition-all duration-300 z-10 relative",
          isActive ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"
        )} 
      />
      {!collapsed && (
        <span className={cn(
          "font-medium transition-all duration-300 z-10 relative",
          isActive ? "text-primary" : "group-hover:translate-x-1"
        )}>
          {children}
        </span>
      )}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-md border transform group-hover:translate-x-2 group-hover:scale-105">
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
    <div className="flex flex-col h-full animate-slide-in-right">
      {/* Logo and branding with animations */}
      <div className={cn(
        "p-4 border-b border-border/50 transition-all duration-300",
        collapsed ? "px-2" : ""
      )}>
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <Logo size="md" showText={false} className="hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          {!collapsed && (
            <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-all duration-300">
                NetworkFort
              </span>
              <div className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
                Security Dashboard
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Organization Switcher with animation */}
      {!collapsed && (
        <div className="p-4 border-b border-border/50 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <OrganizationSwitcher />
        </div>
      )}

      {/* Navigation Items with staggered animations */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          <div className="animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <NavItem to="/" icon={BarChart3} collapsed={collapsed}>
              Overview
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
            <NavItem to="/detection" icon={Eye} collapsed={collapsed}>
              Detection
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
            <NavItem to="/network" icon={Network} collapsed={collapsed}>
              Network
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '0.9s' }}>
            <NavItem to="/analytics" icon={Search} collapsed={collapsed}>
              Analytics
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1s' }}>
            <NavItem to="/security" icon={Shield} collapsed={collapsed}>
              Security
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.1s' }}>
            <NavItem to="/compliance" icon={FileCheck} collapsed={collapsed}>
              Compliance
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.2s' }}>
            <NavItem to="/live-traffic" icon={Activity} collapsed={collapsed}>
              Live Traffic
            </NavItem>
          </div>
        </div>

        <div className={cn(
          "pt-4 mt-4 border-t border-border/50 space-y-1 transition-all duration-300",
          collapsed ? "border-t-0 pt-2 mt-2" : ""
        )}>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.3s' }}>
            <NavItem to="/organizations" icon={Building2} collapsed={collapsed}>
              Organizations
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.4s' }}>
            <NavItem to="/users" icon={Users} collapsed={collapsed}>
              Users
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.5s' }}>
            <NavItem to="/notifications" icon={Bell} collapsed={collapsed}>
              Notifications
            </NavItem>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '1.6s' }}>
            <NavItem to="/settings" icon={Settings} collapsed={collapsed}>
              Settings
            </NavItem>
          </div>
        </div>
      </nav>
    </div>
  );
}
