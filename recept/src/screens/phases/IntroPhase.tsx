import { episodeContent } from '@data/episodes/content';
import { episodeMeta } from '@data/episodes/meta';
import { INTRO_TEKSTEN } from '@content/intros.nl';
import { startOf } from '@engine/startOf';
import { budgetOf } from '@engine/helpers';
import { mln } from '../../lib/format';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';
import { INTRO_SCENE } from '@data/sceneCodes';
import { piotrIntroResolved } from '@data/piotrSpel';
import { SceneBackground } from '../../components/SceneBackground';
import { IntroSceneImage } from '../../components/IntroSceneImage';
import {
  a4IntroCarryR1,
  a4IntroCarryR2,
  introCarryLines,
} from '@data/episodes/introUiCopy';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import { engineContext } from '../../game/budgetUi';

export function IntroPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const { openHowto, openGloss, openSettings } = useUiModals();
  const round = state.round;
  const ctx = engineContext(state);
  const content = episodeContent(state.episode);

  if (!content.usesDemoBudget && round === 1) {
    const meta = episodeMeta(state.episode);
    const intro = INTRO_TEKSTEN[state.episode];
    const sc = INTRO_SCENE[state.episode];
    const carryLines = introCarryLines(content, state.episode, 1);
    const introBody = (
      <>
        <p className="kick">{content.introLook.kicker}</p>
        <p className="ep">{meta.titel}</p>
        <h4>GESCHIEDENIS</h4>
        <p className="body">{intro.geschiedenis}</p>
        <h4>UITDAGINGEN</h4>
        <p className="body">{intro.uitdagingen}</p>
        <div className="hintbox">
          <h4>HINT</h4>
          <p>{intro.hint}</p>
        </div>
        <div className="carry">
          <h4>JULLIE OPDRACHT</h4>
          {carryLines.map((line) => (
            <p key={line.slice(0, 48)} className="body">
              {line}
            </p>
          ))}
        </div>
        <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'cold' })}>
          Verder
        </button>
        <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
      </>
    );

    if (content.introBeeldRechts) {
      return (
        <div id="intro-split-scroll" className="intro-split-scroll intro-fade">
          <div className="intro-split-root">
            <div className="intro-split">
              <div className="intro-split__grid">
                <div className="cine-in intro-split__text">{introBody}</div>
                <aside className="intro-split__media">
                  <IntroSceneImage
                    checkCode={sc.checkCode}
                    fileCode={sc.fileCode}
                    alt={content.introBeeldAlt}
                    look={content.introLook}
                    focus={content.introBeeldFocus}
                  />
                </aside>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="cine">
        <SceneBackground checkCode={sc.checkCode} fileCode={sc.fileCode} />
        <div className="cine-shade" />
        <div className="cine-in">{introBody}</div>
      </div>
    );
  }

  if (content.usesDemoBudget && round === 2) {
    const notes = startOf(2, ctx).notes;
    return (
      <div className="cine">
        <SceneBackground checkCode="I4" fileCode="R2" />
        <div className="cine-shade" />
        <div className="cine-in">
          <p className="kick">AFLEVERING 4 / RONDE 2 / 2027</p>
          <p className="ep">Zes maanden later</p>
          <div className="carry">
            <h4>WAT JULLIE MEENEMEN UIT RONDE 1</h4>
            <ul className="body" style={{ margin: 0, paddingLeft: 20 }}>
              {notes.map((n) => (
                <li key={n.slice(0, 40)}>{n}</li>
              ))}
            </ul>
          </div>
          <h4>GESCHIEDENIS</h4>
          <p className="body">
            Van Gorp Drones groeit. De civiele lijn levert pakjesdrones aan heel Brabant, en Defensie wil een order van €
            4,2 miljoen tekenen voor verkenningsdrones. Er komen nieuwe regels, nieuwe formulieren en een afgeschermde hal
            3. Marco noemt het volwassen worden.
          </p>
          <h4>UITDAGINGEN</h4>
          <p className="body">
            Ploegleiders zitten meer in overleg dan op de vloer. Negen engineers hebben bezwaar tegen defensiewerk. En
            Defensie stelt voorwaarden die verder gaan dan de wet toestaat. Jullie budget deze ronde:{' '}
            {mln(budgetOf(2, ctx))}.
          </p>
          <div className="hintbox">
            <h4>HINT</h4>
            <p>
              Groei voelt als succes, totdat de regels het werk overnemen. Vraag bij elke nieuwe regel: wie heeft er last
              van, en wie heeft er eigenlijk om gevraagd?
            </p>
          </div>
          <div className="carry">
            <h4>JULLIE OPDRACHT</h4>
            <p className="body">{a4IntroCarryR2()}</p>
          </div>
          <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'cold' })}>
            Verder
          </button>
          <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
        </div>
      </div>
    );
  }

  if (!content.usesDemoBudget && round === 2) {
    const meta = episodeMeta(state.episode);
    const sc = INTRO_SCENE[state.episode];
    const isA5 = state.episode === 5;
    const carryR2 = introCarryLines(content, state.episode, 2);
    return (
      <div className="cine">
        <SceneBackground checkCode={sc.checkCode} fileCode={sc.fileCode} />
        <div className="cine-shade" />
        <div className="cine-in">
          <p className="kick">{meta.kick} / RONDE 2</p>
          <p className="ep">{meta.titel}</p>
          {isA5 ? (
            <>
              <p className="body">
                Er ligt een voorstel van Optivora op tafel. Op jullie lens wacht een privébericht van Anne-Fleur over het
                receptschrift in de schuur. Jullie beslissen straks samen wat jullie daarmee doen.
              </p>
              <div className="carry">
                <h4>JULLIE OPDRACHT</h4>
                {carryR2.map((line) => (
                  <p key={line.slice(0, 48)} className="body">
                    {line}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <p className="body">
              Drie weken later. Tussen de pagina&apos;s van het kasboek zit een briefje van Lies. Jullie beslissen wat
              jullie ermee doen, zonder Frans in de schuur te laten merken wat er speelt.
            </p>
          )}
          <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'cold' })}>
            Verder
          </button>
          <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
        </div>
      </div>
    );
  }

  return (
    <div className="cine">
      <SceneBackground checkCode={INTRO_SCENE[4].checkCode} fileCode={INTRO_SCENE[4].fileCode} />
      <div className="cine-shade" />
      <div className="cine-in">
        <p className="kick">AFLEVERING 4 / RONDE 1 / 2026</p>
        <p className="ep">Het dashboard liegt niet</p>
        {(() => {
          const piotr = piotrIntroResolved(false);
          if (piotr.isFallback) return null;
          return (
            <>
              <h4>PIOTR OP DE LIJN</h4>
              <p className="body">{piotr.tekst}</p>
            </>
          );
        })()}
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
        {content.overstapUitleg ? (
          <>
            <h4>HOE HET ZO VER KWAM</h4>
            <p className="body">{content.overstapUitleg}</p>
          </>
        ) : null}
        <div className="hintbox">
          <h4>HINT</h4>
          <p>
            Een dashboard laat precies zien wat het meet, en niets van wat het mist. Vraag bij elk getal: wie heeft dit
            ingevoerd, en wie komt er in deze cijfers helemaal niet voor?
          </p>
        </div>
        <div className="carry">
          <h4>JULLIE OPDRACHT</h4>
          <p className="body">{a4IntroCarryR1()}</p>
        </div>
        <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'cold' })}>
          Verder
        </button>
        <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
      </div>
    </div>
  );
}
