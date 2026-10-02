import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface FloatingMusicButtonProps {
  className?: string;
}

export const FloatingMusicButton: React.FC<FloatingMusicButtonProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await weddingAudio.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
      title={isPlaying ? 'Pause music' : 'Play Shehnai & Flute music'}
      className={`relative w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/25 flex items-center justify-center text-white active:scale-95 transition-all duration-200 shadow-lg hover:bg-black/65 cursor-pointer group ${
        isPlaying ? 'ring-2 ring-[#ECC98F]/60' : 'opacity-80'
      } ${className}`}
    >
      {isPlaying && (
        <span className="absolute inset-0 rounded-full animate-ping bg-[#ECC98F]/20 pointer-events-none" />
      )}
      
      {isPlaying ? (
        <div className="flex items-center justify-center relative">
          <Volume2 className="w-4 h-4 text-[#FFF7E6] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C158] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5C158]"></span>
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <VolumeX className="w-4 h-4 text-white/70 group-hover:scale-110 transition-transform" />
        </div>
      )}
    </button>
  );
};
