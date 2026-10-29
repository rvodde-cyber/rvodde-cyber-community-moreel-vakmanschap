# Deploy Recept (privé)

Laatste update: **29 oktober 2026**

## Live URL

| Veld | Waarde |
| --- | --- |
| **URL** | _Nog niet gedeployed — zie hieronder_ |
| **Sitenaam (voorstel)** | `recept-<6 willekeurige tekens>.netlify.app` |
| **Wachtwoord** | Netlify Site Protection is betaald; **niet geconfigureerd**. Alleen obscuriëren via sitenaam + `noindex`. |

### Deploy uitvoeren (Richard / beheerder)

1. Push naar GitHub: `git push origin main` (13 commits Recept; lokaal ahead of origin).
2. Netlify: **Add new site** → Import from Git → monorepo, base directory **`recept`**, build **`npm run build`**, publish **`dist`** (of gebruik meegeleverde `recept/netlify.toml`).
3. Kies site name: bijv. `recept-x7k2m9` (niet voorspelbaar).
4. Noteer URL hieronder en voer rooktest uit.

## Build lokaal

```bash
cd recept
npm test
npm run build
```

Controle: geen API-sleutels of persoonsgegevens in `dist/` (alleen gebundelde spelcode + statische assets).

## Opnieuw deployen

Netlify deployt automatisch bij push naar de gekoppelde branch, of handmatig **Deploys → Trigger deploy**.

## Offline halen

Netlify: **Site configuration → General → Delete site**, of stop auto-deploy en zet een lege placeholder.

## Rooktest (live)

| Check | Resultaat |
| --- | --- |
| Aflevering 4 start | _uit te voeren na deploy_ |
| `?docent=1` (pauze, export) | _uit te voeren_ |
| Nabespreking | _uit te voeren_ |
| Consolefouten | _uit te voeren_ |

## SEO / crawlers

- `<meta name="robots" content="noindex,nofollow">` in `index.html`
- `public/robots.txt`: `Disallow: /`
