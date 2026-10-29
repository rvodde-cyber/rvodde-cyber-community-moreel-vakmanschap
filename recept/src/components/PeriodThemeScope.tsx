import type { ReactNode } from 'react';
import { PERIOD_THEMES, type PeriodKey } from '../../themes/periods';

type Props = {
  periodKey: PeriodKey;
  children: ReactNode;
  className?: string;
};

/** Past dashboardkleuren en widget-label per tijdperk toe. */
export function PeriodThemeScope({ periodKey, children, className }: Props) {
  const t = PERIOD_THEMES[periodKey];
  return (
    <div
      className={className ? `period-scope ${className}` : 'period-scope'}
      style={
        {
          '--period-bg': t.colors.bg,
          '--period-panel': t.colors.panel,
          '--period-accent': t.colors.accent,
          '--period-text': t.colors.text,
          '--period-muted': t.colors.muted,
          '--period-ui-font': t.fonts.ui,
          '--period-data-font': t.fonts.data,
        } as React.CSSProperties
      }
    >
      <p className="period-label">{t.dashboardLabel}</p>
      <p className="period-widgets" aria-hidden="true">
        {t.widgets.join(' · ')}
      </p>
      {children}
    </div>
  );
}
