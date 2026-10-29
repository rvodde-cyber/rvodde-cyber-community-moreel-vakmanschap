import type { FilmScript } from '../filmSequences';
import { episodeMeta } from '../episodes/meta';
import type { EpisodeId } from '../episodes/meta';

function trailer(ep: Exclude<EpisodeId, 4>): FilmScript {
  const m = episodeMeta(ep);
  return {
    id: `trailer-ep${ep}`,
    label: `Trailer aflevering ${ep}`,
    titleMark: 'RECEPT',
    titleAfter: `AFLEVERING ${ep}`,
    titleEp: m.titel,
    duration: 12000,
    cues: [
      { at: 200, kind: 'text', text: `${m.jaar}` },
      { at: 2800, kind: 'blank' },
      { at: 3200, kind: 'shot', img: `I${ep}`, zoom: 'in' },
      { at: 3800, kind: 'sub', text: 'Concepttrailer — beeld I' + ep + ' volgt' },
      { at: 7200, kind: 'tick' },
      { at: 9000, kind: 'title' },
    ],
  };
}

function slot(ep: Exclude<EpisodeId, 4>, line: string): FilmScript {
  return {
    id: `slot-ep${ep}`,
    label: `Slot aflevering ${ep}`,
    titleMark: 'RECEPT',
    duration: 10000,
    cues: [
      { at: 400, kind: 'text', text: 'EINDE DEEL' },
      { at: 2400, kind: 'shot', img: `I${ep}`, zoom: 'pan' },
      { at: 3000, kind: 'sub', text: line },
      { at: 7000, kind: 'boom', soft: true },
    ],
  };
}

export const SKELETON_TRAILERS: Record<Exclude<EpisodeId, 4>, FilmScript> = {
  1: trailer(1),
  2: trailer(2),
  3: trailer(3),
  5: trailer(5),
};

export const SKELETON_SLOTS: Record<Exclude<EpisodeId, 4>, FilmScript> = {
  1: slot(1, 'Harrie legt de telefoon neer. Morgen moet iemand ja of nee durven zeggen.'),
  2: slot(2, 'Gerrit roept nog één keer sneller. De band antwoordt met stilte.'),
  3: slot(3, 'Harrie kijkt van Sanne naar Marco. Het MT moet straks ook kiezen.'),
  5: slot(5, 'In de reflectie van het glas flitst een schuur die niemand meer bezoekt.'),
};
