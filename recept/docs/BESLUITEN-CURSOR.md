# Besluiten Cursor — Recept

## 2026-10-29 — Stap 6 trailer, slot, pauze, ronde 2

- `FilmOverlay` + Web Audio (`src/audio/sfx.ts`), trailers ronde 1/2, slot na ronde 1, finale na ronde 2 (`slotLine` uit referentie).
- Pauzekaart (`TussenPhase`) met tafelvragen; `START_ROUND_2` met padeffect via `startOf(2)`.
- Ronde 2: intro, cold open, onderzoek/besluit/uitkomst; `VoorspelPhase` stub tot nabespreking stap 8.

## 2026-10-29 — Stap 5 berichten & dilemma

- Groepsapp (GROEP/PRIVÉ), toast, typt-indicator, fase-gestuurde berichten uit `data/berichten.ts`.
- Reacties na uitkomst via `reactiesVoorRonde` (referentie v6).
- Dilemma Piotr in privé-tab (ronde 2); verborgen meters in state (`hiddenMeters.ts`), nog niet zichtbaar in UI tot nabespreking (stap 8).
- Save-key `recept-game-v4` met migratie van v3.

## 2026-10-27 — Stap 4 UX (duidelijkheid)

- Modals: **Hoe het werkt** (knop Duidelijk), **Wie is wie en begrippen** (PersonCard + begrippen), **Pauze** (timer + hamburgermenu), bereikbaar vanuit hoofdmenu, intro, cold open en spel.
- **Rondje MT**: twee stappen in modal (belang tonen → standpunt), zoals referentie v6; geen directe toggle meer voor “standpunt gegeven”.
- Besluitscherm blijft één doorlopend scherm (geen genummerde substappen); dat volgt de CURSOR-PROMPT §3.4. Later herbeoordelen of substappen de duidelijkheid vergroten.

## 2026-10-27 — Piotr-lijn (Richard)

Volledige tekst: `docs/PIOTR-LIJN.md`. Data: `data/dilemmas/ep4-piotr.ts`, `data/personen.ts` (flexkracht). UI dilemma/berichten/slot: stap 5–6.

- Herkomst in spel **niet** expliciet benoemen; screening op verdenking, niet op landnaam.
- Defensie-contract altijd door; dilemma alleen eerlijkheid + menselijke maat.
- Vaste aanname Piotr ronde 2: MT-keuze + begroting (TODO koppeling motor).
- Testament/schuur 2031 en Erik doorgestreept 2036: verhaaldata, nog niet in React-slot.

## 2026-10-27 — Start bouw

### Bronnen

Bouwpakket staat in `Cursor projecten/Recept/` en is gesynchroniseerd naar `recept/` (demo v6, docs, tien beelden). Voortgang: `docs/VOORTGANG.md`.

### Bronmap OneDrive (leidend voor sync)

- Pad: `Cursor projecten/Recept/` (docs/, referentie/, CURSOR-PROMPT.md).
- Bouwlocatie in git: `rvodde-cyber-community-moreel-vakmanschap/recept/` — na elke aanlevering opnieuw syncen vanuit OneDrive.
- Google Drive-tabbladen **Introteksten** en **Morele dilemma's**: Richard levert bij; tot definitieve export: `docs/introteksten.md` en `docs/morele-dilemmas.md` uit OneDrive-sync gebruiken (kunnen nog wijzigen).

### Inkomend bouwpakket (Richard / Claude)

- Bron: demo **versie 6** (artefact), beelden als losse bestanden.
- Doelmap: Google Drive **「Recept – Spelontwerp」**.
- Cursor kan alleen lezen wat lokaal in de workspace staat of via een gesynchroniseerde Drive-map op schijf. Na upload: map kopiëren of symlinken naar `recept/_aanlevering/` **of** inhoud verplaatsen naar onderstaande structuur.

**Verwachte mappen na import in repo:**

| Van bouwpakket | Naar in `recept/` |
| --- | --- |
| `demo-aflevering4-ronde1.html` (v6) | `referentie/demo-aflevering4-ronde1.html` |
| `spelmotor.md`, `dronefabriek-deel1.md`, overige `docs/*.md` | `docs/` |
| Beelden `C4.webp`, … | `public/beelden/<code>.webp` |
| Portretten (indien mee) | `public/portretten/<slug>.webp` |

Zodra `referentie/` en `docs/spelmotor.md` lokaal staan: verder met bouwplanning stap 2 (spelmotor + golden tests).

### Architectuurbesluiten

| Besluit | Keuze |
| --- | --- |
| Plaats in monorepo | Subproject `recept/` (zoals `frisse-organisatie/`, `teamkompas/`) |
| Recept-specifieke docs | `recept/docs/` (bestaande repo-`docs/` blijft voor gesprekskaarten) |
| TypeScript | Strict, engine zonder React-imports |
| Validatie | Zod-schema’s in `data/schemas/`; `npm run validate` faalt bij ongeldige data |
| State | `useReducer` + `SessionAdapter` met `localStorage` (try/catch) |
| Vite target | `safari12` voor oudere iPad |
| Base path | `VITE_BASE_PATH` default `/`; ingebed bv. `/recept/` |

### Standaarden zolang bronnen ontbreken

- Spelmotor en golden tests worden **niet** geraden; stap 2 wacht op referentie-HTML en spelmotor-doc.
- Aflevering 4-inhoud volgt `dronefabriek-deel1.md` zodra aanwezig.
- Opvolgingskeuze (aflevering 3): mechanisme + opslag; gevolgvelden `TODO` tot `serieconcept.md` er is.
