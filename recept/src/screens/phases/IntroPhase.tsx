import type { GameAction } from '../../game/gameReducer';

const base = import.meta.env.BASE_URL;

function bg(code: string) {
  const url = `${base}beelden/${code}.jpg`;
  return (
    <>
      <div className="cine-img" style={{ backgroundImage: `url(${url})` }} />
    </>
  );
}

export function IntroPhase({ dispatch }: { dispatch: (a: GameAction) => void }) {
  return (
    <div className="cine">
      {bg('T4')}
      <div className="cine-shade" />
      <div className="cine-in">
        <p className="kick">AFLEVERING 4 / RONDE 1 / 2026</p>
        <p className="ep">Het dashboard liegt niet</p>
        <h4>GESCHIEDENIS</h4>
        <p className="body">
          Van Gorp Drones, Vossenberg, Tilburg. Geen lopende band meer, maar robotarmen en schermen vol grafieken.
          Sturingssysteem TEMPO bepaalt het tempo op de vloer tot op de seconde, algoritme PILOT fluistert de leiding
          advies in het oor. Harrie, jouw broer, is 71 en president-commissaris. Zaterdagavond zit hij aan zijn eigen
          verjaardagstaart terwijl niemand aan tafel van zijn telefoon opkijkt. Jij was er, zoals altijd, niet bij.
        </p>
        <h4>UITDAGINGEN</h4>
        <p className="body">
          Maandagochtend, 09:14 uur. Het verzuim is weer gestegen. Ploegleider Ans weet ’s ochtends niet wat de norm die
          dag wordt. En ergens in een la ligt de eerste order voor een defensietoepassing, nog ongeopend. Je neef Marco
          wil vrijdag een plan zien, en heeft € 1,5 miljoen om het mee te betalen.
        </p>
        <div className="hintbox">
          <h4>HINT</h4>
          <p>
            Een dashboard laat precies zien wat het meet, en niets van wat het mist. Vraag bij elk getal: wie heeft dit
            ingevoerd, en wie komt er in deze cijfers helemaal niet voor?
          </p>
        </div>
        <div className="carry">
          <h4>JULLIE OPDRACHT</h4>
          <p className="body">
            Jullie vormen samen het managementteam (MT) van Van Gorp Drones. Per ronde onderzoeken jullie eerst wat er
            speelt. Daarna kiezen jullie twee interventies en verdelen jullie het budget. Voor onderzoek en besluit
            samen hebben jullie ongeveer tien minuten.
          </p>
        </div>
        <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'cold' })}>
          Verder
        </button>
      </div>
    </div>
  );
}
