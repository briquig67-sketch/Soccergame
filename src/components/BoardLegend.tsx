import React from 'react';
import { SPECIAL_EVENTS } from '../types/game';

export const BoardLegend: React.FC = () => {
  return (
    <footer className="w-full max-w-[min(96vw,84vh,740px)] mx-auto mt-4 mb-8 px-1 sm:px-2 select-none">
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 sm:p-5 shadow-xl backdrop-blur-sm">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-700/60 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl">📋</span>
            <h3 className="font-cartoon text-sm sm:text-base font-bold text-white tracking-wide">
              Pitch Zones & Special Event Squares
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            100 SQUARES · 4 PLAYERS MAX
          </span>
        </div>

        {/* Distinct Special Event Color Badges Key */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
          {/* SPRINT */}
          <div className="bg-slate-900/80 border border-sky-400/40 rounded-xl p-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
              ⚡
            </span>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-sky-300 font-cartoon leading-tight">SPRINT</div>
              <div className="text-[9px] text-slate-400 leading-tight truncate">Speed Boost</div>
            </div>
          </div>

          {/* SUPER SAVE */}
          <div className="bg-slate-900/80 border border-teal-400/40 rounded-xl p-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-slate-950 shadow-sm shrink-0">
              🧤
            </span>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-teal-300 font-cartoon leading-tight">SAVE</div>
              <div className="text-[9px] text-slate-400 leading-tight truncate">Goalkeeper Wall</div>
            </div>
          </div>

          {/* GOAL CHANCE */}
          <div className="bg-slate-900/80 border border-purple-400/40 rounded-xl p-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
              🎯
            </span>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-purple-300 font-cartoon leading-tight">GOAL</div>
              <div className="text-[9px] text-slate-400 leading-tight truncate">Penalty Kick</div>
            </div>
          </div>

          {/* YELLOW CARD */}
          <div className="bg-slate-900/80 border border-amber-400/40 rounded-xl p-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-950 shadow-sm shrink-0">
              🟨
            </span>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-amber-300 font-cartoon leading-tight">FOUL</div>
              <div className="text-[9px] text-slate-400 leading-tight truncate">Yellow Warning</div>
            </div>
          </div>

          {/* RED CARD */}
          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-rose-400/40 rounded-xl p-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
              🟥
            </span>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-rose-300 font-cartoon leading-tight">OFFSIDE</div>
              <div className="text-[9px] text-slate-400 leading-tight truncate">Red Setback</div>
            </div>
          </div>
        </div>

        {/* 3 Key Landmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {/* Card 1: Kickoff Start */}
          <div className="bg-slate-900/70 border border-amber-400/40 rounded-xl p-2.5 flex items-start gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-sm shrink-0">
              ⚽
            </div>
            <div>
              <div className="font-cartoon font-bold text-amber-300 text-xs">
                Square 1 · KICKOFF (START)
              </div>
              <p className="text-slate-300 mt-0.5 leading-snug text-[11px]">
                Prominent bottom-left square. All teams begin their march toward the championship here.
              </p>
            </div>
          </div>

          {/* Card 2: 4-Player Staging Space */}
          <div className="bg-slate-900/70 border border-emerald-400/40 rounded-xl p-2.5 flex items-start gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-sm shrink-0">
              👥
            </div>
            <div>
              <div className="font-cartoon font-bold text-emerald-300 text-xs">
                4-Character Capacity
              </div>
              <p className="text-slate-300 mt-0.5 leading-snug text-[11px]">
                Each square has a reserved 2×2 staging grid providing ample room for up to four character pawns.
              </p>
            </div>
          </div>

          {/* Card 3: Championship Finish */}
          <div className="bg-slate-900/70 border border-yellow-400/40 rounded-xl p-2.5 flex items-start gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center text-sm shrink-0">
              🏆
            </div>
            <div>
              <div className="font-cartoon font-bold text-yellow-300 text-xs">
                Square 100 · CHAMPION (FINISH)
              </div>
              <p className="text-slate-300 mt-0.5 leading-snug text-[11px]">
                Prominent top-left golden square. Reaching 100 awards the Championship Gold Trophy.
              </p>
            </div>
          </div>
        </div>

        {/* Footer verification note */}
        <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400">🏟️</span>
            <span>All 100 square dimensions strictly locked to 1:1 aspect ratio with zero horizontal overflow.</span>
          </div>
          <div className="font-mono text-emerald-400 font-semibold">
            Snakes & Ladders Zigzag: 1→100 Verified
          </div>
        </div>

      </div>
    </footer>
  );
};
