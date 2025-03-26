import React, { useState, useRef, useEffect } from 'react';
import Button from '../Common/Button';
import { useTheme } from '../../context/ThemeContext';
import { glassTailwindClasses, glassHoverEffects } from '../../utils/glassmorphism';

// Import icons
import sendIcon from '../../assets/icons/send.png';
import chatIcon from '../../assets/icons/chat-one.png';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isLoading = false,
  placeholder = "Type a message..."
}) => {
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { theme } = useTheme();
  const typingTimeout = useRef<number | null>(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
    
    // Set typing indicator
    if (message.trim().length > 0) {
      setIsTyping(true);
      
      // Clear previous timeout
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      
      // Set timeout to clear typing indicator after 1.5s of inactivity
      typingTimeout.current = window.setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    } else {
      setIsTyping(false);
    }
    
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      
      // Return focus to textarea after sending
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        ${glassTailwindClasses.card} p-2 transition-all duration-300
        ${message.trim() ? 'shadow-lg border-white/25' : ''}
      `}
    >
      <div className="relative flex items-end">
        {/* Chat icon - animates when typing */}
        <div className={`
          w-8 h-8 flex-shrink-0 flex items-center justify-center mr-2 
          transition-all duration-300
          ${isTyping ? 'scale-110' : 'scale-100'}
        `}
        style={{ backgroundColor: isTyping ? `${theme.accentColor}10` : 'transparent' }}
        >
          <img 
            src={chatIcon} 
            alt="Chat" 
            className={`
              w-5 h-5 opacity-50
              ${isTyping ? 'animate-pulse' : ''}
            `} 
          />
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="
            flex-1 bg-transparent text-white placeholder-white/40 
            resize-none max-h-[150px] border-none focus:ring-0 
            focus:outline-none py-2 px-3
          "
          rows={1}
        />
        
        <div className="flex-shrink-0 pl-2 relative">
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className={`
              ${glassTailwindClasses.button} p-2 rounded-full
              transition-all duration-500 ease-out 
              ${message.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
              ${glassHoverEffects.scale} ${glassHoverEffects.glow}
            `}
            style={{ 
              backgroundColor: message.trim() ? `${theme.accentColor}40` : 'rgba(255,255,255,0.1)',
              borderColor: message.trim() ? `${theme.accentColor}60` : 'rgba(255,255,255,0.1)'
            }}
          >
            <img src={sendIcon} alt="Send" className="w-5 h-5" />
          </button>
          
          {/* Ring effect on hover */}
          {message.trim() && (
            <div className="
              absolute inset-0 rounded-full pointer-events-none
              border-2 border-white/0 group-hover:border-white/20
              transition-all duration-300 
              animate-pulse
            "></div>
          )}
        </div>
      </div>

      {/* Message input actions */}
      <div className="flex items-center justify-between text-white/40 px-3 pt-1 text-xs">
        <div>Shift + Enter for new line</div>
        <div className="flex items-center">
          {isTyping && (
            <div className="mr-2 text-white/60 animate-pulse">typing...</div>
          )}
          <div>{message.length} / 4000</div>
        </div>
      </div>
    </form>
  );
};

export default MessageInput; 