# Open vragen en aanleveringen

Laatste update: **29 oktober 2026**. Zie ook `docs/overzicht.md`, `docs/PIOTR-LIJN.md`, `docs/BEELDEN-CHECK.md`.

## Aflevering 4

- **Gespreksvragen nabespreking Piotr-lijn** — Claude levert concepten → `docs/CONCEPT-GESPREKSVRAGEN-EP4.md` → `data/nabespreking-ep4.ts` (status `definitief`).
- **Sanne-reactie** — slot `sanneReactieEp4` in `data/ep4ContentSlots.ts` (nu leeg).
- **Greiner-crisis** — slot `greinerCrisisEp4` vs demo in `data/rounds.ts` (zie `docs/AFWIJKINGEN.md`).
- Facilitatorvragen Piotr-dilemma (docent).
- Kalibratie verborgen meters dilemma (nu demo in `ep4-piotr.ts`).

## Afleveringen 1, 2, 3, 5

- Definitieve interventies + `interventieDefinitief` / `gevolgenCompleet` in `data/interventieFlags.ts`.
- Opvolgingsgevolgen ep 4/5 (`gevolgEp4` / `gevolgEp5` in `data/opvolging.ts` — TODO).
- Dilemma’s 1/2/3/5 speelbaar koppelen (data in `data/dilemmas/stubs.ts`).

## Media

- Portretten 8× WebP → `public/portretten/`; akkoord in `docs/BEELDEN-CHECK.md` / Richard.
- Beelden I1–I5 (+ overige codes) → `public/beelden/`; `akkoordRichard: true` in `data/beeldenCheck.ts`.

## Technisch / proces

- **Live deploy URL** invullen in `docs/DEPLOY.md` na Netlify-koppeling.
- `git push origin main` (lokaal commits ahead).
- Golden-suite uitbreiden (`docs/spelmotor.md` zevendeling).
- Expertcheck scenariotests.

## Wat Richard / Claude nog aanleveren (top)

1. Conceptgespreksvragen ep4 (Claude) + Sanne/Greiner-voorstel (Claude).
2. Portretten + beeldakkoord I1–I5.
3. Getoetste interventies 1/2/3/5 en opvolgingsgevolgen.
