import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useConversation } from '../../context/ConversationContext';
import { useApi } from '../../hooks/useApi';
import { Message } from '../../types';
import { glassTailwindClasses } from '../../utils/glassmorphism';
import { useTheme } from '../../context/ThemeContext';

const ChatContainer: React.FC = () => {
  const { conversations, activeConversationId, addMessage } = useConversation();
  const { sendMessage, isLoading } = useApi();
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Find the active conversation
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  const handleSendMessage = async (text: string) => {
    if (!activeConversationId) return;
    
    // Add user message to the conversation
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(activeConversationId, userMessage);
    setError(null);
    
    try {
      // Send message to API
      const response = await sendMessage(text);
      
      // Add bot response to the conversation
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.response || "I'm sorry, I couldn't process your request.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      addMessage(activeConversationId, botMessage);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Add error message to the conversation
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      addMessage(activeConversationId, errorMessage);
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-white/80 px-4 text-center">
        <div className={`${glassTailwindClasses.card} p-8 max-w-md`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-lg font-medium mb-2">No Conversation Selected</p>
          <p className="text-white/60">Select a conversation from the sidebar or start a new one to begin chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat header */}
      <div className={`py-3 px-4 flex justify-between items-center ${glassTailwindClasses.header}`} 
           style={{ backgroundColor: `${theme.accentColor}10` }}>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full mr-2"></div>
          <h2 className="text-lg font-medium text-white">{activeConversation.title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
          </button>
          <button className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <MessageList 
        messages={activeConversation.messages}
        isLoading={isLoading}
      />
      
      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-400/20 text-red-400 px-4 py-2 mx-4 mb-2 rounded-lg text-sm backdrop-blur-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      {/* Message input */}
      <div className="p-4">
        <MessageInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatContainer; 