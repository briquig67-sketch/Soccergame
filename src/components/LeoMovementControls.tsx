import React from 'react';
import { SquareCoordinates, getSpecialEvent } from '../types/game';
import { FootballerAnimationState } from '../types/animation';

interface LeoMovementControlsProps {
  currentSquare: number;
  coordinates: SquareCoordinates;
  animationState: FootballerAnimationState;
  isMoving: boolean;
  activeStep: number;
  totalSteps: number;
  isFinished: boolean;
  onMoveSteps: (steps: number) => void;
  onResetToStart: () => void;
}

export const LeoMovementControls: React.FC<LeoMovementControlsProps> = ({
  currentSquare,
  coordinates,
  animationState,
  isMoving,
  activeStep,
  totalSteps,
  isFinished,
  onMoveSteps,
  onResetToStart,
}) => {
  const specialEvent = getSpecialEvent(currentSquare);

  return (
    <div className="w-full max-w-[min(96vw,84vh,740px)] mx-auto mt-3 sm:mt-4 px-1 sm:px-2 select-none">
      {/* Test Engine Card */}
      <div className="bg-slate-900/95 border-2 border-amber-400/80 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
        
        {/* Header Strip with Live Coordinates and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-base shadow">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cartoon font-bold text-sm sm:text-base text-white tracking-wide">
                  Leo Cruz Pitch Movement Engine
                </h3>
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.2 rounded-full uppercase">
                  TEST CONTROLS
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1–100 Zigzag step-by-step intermediate progression
              </p>
            </div>
          </div>

          {/* Current Position Badge */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700/80 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                Leo's Position
              </div>
              <div className="font-cartoon font-black text-amber-300 text-sm sm:text-base leading-tight">
                Square {currentSquare} / 100
              </div>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md border ${
                isFinished
                  ? 'bg-yellow-400 text-slate-950 border-white animate-bounce'
                  : 'bg-red-600 text-white border-white/60'
              }`}
            >
              {isFinished ? '🏆' : '10'}
            </div>
          </div>
        </div>

        {/* Live Movement & Milestone Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2.5 text-xs">
          {/* Box 1: Movement State */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Animation State:</span>
            <span
              className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 ${
                isMoving
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 animate-pulse'
                  : isFinished
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
              }`}
            >
              <span>{isMoving ? '🏃' : isFinished ? '🏆' : '🧍'}</span>
              <span>{animationState.toUpperCase()}</span>
            </span>
          </div>

          {/* Box 2: Zigzag Path & Row Info */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Pitch Grid Row:</span>
            <span className="font-bold text-slate-200 text-[11px] flex items-center gap-1">
              <span>Row {coordinates.rowFromBottom + 1}</span>
              <span className="text-amber-300 font-mono">
                ({coordinates.rowDirection === 'right' ? 'Heading ➔ Right' : 'Heading ⬅ Left'})
              </span>
            </span>
          </div>

          {/* Box 3: Square Type / Landmark */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Landmark:</span>
            <span className="font-bold text-amber-300 text-[11px] truncate max-w-[140px]">
              {currentSquare === 1
                ? '⚽ START (Kickoff)'
                : currentSquare === 100
                ? '🏆 FINISH (Champion!)'
                : specialEvent
                ? `${specialEvent.icon} ${specialEvent.name}`
                : `Lawn Turf Square`}
            </span>
          </div>
        </div>

        {/* Step-by-Step Traversal Progress Bar (Visible during movement) */}
        {isMoving && (
          <div className="mb-3 px-2 py-1.5 rounded-xl bg-slate-950/80 border border-sky-500/40 text-xs">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-sky-300 font-bold flex items-center gap-1">
                <span className="animate-spin">⚽</span>
                <span>Running through intermediate squares...</span>
              </span>
              <span className="font-mono text-white font-bold">
                Step {activeStep} of {totalSteps}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 h-full transition-all duration-300"
                style={{
                  width: `${(activeStep / Math.max(1, totalSteps)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* CHAMPIONSHIP VICTORY BANNER (When Square 100 is reached) */}
        {isFinished && (
          <div className="mb-3 p-3 bg-gradient-to-r from-yellow-500/20 via-amber-400/25 to-yellow-500/20 border-2 border-yellow-400 rounded-xl flex items-center justify-between gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)] animate-pulse">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <div className="font-cartoon font-black text-yellow-300 text-sm sm:text-base leading-tight">
                  CHAMPIONSHIP FINISH REACHED!
                </div>
                <div className="text-[11px] text-slate-200">
                  Leo Cruz has reached Square 100 and won the Soccer Stars Championship!
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onResetToStart}
              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-cartoon font-bold text-xs rounded-lg shadow-md shrink-0 transition-transform active:scale-95"
            >
              Reset to START
            </button>
          </div>
        )}

        {/* 4 REQUIRED TEST BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Move 1 Square */}
          <button
            type="button"
            disabled={isMoving || currentSquare >= 100}
            onClick={() => onMoveSteps(1)}
            className={`
              p-2.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 border
              ${
                isMoving || currentSquare >= 100
                  ? 'bg-slate-800/60 text-slate-500 border-slate-700/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white border-emerald-400/60 hover:scale-[1.02] active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>🏃</span>
            <span>Move 1 Square</span>
            <span className="font-mono text-[10px] bg-black/30 px-1.5 py-0.2 rounded">+1</span>
          </button>

          {/* Move 3 Squares */}
          <button
            type="button"
            disabled={isMoving || currentSquare >= 100}
            onClick={() => onMoveSteps(3)}
            className={`
              p-2.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 border
              ${
                isMoving || currentSquare >= 100
                  ? 'bg-slate-800/60 text-slate-500 border-slate-700/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/60 hover:scale-[1.02] active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>⚡</span>
            <span>Move 3 Squares</span>
            <span className="font-mono text-[10px] bg-black/30 px-1.5 py-0.2 rounded">+3</span>
          </button>

          {/* Move 6 Squares */}
          <button
            type="button"
            disabled={isMoving || currentSquare >= 100}
            onClick={() => onMoveSteps(6)}
            className={`
              p-2.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 border
              ${
                isMoving || currentSquare >= 100
                  ? 'bg-slate-800/60 text-slate-500 border-slate-700/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black border-amber-300 hover:scale-[1.02] active:scale-95 cursor-pointer ring-2 ring-amber-400/40'
              }
            `}
          >
            <span>🚀</span>
            <span>Move 6 Squares</span>
            <span className="font-mono text-[10px] bg-black/30 px-1.5 py-0.2 rounded text-white">+6</span>
          </button>

          {/* Reset to START */}
          <button
            type="button"
            onClick={onResetToStart}
            className="p-2.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer hover:border-slate-500"
          >
            <span>↺</span>
            <span>Reset to START</span>
          </button>
        </div>

      </div>
    </div>
  );
};
