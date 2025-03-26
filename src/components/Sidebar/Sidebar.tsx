import React from 'react';
import ConversationList from './ConversationList';
import ProfileSection from './ProfileSection';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../context/ThemeContext';
import { glassTailwindClasses } from '../../utils/glassmorphism';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isMobile } = useResponsive();
  const { theme } = useTheme();

  // Sidebar gradient with user's accent color
  const sidebarStyle = {
    background: `linear-gradient(to bottom, ${theme.accentColor}10, ${theme.accentColor}20)`,
  };

  // For mobile, render a slide-out sidebar with backdrop
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-sm z-20 transition-opacity duration-700"
            style={{ backgroundColor: `${theme.accentColor}40` }}
            onClick={onClose}
          />
        )}
        
        {/* Sliding sidebar */}
        <div 
          className={`
            fixed inset-y-0 left-0 w-72 z-30
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            ${glassTailwindClasses.sidebar}
          `}
          style={sidebarStyle}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <ConversationList />
            </div>
            <ProfileSection />
          </div>
        </div>
      </>
    );
  }

  // For desktop, render a fixed sidebar
  return (
    <div 
      className={`
        h-full w-72 overflow-hidden flex flex-col shadow-xl rounded-xl
        ${glassTailwindClasses.sidebar}
      `}
      style={sidebarStyle}
    >
      <div className="flex-1 overflow-hidden">
        <ConversationList />
      </div>
      <ProfileSection />
    </div>
  );
};

export default Sidebar; 