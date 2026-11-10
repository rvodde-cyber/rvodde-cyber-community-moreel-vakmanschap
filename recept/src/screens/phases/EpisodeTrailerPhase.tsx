import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { TIJDGEEST } from '@data/episodes/tijdgeest';
import { trailerVoorAflevering, trailerVerborgenTekst } from '@data/trailers';
import type { TrailerBeweging, TrailerShot } from '@data/schemas/trailers.schema';
import { probeBeeldUrl, filterLoadableShotCodes } from '../../lib/trailerProbe';
import { usePrefersReducedMotion } from '../../lib/prefersReducedMotion';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

type Props = {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
};

export function trailerShotBewegingKlasse(beweging: TrailerBeweging, reduced: boolean): string {
  if (reduced) return 'episode-trailer__shot--geen';
  return `episode-trailer__shot--${beweging}`;
}

type Layer = { url: string; klasse: string; key: number };

export function EpisodeTrailerPhase({ state, dispatch }: Props) {
  const reduced = usePrefersReducedMotion();
  const base = import.meta.env.BASE_URL;
  const def = trailerVoorAflevering(state.episode);
  const [shots, setShots] = useState<TrailerShot[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [front, setFront] = useState<Layer | null>(null);
  const [back, setBack] = useState<Layer | null>(null);
  const [showBack, setShowBack] = useState(false);
  const showBackRef = useRef(false);
  const hasShotLayerRef = useRef(false);
  const keySeq = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verborgen = useMemo(() => trailerVerborgenTekst(state.episode), [state.episode]);

  const endTrailer = useCallback(
    (markSeen: boolean) => {
      dispatch({ type: 'SKIP_EPISODE_TRAILER', markSeen });
    },
    [dispatch],
  );

  const skip = useCallback(() => endTrailer(true), [endTrailer]);

  useEffect(() => {
    const codes = def.shots.map((s) => s.code);
    let cancelled = false;
    void filterLoadableShotCodes(codes, base).then((loadable) => {
      if (cancelled) return;
      if (loadable.length < 2) {
        endTrailer(false);
        return;
      }
      hasShotLayerRef.current = false;
      setShots(def.shots.filter((s) => loadable.includes(s.code)));
    });
    return () => {
      cancelled = true;
    };
  }, [base, def.shots, endTrailer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skip]);

  useEffect(() => {
    if (!state.tijdgeestGeluidAan) return;
    const g = TIJDGEEST[state.episode].geluid;
    if (!g?.audioPath) return;
    const audio = new Audio(`${base}${g.audioPath}`);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;
    void audio.play().catch(() => undefined);
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [base, state.episode, state.tijdgeestGeluidAan]);

  useEffect(() => {
    if (!shots?.length) return;
    if (showTitle) {
      const t = window.setTimeout(() => endTrailer(true), def.titelkaart.ms);
      return () => window.clearTimeout(t);
    }
    if (idx >= shots.length) {
      setShowTitle(true);
      return;
    }

    const shot = shots[idx]!;
    let cancelled = false;
    let timer = 0;

    void probeBeeldUrl(shot.code, base).then((url) => {
      if (cancelled) return;
      if (!url) {
        setIdx((i) => i + 1);
        return;
      }
      keySeq.current += 1;
      const layer: Layer = {
        url,
        klasse: trailerShotBewegingKlasse(shot.beweging, reduced),
        key: keySeq.current,
      };
      if (!hasShotLayerRef.current) {
        hasShotLayerRef.current = true;
        setFront(layer);
      } else if (showBackRef.current) {
        setFront(layer);
        showBackRef.current = false;
        setShowBack(false);
      } else {
        setBack(layer);
        showBackRef.current = true;
        setShowBack(true);
      }

      const next = shots[idx + 1];
      if (next) void probeBeeldUrl(next.code, base);

      timer = window.setTimeout(() => setIdx((i) => i + 1), shot.ms);
    });

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [base, def.titelkaart.ms, endTrailer, idx, reduced, shots, showTitle]);

  if (!shots) {
    return (
      <div className="episode-trailer episode-trailer--loading" aria-busy="true">
        <p className="sr-only">Trailer laden…</p>
      </div>
    );
  }

  const shot = idx < shots.length ? shots[idx] : shots[shots.length - 1];
  const tk = def.titelkaart;
  const crossfade = reduced ? '' : ' episode-trailer__shot--crossfade';

  return (
    <div className="episode-trailer">
      <TrailerA11yTekst>
        <ol>
          {verborgen.map((line) => (
            <li key={line.slice(0, 32)}>{line}</li>
          ))}
        </ol>
      </TrailerA11yTekst>

      {!showTitle ? (
        <>
          <div className="episode-trailer__media" aria-hidden="true">
            {front ? (
              <img
                key={front.key}
                src={front.url}
                alt=""
                className={`episode-trailer__shot episode-trailer__shot--layer${crossfade} ${
                  showBack ? 'episode-trailer__shot--hidden' : 'episode-trailer__shot--visible'
                } ${front.klasse}`}
                style={{ ['--shot-ms' as string]: `${shots[Math.min(idx, shots.length - 1)]?.ms ?? 4000}ms` }}
                decoding="async"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ) : null}
            {back ? (
              <img
                key={back.key}
                src={back.url}
                alt=""
                className={`episode-trailer__shot episode-trailer__shot--layer${crossfade} ${
                  showBack ? 'episode-trailer__shot--visible' : 'episode-trailer__shot--hidden'
                } ${back.klasse}`}
                style={{ ['--shot-ms' as string]: `${shots[Math.min(idx, shots.length - 1)]?.ms ?? 4000}ms` }}
                decoding="async"
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="episode-trailer__tekst-wrap" aria-hidden="true">
            <p className="episode-trailer__tekst">{shot?.tekst}</p>
          </div>
        </>
      ) : (
        <div className="episode-trailer__title" aria-hidden="true">
          <h1 className="episode-trailer__title-mark">RECEPT</h1>
          <p className="episode-trailer__title-meta">
            {tk.deel} · {tk.naam} · {tk.jaar}
          </p>
        </div>
      )}

      <button type="button" className="btn ghost episode-trailer__skip" onClick={skip}>
        Overslaan
      </button>
    </div>
  );
}

function TrailerA11yTekst({ children }: { children: ReactNode }) {
  return <div className="sr-only">{children}</div>;
}
