import { DILEMMA_EP4_PIOTR, type DilemmaKeuze } from '@data/dilemmas/ep4-piotr';
import { ROUNDS } from '@data/rounds';
import type { ComputeResult } from '@engine/types';
import type { HiddenMetersState, RoundUiState } from './uiTypes';

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function has(cards: string[], id: string) {
  return cards.includes(id);
}

function pushLog(lines: string[], delta: number, text: string) {
  lines.push(`${delta > 0 ? '▲' : '▼'} ${text}`);
}

/** Verborgen meters na een ronde-besluit (zonder dilemma-default). */
export function applyHiddenAfterRound(
  hidden: HiddenMetersState,
  round: 1 | 2,
  r: RoundUiState,
  res: ComputeResult,
): HiddenMetersState {
  let mm = hidden.menselijkeMaat;
  let eer = hidden.eerlijkheid;
  const wm = [...hidden.logMm];
  const we = [...hidden.logEer];

  const marco: Record<string, number> = {};
  for (const p of ROUNDS[round].posten) marco[p.id] = p.marco;

  const c = r.cards;
  if (round === 1) {
    if (has(c, 'D')) {
      mm += 8;
      pushLog(wm, 8, 'De norm begrensd en de ploeg laten meebeslissen');
    }
    if (has(c, 'E')) {
      mm += 6;
      pushLog(wm, 6, 'Ans en de nachtdienst steun gegeven');
    }
    if (has(c, 'B')) {
      mm -= 8;
      pushLog(wm, -8, 'Een bonus voor aanwezigheid, ook voor wie echt ziek was');
    }
    if (has(c, 'C')) {
      mm -= 5;
      pushLog(wm, -5, 'Vaste ploegen aangevuld met wisselende flexkrachten');
    }
  } else {
    if (has(c, 'F')) {
      mm += 8;
      pushLog(wm, 8, 'Ruimte gegeven voor gewetensbezwaren');
    }
    if (has(c, 'H')) {
      mm += 6;
      pushLog(wm, 6, 'Regels geschrapt die het werk overnamen');
    }
    if (has(c, 'I')) {
      mm += 4;
      pushLog(wm, 4, 'Geïnvesteerd in ploegleiders');
    }
    if (has(c, 'G')) {
      mm -= 6;
      pushLog(wm, -6, 'TEMPO de mensen laten inroosteren voor defensiewerk');
    }
    if (has(c, 'J')) {
      mm -= 4;
      pushLog(wm, -4, 'Een extra laag regels toegevoegd');
    }
  }

  if (r.pilot === 'pilot') {
    mm -= 5;
    pushLog(wm, -5, `Ronde ${round}: het advies van PILOT gevolgd zonder eigen weging`);
  }

  const dm = (r.bud.mensen ?? 0) - (marco.mensen ?? 0);
  if (dm >= 40000) {
    const d = Math.min(5, Math.round(dm / 40000));
    mm += d;
    pushLog(wm, d, `Ronde ${round}: meer geld naar mensen dan Marco voorstelde`);
  }
  if (dm <= -40000) {
    const d = Math.min(5, Math.round(-dm / 40000));
    mm -= d;
    pushLog(wm, -d, `Ronde ${round}: minder geld naar mensen dan Marco voorstelde`);
  }

  const dd = (r.bud.directie ?? 0) - (marco.directie ?? 0);
  if (dd < 0) {
    eer += 5;
    pushLog(we, 5, `Ronde ${round}: de directie leverde zelf iets in`);
  }
  if (dd > 0) {
    eer -= 5;
    pushLog(we, -5, `Ronde ${round}: meer geld naar de directie dan voorgesteld`);
  }
  if (res.contra) {
    eer -= 4;
    pushLog(we, -4, `Ronde ${round}: tegenstrijdige signalen afgegeven`);
  }
  if (r.minOn && r.min.replace(/\s/g, '').length > 3) {
    eer += 4;
    pushLog(we, 4, `Ronde ${round}: een minderheidsstandpunt vastgelegd`);
  }

  return {
    menselijkeMaat: clamp(Math.round(mm), 0, 100),
    eerlijkheid: clamp(Math.round(eer), 0, 100),
    logMm: wm,
    logEer: we,
  };
}

export function applyDilemmaHidden(
  hidden: HiddenMetersState,
  choice: DilemmaKeuze,
  privéTekst: string,
): HiddenMetersState {
  let mm = hidden.menselijkeMaat;
  let eer = hidden.eerlijkheid;
  const wm = [...hidden.logMm];
  const we = [...hidden.logEer];

  const fx = DILEMMA_EP4_PIOTR.effecten[choice];
  if (choice === 'prive') {
    const min = DILEMMA_EP4_PIOTR.effecten.prive.minTekst ?? 10;
    if (privéTekst.replace(/\s/g, '').length < min) return hidden;
  }

  eer += fx.eerlijkheid;
  mm += fx.menselijkeMaat;
  pushLog(we, fx.eerlijkheid, fx.logEer);
  pushLog(wm, fx.menselijkeMaat, fx.logMm);

  return {
    menselijkeMaat: clamp(Math.round(mm), 0, 100),
    eerlijkheid: clamp(Math.round(eer), 0, 100),
    logMm: wm,
    logEer: we,
  };
}

/** Als Piotr-bericht kwam maar geen keuze: referentie hidden() default. */
export function applyDilemmaDefaultIfNeeded(
  hidden: HiddenMetersState,
  dilemmaDone: boolean,
  piotrDelivered: boolean,
): HiddenMetersState {
  if (!piotrDelivered || dilemmaDone) return hidden;
  return applyDilemmaHidden(hidden, 'niets', '');
}
