
import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";

const colorThemes = [
  { name: "Default", primary: "bg-indigo-500", accent: "bg-purple-500" },
  { name: "Ocean", primary: "bg-blue-500", accent: "bg-cyan-500" },
  { name: "Forest", primary: "bg-green-600", accent: "bg-emerald-500" },
  { name: "Sunset", primary: "bg-orange-500", accent: "bg-amber-500" },
  { name: "Berry", primary: "bg-pink-500", accent: "bg-rose-500" },
  { name: "Slate", primary: "bg-slate-600", accent: "bg-gray-500" },
];

export function ThemeToggle() {
  const { isDarkMode, setThemePreference, themePreference, setColorTheme, colorTheme } = useTheme();
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
              ? "rgba(79,70,229,0.3)" 
              : "rgba(79,70,229,0.2)"
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-indigo-100/20 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 animate-gradient-x"></div>
          </div>
          
          {/* Animated glow effect */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-indigo-400/10 dark:from-indigo-400/5 dark:via-purple-400/5 dark:to-indigo-400/5"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border-indigo-100 dark:border-indigo-900/30 shadow-lg rounded-xl min-w-[200px] overflow-hidden animate-fade-in"
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
          <Palette className="h-4 w-4 text-primary" />
          <span>Appearance</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => setThemePreference("light")}
          className={`${themePreference === "light" ? "bg-indigo-50 dark:bg-indigo-900/30" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500 group-hover:scale-110 transition-transform duration-200">
            <Sun className="h-4 w-4" />
          </div>
          <span>Light</span>
          {themePreference === "light" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500"></span>}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setThemePreference("dark")}
          className={`${themePreference === "dark" ? "bg-indigo-50 dark:bg-indigo-900/30" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-400 group-hover:scale-110 transition-transform duration-200">
            <Moon className="h-4 w-4" />
          </div>
          <span>Dark</span>
          {themePreference === "dark" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500"></span>}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setThemePreference("system")}
          className={`${themePreference === "system" ? "bg-indigo-50 dark:bg-indigo-900/30" : ""} transition-colors flex items-center gap-2 px-3 py-2.5 text-sm group`}
        >
          <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200">
            <Monitor className="h-4 w-4" />
          </div>
          <span>System</span>
          {themePreference === "system" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500"></span>}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2.5 text-sm">
            <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700">
              <Palette className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>Color Theme</span>
            <span className={`ml-auto h-2 w-2 rounded-full ${colorTheme ? colorTheme.primary.replace('bg-', 'bg-') : 'bg-indigo-500'}`}></span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95">
            <div className="grid grid-cols-2 gap-1 p-2">
              {colorThemes.map((theme) => (
                <button
                  key={theme.name}
                  className={`flex flex-col items-center justify-center p-2 gap-1.5 rounded-lg transition-colors ${
                    colorTheme?.name === theme.name 
                      ? 'bg-indigo-50/60 dark:bg-indigo-900/20' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/30'
                  }`}
                  onClick={() => setColorTheme(theme)}
                >
                  <div className="flex gap-1">
                    <div className={`h-4 w-4 rounded-full ${theme.primary}`}></div>
                    <div className={`h-4 w-4 rounded-full ${theme.accent}`}></div>
                  </div>
                  <span className="text-xs font-medium">{theme.name}</span>
                </button>
              ))}
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
