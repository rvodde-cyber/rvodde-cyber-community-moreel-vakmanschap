import { FIREFLY_MAX_BODY, FIREFLY_SUFFIX, REFLECTIE_TEKST, SCHEMA_ID } from "./constants";
import type {
  FieldIssue,
  KaartPakket,
  KaartPakketKaart,
  Complexiteit,
} from "./types";

const HEX = /^#[0-9A-Fa-f]{6}$/;
const COMPLEX: Complexiteit[] = ["micro", "meso", "macro"];

export function parseKaartpakketJson(raw: string): { data?: KaartPakket; issues: FieldIssue[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { issues: [{ path: "", message: "Geen geldige JSON.", blocking: true }] };
  }
  return validateKaartpakket(parsed);
}

export function validateKaartpakket(input: unknown): { data?: KaartPakket; issues: FieldIssue[] } {
  const issues: FieldIssue[] = [];
  if (!input || typeof input !== "object") {
    return { issues: [{ path: "", message: "Root moet een object zijn.", blocking: true }] };
  }
  const o = input as Record<string, unknown>;
  if (o.schema !== SCHEMA_ID) {
    issues.push({
      path: "schema",
      message: `schema moet "${SCHEMA_ID}" zijn.`,
      blocking: true,
    });
  }

  const cat = o.categorie;
  if (!cat || typeof cat !== "object") {
    issues.push({ path: "categorie", message: "categorie ontbreekt.", blocking: true });
  } else {
    const c = cat as Record<string, unknown>;
    if (typeof c.naam_nl !== "string" || !c.naam_nl.trim()) {
      issues.push({ path: "categorie.naam_nl", message: "naam_nl is verplicht.", blocking: true });
    }
    const kleur = c.sector_kleur;
    if (typeof kleur !== "string" || !HEX.test(kleur.trim())) {
      issues.push({
        path: "categorie.sector_kleur",
        message: "sector_kleur moet #RRGGBB zijn.",
        blocking: true,
      });
    }
  }

  if (!Array.isArray(o.kaarten) || o.kaarten.length === 0) {
    issues.push({ path: "kaarten", message: "Minimaal één kaart verplicht.", blocking: true });
  }

  const kaarten = Array.isArray(o.kaarten) ? o.kaarten : [];
  const nummers = new Set<string>();
  for (let i = 0; i < kaarten.length; i++) {
    const prefix = `kaarten[${i}]`;
    const k = kaarten[i];
    if (!k || typeof k !== "object") {
      issues.push({ path: prefix, message: "Kaart moet een object zijn.", blocking: true });
      continue;
    }
    const card = k as Record<string, unknown>;
    if (typeof card.nummer !== "string" || !card.nummer.trim()) {
      issues.push({ path: `${prefix}.nummer`, message: "nummer ontbreekt.", blocking: true });
    } else if (nummers.has(card.nummer)) {
      issues.push({
        path: `${prefix}.nummer`,
        message: `Dubbel nummer: ${card.nummer}.`,
        blocking: true,
      });
    } else {
      nummers.add(card.nummer);
    }
    if (typeof card.bestandsnaam !== "string" || !card.bestandsnaam.trim()) {
      issues.push({ path: `${prefix}.bestandsnaam`, message: "bestandsnaam ontbreekt.", blocking: true });
    }
    if (typeof card.titel_nl !== "string" || !card.titel_nl.trim()) {
      issues.push({ path: `${prefix}.titel_nl`, message: "titel_nl is leeg.", blocking: true });
    }
    if (!Array.isArray(card.verhaal_nl) || card.verhaal_nl.length === 0) {
      issues.push({ path: `${prefix}.verhaal_nl`, message: "verhaal_nl ontbreekt.", blocking: true });
    }
    const cx = card.complexiteit;
    if (typeof cx !== "string" || !COMPLEX.includes(cx as Complexiteit)) {
      issues.push({
        path: `${prefix}.complexiteit`,
        message: "complexiteit moet micro, meso of macro zijn.",
        blocking: true,
      });
    }
    if (typeof card.firefly_prompt_en !== "string" || !card.firefly_prompt_en.trim()) {
      issues.push({
        path: `${prefix}.firefly_prompt_en`,
        message: "firefly_prompt_en is verplicht.",
        blocking: true,
      });
    } else {
      const composed = composeFireflyPrompt(card.firefly_prompt_en);
      if (composed.length > 1024) {
        issues.push({
          path: `${prefix}.firefly_prompt_en`,
          message: `Samengestelde prompt te lang (${composed.length} tekens, max 1024).`,
          blocking: true,
        });
      }
      if (card.firefly_prompt_en.length > FIREFLY_MAX_BODY) {
        issues.push({
          path: `${prefix}.firefly_prompt_en`,
          message: `firefly_prompt_en max ${FIREFLY_MAX_BODY} tekens.`,
          blocking: true,
        });
      }
    }
  }

  const blocking = issues.filter((i) => i.blocking);
  if (blocking.length) return { issues };

  return {
    data: normalizeKaartpakket(o),
    issues: issues.filter((i) => !i.blocking),
  };
}

function normalizeKaartpakket(o: Record<string, unknown>): KaartPakket {
  const cat = o.categorie as Record<string, unknown>;
  return {
    schema: SCHEMA_ID,
    categorie: {
      naam_nl: String(cat.naam_nl).trim(),
      naam_en: typeof cat.naam_en === "string" ? cat.naam_en : undefined,
      sector_kleur: String(cat.sector_kleur).trim().toUpperCase(),
    },
    batch: o.batch as KaartPakket["batch"],
    kaarten: (o.kaarten as KaartPakketKaart[]).map(normalizeKaart),
    uitzonderingen: Array.isArray(o.uitzonderingen)
      ? (o.uitzonderingen as KaartPakket["uitzonderingen"])
      : [],
  };
}

function normalizeKaart(k: KaartPakketKaart): KaartPakketKaart {
  return {
    ...k,
    foto_status: k.foto_status ?? "wacht",
    foto_bestand: k.foto_bestand ?? "",
    opmerkingen: k.opmerkingen ?? "",
  };
}

export function composeFireflyPrompt(body: string): string {
  const trimmed = body.trim();
  const suffix = FIREFLY_SUFFIX.trim();
  if (trimmed.endsWith(suffix) || trimmed.includes(suffix)) return trimmed;
  return `${trimmed} ${suffix}`.trim();
}

export function wordCountParagraphs(paragraphs: string[]): number {
  return paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function analyzeCard(card: KaartPakketKaart, hasPhoto: boolean): { warnings: string[]; blocking: string[] } {
  const warnings: string[] = [];
  const blocking: string[] = [];
  const story = card.verhaal_nl.join("\n");
  const wc = wordCountParagraphs(card.verhaal_nl);
  if (hasPhoto && card.verhaal_nl.length !== 3) {
    blocking.push("Met foto: verhaal_nl moet precies 3 alinea's hebben.");
  }
  if (wc < 105 || wc > 135) {
    warnings.push(`Woordaantal NL ${wc} (richting 115–125).`);
  }
  if (/^#|^-|\* /.m.test(story)) {
    warnings.push("Verhaal bevat mogelijke kopjes of opsomming.");
  }
  const last = card.verhaal_nl[card.verhaal_nl.length - 1] ?? "";
  if (!last.trim().endsWith("?")) {
    warnings.push("Slotvraag ontbreekt (laatste alinea eindigt niet op ?).");
  }
  if (last.includes(REFLECTIE_TEKST) || last.trim() === REFLECTIE_TEKST) {
    warnings.push("Slotvraag mag niet gelijk zijn aan de reflectievraag.");
  }
  const forbidden = /complexiteitsmodel|Kim Meijer-model/i;
  if (forbidden.test(story) || forbidden.test(card.titel_nl)) {
    warnings.push('Vermijd "complexiteitsmodel" of "Kim Meijer-model".');
  }
  if (!card.titel_en?.trim()) warnings.push("titel_en ontbreekt.");
  if (!card.rechtvaardiging_nl?.trim()) warnings.push("rechtvaardiging_nl ontbreekt (niet op kaart).");
  if (!card.rechtvaardiging_en?.trim()) warnings.push("rechtvaardiging_en ontbreekt.");
  return { warnings, blocking };
}

export function complexitySpread(kaarten: KaartPakketKaart[]) {
  const counts = { micro: 0, meso: 0, macro: 0 };
  for (const k of kaarten) counts[k.complexiteit] += 1;
  const total = kaarten.length || 1;
  return { counts, mesoPct: counts.meso / total };
}
