# Inventarisatie live-status — Community Moreel Vakmanschap

**Live URL:** https://rvodde-cyber-community-moreel-vakma.vercel.app/  
**Datum:** 19 juli 2026  
**Methode:** code-inspectie + HTTP-checks tegen live + headless Chrome (homepage, aanmelden, privacy, bibliotheek, gesprekskaarten); deel 2: workshop-auth API’s, middleware, hub-apps  
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

## 10. Besloten gedeelte / login

**Belangrijk onderscheid:** dit is **geen Fase-3-ledenomgeving** (geen accounts, profiel, uploads), maar een **Workshop Hub**: gedeeld sessiewachtwoord → overzicht van externe workshop-apps. Bewust gebouwd (commits o.a. “Add password-protected Workshop Hub”, “Add workshop preview access”).

### Authenticatie

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 10.1 | Supabase Auth of andere oplossing? | ⚠️ | **Geen Supabase** — tijdelijke shared-password + HMAC-cookie (`workshop_session`); secret via `WORKSHOP_SESSION_SECRET` of hardcoded fallback. |
| 10.2 | Welke inlogmethoden actief? | ⚠️ | Alleen gedeeld wachtwoord / voorproefcode; geen e-mail/wachtwoord-accounts, magic link of Google OAuth. |
| 10.3 | Registratieflow of alleen vooraf accounts? | ❌ | Geen registratie en geen user-accounts; iedereen met de juiste code krijgt dezelfde sessie. |
| 10.4 | Waar staat de auth-logica? | ✅ | `api/workshop/verify.js` · `session.js` · `logout.js` · `lib/workshop-session.js` · `middleware.js` · UI: `WorkshopLogin.jsx` / `WorkshopHub.jsx` · codes: `moralcraftsmanship-platform/workshop-config.json`. |

### Wat zit er achter het slot

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 10.5 | Welke routes afgeschermd? | ⚠️ | Bedoeld: `/workshop/apps` en `/besloten/*` (middleware + client-check); loginpagina’s `/workshop` en `/workshop/voorproef` zijn open. |
| 10.6 | Profielpagina + velden? | ❌ | Geen profielpagina; geen naam/instelling/focusstap/avatar — alleen `workshop_naam` in de sessie. |
| 10.7 | Uploadmogelijkheid voor leden? | ❌ | Geen upload; hub linkt alleen naar externe apps. (Marketingtekst “Jouw materialen” is aspiratie, geen feature.) |
| 10.8 | Exclusieve content voor ingelogden? | ⚠️ | Hub-lijst is het “besloten” deel, maar `hub-apps.json` is publiek én de meeste app-URL’s zijn zonder login bereikbaar; `/wisselwerking/` ook open. |

### Status en risico

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 10.9 | Bewust gebouwd of side-effect? | ✅ | Bewuste Cursor-/platformopdracht (Workshop Hub voor workshops), niet een toevallig experiment. |
| 10.10 | Login volledig / half / onbeveiligd? | ❌ | API-login **werkt** (cookie + session), maar `/workshop/apps` en `/besloten` geven live **HTTP 500 `MIDDLEWARE_INVOCATION_FAILED`** — ook mét geldige cookie. Hub is dus kapot achter het slot. |
| 10.11 | Testaccounts/wachtwoorden in repo? | ❌ | Ja — gedeelde codes staan in git + BEHEER.md; plus fallback-secret in code. Zie “Let op — voor Richard”. |
| 10.12 | Rechtenbeheer (lid vs gast)? | ❌ | Geen rollen; hoogstens vlag `voorproef` (banner), verder iedereen gelijk. |

### Impact op launch

| # | Check | Status | Toelichting |
|---|--------|--------|-------------|
| 10.13 | Mag blijven staan bij publieke lancering? | ❌ | Niet als “ledenomgeving” presenteren; nu functioneel kapot (500) en wachtwoorden in repo → eerst verbergen of herstellen. |
| 10.14 | Risico bezoekers in kapotte/lege omgeving? | ⚠️ | Geen link in publieke nav, maar `/workshop` is wel bereikbaar; wie die URL vindt ziet login, daarna 500 op de hub. |

**Advies (oorspronkelijk):** moet tijdelijk verborgen/uitgeschakeld worden.

### Update — afschermen uitgevoerd (19 juli 2026)

| Actie | Status | Toelichting |
|-------|--------|-------------|
| Hub kill-switch | ✅ | `WORKSHOP_HUB_ENABLED` / `VITE_WORKSHOP_HUB_ENABLED` — default **uit**; `/workshop/*` en `/besloten/*` → “Binnenkort beschikbaar” |
| Geen 500 meer als “beveiliging” | ✅ | Middleware redirect bewust naar `/workshop/unavailable` i.p.v. te crashen |
| Fallback-secret verwijderd | ✅ | Ontbrekende `WORKSHOP_SESSION_SECRET` = harde fout (geen `"dev-only-change-in-production"`) |
| Wachtwoorden uit config/repo | ✅ | `workshop-config.json` bevat geen secrets meer; codes via Vercel env vars |
| BEHEER.md opgeschoond | ✅ | Letterlijke codes verwijderd; verwijzing naar Vercel Environment Variables |
| Nieuwe wachtwoorden gegenereerd | ✅ | Alleen in veilig artifact voor Richard (niet in git/PR) |
| Oude codes in Git-geschiedenis | ⚠️ | **Nog vindbaar** in oude commits — als gecompromitteerd beschouwen; history rewrite niet gedaan in deze stap |

**Advies nu:** kan blijven staan tijdens publieke lancering **zolang** `WORKSHOP_HUB_ENABLED` / `VITE_WORKSHOP_HUB_ENABLED` op `false` blijven (default). Pas inschakelen na Vercel-env + redeploy.

### Let op — voor Richard

1. **Zet de nieuwe secrets in Vercel** — zie artifact `WORKSHOP_SECRETS_FOR_RICHARD.txt` (cloud agent artifacts; niet in de GitHub-PR).
2. **Oude codes zijn gecompromitteerd** — o.a. `workshop-juli-2026` / `kijken-juli-2026` en de oude fallback-secret staan nog in Git-geschiedenis (`git log -S`). Niet hergebruiken; history-purge optioneel later (aparte actie).
3. **Externe workshop-apps** blijven los bereikbaar op hun eigen `*.vercel.app`-URL’s — de hub-afscherming blokkeert de catalogus/login op dit platform, niet die aparte projecten.
4. Om de hub later weer aan te zetten: beide `*_HUB_ENABLED=true` + alle drie secrets gezet + redeploy.

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
8. **Workshop Hub secrets in Vercel zetten** — code is opgeschoond; Richard moet nieuwe env-vars in Vercel plakken vóór eventuele herinschakeling (hub staat default uit).

---

## Kan wachten

Punten die niet urgent zijn voor launch:

1. **`KaartAfbeelding`-component met placeholder/dev-warning** — afbeeldingen werken nu al; dit is DX/robustheid.
2. **Zoek/filter op bibliotheek-overzicht** — gesprekskaarten hebben dit al; werkbladen zijn per stap klein genoeg.
3. **Per-pagina SEO / Open Graph** — basis title/description bestaat; fine-tuning kan na launch.
4. **Supabase-integratie / echte ledenomgeving (Fase 3)** — Workshop Hub is geen vervanger; accounts/profiel/upload mogen later.
5. **Map `public/downloads/handelen/`** — huidige Handelen-downloads zitten logisch in `gesprekskaarten/`; map herstructureren is cosmetisch.
6. **EN pdfHeader/pdfFooter-restjes** — storend voor polish, niet blokkerend voor NL-lancering.
7. **Footer `r.vodde@` vs aanmeld-`lectoraatethischwerken@`** — inconsistent maar beide geldig; afstemmen is wenselijk, geen harde blocker.
8. **TechInnovators-extra's (MV_16 companions)** — bestanden liggen klaar, UI-koppeling optioneel.
9. **Hero-image voor Verhaal (`stap-verhaal.jpg`)** — ontbreekt; pagina valt terug op kleurvlak.
10. **Externe workshop-apps écht achter login zetten** — nu bewust losse Vercel-projecten; pas relevant als de hub weer live en bedoeld besloten is.

---

## Samenvatting in één oogopslag

| Domein | Oordeel |
|--------|---------|
| Hosting/SSL | Draait veilig op Vercel; custom domein nog open |
| Content MV 01–20 | Downloads grotendeels compleet en live bereikbaar |
| Vampire Bosses / Verhaal-UI / Terugkoppeling | Ontbreekt of niet aangesloten |
| Aanmelding & juridisch | mailto-only; privacy/richtlijnen ontbreken |
| Besloten / login | Hub default UIT (“Binnenkort beschikbaar”); secrets uit code; oude codes nog in git-history |
| i18n / SEO / Supabase | Basis werkt; polish en backend nog open |
