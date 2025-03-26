import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../Common/Avatar';
import { glassTailwindClasses, glassHoverEffects } from '../../utils/glassmorphism';

// Import icons from assets
import chatIcon from '../../assets/icons/chat.png';
import userIcon from '../../assets/icons/user.png';

interface MessageProps {
  message: MessageType;
  isLastMessage?: boolean;
  animate?: boolean;
}

const Message: React.FC<MessageProps> = ({ 
  message, 
  isLastMessage = false,
  animate = true
}) => {
  const { theme } = useTheme();
  const messageRef = useRef<HTMLDivElement>(null);
  const isUser = message.sender === 'user';

  useEffect(() => {
    if (isLastMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Add highlight effect for the newest message
      const element = messageRef.current;
      element.classList.add('highlight-message');
      
      // Remove the effect after animation completes
      setTimeout(() => {
        element.classList.remove('highlight-message');
      }, 1000);
    }
  }, [isLastMessage]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Dynamic gradient background for user messages
  const userGradient = {
    background: `linear-gradient(135deg, ${theme.accentColor}80 0%, ${theme.accentColor}50 100%)`,
    boxShadow: `0 8px 20px -8px ${theme.accentColor}40`,
  };

  const botBackground = {
    backgroundColor: `${theme.accentColor}15`,
    backdropFilter: 'blur(8px)',
    boxShadow: `0 8px 20px -8px ${theme.accentColor}20`,
  };

  const animationClass = animate 
    ? `transform transition-all duration-500 ease-out ${
        isUser 
          ? 'animate-fade-in-slide-left' 
          : 'animate-fade-in-slide-right'
      }`
    : '';
    
  const hoverEffect = `${glassHoverEffects.lift} ${glassHoverEffects.glow}`;

  return (
    <div 
      ref={messageRef}
      className={`flex items-end my-3 group ${isUser ? 'justify-end' : 'justify-start'} ${animationClass}`}
    >
      {!isUser && (
        <div className="mr-2 mb-1 flex-shrink-0">
          <Avatar size="sm" src={chatIcon} />
        </div>
      )}
      
      <div 
        className={`
          max-w-xs md:max-w-md lg:max-w-lg px-4 py-3
          ${isUser 
            ? 'rounded-t-2xl rounded-bl-2xl rounded-br-md text-white' 
            : 'rounded-t-2xl rounded-br-2xl rounded-bl-md text-white'
          }
          backdrop-blur-md border border-white/10
          shadow-lg transition-all duration-300
          ${hoverEffect}
        `}
        style={isUser ? userGradient : botBackground}
      >
        <div className="whitespace-pre-wrap break-words relative">
          {message.text}
          
          {/* Interactive ripple effect on hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-xl"></div>
        </div>
        <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-white/50'} text-right flex justify-between items-center`}>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isUser ? 'You' : 'Assistant'}
          </div>
          <div>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="ml-2 mb-1 flex-shrink-0">
          <Avatar size="sm" src={userIcon} />
        </div>
      )}
    </div>
  );
};

export default Message; 