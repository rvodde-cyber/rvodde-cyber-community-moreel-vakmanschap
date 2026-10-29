import { useMemo } from 'react';

/** Docentmodus via ?docent=1 (CURSOR-PROMPT §10). */
export function useDocentMode(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('docent') === '1';
  }, []);
}
