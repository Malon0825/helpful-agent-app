import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { BackgroundSettings } from '../types';

// Import all background images
import blueBuildings from '../assets/images/soft-blue-white-buildings-under-blue-sky.jpg';
import leaves from '../assets/images/leaves-white-background.jpg';
import grayWood from '../assets/images/gray-wood-surface.jpg';
import coloredWood from '../assets/images/multi-colored-wood-surface.jpg';

export const backgroundImages = [
  { name: 'Blue Buildings', path: blueBuildings },
  { name: 'Leaves', path: leaves },
  { name: 'Gray Wood', path: grayWood },
  { name: 'Colored Wood', path: coloredWood },
];

interface BackgroundContextType {
  background: BackgroundSettings;
  changeBackground: (path: string) => void;
  adjustBlur: (value: number) => void;
  adjustOpacity: (value: number) => void;
  availableBackgrounds: typeof backgroundImages;
}

const defaultBackground: BackgroundSettings = {
  current: backgroundImages[0].path,
  blur: 8, // Default blur value
  opacity: 0.15, // Default opacity
};

const BackgroundContext = createContext<BackgroundContextType>({
  background: defaultBackground,
  changeBackground: () => {},
  adjustBlur: () => {},
  adjustOpacity: () => {},
  availableBackgrounds: backgroundImages,
});

export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<BackgroundSettings>(defaultBackground);

  // Load background settings from localStorage on initial render
  useEffect(() => {
    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
      try {
        setBackground(JSON.parse(savedBackground));
      } catch (e) {
        console.error('Failed to parse saved background settings:', e);
      }
    }
  }, []);

  // Save background settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('background', JSON.stringify(background));
  }, [background]);

  const changeBackground = (path: string) => {
    setBackground(prev => ({ ...prev, current: path }));
  };

  const adjustBlur = (value: number) => {
    setBackground(prev => ({ ...prev, blur: value }));
  };

  const adjustOpacity = (value: number) => {
    setBackground(prev => ({ ...prev, opacity: value }));
  };

  return (
    <BackgroundContext.Provider 
      value={{ 
        background, 
        changeBackground, 
        adjustBlur, 
        adjustOpacity,
        availableBackgrounds: backgroundImages
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundContext; 