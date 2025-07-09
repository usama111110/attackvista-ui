
import { ReactNode, useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { useUserStore } from "@/utils/userDatabase";
import { ModernDashboardHeader } from "./modern-dashboard-header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate("/login", {
        state: { message: "Please log in to access the dashboard" }
      });
      return;
    }
    
    setMounted(true);
    
    // Show welcome toast on initial load
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    if (!hasShownWelcome && currentUser) {
      setTimeout(() => {
        toast({
          title: `Welcome to SecureSentry, ${currentUser.name}`,
          description: "Your modern security dashboard is ready",
        });
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }
  }, [toast, currentUser, navigate]);
  
  // Prevent flash of unstyled content
  if (!mounted || !currentUser) return null;

  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const contentWidth = collapsed ? "w-[calc(100%-4rem)]" : "w-[calc(100%-16rem)]";

  return (
    <div className={cn(
      "min-h-screen flex animate-fade-in transition-colors duration-300",
      isDarkMode 
        ? "bg-gradient-to-br from-background via-background/50 to-muted/10 text-foreground" 
        : "bg-gradient-to-br from-slate-50 via-blue-50/30 to-white text-foreground"
    )}>
      <aside 
        className={cn(
          sidebarWidth,
          "border-r transition-all duration-500 ease-in-out flex flex-col h-screen fixed left-0 top-0 z-50",
          "border-border/30 bg-card/90 backdrop-blur-xl shadow-2xl",
          "shadow-primary/10"
        )}
      >
        <div className="flex-1 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
          <MainNav collapsed={collapsed} />
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "mt-auto mb-4 mx-auto p-2 rounded-full transition-all duration-200 hover:scale-110",
            "bg-muted/50 hover:bg-primary/10 text-primary shadow-sm hover:shadow-md"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>
      <main className={cn(
        contentWidth, 
        "ml-auto overflow-y-auto scrollbar-thin scrollbar-thumb-muted p-6 lg:px-8 relative",
        "bg-gradient-to-b from-transparent to-muted/5"
      )}>
        {/* Modern dashboard header */}
        <ModernDashboardHeader />
        
        <div className="max-w-7xl mx-auto pt-20 space-y-6">
          {/* Add breadcrumb navigation at the top of the content area */}
          <BreadcrumbNavigation />
          
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
