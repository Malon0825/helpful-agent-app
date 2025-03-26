import React from 'react';
import { useConversation } from '../../context/ConversationContext';
import { useTheme } from '../../context/ThemeContext';
import { glassTailwindClasses, glassHoverEffects } from '../../utils/glassmorphism';

// Import icons
import chatIcon from '../../assets/icons/chat.png';
import chatTwoIcon from '../../assets/icons/chat-two.png';
import chatThreeIcon from '../../assets/icons/chat-three.png';

const ConversationList: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    createNewConversation 
  } = useConversation();
  const { theme } = useTheme();

  const formatDate = (date?: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const messageDate = new Date(date);
    
    // If the message is from today, return the time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If the message is from this week, return the day
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise, return the date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* New conversation button */}
      <div className="p-4">
        <button 
          onClick={createNewConversation}
          className={`
            w-full flex items-center justify-between py-2.5 px-4 
            rounded-xl transition-all duration-300
            ${glassTailwindClasses.button}
            ${glassHoverEffects.scale}
            pulse-accent
          `}
          style={{ 
            background: `linear-gradient(135deg, ${theme.accentColor}40 0%, ${theme.accentColor}20 100%)`,
            borderColor: `${theme.accentColor}40`,
            boxShadow: `0 4px 12px -2px ${theme.accentColor}30`
          }}
        >
          <div className="flex items-center">
            <img src={chatThreeIcon} alt="New Chat" className="w-5 h-5 mr-3" />
            <span className="text-white font-medium">New Conversation</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      
      {/* Search conversations */}
      <div className="px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className={`
              w-full py-2 pl-9 pr-3 text-white 
              bg-transparent border-white/20 focus:border-white/40 
              rounded-lg transition-all duration-300 backdrop-blur-sm
            `}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderColor: `${theme.accentColor}30`,
              outlineColor: theme.accentColor
            }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
      
      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-2 bg-green-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <p>No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              
              // Select a random chat icon based on conversation id
              const iconSeed = parseInt(conversation.id.replace(/\D/g, '0')) % 3;
              const icons = [chatIcon, chatTwoIcon, chatThreeIcon];
              const icon = icons[iconSeed] || chatIcon;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={`
                    w-full text-left p-3 rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? glassTailwindClasses.card 
                      : 'hover:bg-white/5 text-white/70'}
                    ${glassHoverEffects.lift}
                  `}
                  style={isActive ? {
                    boxShadow: `0 8px 16px -8px ${theme.accentColor}40`,
                    borderColor: `${theme.accentColor}30`
                  } : {}}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                      style={{ 
                        backgroundColor: isActive ? `${theme.accentColor}30` : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <img src={icon} alt="Chat" className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate text-white">{conversation.title}</h3>
                        <span className="text-xs text-white/50 ml-2 flex-shrink-0">
                          {formatDate(conversation.lastMessageTime)}
                        </span>
                      </div>
                      
                      {conversation.lastMessage && (
                        <p className="text-sm text-white/50 truncate mt-0.5 pr-6">
                          {conversation.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <div className="absolute top-3 right-3">
                      <div 
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        {conversation.unreadCount}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;