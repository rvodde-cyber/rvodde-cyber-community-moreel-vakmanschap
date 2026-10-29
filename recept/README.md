# Recept — HR-businessgame

Interactieve dramaserie in vijf afleveringen (1984–2036) rond Van Gorp Drones. Teams spelen het MT; aflevering 4 is volledig speelbaar met spelmotor, afleveringen 1, 2, 3 en 5 zijn inhoudelijke skeletten met conceptinterventies.

## Vereisten

- Node.js 20+
- npm 10+

## Scripts

| Commando | Doel |
| --- | --- |
| `npm run dev` | Ontwikkelserver (Vite) |
| `npm run build` | Valideert data, TypeScript-check, productiebuild |
| `npm test` | Vitest (spelmotor + golden snapshots) |
| `npm run validate` | Zod-validatie van `data/` |

## Docentmodus

Voeg `?docent=1` toe aan de URL. Je krijgt dan o.a.:

- Conceptbanner bij skeletafleveringen
- In het pauzemenu: timer bijstellen, naar een fase springen, verborgen meters inzien, export van de keuzeketen als JSON

## Inhoud toevoegen

| Type | Locatie |
| --- | --- |
| Portretten (512×512 WebP) | `public/portretten/<slug>.webp` — slugs in `data/personen.ts` |
| Beelden trailer/intro | `public/beelden/<code>.jpg` |
| Interventies / ronden | `data/rounds.ts` (aflevering 4) of `data/skeleton/rounds.ts` |
| Introteksten | `content/intros.nl.ts` (bron: `docs/introteksten.md`) |
| Berichten | `data/berichten.ts` |

Ontbrekende portretten tonen initialen (WCAG-contrast) via `PersonAvatar`.

## Privacy

Geen accounts, geen analytics, geen cookies van derden. Spelstatus alleen in `localStorage` (`recept-game-v4`). Alleen een fictieve voornaam invoeren.

## Documentatie

- `CURSOR-PROMPT.md` — volledige specificatie
- `docs/VOORTGANG.md` — bouwvolgorde
- `docs/TOEGANKELIJKHEID.md` — a11y-checklist
- `docs/OPEN-VRAGEN.md` — wat Richard nog aanlevert

## Deploy

Statische site: `npm run build` → map `dist/` (bijv. Netlify).
