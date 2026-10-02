import React from 'react';

interface KmBellProps {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const KmBell: React.FC<KmBellProps> = ({ isPlaying, onToggle, disabled = false }) => {
  return (
    <button
      type="button"
      className={`km-bell ${isPlaying ? 'km-bell--playing' : ''}`}
      onClick={onToggle}
      disabled={disabled}
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      aria-pressed={isPlaying}
    >
      <span className="km-bell__disc">
        <img
          className="km-bell__icon"
          src={isPlaying ? '/assets/kalyana-mandapam/km-audio-on.png' : '/assets/kalyana-mandapam/km-audio-off.png'}
          alt=""
          aria-hidden="true"
        />
      </span>
    </button>
  );
};

export const KmScrollCue: React.FC<{ stacked?: boolean }> = ({ stacked = true }) => {
  return (
    <button
      type="button"
      className={`km-scroll-cue ${stacked ? 'km-scroll-cue--stacked' : ''}`}
      aria-label="Scroll to next section"
      onClick={() => window.scrollBy({ top: 0.88 * window.innerHeight, behavior: 'smooth' })}
    >
      <span className="km-scroll-cue__mouse" aria-hidden="true">
        <span className="km-scroll-cue__wheel" />
      </span>
    </button>
  );
};
