import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'away' | 'offline';
  initial?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User',
  size = 'md',
  status,
  initial,
}) => {
  const { theme } = useTheme();
  
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-400',
    offline: 'bg-gray-400',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeMap[size]} rounded-full object-cover border-2 border-gray-700`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-full flex items-center justify-center text-white`}
          style={{ backgroundColor: theme.accentColor }}
        >
          {initial || alt.charAt(0).toUpperCase()}
        </div>
      )}
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusColors[status]} ${statusSizes[size]} rounded-full border-2 border-gray-800`}
        ></span>
      )}
    </div>
  );
};

export default Avatar; 