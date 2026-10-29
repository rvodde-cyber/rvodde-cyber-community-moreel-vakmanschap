import { useState } from 'react';
import {
  SANNE_STANDAARD_TOON,
  resolveSanneReactie,
  sanneOnthullingEp5,
  sanneSlotEp4,
  type SanneContract,
  type SanneToon,
} from '@data/sanne';
import { resolveScene } from '@data/contentStatus';
import { useDocentMode } from '../hooks/useDocentMode';

type Props = {
  /** Concept: niet gekoppeld aan spelmotor — standaard `ja` tot motor koppelt. */
  contract?: SanneContract;
};

export function SannePanel({ contract = 'ja' }: Props) {
  const docent = useDocentMode();
  const [toon, setToon] = useState<SanneToon>(SANNE_STANDAARD_TOON);
  const activeToon = docent ? toon : SANNE_STANDAARD_TOON;
  const reactie = resolveSanneReactie(contract, activeToon, docent);
  const slot = resolveScene(sanneSlotEp4, docent);
  const onthulling = resolveScene(sanneOnthullingEp5, docent);

  return (
    <div className="sanne-panel">
      {docent ? (
        <div className="docent-only" style={{ marginBottom: 12 }}>
          <span className="concept-tag">CONCEPT</span>
          <label className="note" style={{ display: 'block', marginTop: 8 }}>
            Toon (docent)
            <select
              value={toon}
              onChange={(e) => setToon(e.target.value as SanneToon)}
              style={{ marginLeft: 8 }}
            >
              <option value="A">Variant A — zakelijk-warm</option>
              <option value="B">Variant B — terughoudend</option>
            </select>
          </label>
          <p className="note">
            Contract (concept, niet gekoppeld): <strong>{contract === 'ja' ? 'Piotr in dienst' : 'geen contract'}</strong>
          </p>
        </div>
      ) : null}
      <p className="note">
        {reactie.showConceptLabel ? <span className="concept-tag">CONCEPT </span> : null}
        {reactie.tekst}
      </p>
      {docent ? (
        <>
          <h3 className="data">Slotscène 2031 (Sanne)</h3>
          <p className="note">
            {slot.showConceptLabel ? <span className="concept-tag">CONCEPT </span> : null}
            {slot.tekst}
          </p>
          <h3 className="data">Aflevering 5 — onthulling</h3>
          <p className="note">
            {onthulling.showConceptLabel ? <span className="concept-tag">CONCEPT </span> : null}
            {onthulling.tekst}
          </p>
        </>
      ) : null}
    </div>
  );
}
