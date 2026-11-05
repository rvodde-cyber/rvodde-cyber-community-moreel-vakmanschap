# Recept – Cursor-prompt taalronde A2 t/m A5 en hernoeming Lotte naar Anne-Fleur (5 november 2026)

Besluiten Richard (5 november 2026): alle voorgestelde regels akkoord; aflevering 5 draait om een nieuwe generatie; Lotte heet voortaan Anne-Fleur (nazaat van een van de founders, eigentijdse naam); in 2036 is dialect en tonval helemaal verdwenen. Bron: docs/TAALGIDS.md en docs/claude-outputs/recept-taalronde-a2-t-m-a5-05-11-2026.md.

## Cursor-prompt

Taak: (A) cold open-teksten A2, A3, A4 en A5 aanpassen, (B) personage Lotte hernoemen naar Anne-Fleur. Taal NL, teksten LETTERLIJK overnemen. Geen deploy. Commit niet zelf. Wijzig de spelmotor, effecten en golden-referenties niet.

A. Cold opens
Een regel met lege spreker ('') is een titelkaart. Volg de bestaande structuur ({ place, img, lines }).

1. Aflevering 2 (data/skeleton/coldOpen.ts, SKELETON_COLD[2], place 'LOVEN, TILBURG', img 'I2'): vervang de lines door:
['', 'Dinsdag, tien over zeven. De band loopt al een uur.']
['GERRIT', 'Sneller, jongens! De vrachtwagen staat al te wachten.']
['LIES', 'Wie is eigenlijk die jongen bij de verpakking?']
['HARRIE', 'Die ken ik wel. Even denken... Toch?']
['', 'Niemand maakt vandaag nog een hele kroket.']
2. Aflevering 3 (SKELETON_COLD[3], place 'DIRECTIETAFEL, TILBURG', img 'I3'):
['', 'Vrijdagmiddag. Drie vestigingen en één vergadertafel.']
['SANNE', 'Het loopt vast op de vloer, pap. Dat weet iedereen die er staat.']
['MARCO', 'Ik heb de cijfers per vestiging op een rij gezet. Waalwijk zit al drie maanden onder target.']
['HARRIE', 'Ik moet nog kiezen wie het straks overneemt. Daar slaap ik slecht van.']
['', 'Niemand zegt iets. Buiten rijdt een vrachtwagen achteruit.']
3. Aflevering 4 (data/coldOpen.ts, COLD_OPEN[2]): wijzig ALLEEN twee regels, de rest en ronde 1 blijven identiek:
['ERIK', 'Groot zijn is vooral een kwestie van formulieren, Marco.'] wordt ['ERIK', 'Groter worden betekent vooral meer formulieren, Marco.']
['ANS', 'Ik heb deze week twee uur op de vloer gestaan. De rest was overleg.'] wordt ['ANS', 'Ik heb deze week maar twee uur op de vloer gestaan. De rest was overleg.']
4. Aflevering 5 (SKELETON_COLD[5], place 'SPOORZONE, TILBURG', img 'I5'):
['', 'De glazen ingang weerspiegelt een verre schuur.']
['', 'Bericht van Optivora: vrijdag een besluit over de herstructurering.']
['ANNE-FLEUR', 'Weet iemand eigenlijk wie het schrift als laatste heeft vastgehad?']
['PIOTR', 'In de schuur, denk ik. Daar lag het altijd.']
['', 'In Berkel-Enschot ligt nog het receptschrift. Niemand weet wie de doorgestreepte zin heeft geschrapt.']
Controleer dat de sprekersnamen ANNE-FLEUR en PIOTR in de UI (naamlabel, kleur, portret of silhouet-fallback) correct worden getoond; breid zo nodig de personagelijst uit.

B. Hernoeming Lotte naar Anne-Fleur
5. Vervang 'Lotte' door 'Anne-Fleur' (en 'LOTTE' door 'ANNE-FLEUR', variabele 'lotte' door 'anneFleur') in alle actieve bestanden onder recept/: o.a. data/interventies-a5.ts (naam, omschrijving, uitkomsttekst, opvolging), data/piotr-lijn.ts, engine/__tests__/interventies.test.ts (test 'a5-1-3 (Anne-Fleur)'), docs/PIOTR-LIJN.md, docs/serieconcept.md, docs/morele-dilemmas.md, docs/beeldbank-codes.md, docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md, docs/VOORSTELLEN-RECEPT-29-10-2026.md, docs/slotscene-aflevering4-concept.md, docs/prompts/*, CURSOR-PROMPT.md. NIET aanpassen: docs/_archief-oude-recept-map/, _aanlevering/, docs/TAALGIDS.md en docs/claude-outputs/recept-taalronde-a2-t-m-a5-05-11-2026.md (staan al goed). Interventie-ids (bijv. a5-1-3) blijven ongewijzigd.
6. Zoek met grep naar overgebleven 'Lotte' (hoofdletterongevoelig) buiten de uitgesloten mappen en meld het resultaat.
7. Voeg in docs/PORTRETTEN-PROMPTS.md een Firefly-prompt toe voor Anne-Fleur, rond 26 jaar in 2036, nazaat van een van de founders, eigentijdse en eenvoudige kleding (geen futuristisch kostuum), zelfde stijlregel, 1:1, 512 x 512 WebP, geen stereotypen. Voeg 'Anne-Fleur' ook toe aan docs/beeldbank-codes.md waar Lotte stond.

C. Tests en docs
8. Voeg tests toe: (a) cold open A2, A3 en A5 hebben de letterlijke regels hierboven (aantal regels, eerste en laatste regel, spreker van regel 3); (b) COLD_OPEN[2] van A4: precies de twee gewijzigde regels, de overige regels en ronde 1 ongewijzigd; (c) geen 'Lotte' meer in data/ en engine/. Alle bestaande tests, inclusief golden A4, blijven groen.
9. Verwijs in docs/DESIGNGIDS.md naar docs/TAALGIDS.md als bron voor alle teksten. Werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: taalronde cold opens klaar; open: taalronde overige teksten (privéberichten, nabesprekingen, slotscènes A2 t/m A5), kaartvoorstellen gesprekskaarten, stap 3.
10. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.

Tenbrunsel, A. E., & Messick, D. M. (2004). Ethical fading: The role of self-deception in unethical behavior. Social Justice Research, 17(2), 223–236. https://doi.org/10.1023/B:SORE.0000027411.35832.53
