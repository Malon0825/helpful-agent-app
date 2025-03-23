import React, { useState, useRef, useEffect } from 'react';

// Define types
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ApiResponse {
  response: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "I have a question about your services.", sender: "user" },
    { id: 3, text: "Sure, I'd be happy to answer any questions you have about our services.", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (inputMessage.trim() === "") return;
    
    // Add user message to the chat
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    };
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Make API request
      const response = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      const data: ApiResponse = await response.json();
      
      // Add bot response to the chat
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: data.response || "Sorry, I couldn't process your request at the moment.",
        sender: "bot"
      };
      
      // Simulate a delay to make the interaction feel more natural
      setTimeout(() => {
        setMessages(prev => [...prev, newBotMessage]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, there was an error processing your request. Please try again later.",
        sender: "bot"
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen mx-auto bg-gradient-to-tr from-gray-800 to-black shadow-lg rounded-lg overflow-hidden items-center justify-center">
      <div className="py-20">
        <h1 className="text-neutral-300 font-bold text-lg">Task Logger</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 sm:w-1/2 w-2/3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-gray-600 text-white rounded-b-3xl rounded-t-3xl rounded-br-none' 
                  : 'bg-gray-400 text-gray-800 rounded-b-3xl rounded-t-3xl rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="py-10 sm:w-1/2 w-2/3">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-0 resize-none"
            placeholder="Type a message..."
            rows={2}
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          ></textarea>
          <button
            onClick={sendMessage}
            disabled={isLoading || inputMessage.trim() === ""}
            className={`px-4 py-2 rounded-full bg-white text-white font-medium ${
              isLoading || inputMessage.trim() === "" 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;