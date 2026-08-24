import { framing, activeFraming } from "../config";

const { appTitle, tagline } = framing[activeFraming];

/** Vaste omlijsting: rustige kop, ruime marges, één kolom — dezelfde taal als De Frisse Organisatie. */
export default function AppShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
      <header className="mb-8 flex items-center gap-3">
        <WheelMark />
        <div>
          <p className="text-sm font-semibold leading-tight text-ink">{appTitle}</p>
          <p className="text-xs leading-tight text-ink-muted">{tagline}</p>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-14 text-center text-xs text-ink-muted">
        <p>Geen inlog · geen opslag · geen rapportcijfer</p>
      </footer>
    </div>
  );
}

export function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="h-1 w-28 overflow-hidden rounded-full bg-ink/10 sm:w-40">
      <div
        className="h-full rounded-full bg-ink/70 transition-[width] duration-300 ease-soft"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}

/** Mini-wiel als merkteken: zes punten rond een inktkleurige naaf. */
function WheelMark() {
  const radius = 10;
  const fills = ["#14B8A6", "#6366F1", "#F59E0B", "#14B8A6", "#6366F1", "#F59E0B"];
  const dots = fills.map((fill, index) => {
    const angle = ((-90 + index * 60) * Math.PI) / 180;
    return {
      fill,
      cx: Math.cos(angle) * radius,
      cy: Math.sin(angle) * radius,
    };
  });

  return (
    <svg width="34" height="34" viewBox="-18 -18 36 36" aria-hidden="true" className="shrink-0">
      <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(28, 25, 23, 0.12)" strokeWidth="1.4" />
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.cx} cy={dot.cy} r="3.1" fill={dot.fill} opacity="0.9" />
      ))}
      <circle cx="0" cy="0" r="3.2" fill="#1C1917" />
    </svg>
  );
}
