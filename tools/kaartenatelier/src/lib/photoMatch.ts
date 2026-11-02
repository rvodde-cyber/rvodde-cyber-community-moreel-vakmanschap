import type { KaartPakketKaart } from "./types";

function normalizeToken(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function boundaryMatch(num: string, filename: string): boolean {
  const base = filename.replace(/\.[^.]+$/, "");
  const re = new RegExp(`(^|[^a-z0-9])${escapeRe(num)}([^a-z0-9]|$)`, "i");
  return re.test(base);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export type PhotoMatchResult =
  | { kind: "package"; file: File }
  | { kind: "nummer"; file: File }
  | { kind: "prompt"; file: File }
  | { kind: "ambiguous"; candidates: File[] }
  | { kind: "none" };

export function matchPhotoToCard(
  card: KaartPakketKaart,
  files: File[],
  assigned: Set<string>
): PhotoMatchResult {
  if (card.foto_bestand?.trim()) {
    const name = card.foto_bestand.trim();
    const hit = files.find((f) => f.name === name || f.name.toLowerCase() === name.toLowerCase());
    if (hit && !assigned.has(hit.name)) return { kind: "package", file: hit };
  }

  const byNum = files.filter(
    (f) => !assigned.has(f.name) && boundaryMatch(card.nummer, f.name)
  );
  if (byNum.length === 1) return { kind: "nummer", file: byNum[0] };
  if (byNum.length > 1) return { kind: "ambiguous", candidates: byNum };

  const promptPrefix = normalizeToken(card.firefly_prompt_en.slice(0, 40));
  if (promptPrefix.length >= 8) {
    const byPrompt = files.filter((f) => {
      if (assigned.has(f.name)) return false;
      const m = f.name.match(/Firefly_(.+)\./i);
      if (!m) return false;
      return normalizeToken(m[1]).startsWith(promptPrefix.slice(0, 20));
    });
    if (byPrompt.length === 1) return { kind: "prompt", file: byPrompt[0] };
    if (byPrompt.length > 1) return { kind: "ambiguous", candidates: byPrompt };
  }

  return { kind: "none" };
}

export function nummerBoundaryFalsePositive(): boolean {
  return boundaryMatch("DL7", "DL70-photo.jpg");
}
