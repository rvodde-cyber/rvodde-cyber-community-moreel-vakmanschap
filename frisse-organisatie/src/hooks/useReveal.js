import { useEffect, useRef, useState } from "react";

/** Respecteert de systeeminstelling "verminder beweging". */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Animeert een reeks waarden van een neutrale startwaarde naar hun eindwaarde,
 * gestaffeld per index (briefing §8.1: 100 ms vertraging per blad, ~1,2 s,
 * ease-out). Eén rAF-lus voor alle bladeren tegelijk, zodat kleur, hoek en
 * padvorm gegarandeerd in de pas lopen.
 *
 * @param {number[]} targets eindwaarden
 * @param {{from: number, durationMs: number, staggerMs: number, enabled?: boolean}} options
 * @returns {number[]} de huidige, geïnterpoleerde waarden
 */
export function useStaggeredReveal(targets, { from, durationMs, staggerMs, enabled = true }) {
  const reducedMotion = usePrefersReducedMotion();
  const shouldAnimate = enabled && !reducedMotion;
  const [values, setValues] = useState(() => (shouldAnimate ? targets.map(() => from) : targets));
  const frameRef = useRef(0);
  const signature = targets.join("|");

  useEffect(() => {
    if (!shouldAnimate) {
      setValues(targets);
      return undefined;
    }

    const start = performance.now();
    const total = durationMs + staggerMs * Math.max(0, targets.length - 1);

    const tick = (now) => {
      const elapsed = now - start;
      setValues(
        targets.map((target, index) => {
          const progress = clamp01((elapsed - index * staggerMs) / durationMs);
          return from + (target - from) * easeOutCubic(progress);
        })
      );
      if (elapsed < total) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // targets is een nieuwe array bij elke render; de signature dekt de inhoud.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, from, durationMs, staggerMs, shouldAnimate]);

  return values;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}
