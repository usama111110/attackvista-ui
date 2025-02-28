
import { ReactNode, useState } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <aside 
        className={`${collapsed ? 'w-16' : 'w-64'} border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-md transition-all duration-300 ease-in-out flex flex-col`}
      >
        <MainNav collapsed={collapsed} />
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="mt-auto mb-4 mx-auto p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
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
