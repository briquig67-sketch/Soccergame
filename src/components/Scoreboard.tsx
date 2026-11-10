import React from 'react';
import { GamePlayer } from '../types/game';

interface ScoreboardProps {
  players: GamePlayer[];
  currentPlayerIndex: number;
  isMoving: boolean;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  players,
  currentPlayerIndex,
  isMoving,
}) => {
  return (
    <div className="w-full max-w-[min(96vw,84vh,740px)] mx-auto mt-2.5 px-1 sm:px-2 select-none">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 shadow-lg backdrop-blur-md">
        
        {/* Strip Header */}
        <div className="flex items-center justify-between px-1 mb-1.5 border-b border-slate-800 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🏆</span>
            <span className="text-[11px] sm:text-xs font-cartoon font-bold uppercase tracking-wider text-slate-300">
              Match Standings ({players.length} Players)
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono font-medium">
            First to Square 100 Wins
          </span>
        </div>

        {/* Players Score Cards Grid (2, 3, or 4 columns) */}
        <div
          className={`grid gap-1.5 sm:gap-2 ${
            players.length === 2
              ? 'grid-cols-2'
              : players.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-4'
          }`}
        >
          {players.map((player, idx) => {
            const isTurn = idx === currentPlayerIndex;
            const progressPercent = Math.min(100, Math.round((player.currentSquare / 100) * 100));

            return (
              <div
                key={`score-player-${player.id}`}
                className={`
                  relative rounded-xl p-1.5 sm:p-2 transition-all duration-300 border flex flex-col justify-between
                  ${
                    isTurn
                      ? `bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(250,204,21,0.35)] scale-[1.02]`
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }
                `}
              >
                {/* Active Turn Floating Crown / Marker */}
                {isTurn && (
                  <div className="absolute -top-2 right-2 bg-amber-400 text-slate-950 text-[9px] font-black font-cartoon px-1.5 py-0.2 rounded-full shadow-md flex items-center gap-0.5 animate-bounce">
                    <span>👑</span>
                    <span>TURN</span>
                  </div>
                )}

                {/* Top Row: Avatar + Name + Jersey */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                  <div className="relative shrink-0">
                    <img
                      src={player.portrait}
                      alt={player.name}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 ${
                        isTurn ? 'border-amber-400' : 'border-slate-600'
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded-full border border-black/40 ${player.theme.badgeBg} ${player.theme.badgeText}`}
                    >
                      #{player.characterNumber}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-cartoon font-bold text-xs sm:text-sm text-white truncate leading-tight flex items-center gap-1">
                      <span>{player.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate leading-none mt-0.5">
                      {player.characterName}
                    </div>
                  </div>
                </div>

                {/* Middle Row: Current Square and Progress */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400 text-[10px] font-bold">Square:</span>
                    <span className="font-black font-cartoon text-amber-300 text-xs sm:text-sm">
                      {player.currentSquare}
                      <span className="text-slate-500 text-[10px]"> / 100</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 h-1.5 sm:h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        isTurn
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Bottom Stats: Last roll */}
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span>Last Roll:</span>
                    <span className="font-mono font-bold text-white">
                      {player.lastRoll ? `🎲 ${player.lastRoll}` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
