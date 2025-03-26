export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
}

export interface ThemeSettings {
  accentColor: string;
}

export interface BackgroundSettings {
  current: string;
  blur: number;
  opacity: number;
}

export interface ApiResponse {
  response: string;
} 