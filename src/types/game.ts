/**
 * Types and structures for Soccer Stars: The Road to the Championship
 */

export type SpecialEventType =
  | 'start'        // Square 1: Kickoff Start Point
  | 'finish'       // Square 100: Championship Cup Finish
  | 'sprint'       // Fast Break Sprint Boost (Sky Blue / Cyan)
  | 'save'         // Super Goalkeeper Save (Teal / Emerald Shield)
  | 'penalty'      // Penalty Kick / Goal Opportunity (Electric Violet)
  | 'yellow_card'  // Yellow Card / Tactical Foul (Bright Amber / Orange)
  | 'red_card';    // Red Card / Offside Trap (Vivid Crimson)

export interface SpecialEventConfig {
  type: SpecialEventType;
  name: string;
  badgeLabel: string;
  icon: string;
  bgColorClass: string;
  borderColorClass: string;
  badgeColorClass: string;
  description: string;
}

export const SPECIAL_EVENTS: Record<SpecialEventType, SpecialEventConfig> = {
  start: {
    type: 'start',
    name: 'Kickoff',
    badgeLabel: 'START',
    icon: '⚽',
    bgColorClass: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500',
    borderColorClass: 'border-amber-300 ring-2 sm:ring-4 ring-amber-400',
    badgeColorClass: 'bg-amber-400 text-slate-950',
    description: 'The road to glory begins here at the kickoff circle.',
  },
  finish: {
    type: 'finish',
    name: 'Championship Cup',
    badgeLabel: 'FINISH',
    icon: '🏆',
    bgColorClass: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500',
    borderColorClass: 'border-yellow-200 ring-2 sm:ring-4 ring-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.6)]',
    badgeColorClass: 'bg-slate-950 text-yellow-300',
    description: 'Championship Trophy! Crowned world tournament winners.',
  },
  sprint: {
    type: 'sprint',
    name: 'Fast Break Sprint',
    badgeLabel: 'SPRINT',
    icon: '⚡',
    bgColorClass: 'bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700',
    borderColorClass: 'border-sky-300 ring-1 ring-sky-300/80',
    badgeColorClass: 'bg-sky-400 text-slate-950',
    description: 'Sprint boost! Speed down the wing past defenders.',
  },
  save: {
    type: 'save',
    name: 'Super Save',
    badgeLabel: 'SAVE',
    icon: '🧤',
    bgColorClass: 'bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-700',
    borderColorClass: 'border-teal-300 ring-1 ring-teal-300/80',
    badgeColorClass: 'bg-teal-300 text-slate-950',
    description: 'Heroic diving save! Safe zone defending the net.',
  },
  penalty: {
    type: 'penalty',
    name: 'Goal Chance',
    badgeLabel: 'GOAL',
    icon: '🎯',
    bgColorClass: 'bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-700',
    borderColorClass: 'border-purple-300 ring-1 ring-purple-300/80',
    badgeColorClass: 'bg-purple-300 text-slate-950',
    description: 'Direct penalty kick chance on target.',
  },
  yellow_card: {
    type: 'yellow_card',
    name: 'Yellow Card',
    badgeLabel: 'FOUL',
    icon: '🟨',
    bgColorClass: 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600',
    borderColorClass: 'border-amber-200 ring-1 ring-amber-300/80',
    badgeColorClass: 'bg-amber-300 text-slate-950',
    description: 'Tactical foul warning! Caution required.',
  },
  red_card: {
    type: 'red_card',
    name: 'Red Card',
    badgeLabel: 'OFFSIDE',
    icon: '🟥',
    bgColorClass: 'bg-gradient-to-br from-rose-500 via-red-600 to-rose-700',
    borderColorClass: 'border-rose-300 ring-1 ring-rose-300/80',
    badgeColorClass: 'bg-rose-400 text-white',
    description: 'Offside trap or foul! Setback on the pitch.',
  },
};

export interface PlayerToken {
  id: number;
  name: string;
  role: string;
  avatarIcon: string;
  colorClass: string;
  borderClass: string;
}

export const DEMO_PLAYERS: PlayerToken[] = [
  { id: 1, name: 'Striker', role: 'Forward', avatarIcon: '⚡', colorClass: 'bg-rose-500 text-white', borderClass: 'border-white' },
  { id: 2, name: 'Playmaker', role: 'Midfielder', avatarIcon: '⚽', colorClass: 'bg-sky-500 text-white', borderClass: 'border-white' },
  { id: 3, name: 'Winger', role: 'Speedster', avatarIcon: '👟', colorClass: 'bg-amber-400 text-slate-950', borderClass: 'border-slate-900' },
  { id: 4, name: 'Keeper', role: 'Defense', avatarIcon: '🧤', colorClass: 'bg-emerald-400 text-slate-950', borderClass: 'border-white' },
];

export interface BoardSquareData {
  number: number;
  rowFromBottom: number; // 0 (bottom row) to 9 (top row)
  colIndex: number;      // 0 (left) to 9 (right)
  gridRow: number;       // 0 (top row) to 9 (bottom row) for CSS grid
  isStart: boolean;
  isFinish: boolean;
  isEvenRow: boolean;
  grassShade: 'light' | 'dark';
  specialEvent?: SpecialEventConfig | null;
  themeMotif?: 'soccer_ball' | 'whistle' | 'trophy' | 'boot' | 'star' | 'flag' | null;
}

export interface BoardConfig {
  rows: number;
  cols: number;
  totalSquares: number;
}

export const BOARD_CONFIG: BoardConfig = {
  rows: 10,
  cols: 10,
  totalSquares: 100,
};

/**
 * Calculates the exact Snakes & Ladders zigzag square number:
 * - Row 0 (bottom row): squares 1 to 10, left to right (Square 1 at bottom-left, 10 at bottom-right)
 * - Row 1: squares 11 to 20, right to left (11 at right, 20 at left)
 * - Row 2: squares 21 to 30, left to right
 * ...
 * - Row 8: squares 81 to 90, left to right (81 at left, 90 at right)
 * - Row 9 (top row): squares 91 to 100, right to left (91 at right, 100 at top-left)
 */
export function getSquareNumber(rowFromBottom: number, colIndex: number): number {
  if (rowFromBottom % 2 === 0) {
    // Left-to-right
    return rowFromBottom * 10 + colIndex + 1;
  } else {
    // Right-to-left
    return rowFromBottom * 10 + (9 - colIndex) + 1;
  }
}

/**
 * Maps special event squares across the 100-square board
 */
export function getSpecialEvent(num: number): SpecialEventConfig | null {
  if (num === 1) return SPECIAL_EVENTS.start;
  if (num === 100) return SPECIAL_EVENTS.finish;

  // SPRINT (Fast Break - Sky Blue)
  if ([6, 22, 38, 54, 72, 86].includes(num)) return SPECIAL_EVENTS.sprint;

  // SUPER SAVE (Goalkeeping - Teal Shield)
  if ([16, 44, 66, 82].includes(num)) return SPECIAL_EVENTS.save;

  // GOAL CHANCE (Penalty Kick - Violet)
  if ([30, 50, 70, 92].includes(num)) return SPECIAL_EVENTS.penalty;

  // YELLOW CARD (Tactical Foul - Amber)
  if ([14, 34, 57, 75].includes(num)) return SPECIAL_EVENTS.yellow_card;

  // RED CARD (Offside Hazard - Crimson)
  if ([28, 49, 79, 96].includes(num)) return SPECIAL_EVENTS.red_card;

  return null;
}

/**
 * Generates all 100 squares sorted in grid display order (top-to-bottom, left-to-right).
 */
export function generateBoardSquares(): BoardSquareData[] {
  const squares: BoardSquareData[] = [];

  for (let gridRow = 0; gridRow < 10; gridRow++) {
    const rowFromBottom = 9 - gridRow;
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const num = getSquareNumber(rowFromBottom, colIndex);
      const isStart = num === 1;
      const isFinish = num === 100;
      const specialEvent = getSpecialEvent(num);

      // Alternating manicured lawn strips
      const grassShade = (rowFromBottom + colIndex) % 2 === 0 ? 'light' : 'dark';

      let themeMotif: BoardSquareData['themeMotif'] = null;
      if (num === 10 || num === 20 || num === 40 || num === 60 || num === 80) {
        themeMotif = 'soccer_ball';
      } else if (num === 25) {
        themeMotif = 'boot';
      } else if (num === 65) {
        themeMotif = 'flag';
      }

      squares.push({
        number: num,
        rowFromBottom,
        colIndex,
        gridRow,
        isStart,
        isFinish,
        isEvenRow: rowFromBottom % 2 === 0,
        grassShade,
        specialEvent,
        themeMotif,
      });
    }
  }

  return squares;
}
