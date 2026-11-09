import type { OnderstroomKanaal, OnderstroomLineDef } from '@data/episodes/coldOpenModel';
import { onderstroomAriaLabel, typingAriaLabel } from '../game/coldOpenA11y';

type Props = {
  line: OnderstroomLineDef;
  reducedMotion: boolean;
};

type TypingProps = {
  van: string;
  naar?: string;
  kanaal: OnderstroomKanaal;
  reducedMotion: boolean;
};

export function OnderstroomTyping({ van, reducedMotion }: TypingProps) {
  const first = van.split(/[\s-]+/)[0] ?? van;
  return (
    <div className="onderstroom-item onderstroom-item--typing" aria-label={typingAriaLabel(van)}>
      <span className="onderstroom-typing-text">
        {first} is aan het typen
        {!reducedMotion ? <span className="onderstroom-typing-dots" aria-hidden="true">…</span> : null}
      </span>
    </div>
  );
}

/** Stiekeme tussenregels in de cold open — één skin per kanaal. */
export function Onderstroom({ line, reducedMotion }: Props) {
  const fade = reducedMotion ? '' : ' onderstroom-item--fade';
  const aria = onderstroomAriaLabel(line);

  switch (line.kanaal) {
    case 'kantlijn':
      return (
        <div
          className={`onderstroom-item onderstroom-kantlijn${fade} onderstroom-kantlijn--${line.handschrift ?? 'potlood'}`}
          role="note"
          aria-label={aria}
        >
          <p className={`onderstroom-kantlijn-tekst${line.doorgehaald ? ' is-doorgehaald' : ''}`}>
            {line.tekst}
          </p>
        </div>
      );
    case 'plakbriefje':
      return (
        <div
          className={`onderstroom-item onderstroom-plakbriefje${fade}`}
          role="note"
          aria-label={aria}
        >
          <div className="onderstroom-plakbriefje-sheet">
            {line.naar ? (
              <p className="onderstroom-plakbriefje-meta" aria-hidden="true">
                {line.van} → {line.naar}
              </p>
            ) : null}
            <p className="onderstroom-plakbriefje-tekst">{line.tekst}</p>
          </div>
        </div>
      );
    case 'sms':
      return (
        <div className={`onderstroom-item onderstroom-sms${fade}`} role="note" aria-label={aria}>
          <div className="onderstroom-sms-phone">
            <div className="onderstroom-sms-chrome" aria-hidden="true" />
            <p className="onderstroom-sms-meta" aria-hidden="true">
              {line.van}
              {line.naar ? ` → ${line.naar}` : ''}
            </p>
            <p className="onderstroom-sms-tekst">{line.tekst}</p>
          </div>
        </div>
      );
    case 'app':
      return (
        <div className={`onderstroom-item onderstroom-app${fade}`} role="note" aria-label={aria}>
          <div className="onderstroom-app-bub">
            <p className="onderstroom-app-van" aria-hidden="true">
              {line.van}
            </p>
            <p className="onderstroom-app-tekst">{line.tekst}</p>
            <span className="onderstroom-app-ticks" aria-hidden="true">
              ✓✓
            </span>
          </div>
        </div>
      );
    case 'lens':
      return (
        <div className={`onderstroom-item onderstroom-lens${fade}`} role="note" aria-label={aria}>
          <p className="onderstroom-lens-label">Privé · buiten het bedrijfsplatform</p>
          <div className="onderstroom-lens-glas">
            <p className="onderstroom-lens-meta" aria-hidden="true">
              {line.van}
              {line.naar ? ` → ${line.naar}` : ''}
            </p>
            <p className="onderstroom-lens-tekst">{line.tekst}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
