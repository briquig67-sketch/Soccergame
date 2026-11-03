import React, { useMemo, useState } from 'react';
import { generateBoardSquares, BoardSquareData, DEMO_PLAYERS, PlayerToken } from '../types/game';
import { BoardSquare } from './BoardSquare';
import { PitchMarkings } from './PitchMarkings';
import { StadiumBorder } from './StadiumBorder';

interface SoccerBoardProps {
  onSquareSelect?: (square: BoardSquareData) => void;
}

type PlayerDisplayMode = 'slots' | 'demo' | 'clean';

export const SoccerBoard: React.FC<SoccerBoardProps> = ({ onSquareSelect }) => {
  const [selectedSquareNum, setSelectedSquareNum] = useState<number | null>(1); // Defaults to Start
  const [showDirectionArrows, setShowDirectionArrows] = useState<boolean>(true);
  const [showPitchMarkings, setShowPitchMarkings] = useState<boolean>(true);
  const [playerMode, setPlayerMode] = useState<PlayerDisplayMode>('slots');

  // Programmatically generate all 100 squares in zigzag order
  const squares = useMemo(() => generateBoardSquares(), []);

  const handleSquareClick = (squareNumber: number) => {
    setSelectedSquareNum(squareNumber);
    const sq = squares.find((s) => s.number === squareNumber);
    if (sq && onSquareSelect) {
      onSquareSelect(sq);
    }
  };

  const selectedSquare = useMemo(
    () => squares.find((s) => s.number === selectedSquareNum),
    [squares, selectedSquareNum]
  );

  // Map demo players to squares for visual verification of 4-character capacity
  const getPlayersForSquare = (num: number): PlayerToken[] => {
    if (playerMode !== 'demo') return [];

    // Show all 4 players together on START (Square 1) or on the currently clicked/inspected square
    if (num === selectedSquareNum) {
      return DEMO_PLAYERS;
    }

    if (num === 1 && selectedSquareNum !== 1) {
      return DEMO_PLAYERS.slice(0, 2);
    }

    if (num === 22) return [DEMO_PLAYERS[0]]; // Striker on Sprint
    if (num === 44) return [DEMO_PLAYERS[3]]; // Keeper on Save
    if (num === 70) return [DEMO_PLAYERS[1]]; // Playmaker on Goal Chance
    if (num === 100) return [DEMO_PLAYERS[2]]; // Winger at Finish

    return [];
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Stadium Frame enclosing the 100-square pitch */}
      <StadiumBorder>
        {/* Main 10x10 Soccer Pitch Container with strict dimensions */}
        <div
          className="relative w-full aspect-square max-w-[720px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-white/70 bg-emerald-800"
          role="grid"
          aria-label="Soccer Stars 10x10 Championship Board"
        >
          {/* Soccer Pitch White Field Markings SVG Overlay */}
          <PitchMarkings showMarkings={showPitchMarkings} />

          {/* 10 x 10 CSS Grid containing exactly 100 consistently dimensioned squares */}
          <div className="grid grid-cols-10 grid-rows-10 w-full h-full relative z-0">
            {squares.map((square) => (
              <BoardSquare
                key={`square-${square.number}`}
                square={square}
                isSelected={selectedSquareNum === square.number}
                onSquareClick={handleSquareClick}
                showDirectionArrows={showDirectionArrows}
                showPlayerSlots={playerMode === 'slots'}
                activePlayers={getPlayersForSquare(square.number)}
              />
            ))}
          </div>
        </div>
      </StadiumBorder>

      {/* Board Controls & Inspector Bar */}
      <div className="w-full max-w-[min(96vw,84vh,740px)] mt-3 sm:mt-4 px-1 sm:px-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs text-slate-300">
        
        {/* Left: View Mode Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1.5 rounded-xl shadow-md">
          <span className="text-slate-400 font-medium text-[11px] sm:text-xs mr-1">Display:</span>
          
          {/* Player Capacity Mode Toggle */}
          <div className="inline-flex rounded-lg bg-slate-900/80 p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setPlayerMode('slots')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                playerMode === 'slots'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Display the 4 reserved character docking slots in each square"
            >
              4-Player Docks
            </button>
            <button
              type="button"
              onClick={() => setPlayerMode('demo')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                playerMode === 'demo'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Preview 4 player tokens on the pitch to verify fit"
            >
              Demo Pawns
            </button>
            <button
              type="button"
              onClick={() => setPlayerMode('clean')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                playerMode === 'clean'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Clean pitch view"
            >
              Clean
            </button>
          </div>

          {/* Direction Zigzag Toggle */}
          <button
            type="button"
            onClick={() => setShowDirectionArrows(!showDirectionArrows)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showDirectionArrows
                ? 'bg-slate-700 text-slate-200'
                : 'bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Snakes & Ladders direction arrows"
          >
            Zigzag: {showDirectionArrows ? 'ON' : 'OFF'}
          </button>

          {/* Field Markings Toggle */}
          <button
            type="button"
            onClick={() => setShowPitchMarkings(!showPitchMarkings)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showPitchMarkings
                ? 'bg-slate-700 text-slate-200'
                : 'bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle soccer pitch white line markings"
          >
            Lines: {showPitchMarkings ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Right: Selected Square Inspector Pill */}
        <div className="flex items-center justify-between sm:justify-start gap-2 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-md">
          {selectedSquare ? (
            <div className="flex items-center gap-2 text-slate-200">
              <span className="font-bold text-yellow-400 font-cartoon text-xs sm:text-sm">
                Square {selectedSquare.number}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-300 text-[11px] sm:text-xs">
                {selectedSquare.specialEvent
                  ? `${selectedSquare.specialEvent.name.toUpperCase()} (${selectedSquare.specialEvent.badgeLabel})`
                  : `Row ${selectedSquare.rowFromBottom + 1} (${
                      selectedSquare.isEvenRow ? '➔ Right' : '⬅ Left'
                    })`}
              </span>
            </div>
          ) : (
            <span className="text-slate-400 italic text-[11px]">
              Tap any square to inspect
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
