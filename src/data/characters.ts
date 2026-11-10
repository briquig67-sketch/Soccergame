import { ASSET_IMAGES } from '../assets/images';

export type CharacterGender = 'male' | 'female';

export interface CharacterAnimationSprites {
  idle: string;
  running: string;
  kicking: string;
  celebration: string;
}

export interface CharacterTheme {
  primary: string;
  secondary: string;
  borderClass: string;
  glowClass: string;
  badgeBg: string;
  badgeText: string;
  accentHex: string;
}

export interface CharacterData {
  id: string;
  name: string;
  nickname: string;
  number: number;
  gender: CharacterGender;
  position: 'Striker' | 'Midfielder' | 'Goalkeeper' | 'Winger' | 'Defender';
  uniformColor: string;
  specialMove: string;
  portrait: string;
  avatarEmoji: string;
  theme: CharacterTheme;
  // Prepared structure for future sprite animations (idle, running, kicking, celebration)
  animations: CharacterAnimationSprites;
}

export const CHARACTERS: CharacterData[] = [
  // --- MALE CHARACTERS (4) ---
  {
    id: 'leo',
    name: 'Leo Cruz',
    nickname: 'The Lightning Striker',
    number: 10,
    gender: 'male',
    position: 'Striker',
    uniformColor: 'Vivid Red & White',
    specialMove: 'Thunder Volley',
    portrait: ASSET_IMAGES.characters.leo,
    avatarEmoji: '⚡',
    theme: {
      primary: 'from-red-600 to-rose-700',
      secondary: 'bg-red-500',
      borderClass: 'border-red-400',
      glowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]',
      badgeBg: 'bg-red-500',
      badgeText: 'text-white',
      accentHex: '#ef4444',
    },
    animations: {
      idle: 'sprite_leo_idle',
      running: 'sprite_leo_running',
      kicking: 'sprite_leo_kicking',
      celebration: 'sprite_leo_celebration',
    },
  },
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    nickname: 'The Titan Wall',
    number: 1,
    gender: 'male',
    position: 'Goalkeeper',
    uniformColor: 'Neon Yellow & Black',
    specialMove: 'Iron Fist Save',
    portrait: ASSET_IMAGES.characters.marcus,
    avatarEmoji: '🧤',
    theme: {
      primary: 'from-amber-400 to-yellow-500',
      secondary: 'bg-yellow-400',
      borderClass: 'border-yellow-300',
      glowClass: 'shadow-[0_0_20px_rgba(250,204,21,0.6)]',
      badgeBg: 'bg-yellow-400',
      badgeText: 'text-slate-950',
      accentHex: '#facc15',
    },
    animations: {
      idle: 'sprite_marcus_idle',
      running: 'sprite_marcus_running',
      kicking: 'sprite_marcus_kicking',
      celebration: 'sprite_marcus_celebration',
    },
  },
  {
    id: 'kai',
    name: 'Kai Nordstrom',
    nickname: 'The Nordic Comet',
    number: 9,
    gender: 'male',
    position: 'Striker',
    uniformColor: 'Royal Purple & Orange',
    specialMove: 'Comet Rocket',
    portrait: ASSET_IMAGES.characters.kai,
    avatarEmoji: '🚀',
    theme: {
      primary: 'from-purple-600 to-indigo-700',
      secondary: 'bg-purple-500',
      borderClass: 'border-purple-400',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
      badgeBg: 'bg-purple-500',
      badgeText: 'text-white',
      accentHex: '#a855f7',
    },
    animations: {
      idle: 'sprite_kai_idle',
      running: 'sprite_kai_running',
      kicking: 'sprite_kai_kicking',
      celebration: 'sprite_kai_celebration',
    },
  },
  {
    id: 'diego',
    name: 'Diego Morales',
    nickname: 'The Maestro',
    number: 8,
    gender: 'male',
    position: 'Midfielder',
    uniformColor: 'Sky Blue & White',
    specialMove: 'Curve Maestro Pass',
    portrait: ASSET_IMAGES.characters.diego,
    avatarEmoji: '👟',
    theme: {
      primary: 'from-sky-500 to-blue-600',
      secondary: 'bg-sky-400',
      borderClass: 'border-sky-300',
      glowClass: 'shadow-[0_0_20px_rgba(56,189,248,0.6)]',
      badgeBg: 'bg-sky-400',
      badgeText: 'text-slate-950',
      accentHex: '#38bdf8',
    },
    animations: {
      idle: 'sprite_diego_idle',
      running: 'sprite_diego_running',
      kicking: 'sprite_diego_kicking',
      celebration: 'sprite_diego_celebration',
    },
  },

  // --- FEMALE CHARACTERS (4) ---
  {
    id: 'maya',
    name: 'Maya Tanaka',
    nickname: 'The Meteor Playmaker',
    number: 7,
    gender: 'female',
    position: 'Midfielder',
    uniformColor: 'Electric Cyan & Navy',
    specialMove: 'Laser Pinpoint Through-Ball',
    portrait: ASSET_IMAGES.characters.maya,
    avatarEmoji: '⚽',
    theme: {
      primary: 'from-cyan-500 to-teal-600',
      secondary: 'bg-cyan-400',
      borderClass: 'border-cyan-300',
      glowClass: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
      badgeBg: 'bg-cyan-400',
      badgeText: 'text-slate-950',
      accentHex: '#22d3ee',
    },
    animations: {
      idle: 'sprite_maya_idle',
      running: 'sprite_maya_running',
      kicking: 'sprite_maya_kicking',
      celebration: 'sprite_maya_celebration',
    },
  },
  {
    id: 'sofia',
    name: 'Sofia Silva',
    nickname: 'The Samba Queen',
    number: 11,
    gender: 'female',
    position: 'Winger',
    uniformColor: 'Emerald Green & Gold',
    specialMove: 'Dazzling Rainbow Flick',
    portrait: ASSET_IMAGES.characters.sofia,
    avatarEmoji: '✨',
    theme: {
      primary: 'from-emerald-500 to-green-700',
      secondary: 'bg-emerald-400',
      borderClass: 'border-emerald-300',
      glowClass: 'shadow-[0_0_20px_rgba(52,211,153,0.6)]',
      badgeBg: 'bg-emerald-400',
      badgeText: 'text-slate-950',
      accentHex: '#34d399',
    },
    animations: {
      idle: 'sprite_sofia_idle',
      running: 'sprite_sofia_running',
      kicking: 'sprite_sofia_kicking',
      celebration: 'sprite_sofia_celebration',
    },
  },
  {
    id: 'amara',
    name: 'Amara Okonjo',
    nickname: 'The Golden Falcon',
    number: 4,
    gender: 'female',
    position: 'Defender',
    uniformColor: 'Tangerine Orange & White',
    specialMove: 'Intercept & Counter',
    portrait: ASSET_IMAGES.characters.amara,
    avatarEmoji: '🦅',
    theme: {
      primary: 'from-orange-500 to-amber-600',
      secondary: 'bg-orange-400',
      borderClass: 'border-orange-300',
      glowClass: 'shadow-[0_0_20px_rgba(251,146,60,0.6)]',
      badgeBg: 'bg-orange-400',
      badgeText: 'text-slate-950',
      accentHex: '#fb923c',
    },
    animations: {
      idle: 'sprite_amara_idle',
      running: 'sprite_amara_running',
      kicking: 'sprite_amara_kicking',
      celebration: 'sprite_amara_celebration',
    },
  },
  {
    id: 'chloe',
    name: 'Chloe Laurent',
    nickname: 'The Velvet Cheetah',
    number: 17,
    gender: 'female',
    position: 'Winger',
    uniformColor: 'Magenta Pink & Violet',
    specialMove: 'Turbo Speed Dash',
    portrait: ASSET_IMAGES.characters.chloe,
    avatarEmoji: '🐆',
    theme: {
      primary: 'from-pink-500 to-rose-600',
      secondary: 'bg-pink-400',
      borderClass: 'border-pink-300',
      glowClass: 'shadow-[0_0_20px_rgba(244,114,182,0.6)]',
      badgeBg: 'bg-pink-400',
      badgeText: 'text-slate-950',
      accentHex: '#f472b6',
    },
    animations: {
      idle: 'sprite_chloe_idle',
      running: 'sprite_chloe_running',
      kicking: 'sprite_chloe_kicking',
      celebration: 'sprite_chloe_celebration',
    },
  },
];

export interface PlayerSelectionSlot {
  playerIndex: number; // 0, 1, 2, 3 (Player 1, Player 2, etc.)
  playerLabel: string; // 'Player 1', 'Player 2', etc.
  assignedCharacterId: string | null;
  slotColor: string;
}

export const DEFAULT_PLAYER_COLORS = [
  { name: 'Red', hex: '#ef4444', badge: 'bg-red-500 text-white border-red-300' },
  { name: 'Blue', hex: '#3b82f6', badge: 'bg-blue-500 text-white border-blue-300' },
  { name: 'Yellow', hex: '#eab308', badge: 'bg-amber-400 text-slate-950 border-amber-300' },
  { name: 'Green', hex: '#10b981', badge: 'bg-emerald-500 text-white border-emerald-300' },
];
