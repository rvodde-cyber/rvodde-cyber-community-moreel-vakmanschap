import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Countdown-hook voor de timerfase.
 *
 * @param {number} durationSeconds  Startduur in seconden.
 * @param {object} [options]
 * @param {boolean} [options.autoStart=true]
 * @param {() => void} [options.onComplete]
 */
export function useCountdown(durationSeconds, { autoStart = true, onComplete } = {}) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [running, setRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setRemaining(durationSeconds);
    setRunning(autoStart);
  }, [durationSeconds, autoStart]);

  useEffect(() => {
    if (!running) return undefined;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const pause = useCallback(() => setRunning(false), []);
  const resume = useCallback(() => {
    setRunning(remaining > 0);
  }, [remaining]);
  const reset = useCallback(() => {
    setRemaining(durationSeconds);
    setRunning(false);
  }, [durationSeconds]);

  const progress = durationSeconds > 0 ? remaining / durationSeconds : 0;

  return { remaining, running, progress, pause, resume, reset, setRunning };
}
