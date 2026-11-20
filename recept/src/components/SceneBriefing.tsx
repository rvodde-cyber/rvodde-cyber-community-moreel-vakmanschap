import { useEffect, useRef, type KeyboardEvent } from 'react';
import { episodeMeta } from '@data/episodes/meta';
import { usesBeslistijdTimer } from '@data/episodes/motor';
import type { EpisodeId } from '@data/episodes/meta';
import {
  COLD_OPENING_KOP,
  SCENE_BRIEFING_BODY,
  SCENE_BRIEFING_FOLLOW,
  SCENE_BRIEFING_TIMER_HINT,
} from '../game/coldOpenCopy';
import { PeriodThemeScope } from './PeriodThemeScope';
import { HelpLinks } from './HelpLinks';
import { useUiModals } from '../context/UiModalsContext';

type Props = {
  episode: EpisodeId;
  round: 1 | 2;
  onStart: () => void;
};

export function SceneBriefing({ episode, round, onStart }: Props) {
  const { openHowto, openGloss } = useUiModals();
  const kopRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const meta = episodeMeta(episode);
  const hasTimer = usesBeslistijdTimer(episode);

  useEffect(() => {
    kopRef.current?.focus();
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target !== btnRef.current && e.target !== kopRef.current) return;
    e.preventDefault();
    onStart();
  };

  return (
    <PeriodThemeScope periodKey={meta.periodKey}>
      <div className="scene-briefing" onKeyDown={onKeyDown}>
        <article className="panel scene-briefing__card">
          <p className="kick scene-briefing__ronde">
            AFLEVERING {episode} / RONDE {round}
          </p>
          <h4
            ref={kopRef}
            className="cold-open-kop scene-briefing__kop"
            tabIndex={-1}
          >
            {COLD_OPENING_KOP}
          </h4>
          <p className="body scene-briefing__body">{SCENE_BRIEFING_BODY}</p>
          <p className="body scene-briefing__follow">{SCENE_BRIEFING_FOLLOW}</p>
          {hasTimer ? (
            <p className="note scene-briefing__timer-hint">{SCENE_BRIEFING_TIMER_HINT}</p>
          ) : null}
          <button
            ref={btnRef}
            type="button"
            className="btn gold big scene-briefing__start"
            onClick={onStart}
          >
            Start de scène
          </button>
          <HelpLinks onHowto={openHowto} onGloss={openGloss} />
        </article>
      </div>
    </PeriodThemeScope>
  );
}