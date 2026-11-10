import React from 'react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-xl shadow">
              📖
            </span>
            <div>
              <h2
                id="how-to-play-title"
                className="font-cartoon font-black text-lg sm:text-xl text-white tracking-wide flex items-center gap-2"
              >
                <span>How to Play Soccer Stars</span>
                <span className="text-amber-400 text-sm">⚽</span>
              </h2>
              <p className="text-xs text-slate-400">
                Official Rules & Tournament Play Guide
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            title="Close Instructions"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Rules Content */}
        <div className="my-3 space-y-4 overflow-y-auto pr-1 text-xs sm:text-sm text-slate-300 max-h-[62vh]">
          
          {/* Section 1: Objective & Players */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4">
            <h3 className="font-cartoon font-black text-amber-300 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span>👥</span>
              <span>1. 2 to 4 Players & Character Selection</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-2">
              Soccer Stars supports <strong className="text-white">2, 3, or 4 players</strong> competing on a single device or screen.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>Choose from <strong className="text-amber-300">8 unique cartoon footballers</strong> (4 boys, 4 girls), each with authentic team kits, numbers, and expressive animations.</li>
              <li>Two players cannot pick the same footballer. Customize player names for your tournament!</li>
            </ul>
          </div>

          {/* Section 2: The 100-Square Pitch Grid */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4">
            <h3 className="font-cartoon font-black text-emerald-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span>🏟️</span>
              <span>2. The 100-Square Zigzag Pitch</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-2">
              The match is played on a <strong className="text-white">10 × 10 grid containing exactly 100 squares</strong> following traditional Snakes and Ladders zigzag numbering:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold font-cartoon block mb-0.5">⚽ Square 1 (START)</span>
                <span className="text-slate-400">Located at the bottom-left kickoff circle where all players begin.</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-yellow-400 font-bold font-cartoon block mb-0.5">🏆 Square 100 (FINISH)</span>
                <span className="text-slate-400">Located at the top-left championship trophy goal.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Rolling & Moving */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4">
            <h3 className="font-cartoon font-black text-sky-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span>🎲</span>
              <span>3. Rolling the Dice & Moving Step-by-Step</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed">
              <li>On your turn, press the <strong className="text-amber-300 font-cartoon">ROLL DICE</strong> button. The 3D animated dice generates a genuinely random number from <strong className="text-white">1 to 6</strong>.</li>
              <li>Your footballer automatically executes a smooth <strong className="text-sky-300">running animation</strong>, stepping through each square along the zigzag path with authentic kicking sound effects.</li>
              <li>Turns rotate clockwise between players. Other players are locked while movement is active.</li>
            </ul>
          </div>

          {/* Section 4: Special Soccer Event Squares */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4">
            <h3 className="font-cartoon font-black text-yellow-300 text-sm sm:text-base flex items-center gap-2 mb-2">
              <span>⚡</span>
              <span>4. Special Soccer Event Squares</span>
            </h3>
            <p className="text-slate-300 mb-2">
              Landing on a special square triggers referee whistles, crowd cheers, and tactical secondary movement:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-950/50 border border-emerald-500/40 p-2 rounded-xl flex items-start gap-2">
                <span className="text-lg">⚽</span>
                <div>
                  <strong className="text-emerald-300 font-cartoon block">Penalty Kick (+10 Squares)</strong>
                  <span className="text-slate-300 text-[11px]">Squares 9 ➔ 19 & 54 ➔ 64: Golden goal opportunity leaps forward 10 squares!</span>
                </div>
              </div>

              <div className="bg-cyan-950/50 border border-cyan-500/40 p-2 rounded-xl flex items-start gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <strong className="text-cyan-300 font-cartoon block">Sprint Breakaway (+6 Squares)</strong>
                  <span className="text-slate-300 text-[11px]">Squares 23 ➔ 29 & 68 ➔ 74: Fast counter-attack sprints forward 6 squares!</span>
                </div>
              </div>

              <div className="bg-teal-950/50 border border-teal-500/40 p-2 rounded-xl flex items-start gap-2">
                <span className="text-lg">🧤</span>
                <div>
                  <strong className="text-teal-300 font-cartoon block">Super Save (+4 Squares)</strong>
                  <span className="text-slate-300 text-[11px]">Squares 42 ➔ 46 & 83 ➔ 87: Goalkeeper fingertip parry rebounds forward 4 squares!</span>
                </div>
              </div>

              <div className="bg-amber-950/50 border border-amber-500/40 p-2 rounded-xl flex items-start gap-2">
                <span className="text-lg">🟨</span>
                <div>
                  <strong className="text-amber-300 font-cartoon block">Yellow Card (-5 Squares)</strong>
                  <span className="text-slate-300 text-[11px]">Squares 38 ➔ 33 & 77 ➔ 72: Reckless sliding tackle card retreats back 5 squares!</span>
                </div>
              </div>

              <div className="bg-rose-950/50 border border-rose-500/40 p-2 rounded-xl sm:col-span-2 flex items-start gap-2">
                <span className="text-lg">🟥</span>
                <div>
                  <strong className="text-rose-300 font-cartoon block">Red Card (-10 Squares)</strong>
                  <span className="text-slate-300 text-[11px]">Squares 59 ➔ 49 & 95 ➔ 85: Serious foul play leads to a harsh 10-square retreat penalty!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Exact Roll & Winning */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4">
            <h3 className="font-cartoon font-black text-amber-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span>🏆</span>
              <span>5. Winning by Exact Roll & The Bounce-Back Rule</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed">
              <li><strong className="text-white">Exact Roll Required:</strong> To win the tournament, you must land on <strong className="text-amber-300">Square 100</strong> with an exact roll!</li>
              <li><strong className="text-yellow-300">Bounce-Back Rule:</strong> If your roll exceeds 100, your footballer reaches the finish and then <strong className="text-rose-300">bounces backwards</strong> from Square 100 by the excess count. For example, if you are on Square 98 and roll a 5, you advance 2 squares to 100 and bounce back 3 squares to land on Square 97!</li>
              <li><strong className="text-emerald-400">Championship Victory:</strong> The first footballer to land squarely on 100 is crowned Champion with full fireworks, victory fanfare, and a victory celebration!</li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-cartoon font-bold text-xs cursor-pointer transition-colors"
          >
            Close Guide
          </button>

          {onStartGame && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartGame();
              }}
              className="px-5 py-2 rounded-xl font-cartoon font-black text-xs bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md border border-white cursor-pointer transition-all hover:scale-102"
            >
              ⚽ PLAY NOW!
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
