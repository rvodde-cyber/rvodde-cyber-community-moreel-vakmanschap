# BEHEER — moralcraftsmanship.com

**Single point of truth** voor indeling van apps op het platform.  
Pas dit bestand aan als een app van categorie wisselt; daarna `npm run workshop:sync` draaien (of laat Cursor dat doen).

## Categorieën

| Categorie | Betekenis |
|-----------|-----------|
| `publiek` | Open op moralcraftsmanship.com — geen wachtwoord |
| `besloten` | Alleen via `/workshop` met wachtwoord |
| `onbepaald` | Nog te bepalen (bijv. Diversiteits Monitor) |

## App-tabel

| App-naam | Vercel-URL | Categorie | Status | Hub-badge | Omschrijving |
|----------|------------|-----------|--------|-----------|--------------|
| MAPS Trilogie | https://maps-trilogie.vercel.app | besloten | live | workshop | Universele morele scenario's — neutraal, nooit zorg-specifiek |
| Moral Maps | https://moral-maps.vercel.app | besloten | live | workshop | GPS-flow voor moreel oriënteren |
| Dilemma Roulette | https://dilemma-roulette.vercel.app | besloten | live | workshop | Rad van Moreel Fortuin (geen term "moreel kompas") |
| Neuro Gym | https://neuro-gym.vercel.app | besloten | live | workshop | Oefeningen moreel redeneren |
| Moreel Leiderschap | https://moreel-leiderschap.vercel.app | besloten | in-ontwikkeling | altijd | Reflectietool ethisch leiderschap |
| Ethos Studio — generator | https://ethos-studio.vercel.app | besloten | live | workshop | Productietool gesprekskaarten |
| Morele Lakmoesproef | https://lakmoesproef.vercel.app | besloten | live | workshop | Strikt gescheiden van MAPS |
| Scherpstellen | https://scherpstellen.vercel.app | besloten | live | workshop | Interactieve congres-app |
| ETZ Gesprekskaarten | https://etz-gesprekskaarten.vercel.app | besloten | live | workshop | ETZ-stijl: wit met blauwe accenten |
| Wisselwerking | https://wisselwerking.vercel.app | besloten | live | altijd | Teamwiel zelfreflectie |
| Community of Practice | https://moralcraftsmanship.com | publiek | live | — | Landingpage en showcase |
| Model Moreel Vakmanschap | https://moralcraftsmanship.com/model | publiek | live | — | SVG model NL/EN |
| HR Dilemmakaarten | https://moralcraftsmanship.com/gesprekskaarten | publiek | live | — | Voorbeeldkaarten, geen generator |
| Educatieve werkbladen | https://moralcraftsmanship.com/bibliotheek | publiek | live | — | 11 werkbladen |
| Ethos Studio — output | https://moralcraftsmanship.com/gesprekskaarten | publiek | live | — | Voorbeeldkaarten publiek |
| Diversiteits Monitor | *(nog geen URL)* | onbepaald | in-ontwikkeling | — | Indeling volgt later |

## Wachtwoord workshop

Zie `workshop-config.json` in deze map. Wijzig alleen dat bestand om het wachtwoord te vernieuwen — geen code-aanpassing nodig.

## Scheidingsregels (hard)

- MAPS Trilogie: universeel, neutraal — nooit zorg-specifiek, nooit gemengd met ETZ
- Lakmoesproef: strikt gescheiden van MAPS
- Dilemma Roulette: term "moreel kompas" mag niet voorkomen
- ETZ-materiaal: gescheiden van algemene/publieke content
