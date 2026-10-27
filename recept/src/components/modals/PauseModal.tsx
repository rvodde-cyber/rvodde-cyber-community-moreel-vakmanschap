type Props = {
  onResume: () => void;
  onHowto: () => void;
  onGloss: () => void;
  onMenu: () => void;
};

export function PauseModal({ onResume, onHowto, onGloss, onMenu }: Props) {
  return (
    <>
      <p className="k">GEPAUZEERD</p>
      <h2 id="modh">Even pauze</h2>
      <p className="note">De beslistijd staat stil zolang dit venster open is. Jullie voortgang wordt bewaard.</p>
      <button type="button" className="btn" onClick={onResume}>Hervatten</button>
      <button type="button" className="btn ghost" onClick={onHowto}>Hoe het werkt</button>
      <button type="button" className="btn ghost" onClick={onGloss}>Wie is wie en begrippen</button>
      <button type="button" className="btn ghost" onClick={onMenu}>Naar het hoofdmenu</button>
    </>
  );
}
