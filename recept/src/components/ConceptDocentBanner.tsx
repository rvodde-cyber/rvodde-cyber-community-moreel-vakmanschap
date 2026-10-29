import { useDocentMode } from '../hooks/useDocentMode';

export function ConceptDocentBanner() {
  const docent = useDocentMode();
  if (!docent) return null;
  return (
    <div className="docent-banner" role="status">
      Concept: inhoud nog niet inhoudelijk getoetst. Gespeelde concepten worden gelogd voor de nabespreking.
    </div>
  );
}
