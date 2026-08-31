import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { useTaal } from "../context/TaalContext";
import { bibliotheekData, niveauLabels, statusLabels } from "../data/bibliotheekData";
import { getAllCards, localizeCards } from "../data/gesprekskaarten";
import {
  getBibliotheekDataLang,
  getLocalizedPageContent,
  usesEnglishRoutes,
} from "../data/vertalingen";

const uiTekst = {
  nl: {
    label: "Alles op één pagina",
    titel: "Overzicht van al het materiaal",
    subtitel:
      "Elk werkblad, elke werkvorm en elke gesprekskaart op één plek — doorzoekbaar en te filteren, met de downloads erbij.",
    zoekPlaceholder: "Zoek op titel, thema of trefwoord…",
    zoekLabel: "Zoeken",
    soortLabel: "Soort",
    stapLabel: "Modelstap",
    taalLabel: "Taal",
    beschikbaarLabel: "Beschikbaarheid",
    alles: "Alles",
    werkbladen: "Werkbladen en werkvormen",
    kaarten: "Gesprekskaarten",
    metDownload: "Met download",
    binnenkort: "Nog in ontwikkeling",
    wisFilters: "Wis filters",
    geenResultaat: "Niets gevonden met deze filters.",
    telWerkbladen: "werkbladen en werkvormen",
    telKaarten: "gesprekskaarten",
    telDownloads: "te downloaden bestanden",
    resultaat: "resultaten",
    resultaatEnkel: "resultaat",
    downloadNl: "NL",
    downloadEn: "EN",
    nietBeschikbaar: "Binnenkort beschikbaar",
    bekijkKaart: "Bekijk bij de gesprekskaarten",
    naarKaarten: "Naar de gesprekskaarten",
    naarBibliotheek: "Naar de bibliotheek per stap",
    verhaalLabel: "Verhaal & Reflectie",
    setLabels: {
      "morele-moed-teaser": "Morele Moed — teaser",
      burgerschap: "Burgerschap",
      "dl-compleet-a5": "Dilemma's compleet (A5)",
      "nucleaire-geneeskunde": "Nucleaire geneeskunde",
      onderzoeksintegriteit: "Onderzoeksintegriteit",
      "onderwijs-v3": "Onderwijs",
    },
  },
  en: {
    label: "Everything on one page",
    titel: "Overview of all materials",
    subtitel:
      "Every worksheet, work form and conversation card in one place — searchable and filterable, with the downloads included.",
    zoekPlaceholder: "Search by title, theme or keyword…",
    zoekLabel: "Search",
    soortLabel: "Type",
    stapLabel: "Model step",
    taalLabel: "Language",
    beschikbaarLabel: "Availability",
    alles: "All",
    werkbladen: "Worksheets and work forms",
    kaarten: "Conversation cards",
    metDownload: "With download",
    binnenkort: "Still in development",
    wisFilters: "Clear filters",
    geenResultaat: "Nothing found with these filters.",
    telWerkbladen: "worksheets and work forms",
    telKaarten: "conversation cards",
    telDownloads: "downloadable files",
    resultaat: "results",
    resultaatEnkel: "result",
    downloadNl: "NL",
    downloadEn: "EN",
    nietBeschikbaar: "Coming soon",
    bekijkKaart: "View with the conversation cards",
    naarKaarten: "Go to the conversation cards",
    naarBibliotheek: "Go to the library by step",
    verhaalLabel: "Story & Reflection",
    setLabels: {
      "morele-moed-teaser": "Moral Courage — teaser",
      burgerschap: "Citizenship",
      "dl-compleet-a5": "Dilemmas complete (A5)",
      "nucleaire-geneeskunde": "Nuclear medicine",
      onderzoeksintegriteit: "Research integrity",
      "onderwijs-v3": "Education",
    },
  },
};

const LEGE_FILTERS = { zoek: "", soort: "", stap: "", taal: "", beschikbaar: "" };

/** De vaste navigatie wisselt van hoogte bij wrappen; de filterbalk moet daar precies onder blijven. */
function useNavigatieHoogte(standaard = 80) {
  const [hoogte, setHoogte] = useState(standaard);

  useEffect(() => {
    const nav = document.querySelector("[data-hoofdnavigatie]");
    if (!nav) return undefined;

    const meet = () => setHoogte(nav.offsetHeight);
    meet();

    const observer = new ResizeObserver(meet);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return hoogte;
}

function werkbladenUit(dataLang) {
  return bibliotheekData[dataLang].flatMap((stap) =>
    stap.materialen.map((materiaal) => ({
      soort: "werkblad",
      sleutel: `werkblad-${materiaal.id}-${stap.stap}`,
      id: materiaal.id,
      titel: materiaal.titel,
      omschrijving: materiaal.omschrijving ?? null,
      themas: materiaal.themas ?? [],
      groep: String(stap.stap),
      groepNaam: stap.stapNaam,
      kleur: stap.kleur,
      map: materiaal.map,
      bestandNl: materiaal.bestand_nl ?? null,
      bestandEn: materiaal.bestand_en ?? null,
      niveau: materiaal.niveau ?? null,
      status: materiaal.status ?? null,
    }))
  );
}

function kaartenUit(taal, stapKleuren) {
  return localizeCards(taal, getAllCards()).map((kaart) => ({
    soort: "kaart",
    sleutel: `kaart-${kaart.id}`,
    id: kaart.id,
    titel: kaart.titel,
    omschrijving: kaart.verhaal,
    themas: [],
    groep: kaart.set,
    kleur: stapKleuren[kaart.stap] ?? kaart.kleur,
    categorieSlug: kaart.categorieSlug,
    categorieKleur: kaart.kleur,
    complexiteit: kaart.complexiteit,
    stapNummer: kaart.stap,
  }));
}

function past(item, filters, zoekterm) {
  if (filters.soort && item.soort !== filters.soort) return false;

  if (filters.stap) {
    const stap = item.soort === "werkblad" ? item.groep : String(item.stapNummer);
    if (stap !== filters.stap) return false;
  }

  if (filters.taal && item.soort === "werkblad") {
    const bestand = filters.taal === "nl" ? item.bestandNl : item.bestandEn;
    if (!bestand) return false;
  }

  if (filters.beschikbaar) {
    const heeftDownload = item.soort === "kaart" || Boolean(item.bestandNl || item.bestandEn);
    if (filters.beschikbaar === "download" && !heeftDownload) return false;
    if (filters.beschikbaar === "binnenkort" && heeftDownload) return false;
  }

  if (zoekterm) {
    const hooiberg = [item.titel, item.omschrijving, item.id, item.categorieSlug, ...item.themas]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!hooiberg.includes(zoekterm)) return false;
  }

  return true;
}

export default function OverzichtPagina() {
  const { taal, t } = useTaal();
  const ui = getLocalizedPageContent(uiTekst, taal, "overzicht");
  const dataLang = getBibliotheekDataLang(taal);
  const enRoutes = usesEnglishRoutes(taal);
  const [filters, setFilters] = useState(LEGE_FILTERS);
  const navHoogte = useNavigatieHoogte();

  const stapKleuren = useMemo(
    () =>
      Object.fromEntries(
        bibliotheekData[dataLang]
          .filter((stap) => typeof stap.stap === "number")
          .map((stap) => [stap.stap, stap.kleur])
      ),
    [dataLang]
  );

  const stapOpties = useMemo(
    () =>
      bibliotheekData[dataLang].map((stap) => ({
        waarde: String(stap.stap),
        label: typeof stap.stap === "number" ? `${stap.stap}. ${stap.stapNaam}` : stap.stapNaam,
      })),
    [dataLang]
  );

  const werkbladen = useMemo(() => werkbladenUit(dataLang), [dataLang]);
  const kaarten = useMemo(() => kaartenUit(taal, stapKleuren), [taal, stapKleuren]);

  const zoekterm = filters.zoek.trim().toLowerCase();
  const zichtbaarWerk = werkbladen.filter((item) => past(item, filters, zoekterm));
  const zichtbareKaarten = kaarten.filter((item) => past(item, filters, zoekterm));
  const totaal = zichtbaarWerk.length + zichtbareKaarten.length;

  const bestandenTotaal = werkbladen.reduce(
    (aantal, item) => aantal + (item.bestandNl ? 1 : 0) + (item.bestandEn ? 1 : 0),
    0
  );

  const heeftFilter = Object.values(filters).some(Boolean);

  const werkPerStap = stapOpties
    .map((optie) => ({
      ...optie,
      items: zichtbaarWerk.filter((item) => item.groep === optie.waarde),
    }))
    .filter((groep) => groep.items.length > 0);

  const kaartenPerSet = Object.entries(
    zichtbareKaarten.reduce((groepen, kaart) => {
      (groepen[kaart.groep] ??= []).push(kaart);
      return groepen;
    }, {})
  );

  return (
    <main className="min-h-screen bg-achtergrond" style={{ paddingTop: navHoogte }}>
      <section className="section-shell py-12 text-center md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-[#534ab7]"
        >
          {ui.label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-4xl font-semibold text-primair md:text-6xl"
        >
          {ui.titel}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-8 text-secundair"
        >
          {ui.subtitel}
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-secundair">
          <span>
            <strong className="text-primair">{werkbladen.length}</strong> {ui.telWerkbladen}
          </span>
          <span>
            <strong className="text-primair">{kaarten.length}</strong> {ui.telKaarten}
          </span>
          <span>
            <strong className="text-primair">{bestandenTotaal}</strong> {ui.telDownloads}
          </span>
        </div>
      </section>

      <section
        className="sticky z-20 border-y border-rand bg-surface shadow-sm"
        style={{ top: navHoogte }}
      >
        <div className="section-shell flex flex-wrap items-end gap-3 py-4">
          <label className="relative min-w-[240px] flex-1">
            <span className="sr-only">{ui.zoekLabel}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundair"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.zoek}
              onChange={(event) => setFilters({ ...filters, zoek: event.target.value })}
              placeholder={ui.zoekPlaceholder}
              className="w-full rounded-full border border-rand bg-surface py-2.5 pl-10 pr-4 text-sm text-primair outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
            />
          </label>

          <Keuze
            label={ui.soortLabel}
            waarde={filters.soort}
            onKies={(waarde) => setFilters({ ...filters, soort: waarde })}
            opties={[
              { waarde: "", label: ui.alles },
              { waarde: "werkblad", label: ui.werkbladen },
              { waarde: "kaart", label: ui.kaarten },
            ]}
          />

          <Keuze
            label={ui.stapLabel}
            waarde={filters.stap}
            onKies={(waarde) => setFilters({ ...filters, stap: waarde })}
            opties={[{ waarde: "", label: ui.alles }, ...stapOpties.map((o) => ({ waarde: o.waarde, label: o.label }))]}
          />

          <Keuze
            label={ui.taalLabel}
            waarde={filters.taal}
            onKies={(waarde) => setFilters({ ...filters, taal: waarde })}
            opties={[
              { waarde: "", label: ui.alles },
              { waarde: "nl", label: "Nederlands" },
              { waarde: "en", label: "English" },
            ]}
          />

          <Keuze
            label={ui.beschikbaarLabel}
            waarde={filters.beschikbaar}
            onKies={(waarde) => setFilters({ ...filters, beschikbaar: waarde })}
            opties={[
              { waarde: "", label: ui.alles },
              { waarde: "download", label: ui.metDownload },
              { waarde: "binnenkort", label: ui.binnenkort },
            ]}
          />

          {heeftFilter && (
            <button
              type="button"
              onClick={() => setFilters(LEGE_FILTERS)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rand px-4 py-2 text-sm font-semibold text-primair transition hover:bg-surface-muted"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              {ui.wisFilters}
            </button>
          )}

          <span className="ml-auto text-sm text-secundair" role="status">
            {totaal} {totaal === 1 ? ui.resultaatEnkel : ui.resultaat}
          </span>
        </div>
      </section>

      <section className="section-shell py-12">
        {totaal === 0 && <p className="py-16 text-center text-base text-secundair">{ui.geenResultaat}</p>}

        {werkPerStap.length > 0 && (
          <div className="mb-14">
            <GroepsTitel titel={ui.werkbladen} aantal={zichtbaarWerk.length} />
            {werkPerStap.map((groep) => (
              <div key={groep.waarde} className="mb-8">
                <h3 className="mb-3 font-display text-2xl font-semibold text-primair">{groep.label}</h3>
                <ul className="grid gap-3">
                  {groep.items.map((item) => (
                    <WerkbladRij
                      key={item.sleutel}
                      item={item}
                      ui={ui}
                      niveauLabel={item.niveau ? niveauLabels[dataLang][item.niveau] : null}
                      statusLabel={item.status ? statusLabels[dataLang][item.status] : null}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {kaartenPerSet.length > 0 && (
          <div>
            <GroepsTitel titel={ui.kaarten} aantal={zichtbareKaarten.length} />
            {kaartenPerSet.map(([set, items]) => (
              <div key={set} className="mb-8">
                <h3 className="mb-3 font-display text-2xl font-semibold text-primair">
                  {ui.setLabels[set] ?? set}
                </h3>
                <ul className="grid gap-3">
                  {items.map((kaart) => (
                    <KaartRij
                      key={kaart.sleutel}
                      kaart={kaart}
                      ui={ui}
                      categorieLabel={t.gesprekskaart.categorieLabels?.[kaart.categorieSlug] ?? kaart.categorieSlug}
                      complexiteitLabel={t.gesprekskaart.complexiteitLabels?.[kaart.complexiteit] ?? ""}
                      href={enRoutes ? "/conversation-cards" : "/gesprekskaarten"}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4 border-t border-rand pt-8">
          <Link
            to={enRoutes ? "/library" : "/bibliotheek"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#534ab7] hover:underline"
          >
            {ui.naarBibliotheek} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={enRoutes ? "/conversation-cards" : "/gesprekskaarten"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#534ab7] hover:underline"
          >
            {ui.naarKaarten} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function GroepsTitel({ titel, aantal }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b border-rand pb-2">
      <h2 className="font-display text-3xl font-semibold text-primair">{titel}</h2>
      <span className="text-sm text-secundair">{aantal}</span>
    </div>
  );
}

function Keuze({ label, waarde, onKies, opties }) {
  return (
    <label className="grid gap-1 text-xs font-semibold text-secundair">
      {label}
      <select
        value={waarde}
        onChange={(event) => onKies(event.target.value)}
        className="rounded-full border border-rand bg-surface px-4 py-2 text-sm font-normal text-primair outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
      >
        {opties.map((optie) => (
          <option key={optie.waarde} value={optie.waarde}>
            {optie.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Badge({ children, kleur }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ color: kleur, backgroundColor: `${kleur}1a` }}
    >
      {children}
    </span>
  );
}

function DownloadLink({ bestand, map, label, kleur, disabledTitle }) {
  if (!bestand) {
    return (
      <span
        title={disabledTitle}
        aria-disabled="true"
        className="cursor-not-allowed rounded-full border border-rand bg-surface-muted px-3 py-1.5 text-xs font-semibold text-secundair"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={`/downloads/${map}/${bestand}`}
      download={bestand}
      className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
      style={{ backgroundColor: kleur }}
    >
      {label}
    </a>
  );
}

function WerkbladRij({ item, ui, niveauLabel, statusLabel }) {
  return (
    <li
      className="flex flex-col gap-3 rounded-2xl border border-rand bg-surface p-4 shadow-sm transition hover:shadow-warm sm:flex-row sm:items-center"
      style={{ borderLeft: `4px solid ${item.kleur}` }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="font-display text-xl font-semibold text-primair">{item.titel}</h4>
          <span className="text-xs text-secundair">{item.id}</span>
        </div>
        {item.omschrijving && (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-secundair">{item.omschrijving}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {niveauLabel && <Badge kleur={item.kleur}>{niveauLabel}</Badge>}
          {statusLabel && <Badge kleur={statusLabel.color}>{statusLabel.label}</Badge>}
          {item.themas.map((thema) => (
            <span key={thema} className="text-xs text-secundair">
              {thema}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <DownloadLink
          bestand={item.bestandNl}
          map={item.map}
          label={ui.downloadNl}
          kleur={item.kleur}
          disabledTitle={ui.nietBeschikbaar}
        />
        <DownloadLink
          bestand={item.bestandEn}
          map={item.map}
          label={ui.downloadEn}
          kleur={item.kleur}
          disabledTitle={ui.nietBeschikbaar}
        />
      </div>
    </li>
  );
}

function KaartRij({ kaart, ui, categorieLabel, complexiteitLabel, href }) {
  return (
    <li
      className="flex flex-col gap-3 rounded-2xl border border-rand bg-surface p-4 shadow-sm transition hover:shadow-warm sm:flex-row sm:items-center"
      style={{ borderLeft: `4px solid ${kaart.kleur}` }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="font-display text-xl font-semibold text-primair">{kaart.titel}</h4>
          <span className="text-xs text-secundair">{kaart.id}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-secundair">{kaart.omschrijving}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge kleur={kaart.categorieKleur}>{categorieLabel}</Badge>
          <span className="text-xs text-secundair">{complexiteitLabel}</span>
          <span className="text-xs font-semibold text-secundair">NL + EN</span>
        </div>
      </div>

      <Link
        to={href}
        className="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition hover:bg-surface-muted"
        style={{ borderColor: kaart.kleur, color: kaart.kleur }}
      >
        {ui.bekijkKaart}
      </Link>
    </li>
  );
}
