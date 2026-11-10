import React, { useState, useEffect } from 'react';
import { GamePlayer, getCoordinatesForSquare, getSpecialEvent } from '../types/game';
import { Dice3D } from './Dice3D';
import { soundEngine } from '../utils/audio';

interface TurnControlsProps {
  currentPlayer: GamePlayer;
  diceValue: number;
  isRolling: boolean;
  isMoving: boolean;
  activeStep: number;
  totalSteps: number;
  statusMessage: string;
  lastBounced: { roll: number; excess: number; landed: number } | null;
  onRollDice: () => void;
  onRestartMatch: () => void;
  onOpenCharacterSelect?: () => void;
  isDevModeActive?: boolean;
  onToggleDevMode?: () => void;
  onOpenSoundSettings?: () => void;
}

export const TurnControls: React.FC<TurnControlsProps> = ({
  currentPlayer,
  diceValue,
  isRolling,
  isMoving,
  activeStep,
  totalSteps,
  statusMessage,
  lastBounced,
  onRollDice,
  onRestartMatch,
  onOpenCharacterSelect,
  isDevModeActive = false,
  onToggleDevMode,
  onOpenSoundSettings,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const coords = getCoordinatesForSquare(currentPlayer.currentSquare);
  const specialEvent = getSpecialEvent(currentPlayer.currentSquare);

  useEffect(() => {
    const unsub = soundEngine.subscribe((s) => {
      setIsMuted(s.isMasterMuted || (s.isMusicMuted && s.isSfxMuted));
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    const next = soundEngine.toggleMuted();
    setIsMuted(next);
  };

  return (
    <div className="w-full max-w-[min(96vw,84vh,740px)] mx-auto mt-3 px-1 sm:px-2 select-none">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-400/80 rounded-2xl p-3 sm:p-4 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-md">
        
        {/* Main Control Panel: Left (Player Card) | Center (3D Dice & Roll Button) | Right (Position Telemetry) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          
          {/* LEFT: ACTIVE PLAYER SPOTLIGHT CARD */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-700/80 shadow-inner">
            <div className="relative shrink-0">
              <img
                src={currentPlayer.portrait}
                alt={currentPlayer.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
              />
              <span
                className={`absolute -bottom-1 -right-1 text-xs font-black px-1.5 py-0.2 rounded-full border border-black/50 ${currentPlayer.theme.badgeBg} ${currentPlayer.theme.badgeText} shadow`}
              >
                #{currentPlayer.characterNumber}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.2 rounded-full uppercase leading-none">
                  ACTIVE TURN
                </span>
                <span className="text-xs">{currentPlayer.avatarEmoji}</span>
              </div>
              <h3 className="font-cartoon font-black text-sm sm:text-base text-white truncate leading-tight">
                {currentPlayer.name}
              </h3>
              <p className="text-xs text-amber-300 font-medium truncate">
                {currentPlayer.characterName}
              </p>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Turns played: <span className="text-white font-bold">{currentPlayer.turnsTaken}</span>
              </div>
            </div>
          </div>

          {/* CENTER: 3D DICE & ROLL BUTTON */}
          <div className="flex flex-col items-center justify-center py-1">
            {/* 3D Dice */}
            <Dice3D
              value={diceValue}
              isRolling={isRolling}
              disabled={isMoving}
              onRoll={onRollDice}
              currentPlayerName={currentPlayer.name}
              themeColor={currentPlayer.theme.accentHex}
            />

            {/* Turn status & Dice Result Callout */}
            <div className="flex flex-col items-center gap-1 mt-1.5">
              <div className="flex items-center gap-1.5 bg-slate-950/90 px-2.5 py-0.5 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Dice Result:</span>
                <span className="text-sm font-black font-cartoon text-amber-300">
                  🎲 {isRolling ? '...' : diceValue}
                </span>
              </div>

              <span
                className={`text-[11px] font-cartoon font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  isRolling
                    ? 'bg-sky-500/20 text-sky-300 animate-pulse'
                    : isMoving
                    ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                <span>{isRolling ? '🎲 Rolling...' : isMoving ? '🏃 Moving...' : 'Ready to Roll!'}</span>
              </span>
            </div>
          </div>

          {/* RIGHT: POSITION & LANDMARK TELEMETRY */}
          <div className="flex flex-col gap-2 bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-700/80 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Pitch Position:</span>
              <span className="font-cartoon font-black text-amber-300 text-sm sm:text-base">
                Square {currentPlayer.currentSquare} <span className="text-slate-500 text-xs">/ 100</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Grid Row:</span>
              <span className="font-bold text-slate-200 text-[11px]">
                Row {coords.rowFromBottom + 1} ({coords.rowDirection === 'right' ? '➔ Heading Right' : '⬅ Heading Left'})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">To Trophy:</span>
              <span className="font-bold text-yellow-300 text-[11px]">
                {100 - currentPlayer.currentSquare === 0 ? '🏆 AT GOAL!' : `${100 - currentPlayer.currentSquare} Squares Needed`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Square Landmark:</span>
              <span className="font-bold text-emerald-300 text-[11px] truncate max-w-[130px]">
                {currentPlayer.currentSquare === 1
                  ? '⚽ Kickoff START'
                  : currentPlayer.currentSquare === 100
                  ? '🏆 FINISH Trophy'
                  : specialEvent
                  ? `${specialEvent.icon} ${specialEvent.name}`
                  : 'Pitch Turf'}
              </span>
            </div>

            {/* Quick Action Utility Buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs gap-1 flex-wrap">
              {onOpenSoundSettings && (
                <button
                  type="button"
                  onClick={onOpenSoundSettings}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-[11px] flex items-center gap-1 transition-colors border border-amber-400/30 hover:border-amber-400/60 cursor-pointer"
                  title="Open stadium sound & volume settings"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleToggleSound}
                className={`px-2 py-1 rounded font-medium text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                  isMuted
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title={isMuted ? 'Unmute game sounds' : 'Mute game sounds'}
              >
                <span>{isMuted ? '🔇' : '🔊'}</span>
                <span>{isMuted ? 'Muted' : 'Sound'}</span>
              </button>

              <button
                type="button"
                disabled={isMoving || isRolling}
                onClick={onRestartMatch}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                title="Restart match from Square 1"
              >
                <span>↺</span>
                <span>Reset</span>
              </button>

              {onToggleDevMode && (
                <button
                  type="button"
                  onClick={onToggleDevMode}
                  className={`px-2 py-1 rounded font-medium text-[11px] flex items-center gap-1 transition-colors cursor-pointer border ${
                    isDevModeActive
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-400/40'
                  }`}
                  title="Toggle Developer Test Mode Panel"
                >
                  <span>🛠️</span>
                  <span>Dev Mode</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Status / Traversal Banner */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-cartoon text-xs sm:text-sm text-yellow-300">
              {statusMessage}
            </span>
          </div>

          {/* Stepping Progress Indicator (Visible while moving) */}
          {isMoving && (
            <div className="flex items-center gap-2 text-[11px] text-sky-300 font-mono font-bold shrink-0">
              <span>Stepping: {activeStep} / {totalSteps}</span>
              <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-400 h-full transition-all duration-200"
                  style={{ width: `${(activeStep / Math.max(1, totalSteps)) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Bounce notification pill if player bounced back from 100 */}
          {lastBounced && (
            <div className="bg-amber-400/20 border border-amber-400/60 px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 shrink-0">
              ⚡ Over-rolled! Bounced back {lastBounced.excess} sq
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
