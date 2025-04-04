
import { ReactNode, useState } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { NotificationDropdown } from "./notification-dropdown";

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
          className={`mt-auto mb-4 mx-auto p-2 rounded-full transition-colors shadow-glow ${
            isDarkMode 
              ? 'bg-gray-800/50 hover:bg-gray-700/50 text-primary' 
              : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
          }`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
        {/* Notification bell */}
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                : 'bg-white shadow-sm hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
