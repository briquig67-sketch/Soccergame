import React from 'react';
import { CHARACTERS } from '../data/characters';
import { ASSET_IMAGES } from '../assets/images';
import { soundEngine } from '../utils/audio';

interface MainMenuProps {
  playerCount: number;
  selectedAssignments: Record<number, string>;
  playerNames: Record<number, string>;
  onPlayGame: () => void;
  onCharacterSelection: () => void;
  onHowToPlay: () => void;
  onOpenSettings: () => void;
  onOpenAnimationStudio: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  playerCount,
  selectedAssignments,
  playerNames,
  onPlayGame,
  onCharacterSelection,
  onHowToPlay,
  onOpenSettings,
  onOpenAnimationStudio,
}) => {
  // Count selected players
  const readyPlayersCount = Array.from({ length: playerCount }).filter(
    (_, i) => selectedAssignments[i]
  ).length;

  const handleMenuClick = (action: () => void) => {
    soundEngine.playKick();
    action();
  };

  return (
    <div className="w-full max-w-[min(96vw,84vh,800px)] mx-auto flex flex-col items-center select-none pb-8 animate-fade-in">
      
      {/* 1. HERO STADIUM SHOWCASE CARD */}
      <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 sm:border-3 border-amber-400 rounded-3xl p-4 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-md">
        
        {/* Subtle Pitch Grass Stripes Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #10b981 0px, #10b981 40px, #059669 40px, #059669 80px)',
          }}
        />

        {/* Stadium Floodlights Glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon & Mascot */}
        <div className="relative z-10 flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm mb-3">
            <span>⭐</span>
            <span>STANDALONE 100-SQUARE BOARD GAME</span>
            <span>⭐</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-2">
            {/* Left Mascot */}
            <img
              src={ASSET_IMAGES.mascot}
              alt="Soccer Mascot"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] animate-bounce"
              style={{ animationDuration: '3s' }}
            />

            {/* Central Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-cartoon uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-none">
                SOCCER STARS
              </h1>
              <p className="text-emerald-400 font-cartoon font-bold text-xs sm:text-base tracking-widest uppercase mt-1">
                The Road to the Championship
              </p>
            </div>

            {/* Right Trophy */}
            <img
              src={ASSET_IMAGES.trophy}
              alt="Championship Trophy"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-[0_6px_16px_rgba(250,204,21,0.6)] animate-pulse"
            />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Roll the 3D dice, sprint across the 100-square stadium pitch, dodge yellow cards, and trigger penalty kicks on your journey to Square 100!
          </p>
        </div>

        {/* 2. PRIMARY ACTION BUTTONS GRID */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-6">
          
          {/* BUTTON 1: PLAY GAME (Primary Call-to-Action) */}
          <button
            type="button"
            onClick={() => handleMenuClick(onPlayGame)}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-cartoon font-black shadow-[0_10px_25px_rgba(16,185,129,0.4)] border-2 border-emerald-300 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-3.5 sm:col-span-2 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-950/40 border border-white/40 flex items-center justify-center text-2xl shrink-0 group-hover:rotate-12 transition-transform shadow-inner">
              ⚽
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl tracking-wide text-white drop-shadow">
                  PLAY GAME
                </span>
                <span className="text-xs bg-emerald-950/60 text-emerald-200 px-2.5 py-0.5 rounded-full font-sans font-bold">
                  {readyPlayersCount === playerCount ? `${playerCount} Ready` : 'Quick Start'}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-sans font-normal opacity-90 truncate">
                Kick off on the 100-Square Championship Pitch
              </p>
            </div>
          </button>

          {/* BUTTON 2: CHARACTER SELECTION */}
          <button
            type="button"
            onClick={() => handleMenuClick(onCharacterSelection)}
            className="group p-3.5 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-cartoon font-bold border border-slate-700 hover:border-amber-400/80 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-xl shrink-0 text-amber-300 group-hover:scale-110 transition-transform">
              👥
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm sm:text-base font-black text-amber-300 block leading-tight">
                CHARACTER SELECTION
              </span>
              <p className="text-[11px] text-slate-400 font-sans font-normal truncate mt-0.5">
                Pick 2–4 players & custom kits
              </p>
            </div>
          </button>

          {/* BUTTON 3: HOW TO PLAY */}
          <button
            type="button"
            onClick={() => handleMenuClick(onHowToPlay)}
            className="group p-3.5 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-cartoon font-bold border border-slate-700 hover:border-sky-400/80 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-400/20 border border-sky-400/50 flex items-center justify-center text-xl shrink-0 text-sky-300 group-hover:scale-110 transition-transform">
              📖
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm sm:text-base font-black text-sky-300 block leading-tight">
                HOW TO PLAY
              </span>
              <p className="text-[11px] text-slate-400 font-sans font-normal truncate mt-0.5">
                Rules, dice, & event squares
              </p>
            </div>
          </button>

          {/* BUTTON 4: SETTINGS */}
          <button
            type="button"
            onClick={() => handleMenuClick(onOpenSettings)}
            className="group p-3.5 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-cartoon font-bold border border-slate-700 hover:border-emerald-400/80 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center text-xl shrink-0 text-emerald-300 group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm sm:text-base font-black text-emerald-300 block leading-tight">
                SETTINGS
              </span>
              <p className="text-[11px] text-slate-400 font-sans font-normal truncate mt-0.5">
                Audio volumes & speed options
              </p>
            </div>
          </button>

          {/* BUTTON 5: ANIMATION STUDIO (BONUS FEATURE) */}
          <button
            type="button"
            onClick={() => handleMenuClick(onOpenAnimationStudio)}
            className="group p-3.5 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-cartoon font-bold border border-slate-700 hover:border-rose-400/80 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-xl shrink-0 text-rose-300 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm sm:text-base font-black text-rose-300 block leading-tight">
                ANIMATION STUDIO
              </span>
              <p className="text-[11px] text-slate-400 font-sans font-normal truncate mt-0.5">
                Inspect 8 footballer animations
              </p>
            </div>
          </button>

        </div>

        {/* 3. ROSTER SHOWCASE: THE 8 SOCCER STARS */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-cartoon font-bold text-slate-400 uppercase tracking-wider">
              ⭐ The 8 Championship Footballers
            </span>
            <span className="text-[11px] text-slate-500 font-sans">
              4 Boys · 4 Girls
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {CHARACTERS.map((char) => {
              return (
                <div
                  key={`menu-char-${char.id}`}
                  className="bg-slate-950/80 rounded-xl p-1.5 border border-slate-800 hover:border-amber-400/80 transition-all flex flex-col items-center text-center group cursor-pointer"
                  onClick={() => handleMenuClick(onCharacterSelection)}
                  title={`${char.name} (#${char.number} - ${char.position}): ${char.specialMove}`}
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-700 group-hover:scale-105 transition-transform">
                    <img
                      src={char.portrait}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 text-[8px] font-black px-1 rounded-tl ${char.theme.badgeBg} ${char.theme.badgeText}`}
                    >
                      #{char.number}
                    </span>
                  </div>
                  <span className="font-cartoon font-bold text-[10px] text-slate-200 truncate w-full mt-1">
                    {char.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-500 truncate w-full leading-none">
                    {char.position}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. FOOTER CREDITS & OFFLINE BADGE */}
      <div className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-3">
        <span>🏆 100-Square Championship</span>
        <span>·</span>
        <span>🎲 Genuine 3D Dice</span>
        <span>·</span>
        <span>🛡️ 100% Offline Single/Multiplayer</span>
      </div>

    </div>
  );
};
