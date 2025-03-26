import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  type = 'button',
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `text-white transition-colors duration-200 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`;
      case 'secondary':
        return `bg-gray-700 text-white transition-colors duration-200 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`;
      case 'outlined':
        return `bg-transparent border-2 transition-colors duration-200 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-10'}`;
      case 'text':
        return `bg-transparent ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 hover:bg-opacity-10'}`;
      default:
        return '';
    }
  };

  const buttonStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    buttonStyle.backgroundColor = theme.accentColor;
  } else if (variant === 'outlined') {
    buttonStyle.borderColor = theme.accentColor;
    buttonStyle.color = theme.accentColor;
  } else if (variant === 'text') {
    buttonStyle.color = theme.accentColor;
  }

  return (
    <button
      type={type}
      className={`
        ${sizeClasses[size]}
        ${getVariantClasses()}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2
        font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        ${className}
      `}
      style={buttonStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
};

export default Button; 