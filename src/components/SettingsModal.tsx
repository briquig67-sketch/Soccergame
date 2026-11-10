import React, { useEffect, useState } from 'react';
import { audioManager, AudioSettings } from '../utils/audio';

export type AnimationPace = 'normal' | 'fast' | 'turbo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Animation speed controls
  animationSpeed?: AnimationPace;
  onChangeAnimationSpeed?: (speed: AnimationPace) => void;
  // Display toggles
  showDirectionArrows?: boolean;
  onToggleDirectionArrows?: () => void;
  showPitchMarkings?: boolean;
  onTogglePitchMarkings?: () => void;
  // Reset game action
  onResetGame?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  animationSpeed = 'normal',
  onChangeAnimationSpeed,
  showDirectionArrows = true,
  onToggleDirectionArrows,
  showPitchMarkings = true,
  onTogglePitchMarkings,
  onResetGame,
}) => {
  const [settings, setSettings] = useState<AudioSettings>(audioManager.getSettings());
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((newSettings) => {
      setSettings(newSettings);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleTestSound = () => {
    setIsTesting(true);
    audioManager.testSound();
    setTimeout(() => {
      setIsTesting(false);
    }, 1400);
  };

  const handleConfirmReset = () => {
    if (onResetGame) {
      onResetGame();
    }
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-xl shadow">
              ⚙️
            </span>
            <div>
              <h2
                id="game-settings-title"
                className="font-cartoon font-black text-base sm:text-lg text-white tracking-wide"
              >
                Game & Sound Settings
              </h2>
              <p className="text-[11px] text-slate-400">
                Stadium Audio, Animation Speed & Match Options
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            title="Close Settings"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="my-3 space-y-4 overflow-y-auto pr-1 max-h-[65vh]">
          
          {/* SECTION 1: AUDIO SETTINGS */}
          <div className="space-y-3">
            <h3 className="text-xs font-cartoon font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>🔊</span>
              <span>Audio Controls</span>
            </h3>

            {/* 1. MASTER VOLUME */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎚️</span>
                  <span className="font-cartoon font-bold text-xs sm:text-sm text-white">
                    Master Volume
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-300 w-12 text-right">
                    {settings.isMasterMuted ? 'MUTED' : `${Math.round(settings.masterVolume * 100)}%`}
                  </span>
                  <button
                    type="button"
                    onClick={() => audioManager.toggleMasterMute()}
                    className={`px-2 py-0.5 rounded text-[10px] font-cartoon font-bold border transition-colors cursor-pointer ${
                      settings.isMasterMuted
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {settings.isMasterMuted ? 'UNMUTE' : 'MUTE'}
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.isMasterMuted ? 0 : settings.masterVolume}
                onChange={(e) => {
                  if (settings.isMasterMuted) audioManager.toggleMasterMute();
                  audioManager.setMasterVolume(parseFloat(e.target.value));
                }}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
            </div>

            {/* 2. MUSIC & AMBIENCE VOLUME */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏟️</span>
                  <div>
                    <span className="font-cartoon font-bold text-xs sm:text-sm text-white block leading-tight">
                      Stadium Ambience & Music
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none">
                      Gentle crowd hum & fanfare
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-300 w-12 text-right">
                    {settings.isMusicMuted ? 'OFF' : `${Math.round(settings.musicVolume * 100)}%`}
                  </span>
                  <button
                    type="button"
                    onClick={() => audioManager.toggleMusicMute()}
                    className={`px-2.5 py-1 rounded-lg text-xs font-cartoon font-black transition-all cursor-pointer border ${
                      settings.isMusicMuted
                        ? 'bg-slate-800 text-slate-500 border-slate-700'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm'
                    }`}
                  >
                    {settings.isMusicMuted ? 'OFF' : 'ON'}
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.isMusicMuted ? 0 : settings.musicVolume}
                onChange={(e) => {
                  if (settings.isMusicMuted) audioManager.toggleMusicMute();
                  audioManager.setMusicVolume(parseFloat(e.target.value));
                }}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
            </div>

            {/* 3. SOUND EFFECTS (SFX) VOLUME */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚽</span>
                  <div>
                    <span className="font-cartoon font-bold text-xs sm:text-sm text-white block leading-tight">
                      Sound Effects (SFX)
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none">
                      Dice roll, kicks, whistles & cards
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-300 w-12 text-right">
                    {settings.isSfxMuted ? 'OFF' : `${Math.round(settings.sfxVolume * 100)}%`}
                  </span>
                  <button
                    type="button"
                    onClick={() => audioManager.toggleSfxMute()}
                    className={`px-2.5 py-1 rounded-lg text-xs font-cartoon font-black transition-all cursor-pointer border ${
                      settings.isSfxMuted
                        ? 'bg-slate-800 text-slate-500 border-slate-700'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm'
                    }`}
                  >
                    {settings.isSfxMuted ? 'OFF' : 'ON'}
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.isSfxMuted ? 0 : settings.sfxVolume}
                onChange={(e) => {
                  if (settings.isSfxMuted) audioManager.toggleSfxMute();
                  audioManager.setSfxVolume(parseFloat(e.target.value));
                }}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
            </div>

            {/* Test Sound Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={isTesting}
                onClick={handleTestSound}
                className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isTesting
                    ? 'bg-amber-400 text-slate-950 border-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-400/50'
                }`}
              >
                <span>{isTesting ? '▶ Playing...' : '🔊 Test Sound'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: ANIMATION & GAMEPLAY CONTROLS */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-cartoon font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span>🏃</span>
              <span>Animation & Board Controls</span>
            </h3>

            {/* Animation Speed Selector */}
            {onChangeAnimationSpeed && (
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cartoon font-bold text-xs sm:text-sm text-white">
                    Movement Animation Speed
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Step pace
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'fast', 'turbo'] as const).map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => onChangeAnimationSpeed(speed)}
                      className={`py-2 px-2 rounded-xl text-xs font-cartoon font-bold border transition-all cursor-pointer text-center ${
                        animationSpeed === speed
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-white shadow-md scale-102'
                          : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{speed === 'normal' ? 'Normal (300ms)' : speed === 'fast' ? 'Fast (200ms)' : '⚡ Turbo (110ms)'}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Display Toggles */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {onToggleDirectionArrows && (
                <button
                  type="button"
                  onClick={onToggleDirectionArrows}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    showDirectionArrows
                      ? 'bg-slate-800 border-slate-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="font-cartoon font-bold">Zigzag Arrows:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {showDirectionArrows ? 'ON' : 'OFF'}
                  </span>
                </button>
              )}

              {onTogglePitchMarkings && (
                <button
                  type="button"
                  onClick={onTogglePitchMarkings}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    showPitchMarkings
                      ? 'bg-slate-800 border-slate-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="font-cartoon font-bold">Pitch Markings:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {showPitchMarkings ? 'ON' : 'OFF'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION 3: RESET GAME OPTION */}
          {onResetGame && (
            <div className="pt-2 border-t border-slate-800">
              <div className="p-3 bg-rose-950/20 rounded-2xl border border-rose-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-cartoon font-bold text-xs sm:text-sm text-rose-300">
                      Reset Match to Kickoff
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Returns all players to Square 1 and clears current scores
                    </p>
                  </div>

                  {!showResetConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="px-3 py-1.5 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 border border-rose-500/50 font-cartoon font-bold text-xs cursor-pointer transition-colors"
                    >
                      Reset Match
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleConfirmReset}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-cartoon font-bold text-xs cursor-pointer transition-all shadow-md animate-pulse"
                      >
                        Confirm Reset!
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>🛡️</span>
            <span>100% Offline Game</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-cartoon font-black text-xs bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md border border-white cursor-pointer transition-all hover:scale-102"
          >
            DONE
          </button>
        </div>

      </div>
    </div>
  );
};

// Backwards-compatibility alias so existing imports work seamlessly
export const SoundSettingsModal = SettingsModal;
