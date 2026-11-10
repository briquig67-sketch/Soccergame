import React, { useState } from 'react';
import {
  CHARACTERS,
  CharacterData,
  DEFAULT_PLAYER_COLORS,
  CharacterGender,
} from '../data/characters';
import { ASSET_IMAGES } from '../assets/images';

export interface SelectedPlayerAssignment {
  playerIndex: number;
  playerNumber: number; // 1, 2, 3, 4
  character: CharacterData;
}

interface CharacterSelectionProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  selectedAssignments: Record<number, string>; // playerIndex -> characterId
  playerNames: Record<number, string>; // playerIndex -> Custom Name
  onUpdatePlayerName: (playerIndex: number, name: string) => void;
  onSelectCharacter: (playerIndex: number, characterId: string) => void;
  onReleaseCharacter: (playerIndex: number) => void;
  onQuickPickAll: () => void;
  onResetAll: () => void;
  onContinue: () => void;
  onBack: () => void;
  onOpenAnimationStudio?: () => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  playerCount,
  onPlayerCountChange,
  selectedAssignments,
  playerNames,
  onUpdatePlayerName,
  onSelectCharacter,
  onReleaseCharacter,
  onQuickPickAll,
  onResetAll,
  onContinue,
  onBack,
  onOpenAnimationStudio,
}) => {
  // Currently active player who is making their pick (0 = Player 1, 1 = Player 2, etc.)
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [filterGender, setFilterGender] = useState<'all' | CharacterGender>('all');
  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);
  const [conflictMessage, setConflictMessage] = useState<string | null>(null);

  // Check how many active players have completed their selection
  const completedCount = Array.from({ length: playerCount }).filter(
    (_, idx) => !!selectedAssignments[idx]
  ).length;
  const isAllReady = completedCount === playerCount;

  // Filter roster
  const filteredCharacters = CHARACTERS.filter((char) => {
    if (filterGender === 'all') return true;
    return char.gender === filterGender;
  });

  // Check which player has selected this character (if any)
  const getSelectingPlayer = (characterId: string): number | null => {
    for (let i = 0; i < playerCount; i++) {
      if (selectedAssignments[i] === characterId) {
        return i;
      }
    }
    return null;
  };

  const handleCharacterClick = (char: CharacterData) => {
    setConflictMessage(null);
    const assignedPlayer = getSelectingPlayer(char.id);

    // If another player already took this character, prevent picking and show notice
    if (assignedPlayer !== null && assignedPlayer !== activePlayerIndex) {
      const takenBy = playerNames[assignedPlayer] || `Player ${assignedPlayer + 1}`;
      setConflictMessage(`"${char.name}" is already drafted by ${takenBy}! Choose another soccer star or change their pick first.`);
      setTimeout(() => setConflictMessage(null), 4000);
      return;
    }

    // Assign to active player (releases any previous star chosen by active player)
    onSelectCharacter(activePlayerIndex, char.id);

    // Auto-advance to next player without a pick if available
    const nextUnpicked = Array.from({ length: playerCount }).findIndex(
      (_, idx) => idx !== activePlayerIndex && !selectedAssignments[idx]
    );

    if (nextUnpicked !== -1) {
      setActivePlayerIndex(nextUnpicked);
    }
  };

  const activeColor = DEFAULT_PLAYER_COLORS[activePlayerIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto select-none px-2 sm:px-4 py-2">
      {/* Stadium Top Frame with Grandstand & Floodlights */}
      <div className="relative rounded-3xl p-3 sm:p-5 md:p-6 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_3px_#334155,0_0_0_8px_#1e293b] border border-slate-700/80">
        
        {/* Top Grandstand Crowd Header */}
        <div className="relative mb-3 sm:mb-4 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-inner">
          <div className="relative h-14 sm:h-20 w-full overflow-hidden">
            <img
              src={ASSET_IMAGES.stadiumCrowd}
              alt="Stadium Crowd"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-center justify-between px-3 sm:px-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded border border-amber-400/40">
                  CHAMPIONSHIP DRAFT · 2–4 PLAYERS
                </span>
                <h2 className="text-xl sm:text-3xl font-black font-cartoon text-white drop-shadow tracking-wide mt-0.5">
                  CHOOSE YOUR SOCCER STARS
                </h2>
              </div>

              {/* Player Count Selector: 2, 3, or 4 Players */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/90 p-1.5 rounded-xl border border-slate-700 shadow-md">
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold hidden sm:inline ml-1">
                  Participants:
                </span>
                {[2, 3, 4].map((count) => (
                  <button
                    key={`player-count-${count}`}
                    type="button"
                    onClick={() => {
                      onPlayerCountChange(count);
                      if (activePlayerIndex >= count) {
                        setActivePlayerIndex(0);
                      }
                    }}
                    className={`px-2.5 sm:px-3.5 py-1 rounded-lg text-xs font-cartoon font-bold transition-all ${
                      playerCount === count
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md scale-105 ring-2 ring-yellow-400/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {count} Players
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LED Perimeter Ticker */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-1 px-4 flex items-center justify-between text-[10px] sm:text-xs font-cartoon tracking-wider uppercase border-t border-b border-black/40">
            <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap overflow-hidden animate-pulse">
              <span>★ 8 OFFICIAL TOURNAMENT HEROES ★</span>
              <span>⚡ 4 MALE & 4 FEMALE STARS ⚡</span>
              <span>⚽ UNIQUE UNIFORMS & SIGNATURE MOVES ⚽</span>
            </div>
          </div>
        </div>

        {/* Temporary Conflict Alert Toast */}
        {conflictMessage && (
          <div className="mb-3 p-2.5 bg-rose-500/20 border-2 border-rose-500 rounded-xl text-rose-200 text-xs font-medium flex items-center justify-between animate-shake">
            <div className="flex items-center gap-2">
              <span className="text-base">⛔</span>
              <span>{conflictMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setConflictMessage(null)}
              className="text-xs bg-rose-900/60 hover:bg-rose-900 px-2 py-0.5 rounded text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* PLAYER SELECTION SLOTS STRIP */}
        <div className="mb-4 bg-slate-900/90 rounded-2xl p-2.5 sm:p-3 border border-slate-700/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">📋</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                Team Selection Slots:
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isAllReady
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                }`}
              >
                {completedCount}/{playerCount} Stars Drafted
              </span>
            </div>

            {/* Quick Testing Tools & Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Quick Pick & Reset Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onQuickPickAll}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40 transition-colors flex items-center gap-1"
                  title="Quickly assign available stars to all remaining player slots"
                >
                  <span>⚡</span>
                  <span>Quick Pick</span>
                </button>
                <button
                  type="button"
                  onClick={onResetAll}
                  className="px-2 py-1 text-[11px] font-bold rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                  title="Clear all character selections"
                >
                  Reset
                </button>
              </div>

              {/* Filter Tabs (All / Male / Female) */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setFilterGender('all')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-lg transition-colors ${
                    filterGender === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (8)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterGender('male')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-lg transition-colors ${
                    filterGender === 'male'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Male (4)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterGender('female')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-lg transition-colors ${
                    filterGender === 'female'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Female (4)
                </button>
              </div>
            </div>
          </div>

          {/* Player Slot Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2.5">
            {Array.from({ length: playerCount }).map((_, pIdx) => {
              const pColor = DEFAULT_PLAYER_COLORS[pIdx];
              const assignedId = selectedAssignments[pIdx];
              const assignedChar = CHARACTERS.find((c) => c.id === assignedId);
              const isActive = activePlayerIndex === pIdx;
              const displayName = playerNames[pIdx] || `Player ${pIdx + 1}`;
              const isEditing = editingPlayerIndex === pIdx;

              return (
                <div
                  key={`player-slot-${pIdx}`}
                  onClick={() => setActivePlayerIndex(pIdx)}
                  className={`
                    relative p-2.5 rounded-2xl transition-all border-2 flex items-center justify-between gap-2.5 cursor-pointer
                    ${
                      isActive
                        ? 'bg-slate-800/95 border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.35)] ring-2 ring-amber-400/50 scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-700/80 hover:bg-slate-800/70'
                    }
                  `}
                >
                  {/* Left: Avatar Thumbnail or Placeholder */}
                  <div className="relative shrink-0">
                    {assignedChar ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-900">
                        <img
                          src={assignedChar.portrait}
                          alt={assignedChar.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex flex-col items-center justify-center font-black text-sm border-2 ${pColor.badge} shadow-md`}
                      >
                        <span>P{pIdx + 1}</span>
                        <span className="text-[9px] font-normal opacity-80 leading-none">EMPTY</span>
                      </div>
                    )}
                    {/* Active turn pointer */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-ping" />
                    )}
                  </div>

                  {/* Middle: Player Label & Chosen Character */}
                  <div className="overflow-hidden flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {isEditing ? (
                        <input
                          type="text"
                          value={displayName}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => onUpdatePlayerName(pIdx, e.target.value)}
                          onBlur={() => setEditingPlayerIndex(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingPlayerIndex(null);
                          }}
                          className="w-full bg-slate-900 text-white font-cartoon text-xs px-1.5 py-0.5 rounded border border-amber-400 outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="font-cartoon text-xs font-bold text-slate-100 truncate">
                            {displayName}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPlayerIndex(pIdx);
                            }}
                            className="text-[10px] text-slate-400 hover:text-white"
                            title="Rename player"
                          >
                            ✎
                          </button>
                        </div>
                      )}

                      {isActive && (
                        <span className="text-[9px] font-black text-amber-300 font-mono bg-amber-950/80 px-1 py-0.2 rounded border border-amber-400/30 shrink-0">
                          CHOOSING
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] truncate mt-0.5">
                      {assignedChar ? (
                        <div className="flex items-center gap-1 font-bold text-emerald-300">
                          <span>{assignedChar.avatarEmoji}</span>
                          <span className="truncate">{assignedChar.name} (#{assignedChar.number})</span>
                        </div>
                      ) : (
                        <span className="text-amber-200/80 italic font-medium">Click a star below...</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Release / Clear button if a character is chosen */}
                  {assignedChar && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReleaseCharacter(pIdx);
                      }}
                      className="p-1 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors shrink-0 text-xs"
                      title={`Release ${assignedChar.name}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8-CHARACTER ROSTER GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-2">
          {filteredCharacters.map((char) => {
            const assignedPlayerIndex = getSelectingPlayer(char.id);
            const isTaken = assignedPlayerIndex !== null;
            const isSelectedByActive = assignedPlayerIndex === activePlayerIndex;
            const isTakenByOther = isTaken && !isSelectedByActive;
            const takenColor = isTaken ? DEFAULT_PLAYER_COLORS[assignedPlayerIndex] : null;
            const takenByName = isTaken
              ? playerNames[assignedPlayerIndex] || `Player ${assignedPlayerIndex + 1}`
              : '';

            return (
              <div
                key={char.id}
                onClick={() => handleCharacterClick(char)}
                className={`
                  relative rounded-2xl overflow-hidden border-2 transition-all duration-200 select-none flex flex-col justify-between
                  bg-gradient-to-b from-slate-800 to-slate-950 group
                  ${
                    isTakenByOther
                      ? 'opacity-65 cursor-not-allowed border-slate-700/60'
                      : 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl'
                  }
                  ${
                    isSelectedByActive
                      ? `${char.theme.borderClass} ${char.theme.glowClass} ring-4 ring-amber-400 scale-[1.02]`
                      : isTakenByOther
                      ? 'border-slate-700'
                      : 'border-slate-700/80 hover:border-slate-500'
                  }
                `}
              >
                {/* Top Corner: Number & Position Pill */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 pointer-events-none">
                  {/* Number Badge */}
                  <span
                    className={`
                      px-2 py-0.5 rounded-lg text-xs font-black font-sans leading-none shadow-md border
                      ${char.theme.badgeBg} ${char.theme.badgeText} border-white/40
                    `}
                  >
                    #{char.number}
                  </span>

                  {/* Position Badge */}
                  <span className="bg-slate-950/85 text-slate-200 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {char.position}
                  </span>
                </div>

                {/* Character Portrait (Large & Easy to identify) */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <img
                    src={char.portrait}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Selected Player Overlay Ribbon */}
                  {isTaken && (
                    <div className="absolute inset-x-0 bottom-2 flex justify-center z-20">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-black font-cartoon uppercase tracking-wider shadow-lg border flex items-center gap-1.5 ${takenColor?.badge}`}
                      >
                        <span>✓</span>
                        <span>{takenByName.toUpperCase()}</span>
                      </div>
                    </div>
                  )}

                  {/* Unavailable Mask if taken by another player */}
                  {isTakenByOther && (
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <div className="bg-slate-900/90 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-mono shadow-md flex items-center gap-1">
                        <span>🔒</span>
                        <span>TAKEN BY {takenByName.toUpperCase()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Info Section */}
                <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 bg-slate-900/90 border-t border-slate-800">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-cartoon text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {char.name}
                      </h4>
                      <span className="text-xs">{char.avatarEmoji}</span>
                    </div>
                    <p className="text-[11px] text-amber-300/90 font-medium">
                      {char.nickname}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                    {/* Uniform Color */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Kit Color:</span>
                      <span className="font-semibold text-slate-200 flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/50"
                          style={{ backgroundColor: char.theme.accentHex }}
                        />
                        {char.uniformColor}
                      </span>
                    </div>

                    {/* Special Move */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Special Move:</span>
                      <span className="font-semibold text-yellow-300 truncate max-w-[120px]">
                        {char.specialMove}
                      </span>
                    </div>

                    {/* Prepared Future Animation States Badge */}
                    <div className="flex items-center justify-between text-[9px] text-slate-400 pt-0.5">
                      <span>Sprites:</span>
                      <span className="text-slate-300 font-mono">
                        Idle · Run · Kick · Win
                      </span>
                    </div>

                    {char.id === 'leo' && onOpenAnimationStudio && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAnimationStudio();
                        }}
                        className="w-full mt-1 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 hover:text-white text-[10px] font-cartoon font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>⚡</span>
                        <span>Preview Leo's 5 Animations</span>
                      </button>
                    )}
                  </div>

                  {/* Select button action */}
                  <button
                    type="button"
                    disabled={isTakenByOther}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCharacterClick(char);
                    }}
                    className={`
                      w-full mt-2.5 py-1.5 px-2 rounded-xl text-xs font-cartoon font-bold transition-all shadow-sm
                      ${
                        isSelectedByActive
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                          : isTakenByOther
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950'
                      }
                    `}
                  >
                    {isSelectedByActive
                      ? `✓ Selected for ${playerNames[activePlayerIndex] || `P${activePlayerIndex + 1}`}`
                      : isTakenByOther
                      ? `Claimed by ${takenByName}`
                      : `Pick for ${playerNames[activePlayerIndex] || `P${activePlayerIndex + 1}`}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ACTION BAR: BACK & CONTINUE BUTTONS */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* BACK Button */}
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-cartoon text-sm font-bold border border-slate-600 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>←</span>
              <span>BACK TO PITCH</span>
            </button>

            {onOpenAnimationStudio && (
              <button
                type="button"
                onClick={onOpenAnimationStudio}
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-cartoon text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Preview all 8 footballers animations"
              >
                <span>⚡</span>
                <span>Star Animations</span>
              </button>
            )}
          </div>

          {/* Selection Status Prompt */}
          <div className="text-center sm:text-left text-xs">
            {isAllReady ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="text-base">⚽</span>
                <span>All {playerCount} players are ready! Click Continue to take the pitch.</span>
              </div>
            ) : (
              <div className="text-amber-300 font-medium">
                {playerNames[activePlayerIndex] || `Player ${activePlayerIndex + 1}`} ({DEFAULT_PLAYER_COLORS[activePlayerIndex].name}): Select a character ({completedCount}/{playerCount} ready)
              </div>
            )}
          </div>

          {/* CONTINUE Button: Strictly disabled until all players have selected */}
          <button
            type="button"
            disabled={!isAllReady}
            onClick={onContinue}
            className={`
              w-full sm:w-auto px-8 py-3 rounded-xl font-cartoon text-sm sm:text-base font-black uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2
              ${
                isAllReady
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 ring-4 ring-yellow-400/50 scale-105 cursor-pointer animate-pulse'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
              }
            `}
            title={isAllReady ? 'Proceed to match pitch' : `Please select a character for all ${playerCount} players`}
          >
            <span>CONTINUE TO MATCH</span>
            <span>➔</span>
          </button>
        </div>

      </div>
    </div>
  );
};
