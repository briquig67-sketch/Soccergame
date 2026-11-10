import { SoccerEventAction } from '../types/game';

/**
 * Complete soccer events definition for all 24 event squares in the 100-square pitch.
 *
 * SPRINT (Ladders / Fast Break):
 * - Advance player forward down the wing
 *
 * GOAL CHANCE (Ladders / Penalty):
 * - Significant offensive boost forward
 *
 * SUPER SAVE (Ladders / Goalkeeping):
 * - Long clearance forward
 *
 * YELLOW CARD (Snakes / Tactical Foul):
 * - Caution with moderate retreat back
 *
 * RED CARD (Snakes / Offside Hazard):
 * - Severe pitch setback
 */
export const SOCCER_EVENT_ACTIONS: Record<number, SoccerEventAction> = {
  // === SPRINT BOOST SQUARES (LADDERS) ===
  6: {
    square: 6,
    type: 'sprint',
    title: '⚡ Fast Break Sprint!',
    subtitle: 'Winger Outpaces Defenders',
    message: 'Blistering acceleration down the right wing! Sprint forward 11 squares to Square 17!',
    delta: 11,
    destination: 17,
    soundType: 'sprint',
  },
  22: {
    square: 22,
    type: 'sprint',
    title: '⚡ Through-Ball Attack!',
    subtitle: 'Precision Playmaking',
    message: 'A pinpoint through-ball splits the defensive line! Surge forward 17 squares to Square 39!',
    delta: 17,
    destination: 39,
    soundType: 'sprint',
  },
  38: {
    square: 38,
    type: 'sprint',
    title: '⚡ Wing Overlap Counter!',
    subtitle: 'Overlapping Fullback Rush',
    message: 'Rapid counter-attack catches the opposition out of position! Sprint 18 squares to Square 56!',
    delta: 18,
    destination: 56,
    soundType: 'sprint',
  },
  54: {
    square: 54,
    type: 'sprint',
    title: '⚡ Midfield Interception!',
    subtitle: 'Turnover in the Center Circle',
    message: 'Heroic interception and immediate fast break! Sprint forward 14 squares to Square 68!',
    delta: 14,
    destination: 68,
    soundType: 'sprint',
  },
  72: {
    square: 72,
    type: 'sprint',
    title: '⚡ Box Infiltration Sprint!',
    subtitle: 'Penetrating the Penalty Box',
    message: 'Electrifying step-overs break into the 18-yard box! Dash forward 13 squares to Square 85!',
    delta: 13,
    destination: 85,
    soundType: 'sprint',
  },
  86: {
    square: 86,
    type: 'sprint',
    title: '⚡ Final Dash on Goal!',
    subtitle: 'Championship Solo Run',
    message: 'One defender left! Pure burst of speed pushes forward 8 squares to Square 94!',
    delta: 8,
    destination: 94,
    soundType: 'sprint',
  },

  // === GOAL CHANCE / PENALTY KICK SQUARES (LADDERS) ===
  30: {
    square: 30,
    type: 'penalty',
    title: '🎯 Penalty Kick Converted!',
    subtitle: 'Ice In The Veins',
    message: 'Sent the goalkeeper the wrong way! Goal! Fly forward 18 squares to Square 48!',
    delta: 18,
    destination: 48,
    soundType: 'cheer',
  },
  50: {
    square: 50,
    type: 'penalty',
    title: '🎯 Long-Range Screamer!',
    subtitle: 'Top Corner Rocket',
    message: '30-yard thunderbolt strikes the crossbar and bounces in! Advance 19 squares to Square 69!',
    delta: 19,
    destination: 69,
    soundType: 'cheer',
  },
  70: {
    square: 70,
    type: 'penalty',
    title: '🎯 Diving Header Goal!',
    subtitle: 'Clinical Corner Finish',
    message: 'Magnificent leaping header into the bottom corner! Advance 18 squares to Square 88!',
    delta: 18,
    destination: 88,
    soundType: 'cheer',
  },
  92: {
    square: 92,
    type: 'penalty',
    title: '🎯 Stoppage-Time Clutch Goal!',
    subtitle: 'Poacher Instinct',
    message: 'Right place, right time! Tap-in goal propels you 6 squares forward to Square 98!',
    delta: 6,
    destination: 98,
    soundType: 'cheer',
  },

  // === SUPER SAVE SQUARES (LADDERS) ===
  16: {
    square: 16,
    type: 'save',
    title: '🧤 Diving Fingertip Save!',
    subtitle: 'Goalkeeping Masterclass',
    message: 'Diving save pushes the ball wide, followed by a long clearance! Advance 8 squares to Square 24!',
    delta: 8,
    destination: 24,
    soundType: 'save',
  },
  44: {
    square: 44,
    type: 'save',
    title: '🧤 Spectacular Double Save!',
    subtitle: 'Unbelievable Reflexes',
    message: 'Point-blank denial on the rebound sparks a quick break! Advance 14 squares to Square 58!',
    delta: 14,
    destination: 58,
    soundType: 'save',
  },
  66: {
    square: 66,
    type: 'save',
    title: '🧤 Goalline Clearance!',
    subtitle: 'Heroic Last-Ditch Tackle',
    message: 'A goal-line sliding stop launches a swift transition! Advance 12 squares to Square 78!',
    delta: 12,
    destination: 78,
    soundType: 'save',
  },
  82: {
    square: 82,
    type: 'save',
    title: '🧤 Keeper Punch & Counter!',
    subtitle: 'Commanding The Penalty Area',
    message: 'Punch under heavy aerial pressure clears the ball deep! Advance 9 squares to Square 91!',
    delta: 9,
    destination: 91,
    soundType: 'save',
  },

  // === YELLOW CARD SQUARES (SNAKES / MINOR SETBACK) ===
  14: {
    square: 14,
    type: 'yellow_card',
    title: '🟨 Tactical Sliding Foul!',
    subtitle: 'Referee Issues Caution',
    message: 'Careless late challenge in midfield. Free kick conceded, retreat 9 squares to Square 5!',
    delta: -9,
    destination: 5,
    soundType: 'card',
  },
  34: {
    square: 34,
    type: 'yellow_card',
    title: '🟨 Shirt Pull Warning!',
    subtitle: 'Cynical Professional Foul',
    message: 'Stopped a promising attack with an obvious shirt tug. Fall back 11 squares to Square 23!',
    delta: -11,
    destination: 23,
    soundType: 'card',
  },
  57: {
    square: 57,
    type: 'yellow_card',
    title: '🟨 Dissent to Official!',
    subtitle: 'Unsporting Conduct',
    message: 'Heated argument with the referee earns a yellow card. Fall back 15 squares to Square 42!',
    delta: -15,
    destination: 42,
    soundType: 'card',
  },
  75: {
    square: 75,
    type: 'yellow_card',
    title: '🟨 Dangerous High Tackle!',
    subtitle: 'Reckless Challenge',
    message: 'Heavy collision breaks up play. Backpedal 14 squares to Square 61!',
    delta: -14,
    destination: 61,
    soundType: 'card',
  },

  // === RED CARD SQUARES (SNAKES / MAJOR SETBACK) ===
  28: {
    square: 28,
    type: 'red_card',
    title: '🟥 Direct Red Card & Penalty!',
    subtitle: 'VAR Review Overturn',
    message: 'Last-man foul confirmed by VAR! Severe setback, drop back 16 squares to Square 12!',
    delta: -16,
    destination: 12,
    soundType: 'card',
  },
  49: {
    square: 49,
    type: 'red_card',
    title: '🟥 Goal-Line Hand-ball!',
    subtitle: 'Denied Obvious Goal',
    message: 'Intentional hand-ball on the goal-line! Direct expulsion, retreat 17 squares to Square 32!',
    delta: -17,
    destination: 32,
    soundType: 'card',
  },
  79: {
    square: 79,
    type: 'red_card',
    title: '🟥 Flying Studs Challenge!',
    subtitle: 'Dangerous Play Red Card',
    message: 'Reckless studs-up challenge leaves team short-handed. Fall back 20 squares to Square 59!',
    delta: -20,
    destination: 59,
    soundType: 'card',
  },
  96: {
    square: 96,
    type: 'red_card',
    title: '🟥 89th-Minute Offside Trap!',
    subtitle: 'Championship Heartbreak',
    message: 'Offside flag disallows a winning goal at the death! Devastating retreat of 15 squares to Square 81!',
    delta: -15,
    destination: 81,
    soundType: 'card',
  },
};

export function getSoccerEventAction(squareNumber: number): SoccerEventAction | null {
  return SOCCER_EVENT_ACTIONS[squareNumber] || null;
}
