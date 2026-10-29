# Deploy Recept (privé)

Laatste update: **29 oktober 2026** (begroting autofix)

## Live URL's

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

Productie-deploy: **`6ae31eaac5fb1e5c371cd167`** (commit `fe9bef7` — begroting melding + autofix).

## Tests

`npm test`: **32/32** groen (incl. `budgetFix.test.ts` voor PILOT B+D ronde 1).

## Rooktest live (29 okt 2026, na autofix)

| Check | Student | Docent |
| --- | --- | --- |
| Aflevering 4 start | OK | OK |
| Ronde 1 MT-besluit | Melding + **Begroting automatisch aanpassen** naast **Besluit vastleggen** bij tekort; autofix maakt budget geldig (zelfde flow als test) | OK + conceptbanner |
| Beide rondes → slotscène | **Handmatig te verifiëren** (autofix verwijdert blokade r1; r2 zelfde patroon). Geen console-errors gezien tijdens intro → onderzoek → besluit-check op live deploy. |
| Nabespreking | Fallback conceptteksten | OK (Veilig gesprek, Sanne A/B, gespreksvragen CONCEPT) |
| Instellingenmodal | OK | OK |
| Console | Geen blocking errors (Log.enable tijdens spotcheck) | idem |

**Tip docent:** pauzemenu → fase **Nabespreking** om UI te toetsen zonder volledige sessie.

## Deploy

```bash
cd recept && npm test && npm run build && npx netlify-cli deploy --prod --dir=dist
```

Toegang via niet-raadbare URL; geen wachtwoord (Netlify betaald).
