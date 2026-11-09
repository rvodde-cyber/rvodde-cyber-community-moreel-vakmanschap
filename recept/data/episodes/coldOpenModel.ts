export type OnderstroomKanaal = 'kantlijn' | 'plakbriefje' | 'sms' | 'app' | 'lens';

export type KantlijnHandschrift = 'potlood' | 'blokletters';

export type OnderstroomLineDef = {
  type: 'onderstroom';
  kanaal: OnderstroomKanaal;
  van: string;
  naar?: string;
  tekst: string;
  doorgehaald?: boolean;
  typIndicator?: boolean;
  /** Alleen kantlijn: potlood (Lies) of blokletters (Gerrit). */
  handschrift?: KantlijnHandschrift;
};

/** Invoeging na een gesproken/titelregel (index in `lines`). */
export type OnderstroomInsert = OnderstroomLineDef & { afterIndex: number };

export type ColdTimelineStep =
  | { kind: 'speech'; speaker: string; text: string }
  | { kind: 'onderstroom'; line: OnderstroomLineDef }
  | { kind: 'onderstroom-typing'; van: string; naar?: string; kanaal: OnderstroomKanaal };
