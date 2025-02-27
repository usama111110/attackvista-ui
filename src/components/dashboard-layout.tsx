
import { ReactNode } from "react";
import { MainNav } from "./main-nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <aside className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <MainNav />
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
