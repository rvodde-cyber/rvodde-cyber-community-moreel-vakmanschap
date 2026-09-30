# BEHEER — moralcraftsmanship.com

**Single point of truth** voor indeling van apps op het platform.  
Pas dit bestand aan als een app van categorie wisselt; daarna `npm run workshop:sync` draaien (of laat Cursor dat doen).

**Platform-URL (Vercel):** https://rvodde-cyber-community-moreel-vakma.vercel.app  
**Doel-domein:** moralcraftsmanship.com (koppelen in Vercel → Domains)

## Workshop Hub — status

De Workshop Hub is **standaard uitgeschakeld** (`WORKSHOP_HUB_ENABLED=false`).  
Zolang die vlag niet op `true` staat, tonen `/workshop`, `/workshop/apps` en `/besloten` een nette “Binnenkort beschikbaar”-pagina.

### Secrets & wachtwoorden (niet in deze repo)

Zet deze **alleen** in Vercel → Project → Settings → Environment Variables (Production + Preview):

| Variabele | Doel |
|-----------|------|
| `WORKSHOP_HUB_ENABLED` | `true` om de hub in te schakelen; anders uit |
| `VITE_WORKSHOP_HUB_ENABLED` | Zelfde waarde als hierboven (Vite build-time) |
| `WORKSHOP_SESSION_SECRET` | HMAC-secret voor sessiecookies (sterk, uniek) |
| `WORKSHOP_PASSWORD` | Gedeeld workshopwachtwoord |
| `WORKSHOP_VOORPROEF_PASSWORD` | Code voor tijdelijke voorvertoning |

Niet-geheime metadata (naam, geldigheidsdatum) staat in `workshop-config.json` — **zonder wachtwoorden**.

Nieuwe codes / secrets: apart en veilig aan Richard doorgeven (niet via GitHub-commit of publieke chat). Oude codes die ooit in git stonden: als gecompromitteerd beschouwen en niet hergebruiken.

## Categorieën

| Categorie | Betekenis |
|-----------|-----------|
| `publiek` | Open op moralcraftsmanship.com — geen wachtwoord |
| `besloten` | Alleen via `/workshop` met wachtwoord (wanneer hub is ingeschakeld) |
| `onbepaald` | Nog te bepalen (bijv. Diversiteits Monitor) |

## App-tabel

| App-naam | Vercel-URL | GitHub | Categorie | Status | Hub-badge |
|----------|------------|--------|-----------|--------|-----------|
| MAPS Trilogie (deel 1) | https://moral-maps.vercel.app | moral-maps | besloten | live | workshop |
| MAPS Trilogie (deel 2) | https://moral-maps-2-crossroads.vercel.app | moral-maps | besloten | live | — |
| MAPS Trilogie (deel 3) | https://moral-maps-3-final-destination.vercel.app | moral-maps | besloten | live | — |
| Moral Maps (GPS) | https://moral-maps.vercel.app | moral-maps | besloten | live | workshop |
| Dilemma Roulette | https://rad-van-moreel-fortuin.vercel.app | Vercel: rad-van-moreel-fortuin | besloten | live | workshop |
| Neuro Gym | https://neuro-gym.vercel.app | quiz-repetitie | besloten | live | workshop |
| Moreel Leiderschap | https://leergang-moreel-leiderschap.vercel.app | leergang-moreel-leiderschap | besloten | live | altijd |
| Ethos Studio — generator | https://rvodde-cyber.github.io/ethos-studio/ | ethos-studio | besloten | live | workshop |
| Morele Lakmoesproef | https://lakmoesproef.vercel.app | Lakmoesproef | besloten | live | workshop |
| Scherpstellen | *(alleen preview, nog geen productie)* | community (branch verdenk) | besloten | in-ontwikkeling | workshop |
| ETZ Gesprekskaarten | https://etz.vercel.app | — | besloten | live | workshop |
| Wisselwerking | https://wisselwerking.vercel.app | community/teamkompas | besloten | live | altijd |
| Community of Practice | https://rvodde-cyber-community-moreel-vakma.vercel.app | community | publiek | live | — |
| Model Moreel Vakmanschap | …/model | community | publiek | live | — |
| HR Dilemmakaarten | …/gesprekskaarten | community | publiek | live | — |
| Educatieve werkbladen | …/bibliotheek | community | publiek | live | — |
| Ethos Studio — output | …/gesprekskaarten | community | publiek | live | — |
| Diversiteits Monitor | *(nog geen URL)* | — | onbepaald | in-ontwikkeling | — |

## Vercel-projecten (jouw dashboard)

| Vercel-naam | URL | GitHub |
|-------------|-----|--------|
| neuro-gym | neuro-gym.vercel.app | quiz-repetitie |
| leergang-moreel-leiderschap | leergang-moreel-leiderschap.vercel.app | leergang-moreel-leiderschap |
| moreel-leiderschap-app | moreel-leiderschap-app.vercel.app | moreel-leiderschap-app |
| rad-van-moreel-fortuin | rad-van-moreel-fortuin.vercel.app | *(losgekoppeld)* |
| moral-maps (+ hw6b, apjz) | moral-maps.vercel.app | moral-maps |
| moral-maps-2-crossroads | moral-maps-2-crossroads.vercel.app | moral-maps |
| moral-maps-3-final-destination | moral-maps-3-final-destination.vercel.app | moral-maps |
| lakmoesproef | lakmoesproef.vercel.app | Lakmoesproef |
| **wisselwerking** | wisselwerking.vercel.app *(na aanmaken)* | community/teamkompas |

**Wisselwerking** als apart project: Vercel → Add New → Import `rvodde-cyber-community-moreel-vakmanschap` → Root Directory: `teamkompas` → Deploy. Tot die tijd werkt de embedded URL via het community-project.

## Tijdelijk rondkijken (voorvertoning)

Alleen beschikbaar als de Workshop Hub is ingeschakeld (`WORKSHOP_HUB_ENABLED=true` én `VITE_WORKSHOP_HUB_ENABLED=true`).

**Link:** `https://rvodde-cyber-community-moreel-vakma.vercel.app/workshop/voorproef`  
*(of moralcraftsmanship.com/workshop/voorproef zodra het domein gekoppeld is)*

**Voorproefcode:** zie Vercel environment variable `WORKSHOP_VOORPROEF_PASSWORD` (niet in deze repo).  
Geldigheid/metadata: `voorproef.geldig_tot` in `workshop-config.json`. Sessieduur: max. `voorproef.duur_uren` uur.

## Overige Vercel-projecten (niet in workshop-hub)

| Naam | URL | Opmerking |
|------|-----|-----------|
| Machtskruising | https://wheel-of-privilege.vercel.app | Apart project, geen Dilemma Roulette |
| Rad van Moreel Fortuin | https://rad-van-moreel-fortuin.vercel.app | = Dilemma Roulette (Git losgekoppeld in Vercel) |
| HEROES Project | https://heroes-project-eight.vercel.app | Participant Reflection Form |
| Moreel Vakmanschap (login) | https://moreel-leiderschap-app.vercel.app | Aparte login-app |

## Scheidingsregels (hard)

- MAPS Trilogie: universeel, neutraal — nooit zorg-specifiek, nooit gemengd met ETZ
- Lakmoesproef: strikt gescheiden van MAPS
- Dilemma Roulette: term "moreel kompas" mag niet voorkomen
- ETZ-materiaal: gescheiden van algemene/publieke content
