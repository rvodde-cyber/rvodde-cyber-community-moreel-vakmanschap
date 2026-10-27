import type { Phase } from '../game/uiTypes';

const STEPS = ['COLD OPEN', 'ONDERZOEK', 'MT-BESLUIT', 'UITKOMST'];

const phaseIndex: Partial<Record<Phase, number>> = {
  intro: 0,
  cold: 0,
  onderzoek: 1,
  besluit: 2,
  uitkomst: 3,
  scan: 3,
};

export function StepsNav({ phase }: { phase: Phase }) {
  const i0 = phaseIndex[phase] ?? 0;
  return (
    <ol className="steps">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={[i < i0 ? 'done' : '', i === i0 ? 'now' : ''].filter(Boolean).join(' ')}
          aria-current={i === i0 ? 'step' : undefined}
        >
          {i + 1} {label}
        </li>
      ))}
    </ol>
  );
}
