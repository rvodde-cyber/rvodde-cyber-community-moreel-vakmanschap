# Claude — uitleg platform & nieuwe werkvormen toevoegen

Plak de tekst hieronder in Claude als context. Daarna kun je vragen stellen als
"schrijf de entry voor dit nieuwe werkblad" of "controleer of deze entry klopt".

---

## Prompt (kopieer alles tussen de lijnen)

```
## Wat dit platform is

Community Moreel Vakmanschap (moreelvakmanschap.nl) is een Community of Practice
voor docenten en onderzoekers die ethiekonderwijs geven in het hbo en wo. Het is
geen kennisbank en geen cursus: het deelt materiaal waarmee je een moreel gesprek
op gang brengt. Ontwikkeld door Richard Voddé, Comenius Senior Fellow bij het
Lectoraat Ethisch Werken van Fontys Hogescholen.

Alles is geordend volgens het Model Moreel Vakmanschap, vijf stappen die een
cyclus vormen:

1. Zien — wat gebeurt hier werkelijk?
2. Voelen — wat raakt mij hier?
3. Wegen — welke waarden botsen?
4. Handelen — durf ik te doen wat nodig is?
5. Volhouden — houd ik koers?

Daarnaast is er een categorie Verhaal & Reflectie.

Er zijn twee soorten materiaal:
- **Werkbladen en werkvormen** — Word-documenten die je downloadt en in een les
  of sessie gebruikt. Codes als MV_01 t/m MV_20.
- **Gesprekskaarten** — korte praktijkcasussen met twee vaste reflectievragen,
  in de app zelf te lezen. Codes als GK_MM_01. Die volgen een andere procedure
  (zie docs/gesprekskaarten-import.md); verwar ze niet met werkbladen.

Techniek: React 18 met Vite en Tailwind, gehost op Vercel. De site is tweetalig
(NL/EN) voor het materiaal; de interface is er daarnaast in Zweeds, Tsjechisch
en Deens. Er is geen CMS en geen database: al het materiaal staat als code in
de repository, en een push naar main is een publicatie.

## Hoe je een nieuwe werkvorm toevoegt

Er zijn precies twee dingen nodig: het bestand op de juiste plek, en een entry
in het databestand. Er is geen admin-scherm.

**Stap 1 — bestanden.** Zet het Word-document in `public/downloads/{stap}/`,
waarbij {stap} een van deze mappen is: `zien`, `voelen`, `wegen`, `handelen`,
`volhouden`, `verhaal` of `gesprekskaarten`. Bestaat de map nog niet, maak hem
aan. Naamgeving volgt de bestaande reeks:
`MV_22_KorteNaam.docx` voor Nederlands en `MV_22_ShortName_EN.docx` voor Engels.

**Stap 2 — entry toevoegen.** Open `src/data/bibliotheekData.js`. Dat bestand
bevat twee lijsten: `bibliotheekData.nl` en `bibliotheekData.en`. Voeg het
materiaal in **beide** toe, onder dezelfde stap, met dezelfde `id`. Alleen de
titel, omschrijving en thema's verschillen per taal; de bestandsnamen zijn in
beide lijsten identiek.

Voorbeeld van een entry:

    {
      id: 'MV_22',
      titel: 'Titel van het werkblad',
      omschrijving: 'Eén zin over wat je ermee doet.',   // optioneel
      themas: ['Thema een', 'Thema twee'],
      niveau: 'concept',                                  // zie hieronder
      bestand_nl: 'MV_22_KorteNaam.docx',
      bestand_en: 'MV_22_ShortName_EN.docx',
      map: 'wegen',                                       // = de mapnaam
      bron: materiaalBron.MV_22,                          // optioneel
    },

**Stap 3 — bronvermelding.** Is het werkblad gebaseerd op bestaand werk, voeg
dan bovenin hetzelfde bestand een regel toe aan `materiaalBron`, bijvoorbeeld
`MV_22: "Auteur (jaar). Titel. Uitgever."`. Mag ook per taal:
`MV_22: { nl: "…", en: "…" }`.

**Stap 4 — controleren en publiceren.** Draai `npm run build`. Slaagt die,
commit dan en push naar main. Vercel zet het binnen een paar minuten live. Het
materiaal verschijnt daarna vanzelf op de stappagina in de bibliotheek — daar
hoef je verder niets voor aan te passen.

## Velden en toegestane waarden

- `id` — uniek, hoofdletters, oplopend in de reeks (MV_01, MV_02, …). Identiek
  in de NL- en de EN-lijst.
- `titel` — per taal.
- `omschrijving` — optioneel, één of twee zinnen, per taal.
- `themas` — array met twee tot vijf korte trefwoorden, per taal.
- `niveau` — `'concept'` (pas geprobeerd), `'getest'` (minimaal één keer in
  onderwijs gebruikt) of `'aanbevolen'` (positief beoordeeld door meerdere
  leden). Gebruik óf `niveau`, óf `status`, niet allebei.
- `status` — alternatief voor `niveau`: `'beschikbaar'` of `'concept'`.
- `bestand_nl` / `bestand_en` — alleen de bestandsnaam, zonder pad. Bestaat een
  taalversie nog niet, zet dan `null`; de knop wordt dan grijs met de melding
  "Binnenkort beschikbaar".
- `map` — de mapnaam onder `public/downloads/`. Moet exact kloppen, anders geeft
  de downloadknop een 404.
- `binnenkort: true` — voor materiaal dat is aangekondigd maar nog geen bestand
  heeft. Dan zijn `bestand_nl` en `bestand_en` allebei `null`.
- `bron` — string of `{ nl, en }`.

## Valkuilen

- De NL- en EN-lijst raken uit de pas. Werk ze altijd samen bij.
- Een `map` invullen die niet bestaat op schijf. Controleer de mapnaam.
- Een `id` hergebruiken. Kijk eerst welke nummers al bezet zijn, ook op nog niet
  samengevoegde branches.
- Bestanden uploaden zonder entry. Dan staat het document wel op de server, maar
  kan niemand het vinden.
- Denken dat er ergens een beheerscherm is. Dat is er niet: het databestand ís
  de bron van waarheid.

## Checklist voor publicatie

- [ ] Bestand(en) staan in de juiste map onder `public/downloads/`
- [ ] Entry staat in `bibliotheekData.nl` én in `bibliotheekData.en`
- [ ] `id` is uniek, `map` klopt, bestandsnamen kloppen letterlijk
- [ ] Niveau of status ingevuld
- [ ] Bronvermelding toegevoegd als het werk op iemand anders teruggaat
- [ ] `npm run build` slaagt
- [ ] Na de deploy: downloadknoppen NL en EN allebei getest
```

---

*Gesprekskaarten volgen een eigen route — zie `docs/gesprekskaarten-import.md`
en `docs/claude-prompt-gesprekskaarten-batch.md`.*
