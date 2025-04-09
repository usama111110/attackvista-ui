
import { ReactNode, useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight, Bell, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { NotificationDropdown } from "./notification-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/hooks/use-toast";

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
      : 'bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-800'}`}>
      <aside 
        className={`${collapsed ? 'w-16' : 'w-64'} border-r transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 ${
          isDarkMode 
            ? 'border-gray-800/50 bg-gray-900/80 backdrop-blur-xl' 
            : 'border-gray-200 bg-white/90 shadow-sm backdrop-blur-xl'
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
                ? 'bg-gray-800/70 hover:bg-gray-700/80 text-gray-300 backdrop-blur-lg' 
                : 'bg-gray-100/90 hover:bg-gray-200/90 text-gray-600 backdrop-blur-lg'
            } transition-colors`}
          >
            <ExternalLink size={12} />
            <span>GitHub</span>
          </a>
          
          <ThemeToggle />
          
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 rounded-full transition-colors relative ${
              isDarkMode 
                ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 backdrop-blur-lg' 
                : 'bg-gray-100/90 hover:bg-gray-200/90 text-gray-600 backdrop-blur-lg'
            }`}
            aria-label="Open notifications"
          >
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          </button>
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        <div className="max-w-7xl mx-auto pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}
