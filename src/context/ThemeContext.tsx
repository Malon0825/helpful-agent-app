import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ThemeSettings } from '../types';

interface ThemeContextType {
  theme: ThemeSettings;
  changeAccentColor: (color: string) => void;
}

const defaultTheme: ThemeSettings = {
  accentColor: '#3B82F6', // Default blue accent
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  changeAccentColor: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error('Failed to parse saved theme:', e);
      }
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const changeAccentColor = (color: string) => {
    setTheme(prev => ({ ...prev, accentColor: color }));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 