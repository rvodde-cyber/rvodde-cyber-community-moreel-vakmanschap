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
// De antwoorden worden per blok van tien als grondtal-5-getal gepakt en
// geschreven in het alfabet van Crockford: base32 zonder I, L, O en U. Daarmee
// vallen de klassieke leesfouten weg — een 1 kan niet met een I verward worden,
// een 0 niet met een O. Codes worden normaal gesproken gekopieerd, maar iemand
// die er een overtypt of voorleest loopt zo niet vast.

import { MAX_ANSWER, MIN_ANSWER, statements } from "../config/statements";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const BASE = ALPHABET.length;
/** Tekens die mensen door elkaar halen, teruggemapt op wat ze bedoelen. */
const CONFUSABLE = { O: "0", I: "1", L: "1" };

const VERSION = "A";
const ANSWERS_PER_BLOCK = 10;
const BLOCK_LENGTH = 5; // 5^10 past ruim in 5 base32-tekens
const CHECKSUM_LENGTH = 2;
const CHECKSUM_MODULO = BASE ** CHECKSUM_LENGTH;
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
  const body = normalise(split === -1 ? cleaned : cleaned.slice(split + 1));

  if ([...body].some((char) => !ALPHABET.includes(char))) {
    return { ok: false, error: ShareCodeError.MALFORMED };
  }
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
    out += toBase32(packed, BLOCK_LENGTH);
  }
  return out;
}

function decodeBlocks(payload) {
  const values = [];
  for (let start = 0; start < payload.length; start += BLOCK_LENGTH) {
    let packed = fromBase32(payload.slice(start, start + BLOCK_LENGTH));
    if (packed === null) return null;
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
  return toBase32(sum % CHECKSUM_MODULO, CHECKSUM_LENGTH);
}

function toBase32(value, length) {
  let out = "";
  let rest = value;
  for (let i = 0; i < length; i += 1) {
    out = ALPHABET[rest % BASE] + out;
    rest = Math.floor(rest / BASE);
  }
  return rest === 0 ? out : null;
}

function fromBase32(text) {
  let value = 0;
  for (const char of text) {
    const digit = ALPHABET.indexOf(char);
    if (digit === -1) return null;
    value = value * BASE + digit;
  }
  return value;
}

function normalise(body) {
  return [...body].map((char) => CONFUSABLE[char] ?? char).join("");
}

function isValidAnswer(value) {
  return typeof value === "number" && value >= MIN_ANSWER && value <= MAX_ANSWER;
}
