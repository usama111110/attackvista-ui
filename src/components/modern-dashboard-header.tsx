
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationIndicator } from "./notification-indicator";
import { UserProfile } from "./user-profile";
import { DataExport } from "./data-export";
import { Collaboration } from "./collaboration";
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
      "fixed top-0 right-0 z-40 py-4 px-6 flex items-center gap-4",
      "backdrop-blur-xl border-b transition-all duration-300",
      isDarkMode 
        ? "bg-background/80 border-border/50" 
        : "bg-background/90 border-border/30"
    )}>
      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search dashboard..."
            className="pl-10 pr-12 bg-muted/30 border-0 focus:bg-background/50 transition-colors"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              ⌘K
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {currentUser && (
          <>
            <DataExport 
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Export</span>
                </Button>
              }
            />
            
            <Collaboration 
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                >
                  <Users className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Collaborate</span>
                </Button>
              }
            />
          </>
        )}
        
        <div className="h-6 w-px bg-border/50 mx-1" />
        
        <ThemeToggle />
        <NotificationIndicator onClick={toggleNotifications} />
        <UserProfile />
      </div>
    </div>
  );
}
