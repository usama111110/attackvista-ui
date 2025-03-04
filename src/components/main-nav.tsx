
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Activity, Users, Settings, Bell, LogOut, AlertTriangle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Logo } from "@/components/Logo";

const navItems = [
  { icon: Shield, label: "Dashboard", path: "/" },
  { icon: AlertTriangle, label: "Detection", path: "/detection" },
  { icon: Activity, label: "Live Traffic", path: "/live-traffic" },
  { icon: Globe, label: "Network", path: "/network" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface MainNavProps {
  collapsed?: boolean;
}

export function MainNav({ collapsed = false }: MainNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, logout } = useUserStore();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (location.pathname === "/login") return;
    
    if (!currentUser) {
      navigate("/login", { 
        state: { 
          message: "Please login to access this page" 
        } 
      });
    }
  }, [currentUser, location.pathname, navigate]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate("/login");
  };
  
  return (
    <nav className="py-4 px-2 space-y-1 flex-1 animate-fade-in">
      <div className={`mb-8 ${collapsed ? 'px-2 justify-center' : 'px-4'} flex items-center`}>
        {collapsed ? (
          <div className="flex items-center justify-center">
            <Logo showText={false} size="sm" />
          </div>
        ) : (
          <Logo />
        )}
      </div>
      
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover-lift",
            collapsed ? "justify-center" : "",
            location.pathname === item.path
              ? "bg-primary/20 text-primary"
              : isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-white/10" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
          )}
          title={collapsed ? item.label : undefined}
        >
          <item.icon className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
          {!collapsed && <span>{item.label}</span>}
        </Link>
      ))}
      
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800/50">
        <Link
          to="/notifications"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover-lift",
            collapsed ? "justify-center" : "",
            location.pathname === "/notifications" 
              ? "bg-primary/20 text-primary" 
              : isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-white/10" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
          )}
          title={collapsed ? "Notifications" : undefined}
        >
          <Bell className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
          {!collapsed && <span>Notifications</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 w-full hover-lift",
            collapsed ? "justify-center" : "",
            isDarkMode 
              ? "text-gray-300 hover:text-white hover:bg-white/10" 
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
}
