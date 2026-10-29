# Voortgang Recept (Cursor-bouw)

Laatste update: **29 oktober 2026**

## Paragraaf 11 — bouwvolgorde (CURSOR-PROMPT)

| Stap | Status |
| --- | --- |
| 1–8 | Klaar (zie eerdere commits) |

## Vervolg CURSOR-PROMPT (post-§11)

| Stap | Omschrijving | Status |
| --- | --- | --- |
| 1 | Richard test aflevering 4 + docent + nabespreking | Klaar (door Richard) |
| 2 | Private deploy (build, robots, Netlify, DEPLOY.md) | Config klaar; **live URL nog open** |
| 3 | Inhoudsslots, flags, BEELDEN-CHECK, geen ethische invulling | Klaar |
| 4 | Instellingenmodal, a11y, 3 tests | Klaar (Lighthouse/axe handmatig nog) |
| 5 | LATER.md, geen trackers | Klaar |

### Tests (29 okt 2026)

- `npm test`: **15 tests** (10 motor + 2 interventie-flags + 3 a11y).
- `npm run build`: groen.

### Live URL / rooktest

- Deploy: zie `docs/DEPLOY.md`. Push naar origin en Netlify-koppeling door Richard.
- Rooktest live: **nog uit te voeren** na deploy.

### Geblokkeerd op Richard / Claude

1. Conceptgespreksvragen ep4 + Sanne/Greiner-teksten.
2. Beelden/portretten + akkoord vlaggen.
3. Definitieve interventies skeletafleveringen + opvolgingsgevolgen.

### Top-3 volgende acties

1. **`git push origin main`** en Netlify-site met niet-raadbare naam; rooktest + URL in `DEPLOY.md`.
2. **Claude:** conceptvragen ep4 + Sanne/Greiner → data vullen.
3. **Richard:** portretten/beelden akkoord (`beeldenCheck.ts`) en interventies 1/2/3/5 toetsen.

## Lokaal draaien

```bash
cd recept
npm run dev
```

Docentmodus: `?docent=1`
