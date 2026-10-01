import { useTaal } from "../context/TaalContext";

/** Regel A + APA (regel E) — NL/EN via vertalingen.driedeling */
export default function DriedelingBronvermelding({ className = "" }) {
  const { t } = useTaal();
  const d = t.driedeling;
  if (!d) return null;

  return (
    <div
      className={`mt-4 border-l-2 border-rand pl-4 text-sm leading-relaxed text-secundair ${className}`}
    >
      <p className="mb-2">{d.inspiratie}</p>
      <p className="text-secundair">
        {d.apaLead}
        <em>{d.apaTitle}</em>
        {d.apaTail}
      </p>
    </div>
  );
}
