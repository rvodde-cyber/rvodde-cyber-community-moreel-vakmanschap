# Besluiten Cursor — Recept

## 2026-10-27 — Start bouw

### Ontbrekende bronnen (niet in git/workspace gevonden)

- `referentie/demo-aflevering4-ronde1.html`
- `docs/spelmotor.md`
- `docs/dronefabriek-deel1.md`
- Optioneel genoemd in prompt: `serieconcept.md`, `keuzes-en-dashboard.md`, `introteksten.md`, `morele-dilemmas.md`, `beeldbank.md`, `overzicht.md`

Zoekactie: repository-root, OneDrive Fontys-map, zip `Publicatiepakket_VanAfwegenNaarHandelen_1.zip` — geen hits.

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
