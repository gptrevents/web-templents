// Web Audio API Synthesizer for Soothing Romantic Wedding Melodies
// Generates gentle piano, acoustic chime, and flute arpeggios without external mp3 files

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;

  // Romantic love notes (Frequencies in Hz: C4, E4, G4, B4, C5, D5, E5)
  private melodyNotes = [
    { freq: 261.63, dur: 0.8 }, // C4
    { freq: 329.63, dur: 0.6 }, // E4
    { freq: 392.00, dur: 0.8 }, // G4
    { freq: 493.88, dur: 0.6 }, // B4
    { freq: 523.25, dur: 1.2 }, // C5
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 329.63, dur: 0.8 }, // E4
    { freq: 293.66, dur: 0.6 }, // D4
    { freq: 349.23, dur: 0.8 }, // F4
    { freq: 440.00, dur: 0.6 }, // A4
    { freq: 523.25, dur: 1.0 }, // C5
    { freq: 587.33, dur: 1.2 }, // D5
    { freq: 659.25, dur: 1.5 }, // E5
    { freq: 523.25, dur: 1.0 }, // C5
    { freq: 392.00, dur: 1.0 }, // G4
    { freq: 329.63, dur: 1.4 }, // E4
  ];

  private currentNoteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      
      // Main oscillator - Soft Sine / Triangle for warm romantic tone
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Overtone oscillator for sparkle / bell-like richness
      const overtone = this.ctx.createOscillator();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, now);

      // Gain Envelope (Gentle attack, soft decay, long release)
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.04, now + duration * 0.7);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.03, now + 0.08);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.5);

      // Soft Low-pass Filter to remove harsh frequencies
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      // Connect nodes
      osc.connect(gainNode);
      overtone.connect(overtoneGain);
      gainNode.connect(filter);
      overtoneGain.connect(filter);
      filter.connect(this.ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + duration + 0.1);
      overtone.stop(now + duration + 0.1);
    } catch {
      // Ignore audio failure
    }
  }

  private scheduleNext() {
    if (!this.isPlaying) return;

    const note = this.melodyNotes[this.currentNoteIndex];
    this.playTone(note.freq, note.dur);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

    // Small random organic delay
    const delay = note.dur * 850 + 100;
    this.timerId = window.setTimeout(() => {
      this.scheduleNext();
    }, delay);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
