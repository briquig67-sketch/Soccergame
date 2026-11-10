import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';

interface Dice3DProps {
  value: number; // 1 to 6
  isRolling: boolean;
  disabled?: boolean;
  onRoll: () => void;
  currentPlayerName?: string;
  themeColor?: string;
}

/**
 * Animated 3D-style six-sided dice for Soccer Stars:
 * - Genuine 3D CSS perspective cube with 6 faces
 * - Accurate dice pips with embossed tactile depth
 * - Dynamic tumbling 3D keyframe physics with bouncing ground shadow
 * - "ROLL DICE" action button with active turn styling
 * - Prevents repeated rolls while disabled or rolling
 */
export const Dice3D: React.FC<Dice3DProps> = ({
  value,
  isRolling,
  disabled = false,
  onRoll,
  currentPlayerName = 'Player',
  themeColor = '#facc15',
}) => {
  // Rotations for each face:
  // Face 1: Front (0, 0)
  // Face 2: Top (-90, 0)
  // Face 3: Right (0, -90)
  // Face 4: Left (0, 90)
  // Face 5: Bottom (90, 0)
  // Face 6: Back (180, 0)
  const faceRotations: Record<number, { x: number; y: number }> = {
    1: { x: 0, y: 0 },
    2: { x: -90, y: 0 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: 90, y: 0 },
    6: { x: 180, y: 0 },
  };

  const [tumbleRot, setTumbleRot] = useState({ x: 0, y: 0, z: 0 });
  const [spinCount, setSpinCount] = useState(0);
  const isFirstRender = useRef(true);

  // When a roll starts, generate multi-revolution 3D trajectory
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isRolling) {
      soundEngine.playDiceRoll();
      // Generate extra revolutions (at least 2 full spins on each axis)
      const extraX = 720 + Math.floor(Math.random() * 2) * 360;
      const extraY = 1080 + Math.floor(Math.random() * 2) * 360;
      const extraZ = 360;
      setSpinCount((prev) => prev + 1);
      setTumbleRot({ x: extraX, y: extraY, z: extraZ });
    } else {
      soundEngine.playDiceLand();
    }
  }, [isRolling]);

  const targetRot = faceRotations[value] || faceRotations[1];

  // When rolling: large tumbling rotation; when settled: snap to resting face rotation
  const currentTransform = isRolling
    ? `rotateX(${tumbleRot.x + targetRot.x}deg) rotateY(${tumbleRot.y + targetRot.y}deg) rotateZ(${tumbleRot.z}deg)`
    : `rotateX(${targetRot.x}deg) rotateY(${targetRot.y}deg) rotateZ(0deg)`;

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Scene Viewport with Perspective */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:600px]">
        {/* Dynamic Ground Shadow below the Dice */}
        <div
          className={`absolute bottom-2 w-16 h-4 bg-black/45 rounded-full blur-[3px] transition-all duration-300 pointer-events-none ${
            isRolling ? 'scale-75 opacity-25 translate-y-3' : 'scale-100 opacity-60'
          }`}
        />

        {/* 3D Cube Container */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 relative [transform-style:preserve-3d] transition-transform"
          style={{
            transform: currentTransform,
            transitionDuration: isRolling ? '1.1s' : '0.45s',
            transitionTimingFunction: isRolling
              ? 'cubic-bezier(0.15, 0.85, 0.35, 1.1)'
              : 'cubic-bezier(0.2, 0.8, 0.4, 1.2)',
          }}
        >
          {/* FACE 1: FRONT */}
          <div
            className="dice-face dice-face-front"
            style={{ transform: 'rotateY(0deg) translateZ(32px)' }}
          >
            {/* Center Pip */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 shadow-inner flex items-center justify-center border border-red-700/60">
              <span className="text-[10px] sm:text-xs">⚽</span>
            </div>
          </div>

          {/* FACE 2: TOP */}
          <div
            className="dice-face dice-face-top"
            style={{ transform: 'rotateX(90deg) translateZ(32px)' }}
          >
            <div className="w-full h-full p-2 flex flex-col justify-between">
              <div className="flex justify-start">
                <span className="pip" />
              </div>
              <div className="flex justify-end">
                <span className="pip" />
              </div>
            </div>
          </div>

          {/* FACE 3: RIGHT */}
          <div
            className="dice-face dice-face-right"
            style={{ transform: 'rotateY(90deg) translateZ(32px)' }}
          >
            <div className="w-full h-full p-2 flex flex-col justify-between">
              <div className="flex justify-start">
                <span className="pip" />
              </div>
              <div className="flex justify-center">
                <span className="pip" />
              </div>
              <div className="flex justify-end">
                <span className="pip" />
              </div>
            </div>
          </div>

          {/* FACE 4: LEFT */}
          <div
            className="dice-face dice-face-left"
            style={{ transform: 'rotateY(-90deg) translateZ(32px)' }}
          >
            <div className="w-full h-full p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
            </div>
          </div>

          {/* FACE 5: BOTTOM */}
          <div
            className="dice-face dice-face-bottom"
            style={{ transform: 'rotateX(-90deg) translateZ(32px)' }}
          >
            <div className="w-full h-full p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
              <div className="flex justify-center">
                <span className="pip" />
              </div>
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
            </div>
          </div>

          {/* FACE 6: BACK */}
          <div
            className="dice-face dice-face-back"
            style={{ transform: 'rotateY(180deg) translateZ(32px)' }}
          >
            <div className="w-full h-full p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
              <div className="flex justify-between">
                <span className="pip" />
                <span className="pip" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROLL DICE ACTION BUTTON */}
      <button
        type="button"
        disabled={disabled || isRolling}
        onClick={onRoll}
        className={`
          mt-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-cartoon font-black text-sm sm:text-base
          shadow-[0_8px_20px_rgba(0,0,0,0.5)] border-2 transition-all flex items-center gap-2.5
          ${
            disabled || isRolling
              ? 'bg-slate-800/80 text-slate-500 border-slate-700/60 cursor-not-allowed scale-95 opacity-70'
              : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 border-white hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(250,204,21,0.55)] cursor-pointer'
          }
        `}
      >
        <span className={`text-lg sm:text-xl ${isRolling ? 'animate-spin' : ''}`}>🎲</span>
        <span>{isRolling ? 'ROLLING...' : 'ROLL DICE'}</span>
        {!isRolling && (
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-slate-900 font-bold">
            1–6
          </span>
        )}
      </button>

      {/* Embedded 3D Dice Face Styling */}
      <style>{`
        .dice-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%);
          border: 2px solid #cbd5e1;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(15, 23, 42, 0.15), 0 4px 10px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          box-sizing: border-box;
        }

        .pip {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #334155 0%, #0f172a 80%);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8), 0 1px 1px rgba(255, 255, 255, 0.8);
          display: inline-block;
        }

        @media (min-width: 640px) {
          .pip {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
};
