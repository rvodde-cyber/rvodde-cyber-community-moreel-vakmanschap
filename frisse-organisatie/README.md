# De Frisse Organisatie — verkennende instapscan

Eén korte scan (8–15 minuten) die aan de hand van vier bladeren — Integriteit &
Ethiek, Team & Samenwerking, Organisatie & Structuur, Leiderschap — zichtbaar
maakt welk domein op dit moment de meeste aandacht verdient, en vandaaruit
doorverwijst naar het bijpassende verdiepende instrument.

De scan is een triage-stap vóór die instrumenten, geen vervanging ervan. Er is
geen inlog, geen totaalscore en geen gamification. Het instrument bevat geen
Fontys- of Comenius-gerelateerde content en kan vrij commercieel worden ingezet.

## Twee onderdelen

**A. Individueel invullen.** Elk teamlid vult de twintig stellingen in op het
eigen apparaat, ziet direct het eigen klavertje en kan daar een PDF van
downloaden. Dat resultaat blijft van de invuller.

**B. Teamresultaat samenstellen.** Wie wil dat zijn invulling meetelt in een
teambeeld, stuurt zijn **deel-code** naar één iemand — dat kan elk teamlid zijn.
Die plakt de codes in het scherm "Teamresultaat samenstellen", waarna de app het
gemiddelde berekent en er een team-PDF van maakt om rond te sturen.

## Geen backend, geen opslag

Dit is een statische site. Er is geen server, geen database en geen
localStorage. Antwoorden staan uitsluitend in de React-state van het geopende
tabblad en zijn weg zodra dat sluit.

De enige gegevens die ooit een apparaat verlaten zijn er twee, en beide alleen
doordat de gebruiker dat zelf doet: de deel-code die hij doorstuurt, en de PDF
die hij downloadt. Er is geen moment waarop iets automatisch wegggaat.

Een teamresultaat bevat daarom ook geen individueel herleidbare scores: het is
een gemiddelde, en het aggregeren gebeurt in de browser van de verzamelaar.

## Draaien

```bash
npm install
npm run dev      # ontwikkelserver
npm run test     # scoringslogica en deel-codes
npm run build    # productie-build naar dist/
```

## Structuur

```
src/
  config/       merk, contactgegevens, de vier bladeren, de twintig stellingen, alle teksten
  lib/          scoringslogica, deel-codes, kleur- en vormberekening, PDF-export
  components/   Leaf, Clover, CloverPrintView, ScaleInput, ShareCodePanel, AppShell
  screens/      Landing, Scan, Result (individueel én team), Collector
  hooks/        onthullingsanimatie en 'verminder beweging'
public/assets/  placeholder-beelden + Firefly-prompts (zie de README daar)
```

Teksten, kleuren, stellingen en contactgegevens staan uitsluitend in
`src/config/`. Een latere white-label-modus of workshopvariant hoeft alleen die
laag te vervangen; de componenten kennen geen enkele hardgecodeerde naam of
kleur.

## De stellingen

Twintig stellingen, vijf per blad, waarvan er per blad precies één omgekeerd
scoort (`score' = 6 − score`) om "alles hoog invullen" te dempen. De omgekeerde
stellingen staan verspreid over de lijst en nooit naast elkaar, en twee
stellingen van hetzelfde blad volgen elkaar nooit op — dat wordt in de tests
afgedwongen.

De formulering is per blad geïnspireerd op een gevalideerd instrument, hertaald
naar de praktijk van een MKB-organisatie:

| Blad | Gebaseerd op |
|---|---|
| Integriteit & Ethiek | Corporate Ethical Virtues Model (Kaptein, 2008) |
| Team & Samenwerking | Psychologische veiligheid (Edmondson, 1999) |
| Organisatie & Structuur | Readiness for Organizational Change (Armenakis e.a., 1993; Holt e.a., 2007) |
| Leiderschap | Authentic Leadership Questionnaire (Walumbwa e.a., 2008) |

De volledige referenties staan bij elk blad in `src/config/leaves.js` en worden
op de landingspagina verkort getoond.

De lijst zelf staat uitsluitend in `src/config/statements.js`; deze README
herhaalt hem bewust niet, zodat tekst en toelichting niet uit elkaar kunnen
lopen. Twee regels bij het herformuleren, uit een leesronde op de eerste versie:

- **Geen dubbele ontkenning in een positief gescoorde stelling.** Mensen zien het
  ontkennende woord en scoren instinctief laag, ook als de zin het omgekeerde
  vraagt ("voelt niet ongemakkelijk" werd "voelt vanzelfsprekend").
- **Geen stelling die twee dingen tegelijk vraagt.** Wie vraagt of iets
  besprekbaar is én of het veilig is, weet bij een lage score niet welk van
  beide het probleem is; kies de kern die het onderliggende instrument meet.

## Deel-codes

Een deel-code ziet er zo uit:

```
VANDIJKTECHN-A7X2K9M4P1Z3
```

Het leesbare voorvoegsel is de bedrijfsnaam, zodat de verzamelaar codes van
dezelfde scan herkent. Daarna volgt een versieteken, de twintig antwoorden
(per tien gepakt als grondtal-5-getal in base36) en een checksum van twee
tekens. De code bevat geen naam, geen tijdstip en geen apparaatgegevens — twee
mensen met dezelfde antwoorden krijgen exact dezelfde code.

Bij het plakken wordt elke regel apart gevalideerd. Een onleesbare code blokkeert
de rest niet: de verzamelaar ziet per regelnummer wat er mis is (typefout,
onvolledig gekopieerd, andere versie) en kan die ene code opnieuw opvragen.

## Scoringslogica

Per blad het gemiddelde van vijf stellingen (schaal 1–5). Geen totaalscore over
de organisatie.

Voor het teamresultaat wordt eerst per invuller het bladgemiddelde berekend en
dán het gemiddelde daarvan. Niet de losse antwoorden over alle invullers
middelen: dat zou iemand die overal extreem scoort onevenredig zwaar laten
meetellen.

De hoofdconclusie kent vier uitkomsten, gelijk voor individu en team:

| Situatie | Uitkomst |
|---|---|
| Eén blad duidelijk het laagst | dat blad uitgelicht |
| Twee of meer bladen gelijk het laagst | alle gelijk urgent uitgelicht |
| Alle vier binnen 0,5 punt én gemiddeld ≥ 3,5 | "geen van de vier springt eruit" |
| Alle vier binnen 0,5 punt én gemiddeld < 3,5 | "meerdere domeinen vragen tegelijk aandacht" |

Alle grenswaarden staan bovenaan `src/lib/scoring.js` en worden afgedekt door
`tests/scoring.test.js`.

Cijfers komen nergens in beeld — niet op het scherm, niet in de PDF en niet in
de `aria-label`s. Overal staat een kwalitatieve duiding ("vraagt aandacht").

## Het levende klavertje

Het klavertje op het resultaatscherm is **geen afbeelding**. `Leaf.jsx` tekent
één blad in SVG en interpoleert continu op basis van de score: verzadiging,
verkleuring richting grijsbruin, doorhangen, omkrullen en de glans-highlight.
Een vitaal blad ademt langzaam; een dorstig blad krijgt een zacht knipperend
druppel-icoontje.

Bij het tonen van het resultaat starten alle vier de bladeren neutraal en
animeren ze gestaffeld (100 ms per blad, ~1,2 s, ease-out) naar hun eindstand.
`prefers-reduced-motion` schakelt dat uit.

`<Leaf>` heeft alleen `color`, `score` en `label` nodig en is daarmee los
herbruikbaar, bijvoorbeeld in een latere workshopmodus.

## PDF-samenvatting

Eén A4 met kopregel, het klavertje als vaste momentopname, de hoofdconclusie,
een korte toelichting per blad, de vervolgstap en een voettekst met datum en
bedrijfsnaam. Twee varianten van dezelfde opmaak:

| Variant | Kopregel | Bestandsnaam |
|---|---|---|
| Individueel | "Individueel resultaat" | `de-frisse-organisatie-eigen-resultaat-{bedrijfsnaam}.pdf` |
| Team | "Teamresultaat — gebaseerd op N individuele invullingen" | `de-frisse-organisatie-teamresultaat-{bedrijfsnaam}.pdf` |

De tekst wordt native door jsPDF gezet, dus scherp afdrukbaar; alleen het
klavertje gaat als afbeelding mee. Die komt uit `<CloverPrintView>`: dezelfde
geometrie en eindscores als op het scherm, maar zonder animatie en zonder
`backdrop-filter` — blur rendert onbetrouwbaar in PDF-generators. De glans is
vervangen door een vlakke gradient-overlay.

Voor zwart-wit printen krijgen de vier bladeren een vaste helderheidsladder,
zodat ze in grijstinten uit elkaar te houden blijven; daarnaast staat de naam van
het blad naast elk blad in het beeld.

De generator wordt pas ingeladen als iemand op downloaden klikt, zodat de scan
zelf licht blijft.

## Deployment

Er zijn geen environment variables nodig.

**Eindbestemming: een eigen Vercel-project op een eigen (sub)domein.** De
`vercel.json` in deze map regelt daarvoor de SPA-rewrites en de cache-headers.
Dat past bij de positionering: het instrument is extern en MKB-gericht en hoeft
niet onder de Fontys-community-site te hangen.

**Voorlopig draait hij ook mee met het hoofdplatform**, op het pad
`/frisse-organisatie`, zodat de scan te bekijken is zonder dat er al een apart
project is aangemaakt. Dat pad staat nergens in de navigatie. Het zit vast aan
twee plekken in de repo-root:

- `package.json` → het script `build:frisse-organisatie`, aangehaakt aan `build`;
- `vercel.json` → de rewrites en headers voor `/frisse-organisatie`.

Zodra er een eigen project of subdomein is, kunnen die twee eruit en verandert
er niets aan deze map.

Los bouwen kan altijd:

```bash
npm run build                                     # standalone, base "/"
VITE_BASE_PATH=/frisse-organisatie/ npm run build # onder een pad
```

## Nog te bevestigen vóór livegang

| Beslissing | Waar |
|---|---|
| Contactgegevens bij de doorverwijzing | `CONTACT_INFO` bovenaan `src/config/brand.js` |
| Vorm van de doorverwijzing (link, formulier of e-mail) | `instrument.href` in `src/config/leaves.js` |
| Tweede lezer over toon en begrijpelijkheid van de twintig stellingen | `src/config/statements.js` |

Zolang `CONTACT_INFO` leeg is, toont de app overal de zichtbare placeholder
"Contactgegevens volgen" in plaats van een dode knop.

## Buiten scope

Workshop-presentatiemodus, bureau-dashboard over meerdere klantscans en
instelbare branding via configuratiebestand zijn bewust niet gebouwd. Een
dashboard zou een eigen opslaglaag en een eigen privacy-afweging vragen; dat is
een latere, bewuste beslissing en glipt er nu niet stilzwijgend in.
