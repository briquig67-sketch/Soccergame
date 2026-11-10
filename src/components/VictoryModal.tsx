import React from 'react';
import { GamePlayer } from '../types/game';
import { AnimatedFootballer } from './AnimatedFootballer';
import { getKitForCharacter } from '../data/characterKits';
import { ASSET_IMAGES } from '../assets/images';

interface VictoryModalProps {
  winner: GamePlayer | null;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  onPlayAgain,
  onMainMenu,
}) => {
  if (!winner) return null;

  const winnerKit = getKitForCharacter(winner.characterId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      {/* Background Stadium Glow & Confetti Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 text-3xl animate-bounce">✨</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>⭐</div>
        <div className="absolute bottom-1/4 left-1/3 text-3xl animate-bounce" style={{ animationDelay: '400ms' }}>🎉</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl animate-bounce" style={{ animationDelay: '600ms' }}>⚽</div>
      </div>

      {/* Main Victory Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl border-4 border-yellow-400 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-7 shadow-[0_25px_70px_rgba(250,204,21,0.4)] text-center flex flex-col items-center">
        
        {/* Floating Top Championship Banner */}
        <div className="absolute -top-5 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-cartoon font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl border-2 border-white flex items-center gap-2">
          <span>🏆</span>
          <span>CHAMPIONS OF THE WORLD</span>
          <span>🏆</span>
        </div>

        {/* Big Golden Cup Graphic */}
        <div className="relative mt-2 mb-1">
          <img
            src={ASSET_IMAGES.trophy}
            alt="Championship Cup"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_8px_16px_rgba(250,204,21,0.6)] animate-pulse"
          />
        </div>

        {/* Victory Headline */}
        <h1 className="font-cartoon font-black text-2xl sm:text-3xl text-white tracking-wide">
          {winner.name.toUpperCase()} WINS!
        </h1>
        <p className="text-amber-300 font-cartoon font-bold text-sm sm:text-base mt-0.5">
          {winner.characterName} (#{winner.characterNumber}) Reached Square 100!
        </p>

        {/* Winner's Animated Footballer in CELEBRATING state */}
        <div className="my-2 h-44 sm:h-52 flex items-center justify-center">
          <AnimatedFootballer
            animationState="celebrating"
            size={160}
            characterId={winner.characterId}
            kit={winnerKit}
            speed={1.1}
            showBall={false}
          />
        </div>

        {/* Match Statistics Card */}
        <div className="grid grid-cols-3 gap-2 w-full my-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Turns Played</span>
            <span className="font-cartoon font-black text-amber-300 text-base sm:text-lg">
              {winner.turnsTaken}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Final Roll</span>
            <span className="font-cartoon font-black text-emerald-400 text-base sm:text-lg">
              🎲 {winner.lastRoll || 1}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Events Hit</span>
            <span className="font-cartoon font-black text-sky-400 text-base sm:text-lg">
              {winner.eventsTriggered}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS: PLAY AGAIN & MAIN MENU */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full mt-3 pt-2 border-t border-slate-800">
          {/* PLAY AGAIN BUTTON */}
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-cartoon font-black text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg border-2 border-emerald-300 transition-all hover:scale-102 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>⚽</span>
            <span>PLAY AGAIN</span>
          </button>

          {/* MAIN MENU / SELECT CHARACTERS BUTTON */}
          <button
            type="button"
            onClick={onMainMenu}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-cartoon font-black text-sm sm:text-base bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white shadow-lg border-2 border-slate-600 transition-all hover:scale-102 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>👥</span>
            <span>MAIN MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
