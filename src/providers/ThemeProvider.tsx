
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

type ThemePreference = 'dark' | 'light' | 'system';

type ColorTheme = {
  name: string;
  primary: string;
  accent: string;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setThemePreference: (preference: ThemePreference) => void;
  themePreference: ThemePreference;
  colorTheme: ColorTheme | null;
  setColorTheme: (theme: ColorTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Track both the actual mode and the user preference
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    const savedPreference = localStorage.getItem('theme-preference');
    return (savedPreference as ThemePreference) || 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (themePreference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themePreference === 'dark';
  });

  // Add color theme state
  const [colorTheme, setColorThemeState] = useState<ColorTheme | null>(() => {
    const savedTheme = localStorage.getItem('color-theme');
    return savedTheme ? JSON.parse(savedTheme) : null;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themePreference === 'system') {
        setIsTransitioning(true);
        setIsDarkMode(mediaQuery.matches);
        
        // Show a toast when system theme changes
        const newMode = mediaQuery.matches ? 'dark' : 'light';
        toast(`System theme changed to ${newMode} mode`, {
          description: "Following your system preferences",
          duration: 2000,
          icon: mediaQuery.matches ? '🌙' : '☀️',
        });

        // Reset transition state
        setTimeout(() => setIsTransitioning(false), 300);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  // Update theme based on preference
  useEffect(() => {
    setIsTransitioning(true);
    
    if (themePreference === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    } else {
      setIsDarkMode(themePreference === 'dark');
    }
    
    localStorage.setItem('theme-preference', themePreference);
    
    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 300);
  }, [themePreference]);
  
  const setThemePreference = (preference: ThemePreference) => {
    setThemePreferenceState(preference);
    
    // Show feedback toast when theme changes
    if (preference !== 'system') {
      toast(`Theme set to ${preference} mode`, {
        description: `You can change this anytime in the theme menu`,
        duration: 2000,
        icon: preference === 'dark' ? '🌙' : '☀️',
      });
    } else {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      toast(`Following system preference (${systemMode})`, {
        description: `Your theme will automatically adjust with your system`,
        duration: 2000,
        icon: systemMode === 'dark' ? '🌙' : '☀️',
      });
    }
  };

  // Set color theme and save to local storage
  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('color-theme', JSON.stringify(theme));
    
    // Update CSS variables for the theme
    if (theme) {
      document.documentElement.style.setProperty('--color-primary', `var(--${theme.primary.replace('bg-', '')})`);
      document.documentElement.style.setProperty('--color-accent', `var(--${theme.accent.replace('bg-', '')})`);
      
      toast(`Color theme changed to ${theme.name}`, {
        description: `Your interface colors have been updated`,
        duration: 2000,
        icon: '🎨',
      });
    }
  };

  // Apply theme class to document element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isTransitioning) {
      root.classList.add('theme-transition');
    } else {
      root.classList.remove('theme-transition');
    }
    
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.add('dark-mode');
      root.classList.remove('light');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light');
      root.classList.add('light-mode');
      root.classList.remove('dark');
      root.classList.remove('dark-mode');
    }
  }, [isDarkMode, isTransitioning]);

  // Apply color theme if available
  useEffect(() => {
    if (colorTheme) {
      document.documentElement.style.setProperty('--color-primary', `var(--${colorTheme.primary.replace('bg-', '')})`);
      document.documentElement.style.setProperty('--color-accent', `var(--${colorTheme.accent.replace('bg-', '')})`);
    }
  }, [colorTheme]);

  const toggleDarkMode = () => {
    if (themePreference === 'system') {
      // If coming from system preference, select the opposite of current
      setThemePreference(isDarkMode ? 'light' : 'dark');
    } else {
      // Otherwise just toggle between dark and light
      setThemePreference(themePreference === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode,
      themePreference,
      setThemePreference,
      colorTheme,
      setColorTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
