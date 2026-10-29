# Deploy Recept (privé)

Laatste update: **29 oktober 2026** (Piotr varianten + definitief)

## Live URL's

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

Productie-deploy: **`6ae327acc4ae630cddf6043a`** (commit `b73bd16` — Piotr varianten + handelenvraag definitief).

## Tests

`npm test`: **38/38** groen (incl. `piotrVariant.test.ts`, `contentStatus`, begroting-autofix).

## Rooktest live (29 okt 2026)

| Check | Student | Docent |
| --- | --- | --- |
| Piotr intro ronde 1 | Tekst Kramer + „Dat hij nooit iets zegt…” op introscherm; geen CONCEPT | idem + concept-scènes gelabeld in nabespreking-data |
| Privébericht ronde 2 | „Ik zeg meestal niets…” in privéchat; geen CONCEPT | idem |
| Slot 2031 | Na finale/voorspel: testament + **één** variant (met/ zonder contract) na keuze `piotr-vast` ≥ €25.000 | idem |
| Nabespreking | Handelenvraag definitief zichtbaar; Sanne/greiner fallback of CONCEPT | CONCEPT-blokken waar van toepassing |
| Console | Geen blocking errors tijdens spotcheck | idem |

**Keuze variant testen:** ronde 2 begroting — schuif **Piotr in vaste dienst** op ≥ €25.000 (ja) of laat op €0 (nee); speel door tot **Wordt vervolgd**.

## Deploy

```bash
cd recept && npm test && npm run build && npx netlify-cli deploy --prod --dir=dist
```

Toegang via niet-raadbare URL; geen wachtwoord (Netlify betaald).
