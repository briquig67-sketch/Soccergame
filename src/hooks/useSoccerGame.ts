import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { GamePlayer, PlayerToken, SoccerEventAction } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { getSoccerEventAction } from '../utils/soccerEvents';
import { soundEngine } from '../utils/audio';
import { FootballerAnimationState } from '../types/animation';

interface UseSoccerGameProps {
  initialPlayers?: PlayerToken[];
  playerCount?: number;
  stepDurationMs?: number;
}

export function useSoccerGame({
  initialPlayers = [],
  playerCount = 4,
  stepDurationMs = 300,
}: UseSoccerGameProps = {}) {
  // Initialize players from active selections or default roster
  const initializePlayers = useCallback(
    (count: number, tokens: PlayerToken[]): GamePlayer[] => {
      return Array.from({ length: count }).map((_, idx) => {
        const token = tokens[idx];
        const charId = token?.characterId || (idx === 0 ? 'leo' : idx === 1 ? 'maya' : idx === 2 ? 'marcus' : 'sofia');
        const char = CHARACTERS.find((c) => c.id === charId) || CHARACTERS[0];
        const pName = token?.name || `Player ${idx + 1}`;

        return {
          id: idx + 1,
          playerIndex: idx,
          name: pName.includes(':') ? pName.split(':')[0].trim() : pName,
          characterId: char.id,
          characterName: char.name,
          characterNumber: char.number,
          portrait: char.portrait,
          avatarEmoji: char.avatarEmoji,
          theme: char.theme,
          currentSquare: 1,
          previousSquare: 1,
          lastRoll: null,
          turnsTaken: 0,
          eventsTriggered: 0,
          isWinner: false,
        };
      });
    },
    []
  );

  const [players, setPlayers] = useState<GamePlayer[]>(() =>
    initializePlayers(playerCount, initialPlayers)
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [activeAnimationState, setActiveAnimationState] = useState<FootballerAnimationState>('idle');
  const [activeFacing, setActiveFacing] = useState<'right' | 'left'>('right');
  const [activeEvent, setActiveEvent] = useState<SoccerEventAction | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<GamePlayer | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Match ready! Player 1, roll the dice to kick off!');
  const [lastBounced, setLastBounced] = useState<{ roll: number; excess: number; landed: number } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync players when external selection changes and game hasn't started
  useEffect(() => {
    setPlayers((prev) => {
      // If someone moved past square 1, keep progress
      const hasGameStarted = prev.some((p) => p.currentSquare > 1 || p.turnsTaken > 0);
      if (hasGameStarted && prev.length === playerCount) return prev;
      return initializePlayers(playerCount, initialPlayers);
    });
  }, [playerCount, initialPlayers, initializePlayers]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const currentPlayer = players[currentPlayerIndex] || players[0];

  /**
   * ROLL DICE & INITIATE MULTIPLAYER TURN CYCLE
   * @param forcedValue Optional specific roll value (1 to 6) for developer testing
   */
  const rollDice = useCallback((forcedValue?: number) => {
    if (isRolling || isMoving || isGameOver) return;

    // 1. Begin 3D dice roll animation
    setIsRolling(true);
    setActiveEvent(null);
    setLastBounced(null);
    setStatusMessage(`${currentPlayer.name} is rolling the dice...`);

    // Genuinely random dice outcome unless explicitly overridden by dev test
    const rolledValue =
      typeof forcedValue === 'number' && forcedValue >= 1 && forcedValue <= 6
        ? Math.floor(forcedValue)
        : Math.floor(Math.random() * 6) + 1;

    // Wait for 3D tumbling roll animation to settle (1100ms)
    timerRef.current = setTimeout(() => {
      setDiceValue(rolledValue);
      setIsRolling(false);
      setIsMoving(true);
      setActiveAnimationState('running');

      const startSquare = currentPlayer.currentSquare;
      const rawTarget = startSquare + rolledValue;

      // Calculate path with exact roll and bounce rule
      const path: number[] = [];
      let didBounce = false;
      let bounceExcess = 0;
      let finalDest = rawTarget;

      if (rawTarget <= 100) {
        // Standard forward progression
        for (let s = startSquare + 1; s <= rawTarget; s++) {
          path.push(s);
        }
      } else {
        // Exceeds 100: Bounce backwards!
        didBounce = true;
        bounceExcess = rawTarget - 100;
        finalDest = 100 - bounceExcess;

        // Forward to 100
        for (let s = startSquare + 1; s <= 100; s++) {
          path.push(s);
        }
        // Backward bounce
        for (let s = 99; s >= finalDest; s--) {
          path.push(s);
        }
      }

      setTotalSteps(path.length);
      setActiveStep(0);

      if (didBounce) {
        setStatusMessage(
          `Rolled a ${rolledValue}! Reached 100 and bounced back ${bounceExcess} square${
            bounceExcess > 1 ? 's' : ''
          } to Square ${finalDest}!`
        );
        setLastBounced({ roll: rolledValue, excess: bounceExcess, landed: finalDest });
      } else {
        setStatusMessage(
          `${currentPlayer.name} rolled a ${rolledValue}! Moving to Square ${finalDest}...`
        );
      }

      // Step-by-step traversal execution
      let stepIdx = 0;

      const executeStep = () => {
        if (stepIdx >= path.length) {
          // Primary movement completed!
          finishPrimaryMovement(finalDest, rolledValue, didBounce);
          return;
        }

        const nextSq = path[stepIdx];
        soundEngine.playStep();

        // Update player position for live rendering
        setPlayers((prev) =>
          prev.map((p, idx) =>
            idx === currentPlayerIndex
              ? { ...p, currentSquare: nextSq, previousSquare: p.currentSquare }
              : p
          )
        );

        // Adjust facing direction along zigzag
        const rowFromBottom = Math.floor((nextSq - 1) / 10);
        const isEvenRow = rowFromBottom % 2 === 0;
        setActiveFacing(isEvenRow ? 'right' : 'left');

        setActiveStep(stepIdx + 1);
        stepIdx++;
        timerRef.current = setTimeout(executeStep, stepDurationMs);
      };

      timerRef.current = setTimeout(executeStep, 80);
    }, 1100);
  }, [isRolling, isMoving, isGameOver, currentPlayer, currentPlayerIndex, stepDurationMs]);

  /**
   * FINISH PRIMARY MOVEMENT: Handles winning on 100, event squares, or turn handover
   */
  const finishPrimaryMovement = (
    finalSquare: number,
    rolledValue: number,
    bounced: boolean
  ) => {
    setActiveStep(0);
    setTotalSteps(0);

    // Update player record
    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === currentPlayerIndex
          ? {
              ...p,
              currentSquare: finalSquare,
              lastRoll: rolledValue,
              turnsTaken: p.turnsTaken + 1,
            }
          : p
      )
    );

    // CASE 1: EXACT ROLL REACHED SQUARE 100! WINNER!
    if (finalSquare === 100 && !bounced) {
      setIsMoving(false);
      setActiveAnimationState('celebrating');
      setIsGameOver(true);
      const winPlayer: GamePlayer = {
        ...currentPlayer,
        currentSquare: 100,
        lastRoll: rolledValue,
        turnsTaken: currentPlayer.turnsTaken + 1,
        isWinner: true,
      };
      setWinner(winPlayer);
      setStatusMessage(`🏆 GOAL! ${currentPlayer.name} reached Square 100 and WON the Championship!`);
      soundEngine.playVictory();
      return;
    }

    // CASE 2: LANDED ON A SOCCER SPECIAL EVENT SQUARE!
    const event = getSoccerEventAction(finalSquare);
    if (event) {
      setActiveEvent(event);
      soundEngine.playWhistle();

      // Trigger respective audio & animation
      if (event.type === 'penalty' || event.type === 'sprint') {
        setActiveAnimationState('kicking');
        if (event.type === 'penalty') soundEngine.playCheer();
        else soundEngine.playSprint();
      } else if (event.type === 'save') {
        setActiveAnimationState('celebrating');
        soundEngine.playSave();
      } else {
        // Yellow or Red Card
        setActiveAnimationState('falling');
        soundEngine.playCardBuzzer();
      }

      setStatusMessage(`${event.title} - ${event.message}`);

      // Secondary movement to event destination square
      timerRef.current = setTimeout(() => {
        executeSecondaryEventMovement(finalSquare, event.destination);
      }, 1800);
      return;
    }

    // CASE 3: ORDINARY SQUARE LANDING -> Turn handover
    setActiveAnimationState('idle');
    setIsMoving(false);
    rotateToNextPlayer();
  };

  /**
   * SECONDARY EVENT MOVEMENT: Smoothly steps player from event square to destination
   */
  const executeSecondaryEventMovement = (fromSq: number, toSq: number) => {
    const isForward = toSq > fromSq;
    const secondaryPath: number[] = [];

    if (isForward) {
      for (let s = fromSq + 1; s <= toSq; s++) secondaryPath.push(s);
    } else {
      for (let s = fromSq - 1; s >= toSq; s--) secondaryPath.push(s);
    }

    setActiveAnimationState('running');
    setTotalSteps(secondaryPath.length);
    setActiveStep(0);

    let idx = 0;
    const stepInterval = Math.max(160, Math.floor(stepDurationMs * 0.75));

    const executeEventStep = () => {
      if (idx >= secondaryPath.length) {
        // Secondary movement complete
        setActiveStep(0);
        setTotalSteps(0);
        setActiveAnimationState('idle');
        setIsMoving(false);

        setPlayers((prev) =>
          prev.map((p, pIdx) =>
            pIdx === currentPlayerIndex
              ? {
                  ...p,
                  currentSquare: toSq,
                  eventsTriggered: p.eventsTriggered + 1,
                }
              : p
          )
        );

        // Turn handover
        timerRef.current = setTimeout(() => {
          rotateToNextPlayer();
        }, 600);
        return;
      }

      const sq = secondaryPath[idx];
      soundEngine.playStep();

      setPlayers((prev) =>
        prev.map((p, pIdx) =>
          pIdx === currentPlayerIndex ? { ...p, currentSquare: sq } : p
        )
      );

      const rowFromBottom = Math.floor((sq - 1) / 10);
      const isEvenRow = rowFromBottom % 2 === 0;
      setActiveFacing(isEvenRow ? 'right' : 'left');

      setActiveStep(idx + 1);
      idx++;
      timerRef.current = setTimeout(executeEventStep, stepInterval);
    };

    timerRef.current = setTimeout(executeEventStep, 100);
  };

  /**
   * ROTATE TURN TO NEXT ACTIVE PLAYER
   */
  const rotateToNextPlayer = () => {
    setActiveEvent(null);
    setCurrentPlayerIndex((prev) => {
      const nextIdx = (prev + 1) % players.length;
      const nextP = players[nextIdx];
      setStatusMessage(`${nextP.name}'s turn (#${nextP.characterNumber} ${nextP.characterName}). Roll the dice!`);
      return nextIdx;
    });
  };

  /**
   * DISMISS ACTIVE EVENT MODAL
   */
  const dismissEvent = () => {
    setActiveEvent(null);
  };

  /**
   * RESTART MATCH (PLAY AGAIN)
   */
  const restartGame = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        currentSquare: 1,
        previousSquare: 1,
        lastRoll: null,
        turnsTaken: 0,
        eventsTriggered: 0,
        isWinner: false,
      }))
    );
    setCurrentPlayerIndex(0);
    setDiceValue(1);
    setIsRolling(false);
    setIsMoving(false);
    setActiveStep(0);
    setTotalSteps(0);
    setActiveAnimationState('idle');
    setActiveFacing('right');
    setActiveEvent(null);
    setIsGameOver(false);
    setWinner(null);
    setLastBounced(null);
    setStatusMessage('New match kicked off! Player 1, roll the dice!');
  }, []);

  /**
   * DEVELOPER TEST MODE METHODS
   */

  // 1. Set any player to a chosen square between 1 and 100
  const setPlayerSquare = useCallback((playerIndex: number, squareNum: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const clamped = Math.max(1, Math.min(100, Math.floor(squareNum)));
    setIsMoving(false);
    setIsRolling(false);
    setActiveEvent(null);
    setLastBounced(null);

    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === playerIndex
          ? {
              ...p,
              currentSquare: clamped,
              previousSquare: p.currentSquare,
            }
          : p
      )
    );

    const rowFromBottom = Math.floor((clamped - 1) / 10);
    const isEvenRow = rowFromBottom % 2 === 0;
    setActiveFacing(isEvenRow ? 'right' : 'left');

    if (clamped >= 100) {
      setActiveAnimationState('celebrating');
    } else {
      setActiveAnimationState('idle');
    }

    setStatusMessage(`[DEV] Set ${players[playerIndex]?.name || 'Player'} to Square ${clamped}.`);
  }, [players]);

  // 2. Set active player turn
  const setCurrentPlayerTurn = useCallback((playerIndex: number) => {
    if (playerIndex >= 0 && playerIndex < players.length) {
      setCurrentPlayerIndex(playerIndex);
      setStatusMessage(`[DEV] Switched active turn to ${players[playerIndex].name}.`);
    }
  }, [players]);

  // 3. Test exact roll to reach square 100
  const testExactRollTo100 = useCallback((fromSquare: number = 97) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMoving(false);
    setIsRolling(false);
    setActiveEvent(null);
    setLastBounced(null);
    setIsGameOver(false);
    setWinner(null);

    const neededRoll = Math.max(1, Math.min(6, 100 - fromSquare));
    const targetStart = 100 - neededRoll;

    // Set player to target start first
    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p, currentSquare: targetStart, previousSquare: p.currentSquare }
          : p
      )
    );

    setStatusMessage(`[DEV] Testing exact roll of ${neededRoll} from Square ${targetStart} to 100!`);

    // Execute roll with exact needed value
    setTimeout(() => {
      rollDice(neededRoll);
    }, 150);
  }, [currentPlayerIndex, rollDice]);

  // 4. Test oversized roll bouncing backwards from square 100
  const testBounceBackFrom100 = useCallback((fromSquare: number = 97, rollAmount: number = 5) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMoving(false);
    setIsRolling(false);
    setActiveEvent(null);
    setLastBounced(null);
    setIsGameOver(false);
    setWinner(null);

    // Set player to target start
    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p, currentSquare: fromSquare, previousSquare: p.currentSquare }
          : p
      )
    );

    const excess = (fromSquare + rollAmount) - 100;
    const finalLanded = 100 - excess;
    setStatusMessage(`[DEV] Testing oversized roll of ${rollAmount} from Sq ${fromSquare}! Reaches 100 and bounces back ${excess} to Sq ${finalLanded}!`);

    setTimeout(() => {
      rollDice(rollAmount);
    }, 150);
  }, [currentPlayerIndex, rollDice]);

  // 5. Trigger Championship Victory screen & celebration animation directly
  const triggerChampionshipVictory = useCallback((targetPlayerIndex?: number) => {
    const pIdx = typeof targetPlayerIndex === 'number' ? targetPlayerIndex : currentPlayerIndex;
    const targetPlayer = players[pIdx] || currentPlayer;

    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === pIdx
          ? {
              ...p,
              currentSquare: 100,
              isWinner: true,
            }
          : p
      )
    );

    setActiveAnimationState('celebrating');
    setIsGameOver(true);
    const winPlayer = {
      ...targetPlayer,
      currentSquare: 100,
      isWinner: true,
    };
    setWinner(winPlayer);
    setStatusMessage(`[DEV] Championship Victory Screen triggered for ${targetPlayer.name}!`);
    soundEngine.playVictory();
  }, [currentPlayerIndex, players, currentPlayer]);

  // 6. Test winning celebration animation state directly
  const testCelebrationAnimation = useCallback(() => {
    setActiveAnimationState('celebrating');
    soundEngine.playCheer();
    setStatusMessage('[DEV] Triggered active character CELEBRATING animation.');
  }, []);

  // 7. Reset test mode
  const resetTestState = useCallback(() => {
    restartGame();
    setStatusMessage('[DEV] Test state reset. All players returned to Square 1.');
  }, [restartGame]);

  return {
    players,
    currentPlayer,
    currentPlayerIndex,
    diceValue,
    isRolling,
    isMoving,
    activeStep,
    totalSteps,
    activeAnimationState,
    activeFacing,
    activeEvent,
    isGameOver,
    winner,
    statusMessage,
    lastBounced,
    rollDice,
    restartGame,
    dismissEvent,
    // Developer Test Mode Exports
    setPlayerSquare,
    setCurrentPlayerTurn,
    testExactRollTo100,
    testBounceBackFrom100,
    triggerChampionshipVictory,
    testCelebrationAnimation,
    resetTestState,
  };
}
