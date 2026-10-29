type Props = {
  onHowto: () => void;
  onGloss: () => void;
  onSettings?: () => void;
  variant?: 'inline' | 'ghost';
};

export function HelpLinks({ onHowto, onGloss, onSettings, variant = 'ghost' }: Props) {
  const cls = variant === 'ghost' ? 'btn ghost' : 'btn ghost';
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
      <button type="button" className={cls} onClick={onHowto}>Hoe het werkt</button>
      <button type="button" className={cls} onClick={onGloss}>Wie is wie en begrippen</button>
      {onSettings ? (
        <button type="button" className={cls} onClick={onSettings}>Instellingen</button>
      ) : null}
    </div>
  );
}
