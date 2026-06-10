import { useTaal } from "../context/TaalContext";

const KERN_KLEUR = "#534ab7";

function DownloadButton({ href, download, label, accentColor }) {
  return (
    <a
      href={href}
      download={download}
      className="inline-flex items-center justify-center rounded-full border-2 px-4 py-2.5 text-center text-sm font-semibold transition-colors"
      style={{ borderColor: accentColor, color: accentColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = accentColor;
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = accentColor;
      }}
    >
      {label}
    </a>
  );
}

export default function WorksheetCard({ sheet, accentColor, accentBg, downloadBasePath, badgeLabel }) {
  const { t } = useTaal();

  return (
    <article className="flex flex-col rounded-xl border border-rand bg-[#fafaf8] p-5 shadow-warm transition-shadow hover:shadow-[0_20px_60px_rgba(26,39,68,0.12)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-white"
          style={{ backgroundColor: KERN_KLEUR }}
        >
          {sheet.id}
        </span>
        <span className="shrink-0 rounded-full border border-rand bg-white px-2.5 py-1 text-xs font-semibold text-secundair">
          ⭐ {badgeLabel}
        </span>
      </div>

      <h4 className="font-display text-2xl font-semibold leading-snug text-primair">{sheet.title}</h4>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {sheet.themes.map((theme) => (
          <span
            key={theme}
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: accentBg, color: accentColor }}
          >
            {theme}
          </span>
        ))}
      </div>

      <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-secundair">{sheet.intro}</p>

      <div className="mt-5 grid gap-2">
        <DownloadButton
          href={`${downloadBasePath}/${sheet.filenameNl}`}
          download={sheet.filenameNl}
          label={t.worksheets_download_nl}
          accentColor={accentColor}
        />
        <DownloadButton
          href={`${downloadBasePath}/${sheet.filenameEn}`}
          download={sheet.filenameEn}
          label={t.worksheets_download_en}
          accentColor={accentColor}
        />
      </div>
    </article>
  );
}
