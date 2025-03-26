import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../../types';
import Message from './Message';
import { smoothScrollToBottom } from '../../utils/animations';
import { glassTailwindClasses } from '../../utils/glassmorphism';
import LoadingIndicator from '../Common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      smoothScrollToBottom(containerRef.current);
    }
  }, [messages]);

  const renderDateSeparator = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    return (
      <div className="flex justify-center my-6">
        <div className={`
          px-4 py-1.5 rounded-full text-xs text-white/70 
          ${glassTailwindClasses.card}
        `}>
          {formattedDate}
        </div>
      </div>
    );
  };

  // Group messages by date
  const groupedMessages: { [date: string]: MessageType[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const hasMessages = Object.keys(groupedMessages).length > 0;

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto py-4 px-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    >
      {!hasMessages && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-white/50 text-center px-4">
          <div className={`${glassTailwindClasses.card} p-8 max-w-md animate-fade-in-slide-up`}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: `${theme.accentColor}10` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Your conversation is empty</h3>
            <p>Type a message below to start the conversation</p>
          </div>
        </div>
      )}

      {hasMessages && Object.entries(groupedMessages).map(([date, messagesForDate], groupIndex) => (
        <div key={date} className="animate-fade-in-slide-up" style={{ animationDelay: `${groupIndex * 100}ms` }}>
          {groupIndex > 0 && renderDateSeparator(new Date(date))}
          
          <div className="space-y-3">
            {messagesForDate.map((message, i) => (
              <Message 
                key={message.id} 
                message={message} 
                isLastMessage={i === messagesForDate.length - 1 && groupIndex === Object.keys(groupedMessages).length - 1}
                animate={true}
              />
            ))}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start my-2 animate-fade-in-slide-up">
          <div className={`${glassTailwindClasses.card} py-4 px-6 max-w-xs`}>
            <LoadingIndicator variant="dots" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 