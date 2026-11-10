/**
 * Soccer Stars - Stadium Sound and Audio System
 * Central procedural Web Audio API manager.
 * - 100% Offline & bundled locally
 * - Zero external URLs or streaming dependencies
 * - Gentle looping stadium crowd ambience
 * - Dynamic volume & mute controls (Master, Music/Ambience, SFX)
 * - Persisted settings via localStorage
 * - Browser audio unlock on first user gesture
 * - Anti-overlap voice debouncing
 */

export interface AudioSettings {
  masterVolume: number; // 0 to 1
  musicVolume: number;  // 0 to 1 (Ambience & Victory Music)
  sfxVolume: number;    // 0 to 1 (Dice, Kicks, Whistle, Cards)
  isMasterMuted: boolean;
  isMusicMuted: boolean;
  isSfxMuted: boolean;
}

const SETTINGS_KEY = 'soccer_stars_audio_settings_v1';

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Stadium Ambience Nodes
  private ambienceSource: AudioNode | null = null;
  private ambienceGain: GainNode | null = null;
  private isAmbiencePlaying: boolean = false;

  // Settings
  private settings: AudioSettings = {
    masterVolume: 0.8,
    musicVolume: 0.5,
    sfxVolume: 0.85,
    isMasterMuted: false,
    isMusicMuted: false,
    isSfxMuted: false,
  };

  private listeners: Set<(settings: AudioSettings) => void> = new Set();
  private lastKickTime: number = 0;
  private isUnlocked: boolean = false;

  constructor() {
    this.loadSettings();
    if (typeof window !== 'undefined') {
      // Auto-unlock audio context on first user interaction
      const unlock = () => {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => {
            this.isUnlocked = true;
          }).catch(() => {});
        } else {
          this.isUnlocked = true;
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  /**
   * Initializes AudioContext and Master / Music / SFX gain bus routing
   */
  public init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    if (typeof window === 'undefined') return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtx) return;

      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(
        this.settings.isMasterMuted ? 0 : this.settings.masterVolume,
        this.ctx.currentTime
      );
      this.masterGain.connect(this.ctx.destination);

      // Music / Ambience Sub-bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(
        this.settings.isMusicMuted ? 0 : this.settings.musicVolume,
        this.ctx.currentTime
      );
      this.musicGain.connect(this.masterGain);

      // SFX Sub-bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(
        this.settings.isSfxMuted ? 0 : this.settings.sfxVolume,
        this.ctx.currentTime
      );
      this.sfxGain.connect(this.masterGain);
    } catch {
      // Graceful fallback if Web Audio is unsupported
    }
  }

  /**
   * Subscribe to settings updates
   */
  public subscribe(callback: (settings: AudioSettings) => void): () => void {
    this.listeners.add(callback);
    callback({ ...this.settings });
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.settings }));
  }

  private loadSettings() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.settings = { ...this.settings, ...parsed };
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  private saveSettings() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // --- VOLUME CONTROLS ---

  public setMasterVolume(vol: number) {
    this.settings.masterVolume = Math.max(0, Math.min(1, vol));
    this.init();
    if (this.ctx && this.masterGain) {
      const val = this.settings.isMasterMuted ? 0 : this.settings.masterVolume;
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    this.saveSettings();
    this.notify();
  }

  public setMusicVolume(vol: number) {
    this.settings.musicVolume = Math.max(0, Math.min(1, vol));
    this.init();
    if (this.ctx && this.musicGain) {
      const val = this.settings.isMusicMuted ? 0 : this.settings.musicVolume;
      this.musicGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    this.saveSettings();
    this.notify();
  }

  public setSfxVolume(vol: number) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, vol));
    this.init();
    if (this.ctx && this.sfxGain) {
      const val = this.settings.isSfxMuted ? 0 : this.settings.sfxVolume;
      this.sfxGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    this.saveSettings();
    this.notify();
  }

  public toggleMasterMute(): boolean {
    this.settings.isMasterMuted = !this.settings.isMasterMuted;
    this.setMasterVolume(this.settings.masterVolume);
    return this.settings.isMasterMuted;
  }

  public toggleMusicMute(): boolean {
    this.settings.isMusicMuted = !this.settings.isMusicMuted;
    this.setMusicVolume(this.settings.musicVolume);
    return this.settings.isMusicMuted;
  }

  public toggleSfxMute(): boolean {
    this.settings.isSfxMuted = !this.settings.isSfxMuted;
    this.setSfxVolume(this.settings.sfxVolume);
    return this.settings.isSfxMuted;
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  // Backward-compatibility helpers with previous soundEngine
  public setMuted(muted: boolean) {
    this.settings.isMasterMuted = muted;
    this.setMasterVolume(this.settings.masterVolume);
  }

  public getMuted(): boolean {
    return this.settings.isMasterMuted;
  }

  public toggleMuted(): boolean {
    return this.toggleMasterMute();
  }

  // --- 1. STADIUM BACKGROUND AMBIENCE (GENTLE CROWD ATMOSPHERE) ---

  /**
   * Starts gentle procedural stadium crowd atmosphere:
   * Multi-layered filtered noise buffers with subtle low murmurs and gentle crowd waves.
   * Runs in an infinite loop without external audio files.
   */
  public startAmbience() {
    if (this.isAmbiencePlaying) return;
    this.init();
    if (!this.ctx || !this.musicGain) return;

    try {
      const sampleRate = this.ctx.sampleRate;
      const bufferLength = sampleRate * 5; // 5-second seamless loop buffer
      const noiseBuffer = this.ctx.createBuffer(2, bufferLength, sampleRate);

      for (let channel = 0; channel < 2; channel++) {
        const data = noiseBuffer.getChannelData(channel);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferLength; i++) {
          const white = Math.random() * 2 - 1;
          // Pink-noise filter for natural acoustic crowd air
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.11;
        }
      }

      // Loop source
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Bandpass shaping crowd frequencies (200Hz - 800Hz stadium hum)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(360, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

      // Lowpass to roll off harsh high frequencies
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(650, this.ctx.currentTime);

      // Gentle LFO modulating the crowd volume to simulate breathing/chanting waves
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // 5-second gentle wave
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      // Local ambience gain
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Smooth fade-in over 2 seconds
      this.ambienceGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.0);

      lfo.connect(lfoGain);
      lfoGain.connect(this.ambienceGain.gain);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(this.ambienceGain);
      this.ambienceGain.connect(this.musicGain);

      noiseSource.start();
      lfo.start();

      this.ambienceSource = noiseSource;
      this.isAmbiencePlaying = true;
    } catch {
      // Audio fallback
    }
  }

  /**
   * Stops stadium ambience with a smooth fade-out (e.g. when victory screen appears)
   */
  public stopAmbience(fadeDuration: number = 0.8) {
    if (!this.isAmbiencePlaying || !this.ctx || !this.ambienceGain) return;

    try {
      const now = this.ctx.currentTime;
      this.ambienceGain.gain.cancelScheduledValues(now);
      this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, now);
      this.ambienceGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

      setTimeout(() => {
        try {
          if (this.ambienceSource && 'stop' in this.ambienceSource) {
            (this.ambienceSource as AudioScheduledSourceNode).stop();
          }
        } catch {}
        this.ambienceSource = null;
        this.ambienceGain = null;
        this.isAmbiencePlaying = false;
      }, fadeDuration * 1000 + 50);
    } catch {
      this.isAmbiencePlaying = false;
    }
  }

  // --- 2. DICE ROLLING ---

  public playDiceRoll() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const clicks = 8;
    for (let i = 0; i < clicks; i++) {
      const time = now + i * 0.085 + Math.random() * 0.025;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280 + Math.random() * 320, time);
      osc.frequency.exponentialRampToValueAtTime(80, time + 0.045);

      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(time);
      osc.stop(time + 0.045);
    }
  }

  public playDiceLand() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // --- 3. FOOTBALL KICK (DURING CHARACTER MOVEMENT) ---

  /**
   * Resonant football boot strike on leather ball & turf impact.
   * Debounced to prevent clipping on rapid steps.
   */
  public playKick() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    if (now - this.lastKickTime < 0.08) return; // Debounce
    this.lastKickTime = now;

    // Body of the ball strike: low punchy thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(190 + Math.random() * 20, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.09);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    // Leather surface contact click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(450, now);
    clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.03);
    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    clickOsc.connect(clickGain);
    clickGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);

    clickOsc.start(now);
    clickOsc.stop(now + 0.03);
  }

  // Backwards compatibility for playStep
  public playStep() {
    this.playKick();
  }

  // --- 4. CROWD CHEERING (TRIGGERED BY GOALS & SPECIAL EVENTS) ---

  /**
   * Dynamic crowd cheering roar:
   * Layered filtered noise bursts with major chord fanfare resonance
   */
  public playCheer() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    // 1. Crowd roar noise wash
    try {
      const bufferLength = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferLength, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.linearRampToValueAtTime(900, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(350, now + 1.5);
      filter.Q.setValueAtTime(1.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 1.5);
    } catch {}

    // 2. Triumphant Goal Fanfare Chords (C5 - E5 - G5 - C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.55);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.55);
    });
  }

  // --- 5. REFEREE WHISTLE ---

  /**
   * High-contrast double-chirp referee whistle with acoustic trill
   */
  public playWhistle() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    [0, 0.15].forEach((delay) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(2450, now + delay);
      osc.frequency.setValueAtTime(2700, now + delay + 0.04);
      osc.frequency.setValueAtTime(2400, now + delay + 0.08);

      gain.gain.setValueAtTime(0.15, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + delay);
      osc.stop(now + delay + 0.12);
    });
  }

  // --- 6. YELLOW CARD SOUND ---

  /**
   * Tactical foul alert: short cautionary whistle + ominous two-tone caution buzzer
   */
  public playYellowCard() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    // Short referee alert chirp
    const whistle = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();
    whistle.type = 'square';
    whistle.frequency.setValueAtTime(2200, now);
    whistleGain.gain.setValueAtTime(0.12, now);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    whistle.connect(whistleGain);
    whistleGain.connect(this.sfxGain);
    whistle.start(now);
    whistle.stop(now + 0.09);

    // Two-tone Amber caution buzzer (320Hz -> 240Hz)
    [0.1, 0.24].forEach((offset, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(idx === 0 ? 340 : 255, now + offset);

      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + offset);
      osc.stop(now + offset + 0.18);
    });
  }

  // Backwards compatibility alias
  public playCardBuzzer() {
    this.playYellowCard();
  }

  // --- 7. RED CARD SOUND ---

  /**
   * Severe penalty / expulsion sound: sharp urgent whistle + heavy descending alarm horn
   */
  public playRedCard() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    // Long piercing whistle blast
    const whistle = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();
    whistle.type = 'square';
    whistle.frequency.setValueAtTime(2600, now);
    whistleGain.gain.setValueAtTime(0.18, now);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    whistle.connect(whistleGain);
    whistleGain.connect(this.sfxGain);
    whistle.start(now);
    whistle.stop(now + 0.22);

    // Deep heavy expulsion horn chord (160Hz & 120Hz minor dissonance)
    [160, 120].forEach((freq) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.65);

      gain.gain.setValueAtTime(0.24, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + 0.15);
      osc.stop(now + 0.65);
    });
  }

  // --- SPECIAL MOVES & EVENT SOUNDS ---

  public playSprint() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.26);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.29);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.29);
  }

  public playSave() {
    if (this.settings.isMasterMuted || this.settings.isSfxMuted) return;
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.15);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // --- 8. CHAMPIONSHIP VICTORY MUSIC & CROWD CELEBRATION ---

  /**
   * Triumphant brass anthem melody with stadium cheer wash.
   * Route to musicGain so music volume controls this piece.
   */
  public playVictory() {
    this.init();
    if (!this.ctx) return;

    // Stop normal game ambience so victory fanfare takes the spotlight
    this.stopAmbience(0.4);

    if (this.settings.isMasterMuted || this.settings.isMusicMuted || !this.musicGain) return;

    const now = this.ctx.currentTime;

    // 1. Victory Crowd Roar
    try {
      const bufferLength = this.ctx.sampleRate * 3.5;
      const buffer = this.ctx.createBuffer(1, bufferLength, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.16;
      }
      const roar = this.ctx.createBufferSource();
      roar.buffer = buffer;
      const roarFilter = this.ctx.createBiquadFilter();
      roarFilter.type = 'lowpass';
      roarFilter.frequency.setValueAtTime(800, now);

      const roarGain = this.ctx.createGain();
      roarGain.gain.setValueAtTime(0.05, now);
      roarGain.gain.linearRampToValueAtTime(0.3, now + 0.8);
      roarGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

      roar.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(this.musicGain);

      roar.start(now);
      roar.stop(now + 3.5);
    } catch {}

    // 2. Grand Brass Fanfare Melody (Triumphant Anthem)
    const anthem = [
      { f: 523.25, d: 0.18 }, // C5
      { f: 659.25, d: 0.18 }, // E5
      { f: 783.99, d: 0.18 }, // G5
      { f: 1046.5, d: 0.45 }, // C6
      { f: 880.0, d: 0.22 },  // A5
      { f: 1046.5, d: 0.35 }, // C6
      { f: 1174.66, d: 0.25 },// D6
      { f: 1318.51, d: 0.75 },// E6 (Grand final triumph)
    ];

    let cursor = now + 0.1;
    anthem.forEach((note) => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, cursor);

      // Add octave harmonic for rich brass body
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(note.f * 0.5, cursor);

      gain.gain.setValueAtTime(0.22, cursor);
      gain.gain.exponentialRampToValueAtTime(0.001, cursor + note.d);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.musicGain);

      osc.start(cursor);
      osc.stop(cursor + note.d);
      oscHarmonic.start(cursor);
      oscHarmonic.stop(cursor + note.d);

      cursor += note.d * 0.92;
    });
  }

  // --- TEST SOUND SEQUENCE ---

  /**
   * Plays a quick test sequence (Kick -> Whistle -> Cheer) to verify sound levels
   */
  public testSound() {
    this.init();
    this.playKick();
    setTimeout(() => {
      this.playWhistle();
    }, 280);
    setTimeout(() => {
      this.playCheer();
    }, 650);
  }
}

// Central reusable Audio Manager singleton
export const audioManager = new AudioManager();
export const soundEngine = audioManager;
