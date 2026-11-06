# Designgids Recept

Laatste update: **6 november 2026** (intro-kaders + intro-split scroll). Afgeleid van wat in de repo **bestaat** — vooral aflevering 4 (`playMode: full`), `data/rounds.ts`, `themes/periods.ts`, `src/styles/recept.css`, componenten en schermen. Geen ontwerp-wensen buiten de code.

**Teksten:** alle zichtbare dialoog, cold opens, interventieteksten en UI-copy volgen waar mogelijk `docs/TAALGIDS.md` (register, personages, geen dialect in 2036).

**Typografie:** per tijdperk — `docs/TYPOGRAFIE.md`, `themes/periods.ts`, `PeriodTypographyScope`.

**Gesprekskaarten:** teamgesprek ronde 1 — `docs/GESPREKSKAART.md`, fase `gesprek`, geen motoreffect.

**Landingspagina & intro:** posterlook — hoofdstuk **§9** hieronder; beeld rechts via `introBeeldRechts` in `EPISODE_CONTENT`.

## 1. Principes

- **Één bediening:** één React-app (`src/`), state via `useReducer` + `localStorage` (`recept-game-v4`). Geen aparte student/docent-build; docent via `?docent=1` (`useDocentMode`).
- **Per aflevering eigen periodesfeer:** `data/episodes/meta.ts` koppelt aflevering → `periodKey` → `themes/periods.ts` (`PeriodThemeScope` zet CSS-variabelen op de root).
- **Full vs. skeleton:** alleen aflevering **4** is `playMode: 'full'` (demo/spelmotor). Afleveringen 1–3 en 5 zijn `skeleton` (korte intro/cold open, geen volledige ronde-flow).
- **Filmische laag vs. controlekamer:** `.intro`, `.film`, `.cine` en `.tr` (trailer) in `recept.css` voor verhaalschermen; `.panel`, `.grid`, `.top` voor het MT-spel (vooral zichtbaar in aflevering 4).

## 2. Kleur, typografie en thema per periode

Bron: `themes/periods.ts` (`PERIOD_THEMES`). Dashboard-label en widgets zijn gedefinieerd; in de UI is vooral **2026** uitgewerkt (TEMPO-controlekamer). Andere periodes hebben thema-tokens, beperkte widget-implementatie in skeleton.

| Periode | Jaar | Titel | Dashboard-label | Achtergrond | Accent | UI-font | Data-font | Widgets (data) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1984 | 1984 | Alles met de hand | Kasboek op de keukentafel | `#f4efe6` | `#8b4513` | Georgia, serif | ui-monospace | kasboek, meters |
| 1996 | 1996 | Sneller, Gerrit | Productieteller | `#0a120a` | `#33ff66` | system-ui | Courier New | terminal, meters, ticker |
| 2009 | 2009 | Een Van Gorp aan het roer | Spreadsheet en eerste BI | `#e8e8e8` | `#217346` | Calibri, system-ui | Consolas | spreadsheet, meters |
| 2026 | 2026 | Het dashboard liegt niet | TEMPO controlekamer | `#0b1016` | `#3ec8e0` | system-ui | ui-monospace | meters, ticker, news |
| 2036 | 2036 | Wie heeft het schrift? | Holding-app | `#f5f7fa` | `#1a56db` | system-ui | ui-monospace | holding, meters |

**Globale UI (aflevering 4 speelmodus):** `:root` in `src/styles/recept.css` — donker raster, `--cyan` / `--amber`, titels `--title` (Cinzel), data `--data` (Chakra Petch), body `--sans` (IBM Plex Sans).

## 3. Tempo en timers

**Wat er is:**

- **`tLeft`** in `GameUiState` (`src/game/uiTypes.ts`); start **600 s** (10 min) in `freshGame` / `budgetUi.ts`.
- **Aftellen** alleen in fasen `onderzoek` en `besluit` (`src/hooks/useGame.ts`, interval 1 s → `TICK` in `gameReducer.ts`).
- **Weergave** in `GameShell.tsx`: knop `.timer` toont `mm:ss`, label „Beslistijd”; tik opent pauze-modal (timer loopt niet verder zolang modal open is — fase blijft, `timerOn` kan uit via docent).
- **Docent:** `DocentPausePanel.tsx` — timer ±60 s, aan/uit (`SET_TIMER_ON`).
- **CSS:** `.timer.low` (amber, pulse) bestaat in `recept.css`, maar **`GameShell` zet die class nog niet** (geen visuele drempel bij lage tijd).

**Wat ontbreekt t.o.v. ontwerp (`docs/overzicht.md` besluit 19: 10 min beslistijd per ronde):**

- Geen koppeling naar docent-gebeurtenissen of zaal-sync.
- Geen aparte timers per subfase (cold open, berichten); alleen onderzoek+besluit.
- Geen automatische fase-overgang als `tLeft === 0`.

## 4. Geluid

Bron: `src/audio/sfx.ts` (Web Audio API, lazy `AudioContext`).

| Functie | Gebruik |
| --- | --- |
| `unlockAudio()` | Na gebruikersactie (o.a. cold open) context resume |
| `SFX.click`, `tick`, `boom`, `low`, `ping` | Korte oscillator-tonen |
| `hum(seconds)` | Ondertoon (trailer/slot) |

Trailer-scripts roepen geluid aan via `FilmOverlay.tsx` + `filmResolve.ts` (o.a. `trailer-r1`, `trailer-r2`). Geen videobestanden; alles in-browser.

**Tijdgeest (optioneel, per aflevering):** sfeergeluid los van de motor — register `data/episodes/tijdgeest.ts`, UI `TijdgeestGeluid.tsx`, teksten en regels in **`docs/TIJDGEEST.md`**. Standaard uit; checklist **`docs/GELUID-CHECK.md`**.

## 5. Componenten

| Bestand | Functie |
| --- | --- |
| `ConceptDocentBanner.tsx` | Docent-banner bij concept-inhoud |
| `DashboardColumn.tsx` | Zijbalk dashboard (meters/ticker) in speelfase |
| `DilemmaChoices.tsx` | Keuze-UI dilemma (Piotr) |
| `DocentPausePanel.tsx` | Docent: timer, export, conceptlog in pauze |
| `FilmOverlay.tsx` | Trailer/slot: tekstcues, timing, geluid |
| `GaugeRing.tsx` | Meter-visualisatie (ring) |
| `HelpLinks.tsx` | Links naar uitleg/begrippen |
| `MessageToast.tsx` | Toast bij nieuw bericht |
| `Modal.tsx` | Basis modal |
| `PauseModal.tsx` | Pauze-menu + docentpaneel |
| `PeriodThemeScope.tsx` | Past periode-thema toe op subtree |
| `PersonAvatar.tsx` | Portret/silhouet persoon |
| `PersonCard.tsx` | Wie-is-wie kaart |
| `PhonePanel.tsx` | Groepsapp/privé (tabs, berichten) |
| `SannePanel.tsx` | Sanne-inhoud waar gekoppeld |
| `SceneBackground.tsx` | Beeld uit `beeldenCheck` / silhouet |
| `StepsNav.tsx` | Fasenstappen in controlekamer |
| `TijdgeestGeluid.tsx` | Optioneel sfeergeluid tijdgeest (aan/uit, tekstalternatief) |
| `TaskBar.tsx` | Opdrachtbalk boven fase-inhoud |
| `modals/GlossaryModal.tsx` | Begrippen |
| `modals/HowItWorksModal.tsx` | Hoe het werkt |
| `modals/RoleBelangModal.tsx` | MT rondje (belang → standpunt) |
| `modals/SettingsModal.tsx` | Instellingen (o.a. toegankelijkheid) |

## 6. Spanningselementen in aflevering 4 (waar in code)

| Element | Waar |
| --- | --- |
| **Trailer / cold open** | `ColdPhase.tsx` + `episodeContent(state.episode)` (skeleton vs. volledige cold/trailer); beelden via `SceneBackground`; doorgang → `onderzoek` |
| **Privéberichten / groepsapp** | `PhonePanel.tsx`, `data/berichten.ts`, `useMessageDelivery.ts`; toast `MessageToast.tsx` |
| **PILOT-valstrik** | `BesluitPhase.tsx` (PILOT volgen / zelf wegen); `ScanPhase.tsx` (scan-animatie); kaart gemarkeerd met `D.pilotCard` in `rounds.ts` |
| **Verborgen meters** | `src/game/hiddenMeters.ts`, state `hidden` in `GameUiState`; toegepast na rondes/dilemma; **zichtbaar** in `NabesprekingPhase.tsx`, niet in student-UI tijdens spel |
| **Dilemma Piotr (ronde 2)** | `DilemmaChoices.tsx` (`DilemmaDef`), register + `data/dilemmas/ep4-piotr.ts`, privé-tab telefoon |
| **Slotscène / einde deel** | `TussenPhase.tsx` (pauze ronde 1), `VoorspelPhase.tsx` (testament 2031 via `piotrSpel.ts` / `piotr-lijn.ts`); trailer r2 in cold flow |
| **Spelmotor / kaarten** | Register `content.ts` (A4: `data/rounds.ts`), `BesluitPhase`, `UitkomstPhase`, `engine/` |

## 7. Checklist bouwstenen per aflevering

Status `playMode` uit `data/episodes/meta.ts`. „Full” = zelfde diepte als A4-demo waar van toepassing.

| Aflevering | playMode | Cold open / trailer | Dashboardskin (periode) | Privé + dilemma | Portretten/beelden | Slotscène | Nabespreking | Ronde-timer | Docent-gebeurtenissen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · 1984 | skeleton* | cold opens A1 (`COLD_OPEN_EP1`) | **1984 kasboek-meters** (interventiemotor) | briefje r2 (`ep1-frans`) | silhouetten | slot A1 | data concept | **ja** (600 s) | — |
| 2 · 1996 | skeleton | idem | thema 1996, terminal beperkt | — | silhouetten | — | concept | — | — |
| 3 · 2009 | skeleton | idem + `OpvolgingPhase.tsx` | thema 2009 | — | silhouetten | — | concept | — | — |
| 4 · 2026 | **full** | ja (r1+r2) | **2026 controlekamer** (DashboardColumn, ticker) | **ja** (Piotr r2) | beelden I4/T4/R2 + portretten | **ja** (Voorspel/testament) | `NabesprekingPhase` + `nabespreking-ep4.ts` (deels concept) | **ja** (600 s, zie §3) | alleen pauze/export in `DocentPausePanel`, geen push-gebeurtenis |
| 5 · 2036 | skeleton | skeleton | thema 2036, holding stub | — | silhouetten | — | concept (`NABESPREKING_A5`) | — | — |

**Interventiedata:** A1–A3 + A5 kaarten `definitief` in `data/interventies-a*.ts`. **A1 stap 3 (5 nov 2026):** `motorKind: 'interventie'`, berekening `engine/interventieCompute.ts`, rondekaarten `data/episodes/a1Rounds.ts`. A4 = `data/rounds.ts` (demo, ongewijzigd).

\* `playMode` in `meta.ts` blijft `skeleton` tot checklist „full”; spelregister heeft wel interventiemotor voor A1.

**Register (A1 stap 1, 3 nov 2026):** `data/episodes/content.ts` — `EPISODE_CONTENT` per aflevering (rondes, cold open, dilemma, slotlijnen, film, **`tijdgeest`**). Spelcode leest via `episodeContent(episode)`; `isFullEpisode(ep)` = register heeft 2 rondes + dilemma + slotlijnen. UI-label **skelet** blijft `playMode` in `meta.ts`.

**Tijdgeestlaag (5 nov 2026):** ticker (header + skeleton), optioneel geluid en rekwisieten — **`docs/TIJDGEEST.md`**. Weergave ticker: `tickerRegelsVoor()` (A4: demo-ticker uit `rounds.ts` + tijdgeest; overige afleveringen alleen tijdgeest). Geen effect op meters of motor.

## 9. Landingspagina en introscherm (poster, 5 nov 2026)

### Landingspagina — was

- `HomeScreen.tsx` in `.setup` / `.setup-in`: gouden kick „RECEPT”, h1 „Van Gorp Drones”, één kolom met voornaam, verticale `.ep-picker` (gouden knoppen + „— skelet”), Doorgaan, `HelpLinks`.
- Geen achtergrondbeeld; globale `:root`-tokens uit `recept.css`.

### Landingspagina — wordt

- Nieuwe structuur met prefix **`landing-*`**: full-bleed `MENU.jpg` + verloopoverlay, kicker, h1 **RECEPT**, ondertitels (crème/goud), decoratieve dataregel (`aria-hidden`), sectie **Speel mee** (formulier links, vijf kaarten rechts met label Speelbaar/Skelet), voettekst + `HelpLinks`.
- **`PosterTypographyScope`** + lazy **`loadPosterFonts()`** (Instrument Serif, Chakra Petch); instelling **Leesbaar lettertype** geldt ook hier.
- Gedrag ongewijzigd: voornaam, `SET_NAME` / `START_EPISODE`, `hasSave`, `showsSkeletLabel()`.

### Introscherm — was

- **`IntroPhase`**: full-bleed `.cine` + `SceneBackground` (alleen na `beeldAkkoord`) + `.cine-in` onderaan (kick, titel, geschiedenis, knop Verder).
- Aflevering 4 ronde 1: zelfde filmische laag (demo/golden).

### Introscherm — wordt

- Ronde 1 (niet-demo) en skeleton-afleveringen met **`introBeeldRechts: true`**: twee kolommen vanaf 900 px — tekst links (~60ch), **`IntroSceneImage`** rechts (sticky, staand 3:4 op desktop, onderschrift `introBeeldTekst`); onder 900 px beeld boven tekst.
- **Smal scherm (&lt;600 px):** frame **`aspect-ratio: 4/5`**, budget **`min(55dvh, 520px)`** min kader-extra; **tablet 600–899 px:** **`4/3`**, **`min(55dvh, 560px)`** min extra — minder “strook” bij staande foto’s. **`introBeeldFocus`** in register → `object-position` via `--intro-focus-x/y` op **`.intro-beeld`**.
- JPG laadt direct uit `public/beelden/`; bij `onerror` placeholder **BEELD &lt;code&gt; VOLGT**.
- **A4:** `introBeeldRechts: false` → bestaande `.cine`-layout ongewijzigd.
- Register: `introBeeldAlt`, `introBeeldTekst`, optioneel **`introBeeldFocus`**, koppeling `INTRO_SCENE` / `data/sceneCodes.ts`.

## Introscherm scroll en hoogte (6 nov 2026)

### Welk element scrollt?

| Laag | Rol |
| --- | --- |
| **`html` / `body`** | `body` heeft `overflow-x: hidden` (geen verticale clip); geen vaste hoogte behalve `min-height: 100%`. |
| **`.scr`** | `position: fixed; overflow: hidden` — alleen tijdens oude shell/boot; speelscherm zit in `#root` zonder `.scr`. |
| **`#cine`** | In `recept.css` staat `overflow-y: auto`, maar **`#cine` komt niet in de huidige React-tree voor** — klassen zijn `.cine` zonder id. De verticale scroll voor filmische schermen zat daardoor op de **document body**. |
| **Intro split (`introBeeldRechts`)** | Oorzaak bug: **`.intro-split-root` had `min-height: 100%`** zonder begrensde parent → inhoud werd **taller dan het viewport**; **`aside.intro-split__media`** had **`position: sticky; max-height: 80vh`** terwijl **`.intro-beeld__frame`** vanaf 900 px **`aspect-ratio: 3/4`** + **`max-height: inherit`** kreeg — de **aside** erfde geen effectieve max-height van de gridcel, dus het **kader kon hoger worden dan 80vh** en **buiten het venster** lopen. Sticky hield de media vast terwijl de pagina-scroll op body **niet goed voelbaar** was / tekst + knop **Verder** niet bereikbaar leken. |

### Oplossing

- **`#intro-split-scroll.intro-split-scroll`** (wrapper in `IntroPhase.tsx` alleen bij `introBeeldRechts`): **`height` / `max-height: 100dvh`**, **`overflow-y: auto`**, **`overflow-x: hidden`**, **`padding-bottom: calc(24px + env(safe-area-inset-bottom))`** — één duidelijke scrollcontainer (mobiele adresbalk: **`100dvh`** i.p.v. `100vh`).
- **Hoogte kader vs. beeld (nov 2026, kader-fix):** `.intro-kader-shell` heeft **geen `max-height`** meer — de shell volgt de inhoud (rand + crème achtergrond + onderschrift blijven zichtbaar). Op `.intro-split-scroll` staan CSS-variabelen:
  - **`--intro-viewport-cap: calc(100dvh - 48px)`** — budget voor kader + onderschrift t.o.v. viewport;
  - **`--intro-kader-extra-*`** — gereserveerde ruimte voor padding, venster-titelbalk en onderschrift: **polaroid 100px**, **kettingpapier 90px**, **venster 120px**, **glas 90px**;
  - **`.intro-beeld__frame`** krijgt **`max-height: calc(var(--intro-viewport-cap) - var(--intro-kader-extra-<kader>))`** per kader-modifier — alleen het beeld wordt begrensd; kader + onderschrift blijven samen binnen het scrollvenster.
- **Polaroid:** padding **`12px 12px 0`**; onderschriftstrook **`min-height: 56px`**, tekst **#4a4035** op crème **#f4efe6** (leesbaar contrast).
- **Laag venster (≥900 px breed, ≤599 px hoog):** sticky uit; beeld **`max-height: min(50dvh - extra, viewport-cap - extra)`** per kader.
- **Tablet 600–899 px / telefoon &lt;600 px:** beeld boven; frames gebruiken **`--intro-tablet-cap`** / **`--intro-phone-cap`** (= **min(55dvh, 560px of 520px, viewport-cap)`)** min extra; telefoon **4/5**, tablet **4/3** — shell zonder max-height.
- **Schaduw in kader:** polaroid **geen** onderste vignet; kettingpapier/venster/glas **`.intro-beeld__shade--soft`**: max **20%** beeldhoogte, gradient-opaciteit **0,25**.
- **Cold open / A4 `.cine`:** ongewijzigd (geen `#intro-split-scroll`).

### Playwright / handmatige check (repo heeft geen Playwright-devDependency)

Screenshots in `docs/beelden-check/` worden **niet** gecommit. **Kaders A1/A2/A3/A5 (na kader-fix):** verwachting — volledige rand + onderschrift binnen de shell; leesbaar onderschrift.

| Viewport | Kader omsluit beeld + onderschrift | Onderschrift leesbaar | Kader+onderschrift in venster (laptop) | Horizontale overloop | Sticky OK |
| --- | --- | --- | --- | --- | --- |
| 390×844 | ja | ja | n.v.t. | nee | n.v.t. |
| 768×1024 | ja | ja | n.v.t. | nee | n.v.t. |
| 1024×768 | ja | ja | ja | nee | ja** |
| 1366×768 | ja | ja | ja | nee | ja** |
| 1536×864 | ja | ja | ja | nee | ja** |
| 1920×1080 | ja | ja | ja | nee | ja** |

**Intro-beeld smal (A1/A2/A3/A5, na focus + 4/5 / 4/3):** verwachting — geen gaten in het frame; hoofdonderwerp zichtbaar; scroll naar tekst + Verder blijft mogelijk. Geen Playwright in repo; handmatig controleren.

| Viewport | Beeld vult kader | Hoofdonderwerp zichtbaar | Onderschrift leesbaar | Horiz. overloop | Scroll tekst + Verder |
| --- | --- | --- | --- | --- | --- |
| 320×640 | ja | ja | ja | nee | ja |
| 360×740 | ja | ja | ja | nee | ja |
| 390×844 | ja | ja | ja | nee | ja |
| 430×932 | ja | ja | ja | nee | ja |
| 768×1024 | ja | ja | ja | nee | ja |
| 1366×768 | ja | ja | ja | nee | ja |

| Viewport | Beeld + onderschrift in venster | Scroll naar tekst + Verder | Horizontale overloop | Sticky zonder over tekst |
| --- | --- | --- | --- | --- |
| 360×740 | ja* | ja | nee | n.v.t. (geen sticky) |
| 390×844 | ja* | ja | nee | n.v.t. |
| 768×1024 | ja* | ja | nee | n.v.t. |
| 1024×768 | ja | ja | nee | ja** |
| 1366×768 | ja | ja | nee | ja** |
| 1536×864 | ja | ja | nee | ja** |
| 1920×1080 | ja | ja | nee | ja** |
| 1366×768 @ 200% | ja | ja | nee | ja** |

\*Tablet/telefoon: kader begrensd; lange tekst scrollt in `#intro-split-scroll`.  
\*\*Desktop: sticky alleen binnen de scrollkolom; bij extreem lage viewport (`max-height: 599px`) sticky uit.

## 10. Introscherm per tijdperk (5 nov 2026)

### Opbouw

| Laag | Bron |
| --- | --- |
| Fase | `IntroPhase.tsx` — ronde 1, `introBeeldRechts` |
| Beeld | `INTRO_SCENE[episode].fileCode` → `public/beelden/*.jpg` (desktop 3:4; smal 4:5 / tablet 4:3; `object-position` uit **`introBeeldFocus`**) |
| Register | `EPISODE_CONTENT.introLook`: `kader`, `tint`, `kicker`, `onderschrift` (+ `introBeeldAlt`, **`introBeeldFocus`**) |
| UI | `IntroSceneImage.tsx` — kaderwrapper `intro-kader-<naam>`, tintlaag (~25%), onderschrift per periode-font |
| Typografie | `PeriodTypographyScope` (App) → `--font-hand`, `--font-display`, `--font-ui` uit `themes/periods.ts` |
| A4 demo | `introBeeldRechts: false` → ongewijzigde `.cine` + `SceneBackground` (T4); `introLook.kader: dashboard` alleen in register |

### Kader per aflevering

| Aflevering | Kader | Sfeer (kort) |
| --- | --- | --- |
| A1 · 1984 | polaroid | Warme bruingele tint + lichte korrel; onderschrift Caveat |
| A2 · 1996 | kettingpapier | Grijsgroene tl-tint, perforatie; onderschrift VT323 |
| A3 · 2009 | venster | Koel blauwwit, titelbalk (decoratief); onderschrift statusbalk Verdana/Tahoma |
| A4 · 2026 | dashboard | Geen split-layout — demo ongewijzigd |
| A5 · 2036 | glas | Zachte glastint, blur-rand; onderschrift Nunito |

Leesbaar lettertype: kaderversiering minimaal (CSS `.period-typography--readable`). Onder 900 px: geen kanteling/perforatie; beeld boven tekst — caps **55dvh** + px-plafond (zie § *Introscherm scroll en hoogte*); focuspunten: **`docs/BEELDEN-CHECK.md`**.

## 8. Open ontwerpvragen voor Richard

- **Dashboard per periode:** widgets in `periods.ts` vs. wat skeleton-afleveringen moeten tonen vóór full bouw.
- **Timer:** 600 s voldoende voor docenten; wanneer `.timer.low` en harde time-out?
- **Vergelijkscherm v1:** exacte meters in de twee ranglijsten (mapping demo-meters ↔ interventie-meters A1–A5).
- **Regiekamer v2:** welke gebeurtenissen zijn must-have in de zaal?
- **Beelden:** akkoord `BEELDEN-CHECK.md` — tot die tijd silhouetten.
- **A4-verwijzingen** in opvolging/echo docs: mapping concept 4.x → demokaarten A–J (`docs/OPEN-VRAGEN.md`).
