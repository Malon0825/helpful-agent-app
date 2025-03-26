import React, { useState } from 'react';
import Avatar from '../Common/Avatar';
import { useTheme } from '../../context/ThemeContext';
import ColorPicker from './ColorPicker';
import { glassTailwindClasses, glassHoverEffects } from '../../utils/glassmorphism';

// Import icons
import userIcon from '../../assets/icons/user.png';
import headsetIcon from '../../assets/icons/headset.png';
import helpIcon from '../../assets/icons/help.png';
import BackgroundSettings from '../Layout/BackgroundSettings';

// Mock user data - in a real app, this would come from user context/state
const user = {
  id: '1',
  name: 'John Doe',
  avatar: '',
  status: 'online' as const,
};

const ProfileSection: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBackgroundSettingsOpen, setIsBackgroundSettingsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    // Close background settings when toggling main settings
    if (isBackgroundSettingsOpen) {
      setTimeout(() => {
        setIsBackgroundSettingsOpen(false);
      }, 200); // Slight delay for smoother nested animations
    }
  };

  const toggleBackgroundSettings = () => {
    setIsBackgroundSettingsOpen(!isBackgroundSettingsOpen);
    // Always open settings panel when opening background settings
    if (!isSettingsOpen) setIsSettingsOpen(true);
  };

  return (
    <div className={`p-4 ${glassTailwindClasses.card} border-t-0 rounded-xl mx-2 mb-2 bottom-0 left-0 right-0 overflow-scroll`}>
      {/* User info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar 
            size="md" 
            initial={user.name.charAt(0)} 
            status={user.status} 
            src={userIcon}
          />
          <div>
            <h3 className="font-medium text-white group-hover:text-white transition-colors">{user.name}</h3>
            <p className="text-sm text-white/60 flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                user.status === 'online' ? 'bg-green-500' : 
                user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></span>
              <span className="capitalize">{user.status}</span>
            </p>
          </div>
        </div>
        
        {/* Settings button */}
        <div
          onClick={toggleSettings}
          className={`
            text-white/70 hover:text-white p-2.5 rounded-full 
            transition-all duration-300 hover:bg-white/10
            ${isSettingsOpen ? 'bg-white/10 text-white' : ''}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      
      {/* Settings panel - animated */}
      <div 
        className={`
          mt-4 overflow-hidden transition-all duration-500 ease-in-out
          ${isSettingsOpen ? 'max-h-[650px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className={`relative px-4 py-4 ${glassTailwindClasses.card}`}>
          <h4 className="text-white font-medium mb-3">Settings</h4>
          
          {/* Theme customization */}
          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-2">Accent Color</label>
            <ColorPicker />
          </div>
          
          {/* Status selector */}
          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-2">Status</label>
            <select 
              className={`
                w-full py-2 px-3 rounded-lg appearance-none
                text-white focus:outline-none bg-white/10 border border-white/20
                focus:border-white/30 backdrop-blur-sm
              `}
              defaultValue={user.status}
              style={{ borderColor: `${theme.accentColor}30` }}
            >
              <option value="online" className="bg-gray-800">Online</option>
              <option value="away" className="bg-gray-800">Away</option>
              <option value="offline" className="bg-gray-800">Offline</option>
            </select>
          </div>

          {/* Background settings button */}
          <div 
            onClick={toggleBackgroundSettings}
            className={`
              flex items-center justify-between mb-4 py-2 px-3 rounded-lg cursor-pointer
              ${glassTailwindClasses.button} ${glassHoverEffects.scale}
              ${isBackgroundSettingsOpen ? 'border-white/40' : ''}
              transform transition-all duration-300
            `}
            style={isBackgroundSettingsOpen ? {
              boxShadow: `0 4px 12px -2px ${theme.accentColor}30`,
              borderColor: `${theme.accentColor}40`
            } : {}}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-sm">Background Settings</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className={`w-4 h-4 transition-transform duration-500 ease-in-out ${isBackgroundSettingsOpen ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          
          {/* Background settings container with enhanced animations */}
          <div 
            className={`
              overflow-hidden transition-all duration-500 ease-in-out mb-4
              transform origin-top
              ${isBackgroundSettingsOpen 
                ? 'opacity-100 max-h-[500px] scale-y-100' 
                : 'opacity-0 max-h-0 scale-y-95 pointer-events-none'}
            `}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: isBackgroundSettingsOpen ? '100ms' : '0ms'
            }}
          >
            {isBackgroundSettingsOpen && (
              <BackgroundSettings 
                onClose={() => setIsBackgroundSettingsOpen(false)} 
                isEmbedded={true} 
                showPanelControls={true}
              />
            )}
          </div>
          
          {/* Quick buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className={`
              flex items-center justify-center py-2 rounded-lg cursor-pointer
              ${glassTailwindClasses.button} ${glassHoverEffects.scale}
            `}>
              <img src={headsetIcon} alt="Support" className="w-4 h-4 mr-2" />
              <span className="text-sm">Support</span>
            </div>
            <div className={`
              flex items-center justify-center py-2 rounded-lg cursor-pointer
              ${glassTailwindClasses.button} ${glassHoverEffects.scale}
            `}>
              <img src={helpIcon} alt="Help" className="w-4 h-4 mr-2" />
              <span className="text-sm">Help</span>
            </div>
          </div>
          
          {/* Logout button */}
          <div 
            className={`
              w-full py-2.5 rounded-lg font-medium text-white
              transition-all duration-300 bg-gradient-to-r
              from-red-500/70 to-red-600/70 hover:from-red-500/80 hover:to-red-600/80
              backdrop-blur-md border border-white/10
              ${glassHoverEffects.scale} ${glassHoverEffects.glow}
            `}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection; 