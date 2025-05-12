
import { ReactNode, useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  LogOut
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { NotificationDropdown } from "./notification-dropdown";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { NotificationIndicator } from "./notification-indicator";
import { useUserStore } from "@/utils/userDatabase";
import { Button } from "./ui/button";
import { DashboardHeader } from "./dashboard-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const { logout } = useUserStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    setMounted(true);
    
    // Show welcome toast on initial load
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to SecureSentry",
          description: "Your modern security dashboard is ready",
        });
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }
  }, [toast]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };
  
  // Prevent flash of unstyled content
  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex animate-fade-in ${isDarkMode 
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100' 
      : 'bg-gradient-to-br from-blue-50/50 via-white to-slate-50/80 text-gray-800'}`}>
      <aside 
        className={`${collapsed ? 'w-16' : 'w-64'} border-r transition-all duration-500 ease-in-out flex flex-col h-screen sticky top-0 ${
          isDarkMode 
            ? 'border-gray-800/50 bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5' 
            : 'border-gray-200 bg-white/90 shadow-lg shadow-gray-200/50 backdrop-blur-xl'
        }`}
      >
        <div className="flex-1 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <MainNav collapsed={collapsed} />
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-auto mb-4 mx-auto p-2 rounded-full transition-all ${
            isDarkMode 
              ? 'bg-gray-800/70 hover:bg-gray-700/70 text-primary hover:scale-110 shadow-lg shadow-primary/5' 
              : 'bg-blue-50/80 hover:bg-blue-100/80 text-blue-700 hover:scale-110 shadow-sm'
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 p-6 lg:px-8 relative">
        {/* Add the new dashboard header */}
        <DashboardHeader />
        
        <div className="max-w-7xl mx-auto pt-14">
          {/* Add breadcrumb navigation at the top of the content area */}
          <BreadcrumbNavigation />
          
          {children}
        </div>
      </main>
    </div>
  );
}
