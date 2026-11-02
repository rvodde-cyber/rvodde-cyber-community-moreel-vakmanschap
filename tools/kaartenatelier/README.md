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
npm run test:golden   # optioneel: KAARTENATELIER_REF_DL15=pad/naar/DL15.docx
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

## Kalibratie A-kaart (fase 1c, nov 2026)

Meting via `node scripts/measure-card-geometry.mjs` op `word/document.xml` (goedgekeurde Word-bestanden op OneDrive).

### Drie referentiekaarten — rijgeometrie identiek

| Bron | DL15 | Management 01 | PS01 |
|------|------|---------------|------|
| Pagina (twips) | 8391 × 11906 | idem | idem |
| Marges | 0 / header 0 / footer 0 | idem | idem |
| Rij 1 witzone | 4953 **atLeast** | idem | idem |
| Rij 2 foto | 5363 **exact** | idem | idem |
| Rij 3 reflectie | 1090 **exact** | idem | idem |
| Som rijen (U) | 11406 | idem | idem |
| **Reserve** (11906 − U) | **500** | idem | idem |

Afgeleide verhoudingen (gemeten): wit/U **43,42%** · fotozone/U **56,58%** · balk/fotozone **16,89%** · beeldhoogte/fotorij **≈97%** (5202 twips; PS01 wp:extent cy +13 twips t.o.v. DL15).

Overig (identiek DL15/Mgmt01): slotalinea `line=100` **exact**, `sz=2`; witcelmarges 260/620/60/620 twips; reflectiecel 620/620; balkvulling `#1F1F1F`; geen `wp:anchor`; geen `a:srcRect` in deze steekproef.

### Legacy formule (RESERVE 500, 45% / 55% / 18% / 97%) vs goedgekeurd

| | Formule | Goedgekeurd | Δ twips | Δ % (t.o.v. goedgekeurd) |
|--|---------|-------------|---------|---------------------------|
| Witzone | 5133 | 4953 | +180 | **3,63%** |
| Fotorij | 5144 | 5363 | −219 | **4,08%** |
| Reflectie | 1129 | 1090 | +39 | **3,58%** |
| Beeldhoogte | 4990 | 5202 | −212 | **4,08%** |

Besluit: verschil **>1% per rij**; drie kaarten onderling **gelijk** → app gebruikt vaste constanten in `src/lib/cardLayoutApproved.ts` (DL15 leidend), niet de 45/55-formule.

### LibreOffice

Test `layout-libreoffice.test.ts` converteert twee status-A-kaarten (lange titel, kort verhaal) naar PDF als `soffice` in PATH staat; anders overgeslagen met melding in testoutput.
