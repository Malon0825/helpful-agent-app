import React from 'react';

// Glassmorphism effect levels
export enum GlassLevel {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
}

// Glass effect presets
export const glassPresets = {
  [GlassLevel.Light]: {
    opacity: 0.1,
    blur: 4,
    borderOpacity: 0.1,
  },
  [GlassLevel.Medium]: {
    opacity: 0.2,
    blur: 8,
    borderOpacity: 0.15,
  },
  [GlassLevel.Heavy]: {
    opacity: 0.3,
    blur: 12,
    borderOpacity: 0.2,
  },
};

// Create glass effect styles with Tailwind classes
export const createGlassStyle = (
  level: GlassLevel = GlassLevel.Medium,
  customBgColor: string = 'rgba(255, 255, 255, 0.08)',
  customBorderColor: string = 'rgba(255, 255, 255, 0.12)'
) => {
  const preset = glassPresets[level];
  
  return `
    bg-opacity-${Math.round(preset.opacity * 100)}
    backdrop-blur-${preset.blur}
    border border-solid border-opacity-${Math.round(preset.borderOpacity * 100)}
    shadow-lg
  `;
};

// CSS-in-JS version for more control (React inline styles)
export const glassStyle = (
  level: GlassLevel = GlassLevel.Medium,
  customBgColor: string = 'rgba(255, 255, 255, 0.08)',
  customBorderColor: string = 'rgba(255, 255, 255, 0.12)'
): React.CSSProperties => {
  const preset = glassPresets[level];
  
  return {
    backgroundColor: customBgColor,
    backdropFilter: `blur(${preset.blur}px)`,
    WebkitBackdropFilter: `blur(${preset.blur}px)`,
    border: `1px solid ${customBorderColor}`,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
  };
};

// Glass morphism classes for Tailwind
export const glassTailwindClasses = {
  container: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg',
  card: 'bg-white/15 backdrop-blur-md border border-white/20 rounded-xl shadow-lg',
  input: 'bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/30 focus:ring-0 rounded-lg',
  button: 'bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20 transition-all duration-300 rounded-lg',
  sidebar: 'backdrop-blur-md border-r border-white/10',
  header: 'backdrop-blur-md border-b border-white/10',
  chatBubble: {
    user: 'bg-gradient-to-br from-primary/70 to-primary/50 backdrop-blur-md border border-white/20',
    bot: 'bg-white/15 backdrop-blur-md border border-white/20',
  },
};

// Hover effects for glassmorphism elements
export const glassHoverEffects = {
  lift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  glow: 'transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]',
  highlight: 'transition-all duration-300 hover:bg-white/30',
  scale: 'transition-all duration-300 hover:scale-105',
  pulse: 'transition-all duration-300 hover:animate-pulse',
}; 