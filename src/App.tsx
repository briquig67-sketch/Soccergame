/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { SoccerBoard } from './components/SoccerBoard';
import { BoardLegend } from './components/BoardLegend';
import { CharacterSelection } from './components/CharacterSelection';
import { AnimationStudio } from './components/AnimationStudio';
import { CHARACTERS } from './data/characters';
import { PlayerToken, DEMO_PLAYERS } from './types/game';

type AppScreen = 'CHARACTER_SELECT' | 'GAME_BOARD' | 'ANIMATION_STUDIO';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('GAME_BOARD');
  const [playerCount, setPlayerCount] = useState<number>(4);

  // Player custom names (persisted across screens)
  const [playerNames, setPlayerNames] = useState<Record<number, string>>({
    0: 'Player 1',
    1: 'Player 2',
    2: 'Player 3',
    3: 'Player 4',
  });

  // Player character assignments: playerIndex -> characterId
  // Starts with Leo for P1 and Maya for P2, leaving P3 and P4 to demonstrate the selection & disabled Continue button
  const [selectedAssignments, setSelectedAssignments] = useState<Record<number, string>>({
    0: 'leo',
    1: 'maya',
    2: 'marcus',
    3: 'sofia',
  });

  // Assign a character to a player slot, releasing any previously held character
  const handleSelectCharacter = (playerIndex: number, characterId: string) => {
    setSelectedAssignments((prev) => {
      const next = { ...prev };
      // If this character was assigned to any other slot, release it
      Object.keys(next).forEach((key) => {
        const k = Number(key);
        if (next[k] === characterId && k !== playerIndex) {
          delete next[k];
        }
      });
      next[playerIndex] = characterId;
      return next;
    });
  };

  // Release a character from a player slot
  const handleReleaseCharacter = (playerIndex: number) => {
    setSelectedAssignments((prev) => {
      const next = { ...prev };
      delete next[playerIndex];
      return next;
    });
  };

  // Adjust participant count (2, 3, or 4)
  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    // Remove assignments beyond the new count, but preserve remaining selections
    setSelectedAssignments((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (Number(k) >= count) {
          delete next[Number(k)];
        }
      });
      return next;
    });
  };

  // Update custom player name
  const handleUpdatePlayerName = (playerIndex: number, name: string) => {
    setPlayerNames((prev) => ({
      ...prev,
      [playerIndex]: name,
    }));
  };

  // Quick Draft: assigns unique available characters to any unpicked player slots
  const handleQuickPickAll = () => {
    setSelectedAssignments((prev) => {
      const next = { ...prev };
      for (let i = 0; i < playerCount; i++) {
        if (!next[i]) {
          const taken = Object.values(next);
          const available = CHARACTERS.find((c) => !taken.includes(c.id));
          if (available) {
            next[i] = available.id;
          }
        }
      }
      return next;
    });
  };

  // Reset: clears all selections so user can test draft from scratch
  const handleResetAll = () => {
    setSelectedAssignments({});
  };

  // Map chosen characters into Board PlayerTokens
  const activePlayerTokens: PlayerToken[] = useMemo(() => {
    return Array.from({ length: playerCount }).map((_, pIdx) => {
      const charId = selectedAssignments[pIdx];
      const char = CHARACTERS.find((c) => c.id === charId);
      const customName = playerNames[pIdx] || `Player ${pIdx + 1}`;

      if (char) {
        return {
          id: pIdx + 1,
          name: `${customName}: ${char.name} (#${char.number})`,
          role: char.position,
          avatarIcon: char.avatarEmoji,
          portraitImage: char.portrait,
          characterNumber: char.number,
          characterName: char.name,
          characterId: char.id,
          colorClass: `${char.theme.badgeBg} ${char.theme.badgeText}`,
          borderClass: char.theme.borderClass,
        };
      }

      const fallback = DEMO_PLAYERS[pIdx] || DEMO_PLAYERS[0];
      return {
        ...fallback,
        name: customName,
      };
    });
  }, [playerCount, selectedAssignments, playerNames]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-start p-1.5 sm:p-3 md:p-5 overflow-x-hidden relative">
      {/* Stadium Night Atmosphere Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-blue-900/10 to-transparent pointer-events-none -z-10" />
      
      {/* Floodlight Beam Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="w-full max-w-5xl flex flex-col items-center">
        {/* Title Banner */}
        <HeaderBanner />

        {/* Global Navigation Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1 rounded-2xl mb-3 shadow-lg">
          <button
            type="button"
            onClick={() => setCurrentScreen('CHARACTER_SELECT')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-cartoon text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentScreen === 'CHARACTER_SELECT'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md scale-102'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>👥</span>
            <span>Character Selection</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('GAME_BOARD')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-cartoon text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentScreen === 'GAME_BOARD'
                ? 'bg-emerald-600 text-white shadow-md scale-102'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🏟️</span>
            <span>Championship Pitch</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('ANIMATION_STUDIO')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-cartoon text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentScreen === 'ANIMATION_STUDIO'
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md scale-102 ring-2 ring-red-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>⚡</span>
            <span>All Stars Animations</span>
          </button>
        </div>

        {/* SCREEN 1: Character Selection Screen */}
        {currentScreen === 'CHARACTER_SELECT' && (
          <CharacterSelection
            playerCount={playerCount}
            onPlayerCountChange={handlePlayerCountChange}
            selectedAssignments={selectedAssignments}
            playerNames={playerNames}
            onUpdatePlayerName={handleUpdatePlayerName}
            onSelectCharacter={handleSelectCharacter}
            onReleaseCharacter={handleReleaseCharacter}
            onQuickPickAll={handleQuickPickAll}
            onResetAll={handleResetAll}
            onContinue={() => setCurrentScreen('GAME_BOARD')}
            onBack={() => setCurrentScreen('GAME_BOARD')}
            onOpenAnimationStudio={() => setCurrentScreen('ANIMATION_STUDIO')}
          />
        )}

        {/* SCREEN 2: Soccer Board View with Selected Characters */}
        {currentScreen === 'GAME_BOARD' && (
          <>
            <SoccerBoard
              selectedPlayers={activePlayerTokens}
              playerCount={playerCount}
              onOpenCharacterSelect={() => setCurrentScreen('CHARACTER_SELECT')}
              onOpenAnimationStudio={() => setCurrentScreen('ANIMATION_STUDIO')}
            />
            {/* Board Legend & Layout Explanations */}
            <BoardLegend />
          </>
        )}

        {/* SCREEN 3: Leo Cruz Animation Studio Test Area */}
        {currentScreen === 'ANIMATION_STUDIO' && (
          <AnimationStudio
            onBackToPitch={() => setCurrentScreen('GAME_BOARD')}
            onGoToSelect={() => setCurrentScreen('CHARACTER_SELECT')}
          />
        )}
      </main>
    </div>
  );
}
