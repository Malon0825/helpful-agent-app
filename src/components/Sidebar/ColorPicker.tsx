import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { glassHoverEffects } from '../../utils/glassmorphism';

const ColorPicker: React.FC = () => {
  const { theme, changeAccentColor } = useTheme();
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Predefined colors with gradients
  const colors = [
    { color: '#3B82F6', name: 'Blue' },       // blue
    { color: '#10B981', name: 'Green' },      // green
    { color: '#F59E0B', name: 'Amber' },      // amber
    { color: '#EF4444', name: 'Red' },        // red
    { color: '#8B5CF6', name: 'Purple' },     // purple
    { color: '#EC4899', name: 'Pink' },       // pink
    { color: '#06B6D4', name: 'Cyan' },       // cyan
    { color: '#F97316', name: 'Orange' },     // orange
  ];

  const createGradient = (color: string) => {
    return `linear-gradient(135deg, ${color}90 0%, ${color}60 100%)`;
  };

  const handleCustomColorClick = () => {
    // Programmatically click the hidden color input
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map(({ color, name }) => (
        <div
          key={color}
          className={`w-8 h-8 rounded-full transition-all duration-300 shadow-sm 
            ${theme.accentColor === color 
              ? 'ring-2 ring-white scale-110 shadow-lg' 
              : 'hover:scale-105 opacity-80 hover:opacity-100'}
            ${glassHoverEffects.glow}
          `}
          style={{ 
            background: createGradient(color),
            boxShadow: theme.accentColor === color ? `0 0 12px ${color}80` : 'none'
          }}
          onClick={() => changeAccentColor(color)}
          aria-label={`Set accent color to ${name}`}
          title={name}
        />
      ))}
      
      {/* Custom color input */}
      <div className="relative w-8 h-8">
        <input
          ref={colorInputRef}
          type="color"
          value={theme.accentColor}
          onChange={(e) => changeAccentColor(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          aria-label="Choose custom accent color"
        />
        <div
          onClick={handleCustomColorClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden 
                     border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 
                     transition-colors ${glassHoverEffects.scale}`}
          style={{ 
            boxShadow: !colors.some(c => c.color === theme.accentColor) ? 
              `0 0 12px ${theme.accentColor}80` : 'none'
          }}
          aria-label="Choose custom color"
          title="Custom color"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker; 