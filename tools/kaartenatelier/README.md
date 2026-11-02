# Kaartenatelier

Statische browser-app (geen server, geen AI) om v3.0-gesprekskaarten te bouwen uit een `kaartpakket` (JSON) en Firefly-foto's.

## Lokaal

```bash
# vanuit repo-root
npm run dev:kaartenatelier

# of in deze map
npm ci
npm run dev
```

Open de URL die Vite toont (base `/workshop/kaartenatelier/`).

## Testen

```bash
npm run test
```

## Productie-build (via community-site)

```bash
# repo-root
npm run build:kaartenatelier
# uitvoer: public/workshop/kaartenatelier/ (gitignored; mee in hoofd-build)
```

De root-`prebuild` roept `build:kaartenatelier` aan vóór `vite build`, zodat Vercel de app meeneemt.

## Vercel

Rewrites staan in de root-`vercel.json` (`/workshop/kaartenatelier/` → `index.html`). Geen extra env-variabelen.

## Workflow

1. Kaartpakket laden (`schema: kaartenatelier/1`)
2. Controleren (waarschuwingen; rechtvaardigingen niet op kaart)
3. Firefly-prompts kopiëren / downloaden
4. Foto's koppelen en uitsnede
5. Export (map via File System Access API of ZIP)

**Definitieve Word-kwaliteit:** bevestiging door Richard in Microsoft Word (LibreOffice alleen als hulpmiddel).

## Verschil begrippenlijst

Trailing reserve in layout: **500 twips** (praktijk DL15/Defensie); begrippenlijst noemt nog 900 twips voor de slotalinea.
