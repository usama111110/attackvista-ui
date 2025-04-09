
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";

export function ThemeToggle() {
  const { isDarkMode, setThemePreference, themePreference } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative overflow-hidden rounded-full backdrop-blur-xl border transition-all duration-500 shadow-sm hover:shadow-md"
          style={{
            background: isDarkMode 
              ? "linear-gradient(145deg, rgba(31,41,55,0.7), rgba(17,24,39,0.8))" 
              : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(243,244,246,0.85))",
            borderColor: isDarkMode 
              ? "rgba(75,85,99,0.4)" 
              : "rgba(209,213,219,0.8)"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative z-10">
            {isDarkMode ? (
              <Moon className={`h-[1.2rem] w-[1.2rem] text-indigo-400 transition-all duration-500 ${isHovered ? "rotate-[360deg] scale-110" : "rotate-90"}`} />
            ) : (
              <Sun className={`h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-500 ${isHovered ? "rotate-[360deg] scale-110" : "rotate-0"}`} />
            )}
          </div>
          <span className="sr-only">Toggle theme</span>
          
          {/* Animated background effects */}
          <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 animate-gradient-x"></div>
          </div>
          
          {/* Animated glow effect */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 dark:from-blue-400/5 dark:via-indigo-400/5 dark:to-purple-400/5"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border-gray-200 dark:border-gray-700 shadow-lg rounded-xl min-w-[140px] overflow-hidden animate-fade-in"
      >
        <DropdownMenuItem 
          onClick={() => setThemePreference("light")}
          className={`${themePreference === "light" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500 group-hover:scale-110 transition-transform duration-200">
            <Sun className="h-4 w-4" />
          </div>
          <span>Light</span>
          {themePreference === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("dark")}
          className={`${themePreference === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-400 group-hover:scale-110 transition-transform duration-200">
            <Moon className="h-4 w-4" />
          </div>
          <span>Dark</span>
          {themePreference === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("system")}
          className={`${themePreference === "system" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200">
            <Monitor className="h-4 w-4" />
          </div>
          <span>System</span>
          {themePreference === "system" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
