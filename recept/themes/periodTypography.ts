/** Demo A4 — ui/data-strings in PERIOD_THEMES (dashboard) ongewijzigd; display/data-koppeling via recept.css :root. */
export const PERIOD_2026_UI_FONT = 'system-ui, sans-serif';
export const PERIOD_2026_DATA_FONT = 'ui-monospace, monospace';

export const READABLE_SANS_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export type PeriodFontSet = {
  display: string;
  hand: string;
  ui: string;
  data: string;
};

export type ResolvedPeriodFonts = PeriodFontSet & {
  overridesRootTypography: boolean;
  readableTitleOverride: boolean;
};

/** Resolveert stacks voor CSS-variabelen (testbaar). */
export function resolvePeriodFonts(
  fonts: PeriodFontSet,
  periodKey: '1984' | '1996' | '2009' | '2026' | '2036',
  readableFont: boolean,
): ResolvedPeriodFonts {
  const isDemo2026 = periodKey === '2026';
  const hand = readableFont ? READABLE_SANS_STACK : fonts.hand;
  const display = readableFont ? READABLE_SANS_STACK : fonts.display;
  return {
    display,
    hand,
    ui: fonts.ui,
    data: fonts.data,
    overridesRootTypography: !isDemo2026,
    readableTitleOverride: readableFont,
  };
}

export function periodFontStyleProperties(
  resolved: ResolvedPeriodFonts,
  periodKey: '1984' | '1996' | '2009' | '2026' | '2036',
  readableFont: boolean,
): Record<string, string> {
  const vars: Record<string, string> = {
    '--font-display': resolved.display,
    '--font-hand': resolved.hand,
    '--font-ui': resolved.ui,
    '--font-data': resolved.data,
  };
  if (resolved.overridesRootTypography) {
    vars['--sans'] = resolved.ui;
    vars['--data'] = resolved.data;
    vars['--title'] = resolved.display;
    vars['--serif'] = resolved.ui;
  } else if (resolved.readableTitleOverride) {
    vars['--title'] = READABLE_SANS_STACK;
  }
  if (readableFont && periodKey === '2036') {
    vars['--font-display'] = READABLE_SANS_STACK;
  }
  return vars;
}
