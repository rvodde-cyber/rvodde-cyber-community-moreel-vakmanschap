import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { PERIOD_THEMES, type PeriodKey } from '../../themes/periods';
import {
  periodFontStyleProperties,
  resolvePeriodFonts,
} from '../../themes/periodTypography';
import { loadPeriodFonts } from '../fonts/loadPeriodFonts';

function useReadableFontSetting(): boolean {
  const [on, setOn] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.readableFont === '1',
  );
  useEffect(() => {
    const sync = () => setOn(document.documentElement.dataset.readableFont === '1');
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-readable-font'] });
    return () => obs.disconnect();
  }, []);
  return on;
}

type Props = {
  periodKey: PeriodKey;
  children: ReactNode;
};

/** Zet --font-* en (behalve demo 2026) --sans/--data/--title voor het tijdperk. */
export function PeriodTypographyScope({ periodKey, children }: Props) {
  const readableFont = useReadableFontSetting();
  const theme = PERIOD_THEMES[periodKey];
  const resolved = resolvePeriodFonts(theme.fonts, periodKey, readableFont);
  const style = periodFontStyleProperties(resolved, periodKey, readableFont) as CSSProperties;

  useEffect(() => {
    void loadPeriodFonts(periodKey);
  }, [periodKey]);

  return (
    <div
      className={`period-typography period-typography--${periodKey}${readableFont ? ' period-typography--readable' : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
