# Recept – Cursor-prompt lettertypen per tijdperk (5 november 2026)

Besluit Richard (5 november 2026): de lettertypen veranderen mee met de tijd (typemachine en handschrift, kettingpapier, kantoor-Windows, modern, zacht en vloeiend). Leesbaarheid gaat voor; een knop "Leesbaar lettertype" in de instellingen. Aflevering 4 (demo, goed ontvangen) behoudt zijn huidige uiterlijk. Deze brief is ook de ontwerpspecificatie.

## Specificatie

| Aflevering | Kop/titel (display) | Brieven en handschrift (hand) | Lopende tekst (ui) | Cijfers/data |
| --- | --- | --- | --- | --- |
| 1 · 1984 | Special Elite (typemachine) | Caveat (briefje van Lies, Harries schrift) | Georgia, serif | Courier New, monospace |
| 2 · 1996 | VT323 (kettingpapier, matrixprinter) | Caveat | system-ui, sans-serif | VT323 |
| 3 · 2009 | Verdana, Tahoma, sans-serif | Caveat | Verdana, Tahoma, sans-serif | Consolas, monospace |
| 4 · 2026 | ongewijzigd (huidige demo-uiterlijk) | Caveat | ongewijzigd | ongewijzigd |
| 5 · 2036 | Nunito (zacht en afgerond), licht gewicht | Caveat (zelfde hand als 1984: het schrift) | Nunito | Nunito (tabulaire cijfers) |

Regels: handschrift en typemachine alleen voor korte stukken (titels, briefje, quote, kop); lopende tekst (uitkomsten, nabespreking, dilemmatekst) blijft in het leesbare ui-lettertype. Eén lettertype-bestand per gebruik, alleen subset latin, alleen de gewichten die nodig zijn.

## Cursor-prompt

Taak: lettertypen per tijdperk, self-hosted en met een leesbaar-alternatief. Taal NL. Geen deploy. Commit niet zelf. A4 (demo), engine, rounds.ts en golden-referenties ongewijzigd; het uiterlijk van aflevering 4 blijft zoals het is. Alle bestaande tests blijven groen. Werk in de map recept/.

1. Verkenning: lees themes/periods.ts (fonts per periode) en hoe het thema wordt toegepast (CSS-variabelen of klassen). Beschrijf kort in docs/TYPOGRAFIE.md hoe het nu werkt.
2. Lettertypen self-hosted: installeer via npm de Fontsource-pakketten (@fontsource/special-elite, @fontsource/caveat, @fontsource/vt323, @fontsource/nunito), alleen subset latin en alleen de benodigde gewichten (normal, plus 300 en 700 waar nodig). Controleer per pakket de licentie (OFL of Apache) en noteer die met bron in docs/TYPOGRAFIE.md. Geen externe verzoeken (geen Google Fonts of CDN); controleer dat de build geen verwijzingen naar fonts.googleapis.com of fonts.gstatic.com bevat. Is een pakket niet beschikbaar of de licentie onduidelijk, kies dan het dichtstbijzijnde alternatief met vrije licentie en meld het.
3. Thema-uitbreiding: breid het type in themes/periods.ts uit met fonts.display en fonts.hand naast ui en data. Vul de tabel uit de specificatie in voor aflevering 1, 2, 3 en 5; aflevering 4 houdt zijn huidige ui en data, met alleen fonts.hand = Caveat. Maak CSS-variabelen --font-display, --font-hand, --font-ui, --font-data en pas ze toe op: titelkaarten en kopjes (display), briefje/BriefjePanel en het schrift-motief (hand), lopende tekst (ui), cijfers en ticker (data). Gebruik het handschrift niet voor lange tekst.
4. Leesbaar lettertype: voeg in het instellingenvenster een schakelaar toe "Leesbaar lettertype" (standaard uit) die display en hand vervangt door de ui-sans (system-ui, sans-serif) en een iets grotere regelafstand. Onthoud de keuze via de bestaande instellingen-state, werkt met toetsenbord en screenreader (label, aria-pressed), en is zichtbaar in alle fasen.
5. Fallbacks: elk lettertype heeft een veilige fallback-stack; geen verspringende lay-out (font-display: swap, vergelijkbare metrics waar mogelijk). Houd het aantal geladen bestanden per tijdperk laag: laad lettertypen alleen wanneer die aflevering wordt gespeeld.
6. Tests: (a) elk tijdperk 1 t/m 5 heeft display, hand, ui en data in het thema; (b) aflevering 4 ui en data ongewijzigd; (c) bij "Leesbaar lettertype" aan zijn display en hand gelijk aan de neutrale sans; (d) geen verwijzing naar externe fontdomeinen in src/, themes/ en de build-uitvoer; (e) alle bestaande tests groen, golden A4 ongewijzigd.
7. Docs: docs/TYPOGRAFIE.md (specificatie, licenties, beslissingen), verwijs ernaar in docs/DESIGNGIDS.md; werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij (open: Richard beoordeelt het uiterlijk per tijdperk na het spelen).
8. Draai npm test en npm run build. Meld kort: wat is aangepast, gebruikte lettertypen en licenties, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
