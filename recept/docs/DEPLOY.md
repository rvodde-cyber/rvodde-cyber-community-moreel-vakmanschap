# Deploy Recept (privé)

Laatste update: **29 oktober 2026**

## Toegang

**Netlify Site Protection (wachtwoord) is betaald en niet geconfigureerd.** Toegang berust op een niet-raadbare URL; gebruik alleen voor besloten demo's zonder persoonsgegevens.

## Live URL's

| Link | URL |
| --- | --- |
| **Studentlink** | _Nog niet live — zie deploy hieronder_ |
| **Docentlink** | _`<student-url>?docent=1`_ |

Sitenaam (voorstel): `recept-` + 8 willekeurige tekens (kleine letters/cijfers), bijv. `recept-m4k7n2p9`.

## Git push

**29 okt 2026:** `git push origin main` uitgevoerd (Recept-commits incl. Piotr-lijn).

## Build-controle (`recept/dist`)

| Check | Resultaat 29 okt 2026 |
| --- | --- |
| API-sleutels / wachtwoorden | Niet aangetroffen |
| Persoonsgegevens / testaccounts | Niet aangetroffen |
| Externe requests in app-runtime | Geen `fetch` naar derden in bron; bundle bevat alleen Vite modulepreload voor eigen assets |
| `noindex` + `robots.txt` + `netlify.toml` | Aanwezig |

## Deploy — optie A (CLI)

```bash
cd recept
npm test && npm run build
npx netlify-cli login          # Richard bevestigt in browser
npx netlify-cli sites:create --name recept-m4k7n2p9
npx netlify-cli deploy --prod --dir=dist
```

Vul daarna **Studentlink** hierboven in, genereer QR:

```bash
npm run qr -- https://recept-m4k7n2p9.netlify.app/
```

Output: `docs/qr-student.png` (lokaal, geen externe QR-dienst).

**Status CLI 29 okt:** `npx netlify-cli status` → *Not logged in*.

## Deploy — optie B (handmatig, zonder CLI)

1. `cd recept && npm run build`
2. Open [Netlify Drop](https://app.netlify.com/drop)
3. Sleep de map **`recept/dist`** naar het venster
4. Hernoem site naar een niet-raadbare naam (Site configuration → Domain management)
5. Noteer URL's in deze file + `docs/VOORTGANG.md`, rooktest, QR zoals hierboven

## Deploy — optie C (Git)

Netlify → Import from Git → base **`recept`**, build `npm run build`, publish `dist` (zie `netlify.toml`).

## Opnieuw deployen

Push naar `main` (Git-koppeling) of **Deploys → Trigger deploy** / opnieuw Drop.

## Offline halen

**Site configuration → General → Delete site**, of auto-deploy uitzetten.

## Rooktest (live)

| Check | Student | Docent (`?docent=1`) |
| --- | --- | --- |
| Aflevering 4 start | _ | _ |
| Nabespreking | _ | _ |
| Instellingenmodal | _ | _ |
| Consolefouten | _ | _ |

## SEO / crawlers

- `<meta name="robots" content="noindex,nofollow">` in `index.html`
- `public/robots.txt`: `Disallow: /`
- SPA: `netlify.toml` redirect `/*` → `/index.html` 200

## QR

Student-QR: `docs/qr-student.png` na `npm run qr`. **URL niet publiek delen** (zie `README.md`).
