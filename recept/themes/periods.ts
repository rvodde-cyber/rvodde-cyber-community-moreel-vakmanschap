/** Dashboard skin per aflevering (stap 7 vult widgets; 2026 volgt demo-controlekamer). */
export type PeriodKey = '1984' | '1996' | '2009' | '2026' | '2036';

export interface PeriodTheme {
  key: PeriodKey;
  jaar: number;
  titel: string;
  dashboardLabel: string;
  colors: {
    bg: string;
    panel: string;
    accent: string;
    text: string;
    muted: string;
    danger: string;
    success: string;
  };
  fonts: {
    ui: string;
    data: string;
  };
  widgets: ('meters' | 'ticker' | 'news' | 'kasboek' | 'terminal' | 'spreadsheet' | 'holding')[];
}

export const PERIOD_THEMES: Record<PeriodKey, PeriodTheme> = {
  '1984': {
    key: '1984',
    jaar: 1984,
    titel: 'Alles met de hand',
    dashboardLabel: 'Kasboek op de keukentafel',
    colors: {
      bg: '#f4efe6',
      panel: '#fff9f0',
      accent: '#8b4513',
      text: '#2c2416',
      muted: '#6b5d4f',
      danger: '#a33',
      success: '#3d6b3d',
    },
    fonts: { ui: 'Georgia, serif', data: 'ui-monospace, monospace' },
    widgets: ['kasboek', 'meters'],
  },
  '1996': {
    key: '1996',
    jaar: 1996,
    titel: 'Sneller, Gerrit',
    dashboardLabel: 'Productieteller',
    colors: {
      bg: '#0a120a',
      panel: '#0f1a0f',
      accent: '#33ff66',
      text: '#b8ffb8',
      muted: '#5a8a5a',
      danger: '#ff6666',
      success: '#33ff66',
    },
    fonts: { ui: 'system-ui, sans-serif', data: '"Courier New", monospace' },
    widgets: ['terminal', 'meters', 'ticker'],
  },
  '2009': {
    key: '2009',
    jaar: 2009,
    titel: 'Een Van Gorp aan het roer',
    dashboardLabel: 'Spreadsheet en eerste BI',
    colors: {
      bg: '#e8e8e8',
      panel: '#ffffff',
      accent: '#217346',
      text: '#1a1a1a',
      muted: '#666',
      danger: '#c00',
      success: '#217346',
    },
    fonts: { ui: 'Calibri, system-ui, sans-serif', data: 'Consolas, monospace' },
    widgets: ['spreadsheet', 'meters'],
  },
  '2026': {
    key: '2026',
    jaar: 2026,
    titel: 'Het dashboard liegt niet',
    dashboardLabel: 'TEMPO controlekamer',
    colors: {
      bg: '#0b1016',
      panel: '#121a22',
      accent: '#3ec8e0',
      text: '#e8eef2',
      muted: '#8a9aa8',
      danger: '#ff8c42',
      success: '#3ec8e0',
    },
    fonts: { ui: 'system-ui, sans-serif', data: 'ui-monospace, monospace' },
    widgets: ['meters', 'ticker', 'news'],
  },
  '2036': {
    key: '2036',
    jaar: 2036,
    titel: 'Wie heeft het schrift?',
    dashboardLabel: 'Holding-app',
    colors: {
      bg: '#f5f7fa',
      panel: '#ffffff',
      accent: '#1a56db',
      text: '#111827',
      muted: '#6b7280',
      danger: '#dc2626',
      success: '#059669',
    },
    fonts: { ui: 'system-ui, sans-serif', data: 'ui-monospace, monospace' },
    widgets: ['holding', 'meters'],
  },
};
