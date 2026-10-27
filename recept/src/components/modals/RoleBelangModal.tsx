import { MT_ROLLEN } from '@data/rollen';
import { ROL_BELANG } from '@data/rolBelang';

type Props = {
  round: 1 | 2;
  roleId: string;
  revealed: boolean;
  onReveal: () => void;
  onSpoke: () => void;
  onClose: () => void;
};

export function RoleBelangModal({ round, roleId, revealed, onReveal, onSpoke, onClose }: Props) {
  const ro = MT_ROLLEN.find((r) => r.id === roleId);
  if (!ro) return null;
  const belang = ROL_BELANG[round][roleId] ?? '';

  if (!revealed) {
    return (
      <>
        <p className="k">RONDJE MT / {ro.n.toUpperCase()}</p>
        <h2 id="modh">Geef het scherm aan de speler met de rol {ro.n}.</h2>
        <p>De anderen kijken even weg. Alleen jij leest wat hierna komt.</p>
        <button type="button" className="btn gold" onClick={onReveal}>Toon mijn belang</button>
        <button type="button" className="btn ghost" onClick={onClose}>Annuleren</button>
      </>
    );
  }

  return (
    <>
      <p className="k">ALLEEN VOOR {ro.n.toUpperCase()}</p>
      <h2 id="modh">Jouw belang</h2>
      <div className="secret">{belang}</div>
      <p className="note" style={{ marginTop: 12 }}>Je hoeft dit niet te vertellen. Geef nu je standpunt aan het MT.</p>
      <button type="button" className="btn" onClick={onSpoke}>Ik heb mijn standpunt gegeven</button>
    </>
  );
}
