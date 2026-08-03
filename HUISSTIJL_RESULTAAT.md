# Huisstijl-consistentiecheck — Community Moreel Vakmanschap

**Datum:** 3 augustus 2026
**Methode:** alleen code-inspectie (`rg`/`node`) tegen de bron van waarheid — **geen wijzigingen aan productcode.**
**Recept:** `docs/recept-huisstijl-consistentiecheck.md`
**Scope:** MAPS/Lakmoesproef-scheiding · bordeaux badges (complexiteit) · ETZ-uniformen

Legenda: ✅ consistent · ⚠️ let op / handmatig beoordelen · ❌ afwijking

---

## A. MAPS / Lakmoesproef-scheiding

| # | Check | Status | Toelichting |
|---|-------|--------|-------------|
| A1 | MAPS-teksten niet zorg-specifiek | ✅ | MAPS-entries in `hub-apps.json` benoemen expliciet "Neutraal en abstract — nooit zorg-specifiek"; geen zorg/patiënt-termen in MAPS-omschrijvingen. |
| A2 | MAPS niet vermengd met ETZ | ✅ | MAPS en ETZ komen alleen samen voor als **aparte** catalogusregels (`BEHEER.md`, `hub-apps.json`), nooit vermengd binnen één app-beschrijving of -route. |
| A3 | Lakmoesproef gescheiden van MAPS | ✅ | Lakmoesproef is een eigen entry; omschrijving benoemt de scheiding letterlijk ("Organisatie Lakmoesproef — strikt gescheiden van MAPS"). |
| A4 | "moreel kompas" (Dilemma-Roulette-scope) | ⚠️ | Harde regel geldt voor de **Dilemma Roulette-app**. Op dit platform komt de term niet in NL voor, maar EN "inner moral compass" staat in `src/data/bibliotheekData.js:386` (Voelen-stap). Buiten Dilemma-Roulette-scope → menselijke beoordeling of dit gewenst is. |

---

## B. Bordeaux badges (complexiteit)

| # | Check | Status | Toelichting |
|---|-------|--------|-------------|
| B1 | Eén waarde voor bordeaux | ✅ | `--complexity-color: #993556` (`src/index.css:20`) en `COMPLEXITY_COLOR = "#993556"` (`src/data/gesprekskaarten/constants.js:29`) zijn identiek. |
| B2 | Badge gebruikt het token | ✅ | `ComplexityBadge` (`src/components/ConversationCard.jsx:17-18`) gebruikt `text-complexiteit` + `var(--complexity-color)`, geen hardcoded hex. |
| B3 | Duplicatie van `#993556` | ⚠️ | De bordeaux staat als **letterlijke** hex op meerdere plekken naast de token-definitie: `constants.js:29`, `stappen.js:30`, `bibliotheekData.js:191,393`, `terugkoppelmomenten.js:16,26`, `ModelWheel.jsx:31`, `public/images/model-moreel-vakmanschap.svg`. Dezelfde hex dient hier ook als **Wegen**-stapkleur (`--kleur-wegen`), dus deels semantisch — maar zonder gedeeld token blijft er drift-risico. |
| B4 | Bordeaux ≠ workshop-badge | ✅ | Workshop-hub-badges (`.workshop-badge-workshop` / `-altijd`) zijn **teal** (`workshop.css:198-206`), losstaand van de bordeaux complexiteitsbadge. Geen kleurvermenging. |

---

## C. ETZ-uniformen

| # | Check | Status | Toelichting |
|---|-------|--------|-------------|
| C1 | ETZ = besloten | ✅ | `etz-gesprekskaarten` heeft `"categorie": "besloten"` in `hub-apps.json:88-96`; nooit `publiek`. |
| C2 | ETZ niet in publieke content | ✅ | ETZ komt alleen voor in besloten context: `hub-apps.json`, `BEHEER.md` en `workshop-config.json` (`workshop_naam: "ETZ Ethiek Training juli"`). Geen ETZ-branding in publieke pagina's/bibliotheek/algemene kaarten. |
| C3 | Uniforme naamgeving/identiteit | ✅ | Consistente schrijfwijze `ETZ Gesprekskaarten` + identiteits­omschrijving "wit met blauwe accenten — gescheiden van algemene content". |
| C4 | Badge-consistentie | ✅ | `hubBadge` bevat alleen `workshop` (8×) en `altijd` (2×); beide bestaan in `BADGE_LABELS` (`WorkshopHub.jsx:5-7`) en als `.workshop-badge-*` in CSS. |
| C5 | Publieke kopie in sync | ✅ | `public/data/workshop/hub-apps.json` = exact de 9 `besloten`+`live`+`url`-apps uit de bron (id/naam/url/badge/omschrijving identiek). Geen drift. |

---

## Afwijkingen (❌)

Geen harde afwijkingen aangetroffen.

## Let op (⚠️)

1. **`bibliotheekData.js:386`** — EN "inner moral compass" in de Voelen-stap. Alleen relevant als je de Dilemma-Roulette-regel breder wilt trekken; anders bewust toegestaan.
2. **Bordeaux `#993556` gedupliceerd** — token bestaat, maar de hex staat ook letterlijk in ≥6 bestanden (deels als Wegen-stapkleur). Overweeg één gedeeld token als bewuste vervolgstap (buiten deze read-only check).

---

## Samenvatting in één oogopslag

| Blok | Oordeel |
|------|---------|
| MAPS / Lakmoesproef-scheiding | Scheiding gerespecteerd; alleen scope-nuance bij "moral compass" |
| Bordeaux badges (complexiteit) | Waarde + badge consistent; letterlijke duplicatie is drift-risico |
| ETZ-uniformen | Volledig consistent en gescheiden; publieke hub-kopie in sync |

**Eindoordeel:** geen harde huisstijl-afwijkingen. Twee ⚠️-punten voor bewuste, latere opvolging — niet blokkerend.
