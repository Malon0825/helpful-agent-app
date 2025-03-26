import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Conversation, Message } from '../types';

interface ConversationContextType {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  createNewConversation: () => void;
}

// Sample initial conversations
const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'General Assistant',
    lastMessage: 'How can I help you today?',
    lastMessageTime: new Date(),
    unreadCount: 0,
    messages: [
      { 
        id: 1, 
        text: "Hello! How can I help you today?", 
        sender: "bot", 
        timestamp: new Date(Date.now() - 3600000) 
      }
    ]
  }
];

const ConversationContext = createContext<ConversationContextType>({
  conversations: initialConversations,
  activeConversationId: null,
  setActiveConversationId: () => {},
  addMessage: () => {},
  createNewConversation: () => {},
});

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('1');

  const addMessage = (conversationId: string, message: Message) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message.text,
              lastMessageTime: message.timestamp
            }
          : conv
      )
    );
  };

  const createNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: 'New Conversation',
      unreadCount: 0,
      messages: [
        { 
          id: 1, 
          text: "Hello! How can I help you today?", 
          sender: "bot", 
          timestamp: new Date() 
        }
      ]
    };
    
    setConversations(prev => [...prev, newConversation]);
    setActiveConversationId(newId);
  };

  return (
    <ConversationContext.Provider 
      value={{ 
        conversations, 
        activeConversationId, 
        setActiveConversationId, 
        addMessage,
        createNewConversation
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext; 