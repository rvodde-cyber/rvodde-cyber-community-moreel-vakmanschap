import werkbladenRaw from "./werkbladen.json";
import { bibliotheekData } from "./bibliotheekData.js";

const STAP_EN_SLUG = {
  1: "seeing",
  2: "feeling",
  3: "weighing",
  4: "acting",
  5: "persisting",
};

const STAP_NL_SLUG = {
  1: "zien",
  2: "voelen",
  3: "wegen",
  4: "handelen",
  5: "volhouden",
};

function buildBibliotheekIndex() {
  const index = new Map();
  for (const lang of ["nl", "en"]) {
    for (const stap of bibliotheekData[lang] ?? []) {
      if (!stap.materialen || typeof stap.stap !== "number") continue;
      const stapSlugNl = STAP_NL_SLUG[stap.stap];
      const stapSlugEn = STAP_EN_SLUG[stap.stap];
      for (const mat of stap.materialen) {
        if (!mat?.id) continue;
        const existing = index.get(mat.id);
        const titel = { ...(existing?.titel ?? {}), [lang]: mat.titel };
        index.set(mat.id, {
          titel,
          stapSlugNl,
          stapSlugEn,
          kind: "bibliotheek",
        });
      }
    }
  }
  return index;
}

const bibliotheekIndex = buildBibliotheekIndex();

const werkbladIndex = new Map(
  werkbladenRaw.map((w) => [
    w.id,
    {
      titel: w.titel,
      kind: "werkblad",
    },
  ]),
);

export function resolveZieOokLink(id, dataLang, enRoutes) {
  const wb = werkbladIndex.get(id);
  if (wb) {
    const titel =
      dataLang === "en" && wb.titel?.en?.trim() ? wb.titel.en : wb.titel?.nl ?? id;
    const base = enRoutes ? "/library/worksheets" : "/bibliotheek/werkbladen";
    return { href: `${base}#${id}`, titel };
  }
  const bib = bibliotheekIndex.get(id);
  if (bib) {
    const titel =
      dataLang === "en" && bib.titel?.en ? bib.titel.en : bib.titel?.nl ?? id;
    const stapSlug = enRoutes ? bib.stapSlugEn : bib.stapSlugNl;
    const base = enRoutes ? `/library/${stapSlug}` : `/bibliotheek/${stapSlug}`;
    return { href: `${base}#${id}`, titel };
  }
  return null;
}

export function getZieOokItems(ids, dataLang, enRoutes) {
  if (!Array.isArray(ids)) return [];
  return ids
    .map((id) => {
      const link = resolveZieOokLink(id, dataLang, enRoutes);
      return link ? { id, ...link } : null;
    })
    .filter(Boolean);
}
