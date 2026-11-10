import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FootballerAnimationState } from '../types/animation';
import { getCoordinatesForSquare, SquareCoordinates } from '../types/game';

interface UseFootballerMovementOptions {
  initialSquare?: number;
  stepDurationMs?: number;
  onFinishReached?: () => void;
  onStepComplete?: (square: number) => void;
}

/**
 * Reusable movement controller for footballers on the 100-square zigzag soccer pitch.
 * Handles:
 * - Step-by-step intermediate square traversal (not jumping directly)
 * - Calculation of next coordinates across horizontal rows, row ends, and row turns
 * - Automatic switching between 'running' and 'idle' (and 'celebrating' at square 100)
 * - Facing direction management (left vs right along the zigzag)
 * - Boundary locking (1 to 100)
 */
export function useFootballerMovement(options: UseFootballerMovementOptions = {}) {
  const {
    initialSquare = 1,
    stepDurationMs = 320,
    onFinishReached,
    onStepComplete,
  } = options;

  const [currentSquare, setCurrentSquare] = useState<number>(initialSquare);
  const [animationState, setAnimationState] = useState<FootballerAnimationState>('idle');
  const [facing, setFacing] = useState<'right' | 'left'>('right');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(initialSquare >= 100);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up any running timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Compute exact board coordinates for current square
  const coordinates = useMemo(
    () => getCoordinatesForSquare(currentSquare),
    [currentSquare]
  );

  /**
   * Move the footballer by a specified number of steps (1, 3, 6, etc.)
   * Moves through each intermediate square sequentially with running animation.
   */
  const moveSteps = useCallback(
    (steps: number) => {
      if (isMoving) return;
      if (currentSquare >= 100) return;

      const destination = Math.min(100, currentSquare + steps);
      const intermediatePath: number[] = [];
      for (let s = currentSquare + 1; s <= destination; s++) {
        intermediatePath.push(s);
      }

      if (intermediatePath.length === 0) return;

      setIsMoving(true);
      setAnimationState('running');
      setTotalSteps(intermediatePath.length);
      setActiveStep(0);
      setIsFinished(false);

      let stepIndex = 0;

      const executeNextStep = () => {
        if (stepIndex >= intermediatePath.length) {
          // Movement cycle complete
          setIsMoving(false);
          setActiveStep(0);
          setTotalSteps(0);

          if (destination >= 100) {
            setIsFinished(true);
            setAnimationState('celebrating');
            onFinishReached?.();
          } else {
            setAnimationState('idle');
          }
          return;
        }

        const nextSquareNum = intermediatePath[stepIndex];
        const prevSquareNum = stepIndex === 0 ? currentSquare : intermediatePath[stepIndex - 1];

        const prevCoords = getCoordinatesForSquare(prevSquareNum);
        const nextCoords = getCoordinatesForSquare(nextSquareNum);

        // Determine correct facing direction:
        // Moving right along even row -> right
        // Moving left along odd row -> left
        // Turning to next row -> orientation of destination row
        let newFacing: 'right' | 'left' = nextCoords.rowDirection;
        if (nextCoords.colIndex > prevCoords.colIndex) {
          newFacing = 'right';
        } else if (nextCoords.colIndex < prevCoords.colIndex) {
          newFacing = 'left';
        } else {
          newFacing = nextCoords.rowDirection;
        }

        setFacing(newFacing);
        setCurrentSquare(nextSquareNum);
        setActiveStep(stepIndex + 1);
        onStepComplete?.(nextSquareNum);

        stepIndex++;
        timeoutRef.current = setTimeout(executeNextStep, stepDurationMs);
      };

      // Start movement sequence
      timeoutRef.current = setTimeout(executeNextStep, 40);
    },
    [currentSquare, isMoving, onFinishReached, onStepComplete, stepDurationMs]
  );

  /**
   * Reset the character back to Square 1 (START)
   */
  const resetToStart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMoving(false);
    setCurrentSquare(1);
    setAnimationState('idle');
    setFacing('right');
    setIsFinished(false);
    setActiveStep(0);
    setTotalSteps(0);
  }, []);

  /**
   * Direct jump to a specific square (useful for debugging)
   */
  const jumpToSquare = useCallback((squareNumber: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const clamped = Math.max(1, Math.min(100, Math.floor(squareNumber)));
    setIsMoving(false);
    setCurrentSquare(clamped);
    const coords = getCoordinatesForSquare(clamped);
    setFacing(coords.rowDirection);
    if (clamped >= 100) {
      setIsFinished(true);
      setAnimationState('celebrating');
    } else {
      setIsFinished(false);
      setAnimationState('idle');
    }
  }, []);

  return {
    currentSquare,
    coordinates,
    animationState,
    facing,
    isMoving,
    activeStep,
    totalSteps,
    isFinished,
    moveSteps,
    resetToStart,
    jumpToSquare,
  };
}
