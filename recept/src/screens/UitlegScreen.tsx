import { useId, useState, type ReactNode } from 'react';
import {
  UITLEG_BODY,
  UITLEG_H1,
  UITLEG_KICKER,
  UITLEG_LEAD,
  UITLEG_METERS,
  UITLEG_NAV,
  UITLEG_STAPPEN,
  UITLEG_TIJDLIJN,
  type UitlegSectionId,
  uitlegSectionParagraphs,
} from '@content/uitleg';
import type { EpisodeId } from '@data/episodes/meta';

type Props = {
  episodeHint?: EpisodeId;
  onBack: () => void;
  onToGame?: () => void;
  onOpenGlossary: () => void;
  onOpenSettings: () => void;
};

function SectionBlock({
  id,
  title,
  children,
}: {
  id: UitlegSectionId;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="uitleg-sectie" id={`uitleg-${id}`} aria-labelledby={`uitleg-h-${id}`}>
      <h2 className="uitleg-h2" id={`uitleg-h-${id}`}>
        {title}
      </h2>
      <div className="uitleg-sectie__in">{children}</div>
    </section>
  );
}

export function UitlegScreen({ episodeHint, onBack, onToGame, onOpenGlossary, onOpenSettings }: Props) {
  const navId = useId();
  const [jumpOpen, setJumpOpen] = useState(false);
  const ep = episodeHint;

  const scrollTo = (id: UitlegSectionId) => {
    document.getElementById(`uitleg-${id}`)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    setJumpOpen(false);
  };

  const paras = (id: UitlegSectionId) =>
    uitlegSectionParagraphs(id, ep).map((p) => (
      <p key={p.slice(0, 32)} className="uitleg-p">
        {p}
      </p>
    ));

  return (
    <div className="uitleg-page landing-fade">
      <div className="uitleg-bg" aria-hidden="true" />
      <div className="uitleg-layout">
        <header className="uitleg-top">
          <button type="button" className="btn ghost uitleg-back" onClick={onBack}>
            ← Terug
          </button>
          <details
            className="uitleg-jump-mobile"
            open={jumpOpen}
            onToggle={(e) => setJumpOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary className="uitleg-jump-summary">Spring naar</summary>
            <ul className="uitleg-jump-list">
              {UITLEG_NAV.map((item) => (
                <li key={item.id}>
                  <a href={`#uitleg-${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </header>

        <nav className="uitleg-nav" aria-labelledby={navId}>
          <p id={navId} className="uitleg-nav__k">
            INHOUD
          </p>
          <ol className="uitleg-nav__list">
            {UITLEG_NAV.map((item) => (
              <li key={item.id}>
                <a href={`#uitleg-${item.id}`} className="uitleg-nav__link" onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main className="uitleg-main">
          <header className="uitleg-hero">
            <p className="uitleg-kicker">{UITLEG_KICKER}</p>
            <h1 className="uitleg-h1">{UITLEG_H1}</h1>
            <p className="uitleg-lead">{UITLEG_LEAD}</p>
          </header>

          <SectionBlock id="rol" title="Jullie rol en de context">
            {paras('rol')}
          </SectionBlock>

          <SectionBlock id="stappen" title="Zo loopt een deel">
            {paras('stappen')}
            <ol className="uitleg-stappen">
              {UITLEG_STAPPEN.map((s) => (
                <li key={s.nr} className="uitleg-stap">
                  <span className="uitleg-stap__nr" aria-hidden="true">
                    {s.nr}
                  </span>
                  <div className="uitleg-stap__body">
                    <p className="uitleg-stap__titel">{s.titel}</p>
                    <p className="uitleg-p uitleg-stap__tekst">{s.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionBlock>

          <SectionBlock id="onderzoek" title="Het onderzoek">
            {paras('onderzoek')}
          </SectionBlock>

          <SectionBlock id="beslissingen" title="De beslissingen">
            {paras('beslissingen')}
          </SectionBlock>

          <SectionBlock id="budget" title="Budget en kosten">
            {paras('budget')}
          </SectionBlock>

          <SectionBlock id="meters" title="De meters">
            {paras('meters')}
            <div className="uitleg-table-wrap">
              <table className="uitleg-table">
                <thead>
                  <tr>
                    <th scope="col">Meter</th>
                    <th scope="col">Wat het zegt</th>
                    <th scope="col">Welke kant op is goed</th>
                  </tr>
                </thead>
                <tbody>
                  {UITLEG_METERS.map((row) => (
                    <tr key={row.meter}>
                      <th scope="row">{row.meter}</th>
                      <td>{row.uitleg}</td>
                      <td>{row.goed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionBlock>

          <SectionBlock id="tafel" title="De tafelgesprekken">
            {paras('tafel')}
          </SectionBlock>

          <SectionBlock id="jaren" title="Door de jaren">
            <div className="uitleg-table-wrap">
              <table className="uitleg-table uitleg-table--tijdlijn">
                <thead>
                  <tr>
                    <th scope="col">Deel</th>
                    <th scope="col">Jaar</th>
                    <th scope="col">Titel</th>
                    <th scope="col">Wat speelt er</th>
                    <th scope="col">Wat is Van Gorp dan</th>
                  </tr>
                </thead>
                <tbody>
                  {UITLEG_TIJDLIJN.map((row) => (
                    <tr key={row.deel}>
                      <td>{row.deel}</td>
                      <td>{row.jaar}</td>
                      <td className="uitleg-table__titel">{row.titel}</td>
                      <td>{row.speelt}</td>
                      <td>{row.bedrijf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {paras('jaren')}
          </SectionBlock>

          <SectionBlock id="tips" title="Waar let je op">
            <ol className="uitleg-num">
              {(UITLEG_BODY.tips.numbered ?? []).map((t) => (
                <li key={t.slice(0, 24)} className="uitleg-p">
                  {t}
                </li>
              ))}
            </ol>
          </SectionBlock>

          <SectionBlock id="praktisch" title="Praktisch">
            <ul className="uitleg-bullets">
              {(UITLEG_BODY.praktisch.bullets ?? []).map((b) => (
                <li key={b.slice(0, 24)}>{b}</li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock id="bronnen" title="Waar is dit op gebaseerd">
            {paras('bronnen')}
            <ul className="uitleg-bronnen">
              {(UITLEG_BODY.bronnen.bullets ?? []).map((b) => (
                <li key={b.slice(0, 40)} className="uitleg-bron">
                  {b}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <footer className="uitleg-foot">
            <button type="button" className="btn ghost" onClick={onBack}>
              Terug naar het begin
            </button>
            {onToGame ? (
              <button type="button" className="btn gold" onClick={onToGame}>
                Duidelijk, naar het spel
              </button>
            ) : (
              <button type="button" className="btn gold" onClick={onBack}>
                Duidelijk
              </button>
            )}
            <nav className="uitleg-foot-links" aria-label="Hulp">
              <button type="button" className="btn ghost" onClick={onOpenGlossary}>
                Wie is wie en begrippen
              </button>
              <button type="button" className="btn ghost" onClick={onOpenSettings}>
                Instellingen
              </button>
            </nav>
          </footer>
        </main>
      </div>
    </div>
  );
}
