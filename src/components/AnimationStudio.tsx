import React, { useState, useEffect } from 'react';
import { AnimatedFootballer } from './AnimatedFootballer';
import { FootballerAnimationState } from '../types/animation';
import { CHARACTERS, CharacterData } from '../data/characters';
import { getKitForCharacter } from '../data/characterKits';
import { ASSET_IMAGES } from '../assets/images';

interface AnimationStudioProps {
  onBackToPitch: () => void;
  onGoToSelect: () => void;
}

export const AnimationStudio: React.FC<AnimationStudioProps> = ({
  onBackToPitch,
  onGoToSelect,
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>('leo');
  const [currentAnim, setCurrentAnim] = useState<FootballerAnimationState>('idle');
  const [characterSize, setCharacterSize] = useState<number>(220);
  const [facing, setFacing] = useState<'right' | 'left'>('right');
  const [speed, setSpeed] = useState<number>(1.0);
  const [showBall, setShowBall] = useState<boolean>(true);
  const [stageBg, setStageBg] = useState<'pitch' | 'transparent' | 'dark'>('pitch');
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(false);

  const activeCharacter: CharacterData =
    CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
  const activeKit = getKitForCharacter(activeCharacter.id);

  const animationsList: {
    id: FootballerAnimationState;
    label: string;
    sublabel: string;
    icon: string;
    color: string;
    description: string;
  }[] = [
    {
      id: 'idle',
      label: 'IDLE',
      sublabel: 'Natural Stance & Waiting',
      icon: '🧍',
      color: 'from-emerald-500 to-teal-600',
      description: 'Standing naturally on the pitch with rhythmic breathing, arm sway, and head micro-movements.',
    },
    {
      id: 'running',
      label: 'RUNNING',
      sublabel: 'Full Running Cycle',
      icon: '🏃',
      color: 'from-sky-500 to-blue-600',
      description: 'Realistic forward running stride with alternating arm/leg swing, forward torso lean, and pitch bob.',
    },
    {
      id: 'kicking',
      label: 'KICKING',
      sublabel: 'Power Ball Strike',
      icon: '⚽',
      color: 'from-amber-500 to-orange-600',
      description: 'Dynamic backswing wind-up, planting step, forward power strike, and ball launch physics.',
    },
    {
      id: 'celebrating',
      label: 'CELEBRATING',
      sublabel: 'Goal Joy & Cheering',
      icon: '🏆',
      color: 'from-yellow-400 to-amber-500',
      description: 'Both arms triumphantly raised in the air, high joyful jumps, celebration stars, and happy cheering smile.',
    },
    {
      id: 'falling',
      label: 'FALLING',
      sublabel: 'Cartoon Stumble & Foul',
      icon: '💫',
      color: 'from-rose-500 to-red-600',
      description: 'Cartoon-style backwards slip, legs kicked high, comic "X" eyes, impact dust puff, and spinning dizzy stars.',
    },
  ];

  // Auto-Cycle all 5 animations sequentially
  useEffect(() => {
    if (!isAutoCycling) return;
    const animOrder: FootballerAnimationState[] = ['idle', 'running', 'kicking', 'celebrating', 'falling'];
    let idx = animOrder.indexOf(currentAnim);

    const interval = setInterval(() => {
      idx = (idx + 1) % animOrder.length;
      setCurrentAnim(animOrder[idx]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isAutoCycling, currentAnim]);

  const handlePrevCharacter = () => {
    const currIdx = CHARACTERS.findIndex((c) => c.id === selectedCharId);
    const nextIdx = (currIdx - 1 + CHARACTERS.length) % CHARACTERS.length;
    setSelectedCharId(CHARACTERS[nextIdx].id);
  };

  const handleNextCharacter = () => {
    const currIdx = CHARACTERS.findIndex((c) => c.id === selectedCharId);
    const nextIdx = (currIdx + 1) % CHARACTERS.length;
    setSelectedCharId(CHARACTERS[nextIdx].id);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none px-2 sm:px-4 py-2">
      {/* Stadium Frame */}
      <div className="relative rounded-3xl p-3 sm:p-5 md:p-6 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_3px_#334155,0_0_0_8px_#1e293b] border border-slate-700/80">
        
        {/* Top Header Banner */}
        <div className="relative mb-3 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-inner">
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            <img
              src={ASSET_IMAGES.stadiumCrowd}
              alt="Stadium Crowd"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-center justify-between px-3 sm:px-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded border border-amber-400/40">
                  ANIMATION STUDIO · 8 FOOTBALLERS
                </span>
                <h2 className="text-xl sm:text-3xl font-black font-cartoon text-white drop-shadow tracking-wide mt-0.5">
                  SOCCER STARS ANIMATION ARENA
                </h2>
              </div>

              {/* Active Character Spotlight */}
              <div className="flex items-center gap-2 bg-slate-950/85 p-1.5 rounded-xl border border-slate-700 shadow-md">
                <img
                  src={activeCharacter.portrait}
                  alt={activeCharacter.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 shadow"
                  style={{ borderColor: activeCharacter.theme.accentHex }}
                />
                <div className="text-left text-xs pr-2 hidden sm:block">
                  <div className="font-cartoon font-bold text-white leading-tight">
                    {activeCharacter.name}
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono">
                    #{activeCharacter.number} {activeCharacter.position}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LED Ticker */}
          <div className="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white py-1 px-4 flex items-center justify-between text-[10px] sm:text-xs font-cartoon tracking-wider uppercase border-t border-b border-black/40">
            <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap overflow-hidden animate-pulse">
              <span>★ 8 DISTINCT FOOTBALLERS FULLY ANIMATED ★</span>
              <span>⚡ 5 CSS KEYFRAME STATES: IDLE · RUNNING · KICKING · CELEBRATING · FALLING ⚡</span>
              <span>⚽ 100% LIGHTWEIGHT 2D VECTOR SVG · FULLY OFFLINE ⚽</span>
            </div>
          </div>
        </div>

        {/* 8-CHARACTER ROSTER SELECTOR BAR */}
        <div className="mb-4 bg-slate-950/90 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 shadow-md">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] sm:text-xs font-cartoon font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>👥</span>
              <span>Select Footballer to Animate (8 Characters):</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevCharacter}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                title="Previous character"
              >
                ◀ Prev
              </button>
              <button
                type="button"
                onClick={handleNextCharacter}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                title="Next character"
              >
                Next ▶
              </button>
            </div>
          </div>

          {/* 8 Character Cards Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {CHARACTERS.map((char) => {
              const isSelected = char.id === selectedCharId;

              return (
                <button
                  key={`roster-${char.id}`}
                  type="button"
                  onClick={() => setSelectedCharId(char.id)}
                  className={`
                    relative rounded-xl p-1 sm:p-1.5 flex flex-col items-center justify-between transition-all duration-200 border cursor-pointer
                    ${
                      isSelected
                        ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(250,204,21,0.4)] scale-105'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                    }
                  `}
                >
                  <div className="relative mb-1">
                    <img
                      src={char.portrait}
                      alt={char.name}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 ${
                        isSelected ? 'border-amber-400' : 'border-slate-600'
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded-full border border-black/40 ${char.theme.badgeBg} ${char.theme.badgeText}`}
                    >
                      #{char.number}
                    </span>
                  </div>

                  <span className="font-cartoon font-bold text-[10px] sm:text-[11px] text-white truncate max-w-full text-center leading-tight">
                    {char.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-amber-300/80 font-mono truncate max-w-full text-center leading-none mt-0.5">
                    {char.position}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN STAGE & CONTROLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* LEFT 7 COLS: THE ANIMATION STAGE ARENA */}
          <div className="lg:col-span-7 flex flex-col">
            {/* The Pitch Stage Container */}
            <div
              className={`
                relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border-4 border-slate-700/80 shadow-[inset_0_4px_24px_rgba(0,0,0,0.6)] flex items-center justify-center
                ${
                  stageBg === 'pitch'
                    ? 'bg-gradient-to-b from-emerald-800 via-emerald-700 to-green-800'
                    : stageBg === 'transparent'
                    ? 'bg-[repeating-conic-gradient(#334155_0%_25%,#1e293b_0%_50%)] [background-size:20px_20px]'
                    : 'bg-slate-950'
                }
              `}
            >
              {/* Pitch Visual Markings (when in pitch mode) */}
              {stageBg === 'pitch' && (
                <>
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_50%)] [background-size:100%_40px]" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-16 border-2 border-white/60 rounded-[100%] pointer-events-none" />
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/80 rounded-full pointer-events-none" />
                  <div className="absolute bottom-5 inset-x-4 h-1 bg-white/60 pointer-events-none" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
                </>
              )}

              {/* State Watermark in background */}
              <div className="absolute top-3 left-4 pointer-events-none flex items-center gap-2">
                <span className="font-cartoon text-xs font-black uppercase tracking-widest text-white/40 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                  {activeCharacter.name.toUpperCase()} · {currentAnim.toUpperCase()} · {speed}x SPEED
                </span>
              </div>

              {/* THE ANIMATED FOOTBALLER SVG */}
              <div className="relative z-10 transition-all duration-300">
                <AnimatedFootballer
                  key={`animated-${activeCharacter.id}-${currentAnim}`}
                  animationState={currentAnim}
                  characterId={activeCharacter.id}
                  size={characterSize}
                  facing={facing}
                  speed={speed}
                  showBall={showBall}
                />
              </div>

              {/* Stage Controls: Flip Facing & Auto-Cycle */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
                <button
                  type="button"
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-cartoon transition-all shadow cursor-pointer ${
                    isAutoCycling
                      ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                  title="Automatically cycle through all 5 animation states"
                >
                  <span>🔄 Auto-Cycle: {isAutoCycling ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFacing(facing === 'right' ? 'left' : 'right')}
                  className="px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-mono transition-colors shadow cursor-pointer"
                  title="Flip character facing direction"
                >
                  Facing: {facing === 'right' ? '➔ RIGHT' : '⬅ LEFT'}
                </button>
              </div>
            </div>

            {/* Stage Backdrop & Zoom Selector */}
            <div className="mt-2.5 p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              {/* Stage Background selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-bold text-[11px]">Backdrop:</span>
                {(['pitch', 'transparent', 'dark'] as const).map((bg) => (
                  <button
                    key={`bg-${bg}`}
                    type="button"
                    onClick={() => setStageBg(bg)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                      stageBg === bg
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              {/* Character Size Selector */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold text-[11px]">Size:</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'S (120px)', val: 120 },
                    { label: 'M (180px)', val: 180 },
                    { label: 'L (220px)', val: 220 },
                    { label: 'XL (280px)', val: 280 },
                  ].map((s) => (
                    <button
                      key={`size-${s.val}`}
                      type="button"
                      onClick={() => setCharacterSize(s.val)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        characterSize === s.val
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ball toggle */}
              <button
                type="button"
                onClick={() => setShowBall(!showBall)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                  showBall ? 'bg-slate-800 text-white border border-slate-700' : 'bg-slate-950 text-slate-500'
                }`}
              >
                <span>⚽ Ball:</span>
                <span className="font-mono text-[10px]">{showBall ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLS: 5 ANIMATION STATE BUTTONS & SPEED CONTROLS */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            
            {/* 5 Animation State Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h3 className="font-cartoon text-sm font-bold text-white tracking-wide">
                  Select Animation State:
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  5 STATES ACTIVE
                </span>
              </div>

              {animationsList.map((anim) => {
                const isSelected = currentAnim === anim.id;

                return (
                  <button
                    key={`anim-btn-${anim.id}`}
                    type="button"
                    onClick={() => {
                      setIsAutoCycling(false);
                      setCurrentAnim(anim.id);
                    }}
                    className={`
                      w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer
                      ${
                        isSelected
                          ? 'bg-slate-800/95 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)] scale-[1.02] ring-2 ring-amber-400/40'
                          : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                      }
                    `}
                  >
                    {/* Icon Badge */}
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-md shrink-0 border border-white/20
                        bg-gradient-to-br ${anim.color} text-white
                      `}
                    >
                      {anim.icon}
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-cartoon text-sm font-bold text-white">
                          {anim.label}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-black text-amber-300 font-mono bg-amber-950 px-1.5 py-0.5 rounded border border-amber-400/50">
                            PLAYING ▶
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-medium text-amber-300/90">
                        {anim.sublabel}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {anim.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Playback Speed Selector */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-bold">Playback Speed:</span>
                <span className="font-mono font-bold text-amber-300">{speed}x Multiplier</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: '0.5x Slow-Mo', val: 0.5 },
                  { label: '1.0x Normal', val: 1.0 },
                  { label: '1.5x Fast', val: 1.5 },
                ].map((sp) => (
                  <button
                    key={`sp-${sp.val}`}
                    type="button"
                    onClick={() => setSpeed(sp.val)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                      speed === sp.val
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Design Specifications Card */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] space-y-1">
              <div className="font-cartoon font-bold text-xs text-amber-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span>⚽</span>
                  <span>{activeCharacter.name} Specifications:</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  #{activeCharacter.number} {activeCharacter.position}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 text-[10px] pt-1">
                <div>• Hairstyle: <span className="text-white font-semibold capitalize">{activeKit.hairStyle}</span></div>
                <div>• Kit Colors: <span className="text-white font-semibold">{activeCharacter.uniformColor}</span></div>
                <div>• Special Move: <span className="text-amber-300 font-semibold">{activeCharacter.specialMove}</span></div>
                <div>• Gloves: <span className="text-white font-semibold">{activeKit.isGoalkeeper ? 'Goalie Padded' : 'Standard'}</span></div>
                <div className="col-span-2">• Nickname: <span className="text-yellow-300 font-black">{activeCharacter.nickname}</span></div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToPitch}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-cartoon text-sm font-bold border border-slate-600 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>🏟️</span>
            <span>RETURN TO CHAMPIONSHIP PITCH</span>
          </button>

          <div className="text-xs text-slate-400 text-center">
            All 8 Footballers animated with 5 CSS states · 100% Offline SVG Artwork
          </div>

          <button
            type="button"
            onClick={onGoToSelect}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-cartoon text-sm font-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>👥</span>
            <span>GO TO CHARACTER SELECTION</span>
          </button>
        </div>

      </div>
    </div>
  );
};
