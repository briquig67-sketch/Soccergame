import React from 'react';
import { SoccerEventAction } from '../types/game';

interface EventModalProps {
  event: SoccerEventAction | null;
  onDismiss: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onDismiss }) => {
  if (!event) return null;

  const isBoost = event.delta > 0;

  // Thematic colors per event type
  const themeMap: Record<
    string,
    { border: string; bgGlow: string; badge: string; badgeText: string; icon: string }
  > = {
    sprint: {
      border: 'border-sky-400',
      bgGlow: 'from-sky-500/20 via-blue-600/30 to-indigo-900/40',
      badge: 'bg-sky-400 text-slate-950',
      badgeText: 'SPRINT BOOST',
      icon: '⚡',
    },
    penalty: {
      border: 'border-purple-400',
      bgGlow: 'from-purple-500/20 via-fuchsia-600/30 to-violet-900/40',
      badge: 'bg-purple-400 text-slate-950',
      badgeText: 'GOAL CHANCE',
      icon: '🎯',
    },
    save: {
      border: 'border-teal-400',
      bgGlow: 'from-teal-500/20 via-emerald-600/30 to-cyan-900/40',
      badge: 'bg-teal-300 text-slate-950',
      badgeText: 'SUPER SAVE',
      icon: '🧤',
    },
    yellow_card: {
      border: 'border-amber-400',
      bgGlow: 'from-amber-500/20 via-orange-600/30 to-yellow-900/40',
      badge: 'bg-amber-400 text-slate-950',
      badgeText: 'YELLOW CARD',
      icon: '🟨',
    },
    red_card: {
      border: 'border-rose-500',
      bgGlow: 'from-rose-500/20 via-red-600/30 to-rose-950/40',
      badge: 'bg-rose-500 text-white',
      badgeText: 'RED CARD',
      icon: '🟥',
    },
  };

  const themeConfig = themeMap[event.type] || {
    border: 'border-amber-400',
    bgGlow: 'from-slate-800 to-slate-950',
    badge: 'bg-amber-400 text-slate-950',
    badgeText: 'EVENT',
    icon: '⚽',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`
          relative w-full max-w-md rounded-2xl border-4 ${themeConfig.border}
          bg-gradient-to-b ${themeConfig.bgGlow} bg-slate-950 p-5 sm:p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center flex flex-col items-center
          transform transition-all animate-scale-up
        `}
      >
        {/* Floating Top Badge */}
        <div className="absolute -top-3.5 px-3 py-1 rounded-full font-cartoon font-black text-xs uppercase tracking-wider shadow-md border border-white/40 flex items-center gap-1.5 leading-none">
          <span className={themeConfig.badge}>{themeConfig.badgeText}</span>
        </div>

        {/* Large Animated Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 border-2 border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 mt-1">
          <span>{themeConfig.icon}</span>
        </div>

        {/* Event Title */}
        <h2 className="font-cartoon font-black text-xl sm:text-2xl text-white tracking-wide">
          {event.title}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
          {event.subtitle}
        </p>

        {/* Description Message */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 my-2 w-full text-xs sm:text-sm text-slate-200 leading-relaxed">
          {event.message}
        </div>

        {/* Movement Destination Strip */}
        <div className="flex items-center justify-center gap-3 my-2 text-xs sm:text-sm font-bold">
          <span className="text-slate-400">Square {event.square}</span>
          <span className="text-white text-base">➔</span>
          <span className={`font-cartoon text-sm sm:text-base font-black ${isBoost ? 'text-emerald-300' : 'text-rose-400'}`}>
            Square {event.destination} ({isBoost ? `+${event.delta}` : `${event.delta}`})
          </span>
        </div>

        {/* Dismiss / Continue Action */}
        <button
          type="button"
          onClick={onDismiss}
          className="mt-3 px-6 py-2.5 rounded-xl font-cartoon font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-lg border border-white transition-transform active:scale-95 cursor-pointer"
        >
          CONTINUE MATCH ➔
        </button>
      </div>
    </div>
  );
};
