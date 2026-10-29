import { DILEMMA_EP4_PIOTR, type DilemmaKeuze } from '@data/dilemmas/ep4-piotr';
import type { DilemmaState } from '../game/uiTypes';

type Props = {
  dilemma: DilemmaState;
  onChoice: (c: DilemmaKeuze) => void;
  onText: (t: string) => void;
  onConfirm: () => void;
};

export function DilemmaChoices({ dilemma, onChoice, onText, onConfirm }: Props) {
  const { choice, text, done } = dilemma;
  if (done) {
    const lbl = {
      niets: 'Jullie laten het bericht liggen.',
      groep: 'Jullie hebben dit in de groep gezet.',
      prive: `Jullie besluit: ${text}`,
    } as const;
    return (
      <span className="fw" style={{ color: 'var(--gold)', fontStyle: 'normal', marginTop: 6 }}>
        {lbl[choice ?? 'niets']}
      </span>
    );
  }

  const confirmLabel =
    choice === 'niets'
      ? 'Bericht laten liggen'
      : choice === 'groep'
        ? 'In de groep zetten'
        : 'Besluit vastleggen';

  return (
    <>
      <div className="dbtns">
        {DILEMMA_EP4_PIOTR.keuzes.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={choice === k.id}
            onClick={() => onChoice(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>
      {choice === 'prive' ? (
        <>
          <label className="lab" htmlFor="dtext">
            Wat besluiten jullie, en waarom?
          </label>
          <textarea
            className="dtext"
            id="dtext"
            maxLength={400}
            value={text}
            onChange={(e) => onText(e.target.value)}
          />
        </>
      ) : null}
      {choice ? (
        <button type="button" className="btn" style={{ marginTop: 6 }} onClick={onConfirm}>
          {confirmLabel}
        </button>
      ) : null}
    </>
  );
}
