# Inventarisatie live-status — Community Moreel Vakmanschap

**Live URL:** https://rvodde-cyber-community-moreel-vakma.vercel.app/  
**Datum:** 19 juli 2026  
**Methode:** code-inspectie (repo `main`) + HTTP-checks tegen live + headless Chrome (homepage, aanmelden, privacy, bibliotheek, gesprekskaarten)  
**Scope:** alleen inventariseren — geen codewijzigingen.

Legenda: ✅ werkt · ⚠️ werkt deels · ❌ ontbreekt of kapot

---

## 1. Domein & hosting

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 1.1 | Custom domein gekoppeld? | ❌ | Site draait alleen op `*.vercel.app`; `moralcraftsmanship.com` / `.nl`-varianten geven geen response (DNS/hosting niet actief). |
| 1.2 | `vercel.json` / domain-config | ⚠️ | `vercel.json` bevat SPA-rewrites/headers, geen domain-config; `BEHEER.md` noemt doeldomein `moralcraftsmanship.com` als nog te koppelen. |
| 1.3 | SSL/HTTPS actief | ✅ | Live antwoordt met HTTP/2 + `strict-transport-security` (Vercel-certificaat actief). |

---

## 2. Formulieren & aanmelding

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 2.1 | Aanmeldformulier: mailto of Google Form? | ⚠️ | Nog `mailto:` (hint “Je mailprogramma opent…”); Google Form alleen als `VITE_GOOGLE_FORM_URL` gezet is — live leeg, geen iframe. |
| 2.2 | Google Spreadsheet-koppeling getest? | ❌ | Geen embedded form live → geen Spreadsheet-koppeling actief/getest. |
| 2.3 | Contactadres `lectoraatethischwerken@fontys.nl`? | ⚠️ | Aanmeld-`emailTo` / maker-contact: correct zonder punt; footer toont echter `r.vodde@fontys.nl`. |

---

## 3. Downloads / werkbladen (MV-serie)

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 3.1 | NL- én EN-downloadknop per MV (01–20 + Vampire Bosses) | ⚠️ | MV_01–MV_20: beide knoppen aanwezig waar bestanden geconfigureerd zijn; **Vampire Bosses-pakket ontbreekt volledig** (geen bestanden, geen UI-entry). |
| 3.2 | Bestandspaden `public/downloads/{zien,wegen,voelen,handelen}/` | ⚠️ | `zien/`, `voelen/`, `wegen/` kloppen; `handelen/` bestaat niet (MV_20/MM_01 liggen in `gesprekskaarten/`); geen `volhouden/`-downloads. |
| 3.3 | Ontbrekende EN → tooltip “Binnenkort beschikbaar” | ✅ | `DownloadKnop` toont disabled knop met `title`/`disabledTitle` = “Binnenkort beschikbaar” / “Coming soon” i.p.v. dode link. |
| 3.4 | Steekproef 5 downloads (live HTTP) | ✅ | Alle 5 getest → HTTP 200: MV_03 NL, MV_08 EN, MV_14 NL, MV_17 NL, MV_20 EN. |

**MV-matrix (kort):** MV_01–MV_19 (+ MV_20) hebben NL+EN-bestanden op schijf en in `bibliotheekData.js`. Extra TechInnovators-bestanden (`MV_16_TechInnovators_*`) staan op disk maar zijn niet als aparte bibliotheekitems gekoppeld. Vampire Bosses: niet gevonden.

---

## 4. Gesprekskaarten / bibliotheek

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 4.1 | Alle kaarten geldige afbeelding? | ✅ | 58/58 kaarten hebben `assets.afbeelding`; lokale + live HEAD-checks: alle bestanden aanwezig (geen broken image-paden). |
| 4.2 | `KaartAfbeelding` met placeholder + dev-warning? | ❌ | Component bestaat niet; `CardMedia` toont img of kleurvlak — geen placeholder/dev-warning. |
| 4.3 | Zoekbalk/filter op bibliotheekpagina? | ❌ | `/bibliotheek` heeft alleen staptegels; zoek/filter zit op `/gesprekskaarten`, niet op de bibliotheek. |
| 4.4 | Complexiteitsrating zichtbaar + filterbaar? | ⚠️ | Op gesprekskaarten: ★/Micro–Meso–Macro zichtbaar én filterbaar; op bibliotheekwerkbladen niet van toepassing/niet aanwezig. |

---

## 5. Model & pagina's per stap

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 5.1 | Vijf stappagina's bereikbaar vanuit cirkelmodel? | ✅ | Routes `/bibliotheek/{zien,voelen,wegen,handelen,volhouden}` (+ EN-slugs) bestaan; `StapKaart`/`CirkelModel` linken ernaartoe. |
| 5.2 | CTA onderaan elke stappagina? | ✅ | Elke `StapPagina` heeft vaste CTA-sectie (“Doe mee →” / “Join us →”). |
| 5.3 | “Combineer dit met →” per stap? | ✅ | `combineerKoppelingen` aanwezig voor stappen 1–5 (cyclisch Volhouden→Zien). |
| 5.4 | Terugkoppel-pijlen + hover/tap-tooltip? | ❌ | Data in `terugkoppelmomenten.js` bestaat, maar wordt nergens geïmporteerd; `ModelWheel` toont alleen voorwaartse pijlen/radialen zonder feedback-tooltips. |

---

## 6. Taal (NL/EN)

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 6.1 | Taalwisselaar op alle pagina's? | ✅ | `TaalSchakelaar` zit in globale navigatie (alle niet-workshop routes); `TaalContext` + route-sync actief. |
| 6.2 | Restjes NL in EN (of omgekeerd)? | ⚠️ | Concrete voorbeelden: EN `pdfHeader`/`pdfFooter` nog “Community Moreel Vakmanschap” / “Lectoraat Ethisch Werken”; SV/CS/DA-UI-locales herhalen die NL-pdf-strings. |

---

## 7. Verhaal / Koers Houden

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 7.1 | `Atlantis_Ltd_Verhaal_v1.docx` gepubliceerd? | ⚠️ | Bestand staat in repo én is live bereikbaar (HTTP 200), maar UI-item KH_01 heeft `bestand_nl`/`bestand_en` = `null` → geen downloadknop. |
| 7.2 | Map `public/downloads/verhaal/`? | ✅ | Map bestaat (met `.gitkeep` + het Atlantis-bestand). |

---

## 8. Techniek & prestaties

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 8.1 | Console-errors homepage + bibliotheek? | ✅ | Headless Chrome: geen `console.error` / uncaught exceptions op `/`, `/bibliotheek`, `/gesprekskaarten`. |
| 8.2 | Meta-tags/SEO per pagina? | ⚠️ | Globale title/description via `DocumentTaal` (NL/EN wisselen); geen per-pagina meta, geen Open Graph/Twitter/canonical. |
| 8.3 | Mobiel acceptabel (breakpoints)? | ⚠️ | Responsive Tailwind (nav wrap, grids); geen console-fouten op 390px — visuele overlap niet volledig screenshot-geverifieerd. |
| 8.4 | Supabase gekoppeld? | ❌ | Geen Supabase-dependency of -config; content/downloads volledig hardcoded/statisch. |

---

## 9. Juridisch / community

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 9.1 | Privacy-/AVG-tekst bij aanmelding? | ❌ | Geen privacy-pagina/route/component; `/privacy` rendert lege shell (alleen nav). |
| 9.2 | Communityrichtlijnen-pagina? | ❌ | Geen richtlijnen-pagina; `/communityrichtlijnen` eveneens lege shell. |

---

## Kritieke blokkers

Punten die een echte publieke lancering in de weg staan:

1. **Geen custom domein** — alleen Vercel-preview-URL; doeldomein (`moralcraftsmanship.com`) nog niet gekoppeld.
2. **Aanmelding via mailto** — geen betrouwbare, meetbare instroom; Google Form/Spreadsheet niet live.
3. **Geen privacy/AVG-tekst** — bij een publieke aanmelding (ook mailto) juridisch ontoereikend.
4. **Geen communityrichtlijnen** — ontbreekt voor een open Community of Practice.
5. **Vampire Bosses-pakket ontbreekt** — genoemd als onderdeel van de MV-serie, maar nergens aanwezig.
6. **Koers Houden / Atlantis niet echt gepubliceerd** — bestand wel online via directe URL, maar niet als download in de UI (gebruikers vinden het niet).
7. **Terugkoppel-pijlen niet geïmplementeerd** — data klaar, UI/tooltips ontbreken (kern van het cyclische model).

---

## Kan wachten

Punten die niet urgent zijn voor launch:

1. **`KaartAfbeelding`-component met placeholder/dev-warning** — afbeeldingen werken nu al; dit is DX/robustheid.
2. **Zoek/filter op bibliotheek-overzicht** — gesprekskaarten hebben dit al; werkbladen zijn per stap klein genoeg.
3. **Per-pagina SEO / Open Graph** — basis title/description bestaat; fine-tuning kan na launch.
4. **Supabase-integratie** — hardcoded content is voor v1 voldoende.
5. **Map `public/downloads/handelen/`** — huidige Handelen-downloads zitten logisch in `gesprekskaarten/`; map herstructureren is cosmetisch.
6. **EN pdfHeader/pdfFooter-restjes** — storend voor polish, niet blokkerend voor NL-lancering.
7. **Footer `r.vodde@` vs aanmeld-`lectoraatethischwerken@`** — inconsistent maar beide geldig; afstemmen is wenselijk, geen harde blocker.
8. **TechInnovators-extra's (MV_16 companions)** — bestanden liggen klaar, UI-koppeling optioneel.
9. **Hero-image voor Verhaal (`stap-verhaal.jpg`)** — ontbreekt; pagina valt terug op kleurvlak.

---

## Samenvatting in één oogopslag

| Domein | Oordeel |
|--------|---------|
| Hosting/SSL | Draait veilig op Vercel; custom domein nog open |
| Content MV 01–20 | Downloads grotendeels compleet en live bereikbaar |
| Vampire Bosses / Verhaal-UI / Terugkoppeling | Ontbreekt of niet aangesloten |
| Aanmelding & juridisch | mailto-only; privacy/richtlijnen ontbreken |
| i18n / SEO / Supabase | Basis werkt; polish en backend nog open |
