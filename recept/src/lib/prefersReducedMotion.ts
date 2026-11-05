import { useEffect, useState } from 'react';

/** Systeem + instellingen (reduce-motion class op html). */
export function readPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('reduce-motion')
  );
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(readPrefersReducedMotion());
    sync();
    mq.addEventListener('change', sync);
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-reduce-motion'],
    });
    return () => {
      mq.removeEventListener('change', sync);
      obs.disconnect();
    };
  }, []);
  return reduced;
}
