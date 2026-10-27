import type { GameAction } from '../game/gameReducer';

type Props = {
  name: string;
  hasSave: boolean;
  onName: (n: string) => void;
  dispatch: (a: GameAction) => void;
  onStart: () => void;
  onResume: () => void;
};

export function HomeScreen({ name, hasSave, onName, dispatch, onStart, onResume }: Props) {
  return (
    <div className="setup">
      <div className="setup-in">
        <p className="kick">RECEPT</p>
        <h1 className="ep">Van Gorp Drones</h1>
        <p className="body">
          Jullie spelen de hoger opgeleide jongere zus van Harrie. Typ haar voornaam (max. 12 tekens). Gebruik geen
          echte persoonsgegevens.
        </p>
        <label className="lab" htmlFor="pname">Voornaam van de zus</label>
        <input
          id="pname"
          className="inp"
          value={name}
          maxLength={12}
          autoComplete="off"
          placeholder="Marja, Ingrid, Mieke…"
          onChange={(e) => onName(e.target.value)}
        />
        <div>
          <button
            type="button"
            className="btn gold big"
            disabled={name.trim().length < 2}
            onClick={() => {
              dispatch({ type: 'SET_NAME', name: name.trim() });
              onStart();
            }}
          >
            Start aflevering 4
          </button>
          {hasSave ? (
            <button type="button" className="btn ghost" onClick={onResume}>
              Doorgaan waar je was
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
