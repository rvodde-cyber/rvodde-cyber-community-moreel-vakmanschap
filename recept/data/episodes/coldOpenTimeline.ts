import type { ColdOpenDef } from './content';
import type { ColdTimelineStep, OnderstroomInsert } from './coldOpenModel';

function insertsAfterIndex(inserts: readonly OnderstroomInsert[] | undefined, idx: number) {
  if (!inserts?.length) return [];
  return inserts.filter((i) => i.afterIndex === idx);
}

/** Volledige afspeellijst: titel/hardop plus optionele onderstroom. */
export function buildColdTimeline(
  def: ColdOpenDef,
  onderstroomActief: boolean,
): readonly ColdTimelineStep[] {
  const steps: ColdTimelineStep[] = [];
  const inserts = onderstroomActief ? def.onderstroom : undefined;

  def.lines.forEach(([speaker, text], idx) => {
    steps.push({ kind: 'speech', speaker, text });
    for (const ins of insertsAfterIndex(inserts, idx)) {
      if (ins.typIndicator) {
        steps.push({
          kind: 'onderstroom-typing',
          van: ins.van,
          naar: ins.naar,
          kanaal: ins.kanaal,
        });
      } else {
        const { afterIndex: _a, typIndicator: _t, ...line } = ins;
        steps.push({ kind: 'onderstroom', line });
      }
    }
  });

  return steps;
}
