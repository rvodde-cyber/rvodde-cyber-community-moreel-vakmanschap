import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTaal } from "../context/TaalContext";
import { getLocalizedPageContent, usesEnglishRoutes } from "../data/vertalingen";
import {
  clusterLabels,
  filterWoordenboekEntries,
  getAlphabetLetters,
  getEntryDisplay,
  woordenboekEntries,
  woordenboekMeta,
  werkvormen,
} from "../data/woordenboek";

const pageContent = {
  nl: {
    hero: {
      label: "Stap Zien",
      titel: "Moreel Woordenboek",
      subtitel: "Taal om moreel scherper te zien",
      intro: woordenboekMeta.intro_nl,
    },
    searchPlaceholder: "Zoek een begrip of definitie…",
    allLetters: "Alles",
    allClusters: "Alle clusters",
    count: (n) => `${n} begrippen`,
    empty: "Geen begrippen gevonden. Pas je zoekopdracht of filters aan.",
    clustersTitle: "Clusters",
    lexiconTitle: "Lexicon",
    werkvormenTitle: "Werkvormen",
    werkvormenIntro:
      "Vier werkvormen om het woordenboek te gebruiken in onderwijs of teams — van woordenjacht in beleid tot het contrast tussen espoused theory en theory-in-use.",
    downloadLabel: "Download werkvormen (.docx)",
    duur: "Duur",
    groep: "Groep",
    fase: "Fase",
    doel: "Doel",
    stappen: "Aanpak",
    reflectie: "Reflectievragen",
    pendingNote: "Engelse vertaling van begrippen volgt; de werkvormen zijn al tweetalig.",
  },
  en: {
    hero: {
      label: "Step Seeing",
      titel: "Moral Dictionary",
      subtitel: "Language for seeing more sharply",
      intro: woordenboekMeta.intro_en,
    },
    searchPlaceholder: "Search a term or definition…",
    allLetters: "All",
    allClusters: "All clusters",
    count: (n) => `${n} terms`,
    empty: "No terms found. Adjust your search or filters.",
    clustersTitle: "Clusters",
    lexiconTitle: "Lexicon",
    werkvormenTitle: "Work forms",
    werkvormenIntro:
      "Four work forms for using the dictionary in teaching or teams — from a word hunt in policy to the contrast between espoused theory and theory-in-use.",
    downloadLabel: "Download work forms (.docx)",
    duur: "Duration",
    groep: "Group",
    fase: "Phase",
    doel: "Aim",
    stappen: "Approach",
    reflectie: "Reflection questions",
    pendingNote: "Full English translation of the original lexicon is still pending; newly added core terms and all work forms are already bilingual.",
  },
};

export default function WoordenboekPagina() {
  const { taal } = useTaal();
  const ui = getLocalizedPageContent(pageContent, taal, "woordenboek");
  const contentLang = taal === "nl" ? "nl" : "en";
  const labels = clusterLabels[contentLang] || clusterLabels.en;
  const forms = werkvormen[contentLang] || werkvormen.en;
  const enRoutes = usesEnglishRoutes(taal);

  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("all");
  const [cluster, setCluster] = useState("all");

  const letters = useMemo(() => getAlphabetLetters(woordenboekEntries), []);
  const clusterIds = useMemo(() => Object.keys(labels), [labels]);

  const filtered = useMemo(
    () => filterWoordenboekEntries(woordenboekEntries, { query, letter, cluster }),
    [query, letter, cluster],
  );

  const downloadHref = enRoutes
    ? "/downloads/zien/MV_21_MoreelWoordenboek_Werkvormen_EN.docx"
    : "/downloads/zien/MV_21_MoreelWoordenboek_Werkvormen_NL.docx";

  return (
    <main className="bg-achtergrond pb-20 pt-28">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#185fa5]">
            {ui.hero.label}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-primair md:text-6xl">
            {ui.hero.titel}
          </h1>
          <p className="mt-4 font-display text-2xl italic text-secundair">{ui.hero.subtitel}</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-secundair">{ui.hero.intro}</p>
          {contentLang === "en" && (
            <p className="mt-3 text-sm text-secundair/80">{ui.pendingNote}</p>
          )}
        </motion.div>
      </section>

      <section className="section-shell mt-14">
        <div className="flex flex-col gap-3 border-b border-rand pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-primair">{ui.lexiconTitle}</h2>
            <p className="mt-1 text-sm text-secundair">{ui.count(filtered.length)}</p>
          </div>
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundair" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full rounded-lg border border-rand bg-surface py-2.5 pl-10 pr-3 text-sm text-primair outline-none ring-[#185fa5]/focus:ring-2"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip active={letter === "all"} onClick={() => setLetter("all")}>
            {ui.allLetters}
          </FilterChip>
          {letters.map((item) => (
            <FilterChip key={item} active={letter === item} onClick={() => setLetter(item)}>
              {item}
            </FilterChip>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={cluster === "all"} onClick={() => setCluster("all")}>
            {ui.allClusters}
          </FilterChip>
          {clusterIds.map((id) => (
            <FilterChip key={id} active={cluster === id} onClick={() => setCluster(id)}>
              {labels[id]}
            </FilterChip>
          ))}
        </div>

        <div className="mt-10 space-y-0 divide-y divide-rand border-y border-rand">
          {filtered.length === 0 && (
            <p className="py-10 text-sm text-secundair">{ui.empty}</p>
          )}
          {filtered.map((entry, index) => {
            const display = getEntryDisplay(entry, contentLang);
            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(index * 0.01, 0.2) }}
                className="grid gap-2 py-5 md:grid-cols-[minmax(10rem,16rem)_1fr] md:gap-8"
              >
                <h3 className="font-display text-2xl font-semibold text-primair">{display.term}</h3>
                <div>
                  <p className="text-base leading-7 text-secundair">{display.definition}</p>
                  {display.fallbackNote && (
                    <p className="mt-1 text-xs uppercase tracking-wide text-secundair/70">
                      {display.fallbackNote}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(entry.clusters || []).map((c) => (
                      <span
                        key={c}
                        className="text-xs font-medium uppercase tracking-wide text-[#185fa5]"
                      >
                        {labels[c] || c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section-shell mt-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-primair">{ui.werkvormenTitle}</h2>
          <p className="mt-3 text-base leading-7 text-secundair">{ui.werkvormenIntro}</p>
          <a
            href={downloadHref}
            className="mt-5 inline-flex rounded-lg border border-[#185fa5] px-4 py-2 text-sm font-semibold text-[#185fa5] transition hover:bg-[#185fa5] hover:text-white"
          >
            {ui.downloadLabel}
          </a>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {forms.map((form, index) => (
            <motion.article
              key={form.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              className="border-t border-rand pt-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#185fa5]">
                {form.fase}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-primair">{form.titel}</h3>
              <p className="mt-2 text-sm text-secundair">
                {ui.duur}: {form.duur} · {ui.groep}: {form.groep}
              </p>
              <p className="mt-4 text-base leading-7 text-secundair">
                <span className="font-semibold text-primair">{ui.doel}. </span>
                {form.doel}
              </p>
              <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-primair">
                {ui.stappen}
              </h4>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-secundair">
                {form.stappen.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-primair">
                {ui.reflectie}
              </h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-secundair">
                {form.reflectie.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-[#185fa5] text-white"
          : "bg-surface text-secundair ring-1 ring-rand hover:text-primair"
      }`}
    >
      {children}
    </button>
  );
}
