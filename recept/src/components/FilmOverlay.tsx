import { useCallback, useEffect, useRef, useState } from 'react';
import type { FilmCue, FilmScript } from '@data/filmSequences';
import { TR_UI_LABELS } from '@data/filmSequences';
import { hum, SFX, unlockAudio } from '../audio/sfx';

const base = import.meta.env.BASE_URL;

type Props = {
  script: FilmScript;
  onDone: () => void;
  onSkip?: () => void;
};

export function FilmOverlay({ script, onDone, onSkip }: Props) {
  const reduced = usePrefersReducedMotion();
  const [shot, setShot] = useState<{ img?: string; ui?: string; zoom?: string }>({});
  const [sub, setSub] = useState<{ who?: string; text?: string }>({});
  const [centerText, setCenterText] = useState('');
  const [centerQ, setCenterQ] = useState(false);
  const [titleOn, setTitleOn] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    unlockAudio();
    hum(Math.min(12, script.duration / 1000));

    const timers: number[] = [];
    const scale = reduced ? 0.35 : 1;

    const run = (cue: FilmCue) => {
      switch (cue.kind) {
        case 'text':
          setCenterText(cue.text);
          setCenterQ(!!cue.question);
          break;
        case 'shot':
          setShot({ img: cue.img, zoom: cue.zoom ?? 'in' });
          setSub({});
          break;
        case 'ui':
          setShot({ ui: cue.ui });
          setSub({});
          break;
        case 'sub':
          setSub({ who: cue.who, text: cue.text });
          break;
        case 'blank':
          setShot({});
          setSub({});
          break;
        case 'tick':
          SFX.tick();
          break;
        case 'boom':
          SFX.boom(cue.soft);
          break;
        case 'title':
          setTitleOn(true);
          SFX.low();
          break;
        default:
          break;
      }
    };

    for (const cue of script.cues) {
      timers.push(window.setTimeout(() => run(cue), cue.at * scale));
    }
    timers.push(window.setTimeout(finish, script.duration * scale + 400));

    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [script, reduced, finish]);

  const ui = shot.ui ? TR_UI_LABELS[shot.ui] : null;
  const imgUrl = shot.img ? `${base}beelden/${shot.img}.jpg` : null;

  return (
    <div className="tr" role="dialog" aria-label={script.label}>
      <button type="button" className="tr-skip btn ghost" onClick={() => (onSkip ?? finish)()}>
        Overslaan
      </button>
      <div
        className="tr-shot on"
        style={
          ui
            ? { backgroundColor: '#03070A', backgroundImage: 'none' }
            : imgUrl
              ? {
                  backgroundImage: `url(${imgUrl})`,
                  transform: shot.zoom === 'pan' ? 'scale(1.12) translateX(-2%)' : 'scale(1.1)',
                }
              : { backgroundColor: '#000' }
        }
      >
        {ui ? (
          <div className="tr-ui">
            <span className="k1">{ui.k}</span>
            <span className={`huge${ui.cyan ? ' c' : ''}`}>{ui.huge}</span>
          </div>
        ) : null}
      </div>
      <div className="tr-sub">
        {sub.who ? <span className="who">{sub.who}</span> : null}
        {sub.text ?? ''}
      </div>
      <div className={`tr-text${centerQ ? ' q' : ''}${centerText ? ' on' : ''}`}>{centerText}</div>
      <div className={`tr-title${titleOn ? ' on' : ''}`}>
        <span className="m">{script.titleMark}</span>
        {script.titleAfter ? <span className="a">{script.titleAfter}</span> : null}
        {script.titleEp ? <span className="e">{script.titleEp}</span> : null}
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}
