import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TeatroAudioToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const TeatroAudioToggle: React.FC<TeatroAudioToggleProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <aside aria-label="Audio controls" className="fixed bottom-5 right-5 z-[999]">
      <button
        type="button"
        onClick={onToggle}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        style={{
          backgroundColor: isPlaying ? 'rgba(92, 32, 24, 0.92)' : 'rgba(255, 255, 255, 0.9)',
          color: isPlaying ? '#FAF8F5' : '#5C2018',
          border: '1px solid rgba(92, 32, 24, 0.25)',
          boxShadow: '0 8px 24px rgba(92, 32, 24, 0.2)',
        }}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </aside>
  );
};
