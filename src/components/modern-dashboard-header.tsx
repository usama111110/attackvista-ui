
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationIndicator } from "./notification-indicator";
import { UserProfile } from "./user-profile";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useUserStore } from "@/utils/userDatabase";
import { useTheme } from "@/providers/ThemeProvider";
import { useNotifications } from "./notification-provider";
import { cn } from "@/lib/utils";

export function ModernDashboardHeader({ sidebarCollapsed = false }: { sidebarCollapsed?: boolean }) {
  const { currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  const { toggleNotifications } = useNotifications();
  
  const headerLeftOffset = sidebarCollapsed ? "left-16" : "left-64";
  
  return (
    <div className={cn(
      "fixed top-0 right-0 z-40 h-14 px-4 flex items-center justify-between transition-all duration-300",
      "backdrop-blur-xl border-b border-border/10",
      "bg-background/80",
      headerLeftOffset
    )}>
      {/* Simplified Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 border-border/30 bg-background/50 focus:bg-background"
          />
        </div>
      </div>
      
      {/* Right Side Icons */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <NotificationIndicator onClick={toggleNotifications} />
        <UserProfile />
      </div>
    </div>
  );
}
