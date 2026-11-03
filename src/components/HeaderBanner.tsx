import React from 'react';
import { ASSET_IMAGES } from '../assets/images';

export const HeaderBanner: React.FC = () => {
  return (
    <header className="relative w-full max-w-[min(96vw,84vh,740px)] mx-auto text-center py-1 sm:py-2 px-1 select-none">
      {/* Decorative cartoon badges and title */}
      <div className="relative inline-flex flex-col items-center max-w-full">
        {/* Top small badge */}
        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-500/20 border border-yellow-400/40 text-yellow-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm mb-0.5">
          <span>⭐</span>
          <span>THE OFFICIAL 100-SQUARE TOURNAMENT</span>
          <span>⭐</span>
        </div>

        {/* Main Title Lockup */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 my-0.5 max-w-full">
          {/* Left Mascot Icon */}
          <div className="hidden xs:block relative group shrink-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)] bg-emerald-700/50">
              <img
                src={ASSET_IMAGES.mascot}
                alt="Soccer Star Mascot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-xs">⚽</span>
          </div>

          {/* Big Cartoon 3D Headline */}
          <div className="relative">
            <h1
              className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black font-cartoon uppercase tracking-wide leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: '1px #78350f',
              }}
            >
              SOCCER STARS
            </h1>
          </div>

          {/* Right Trophy Icon */}
          <div className="hidden xs:block relative group shrink-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)] bg-amber-950/40">
              <img
                src={ASSET_IMAGES.trophy}
                alt="Championship Trophy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="absolute -bottom-1 -left-1 text-xs">🏆</span>
          </div>
        </div>

        {/* Subtitle Ribbon */}
        <div className="relative mt-0.5 max-w-full">
          <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white font-cartoon text-[11px] sm:text-xs md:text-sm font-bold py-0.5 sm:py-1 px-3 sm:px-5 rounded-full shadow-lg border border-emerald-300/60 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-yellow-300">⚽</span>
            <span>The Road to the Championship</span>
            <span className="text-yellow-300">🏆</span>
          </div>
        </div>
      </div>
    </header>
  );
};
