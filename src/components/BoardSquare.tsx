import React from 'react';
import { BoardSquareData, PlayerToken } from '../types/game';
import { ASSET_IMAGES } from '../assets/images';

interface BoardSquareProps {
  square: BoardSquareData;
  isSelected?: boolean;
  onSquareClick?: (squareNumber: number) => void;
  showDirectionArrows?: boolean;
  showPlayerSlots?: boolean;
  activePlayers?: PlayerToken[];
}

/**
 * Renders an individual square on the 10x10 soccer pitch board.
 * - Strict 1:1 aspect-square dimensions for all 100 squares
 * - Dedicated top-left badge ensuring crystal-clear number readability
 * - Prominent START (1) and FINISH (100) designs
 * - Distinct colors for special event squares (Sprint, Save, Goal, Yellow Card, Red Card)
 * - Reserved central 2x2 staging area for up to 4 player characters
 */
export const BoardSquare: React.FC<BoardSquareProps> = ({
  square,
  isSelected = false,
  onSquareClick,
  showDirectionArrows = true,
  showPlayerSlots = true,
  activePlayers = [],
}) => {
  const { number, isStart, isFinish, grassShade, specialEvent, colIndex, isEvenRow } = square;

  // Background styling:
  // If special event square -> distinct thematic color gradient
  // If standard pitch square -> alternating manicured lawn turf greens
  let bgGradientClass =
    grassShade === 'light'
      ? 'bg-gradient-to-br from-emerald-600 via-emerald-600 to-green-600'
      : 'bg-gradient-to-br from-emerald-700 via-green-800 to-emerald-800';

  let borderHighlightClass = 'border-white/40';

  if (specialEvent) {
    bgGradientClass = specialEvent.bgColorClass;
    borderHighlightClass = specialEvent.borderColorClass;
  }

  // Direction indicator (Snakes & Ladders zigzag flow)
  const travelsRight = isEvenRow;
  const isTurnSquare = (travelsRight && colIndex === 9) || (!travelsRight && colIndex === 0);

  return (
    <div
      onClick={() => onSquareClick?.(number)}
      className={`
        relative aspect-square w-full h-full min-w-0 min-h-0 select-none
        flex flex-col justify-between p-0.5 sm:p-1 md:p-1.5 overflow-hidden
        border ${borderHighlightClass} transition-all duration-200 cursor-pointer
        ${bgGradientClass}
        ${isStart ? 'ring-2 sm:ring-4 ring-amber-300 ring-offset-1 ring-offset-slate-900 z-20' : ''}
        ${isFinish ? 'ring-2 sm:ring-4 ring-yellow-300 ring-offset-1 ring-offset-slate-900 shadow-[0_0_16px_rgba(250,204,21,0.7)] z-20' : ''}
        ${isSelected ? 'brightness-125 ring-2 ring-white z-30 scale-[1.02]' : ''}
        hover:brightness-110 hover:z-20
      `}
      title={`Square ${number}${specialEvent ? ` · ${specialEvent.name}` : ''}`}
    >
      {/* Subtle pitch grass texture sheen */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />

      {/* TOP HEADER: Crisp, highly readable Number Badge & Direction/Icon */}
      <div className="flex items-center justify-between w-full relative z-10 shrink-0">
        {/* Large, High-Contrast Square Number */}
        <div
          className={`
            px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded flex items-center justify-center
            font-black tabular-nums tracking-tight leading-none shadow-md border
            ${
              isStart
                ? 'bg-slate-950/85 text-amber-300 border-amber-400/80 text-[11px] sm:text-xs md:text-sm lg:text-base'
                : isFinish
                ? 'bg-slate-950/85 text-yellow-300 border-yellow-300/80 text-[11px] sm:text-xs md:text-sm lg:text-base'
                : specialEvent
                ? 'bg-slate-950/80 text-white border-white/40 text-[10px] sm:text-xs md:text-sm'
                : 'bg-black/50 text-white border-white/25 text-[10px] sm:text-xs md:text-sm'
            }
          `}
        >
          {number}
        </div>

        {/* Right Corner indicator (Zigzag arrow or Event Icon) */}
        <div className="flex items-center gap-0.5 text-white/80 shrink-0">
          {specialEvent && !isStart && !isFinish ? (
            <span className="text-[10px] sm:text-xs drop-shadow" title={specialEvent.name}>
              {specialEvent.icon}
            </span>
          ) : showDirectionArrows && !isStart && !isFinish ? (
            <span className="text-[8px] sm:text-[10px] md:text-xs font-mono font-bold leading-none opacity-60">
              {isTurnSquare ? '⤴' : travelsRight ? '→' : '←'}
            </span>
          ) : null}
        </div>
      </div>

      {/* CENTER ZONE: Reserved 4-Player Character Staging Area (2x2 Grid) */}
      <div className="relative w-full flex-1 flex items-center justify-center my-0.5 overflow-hidden">
        {/* 2x2 Player Slots Grid: Ample space for up to 4 characters */}
        <div className="w-[84%] max-w-[48px] sm:max-w-[56px] md:max-w-[64px] aspect-square grid grid-cols-2 grid-rows-2 gap-0.5 sm:gap-1 items-center justify-center">
          {[0, 1, 2, 3].map((slotIndex) => {
            const playerInSlot = activePlayers[slotIndex];

            if (playerInSlot) {
              return (
                <div
                  key={`player-${slotIndex}`}
                  className={`
                    w-full h-full rounded-full flex items-center justify-center overflow-hidden
                    shadow-md font-bold text-[8px] sm:text-[10px] md:text-xs
                    border-2 ${playerInSlot.borderClass} ${playerInSlot.colorClass}
                    transform transition-transform hover:scale-125
                  `}
                  title={`Player ${playerInSlot.id}: ${playerInSlot.name}`}
                >
                  {playerInSlot.portraitImage ? (
                    <img
                      src={playerInSlot.portraitImage}
                      alt={playerInSlot.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="leading-none">{playerInSlot.avatarIcon}</span>
                  )}
                </div>
              );
            }

            // Subtle docking ring indicating reserved character slot
            if (showPlayerSlots) {
              return (
                <div
                  key={`slot-${slotIndex}`}
                  className="w-full h-full rounded-full border border-dashed border-white/20 bg-black/5 flex items-center justify-center"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                </div>
              );
            }

            return <div key={`empty-${slotIndex}`} className="w-full h-full" />;
          })}
        </div>

        {/* Square 100 Trophy Backdrop Watermark */}
        {isFinish && activePlayers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={ASSET_IMAGES.trophy}
              alt="Championship Cup"
              referrerPolicy="no-referrer"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 object-contain drop-shadow-md rounded-full bg-yellow-400/20 p-0.5 border border-yellow-300"
            />
          </div>
        )}

        {/* Square 1 Kickoff Ball Backdrop Watermark */}
        {isStart && activePlayers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-base sm:text-xl md:text-2xl drop-shadow">
            ⚽
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER: High-visibility Badge / Label for Start, Finish & Events */}
      <div className="w-full flex items-center justify-center relative z-10 shrink-0">
        {/* START BADGE */}
        {isStart && (
          <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black font-cartoon text-[8px] sm:text-[10px] md:text-xs px-1 py-0.5 rounded shadow-sm flex items-center justify-center gap-0.5 uppercase tracking-wider border border-white/60">
            <span>⚽</span>
            <span>START</span>
          </div>
        )}

        {/* FINISH BADGE */}
        {isFinish && (
          <div className="w-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-slate-950 font-black font-cartoon text-[8px] sm:text-[10px] md:text-xs px-1 py-0.5 rounded shadow-sm flex items-center justify-center gap-0.5 uppercase tracking-wider border border-white">
            <span>🏆</span>
            <span>FINISH</span>
          </div>
        )}

        {/* SPECIAL EVENT BADGE (Sprint, Save, Goal, Yellow, Red) */}
        {specialEvent && !isStart && !isFinish && (
          <div
            className={`
              w-full text-center font-black font-cartoon text-[7px] sm:text-[9px] md:text-[10px]
              px-0.5 py-0.2 rounded uppercase tracking-tight shadow-sm border border-white/40
              ${specialEvent.badgeColorClass}
            `}
          >
            {specialEvent.badgeLabel}
          </div>
        )}

        {/* Standard square milestone indicators (e.g. 50, 10, 90) */}
        {!specialEvent && (number === 50 || number === 10 || number === 90) && (
          <div className="text-[7px] sm:text-[8px] text-emerald-200/90 font-bold uppercase tracking-widest">
            {number === 50 ? 'HALF-WAY' : number === 10 ? 'ROW 1' : 'FINAL 10'}
          </div>
        )}
      </div>
    </div>
  );
};
