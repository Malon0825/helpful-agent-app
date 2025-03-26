import React, { useState } from 'react';
import { useBackground } from '../../context/BackgroundContext';
import { glassTailwindClasses, glassHoverEffects } from '../../utils/glassmorphism';
import { useTheme } from '../../context/ThemeContext';

interface BackgroundSettingsProps {
  onClose: () => void;
  isEmbedded?: boolean;
  showPanelControls?: boolean;
}

interface PanelSettings {
  opacity: number;
  blur: number;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ 
  onClose, 
  isEmbedded = false,
  showPanelControls = false
}) => {
  const { 
    background, 
    changeBackground,
    adjustBlur,
    adjustOpacity,
    availableBackgrounds 
  } = useBackground();
  
  const { theme } = useTheme();

  // Local state for panel settings
  const [panelSettings, setPanelSettings] = useState<PanelSettings>({
    opacity: 0.15, // Default opacity (matches the default in glassmorphism.ts)
    blur: 8,       // Default blur (matches the default in glassmorphism.ts)
  });

  // Different container styles based on whether the component is embedded or floating
  const containerClasses = isEmbedded 
    ? `w-full rounded-lg ${glassTailwindClasses.card}`
    : `absolute right-4 top-16 w-80 z-50  rounded-xl shadow-xl animate-fade-in-slide-up ${glassTailwindClasses.card}`;

  // Apply panel settings to the component itself for live preview
  const panelStyle = showPanelControls ? {
    backdropFilter: `blur(${panelSettings.blur}px)`,
    WebkitBackdropFilter: `blur(${panelSettings.blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${panelSettings.opacity})`,
    transition: 'all 0.3s ease-in-out'
  } : {};

  // Update panel opacity
  const handlePanelOpacityChange = (value: number) => {
    setPanelSettings(prev => ({
      ...prev,
      opacity: value
    }));
    
    // Here you would update any global state for panels
    // e.g., updateGlobalPanelSettings({ opacity: value });
  };

  // Update panel blur
  const handlePanelBlurChange = (value: number) => {
    setPanelSettings(prev => ({
      ...prev,
      blur: value
    }));
    
    // Here you would update any global state for panels
    // e.g., updateGlobalPanelSettings({ blur: value });
  };

  return (
    <div className={containerClasses} style={panelStyle}>
      {!isEmbedded && (
        <div className="p-4 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Background Settings</h3>
            <button 
              onClick={onClose}
              className="text-white p-1 rounded-full hover:bg-white/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="p-4 space-y-4 h-72 overflow-scroll">
        {/* Only show title if embedded */}
        {isEmbedded && (
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white/80 text-sm font-medium">Background Options</h4>
          </div>
        )}

        {/* Background Selection */}
        <div className="animate-fade-in-slide-up" style={{ animationDelay: '50ms' }}>
          <label className="block text-white text-sm mb-2">Background Image</label>
          <div className="grid grid-cols-2 gap-2">
            {availableBackgrounds.map((img, index) => (
              <button
                key={img.name}
                className={`
                  rounded-lg overflow-hidden border-2 transition-all duration-300
                  ${background.current === img.path ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'}
                  ${glassHoverEffects.scale}
                `}
                onClick={() => changeBackground(img.path)}
                style={{ animationDelay: `${50 + index * 50}ms` }}
              >
                <div className="aspect-video w-full">
                  <img 
                    src={img.path} 
                    alt={img.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-1 text-xs text-center text-white bg-black/30 backdrop-blur-sm">
                  {img.name}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Background Controls */}
        <div className="animate-fade-in-slide-up" style={{ animationDelay: '100ms' }}>
          <h5 className="block text-white text-sm mb-3 border-b border-white/10 pb-1">Background Controls</h5>
          
          {/* Blur Control */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Background Blur: {background.blur}px
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1"
              value={background.blur}
              onChange={(e) => adjustBlur(Number(e.target.value))}
              className="w-full rounded-lg appearance-none h-2 bg-white/20 focus:outline-none"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${theme.accentColor}30, ${theme.accentColor}50)`,
                height: '6px'
              }}
            />
          </div>
          
          {/* Opacity Control */}
          <div>
            <label className="block text-white text-sm mb-2">
              Background Overlay: {Math.round(background.opacity * 100)}%
            </label>
            <input 
              type="range" 
              min="0" 
              max="1.0" 
              step="0.01"
              value={background.opacity}
              onChange={(e) => adjustOpacity(Number(e.target.value))}
              className="w-full rounded-lg appearance-none h-2 bg-white/20 focus:outline-none"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${theme.accentColor}30, ${theme.accentColor}50)`,
                height: '6px'
              }}
            />
          </div>
        </div>
        
        {/* Panel Controls - Only show if requested */}
        {showPanelControls && (
          <div className="animate-fade-in-slide-up" style={{ animationDelay: '150ms' }}>
            <h5 className="block text-white text-sm mb-3 border-b border-white/10 pb-1">Panel Controls</h5>
            
            {/* Panel Opacity Control */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">
                Panel Opacity: {Math.round(panelSettings.opacity * 100)}%
              </label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.01"
                value={panelSettings.opacity}
                onChange={(e) => handlePanelOpacityChange(Number(e.target.value))}
                className="w-full rounded-lg appearance-none h-2 bg-white/20 focus:outline-none"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${theme.accentColor}30, ${theme.accentColor}50)`,
                  height: '6px'
                }}
              />
              <p className="text-xs text-white/50 mt-1">
                Controls transparency of UI panels
              </p>
            </div>
            
            {/* Panel Blur Control */}
            <div>
              <label className="block text-white text-sm mb-2">
                Panel Blur: {panelSettings.blur}px
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={panelSettings.blur}
                onChange={(e) => handlePanelBlurChange(Number(e.target.value))}
                className="w-full rounded-lg appearance-none h-2 bg-white/20 focus:outline-none"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${theme.accentColor}30, ${theme.accentColor}50)`,
                  height: '6px' 
                }}
              />
              <p className="text-xs text-white/50 mt-1">
                Controls blur effect of UI panels
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSettings; 