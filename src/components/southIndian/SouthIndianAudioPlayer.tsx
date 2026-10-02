import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../../utils/romanticAudio';

interface SouthIndianAudioPlayerProps {
  musicUrl?: string;
}

const DEFAULT_MUSIC =
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/1b15864c5f--once-more-arjun-das-aditi-shankar-hesham-abdul-wahab-vignesh-srika_PWcJIbfe.mp3';

export const SouthIndianAudioPlayer: React.FC<SouthIndianAudioPlayerProps> = ({
  musicUrl = DEFAULT_MUSIC,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      romanticAudio.stop();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.6;
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback to synthesized romantic audio if audio file blocked by browser
          romanticAudio.start();
          setIsPlaying(true);
        });
    }
  }, [isPlaying, musicUrl]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      romanticAudio.stop();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? 'bg-[#111D35]/95 border-[#E8A84C] text-[#F3ECBA] shadow-[0_0_20px_rgba(232,168,76,0.35)]'
            : 'bg-[#0c122a]/85 border-[#E8A84C]/40 text-[#F3ECBA]/70 hover:border-[#E8A84C] hover:text-[#F3ECBA]'
        } backdrop-blur-md`}
      >
        {isPlaying ? (
          <>
            {/* Animated Audio Equalizer waves */}
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-1 bg-[#E8A84C] rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-1 bg-[#E8A84C] rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
              <span className="w-1 bg-[#E8A84C] rounded-full animate-bounce [animation-delay:300ms] h-full" />
            </div>
            <span className="text-xs font-serif tracking-widest uppercase font-semibold text-[#F3ECBA]">
              Music On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#E8A84C]/80" />
            <span className="text-xs font-serif tracking-widest uppercase font-semibold">
              Play Music
            </span>
          </>
        )}
      </button>
    </div>
  );
};
