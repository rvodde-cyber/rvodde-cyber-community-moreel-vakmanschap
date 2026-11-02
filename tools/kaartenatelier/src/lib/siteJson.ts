import { complexitySpread } from "./schema";
import type { KaartPakket, KaartPakketKaart } from "./types";

export function buildSiteJsonFragment(
  pakket: KaartPakket,
  imagePaths: Record<string, string>
) {
  const slug = pakket.categorie.naam_nl
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return {
    meta: {
      set: pakket.categorie.naam_nl,
      language: ["nl", "en"],
      sector_color: pakket.categorie.sector_kleur,
      batch: pakket.batch ?? null,
    },
    cards: pakket.kaarten.map((c) => cardToSiteEntry(pakket, c, imagePaths[c.nummer])),
    fileName: `cards_${slug}.json`,
  };
}

function cardToSiteEntry(
  pakket: KaartPakket,
  card: KaartPakketKaart,
  imageRel?: string
) {
  const id = card.nummer.toLowerCase().replace(/\s+/g, "-");
  return {
    id,
    number: card.nummer,
    sector: {
      nl: pakket.categorie.naam_nl,
      en: pakket.categorie.naam_en ?? pakket.categorie.naam_nl,
      sector_color: pakket.categorie.sector_kleur,
    },
    title: { nl: card.titel_nl, en: card.titel_en ?? "" },
    story: { nl: card.verhaal_nl, en: card.verhaal_en ?? [] },
    reflection: {
      nl: "Wat zou jij doen en waarom? Welke waarden zijn hier in het spel?",
      en: "What would you do and why? Which values are at stake here?",
    },
    complexity: {
      level: card.complexiteit,
      stars: card.complexiteit === "micro" ? "★☆☆" : card.complexiteit === "meso" ? "★★☆" : "★★★",
      color: "#993556",
      justification: {
        nl: card.rechtvaardiging_nl ?? "",
        en: card.rechtvaardiging_en ?? "",
      },
    },
    image: imageRel ? `afbeeldingen/${imageRel}` : "",
  };
}

export function buildQualityReport(
  pakket: KaartPakket,
  perCard: { nummer: string; warnings: string[]; fotoStatus: string; hasPhoto: boolean }[]
): string {
  const lines = [
    `# Kwaliteitsrapport — ${pakket.categorie.naam_nl}`,
    "",
    pakket.batch?.id ? `Batch: ${pakket.batch.id}` : "",
    pakket.batch?.beeldmaker ? `Beeldmaker: ${pakket.batch.beeldmaker}` : "",
    "",
    "## Spreiding complexiteit",
  ];
  const { counts } = complexitySpread(pakket.kaarten);
  lines.push(`- micro: ${counts.micro}`, `- meso: ${counts.meso}`, `- macro: ${counts.macro}`, "");
  lines.push("## Per kaart", "");
  for (const row of perCard) {
    lines.push(`### ${row.nummer}`, `- Foto: ${row.hasPhoto ? "ja" : "nee"} (${row.fotoStatus})`);
    for (const w of row.warnings) lines.push(`- ⚠ ${w}`);
    lines.push("");
  }
  if (pakket.uitzonderingen?.length) {
    lines.push("## Uitzonderingen", "");
    for (const u of pakket.uitzonderingen) {
      lines.push(`- ${u.nummer}: ${u.reden}`);
    }
  }
  return lines.filter(Boolean).join("\n");
}
