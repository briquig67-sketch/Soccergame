import React from 'react';

interface PitchMarkingsProps {
  className?: string;
  showMarkings?: boolean;
}

/**
 * Authentic soccer pitch markings rendered as an SVG overlay:
 * - Touchlines & goal lines
 * - Halfway line & center circle with center spot
 * - Top & bottom penalty areas, goal boxes, penalty spots & penalty arcs
 * - Four corner arcs with animated corner flags
 */
export const PitchMarkings: React.FC<PitchMarkingsProps> = ({
  className = '',
  showMarkings = true,
}) => {
  if (!showMarkings) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="pitchGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          {/* Subtle grass lawn stripes pattern */}
          <pattern id="lawnMowerStripes" width="1000" height="200" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1000" height="100" fill="rgba(255, 255, 255, 0.03)" />
            <rect x="0" y="100" width="1000" height="100" fill="rgba(0, 0, 0, 0.05)" />
          </pattern>
        </defs>

        {/* Grass stripe overlay */}
        <rect x="0" y="0" width="1000" height="1000" fill="url(#lawnMowerStripes)" opacity="0.75" />

        {/* Outer Field Boundary Line */}
        <rect
          x="12"
          y="12"
          width="976"
          height="976"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />

        {/* Halfway Line */}
        <line
          x1="12"
          y1="500"
          x2="988"
          y2="500"
          stroke="#ffffff"
          strokeWidth="4"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />

        {/* Center Circle & Center Spot */}
        <circle
          cx="500"
          cy="500"
          r="135"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />
        <circle
          cx="500"
          cy="500"
          r="7"
          fill="#ffffff"
          filter="url(#pitchGlow)"
        />

        {/* TOP GOAL / PENALTY AREA (Square 100 side - FINISH) */}
        {/* Penalty Box (18-yard box) */}
        <rect
          x="280"
          y="12"
          width="440"
          height="165"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />
        {/* Goal Area (6-yard box) */}
        <rect
          x="380"
          y="12"
          width="240"
          height="65"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />
        {/* Penalty Spot Top */}
        <circle
          cx="500"
          cy="115"
          r="6"
          fill="#ffffff"
          filter="url(#pitchGlow)"
        />
        {/* Penalty Arc Top */}
        <path
          d="M 430 177 A 75 75 0 0 0 570 177"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />

        {/* BOTTOM GOAL / PENALTY AREA (Square 1 side - START) */}
        {/* Penalty Box (18-yard box) */}
        <rect
          x="280"
          y="823"
          width="440"
          height="165"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />
        {/* Goal Area (6-yard box) */}
        <rect
          x="380"
          y="923"
          width="240"
          height="65"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />
        {/* Penalty Spot Bottom */}
        <circle
          cx="500"
          cy="885"
          r="6"
          fill="#ffffff"
          filter="url(#pitchGlow)"
        />
        {/* Penalty Arc Bottom */}
        <path
          d="M 430 823 A 75 75 0 0 1 570 823"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
          filter="url(#pitchGlow)"
        />

        {/* Corner Arcs */}
        {/* Top-Left Corner Arc */}
        <path
          d="M 12 55 A 43 43 0 0 0 55 12"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
        />
        {/* Top-Right Corner Arc */}
        <path
          d="M 945 12 A 43 43 0 0 0 988 55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
        />
        {/* Bottom-Left Corner Arc */}
        <path
          d="M 12 945 A 43 43 0 0 1 55 988"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
        />
        {/* Bottom-Right Corner Arc */}
        <path
          d="M 945 988 A 43 43 0 0 1 988 945"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.85"
        />
      </svg>
    </div>
  );
};
