import React from 'react';
import { FootballerAnimationState, FootballerKitConfig, LEO_CRUZ_KIT } from '../types/animation';
import { getKitForCharacter } from '../data/characterKits';

interface AnimatedFootballerProps {
  animationState?: FootballerAnimationState;
  size?: number | string;
  characterId?: string; // e.g. 'leo', 'marcus', 'kai', 'diego', 'maya', 'sofia', 'amara', 'chloe'
  kit?: Partial<FootballerKitConfig>;
  facing?: 'right' | 'left';
  speed?: number; // 1 = normal, 0.5 = slow-mo, 1.5 = fast
  showBall?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Reusable 2D SVG Cartoon Footballer component with 5 CSS keyframe animation states:
 * - IDLE
 * - RUNNING
 * - KICKING
 * - CELEBRATING
 * - FALLING
 *
 * Fully supports all 8 footballers in Soccer Stars:
 * 1. Leo Cruz (#10 - Striker - Spiky hair - Red & White)
 * 2. Marcus Sterling (#1 - Goalkeeper - Fade cut & Gloves - Yellow & Black)
 * 3. Kai Nordstrom (#9 - Striker - Blond Undercut - Purple & Orange)
 * 4. Diego Morales (#8 - Midfielder - Wavy brunette hair - Sky Blue & White)
 * 5. Maya Tanaka (#7 - Midfielder - Sleek Bob & Headband - Electric Cyan & Navy)
 * 6. Sofia Silva (#11 - Winger - Voluminous Curls & Gold Band - Emerald & Gold)
 * 7. Amara Okonjo (#4 - Defender - Braided Cornrows & Ponytail - Orange & White)
 * 8. Chloe Laurent (#17 - Winger - Sporty Double Puff Buns - Magenta & Violet)
 */
export const AnimatedFootballer: React.FC<AnimatedFootballerProps> = ({
  animationState = 'idle',
  size = 200,
  characterId,
  kit = {},
  facing = 'right',
  speed = 1.0,
  showBall = true,
  className = '',
  onClick,
}) => {
  // Merge base kit from characterId (or Leo default) with any custom overrides
  const baseKit = characterId ? getKitForCharacter(characterId) : LEO_CRUZ_KIT;
  const fullKit: FootballerKitConfig = { ...baseKit, ...kit };

  // Calculate animation duration based on speed multiplier
  const idleDuration = (2.2 / speed).toFixed(2);
  const runDuration = (0.75 / speed).toFixed(2);
  const kickDuration = (1.2 / speed).toFixed(2);
  const celebrateDuration = (0.85 / speed).toFixed(2);
  const fallDuration = (1.6 / speed).toFixed(2);

  const charName = fullKit.characterName || (characterId ? characterId.toUpperCase() : 'Leo Cruz');
  const patternId = `stripes-${fullKit.jerseyNumber}-${fullKit.jerseyPrimary.replace('#', '')}`;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size * 1.2}px` : size,
        transform: facing === 'left' ? 'scaleX(-1)' : undefined,
      }}
      title={`${charName} (${animationState.toUpperCase()})`}
    >
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Cartoon Drop Shadow */}
          <filter id="cartoonShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" />
          </filter>

          {/* Jersey Stripes Pattern (Supports custom primary/secondary colors per character) */}
          <pattern
            id={patternId}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="7" height="14" fill={fullKit.jerseyPrimary} />
            <rect x="7" width="7" height="14" fill={fullKit.jerseySecondary} />
          </pattern>

          {/* Embedded Animation CSS Styles */}
          <style>{`
            /* --- IDLE ANIMATION --- */
            .state-idle .player-body {
              animation: idleBob ${idleDuration}s ease-in-out infinite;
              transform-origin: 100px 180px;
            }
            .state-idle .head-group {
              animation: idleHead ${idleDuration}s ease-in-out infinite;
              transform-origin: 100px 70px;
            }
            .state-idle .arm-left {
              animation: idleArmLeft ${idleDuration}s ease-in-out infinite;
              transform-origin: 72px 95px;
            }
            .state-idle .arm-right {
              animation: idleArmRight ${idleDuration}s ease-in-out infinite;
              transform-origin: 128px 95px;
            }
            .state-idle .ground-shadow {
              animation: shadowBreath ${idleDuration}s ease-in-out infinite;
              transform-origin: 100px 225px;
            }

            @keyframes idleBob {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes idleHead {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(1.5deg); }
            }
            @keyframes idleArmLeft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes idleArmRight {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-3deg); }
            }
            @keyframes shadowBreath {
              0%, 100% { transform: scaleX(1); opacity: 0.35; }
              50% { transform: scaleX(0.92); opacity: 0.25; }
            }

            /* --- RUNNING ANIMATION --- */
            .state-running .player-body {
              animation: runBodyBob ${runDuration}s ease-in-out infinite;
              transform-origin: 100px 180px;
            }
            .state-running .leg-left {
              animation: runLegLeft ${runDuration}s ease-in-out infinite;
              transform-origin: 86px 146px;
            }
            .state-running .leg-right {
              animation: runLegRight ${runDuration}s ease-in-out infinite;
              transform-origin: 114px 146px;
            }
            .state-running .arm-left {
              animation: runArmLeft ${runDuration}s ease-in-out infinite;
              transform-origin: 72px 95px;
            }
            .state-running .arm-right {
              animation: runArmRight ${runDuration}s ease-in-out infinite;
              transform-origin: 128px 95px;
            }
            .state-running .ground-shadow {
              animation: runShadow ${runDuration}s ease-in-out infinite;
              transform-origin: 100px 225px;
            }

            @keyframes runBodyBob {
              0%, 100% { transform: translateY(0) rotate(8deg); }
              25% { transform: translateY(-8px) rotate(10deg); }
              50% { transform: translateY(0) rotate(8deg); }
              75% { transform: translateY(-8px) rotate(10deg); }
            }
            @keyframes runLegLeft {
              0% { transform: rotate(35deg); }
              50% { transform: rotate(-40deg); }
              100% { transform: rotate(35deg); }
            }
            @keyframes runLegRight {
              0% { transform: rotate(-40deg); }
              50% { transform: rotate(35deg); }
              100% { transform: rotate(-40deg); }
            }
            @keyframes runArmLeft {
              0% { transform: rotate(-45deg); }
              50% { transform: rotate(45deg); }
              100% { transform: rotate(-45deg); }
            }
            @keyframes runArmRight {
              0% { transform: rotate(45deg); }
              50% { transform: rotate(-45deg); }
              100% { transform: rotate(45deg); }
            }
            @keyframes runShadow {
              0%, 50%, 100% { transform: scaleX(1); opacity: 0.35; }
              25%, 75% { transform: scaleX(0.85); opacity: 0.2; }
            }

            /* --- KICKING ANIMATION --- */
            .state-kicking .player-body {
              animation: kickBody ${kickDuration}s ease-in-out infinite;
              transform-origin: 100px 180px;
            }
            .state-kicking .leg-right {
              animation: kickLegRight ${kickDuration}s ease-in-out infinite;
              transform-origin: 114px 146px;
            }
            .state-kicking .leg-left {
              animation: kickLegLeft ${kickDuration}s ease-in-out infinite;
              transform-origin: 86px 146px;
            }
            .state-kicking .arm-left {
              animation: kickArmLeft ${kickDuration}s ease-in-out infinite;
              transform-origin: 72px 95px;
            }
            .state-kicking .arm-right {
              animation: kickArmRight ${kickDuration}s ease-in-out infinite;
              transform-origin: 128px 95px;
            }
            .state-kicking .soccer-ball {
              animation: kickBall ${kickDuration}s ease-in-out infinite;
              transform-origin: 140px 210px;
            }

            @keyframes kickBody {
              0% { transform: translateY(0) rotate(0deg); }
              25% { transform: translateY(-3px) rotate(-6deg); }
              45% { transform: translateY(-6px) rotate(10deg); }
              70% { transform: translateY(0) rotate(2deg); }
              100% { transform: translateY(0) rotate(0deg); }
            }
            @keyframes kickLegRight {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(-45deg); }
              45% { transform: rotate(60deg); }
              70% { transform: rotate(15deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes kickLegLeft {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(6deg); }
              45% { transform: rotate(-8deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes kickArmLeft {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(45deg); }
              45% { transform: rotate(-55deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes kickArmRight {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(-40deg); }
              45% { transform: rotate(50deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes kickBall {
              0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
              25% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
              44% { transform: translate(5px, 0) scale(1.05) rotate(15deg); opacity: 1; }
              60% { transform: translate(45px, -35px) scale(0.95) rotate(180deg); opacity: 1; }
              85% { transform: translate(75px, -60px) scale(0.8) rotate(360deg); opacity: 0; }
              90% { transform: translate(0, 0) scale(0); opacity: 0; }
              100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            }

            /* --- CELEBRATING ANIMATION --- */
            .state-celebrating .player-body {
              animation: celebrateJump ${celebrateDuration}s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
              transform-origin: 100px 200px;
            }
            .state-celebrating .arm-left {
              animation: celebrateArmLeft ${celebrateDuration}s ease-in-out infinite;
              transform-origin: 72px 95px;
            }
            .state-celebrating .arm-right {
              animation: celebrateArmRight ${celebrateDuration}s ease-in-out infinite;
              transform-origin: 128px 95px;
            }
            .state-celebrating .leg-left {
              animation: celebrateLegLeft ${celebrateDuration}s ease-in-out infinite;
              transform-origin: 86px 146px;
            }
            .state-celebrating .leg-right {
              animation: celebrateLegRight ${celebrateDuration}s ease-in-out infinite;
              transform-origin: 114px 146px;
            }
            .state-celebrating .ground-shadow {
              animation: celebrateShadow ${celebrateDuration}s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
              transform-origin: 100px 225px;
            }

            @keyframes celebrateJump {
              0%, 100% { transform: translateY(0); }
              45% { transform: translateY(-24px); }
              70% { transform: translateY(-4px); }
            }
            @keyframes celebrateArmLeft {
              0%, 100% { transform: rotate(-135deg); }
              50% { transform: rotate(-155deg); }
            }
            @keyframes celebrateArmRight {
              0%, 100% { transform: rotate(135deg); }
              50% { transform: rotate(155deg); }
            }
            @keyframes celebrateLegLeft {
              0%, 100% { transform: rotate(-5deg); }
              45% { transform: rotate(-18deg); }
            }
            @keyframes celebrateLegRight {
              0%, 100% { transform: rotate(5deg); }
              45% { transform: rotate(18deg); }
            }
            @keyframes celebrateShadow {
              0%, 100% { transform: scaleX(1); opacity: 0.35; }
              45% { transform: scaleX(0.55); opacity: 0.12; }
            }

            /* --- FALLING ANIMATION --- */
            .state-falling .player-body {
              animation: fallTumble ${fallDuration}s ease-in-out infinite;
              transform-origin: 100px 190px;
            }
            .state-falling .arm-left {
              animation: fallArmLeft ${fallDuration}s ease-in-out infinite;
              transform-origin: 72px 95px;
            }
            .state-falling .arm-right {
              animation: fallArmRight ${fallDuration}s ease-in-out infinite;
              transform-origin: 128px 95px;
            }
            .state-falling .leg-left {
              animation: fallLegLeft ${fallDuration}s ease-in-out infinite;
              transform-origin: 86px 146px;
            }
            .state-falling .leg-right {
              animation: fallLegRight ${fallDuration}s ease-in-out infinite;
              transform-origin: 114px 146px;
            }
            .state-falling .dizzy-stars {
              animation: dizzySpin 1.2s linear infinite;
              transform-origin: 100px 35px;
            }

            @keyframes fallTumble {
              0% { transform: translateY(0) rotate(0deg); }
              20% { transform: translateY(-8px) rotate(-15deg); }
              40% { transform: translateY(12px) rotate(-65deg); }
              70% { transform: translateY(18px) rotate(-85deg); }
              90% { transform: translateY(18px) rotate(-85deg); opacity: 1; }
              100% { transform: translateY(0) rotate(0deg); opacity: 1; }
            }
            @keyframes fallArmLeft {
              0% { transform: rotate(0deg); }
              30% { transform: rotate(-85deg); }
              50% { transform: rotate(-110deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes fallArmRight {
              0% { transform: rotate(0deg); }
              30% { transform: rotate(85deg); }
              50% { transform: rotate(110deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes fallLegLeft {
              0% { transform: rotate(0deg); }
              40% { transform: rotate(45deg); }
              70% { transform: rotate(60deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes fallLegRight {
              0% { transform: rotate(0deg); }
              40% { transform: rotate(25deg); }
              70% { transform: rotate(40deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes dizzySpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </defs>

        {/* Root Group with Animation State Class */}
        <g className={`state-${animationState}`}>
          {/* Ground Oval Shadow */}
          <ellipse
            cx="100"
            cy="226"
            rx="32"
            ry="7"
            fill="#000000"
            className="ground-shadow"
            opacity="0.35"
          />

          {/* MAIN PLAYER BODY GROUP */}
          <g className="player-body" filter="url(#cartoonShadow)">
            
            {/* === LEGS === */}
            {/* LEFT LEG (Back / Standing leg) */}
            <g className="leg-left">
              {/* Thigh (Shorts) */}
              <path
                d="M 80 144 L 88 144 L 86 170 L 78 170 Z"
                fill={fullKit.shortsColor}
              />
              {/* Knee / Shin (Sock with Trim) */}
              <rect x="77" y="170" width="10" height="34" rx="3" fill={fullKit.socksPrimary} />
              <rect x="77" y="170" width="10" height="6" rx="2" fill={fullKit.socksTrim} />
              {/* Football Cleat / Boot */}
              <path
                d="M 75 204 L 92 204 C 95 204 96 214 96 216 L 71 216 C 71 210 73 204 75 204 Z"
                fill={fullKit.bootsColor}
              />
              {/* Boot Studs & Laces */}
              <rect x="74" y="216" width="3" height="3" fill="#ffffff" />
              <rect x="88" y="216" width="3" height="3" fill="#ffffff" />
              <path d="M 80 206 L 86 210 M 80 210 L 86 206" stroke={fullKit.bootsLaces} strokeWidth="1" />
            </g>

            {/* RIGHT LEG (Front / Kicking leg) */}
            <g className="leg-right">
              {/* Thigh (Shorts) */}
              <path
                d="M 112 144 L 120 144 L 122 170 L 114 170 Z"
                fill={fullKit.shortsColor}
              />
              {/* Knee / Shin (Sock with Trim) */}
              <rect x="113" y="170" width="10" height="34" rx="3" fill={fullKit.socksPrimary} />
              <rect x="113" y="170" width="10" height="6" rx="2" fill={fullKit.socksTrim} />
              {/* Football Cleat / Boot */}
              <path
                d="M 111 204 L 128 204 C 131 204 132 214 132 216 L 107 216 C 107 210 109 204 111 204 Z"
                fill={fullKit.bootsColor}
              />
              {/* Boot Studs & Laces */}
              <rect x="110" y="216" width="3" height="3" fill="#ffffff" />
              <rect x="124" y="216" width="3" height="3" fill="#ffffff" />
              <path d="M 116 206 L 122 210 M 116 210 L 122 206" stroke={fullKit.bootsLaces} strokeWidth="1" />
            </g>

            {/* === TORSO & SHIRT === */}
            <g className="torso-group">
              {/* Jersey Body: Striped pattern or Solid Primary */}
              <path
                d="M 74 94 Q 100 90 126 94 L 122 146 L 78 146 Z"
                fill={fullKit.jerseyStriped ? `url(#${patternId})` : fullKit.jerseyPrimary}
                stroke={fullKit.jerseyPrimary}
                strokeWidth="1.5"
              />

              {/* Jersey Collar (V-Neck Trim) */}
              <path
                d="M 88 92 Q 100 102 112 92 L 108 90 Q 100 98 92 90 Z"
                fill={fullKit.jerseySecondary || '#ffffff'}
              />

              {/* Shorts Waistband & Base */}
              <path
                d="M 76 142 L 124 142 L 122 152 L 78 152 Z"
                fill={fullKit.shortsColor}
              />
              <path
                d="M 78 148 L 122 148 L 120 156 L 80 156 Z"
                fill={fullKit.shortsColor}
              />

              {/* Jersey Number Badge on Chest */}
              <g transform="translate(100, 122)">
                <circle cx="0" cy="0" r="14" fill="#0f172a" opacity="0.85" />
                <circle cx="0" cy="0" r="13" fill="none" stroke={fullKit.jerseySecondary || '#facc15'} strokeWidth="1.2" />
                <text
                  x="0"
                  y="4.5"
                  textAnchor="middle"
                  fill={fullKit.numberColor || '#ffffff'}
                  fontSize={fullKit.jerseyNumber > 9 ? '12' : '13.5'}
                  fontWeight="900"
                  fontFamily="'Outfit', sans-serif"
                >
                  {fullKit.jerseyNumber}
                </text>
              </g>

              {/* Captain / Pro Armband on Left Sleeve */}
              <rect
                x="67"
                y="106"
                width="9"
                height="7"
                rx="1.5"
                fill={fullKit.jerseyNumber === 10 ? '#facc15' : '#0f172a'}
                stroke="#ffffff"
                strokeWidth="0.8"
              />
              <text
                x="71.5"
                y="112"
                textAnchor="middle"
                fill={fullKit.jerseyNumber === 10 ? '#0f172a' : '#ffffff'}
                fontSize="5.5"
                fontWeight="900"
              >
                {fullKit.jerseyNumber === 10 ? 'C' : '★'}
              </text>
            </g>

            {/* === ARMS & HANDS / GLOVES === */}
            {/* LEFT ARM */}
            <g className="arm-left">
              {/* Sleeve */}
              <path d="M 75 94 L 64 104 L 70 110 L 78 98 Z" fill={fullKit.jerseyPrimary} />
              {/* Forearm */}
              <path d="M 66 106 L 56 126 C 54 130 62 134 64 128 L 71 110 Z" fill={fullKit.skinTone} />

              {/* Marcus Sterling Goalkeeper Gloves vs Standard Hand */}
              {fullKit.isGoalkeeper || fullKit.jerseyNumber === 1 ? (
                <g>
                  {/* Neon Green / Black Padded Goalie Glove */}
                  <rect x="50" y="122" width="16" height="15" rx="4" fill="#22c55e" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x="52" y="120" width="12" height="4" rx="1.5" fill="#15803d" />
                  <path d="M 52 127 L 64 127 M 52 131 L 64 131" stroke="#0f172a" strokeWidth="1.2" />
                </g>
              ) : (
                <circle cx="58" cy="130" r="6" fill={fullKit.skinTone} />
              )}
            </g>

            {/* RIGHT ARM */}
            <g className="arm-right">
              {/* Sleeve */}
              <path d="M 125 94 L 136 104 L 130 110 L 122 98 Z" fill={fullKit.jerseyPrimary} />
              {/* Forearm */}
              <path d="M 134 106 L 144 126 C 146 130 138 134 136 128 L 129 110 Z" fill={fullKit.skinTone} />

              {/* Marcus Sterling Goalkeeper Gloves vs Standard Hand */}
              {fullKit.isGoalkeeper || fullKit.jerseyNumber === 1 ? (
                <g>
                  {/* Neon Green / Black Padded Goalie Glove */}
                  <rect x="134" y="122" width="16" height="15" rx="4" fill="#22c55e" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x="136" y="120" width="12" height="4" rx="1.5" fill="#15803d" />
                  <path d="M 136 127 L 148 127 M 136 131 L 148 131" stroke="#0f172a" strokeWidth="1.2" />
                </g>
              ) : (
                <circle cx="142" cy="130" r="6" fill={fullKit.skinTone} />
              )}
            </g>

            {/* === HEAD, FACE & UNIQUE HAIRSTYLE === */}
            <g className="head-group">
              {/* Neck */}
              <rect x="94" y="84" width="12" height="12" fill={fullKit.skinTone} />

              {/* Face Contour */}
              <ellipse cx="100" cy="62" rx="20" ry="22" fill={fullKit.skinTone} />

              {/* Ears */}
              <circle cx="79" cy="63" r="5" fill={fullKit.skinTone} />
              <circle cx="121" cy="63" r="5" fill={fullKit.skinTone} />

              {/* Individual Earring Accents */}
              {fullKit.hairStyle === 'spiky' && (
                <circle cx="78" cy="66" r="1.5" fill="#facc15" />
              )}
              {fullKit.hairStyle === 'braids' && (
                <circle cx="78" cy="66" r="1.5" fill="#f59e0b" />
              )}

              {/* Eyes & Eyebrows */}
              {animationState === 'falling' ? (
                // Surprised dizzy eyes
                <g>
                  <text x="92" y="62" fontSize="11" textAnchor="middle" fill="#0f172a" fontWeight="900">
                    ✕
                  </text>
                  <text x="108" y="62" fontSize="11" textAnchor="middle" fill="#0f172a" fontWeight="900">
                    ✕
                  </text>
                </g>
              ) : animationState === 'celebrating' ? (
                // Joyful closed squint happy eyes
                <g>
                  <path d="M 87 59 Q 92 53 97 59" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 103 59 Q 108 53 113 59" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              ) : (
                // Bright, confident cartoon eyes
                <g>
                  {/* Left Eye */}
                  <ellipse cx="92" cy="58" rx="3.5" ry="4.5" fill="#0f172a" />
                  <circle cx="93.5" cy="56.5" r="1.5" fill="#ffffff" />
                  {/* Right Eye */}
                  <ellipse cx="108" cy="58" rx="3.5" ry="4.5" fill="#0f172a" />
                  <circle cx="109.5" cy="56.5" r="1.5" fill="#ffffff" />
                  {/* Eyebrows */}
                  <path d="M 87 51 Q 92 48 97 51" fill="none" stroke={fullKit.hairColor} strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 103 51 Q 108 48 113 51" fill="none" stroke={fullKit.hairColor} strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* Cheerful Rosy Cheeks */}
              <ellipse cx="86" cy="65" rx="3.5" ry="2" fill="#fb7185" opacity="0.6" />
              <ellipse cx="114" cy="65" rx="3.5" ry="2" fill="#fb7185" opacity="0.6" />

              {/* Nose */}
              <path d="M 100 58 Q 102 63 99 64" fill="none" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />

              {/* Mouth */}
              {animationState === 'celebrating' ? (
                // Big open cheering smile
                <g>
                  <path d="M 91 67 Q 100 81 109 67 Z" fill="#b91c1c" />
                  <path d="M 93 68 Q 100 73 107 68" fill="#ffffff" />
                </g>
              ) : animationState === 'falling' ? (
                // Surprised "O" mouth
                <ellipse cx="100" cy="71" rx="4" ry="5.5" fill="#0f172a" />
              ) : (
                // Friendly warm smiling mouth
                <g>
                  <path d="M 92 68 Q 100 77 108 68" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 93 69 Q 100 74 107 69" fill="#ffffff" opacity="0.9" />
                </g>
              )}

              {/* === INDIVIDUAL HAIRSTYLES FOR ALL 8 FOOTBALLERS === */}

              {/* 1. LEO CRUZ - Spiky Hair */}
              {fullKit.hairStyle === 'spiky' && (
                <g className="hair-spiky">
                  <path
                    d="
                      M 80 58
                      C 74 46, 78 35, 86 32
                      C 88 24, 98 18, 108 22
                      C 116 16, 126 22, 128 30
                      C 134 36, 132 48, 124 56
                      C 126 50, 122 42, 118 42
                      C 114 36, 106 36, 102 41
                      C 98 34, 88 38, 86 46
                      C 82 50, 80 54, 80 58 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  <path
                    d="
                      M 83 44 Q 90 28 97 40
                      M 95 36 Q 104 22 110 38
                      M 108 34 Q 118 24 122 42
                      M 119 40 Q 128 35 125 48
                    "
                    fill="none"
                    stroke={fullKit.hairColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path d="M 95 28 Q 104 24 112 28" fill="none" stroke="#9a5b32" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* 2. MARCUS STERLING - Athletic Fade Cut */}
              {fullKit.hairStyle === 'fade' && (
                <g className="hair-fade">
                  {/* Tapered side fade */}
                  <path
                    d="
                      M 78 60
                      C 77 48, 82 38, 92 34
                      C 96 32, 104 32, 108 34
                      C 118 38, 123 48, 122 60
                      C 120 54, 114 46, 106 46
                      C 102 46, 98 46, 94 46
                      C 86 46, 80 54, 78 60 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Clean shaped hairline */}
                  <rect x="85" y="34" width="30" height="15" rx="5" fill={fullKit.hairColor} />
                  <path d="M 87 49 L 113 49" stroke={fullKit.hairColor} strokeWidth="3" strokeLinecap="square" />
                </g>
              )}

              {/* 3. KAI NORDSTROM - Blond Undercut */}
              {fullKit.hairStyle === 'undercut' && (
                <g className="hair-undercut">
                  {/* Shaved darker sides */}
                  <path d="M 78 56 C 78 44, 84 38, 88 38 L 88 54 Z" fill="#78350f" />
                  <path d="M 122 56 C 122 44, 116 38, 112 38 L 112 54 Z" fill="#78350f" />
                  {/* Flowing golden top crest */}
                  <path
                    d="
                      M 82 46
                      C 80 32, 90 20, 104 18
                      C 114 16, 126 22, 130 32
                      C 132 40, 128 48, 118 44
                      C 112 40, 106 32, 96 34
                      C 90 36, 86 42, 82 46 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Swept hair highlights */}
                  <path d="M 94 24 Q 110 22 124 30" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 98 28 Q 112 26 122 36" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              )}

              {/* 4. DIEGO MORALES - Wavy Brunette Hair */}
              {fullKit.hairStyle === 'wavy' && (
                <g className="hair-wavy">
                  <path
                    d="
                      M 78 58
                      C 74 44, 82 30, 94 26
                      C 104 22, 116 24, 124 32
                      C 130 40, 128 54, 122 58
                      C 120 48, 112 40, 104 42
                      C 98 44, 94 48, 90 44
                      C 84 46, 80 52, 78 58 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Wavy locks framing forehead */}
                  <path d="M 86 42 Q 94 36 100 44" fill="none" stroke={fullKit.hairColor} strokeWidth="5" strokeLinecap="round" />
                  <path d="M 98 42 Q 106 36 114 44" fill="none" stroke={fullKit.hairColor} strokeWidth="5" strokeLinecap="round" />
                  <path d="M 96 30 Q 108 28 118 34" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {/* 5. MAYA TANAKA - Sleek Bob & Electric Cyan Headband */}
              {fullKit.hairStyle === 'bob' && (
                <g className="hair-bob">
                  {/* Back bob silhouette */}
                  <path
                    d="
                      M 76 66
                      C 72 50, 78 32, 92 26
                      C 100 22, 110 24, 122 30
                      C 130 36, 134 50, 124 66
                      C 126 50, 120 42, 116 42
                      C 110 42, 106 44, 100 44
                      C 94 44, 90 42, 84 42
                      C 80 42, 74 50, 76 66 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Straight sleek bangs */}
                  <rect x="84" y="40" width="32" height="10" rx="3" fill={fullKit.hairColor} />
                  {/* Electric Cyan Sports Headband */}
                  <rect
                    x="82"
                    y="42"
                    width="36"
                    height="5"
                    rx="2"
                    fill={fullKit.headbandColor || '#06b6d4'}
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                  {/* Bob fringe gloss shine */}
                  <path d="M 86 32 Q 100 26 114 32" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {/* 6. SOFIA SILVA - Voluminous Curls & Gold Headband */}
              {fullKit.hairStyle === 'curly' && (
                <g className="hair-curly">
                  {/* High curly ponytail cascade */}
                  <circle cx="100" cy="22" r="14" fill={fullKit.hairColor} />
                  <circle cx="90" cy="24" r="10" fill={fullKit.hairColor} />
                  <circle cx="110" cy="24" r="10" fill={fullKit.hairColor} />
                  {/* Voluminous side curls */}
                  <circle cx="76" cy="48" r="8" fill={fullKit.hairColor} />
                  <circle cx="78" cy="58" r="7" fill={fullKit.hairColor} />
                  <circle cx="124" cy="48" r="8" fill={fullKit.hairColor} />
                  <circle cx="122" cy="58" r="7" fill={fullKit.hairColor} />
                  {/* Main hair body */}
                  <path
                    d="
                      M 78 54
                      C 74 38, 84 26, 100 26
                      C 116 26, 126 38, 122 54
                      C 118 44, 110 40, 100 40
                      C 90 40, 82 44, 78 54 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Gold Metallic Headband */}
                  <path
                    d="M 80 44 Q 100 38 120 44"
                    fill="none"
                    stroke={fullKit.headbandColor || '#facc15'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* 7. AMARA OKONJO - Braided Cornrows & Ponytail */}
              {fullKit.hairStyle === 'braids' && (
                <g className="hair-braids">
                  {/* Scalp base */}
                  <path
                    d="
                      M 78 58
                      C 76 44, 82 32, 94 28
                      C 102 26, 110 26, 118 30
                      C 124 36, 126 48, 122 58
                      C 118 48, 112 42, 100 42
                      C 88 42, 82 48, 78 58 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Individual neat cornrow braid lines */}
                  <path d="M 85 46 Q 92 32 98 26" fill="none" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 92 46 Q 96 32 100 26" fill="none" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 100 46 Q 100 32 102 26" fill="none" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 108 46 Q 104 32 104 26" fill="none" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 115 46 Q 108 32 106 26" fill="none" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* High tied braided top knot */}
                  <circle cx="102" cy="22" r="9" fill={fullKit.hairColor} />
                  {/* Vibrant Orange Hair Tie */}
                  <rect x="97" y="24" width="10" height="4" rx="2" fill={fullKit.headbandColor || '#f97316'} />
                </g>
              )}

              {/* 8. CHLOE LAURENT - Double Afro Puff Buns */}
              {fullKit.hairStyle === 'puff' && (
                <g className="hair-puff">
                  {/* Left Puff Bun */}
                  <circle cx="78" cy="28" r="14" fill={fullKit.hairColor} />
                  {/* Left Pink Scrunchie */}
                  <ellipse cx="85" cy="36" rx="4" ry="2.5" fill={fullKit.headbandColor || '#ec4899'} />

                  {/* Right Puff Bun */}
                  <circle cx="122" cy="28" r="14" fill={fullKit.hairColor} />
                  {/* Right Pink Scrunchie */}
                  <ellipse cx="115" cy="36" rx="4" ry="2.5" fill={fullKit.headbandColor || '#ec4899'} />

                  {/* Center crown base */}
                  <path
                    d="
                      M 82 56
                      C 80 42, 86 36, 100 36
                      C 114 36, 120 42, 118 56
                      C 116 48, 110 44, 100 44
                      C 90 44, 84 48, 82 56 Z
                    "
                    fill={fullKit.hairColor}
                  />
                  {/* Styled baby hair waves along temples */}
                  <path d="M 84 48 Q 88 44 94 48" fill="none" stroke={fullKit.hairColor} strokeWidth="2" />
                  <path d="M 116 48 Q 112 44 106 48" fill="none" stroke={fullKit.hairColor} strokeWidth="2" />
                </g>
              )}

            </g>
          </g>

          {/* === ACCESSORIES & EFFECTS PER ANIMATION STATE === */}

          {/* SOCCER BALL (Shown during Kicking or Idle if showBall=true) */}
          {(animationState === 'kicking' || (animationState === 'idle' && showBall)) && (
            <g
              className="soccer-ball"
              transform={animationState === 'idle' ? 'translate(138, 208)' : 'translate(130, 206)'}
            >
              <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
              {/* Classic Pentagons */}
              <polygon points="0,-4 3.8,-1.2 2.3,3.2 -2.3,3.2 -3.8,-1.2" fill="#0f172a" />
              <polygon points="0,-14 2,-11 -2,-11" fill="#0f172a" />
              <polygon points="12,-6 10,-3 14,0" fill="#0f172a" />
              <polygon points="9,10 7,8 11,6" fill="#0f172a" />
              <polygon points="-9,10 -7,8 -11,6" fill="#0f172a" />
              <polygon points="-12,-6 -10,-3 -14,0" fill="#0f172a" />
            </g>
          )}

          {/* CELEBRATION STARS & SPARKLES */}
          {animationState === 'celebrating' && (
            <g className="celebration-sparkles">
              <text x="50" y="55" fontSize="14" fill="#facc15">⭐</text>
              <text x="142" y="52" fontSize="14" fill="#facc15">⭐</text>
              <text x="60" y="90" fontSize="11" fill="#38bdf8">✨</text>
              <text x="135" y="88" fontSize="11" fill="#f43f5e">✨</text>
              <text x="96" y="20" fontSize="16" fill="#facc15">🏆</text>
            </g>
          )}

          {/* FALLING DIZZY STARS & CLOUD PUFF */}
          {animationState === 'falling' && (
            <g>
              <g className="dizzy-stars">
                <text x="82" y="30" fontSize="12" fill="#facc15">⭐</text>
                <text x="114" y="32" fontSize="12" fill="#facc15">⭐</text>
                <text x="100" y="20" fontSize="10" fill="#f43f5e">💫</text>
              </g>
              <ellipse cx="65" cy="220" rx="10" ry="5" fill="#ffffff" opacity="0.5" />
              <ellipse cx="135" cy="220" rx="12" ry="6" fill="#ffffff" opacity="0.5" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
