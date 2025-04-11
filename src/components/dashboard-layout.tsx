
import { ReactNode, useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { NotificationDropdown } from "./notification-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { NotificationIndicator } from "./notification-indicator";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
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
        {/* Header controls with notification bell and theme toggle */}
        <div className="absolute top-6 right-6 z-10 flex items-center space-x-3">
          <a
            href="https://github.com/your-repo/secure-sentry"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs ${
              isDarkMode 
                ? 'bg-gray-800/70 hover:bg-gray-700/80 text-gray-300 backdrop-blur-lg hover:text-white transition-colors' 
                : 'bg-gray-100/90 hover:bg-gray-200/90 text-gray-600 backdrop-blur-lg hover:text-gray-900 transition-colors'
            }`}
          >
            <ExternalLink size={12} />
            <span>GitHub</span>
          </a>
          
          <ThemeToggle />
          
          <NotificationIndicator onClick={() => setNotificationsOpen(!notificationsOpen)} />
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        <div className="max-w-7xl mx-auto pt-14">
          {/* Add breadcrumb navigation at the top of the content area */}
          <BreadcrumbNavigation />
          
          {children}
        </div>
      </main>
    </div>
  );
}
