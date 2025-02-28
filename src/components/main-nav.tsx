
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Activity, Users, Settings, Bell, LogOut, AlertTriangle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
  
  // Check if user is authenticated
  useEffect(() => {
    // Skip authentication check for login page
    if (location.pathname === "/login") return;
    
    // If no user is logged in, redirect to login
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
    <nav className="py-4 px-2 space-y-1 flex-1">
      <div className={`mb-8 ${collapsed ? 'px-2 justify-center' : 'px-4'} flex items-center`}>
        <div className={`flex items-center gap-2 text-primary font-bold ${collapsed ? 'justify-center' : 'text-xl'}`}>
          <Shield className={`${collapsed ? 'h-8 w-8' : 'h-6 w-6'}`} />
          {!collapsed && <span>AttackVista</span>}
        </div>
      </div>
      
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
            collapsed ? "justify-center" : "",
            location.pathname === item.path
              ? "bg-primary/20 text-primary"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          )}
          title={collapsed ? item.label : undefined}
        >
          <item.icon className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
          {!collapsed && <span>{item.label}</span>}
        </Link>
      ))}
      
      <div className="pt-6 mt-6 border-t border-gray-800/50">
        <Link
          to="/notifications"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200",
            collapsed ? "justify-center" : "",
            location.pathname === "/notifications" ? "bg-primary/20 text-primary" : ""
          )}
          title={collapsed ? "Notifications" : undefined}
        >
          <Bell className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
          {!collapsed && <span>Notifications</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 w-full",
            collapsed ? "justify-center" : ""
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
