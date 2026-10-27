import { HOE_HET_WERKT_STAPPEN, ROLBESCHRIJVING_INTRO } from '@content/howItWorks.nl';

type Props = {
  onClose: () => void;
  onOpenGlossary: () => void;
};

export function HowItWorksModal({ onClose, onOpenGlossary }: Props) {
  const paras = ROLBESCHRIJVING_INTRO.split('\n\n');
  return (
    <>
      <p className="k">HOE HET WERKT</p>
      <h2 id="modh">Jullie zijn het MT</h2>
      {paras.map((p) => (
        <p key={p.slice(0, 24)} className="note" style={{ maxWidth: '72ch' }}>{p}</p>
      ))}
      <ol className="howto">
        {HOE_HET_WERKT_STAPPEN.map((s) => (
          <li key={s.slice(0, 40)}>{s}</li>
        ))}
      </ol>
      <button type="button" className="btn" onClick={onClose}>Duidelijk</button>
      <button type="button" className="btn ghost" onClick={onOpenGlossary}>
        Wie is wie en begrippen
      </button>
    </>
  );
}
