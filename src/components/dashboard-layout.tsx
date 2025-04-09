
import { ReactNode, useState } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { NotificationDropdown } from "./notification-dropdown";
import { ThemeToggle } from "./theme-toggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex animate-fade-in ${isDarkMode 
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100' 
      : 'bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-800'}`}>
      <aside 
        className={`${collapsed ? 'w-16' : 'w-64'} border-r transition-all duration-300 ease-in-out flex flex-col ${
          isDarkMode 
            ? 'border-gray-800/50 bg-gray-900/70 backdrop-blur-lg' 
            : 'border-gray-200 bg-white/80 shadow-sm backdrop-blur-md'
        }`}
      >
        <MainNav collapsed={collapsed} />
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-auto mb-4 mx-auto p-2 rounded-full transition-all shadow-sm ${
            isDarkMode 
              ? 'bg-gray-800/70 hover:bg-gray-700/70 text-primary hover:scale-110' 
              : 'bg-blue-50/80 hover:bg-blue-100/80 text-blue-700 hover:scale-110'
          }`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 lg:px-8 relative">
        {/* Header controls with notification bell and theme toggle */}
        <div className="absolute top-6 right-6 z-10 flex items-center space-x-3">
          <ThemeToggle />
          
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 rounded-full transition-colors relative ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700/80 text-gray-300 backdrop-blur-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 backdrop-blur-lg'
            }`}
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
