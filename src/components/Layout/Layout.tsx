import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ChatContainer from '../Chat/ChatContainer';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';
import { glassTailwindClasses } from '../../utils/glassmorphism';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  const { theme } = useTheme();
  const { background } = useBackground();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Background style with dynamic image
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${background.current})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div 
      className="h-screen w-screen flex overflow-scroll relative justify-center items-center"
      style={backgroundStyle}
    >
      {/* Full-screen background overlay with blur */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${background.opacity})`,
        }}
      />

      {/* Main container with glass effect */}
      <div className="relative z-10 w-full h-11/12 flex overflow-hidden rounded-none sm:m-0 md:m-4 lg:m-6 md:rounded-xl shadow-2xl">
        {/* Sidebar - hidden on mobile when closed */}
        <div className={`${(isMobile || isTablet) && !isSidebarOpen ? 'hidden' : ''}`}>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        
        {/* Main content */}
        <div className="flex-1 ml-6 flex flex-col overflow-hidden rounded-xl backdrop-blur-sm" 
             style={{ backgroundColor: `${theme.accentColor}05` }}>
          {/* Mobile-only header with menu button */}
          {(isMobile || isTablet) && (
            <div className={`py-3 px-4 flex items-center justify-between ${glassTailwindClasses.header}`}>
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="text-white p-2 rounded-full hover:bg-white/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <h1 className="ml-4 text-white font-medium">AI Assistant</h1>
              </div>
              
              <button
                onClick={toggleSettings}
                className="text-white p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Chat container */}
          <div className="flex-1 overflow-hidden">
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 