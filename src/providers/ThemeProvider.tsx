
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  ThemeToggle: React.FC<{ className?: string }>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize from localStorage or default to system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode !== null) {
      return savedMode === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class to document element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasNoSavedPreference = localStorage.getItem('theme-mode') === null;
      if (hasNoSavedPreference) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      toast.success(`${newMode ? 'Dark' : 'Light'} mode activated`);
      return newMode;
    });
  };

  // Theme toggle component for easy reuse
  const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      } ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, ThemeToggle }}>
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
