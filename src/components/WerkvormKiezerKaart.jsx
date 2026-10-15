import { useTaal } from "../context/TaalContext";
import LicentieRegel from "./LicentieRegel";
import { FASE_KLEUREN, getFaseNaam, hoofdfaseKleur } from "../data/werkbladen";
import { STANDAARD_NAAMSVERMELDING } from "../data/licentie";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen";

const uiTekst = {
  nl: {
    statusBeschikbaar: "Beschikbaar",
    statusVoorbereiding: "In voorbereiding",
    statusExtern: "Externe methode",
    enSoon: "English description coming soon",
    aandachtspunt: "Aandachtspunt",
    bronnen: "Bronnen",
    openWerkblad: "Naar werkblad",
    driedeling:
      "Indeling volgens de driedeling micro – meso – macro (werkdefinitie Lectoraat Ethisch Werken, Fontys; geïnspireerd op het werk van Meijer, 2023).",
  },
  en: {
    statusBeschikbaar: "Available",
    statusVoorbereiding: "In preparation",
    statusExtern: "External method",
    enSoon: "English description coming soon",
    aandachtspunt: "Please note",
    bronnen: "Sources",
    openWerkblad: "Go to worksheet",
    driedeling:
      "Classified according to the micro – meso – macro distinction (working definition, Lectoraat Ethisch Werken / Professorship Ethical Work, Fontys; inspired by the work of Meijer, 2023).",
  },
};

const STATUS_UI = {
  beschikbaar: "statusBeschikbaar",
  in_voorbereiding: "statusVoorbereiding",
  externe_methode: "statusExtern",
};

function FaseBolletjes({ fasen, dataLang }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-hidden="true">
      {fasen.map((fase) => (
        <span
          key={fase}
          title={getFaseNaam(fase, dataLang)}
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: FASE_KLEUREN[fase] }}
        />
      ))}
    </div>
  );
}

export default function WerkvormKiezerKaart({
  item,
  expanded,
  onToggleExpand,
  onOpenWerkblad,
  complexLabels,
}) {
  const { taal, t } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const labels = complexLabels ?? t.gesprekskaart?.complexiteitLabels ?? {};
  const accent = FASE_KLEUREN[item.hoofdfase] ?? hoofdfaseKleur({ fasen: item.fasen });
  const statusLabel = ui[STATUS_UI[item.status]] ?? item.status;
  const isBeschikbaar = item.status === "beschikbaar";
  const canExpand = !isBeschikbaar;

  const handleCardClick = () => {
    if (isBeschikbaar && item.primaryWerkbladId) {
      onOpenWerkblad?.(item.primaryWerkbladId);
      return;
    }
    if (canExpand) onToggleExpand?.(item.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-xl border border-rand bg-white shadow-warm transition hover:shadow-md focus-within:ring-2 focus-within:ring-[#5B2D8E]"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        aria-expanded={canExpand ? expanded : undefined}
        className="flex flex-1 cursor-pointer flex-col gap-2 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2D8E]"
      >
        <h3 className="font-display text-lg font-semibold text-primair">{item.titelDisplay}</h3>
        <p className="text-sm text-secundair">
          {item.herkomst}
          {item.regioNaam ? ` · ${item.regioNaam}` : ""}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-secundair">
          <FaseBolletjes fasen={item.fasen} dataLang={dataLang} />
          <span className="sr-only">
            {item.fasen.map((f) => getFaseNaam(f, dataLang)).join(", ")}
          </span>
          <span>{item.duurTekst}</span>
          <span aria-hidden="true">·</span>
          <span>{item.groepTekst}</span>
          <span aria-hidden="true">·</span>
          <span>{item.niveaus.join(", ")}</span>
        </div>

        <span
          className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: isBeschikbaar ? "#e8f5f0" : "#f0eeea",
            color: isBeschikbaar ? "#0f6e56" : "#5f5e5a",
          }}
        >
          {statusLabel}
        </span>

        {isBeschikbaar && (
          <div className="flex flex-wrap gap-1.5">
            {item.complexiteiten.map((c) => (
              <span
                key={c}
                className="rounded-full border border-complexiteit px-2 py-0.5 text-xs text-complexiteit"
              >
                {labels[c] ?? c}
              </span>
            ))}
            {item.contexten.map((ctx) => (
              <span
                key={ctx}
                className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-secundair"
              >
                {ctx}
              </span>
            ))}
          </div>
        )}

        {isBeschikbaar && item.primaryWerkbladId && (
          <span className="mt-auto text-sm font-semibold text-[#5B2D8E]">{ui.openWerkblad}</span>
        )}
      </div>

      {canExpand && expanded && (
        <div className="border-t border-rand bg-[#fafaf8] px-4 py-4 text-sm text-secundair">
          <p className="mb-3 leading-relaxed text-primair">
            {item.beschrijvingDisplay}
            {item.enBeschrijvingPlaceholder && (
              <em className="mt-1 block text-xs text-secundair">{ui.enSoon}</em>
            )}
          </p>

          {item.letOp && (
            <p className="mb-3">
              <strong className="text-primair">{ui.aandachtspunt}:</strong> {item.letOp}
            </p>
          )}

          {item.bronnenApa?.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 font-semibold text-primair">{ui.bronnen}</p>
              <ul className="list-none space-y-1 pl-0 italic text-attributie">
                {item.bronnenApa.map((bron, i) => (
                  <li key={i} className="text-xs leading-relaxed">{bron}</li>
                ))}
              </ul>
            </div>
          )}

          {item.licentieWerkblad && (
            <LicentieRegel
              naamsvermelding={STANDAARD_NAAMSVERMELDING}
              dataLang={dataLang}
              licentie={item.licentieWerkblad}
            />
          )}
          {item.naamsvermeldingBron && (
            <p className="mt-2 text-xs italic text-attributie">{item.naamsvermeldingBron}</p>
          )}
        </div>
      )}
    </article>
  );
}

export function werkbladHashHref(werkbladId, taal) {
  const enRoutes = usesEnglishRoutes(taal);
  const base = enRoutes ? "/library/worksheets" : "/bibliotheek/werkbladen";
  return `${base}#${werkbladId}`;
}
