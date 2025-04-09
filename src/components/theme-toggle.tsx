
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
        <Button variant="outline" size="icon" className="rounded-full bg-gray-100 dark:bg-gray-800 backdrop-blur-lg border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all">
          {isDarkMode ? (
            <Moon className="h-5 w-5 text-indigo-400" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700">
        <DropdownMenuItem 
          onClick={() => setThemePreference("light")}
          className={`${themePreference === "light" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors`}
        >
          <Sun className="mr-2 h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("dark")}
          className={`${themePreference === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors`}
        >
          <Moon className="mr-2 h-4 w-4 text-indigo-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setThemePreference("system")}
          className={`${themePreference === "system" ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors`}
        >
          <Monitor className="mr-2 h-4 w-4 text-gray-500" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
