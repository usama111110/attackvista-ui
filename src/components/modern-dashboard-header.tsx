
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
      "fixed top-0 right-0 left-64 z-40 h-16 px-6 flex items-center gap-4 transition-all duration-500",
      "backdrop-blur-2xl border-b border-border/20",
      isDarkMode 
        ? "bg-gradient-to-r from-background/95 via-background/90 to-background/95" 
        : "bg-gradient-to-r from-background/95 via-background/90 to-background/95"
    )}
    style={{
      background: isDarkMode 
        ? 'linear-gradient(90deg, hsl(222 84% 4.9% / 0.95), hsl(222 84% 4.9% / 0.90), hsl(222 84% 4.9% / 0.95))' 
        : 'linear-gradient(90deg, hsl(210 40% 98% / 0.95), hsl(210 40% 98% / 0.90), hsl(210 40% 98% / 0.95))'
    }}
    >
      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search security events, logs, or settings..."
            className={cn(
              "pl-10 pr-12 h-10 transition-all duration-300 border-border/40",
              "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
              "bg-background/60 backdrop-blur-sm"
            )}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-muted/50">
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
                  className={cn(
                    "h-10 transition-all duration-300",
                    "hover:bg-primary/10 hover:scale-110 active:scale-95"
                  )}
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
                  className={cn(
                    "h-10 transition-all duration-300",
                    "hover:bg-primary/10 hover:scale-110 active:scale-95"
                  )}
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
