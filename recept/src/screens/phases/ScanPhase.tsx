import { useEffect } from 'react';
import type { GameAction } from '../../game/gameReducer';

export function ScanPhase({ dispatch }: { dispatch: (a: GameAction) => void }) {
  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'FINISH_SCAN' }), 1600);
    return () => clearTimeout(t);
  }, [dispatch]);

  return (
    <section className="panel scan" aria-live="polite">
      <div className="k">TEMPO HERBEREKENT DE FABRIEK</div>
      <div className="bar"><span /></div>
    </section>
  );
}
