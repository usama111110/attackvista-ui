
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationIndicator } from "./notification-indicator";
import { UserProfile } from "./user-profile";
import { NotificationPreferences } from "./notification-preferences";
import { DataExport } from "./data-export";
import { Collaboration } from "./collaboration";
import { Bell, Download, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useUserStore } from "@/utils/userDatabase";
import { useTheme } from "@/providers/ThemeProvider";

export function DashboardHeader() {
  const { currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`fixed top-0 right-0 z-50 py-3 px-6 flex items-center gap-3 ${
      isDarkMode 
        ? 'bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50' 
        : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
    } w-full`}>
      <div className="flex-1"></div>
      
      {currentUser && (
        <>
          <NotificationPreferences 
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 transition-colors"
              >
                <Bell className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only md:not-sr-only md:ml-2">Notifications</span>
              </Button>
            }
          />
          
          <DataExport 
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 transition-colors"
              >
                <Download className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only md:not-sr-only md:ml-2">Export</span>
              </Button>
            }
          />
          
          <Collaboration 
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 transition-colors"
              >
                <Users className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only md:not-sr-only md:ml-2">Collaborate</span>
              </Button>
            }
          />
        </>
      )}
      
      <ThemeToggle />
      <NotificationIndicator />
      <UserProfile />
    </div>
  );
}
