import React from 'react';
import { ASSET_IMAGES } from '../assets/images';

interface StadiumBorderProps {
  children: React.ReactNode;
}

/**
 * Stadium-themed frame around the 10x10 soccer pitch board:
 * - Floodlight towers safely contained on the 4 corners
 * - Grandstand spectators cheering along the perimeter
 * - LED advertising boards with championship slogans
 * - Authentic stadium track & technical area margin
 * - Responsive sizing that prevents any unwanted horizontal scrolling
 */
export const StadiumBorder: React.FC<StadiumBorderProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[min(96vw,84vh,740px)] mx-auto select-none px-1 sm:px-2">
      {/* Stadium Outer Shell with Grandstand Rim */}
      <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_2px_#334155,0_0_0_6px_#1e293b] border border-slate-700/80">
        
        {/* Stadium Top Grandstand: Crowds & Floodlights */}
        <div className="relative mb-2.5 sm:mb-3.5 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-inner">
          {/* Crowd banner background image */}
          <div className="relative h-11 sm:h-14 md:h-16 w-full overflow-hidden">
            <img
              src={ASSET_IMAGES.stadiumCrowd}
              alt="Stadium Crowds"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top opacity-80 hover:opacity-90 transition-opacity"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end justify-between px-2.5 sm:px-5 pb-1 sm:pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] sm:text-xs md:text-sm font-cartoon tracking-wide text-amber-300 font-bold uppercase drop-shadow">
                  CHAMPIONSHIP STADIUM · 75,000 CAPACITY
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-300 font-mono">
                <span className="bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700 text-yellow-300 font-bold">
                  TOURNAMENT FINAL
                </span>
              </div>
            </div>
          </div>

          {/* LED Perimeter Advertising Board (Top) */}
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white py-0.5 sm:py-1 px-2.5 flex items-center justify-between text-[8px] sm:text-[10px] md:text-xs font-cartoon tracking-wider uppercase border-t border-b border-black/40 shadow-inner overflow-hidden">
            <div className="flex items-center gap-3 sm:gap-6 whitespace-nowrap animate-pulse">
              <span>★ SOCCER STARS CHAMPIONSHIP ★</span>
              <span>⚽ RESPECT & FAIR PLAY ⚽</span>
              <span className="hidden sm:inline">🏆 ROAD TO GLORY 🏆</span>
              <span>★ 100 SQUARES TO THE TROPHY ★</span>
            </div>
          </div>
        </div>

        {/* Floodlight Towers at the 4 Corners (contained inside the stadium shell) */}
        {/* Top-Left Floodlight */}
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-30 pointer-events-none">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 border border-yellow-400/90 rounded-lg p-1 shadow-[0_0_12px_rgba(250,204,21,0.5)] flex flex-col items-center">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
            </div>
          </div>
        </div>

        {/* Top-Right Floodlight */}
        <div className="absolute top-1 right-1 sm:top-2 right-2 z-30 pointer-events-none">
          <div className="bg-gradient-to-bl from-slate-700 to-slate-900 border border-yellow-400/90 rounded-lg p-1 shadow-[0_0_12px_rgba(250,204,21,0.5)] flex flex-col items-center">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
            </div>
          </div>
        </div>

        {/* Bottom-Left Floodlight */}
        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 z-30 pointer-events-none">
          <div className="bg-gradient-to-tr from-slate-700 to-slate-900 border border-yellow-400/90 rounded-lg p-1 shadow-[0_0_12px_rgba(250,204,21,0.5)] flex flex-col items-center">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
            </div>
          </div>
        </div>

        {/* Bottom-Right Floodlight */}
        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 z-30 pointer-events-none">
          <div className="bg-gradient-to-tl from-slate-700 to-slate-900 border border-yellow-400/90 rounded-lg p-1 shadow-[0_0_12px_rgba(250,204,21,0.5)] flex flex-col items-center">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-200 shadow-[0_0_6px_#facc15]" />
            </div>
          </div>
        </div>

        {/* Running Track / Technical Area Surrounding the Pitch */}
        <div className="relative p-1.5 sm:p-2.5 bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-emerald-900/90 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]">
          {/* Main Board Pitch Content */}
          {children}
        </div>

        {/* Stadium Bottom Advertising Strip */}
        <div className="mt-2.5 sm:mt-3.5 rounded-lg sm:rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-inner">
          <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 text-white py-0.5 sm:py-1 px-2.5 flex items-center justify-between text-[8px] sm:text-[10px] md:text-xs font-cartoon tracking-wider uppercase">
            <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap">
              <span>🏟️ STADIUM ENCLOSURE · SOUTH STAND</span>
              <span className="hidden sm:inline">⚡ OFFICIAL TOURNAMENT PITCH</span>
              <span>👟 GOLDEN BOOT DERBY</span>
            </div>
            <div className="text-[8px] sm:text-[10px] text-yellow-200 font-bold">
              10×10 · 100 SQUARES
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
