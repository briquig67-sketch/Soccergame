import { FootballerKitConfig, LEO_CRUZ_KIT } from '../types/animation';

/**
 * Authentic kits for all 8 footballers in Soccer Stars:
 * 4 Male characters: Leo Cruz, Marcus Sterling, Kai Nordstrom, Diego Morales
 * 4 Female characters: Maya Tanaka, Sofia Silva, Amara Okonjo, Chloe Laurent
 */
export const CHARACTER_KITS: Record<string, FootballerKitConfig> = {
  leo: {
    ...LEO_CRUZ_KIT,
    characterId: 'leo',
    characterName: 'Leo Cruz',
  },

  marcus: {
    characterId: 'marcus',
    characterName: 'Marcus Sterling',
    isGoalkeeper: true,
    jerseyPrimary: '#eab308',   // Neon Yellow / Gold
    jerseySecondary: '#0f172a', // Black accents
    jerseyStriped: false,
    jerseyNumber: 1,
    numberColor: '#0f172a',
    shortsColor: '#09090b',     // Deep black shorts
    socksPrimary: '#eab308',    // Yellow socks
    socksTrim: '#09090b',
    bootsColor: '#18181b',      // Black boots
    bootsLaces: '#eab308',
    skinTone: '#78350f',        // Deep bronze tone
    hairColor: '#18181b',       // Black hair
    hairStyle: 'fade',
  },

  kai: {
    characterId: 'kai',
    characterName: 'Kai Nordstrom',
    jerseyPrimary: '#9333ea',   // Royal Purple
    jerseySecondary: '#f97316', // Orange trim
    jerseyStriped: false,
    jerseyNumber: 9,
    numberColor: '#ffffff',
    shortsColor: '#1e1b4b',     // Dark indigo shorts
    socksPrimary: '#9333ea',    // Purple socks
    socksTrim: '#f97316',       // Orange trim
    bootsColor: '#f97316',      // Orange boots
    bootsLaces: '#ffffff',
    skinTone: '#fed7aa',        // Fair skin
    hairColor: '#eab308',       // Golden blond
    hairStyle: 'undercut',
  },

  diego: {
    characterId: 'diego',
    characterName: 'Diego Morales',
    jerseyPrimary: '#0ea5e9',   // Sky Blue
    jerseySecondary: '#ffffff', // White
    jerseyStriped: true,
    jerseyNumber: 8,
    numberColor: '#ffffff',
    shortsColor: '#1e293b',     // Navy shorts
    socksPrimary: '#0ea5e9',    // Sky blue socks
    socksTrim: '#ffffff',
    bootsColor: '#0284c7',      // Blue boots
    bootsLaces: '#ffffff',
    skinTone: '#fbcfe8',        // Rosy fair tone
    hairColor: '#451a03',       // Dark brunette
    hairStyle: 'wavy',
  },

  maya: {
    characterId: 'maya',
    characterName: 'Maya Tanaka',
    headbandColor: '#06b6d4',   // Electric Cyan Headband
    jerseyPrimary: '#06b6d4',   // Electric Cyan
    jerseySecondary: '#0f172a', // Navy accents
    jerseyStriped: false,
    jerseyNumber: 7,
    numberColor: '#ffffff',
    shortsColor: '#0f172a',     // Deep navy shorts
    socksPrimary: '#06b6d4',    // Cyan socks
    socksTrim: '#ffffff',
    bootsColor: '#0891b2',      // Teal boots
    bootsLaces: '#ffffff',
    skinTone: '#fde68a',        // Warm beige tone
    hairColor: '#09090b',       // Jet black hair
    hairStyle: 'bob',
  },

  sofia: {
    characterId: 'sofia',
    characterName: 'Sofia Silva',
    headbandColor: '#facc15',   // Golden Headband
    jerseyPrimary: '#10b981',   // Emerald Green
    jerseySecondary: '#facc15', // Gold trim
    jerseyStriped: false,
    jerseyNumber: 11,
    numberColor: '#facc15',
    shortsColor: '#064e3b',     // Dark emerald shorts
    socksPrimary: '#10b981',    // Green socks
    socksTrim: '#facc15',       // Gold trim
    bootsColor: '#facc15',      // Gold boots
    bootsLaces: '#064e3b',
    skinTone: '#d97706',        // Warm sun-kissed tone
    hairColor: '#1c1917',       // Dark curly hair
    hairStyle: 'curly',
  },

  amara: {
    characterId: 'amara',
    characterName: 'Amara Okonjo',
    headbandColor: '#f97316',   // Orange Hairband
    jerseyPrimary: '#f97316',   // Tangerine Orange
    jerseySecondary: '#ffffff', // White
    jerseyStriped: true,
    jerseyNumber: 4,
    numberColor: '#ffffff',
    shortsColor: '#09090b',     // Black shorts
    socksPrimary: '#f97316',    // Orange socks
    socksTrim: '#ffffff',
    bootsColor: '#1c1917',      // Black cleats
    bootsLaces: '#f97316',
    skinTone: '#451a03',        // Rich deep tone
    hairColor: '#09090b',       // Black braids
    hairStyle: 'braids',
  },

  chloe: {
    characterId: 'chloe',
    characterName: 'Chloe Laurent',
    headbandColor: '#ec4899',   // Magenta Scrunchies
    jerseyPrimary: '#ec4899',   // Magenta Pink
    jerseySecondary: '#a855f7', // Violet
    jerseyStriped: false,
    jerseyNumber: 17,
    numberColor: '#ffffff',
    shortsColor: '#581c87',     // Deep violet shorts
    socksPrimary: '#ec4899',    // Pink socks
    socksTrim: '#a855f7',       // Violet trim
    bootsColor: '#db2777',      // Hot pink boots
    bootsLaces: '#ffffff',
    skinTone: '#fed7aa',        // Warm fair tone
    hairColor: '#831843',       // Burgundy/chestnut hair
    hairStyle: 'puff',
  },
};

export function getKitForCharacter(characterId?: string): FootballerKitConfig {
  if (!characterId) return LEO_CRUZ_KIT;
  return CHARACTER_KITS[characterId] || LEO_CRUZ_KIT;
}
