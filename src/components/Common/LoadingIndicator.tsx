import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'spinner' | 'pulse';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  variant = 'dots',
}) => {
  const { theme } = useTheme();

  const sizeMap = {
    sm: variant === 'dots' ? 'w-1.5 h-1.5' : 'w-4 h-4',
    md: variant === 'dots' ? 'w-2 h-2' : 'w-6 h-6',
    lg: variant === 'dots' ? 'w-2.5 h-2.5' : 'w-8 h-8',
  };

  const spacingMap = {
    sm: 'space-x-1',
    md: 'space-x-1.5',
    lg: 'space-x-2',
  };

  // Spinner loading indicator
  if (variant === 'spinner') {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`${sizeMap[size]} animate-spin rounded-full border-2 border-t-transparent`}
          style={{ borderColor: `${theme.accentColor}20`, borderTopColor: theme.accentColor }}
        ></div>
      </div>
    );
  }

  // Pulse loading indicator
  if (variant === 'pulse') {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`${sizeMap[size]} rounded-full animate-pulse`}
          style={{ backgroundColor: theme.accentColor }}
        ></div>
      </div>
    );
  }

  // Dots loading indicator (default)
  return (
    <div className={`flex items-center ${spacingMap[size]}`}>
      <div
        className={`${sizeMap[size]} rounded-full animate-bounce`}
        style={{ backgroundColor: theme.accentColor, animationDelay: '0ms' }}
      ></div>
      <div
        className={`${sizeMap[size]} rounded-full animate-bounce`}
        style={{ backgroundColor: theme.accentColor, animationDelay: '200ms' }}
      ></div>
      <div
        className={`${sizeMap[size]} rounded-full animate-bounce`}
        style={{ backgroundColor: theme.accentColor, animationDelay: '400ms' }}
      ></div>
    </div>
  );
};

export default LoadingIndicator; 