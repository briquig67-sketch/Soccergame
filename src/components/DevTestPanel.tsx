import React, { useState } from 'react';
import { GamePlayer } from '../types/game';

interface DevTestPanelProps {
  isOpen: boolean;
  onClose: () => void;
  players: GamePlayer[];
  currentPlayerIndex: number;
  onSelectPlayerTurn: (playerIndex: number) => void;
  onSetPlayerSquare: (playerIndex: number, square: number) => void;
  onRollForcedDice: (diceValue: number) => void;
  onTestExactRollTo100: (fromSquare?: number) => void;
  onTestBounceBackFrom100: (fromSquare?: number, rollAmount?: number) => void;
  onTriggerChampionshipVictory: (playerIndex?: number) => void;
  onTestCelebrationAnimation: () => void;
  onResetTestState: () => void;
  isMoving: boolean;
  isRolling: boolean;
}

export const DevTestPanel: React.FC<DevTestPanelProps> = ({
  isOpen,
  onClose,
  players,
  currentPlayerIndex,
  onSelectPlayerTurn,
  onSetPlayerSquare,
  onRollForcedDice,
  onTestExactRollTo100,
  onTestBounceBackFrom100,
  onTriggerChampionshipVictory,
  onTestCelebrationAnimation,
  onResetTestState,
  isMoving,
  isRolling,
}) => {
  const [selectedTargetPlayerIdx, setSelectedTargetPlayerIdx] = useState<number>(currentPlayerIndex);
  const [targetSquareInput, setTargetSquareInput] = useState<number>(97);
  const [chosenDiceValue, setChosenDiceValue] = useState<number>(3);

  if (!isOpen) return null;

  const targetPlayer = players[selectedTargetPlayerIdx] || players[0];

  const handleApplySquare = () => {
    onSetPlayerSquare(selectedTargetPlayerIdx, targetSquareInput);
  };

  const handleQuickPreset = (sq: number) => {
    setTargetSquareInput(sq);
    onSetPlayerSquare(selectedTargetPlayerIdx, sq);
  };

  return (
    <aside
      aria-label="Developer Test Mode Panel"
      className="w-full max-w-[min(96vw,84vh,740px)] mx-auto mt-3 select-none"
    >
      <div className="bg-slate-950/95 border-2 border-amber-400 rounded-2xl p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-lg">
        
        {/* HEADER: Title & Status */}
        <div className="flex items-center justify-between pb-2.5 border-b border-amber-400/40">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-lg shadow">
              🛠️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cartoon font-black text-sm sm:text-base text-amber-300 tracking-wide uppercase">
                  Developer Test Mode
                </h3>
                <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                End-game mechanics simulator & testing suite
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="Close test panel"
          >
            <span>✕</span>
            <span>Close Panel</span>
          </button>
        </div>

        {/* SECTION 1: PLAYER SELECTOR & SQUARE TELEPORTER */}
        <div className="my-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-cartoon font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span>📍</span>
              <span>1. Player & Square Teleporter</span>
            </span>
            <span className="text-[11px] font-mono text-amber-300 font-bold">
              Current: Sq {targetPlayer?.currentSquare || 1}
            </span>
          </div>

          {/* Select Player Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5">
            {players.map((p, idx) => (
              <button
                key={`dev-p-${p.id}`}
                type="button"
                onClick={() => {
                  setSelectedTargetPlayerIdx(idx);
                  onSelectPlayerTurn(idx);
                }}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedTargetPlayerIdx === idx
                    ? 'bg-amber-400/20 border-amber-400 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <img
                  src={p.portrait}
                  alt={p.name}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">{p.name}</div>
                  <div className="text-[9px] text-amber-300 font-mono">Sq {p.currentSquare}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Square Slider & Input Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
            <div className="w-full sm:flex-1 flex items-center gap-2">
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">Target Sq:</span>
              <input
                type="range"
                min="1"
                max="100"
                value={targetSquareInput}
                onChange={(e) => setTargetSquareInput(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
              <input
                type="number"
                min="1"
                max="100"
                value={targetSquareInput}
                onChange={(e) => setTargetSquareInput(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-center font-cartoon font-bold text-amber-300 text-sm focus:border-amber-400 focus:outline-none"
              />
              <button
                type="button"
                disabled={isMoving || isRolling}
                onClick={handleApplySquare}
                className="px-3 py-1.5 rounded-lg font-cartoon font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all disabled:opacity-50 cursor-pointer"
              >
                Set Square
              </button>
            </div>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-800 text-[10px]">
            <span className="text-slate-400 mr-1 font-bold">Quick Jumps:</span>
            <button
              type="button"
              onClick={() => handleQuickPreset(1)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            >
              1 (START)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(50)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            >
              50 (Midfield)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(94)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            >
              94 (Penultimate)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(97)}
              className="px-2 py-0.5 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 font-bold cursor-pointer"
            >
              97 (3 to Win)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(98)}
              className="px-2 py-0.5 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 font-bold cursor-pointer"
            >
              98 (2 to Win)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(100)}
              className="px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-black border border-white cursor-pointer"
            >
              100 (FINISH)
            </button>
          </div>
        </div>

        {/* SECTION 2: FORCED DICE VALUE (1 TO 6) */}
        <div className="my-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-cartoon font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎲</span>
              <span>2. Set Dice Result (1 to 6)</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Selected value will trigger the physical 3D roll
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((diceNum) => (
                <button
                  key={`dice-val-${diceNum}`}
                  type="button"
                  onClick={() => setChosenDiceValue(diceNum)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-cartoon font-black text-sm sm:text-base border transition-all flex items-center justify-center cursor-pointer ${
                    chosenDiceValue === diceNum
                      ? 'bg-amber-400 text-slate-950 border-white scale-105 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                      : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {diceNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={isMoving || isRolling}
              onClick={() => onRollForcedDice(chosenDiceValue)}
              className="flex-1 min-w-[140px] py-2 px-3 rounded-xl font-cartoon font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow border border-blue-400/60 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <span>🎲</span>
              <span>Roll Chosen Dice ({chosenDiceValue})</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: END-GAME PRESETS & VICTORY TESTS */}
        <div className="my-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs font-cartoon font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>⚡</span>
            <span>3. End-Game Simulation Presets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            
            {/* Test 1: Exact Roll to 100 */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-cartoon font-bold text-emerald-400 text-xs sm:text-sm">
                  <span>🎯</span>
                  <span>Test Exact Roll to 100</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Teleports player to Square 97, rolls an exact 3, advances step-by-step to 100, and triggers Championship Victory!
                </p>
              </div>
              <button
                type="button"
                disabled={isMoving || isRolling}
                onClick={() => onTestExactRollTo100(97)}
                className="mt-2.5 w-full py-1.5 px-3 rounded-lg font-cartoon font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow border border-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🎯</span>
                <span>Run Exact Roll Test (97 ➔ 100)</span>
              </button>
            </div>

            {/* Test 2: Oversized Roll Bouncing Backwards */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-cartoon font-bold text-amber-400 text-xs sm:text-sm">
                  <span>⚡</span>
                  <span>Test Bounce Back from 100</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Teleports player to Square 97, rolls a 5 (excess of 2), reaches 100, and bounces backwards to Square 98!
                </p>
              </div>
              <button
                type="button"
                disabled={isMoving || isRolling}
                onClick={() => onTestBounceBackFrom100(97, 5)}
                className="mt-2.5 w-full py-1.5 px-3 rounded-lg font-cartoon font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow border border-white transition-all disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>⚡</span>
                <span>Run Bounce Test (Roll 5 ➔ 98)</span>
              </button>
            </div>

            {/* Test 3: Victory Screen Directly */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-yellow-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-cartoon font-bold text-yellow-300 text-xs sm:text-sm">
                  <span>🏆</span>
                  <span>Championship Victory Screen</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Directly renders the championship cup screen, winner statistics, Play Again and Main Menu buttons.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onTriggerChampionshipVictory(selectedTargetPlayerIdx)}
                className="mt-2.5 w-full py-1.5 px-3 rounded-lg font-cartoon font-bold text-xs bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black shadow border border-yellow-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🏆</span>
                <span>Open Victory Screen</span>
              </button>
            </div>

            {/* Test 4: Celebration Animation Directly */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-purple-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-cartoon font-bold text-purple-300 text-xs sm:text-sm">
                  <span>🕺</span>
                  <span>Celebration Animation</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Tests active footballer's joyful high-jump SVG celebration state with stars, trophy sparkler, and cheer sound.
                </p>
              </div>
              <button
                type="button"
                onClick={onTestCelebrationAnimation}
                className="mt-2.5 w-full py-1.5 px-3 rounded-lg font-cartoon font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow border border-purple-400 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🕺</span>
                <span>Play Celebration Animation</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: RESET & CONTROL ACTIONS */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="text-slate-400 text-[11px]">
            Normal gameplay randomness and rules remain 100% active outside developer actions.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Reset Test Button */}
            <button
              type="button"
              onClick={onResetTestState}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-cartoon font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>↺</span>
              <span>Reset Test</span>
            </button>

            {/* Close & Disable Dev Mode */}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 font-cartoon font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>✕</span>
              <span>Disable Test Mode</span>
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
