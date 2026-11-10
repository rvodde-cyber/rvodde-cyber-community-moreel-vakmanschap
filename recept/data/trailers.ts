import { EPISODES, type EpisodeId } from './episodes/meta';
import type { EpisodeTrailerDef } from './schemas/trailers.schema';
import { trailersRecordSchema } from './schemas/trailers.schema';

const t = (s: string) => s;

export const EPISODE_TRAILERS: Record<EpisodeId, EpisodeTrailerDef> = {
  1: {
    loopPeriode: '1984',
    shots: [
      { code: 'I1', ms: 4000, beweging: 'in', tekst: t('Berkel-Enschot, 1984.') },
      { code: 'T1', ms: 3000, beweging: 'pan-rechts', tekst: t('Harrie maakt worstenbroodjes. De machines bouwt hij zelf.') },
      { code: 'W1', ms: 3000, beweging: 'in', tekst: t('Dan komt er een bestelling van tien keer zoveel.') },
      { code: 'C1', ms: 4000, beweging: 'pan-links', tekst: t('Wat schrijf je op? En wat niet?') },
      { code: 'L1', ms: 3000, beweging: 'in', tekst: t('Jullie zijn de zus van Harrie. Niemand ziet jullie. Jullie beslissen.') },
    ],
    titelkaart: { deel: 'Deel 1', naam: 'Alles met de hand', jaar: 1984, ms: 4000 },
  },
  2: {
    shots: [
      { code: 'I2', ms: 4000, beweging: 'in', tekst: t('Loven, Tilburg, 1996.') },
      { code: 'TR2-2', ms: 4000, beweging: 'pan-rechts', tekst: t('Eerst een heel worstenbroodje. Nu elke dag dezelfde handeling.') },
      { code: 'TR2-3', ms: 3000, beweging: 'in', tekst: t('Mensen schrijven wat ze niet hardop zeggen.') },
      { code: 'TR2-4', ms: 3000, beweging: 'in', tekst: t('Veertig handtekeningen. Ze willen meepraten.') },
      { code: 'TR2-5', ms: 4000, beweging: 'pan-links', tekst: t('Harrie kent iedereen. Bijna.') },
    ],
    titelkaart: { deel: 'Deel 2', naam: 'Sneller, Gerrit', jaar: 1996, ms: 4000 },
  },
  3: {
    shots: [
      { code: 'TR3-1', ms: 4000, beweging: 'in', tekst: t('Tilburg, 2009.') },
      { code: 'TR3-2', ms: 3000, beweging: 'pan-rechts', tekst: t('Van Gorp Machinebouw B.V. Drie vestigingen.') },
      { code: 'TR3-3', ms: 4000, beweging: 'in', tekst: t('Er komen cijfers.') },
      { code: 'TR3-4', ms: 3000, beweging: 'in', tekst: t('Wat wordt hardop gezegd? En wat wordt gestuurd?') },
      { code: 'TR3-5', ms: 4000, beweging: 'pan-links', tekst: t('Niet iedereen praat mee. Jullie ook niet.') },
    ],
    titelkaart: { deel: 'Deel 3', naam: 'Een Van Gorp aan het roer', jaar: 2009, ms: 4000 },
  },
  4: {
    shots: [
      { code: 'T4', ms: 4000, beweging: 'in', tekst: t('Vossenberg, Tilburg, 2026.') },
      {
        code: 'TR4-2',
        ms: 4000,
        beweging: 'pan-rechts',
        tekst: t('Rond 2020 zocht Defensie productiecapaciteit voor drones. Ze kwamen bij Van Gorp uit.'),
      },
      { code: 'L4', ms: 3000, beweging: 'in', tekst: t('Alles wordt gemeten.') },
      { code: 'TR4-4', ms: 3000, beweging: 'in', tekst: t('De norm komt van het systeem. Ans voert hem uit.') },
      { code: 'TR4-5', ms: 4000, beweging: 'pan-links', tekst: t('De meeste flexkrachten zijn namen op een lijst.') },
    ],
    titelkaart: { deel: 'Deel 4', naam: 'Het dashboard liegt niet', jaar: 2026, ms: 4000 },
  },
  5: {
    shots: [
      { code: 'TR5-1', ms: 4000, beweging: 'in', tekst: t('Van Gorp Groep, 2036.') },
      { code: 'TR5-2', ms: 3000, beweging: 'pan-rechts', tekst: t('Alles wordt gemeten.') },
      { code: 'TR5-3', ms: 3000, beweging: 'in', tekst: t('Berichten komen binnen op je lens.') },
      { code: 'TR5-4', ms: 4000, beweging: 'uit', tekst: t('Er staat nog een schuur. Er ligt nog een schrift.') },
      { code: 'L1', ms: 3000, beweging: 'in', tekst: t('Een investeerder wil antwoord.') },
    ],
    titelkaart: { deel: 'Deel 5', naam: 'Wie heeft het schrift?', jaar: 2036, ms: 4000 },
  },
};

for (const meta of EPISODES) {
  EPISODE_TRAILERS[meta.id].titelkaart.naam = meta.titel;
}

export function trailerVoorAflevering(episode: EpisodeId): EpisodeTrailerDef {
  return EPISODE_TRAILERS[episode];
}

/** Volgorde voor schermlezer (alle teksten + titelkaart). */
export function trailerVerborgenTekst(episode: EpisodeId): string[] {
  const def = trailerVoorAflevering(episode);
  const tk = def.titelkaart;
  return [
    ...def.shots.map((s) => s.tekst),
    `${tk.deel} · ${tk.naam} · ${tk.jaar}`,
  ];
}

const parsed = trailersRecordSchema.safeParse(EPISODE_TRAILERS);
if (!parsed.success) {
  throw new Error(`EPISODE_TRAILERS ongeldig: ${parsed.error.message}`);
}
