# Recept — Huisstijl-consistentiecheck (read-only)

**Type:** read-only audit — **rapporteert alleen, wijzigt niets.**
**Zusje van:** het inventarisatie-recept (`INVENTARISATIE_RESULTAAT.md`).
**Doel:** vertrouwen opbouwen met een check die de huisstijl- en scheidingsregels
bewaakt, vóórdat er een automation komt die zélf PR's maakt.

Dit recept beschrijft precies wat een agent (of Cursor-automation) moet
controleren, waar de bron van waarheid staat, en hoe het rapport eruitziet. De
check raakt **geen productcode aan**: hij leest, vergelijkt en schrijft hoogstens
een rapportbestand (zoals `HUISSTIJL_RESULTAAT.md`).

Legenda rapport: ✅ consistent · ⚠️ let op / handmatig beoordelen · ❌ afwijking

---

## Bron van waarheid

De check verzint geen regels; hij toetst tegen wat al is vastgelegd:

| Bron | Wat staat er |
|------|--------------|
| `moralcraftsmanship-platform/BEHEER.md` → "Scheidingsregels (hard)" | MAPS/Lakmoesproef/ETZ-scheiding + Dilemma Roulette-verbod |
| `moralcraftsmanship-platform/hub-apps.json` | Single point of truth voor apps, categorieën en `hubBadge` |
| `public/data/workshop/hub-apps.json` | Gegenereerde publieke kopie (via `npm run workshop:sync`) |
| `src/index.css` (`:root`) | Kleurtokens, o.a. `--complexity-color` (bordeaux `#993556`) |
| `src/components/workshop/workshop.css` | Badge-styling (`.workshop-badge-*`) |

Als een regel wijzigt, wijzig je eerst de bron — niet de check.

---

## Blok A — MAPS / Lakmoesproef-scheiding

**Harde regels (uit `BEHEER.md`):**
- MAPS Trilogie: universeel en neutraal — **nooit** zorg-specifiek, **nooit** vermengd met ETZ.
- Lakmoesproef: **strikt gescheiden** van MAPS.
- Dilemma Roulette: de term **"moreel kompas"** mag niet voorkomen.

**Wat de check doet (read-only):**

| # | Check | Hoe te toetsen |
|---|-------|----------------|
| A1 | MAPS-teksten niet zorg-specifiek | Zoek in elke MAPS-`omschrijving`/-tekst naar `zorg`, `patiënt`, `ETZ`, ziekenhuis-termen. Catalogus die MAPS én zorg *naast elkaar als aparte items* noemt = OK; vermenging *binnen één app-tekst* = ❌. |
| A2 | MAPS niet vermengd met ETZ | Per app-entry (niet per bestand) controleren dat MAPS- en ETZ-content niet in dezelfde beschrijving/route zitten. |
| A3 | Lakmoesproef gescheiden van MAPS | Lakmoesproef-entry mag niet als MAPS-onderdeel worden gepresenteerd; omschrijving hoort de scheiding te benoemen. |
| A4 | "moreel kompas" (Dilemma Roulette-scope) | Zoek `moreel kompas` / `moral compass`. Treffers **buiten** Dilemma Roulette-content → melden mét scope-nuance (de harde regel geldt voor de Dilemma-Roulette-app, niet automatisch voor het hele platform). |

**Greppable startpunten:**

```bash
rg -n -i "moreel kompas|moral compass" src public moralcraftsmanship-platform
rg -l -i "MAPS" src public moralcraftsmanship-platform | xargs -r rg -l -i "ETZ"
rg -l -i "MAPS" src public moralcraftsmanship-platform | xargs -r rg -l -i "\bzorg|patiënt"
```

> Belangrijk: onderscheid **"samen in een catalogus/tabel"** (toegestaan) van
> **"vermengd in één app-beschrijving of -route"** (afwijking). Meld twijfel als ⚠️.

---

## Blok B — Bordeaux badges (complexiteit)

De complexiteitsbadge op gesprekskaarten gebruikt de bordeaux-kleur
`#993556`, aangestuurd via het token `--complexity-color` (`src/index.css`) en de
Tailwind-klasse `text-complexiteit`. De badge staat in
`ConversationCard.jsx` (`ComplexityBadge`).

**Wat de check doet (read-only):**

| # | Check | Hoe te toetsen |
|---|-------|----------------|
| B1 | Eén bron voor bordeaux | Bevestig dat `--complexity-color` en (indien aanwezig) `COMPLEXITY_COLOR` dezelfde waarde `#993556` hebben. Verschil = ❌. |
| B2 | Badge gebruikt het token | `ComplexityBadge` hoort `var(--complexity-color)` / `text-complexiteit` te gebruiken, geen hardcoded hex. |
| B3 | Duplicatie in kaart | Inventariseer waar `#993556` letterlijk staat i.p.v. via het token; meer bronnen = groter drift-risico → ⚠️. |
| B4 | Bordeaux ≠ workshop-badge | Let op: workshop-hub-badges (`.workshop-badge-*`) zijn **teal**, niet bordeaux. Verwar de twee badge-families niet. |

**Greppable startpunten:**

```bash
rg -n -i "#993556" src public          # alle letterlijke bordeaux-treffers
rg -n "complexity-color|COMPLEXITY_COLOR|text-complexiteit" src tailwind.config.js
```

---

## Blok C — ETZ-uniformen

ETZ-materiaal heeft een eigen, herkenbare identiteit ("wit met blauwe accenten")
en moet **gescheiden** blijven van algemene/publieke content.

**Wat de check doet (read-only):**

| # | Check | Hoe te toetsen |
|---|-------|----------------|
| C1 | ETZ = besloten | Elke ETZ-app in `hub-apps.json` heeft `"categorie": "besloten"` — nooit `publiek`. |
| C2 | ETZ niet in publieke content | ETZ-naam/branding mag niet opduiken in publieke pagina's, bibliotheek of algemene gesprekskaarten. |
| C3 | Uniforme naamgeving | Consistente schrijfwijze (`ETZ Gesprekskaarten`) en identiteits­omschrijving ("wit met blauwe accenten — gescheiden van algemene content"). |
| C4 | Badge-consistentie | `hubBadge`-waarden vallen binnen de toegestane set (`workshop` / `altijd` / `null`) en corresponderen met `.workshop-badge-*` in CSS + `BADGE_LABELS`. |
| C5 | Publieke kopie in sync | `public/data/workshop/hub-apps.json` moet overeenkomen met de `besloten`+`live`+`url`-filtering uit de bron (herrun `npm run workshop:sync` bij drift). |

**Greppable startpunten:**

```bash
rg -n -i "ETZ" src public moralcraftsmanship-platform
rg -o '"hubBadge": "[^"]*"' moralcraftsmanship-platform/hub-apps.json | sort | uniq -c
rg -n "workshop-badge-|BADGE_LABELS" src
```

---

## Outputformaat (rapport)

Schrijf één markdown-rapport (bijv. `HUISSTIJL_RESULTAAT.md`) met:

1. Kop met **datum**, **methode** ("alleen code-inspectie — geen wijzigingen") en **scope**.
2. Per blok (A/B/C) een tabel: `# | Check | Status | Toelichting` met ✅/⚠️/❌.
3. Een sectie **Afwijkingen** (alleen ❌) en **Let op** (⚠️), elk met bestand:regel.
4. Een **Samenvatting in één oogopslag** (blok → oordeel).

Geen adviezen die verder gaan dan rapporteren; verbeteringen zijn een aparte,
bewuste vervolgstap (dáár mag later een PR-automation voor komen).

---

## Grenzen (bewust)

- **Geen** codewijziging aan `src/`, `public/`-assets, configs of styling.
- **Geen** git-commits behalve het rapportbestand zelf.
- **Geen** herschrijven van `hub-apps.json` of het draaien van `workshop:sync`
  (wel *melden* als de publieke kopie uit sync is).
- Twijfel of context nodig? Markeer als ⚠️ en beschrijf wat een mens moet nakijken.

Zo blijft de check veilig en herhaalbaar, en bouwt hij vertrouwen op vóór er een
schrijvende automation bijkomt.

---

## Copy-paste prompt (Cursor-automation, read-only)

```
Je voert een READ-ONLY huisstijl-consistentiecheck uit op deze repository.
Je wijzigt geen productcode; je levert alleen een rapport.

Bron van waarheid:
- moralcraftsmanship-platform/BEHEER.md → "Scheidingsregels (hard)"
- moralcraftsmanship-platform/hub-apps.json (+ public/data/workshop/hub-apps.json)
- src/index.css (:root, --complexity-color = bordeaux #993556)
- src/components/workshop/workshop.css (.workshop-badge-*)

Controleer drie blokken en rapporteer met ✅/⚠️/❌:
A. MAPS/Lakmoesproef-scheiding — MAPS nooit zorg-specifiek of met ETZ vermengd;
   Lakmoesproef strikt gescheiden van MAPS; "moreel kompas" alleen relevant voor
   Dilemma Roulette (meld treffers elders mét scope-nuance). Onderscheid
   "samen in een catalogus" (OK) van "vermengd in één app-tekst" (afwijking).
B. Bordeaux badges — één bron voor #993556 (token vs. COMPLEXITY_COLOR gelijk),
   ComplexityBadge gebruikt het token, inventariseer letterlijke duplicaten,
   verwar niet met de teal workshop-badges.
C. ETZ-uniformen — ETZ altijd categorie "besloten", niet in publieke content,
   uniforme naamgeving/identiteit, hubBadge binnen {workshop, altijd, null} en
   consistent met CSS/labels, publieke hub-kopie in sync.

Lever een markdown-rapport (HUISSTIJL_RESULTAAT.md) met per blok een tabel
(# | Check | Status | Toelichting), secties "Afwijkingen" (❌) en "Let op" (⚠️)
met bestand:regel, en een samenvatting. Geef geen fixes; alleen bevindingen.
```
