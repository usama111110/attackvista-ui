
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { isDarkMode, setThemePreference, themePreference } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative overflow-hidden rounded-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm hover:shadow"
        >
          <div className="relative z-10">
            {isDarkMode ? (
              <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400 rotate-90 transition-all duration-300" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 rotate-0 transition-all duration-300" />
            )}
          </div>
          <span className="sr-only">Toggle theme</span>
          
          {/* Animated background effect */}
          <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 animate-gradient-x"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border-gray-200 dark:border-gray-700 shadow-lg rounded-xl min-w-[140px] overflow-hidden animate-fade-in"
      >
        <DropdownMenuItem 
          onClick={() => setThemePreference("light")}
          className={`${themePreference === "light" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
          {themePreference === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("dark")}
          className={`${themePreference === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm`}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
          {themePreference === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("system")}
          className={`${themePreference === "system" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm`}
        >
          <Monitor className="h-4 w-4 text-gray-500" />
          <span>System</span>
          {themePreference === "system" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
