
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationIndicator } from "./notification-indicator";
import { DataExport } from "./data-export";
import { Collaboration } from "./collaboration";
import { UserProfile } from "./user-profile";
import { Download, Users, Search, Command } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUserStore } from "@/utils/userDatabase";
import { useTheme } from "@/providers/ThemeProvider";
import { useNotifications } from "./notification-provider";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ModernDashboardHeader() {
  const { currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  const { toggleNotifications } = useNotifications();
  
  return (
    <div className={cn(
      "fixed top-0 right-0 left-64 z-40 h-14 px-6 flex items-center justify-end gap-3 transition-all duration-300",
      "backdrop-blur-xl border-b border-border/10",
      "bg-background/80"
    )}>
      {/* Action Buttons - Right side only */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationIndicator onClick={toggleNotifications} />
        <UserProfile />
      </div>
    </div>
  );
}
