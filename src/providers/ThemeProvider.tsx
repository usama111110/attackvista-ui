import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setThemePreference: (preference: 'dark' | 'light' | 'system') => void;
  themePreference: 'dark' | 'light' | 'system';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Track both the actual mode and the user preference
  const [themePreference, setThemePreference] = useState<'dark' | 'light' | 'system'>(() => {
    const savedPreference = localStorage.getItem('theme-preference');
    return (savedPreference as 'dark' | 'light' | 'system') || 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (themePreference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themePreference === 'dark';
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themePreference === 'system') {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  // Update theme based on preference
  useEffect(() => {
    if (themePreference === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    } else {
      setIsDarkMode(themePreference === 'dark');
    }
    
    localStorage.setItem('theme-preference', themePreference);
  }, [themePreference]);

  // Apply theme class to document element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

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
      setThemePreference 
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
