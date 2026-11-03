/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { SoccerBoard } from './components/SoccerBoard';
import { BoardLegend } from './components/BoardLegend';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 overflow-x-hidden relative">
      {/* Stadium Night Atmosphere Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-blue-900/10 to-transparent pointer-events-none -z-10" />
      
      {/* Floodlight Beam Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="w-full max-w-4xl flex flex-col items-center">
        {/* Title Banner */}
        <HeaderBanner />

        {/* 10x10 Soccer Board */}
        <SoccerBoard />

        {/* Board Legend & Layout Explanations */}
        <BoardLegend />
      </main>
    </div>
  );
}
