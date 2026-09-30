import { brand } from "../config/brand";
import { leaves } from "../config/leaves";

/** Vaste omlijsting: rustige kop, ruime marges, één kolom die meeschaalt. */
export default function AppShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
      <header className="mb-8 flex items-center gap-3">
        <CloverMark />
        <div>
          <p className="text-sm font-semibold leading-tight text-ink">{brand.productName}</p>
          <p className="text-xs leading-tight text-ink-muted">{brand.tagline}</p>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-14 text-center text-xs text-ink-muted">
        <p>Geen inlog · geen opslag · geen rapportcijfer</p>
      </footer>
    </div>
  );
}

/**
 * Statisch merk-teken (asset 2 uit §8.2 als CSS/SVG-placeholder): vier gekleurde
 * blaadjes. Bewust los van het levende klavertje — dit beeld verandert nooit.
 */
function CloverMark() {
  const offset = 5.4;
  const positions = [
    [-offset, -offset],
    [offset, -offset],
    [offset, offset],
    [-offset, offset],
  ];

  return (
    <svg width="34" height="34" viewBox="-18 -18 36 36" aria-hidden="true" className="shrink-0">
      {leaves.map((leaf, index) => (
        <circle
          key={leaf.id}
          cx={positions[index][0]}
          cy={positions[index][1]}
          r="6.6"
          fill={leaf.color}
          opacity="0.9"
        />
      ))}
      <circle cx="0" cy="0" r="2.6" fill="#FAFAF9" />
    </svg>
  );
}
