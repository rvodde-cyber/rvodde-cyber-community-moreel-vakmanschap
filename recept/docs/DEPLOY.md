# Deploy Recept (privé)

Laatste update: **29 oktober 2026**

## Toegang

**Netlify Site Protection (wachtwoord) is betaald en niet geconfigureerd.** Toegang berust op een niet-raadbare URL; gebruik alleen voor besloten demo's zonder persoonsgegevens.

## Live URL's

| Link | URL |
| --- | --- |
| **Studentlink** | https://recept-k8m3n7p2.netlify.app/ |
| **Docentlink** | https://recept-k8m3n7p2.netlify.app/?docent=1 |

Sitenaam: `recept-k8m3n7p2` (niet-raadbaar).

## Build-controle (`recept/dist`)

| Check | Resultaat 29 okt 2026 |
| --- | --- |
| API-sleutels / wachtwoorden | Niet aangetroffen in `dist/` |
| Persoonsgegevens / testaccounts | Niet aangetroffen |
| Externe requests in app-runtime | Geen API-calls naar derden; alleen Vite modulepreload voor eigen assets |
| `noindex` + `robots.txt` + `netlify.toml` | Aanwezig (`index.html`, `public/robots.txt`, `netlify.toml` publish `dist`, SPA `/* → /index.html 200`) |

## Deploy (CLI)

```bash
cd recept
npm test && npm run build
npx netlify-cli deploy --prod --dir=dist
```

**Status 29 okt:** ingelogd als Richard Voddé; productie-deploy `6ae314145ef87064a75debcb` live.

## Deploy — handmatig (Drop)

1. `cd recept && npm run build`
2. [Netlify Drop](https://app.netlify.com/drop) → map `recept/dist`
3. URL's hierboven bijwerken

## QR

```bash
npm run qr -- https://recept-k8m3n7p2.netlify.app/
```

Output: `recept/docs/qr-student.png` (lokaal gegenereerd). **De URL niet publiek delen** (zie `README.md`).

## Rooktest live (29 okt 2026)

| Check | Student | Docent (`?docent=1`) |
| --- | --- | --- |
| Aflevering 4 start | OK (intro ronde 1 na voornaam + keuze ep4) | OK (sessie hervat zichtbaar) |
| Nabespreking | Niet volledig doorlopen in rooktest | Conceptblokken in data; volledige flow handmatig na spelen |
| Instellingenmodal | OK | OK |
| Consolefouten | Geen blocking errors waargenomen in browser-snapshot | idem |

## SEO / crawlers

- `<meta name="robots" content="noindex,nofollow">`
- `public/robots.txt`: `Disallow: /`
