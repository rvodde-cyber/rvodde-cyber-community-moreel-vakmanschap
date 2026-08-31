import { SETUP_SECTIONS } from "../config/chassisPlaceholders";

/**
 * Voortgang over de vijf Setup-secties: stip + vlaggetje wanneer de sectie actief
 * of (deels) afgerond is. Sjabloon voor alle sectiepagina's.
 */
export default function SectionProgress({
  activeId = "chassis",
  completedIds = [],
  answeredInActive = 0,
  totalInActive = 0,
}) {
  return (
    <nav aria-label="Voortgang Setup-secties" className="w-full">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {SETUP_SECTIONS.map((section, index) => {
          const active = section.id === activeId;
          const completed = completedIds.includes(section.id);
          return (
            <li key={section.id} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                {index > 0 ? (
                  <span
                    className={[
                      "h-px flex-1",
                      completed || active ? "bg-racing/35" : "bg-hairline",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="flex-1" aria-hidden="true" />
                )}
                <span
                  className={[
                    "relative flex h-8 w-8 items-center justify-center rounded-full border text-[0.65rem] font-semibold transition",
                    active
                      ? "border-racing bg-racing text-white shadow-lift"
                      : completed
                        ? "border-racing/40 bg-racing-mist text-racing"
                        : "border-hairline bg-white/70 text-ink-muted",
                  ].join(" ")}
                  aria-current={active ? "step" : undefined}
                >
                  {completed && !active ? (
                    <span className="sr-only">{section.label} afgerond</span>
                  ) : null}
                  {/* Vlaggetje op actieve sectie */}
                  {active ? (
                    <span aria-hidden="true" className="absolute -top-2 right-0 text-[0.7rem] leading-none">
                      ▾
                    </span>
                  ) : null}
                  {section.short}
                </span>
                {index < SETUP_SECTIONS.length - 1 ? (
                  <span
                    className={[
                      "h-px flex-1",
                      completed ? "bg-racing/35" : "bg-hairline",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="flex-1" aria-hidden="true" />
                )}
              </div>
              <span
                className={[
                  "hidden text-[0.65rem] font-medium sm:block",
                  active ? "text-racing" : "text-ink-muted",
                ].join(" ")}
              >
                {section.label}
              </span>
            </li>
          );
        })}
      </ol>
      {totalInActive > 0 ? (
        <p className="mt-3 text-center text-xs text-ink-muted">
          {answeredInActive} van {totalInActive} in deze sectie
        </p>
      ) : null}
    </nav>
  );
}
