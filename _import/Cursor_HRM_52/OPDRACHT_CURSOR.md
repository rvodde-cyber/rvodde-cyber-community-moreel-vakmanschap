# Opdracht voor Cursor — 52 HRM-kaarten (Praktijkschok) toevoegen aan moreelvakmanschap.nl

## Doel
Voeg de 52 kaarten uit `cards_hrm_52.json` toe aan de bestaande categorie `hrm` (sector HRM, #3949AB), naast de 15 kaarten die er al staan. Samen vormen ze de reeks "Praktijkschok HRM": casussen uit de HR-praktijk om studenten te confronteren met vragen uit het werkveld. Alle kaarten horen in dezelfde categorie HRM; "Praktijkschok" is de reeksnaam, geen aparte categorie.

Werk op een nieuwe branch `feat/hrm-52`, afgesplitst van `main` (is de eerder geopende PR #50 nog niet gemerged, dan van `feat/dl-opruiming`). Geen merge naar `main` zonder mijn akkoord. Verzin geen inhoud.

## Inhoud van dit pakket (map `Cursor_HRM_52`, door mij in de repo gezet onder `import/Cursor_HRM_52`)
- `cards_hrm_52.json`: `meta` (reeksnaam, `set_description` NL/EN, `complexity_note` NL/EN, spreiding) en `cards` met 52 kaarten. Velden per kaart: `id` (hrm-psNN), `number`, `sector` (incl. `sector_color`), `title`, `story` (3 alinea's, de laatste eindigt op de slotvraag), `reflection`, `complexity` (`level`, `stars`, `color`, `label`, `justification`), `image`. Alles NL en EN.
- `images/`: 52 JPG's, 2304 × 1322 px, al gecropt op ~1,74:1. Niet uitrekken.
- Kaart-id's: PS02–PS07, 09–11, 15–17, 19–30, 32–38, 40–42, 45–52, 55–57, 59, 63–65, 67, 68, 70.

## Stappen
1. **Eerst onderzoeken, dan bouwen.** Lees het schema van de bestaande `hrm`-kaarten in `src/data/gesprekskaarten/cards.json` (bijvoorbeeld `hrm-ps12`) en bouw de 52 nieuwe kaarten in exact dezelfde structuur (zelfde veldnamen, `set`, `meta.sectorColor`, `meta.tekstVersie` "3.0", `afbeeldingStatus` "v3", woordentelling zoals bij de bestaande kaarten, `nl.rechtvaardiging` en `en.rechtvaardiging` uit `complexity.justification`, enzovoort). Verander het schema niet. Meld welke velden je hebt afgeleid.
2. **Geen dubbelen.** Controleer vóór het toevoegen dat geen van de 52 id's of titels al in `cards.json` staat (de 15 bestaande: hrm-ps01, 08, 12, 13, 14, 18, 31, 39, 43, 44, 53, 54, 58, 66, 69). Bij een conflict: niets overschrijven, melden.
3. **Afbeeldingen** plaatsen volgens de bestaande structuur en optimalisatie van de site (zelfde map, naamgeving en bestandsgrootte als de bestaande hrm-foto's; de bronbestanden zijn samen ruim 21 MB, dus optimaliseer ze). Voeg per kaart een `alt`-tekst toe in NL en EN: een korte beschrijving van de scène, zonder namen en zonder gezichtsherkenning.
4. **Reeks.** Gebruik dezelfde reeks (`set`) als de bestaande hrm-kaarten. Heeft de site een plek voor een reeksbeschrijving, toon dan `meta.set_description` (NL/EN). Zo niet: meld het en voeg niets toe.
5. **Teksten niet aanpassen.** Titels, verhalen en reflectievraag zijn definitief. Kaartnummers (PSnn) en id's niet wijzigen of hernummeren. Pas de layout aan, niet de tekst.
6. **Complexiteit:** badge, sterren en linkerlijn in `#993556` (nooit goud of geel). Toon `complexity.label` (NL/EN naar taalkeuze) en, eenmalig, de vermelding uit `meta.complexity_note` zoals bij de bestaande kaarten. Gebruik overal "driedeling micro – meso – macro".
7. **Rechtvaardiging: wel opslaan, niet tonen.** De rechtvaardiging blijft als data bij elke kaart bestaan (documentatie van het complexiteitsniveau), maar staat nergens zichtbaar op de site: geen tekst op de kaart, niet in de kaartweergave. Sla haar op in de velden die de bestaande kaarten gebruiken. Controleer of de site haar nu ergens toont (ook bij de bestaande hrm-kaarten en bij GK_DL_01–15): zo ja, haal de weergave weg, maar laat de data staan. De validatiecontrole op aanwezigheid van `rechtvaardiging` (NL/EN) blijft zoals ze is. Meld in je rapport waar ze eerder werd getoond.

## Controle voor oplevering
- `npm run cards:catalog`, `npm run cards:validate-v3` en `npm run build` slagen.
- Totaal aantal kaarten: aantal vóór + 52. Categorie `hrm`: 67 kaarten.
- Spreiding hrm totaal: 14 micro · 48 meso · 5 macro. Sterren en kleuren kloppen met `complexity.level`.
- Alle 52 kaarten zichtbaar in NL en EN, met foto, titel, verhaal, badges en reflectievraag, zonder zichtbare rechtvaardiging. Geen kapotte afbeeldingen, geen dubbelen, mobiel en desktop gecontroleerd.
- Valideertabel per categorie in het rapport (verwacht: hrm 67/67 OK).

## Oplevering
Commit, push, geef commit-hash, PR-link en Vercel-preview-URL. Rapport in het Nederlands, compact: wat is toegevoegd en aangepast (bestanden, schema-afleidingen), wat is bewust niet aangeraakt, en eventuele risico's. Geen merge naar `main`.

## Bron
Meijer, K. M. T. (2023). *Impossible and inevitable: Reconstructing the critique of business ethics* [Proefschrift, Tilburg University]. Ridderprint. https://research.tilburguniversity.edu/en/publications/impossible-and-inevitable-reconstructing-the-critique-of-business/
