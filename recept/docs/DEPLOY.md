# Deploy Recept (privé)

Laatste update: **29 oktober 2026** (interventies + Sanne)

## Toegang

**Netlify Site Protection (wachtwoord) is betaald en niet geconfigureerd.** Toegang berust op een niet-raadbare URL; gebruik alleen voor besloten demo's zonder persoonsgegevens.

## Live URL's

| Link | URL |
| --- | --- |
| **Studentlink** | https://recept-k8m3n7p2.netlify.app/ |
| **Docentlink** | https://recept-k8m3n7p2.netlify.app/?docent=1 |

Productie-deploy: **`6ae319264673df90c52be9a6`** (29 okt 2026, commit `7e30fbd`).

## Build-controle (`recept/dist`)

| Check | Resultaat |
| --- | --- |
| API-sleutels / persoonsgegevens | Niet aangetroffen |
| Externe runtime-requests | Geen API-calls naar derden |
| `noindex` + `robots.txt` + `netlify.toml` | OK |

## Deploy

```bash
cd recept && npm test && npm run build
npx netlify-cli deploy --prod --dir=dist
```

## Rooktest live (29 okt 2026)

| Check | Student | Docent (`?docent=1`) |
| --- | --- | --- |
| Aflevering 4 start | OK (naam + keuze ep4) | OK (hervatten + intro) |
| Cold open → onderzoek | OK (overslaan cold) | OK |
| MT-besluit ronde 1 | OK (PILOT + 2 interventies; begroting vereist handmatig bijstellen vóór vastleggen) | OK (zelfde scherm) |
| Beide rondes + slot volledig | **Niet geautomatiseerd afgerond** — budgetregel in r1 blokkeert zonder slider-aanpassing; handmatig afronden aanbevolen |
| Nabespreking | Fallback teksten (concept) | OK: Veilig gesprek CONCEPT, Sanne-panel A/B, gespreksvragen CONCEPT gegroepeerd, Piotr-data docent-only |
| Instellingenmodal | OK | OK |
| Consolefouten | Geen blocking errors waargenomen tijdens navigatie intro → onderzoek → besluit | idem |

**Opmerking:** verborgen meters in de **nabespreking** zijn bewust zichtbaar na het spel (ontwerp demo); concept-interventiedata toont verborgen meters alleen in docentmodus in data-laag, niet gekoppeld aan kaarten in demo.

## QR

`docs/qr-student.png` — URL niet publiek delen.
