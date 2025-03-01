
import { ReactNode, useState } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'} text-foreground`}>
      <aside 
        className={`${collapsed ? 'w-16' : 'w-64'} border-r ${isDarkMode ? 'border-gray-800/50 bg-gray-900/50' : 'border-gray-200/50 bg-white/50'} backdrop-blur-md transition-all duration-300 ease-in-out flex flex-col`}
      >
        <MainNav collapsed={collapsed} />
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-auto mb-4 mx-auto p-2 rounded-full ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-200/50 hover:bg-gray-300/50'} transition-colors`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
