# De Frisse Organisatie — verkennende instapscan

Eén korte scan (8–15 minuten) die aan de hand van vier bladeren — Integriteit &
Ethiek, Team & Samenwerking, Organisatie & Structuur, Leiderschap — zichtbaar
maakt welk domein op dit moment de meeste aandacht verdient, en vandaaruit
doorverwijst naar het bijpassende verdiepende instrument.

De scan is een triage-stap vóór die instrumenten, geen vervanging ervan. Er is
geen inlog, geen totaalscore en geen gamification. Het instrument bevat geen
Fontys- of Comenius-gerelateerde content en kan vrij commercieel worden ingezet.

## Draaien

```bash
npm install
npm run dev      # ontwikkelserver
npm run test     # scoringslogica
npm run build    # productie-build naar dist/
```

Configuratie via `.env` — zie `.env.example`. Zonder configuratie werkt de scan
volledig; alleen het opslaan van resultaten is dan uit.

## Structuur

```
src/
  config/       merk, kleuren, de vier bladeren, de twaalf stellingen, alle teksten
  lib/          scoringslogica, kleur- en vormberekening, PDF-export, opslag
  components/   Leaf, Clover, CloverPrintView, ScaleInput, AppShell
  screens/      Landing, Scan, Result
  hooks/        onthullingsanimatie en 'verminder beweging'
supabase/       databaseschema met bewaartermijn
public/assets/  placeholder-beelden + Firefly-prompts (zie de README daar)
```

Teksten, kleuren en stellingen staan uitsluitend in `src/config/`. Een latere
white-label-modus of workshopvariant hoeft alleen die laag te vervangen; de
componenten kennen geen enkele hardgecodeerde naam of kleur.

## Het levende klavertje

Het klavertje op het resultaatscherm is **geen afbeelding**. `Leaf.jsx` tekent
één blad in SVG en interpoleert continu op basis van de score: verzadiging, tint
richting bruin, doorhangen, omkrullen en de glans-highlight. Een vitaal blad
ademt langzaam; een dorstig blad krijgt een zacht knipperend druppel-icoontje.

Bij het tonen van het resultaat starten alle vier de bladeren neutraal en
animeren ze gestaffeld (100 ms per blad, ~1,2 s, ease-out) naar hun eindstand.
`prefers-reduced-motion` schakelt dat uit.

`<Leaf>` heeft alleen `color`, `score` en `label` nodig en is daarmee los
herbruikbaar, bijvoorbeeld in een latere workshopmodus.

## Scoringslogica

Per blad het gemiddelde van drie stellingen (schaal 1–5). Geen totaalscore over
de organisatie. Per blad is één stelling negatief geformuleerd en wordt die
omgekeerd gescoord, om "alles hoog invullen" te dempen.

De hoofdconclusie kent vier uitkomsten:

| Situatie | Uitkomst |
|---|---|
| Eén blad duidelijk het laagst | dat blad uitgelicht |
| Twee of meer bladen gelijk het laagst | alle gelijk urgent uitgelicht |
| Alle vier binnen 0,5 punt én gemiddeld ≥ 3,5 | "geen van de vier springt eruit" |
| Alle vier binnen 0,5 punt én gemiddeld < 3,5 | "meerdere domeinen vragen tegelijk aandacht" |

De laatste variant voorkomt dat een organisatie die overal zwak scoort naar één
willekeurig blad wordt doorverwezen. Alle grenswaarden staan bovenaan
`src/lib/scoring.js` en worden afgedekt door `tests/scoring.test.js`.

Cijfers komen nergens in beeld — niet op het scherm, niet in de PDF en niet in
de `aria-label`s. Overal staat een kwalitatieve duiding ("vraagt aandacht").

## PDF-samenvatting

Eén A4 met kopregel, het klavertje als vaste momentopname, de hoofdconclusie,
een korte toelichting per blad, de vervolgstap en een voettekst met datum en
sessiecode.

De tekst wordt native door jsPDF gezet, dus scherp afdrukbaar; alleen het
klavertje gaat als afbeelding mee. Die komt uit `<CloverPrintView>`: dezelfde
geometrie en eindscores als op het scherm, maar zonder animatie en zonder
`backdrop-filter` — blur rendert onbetrouwbaar in PDF-generators. De glans is
vervangen door een vlakke gradient-overlay.

Voor zwart-wit printen krijgen de vier bladeren een vaste helderheidsladder, zodat
ze in grijstinten uit elkaar te houden blijven; daarnaast staat de naam van het
blad naast elk blad in het beeld.

De generator wordt pas ingeladen als iemand op downloaden klikt, zodat de scan
zelf licht blijft.

## Privacy en bewaartermijn

- Geen inlog en geen gebruikersidentificatie.
- Geen antwoorden per stelling in de database — alleen de sessiecode en het
  gemiddelde per blad.
- Elke rij krijgt een `expires_at` op basis van `VITE_RETENTION_MONTHS`
  (standaard 12 maanden); de database dwingt maximaal 24 maanden af en
  `purge_expired_scan_results()` ruimt op (met pg_cron dagelijks).
- De publieke anon-sleutel mag via RLS uitsluitend rijen toevoegen, niet lezen.

Draai `supabase/schema.sql` in de Supabase SQL-editor om de tabel, de policy en
de opruimfunctie aan te maken.

## Deployment

Bedoeld als eigen Vercel-project op een eigen (sub)domein: `vercel.json` in deze
map regelt de SPA-rewrites en de cache-headers.

Onder een pad van een bestaande site plaatsen kan ook:

```bash
VITE_BASE_PATH=/frisse-organisatie/ npm run build
```

Dit is bewust géén onderdeel van de build van het hoofdplatform in deze repo:
het instrument is extern/MKB-gericht en hoort niet automatisch onder de
Fontys-community-site te hangen.

## Nog te bevestigen vóór livegang

Zie ook §10 van de bouwbriefing. In de code staan deze punten op een plek waar
ze in één handeling te wijzigen zijn:

| Beslissing | Waar |
|---|---|
| Definitieve formulering van de twaalf stellingen | `src/config/statements.js` |
| Bedrijfsnaam verplicht bij start? | `landing.session.required` in `src/config/copy.js` |
| Vorm van de doorverwijzing (link, formulier of e-mail) | `instrument.href` in `src/config/leaves.js`, `brand.contactEmail` in `src/config/brand.js` |
| Bewaartermijn sessiedata | `VITE_RETENTION_MONTHS` + `supabase/schema.sql` |

Zolang er geen link of contactadres is ingevuld, toont het resultaatscherm een
nette regel in plaats van een dode knop.

## Buiten scope

Workshop-presentatiemodus, bureau-dashboard over meerdere klantscans en
instelbare branding via configuratiebestand zijn bewust niet gebouwd. De
config-laag en de losse `<Leaf>`-component zijn wel zo opgezet dat ze later niet
blokkerend zijn.
