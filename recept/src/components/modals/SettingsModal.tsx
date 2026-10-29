import { useEffect, useState } from 'react';
import {
  applyA11ySettings,
  DEFAULT_A11Y,
  loadA11ySettings,
  saveA11ySettings,
  type A11ySettings,
} from '../../lib/a11ySettings';

type Props = {
  onClose: () => void;
};

export function SettingsModal({ onClose }: Props) {
  const [s, setS] = useState<A11ySettings>(() => loadA11ySettings());

  useEffect(() => {
    applyA11ySettings(s);
    saveA11ySettings(s);
  }, [s]);

  return (
    <>
      <p className="k">INSTELLINGEN</p>
      <h2 id="modh">Leesbaarheid en beweging</h2>
      <label className="lab" htmlFor="font-scale">
        Lettergrootte
      </label>
      <select
        id="font-scale"
        value={s.fontScale}
        onChange={(e) => setS({ ...s, fontScale: e.target.value as A11ySettings['fontScale'] })}
      >
        <option value="normaal">Normaal</option>
        <option value="groot">Groot</option>
        <option value="extra">Extra groot</option>
      </select>
      <label className="lab" htmlFor="contrast">
        Contrast
      </label>
      <select
        id="contrast"
        value={s.contrast}
        onChange={(e) => setS({ ...s, contrast: e.target.value as A11ySettings['contrast'] })}
      >
        <option value="standaard">Standaard (donker)</option>
        <option value="hoog">Hoog contrast</option>
        <option value="licht">Licht thema</option>
      </select>
      <label className="lab" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={s.reduceMotion}
          onChange={(e) => setS({ ...s, reduceMotion: e.target.checked })}
        />
        Minder beweging (animaties en trailer vereenvoudigd)
      </label>
      <button type="button" className="btn" onClick={onClose}>
        Sluiten
      </button>
      <button
        type="button"
        className="btn ghost"
        onClick={() => {
          setS(DEFAULT_A11Y);
        }}
      >
        Standaard herstellen
      </button>
    </>
  );
}
