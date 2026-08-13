// Deel-codes (briefing §7).
//
// Een deel-code is de enige manier waarop een individuele invulling een device
// verlaat, en dat gebeurt alleen doordat de invuller de code zelf doorstuurt.
// De code bevat uitsluitend de twintig antwoorden — geen naam, geen tijdstip,
// geen apparaat- of sessiegegevens. De optionele bedrijfsnaam staat er leesbaar
// vóór, zodat de verzamelaar codes van hetzelfde bedrijf herkent.
//
// Vorm:  ACME-A7X2K9M4P1Z3
//        │    ││        └── checksum, 2 tekens
//        │    │└─────────── antwoorden, blokken van 5 tekens
//        │    └───────────── versie
//        └────────────────── leesbaar voorvoegsel (optioneel)
//
// De antwoorden worden per blok van tien als grondtal-5-getal gepakt en in
// base36 geschreven. Dat houdt de code kort genoeg om via WhatsApp of mail door
// te sturen zonder afbreekfouten.

import { MAX_ANSWER, MIN_ANSWER, statements } from "../config/statements";

const VERSION = "A";
const ANSWERS_PER_BLOCK = 10;
const BLOCK_LENGTH = 5; // 5^10 past ruim in 5 base36-tekens
const CHECKSUM_LENGTH = 2;
const CHECKSUM_MODULO = 36 ** CHECKSUM_LENGTH;
const PREFIX_MAX_LENGTH = 12;

const BLOCK_COUNT = Math.ceil(statements.length / ANSWERS_PER_BLOCK);
const BODY_LENGTH = 1 + BLOCK_COUNT * BLOCK_LENGTH + CHECKSUM_LENGTH;

/** Foutcodes bij het inlezen; de teksten staan in ../config/copy.js. */
export const ShareCodeError = {
  EMPTY: "empty",
  MALFORMED: "malformed",
  WRONG_LENGTH: "wrongLength",
  UNKNOWN_VERSION: "unknownVersion",
  CHECKSUM: "checksum",
  OUT_OF_RANGE: "outOfRange",
};

/**
 * Maakt een deel-code van een ingevulde scan.
 *
 * @param {Record<string, number>} answers statement-id → 1–5
 * @param {string} [companyName] wordt als leesbaar voorvoegsel meegegeven
 */
export function encodeShareCode(answers, companyName = "") {
  const values = statements.map((statement) => {
    const answer = answers[statement.id];
    if (!isValidAnswer(answer)) {
      throw new Error(`Onvolledige scan: geen antwoord op ${statement.id}.`);
    }
    return answer - MIN_ANSWER;
  });

  const body = [VERSION, encodeBlocks(values), checksumOf(values)].join("");
  const prefix = toPrefix(companyName);
  return prefix ? `${prefix}-${body}` : body;
}

/**
 * Leest één deel-code terug.
 *
 * @param {string} raw
 * @returns {{ok: true, answers: Record<string, number>, prefix: string}
 *   | {ok: false, error: string}}
 */
export function decodeShareCode(raw) {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return { ok: false, error: ShareCodeError.EMPTY };

  // Alles tot en met het laatste koppelteken is het leesbare voorvoegsel;
  // bedrijfsnamen mogen dus zelf ook koppeltekens bevatten.
  const cleaned = trimmed.replace(/\s+/g, "").toUpperCase();
  const split = cleaned.lastIndexOf("-");
  const prefix = split === -1 ? "" : cleaned.slice(0, split);
  const body = split === -1 ? cleaned : cleaned.slice(split + 1);

  if (!/^[0-9A-Z]+$/.test(body)) return { ok: false, error: ShareCodeError.MALFORMED };
  if (body.length !== BODY_LENGTH) return { ok: false, error: ShareCodeError.WRONG_LENGTH };
  if (body[0] !== VERSION) return { ok: false, error: ShareCodeError.UNKNOWN_VERSION };

  const payload = body.slice(1, 1 + BLOCK_COUNT * BLOCK_LENGTH);
  const checksum = body.slice(1 + BLOCK_COUNT * BLOCK_LENGTH);

  const values = decodeBlocks(payload);
  if (!values) return { ok: false, error: ShareCodeError.MALFORMED };
  if (values.some((value) => value < 0 || value > MAX_ANSWER - MIN_ANSWER)) {
    return { ok: false, error: ShareCodeError.OUT_OF_RANGE };
  }
  if (checksumOf(values) !== checksum) return { ok: false, error: ShareCodeError.CHECKSUM };

  const answers = Object.fromEntries(
    statements.map((statement, index) => [statement.id, values[index] + MIN_ANSWER])
  );
  return { ok: true, answers, prefix };
}

/**
 * Leest een plakveld met één code per regel.
 *
 * Lege regels worden genegeerd; elke overgebleven regel levert precies één
 * resultaat op, zodat de verzamelaar per regel ziet wat er misging.
 *
 * @param {string} text
 * @returns {{line: number, raw: string, ok: boolean, error?: string,
 *   answers?: Record<string, number>, prefix?: string}[]}
 */
export function parseShareCodes(text) {
  return (text ?? "")
    .split(/\r?\n/)
    .map((raw, index) => ({ raw: raw.trim(), line: index + 1 }))
    .filter((entry) => entry.raw.length > 0)
    .map((entry) => ({ ...entry, ...decodeShareCode(entry.raw) }));
}

/** Maakt van een bedrijfsnaam een kort, leesbaar voorvoegsel. */
export function toPrefix(companyName) {
  return (companyName ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, PREFIX_MAX_LENGTH);
}

function encodeBlocks(values) {
  let out = "";
  for (let start = 0; start < values.length; start += ANSWERS_PER_BLOCK) {
    const block = values.slice(start, start + ANSWERS_PER_BLOCK);
    let packed = 0;
    for (let i = block.length - 1; i >= 0; i -= 1) {
      packed = packed * 5 + block[i];
    }
    out += packed.toString(36).toUpperCase().padStart(BLOCK_LENGTH, "0");
  }
  return out;
}

function decodeBlocks(payload) {
  const values = [];
  for (let start = 0; start < payload.length; start += BLOCK_LENGTH) {
    let packed = parseInt(payload.slice(start, start + BLOCK_LENGTH), 36);
    if (!Number.isFinite(packed)) return null;
    const remaining = statements.length - values.length;
    for (let i = 0; i < Math.min(ANSWERS_PER_BLOCK, remaining); i += 1) {
      values.push(packed % 5);
      packed = Math.floor(packed / 5);
    }
    // Ongebruikte ruimte in het blok hoort leeg te zijn; is dat niet zo, dan is
    // de code beschadigd.
    if (packed !== 0) return null;
  }
  return values.length === statements.length ? values : null;
}

/** Gewogen checksum: verwisselde tekens vallen daardoor ook op. */
function checksumOf(values) {
  const sum = values.reduce((total, value, index) => total + value * (index + 1), 7);
  return (sum % CHECKSUM_MODULO).toString(36).toUpperCase().padStart(CHECKSUM_LENGTH, "0");
}

function isValidAnswer(value) {
  return typeof value === "number" && value >= MIN_ANSWER && value <= MAX_ANSWER;
}
