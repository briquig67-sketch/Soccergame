import React, { useMemo, useState } from 'react';
import {
  generateBoardSquares,
  BoardSquareData,
  PlayerToken,
  getCoordinatesForSquare,
} from '../types/game';
import { BoardSquare } from './BoardSquare';
import { PitchMarkings } from './PitchMarkings';
import { StadiumBorder } from './StadiumBorder';
import { AnimatedFootballer } from './AnimatedFootballer';
import { TurnControls } from './TurnControls';
import { Scoreboard } from './Scoreboard';
import { EventModal } from './EventModal';
import { VictoryModal } from './VictoryModal';
import { useSoccerGame } from '../hooks/useSoccerGame';
import { getKitForCharacter } from '../data/characterKits';
import { DevTestPanel } from './DevTestPanel';
import { LeoMovementControls } from './LeoMovementControls';

interface SoccerBoardProps {
  onSquareSelect?: (square: BoardSquareData) => void;
  selectedPlayers?: PlayerToken[];
  playerCount?: number;
  onOpenCharacterSelect?: () => void;
  onOpenAnimationStudio?: () => void;
}

export const SoccerBoard: React.FC<SoccerBoardProps> = ({
  onSquareSelect,
  selectedPlayers = [],
  playerCount = 4,
  onOpenCharacterSelect,
  onOpenAnimationStudio,
}) => {
  const [selectedSquareNum, setSelectedSquareNum] = useState<number | null>(1);
  const [showDirectionArrows, setShowDirectionArrows] = useState<boolean>(true);
  const [showPitchMarkings, setShowPitchMarkings] = useState<boolean>(true);
  const [showDevTestPanel, setShowDevTestPanel] = useState<boolean>(false);

  // Programmatically generate all 100 squares in zigzag order
  const squares = useMemo(() => generateBoardSquares(), []);

  // Multi-player Turn & Dice Game Engine (Stage 4)
  const game = useSoccerGame({
    initialPlayers: selectedPlayers,
    playerCount: selectedPlayers.length > 0 ? selectedPlayers.length : playerCount,
    stepDurationMs: 310,
  });

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

  // Active player coordinates for board token rendering
  const activeCoords = useMemo(
    () => getCoordinatesForSquare(game.currentPlayer.currentSquare),
    [game.currentPlayer.currentSquare]
  );

  const activeKit = useMemo(
    () => getKitForCharacter(game.currentPlayer.characterId),
    [game.currentPlayer.characterId]
  );

  // Map each square to the non-active players docked on that square
  const squarePlayerMap = useMemo(() => {
    const map = new Map<number, PlayerToken[]>();
    game.players.forEach((p, idx) => {
      // If moving, the active player is rendered as the full AnimatedFootballer
      // Other players are rendered in their square docking slots
      const token: PlayerToken = {
        id: p.id,
        name: `${p.name} (#${p.characterNumber})`,
        role: p.characterName,
        avatarIcon: p.avatarEmoji,
        portraitImage: p.portrait,
        characterNumber: p.characterNumber,
        characterName: p.characterName,
        characterId: p.characterId,
        colorClass: `${p.theme.badgeBg} ${p.theme.badgeText}`,
        borderClass: p.theme.borderClass,
      };

      const existing = map.get(p.currentSquare) || [];
      existing.push(token);
      map.set(p.currentSquare, existing);
    });
    return map;
  }, [game.players]);

  return (
    <div className="w-full flex flex-col items-center select-none pb-8">
      {/* 1. MATCH SCOREBOARD: All 2, 3, or 4 Players with Turn Indicators */}
      <Scoreboard
        players={game.players}
        currentPlayerIndex={game.currentPlayerIndex}
        isMoving={game.isMoving}
      />

      {/* 2. STADIUM FRAME ENCLOSING THE 100-SQUARE PITCH */}
      <div className="w-full flex flex-col items-center mt-2.5">
        <StadiumBorder>
          <div
            className="relative w-full aspect-square max-w-[720px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-white/70 bg-emerald-800"
            role="grid"
            aria-label="Soccer Stars 10x10 Championship Board"
          >
            {/* White Field Markings SVG Overlay */}
            <PitchMarkings showMarkings={showPitchMarkings} />

            {/* 10 x 10 CSS Grid containing exactly 100 consistently dimensioned squares */}
            <div className="grid grid-cols-10 grid-rows-10 w-full h-full relative z-0">
              {squares.map((square) => {
                const playersOnSquare = squarePlayerMap.get(square.number) || [];

                return (
                  <BoardSquare
                    key={`square-${square.number}`}
                    square={square}
                    isSelected={selectedSquareNum === square.number}
                    onSquareClick={handleSquareClick}
                    showDirectionArrows={showDirectionArrows}
                    showPlayerSlots={true}
                    activePlayers={playersOnSquare}
                  />
                );
              })}
            </div>

            {/* ANIMATED ACTIVE FOOTBALLER ON BOARD */}
            <div
              className="absolute pointer-events-none z-30 transition-all duration-300 ease-in-out flex flex-col items-center justify-center"
              style={{
                left: `${activeCoords.percentX}%`,
                top: `${activeCoords.percentY}%`,
                transform: 'translate(-50%, -50%)',
                width: '9.2%',
                height: '11.8%',
              }}
            >
              {/* Pitch turf active player shadow beacon */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 sm:w-10 h-2.5 sm:h-3.5 rounded-full blur-[2px] animate-pulse -z-10"
                style={{ backgroundColor: `${game.currentPlayer.theme.accentHex}88` }}
              />

              {/* Active Player Mini Name & Jersey Ribbon */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-950/95 text-[8px] sm:text-[9px] font-black font-cartoon px-1.5 py-0.2 rounded-full border shadow-md whitespace-nowrap leading-none flex items-center gap-0.5 z-40"
                style={{
                  borderColor: game.currentPlayer.theme.accentHex,
                  color: game.currentPlayer.theme.accentHex,
                }}
              >
                <span>{game.currentPlayer.avatarEmoji}</span>
                <span>
                  {game.currentPlayer.name.split(' ')[0].toUpperCase()} #{game.currentPlayer.characterNumber}
                </span>
              </div>

              {/* Animated 2D SVG Footballer customized with active player's authentic kit */}
              <AnimatedFootballer
                animationState={game.activeAnimationState}
                size="100%"
                characterId={game.currentPlayer.characterId}
                kit={activeKit}
                facing={game.activeFacing}
                speed={game.isMoving ? 1.4 : 1.0}
                showBall={false}
              />
            </div>
          </div>
        </StadiumBorder>
      </div>

      {/* 3. TURN CONTROLS DOCK: 3D Animated Dice, Active Player Spotlight & Turn Info */}
      <TurnControls
        currentPlayer={game.currentPlayer}
        diceValue={game.diceValue}
        isRolling={game.isRolling}
        isMoving={game.isMoving}
        activeStep={game.activeStep}
        totalSteps={game.totalSteps}
        statusMessage={game.statusMessage}
        lastBounced={game.lastBounced}
        onRollDice={game.rollDice}
        onRestartMatch={game.restartGame}
        onOpenCharacterSelect={onOpenCharacterSelect}
        isDevModeActive={showDevTestPanel}
        onToggleDevMode={() => setShowDevTestPanel((prev) => !prev)}
      />

      {/* 4. EVENT POPUP MODAL (When landed on Sprint, Goal Chance, Super Save, Cards) */}
      <EventModal
        event={game.activeEvent}
        onDismiss={game.dismissEvent}
      />

      {/* 5. VICTORY CHAMPIONSHIP MODAL (When a player reaches Square 100) */}
      <VictoryModal
        winner={game.winner}
        onPlayAgain={game.restartGame}
        onMainMenu={() => {
          if (onOpenCharacterSelect) {
            onOpenCharacterSelect();
          }
        }}
      />

      {/* 6. INSPECTOR & DISPLAY BAR */}
      <div className="w-full max-w-[min(96vw,84vh,740px)] mt-2.5 px-1 sm:px-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs text-slate-300">
        
        {/* Left: View Mode Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1.5 rounded-xl shadow-md">
          {onOpenCharacterSelect && (
            <button
              type="button"
              onClick={onOpenCharacterSelect}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-cartoon font-bold text-xs shadow-md flex items-center gap-1 transition-all mr-1 cursor-pointer"
              title="Open the 8-player character roster"
            >
              <span>👥</span>
              <span>Select Stars</span>
            </button>
          )}

          {onOpenAnimationStudio && (
            <button
              type="button"
              onClick={onOpenAnimationStudio}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-cartoon font-bold text-xs shadow-md flex items-center gap-1 transition-all mr-1 cursor-pointer"
              title="Preview footballer 2D SVG animations"
            >
              <span>⚡</span>
              <span>Animation Studio</span>
            </button>
          )}

          {/* Direction Zigzag Toggle */}
          <button
            type="button"
            onClick={() => setShowDirectionArrows(!showDirectionArrows)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
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
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
              showPitchMarkings
                ? 'bg-slate-700 text-slate-200'
                : 'bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle soccer pitch white line markings"
          >
            Lines: {showPitchMarkings ? 'ON' : 'OFF'}
          </button>

          {/* DEVELOPER TEST MODE TOGGLE (Separate testing panel) */}
          <button
            type="button"
            onClick={() => setShowDevTestPanel(!showDevTestPanel)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-cartoon font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              showDevTestPanel
                ? 'bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-400/50 hover:border-amber-300'
            }`}
            title="Open Developer Test Mode to simulate end-game mechanics"
          >
            <span>🛠️</span>
            <span>Dev Mode: {showDevTestPanel ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Right: Selected Square Inspector Pill */}
        <div className="flex items-center justify-between sm:justify-start gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-md">
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

      {/* DEVELOPER TEST MODE SEPARATE TESTING SUITE PANEL */}
      <DevTestPanel
        isOpen={showDevTestPanel}
        onClose={() => setShowDevTestPanel(false)}
        players={game.players}
        currentPlayerIndex={game.currentPlayerIndex}
        onSelectPlayerTurn={game.setCurrentPlayerTurn}
        onSetPlayerSquare={game.setPlayerSquare}
        onRollForcedDice={game.rollDice}
        onTestExactRollTo100={game.testExactRollTo100}
        onTestBounceBackFrom100={game.testBounceBackFrom100}
        onTriggerChampionshipVictory={game.triggerChampionshipVictory}
        onTestCelebrationAnimation={game.testCelebrationAnimation}
        onResetTestState={game.resetTestState}
        isMoving={game.isMoving}
        isRolling={game.isRolling}
      />
    </div>
  );
};
