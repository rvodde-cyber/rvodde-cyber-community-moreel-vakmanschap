# Recept – Cursor-prompt worstenbroodje en Van Gorp Machinebouw B.V. (5 november 2026)

Besluit Richard (5 november 2026): het product van de fabriek wordt het worstenbroodje (typisch Brabants) in plaats van de kroket. Van Gorp bouwt al sinds de schuur eigen machines; in 2009 wordt de werkplaats een zelfstandige onderneming, Van Gorp Machinebouw B.V.; rond 2020 zoekt Defensie productiecapaciteit voor drones en komt bij die B.V. uit, die Van Gorp Drones B.V. wordt; in 2036 is er een conglomeraat, Van Gorp Groep, met investeerder Optivora. In aflevering 4 komt een korte uitleg "Hoe het zo ver kwam".

## Cursor-prompt

Taak: (1) product kroket vervangen door worstenbroodje in alle spelteksten en documenten, (2) de bedrijfsgeschiedenis (Van Gorp Machinebouw B.V. in 2009, Van Gorp Drones B.V. rond 2020, Van Gorp Groep in 2036) in de teksten verwerken en (3) in aflevering 4 de uitleg "Hoe het zo ver kwam" toevoegen. Taal NL. Geen deploy. Commit niet zelf. Engine, rounds, golden-referenties en de spelmechaniek blijven ongewijzigd; alle bestaande tests (167) blijven groen. Werk in de map recept/. Wijzigingen in tekst van A4 (demo) alleen zoals hieronder beschreven; de rest van A4 blijft ongewijzigd.

1. Inventarisatie: zoek (hoofdletterongevoelig) naar kroket, kroketten, kroketje, paneer, frituur, friteuse, croquet en worstenbroodje in src/, data/, themes/, engine/ (incl. tests), content/, public/ (tekstbestanden), index.html en docs/ (niet in _archief of claude-outputs). Maak in docs/BEDRIJFSVERHAAL.md een lijst per bestand en regel van wat er stond en wat het wordt. Pas daarna de teksten aan.

2. Product: vervang kroket door worstenbroodje (meervoud worstenbroodjes; "een worstenbroodje") met aandacht voor de context, geen blinde zoek-en-vervang:
- Smaak en geur: "hete olie" wordt "warm deeg" (of "bakwalm"); "paneermeel" wordt "deeg" of "bloem"; frituren wordt bakken; "friteuse" wordt "oven" of "bakstraat". Voorbeeld A1-intro: "Het ruikt naar warm deeg en nat gras. ... Harrie van Gorp ... tot zijn ellebogen in het deeg."
- Landingspagina: "Een worstenbroodjesfabriek. Vijf tijdperken. Jullie beslissen."
- A2 cold open, laatste titelregel: "Niemand maakt vandaag nog een heel worstenbroodje."
- Gesprekskaart A1: "extra kratten worstenbroodjes" (verder letterlijk ongewijzigd).
- Tickerregels, tijdgeest-teksten, README, START-HIER en alle docs: pas aan met behoud van de grap of bedoeling; waar een grap alleen op de kroket werkt (bijvoorbeeld een woordspeling), schrijf een passend alternatief met worstenbroodje en meld het.
- Toon: Brabants en nuchter, geen reclametaal. Het woord "krokettenfabriek" komt nergens meer voor in spelteksten; in oude documenten (logboeken van vóór 5 november) hoeft het niet te worden aangepast.

3. Bedrijfsgeschiedenis (namen en jaren, overal gelijk):
- 1984: de schuur in Berkel-Enschot; Harrie bouwt en verbetert zijn machines zelf (bestaande teksten behouden).
- 1996: een eigen werkplaats naast de fabriekshal ("de werkplaats").
- 2009 (aflevering 3): de werkplaats wordt een zelfstandige onderneming: Van Gorp Machinebouw B.V. Voeg in het introscherm van A3, onder Geschiedenis, een korte alinea toe: "Net is Van Gorp Machinebouw B.V. opgericht: de eigen werkplaats van het bedrijf is een zelfstandige onderneming geworden, met een eigen directeur en eigen cijfers." De gesprekskaart "Topresultaten" blijft ongewijzigd (Dongen als succesvolle vestiging).
- Rond 2020: Defensie zoekt productiecapaciteit voor drones en komt bij Van Gorp Machinebouw uit; die wordt Van Gorp Drones B.V.
- 2026 (A4): Van Gorp Drones, Vossenberg, Tilburg (bestaande naam in de game).
- 2036 (A5): Van Gorp Groep, houdstermaatschappij van de B.V.'s, met investeerder Optivora (via de bestaande titelkaart). Gebruik "Van Gorp Groep" waar nu naar het conglomeraat wordt verwezen, zonder verder de inhoud van A5 aan te passen.
- Leg de tijdlijn en namen vast in docs/TAALGIDS.md (hoofdstuk "Bedrijfsnamen en tijdlijn") en docs/TIJDGEEST.md.

4. Aflevering 4: voeg in het introscherm een blok toe met kopje "HOE HET ZO VER KWAM" (stijl als UITDAGINGEN), via een nieuw veld `overstapUitleg` in EPISODE_CONTENT dat alleen voor A4 is gevuld, zodat het scherm van andere afleveringen niet verandert. Tekst, letterlijk:

"Van Gorp maakte tientallen jaren worstenbroodjes. Wat het bedrijf bijzonder maakte, waren de machines: bijna alles werd in de eigen werkplaats bedacht en gebouwd. In 2009 werd die werkplaats een zelfstandige onderneming, Van Gorp Machinebouw B.V., met machinebouwers, monteurs en procesmensen die precies wisten hoe je een lijn bouwt die nooit stilstaat. Brabant zit vol bedrijven als dit, en daar zocht Defensie naar productiecapaciteit voor drones. Ze kwamen bij Van Gorp uit: ervaring met mechanisatie, vakmensen die moeilijk te vinden zijn, een regio met mensen die willen werken en ruimte om uit te breiden. Een deel van de lijnen werd omgebouwd. De worstenbroodjes bleven nog even, maar de drones namen het over."

Is er al een overgangsscherm of titelkaart bij de sprong van aflevering 3 naar 4 (bijvoorbeeld de slotscène van A3 of de titelkaart van A4), voeg daar dan een korte titelregel toe: "Rond 2020 zoekt Defensie productiecapaciteit voor drones. Van Gorp Machinebouw krijgt de order." Bestaat zo'n scherm niet, voeg dan niets toe en meld dat. Raak de rest van de intro, de cold open, de interventies en de golden-referenties van A4 niet aan.

5. Tests: (a) geen enkele spelkoppeling in src/, data/ en themes/ bevat nog "kroket", "paneer" of "frituur" (een test die deze map scant; documenten uitgezonderd); (b) de landingspagina bevat "worstenbroodjesfabriek"; (c) het introscherm van A4 toont het blok "HOE HET ZO VER KWAM" met "Van Gorp Machinebouw B.V."; andere afleveringen niet; (d) het introscherm van A3 bevat "Van Gorp Machinebouw B.V."; (e) bestaande tests die op de oude tekst controleerden zijn bijgewerkt; (f) alle bestaande tests groen en golden A4 ongewijzigd.

6. Oplevering: werk docs/VOORTGANG.md, docs/OPEN-VRAGEN.md en docs/BEDRIJFSVERHAAL.md bij. Draai npm test en npm run build. Meld kort: aantal vervangen plekken per map, welke grappen of woordspelingen zijn herschreven (met de nieuwe tekst), of er een overgangsscherm bij A3 naar A4 was, aantal tests groen, afwijkingen.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
