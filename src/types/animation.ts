/**
 * Animation types and footballer styling props for Soccer Stars
 */

export type FootballerAnimationState =
  | 'idle'
  | 'running'
  | 'kicking'
  | 'celebrating'
  | 'falling';

export interface FootballerKitConfig {
  jerseyPrimary: string;    // e.g. '#dc2626' (Red)
  jerseySecondary: string;  // e.g. '#ffffff' (White)
  jerseyStriped: boolean;   // Has vertical stripes
  jerseyNumber: number;     // 10
  numberColor: string;      // '#ffffff' or '#0f172a'
  shortsColor: string;      // '#1e293b' (Dark shorts)
  socksPrimary: string;     // '#dc2626' (Red)
  socksTrim: string;        // '#ffffff' (White trim)
  bootsColor: string;       // '#0f172a' (Black boots)
  bootsLaces: string;       // '#f8fafc'
  skinTone: string;         // '#fcd34d' / '#fbcfe8' / '#e0a96d'
  hairColor: string;        // '#5c3a21' (Brown)
  hairStyle: 'spiky' | 'braids' | 'fade' | 'curly' | 'undercut' | 'puff' | 'wavy' | 'bob';
  characterId?: string;
  characterName?: string;
  isGoalkeeper?: boolean;
  headbandColor?: string;
}

export const LEO_CRUZ_KIT: FootballerKitConfig = {
  jerseyPrimary: '#dc2626',   // Bright Red
  jerseySecondary: '#ffffff', // White vertical stripes
  jerseyStriped: true,
  jerseyNumber: 10,
  numberColor: '#ffffff',
  shortsColor: '#1e293b',     // Dark navy/charcoal shorts
  socksPrimary: '#dc2626',    // Red socks
  socksTrim: '#ffffff',       // White top bands
  bootsColor: '#0f172a',      // Dark soccer cleats
  bootsLaces: '#ffffff',
  skinTone: '#fed7aa',        // Warm skin tone
  hairColor: '#5c341e',       // Brown hair
  hairStyle: 'spiky',         // Spiky hair
};
