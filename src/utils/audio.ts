/**
 * Ambient Classical Indian Wedding Music Synthesizer
 * Synthesizes peaceful Raag Bhupali / Yaman melody with warm Tanpura drone
 * using standard Web Audio API. Zero external audio file dependency.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private melodyInterval: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private scaleFrequencies = [
    261.63, // Sa (C4)
    293.66, // Re (D4)
    329.63, // Ga (E4)
    392.00, // Pa (G4)
    440.00, // Dha (A4)
    523.25, // Sa (C5)
    587.33, // Re (D5)
    659.25, // Ga (E5)
  ];

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
    return this.isPlaying;
  }

  public async play(): Promise<void> {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // Smooth fade-in
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);

      this.startDrone();
      this.startMelody();

      this.isPlaying = true;
      this.notify();
    } catch {
      // Audio playback might be restricted before user gesture
    }
  }

  public pause(): void {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    // Smooth fade-out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    setTimeout(() => {
      this.stopDrone();
      if (this.melodyInterval) {
        clearInterval(this.melodyInterval);
        this.melodyInterval = null;
      }
      this.isPlaying = false;
      this.notify();
    }, 650);
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;
    this.stopDrone();

    // Tanpura Sa - Pa drone harmonics (130.81Hz Sa, 196Hz Pa, 261.63Hz Sa)
    const droneFreqs = [130.81, 196.00, 261.63, 131.2];
    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle pulsating drone
      gain.gain.setValueAtTime(0.03 + (idx * 0.015), this.ctx.currentTime);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.masterGain);

      osc.start();
      this.droneOscs.push(osc);
    });
  }

  private stopDrone() {
    this.droneOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscs = [];
  }

  private startMelody() {
    if (!this.ctx || !this.masterGain) return;
    if (this.melodyInterval) clearInterval(this.melodyInterval);

    let noteIdx = 0;
    const melodyPattern = [0, 1, 2, 4, 3, 2, 1, 0, 2, 4, 5, 4, 2, 1, 0];

    const playNextNote = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const freq = this.scaleFrequencies[melodyPattern[noteIdx % melodyPattern.length]];
      noteIdx++;

      // Bansuri / Sitar harmonic synthesizer
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const noteFilter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc2.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      // Expressive Indian classical flute envelope
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.07, now + 0.18);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(noteFilter);
      noteFilter.connect(this.masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 1.3);
      osc2.stop(now + 1.3);
    };

    // Play first note immediately, then peaceful cadence
    playNextNote();
    this.melodyInterval = window.setInterval(playNextNote, 1350);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
