import React from 'react';
import { MapIcon, AlertCircleIcon, MessageSquareIcon, UserIcon, SettingsIcon } from 'lucide-react';

interface BottomNavDriverProps {
  onEmergency: () => void;
  onMessage: () => void;
  onProfile: () => void;
  onSettings: () => void;
}

export const BottomNavDriver: React.FC<BottomNavDriverProps> = ({
  onEmergency,
  onMessage,
  onProfile,
  onSettings
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]">
      <div className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg px-6 py-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <MapIcon className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onEmergency} 
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12"
          >
            <AlertCircleIcon className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onMessage} 
            className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <MessageSquareIcon className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onProfile} 
            className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <UserIcon className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onSettings} 
            className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <SettingsIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavDriver;

