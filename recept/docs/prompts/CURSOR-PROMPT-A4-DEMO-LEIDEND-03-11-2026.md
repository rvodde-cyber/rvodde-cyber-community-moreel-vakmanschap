# Recept – Cursor-prompt: aflevering 4 volgt de demo (3 november 2026)

Besluit Richard (3 november 2026): aflevering 4 bestaat al als speelbare demo (v6), die goed is ontvangen. De demo is leidend. De concept-lijst 4.1.1 t/m 4.2.4 (Claude, 29 oktober) vervalt volledig. De tien demokaarten (ronde 1: A t/m E; ronde 2: F t/m J) zijn de A4-interventies, tekst ongewijzigd.

Reden: de demo heeft vijf kaarten per ronde, een diagnoseopdracht, een PILOT-valstrik (B en G) en budgetposten, en TEMPO en PILOT zijn daar al aanwezig; de concept-lijst wijkt daar mechanisch van af.

## Cursor-prompt

Taak: aflevering 4 laten volgen op de demo. Taal NL. Wijzig het gedrag van de demo en de spelmotor NIET. Geen deploy. Bron van waarheid voor A4: referentie/demo-aflevering4-v6.html en data/rounds.ts.

1. data/interventies-a4.ts (concept-lijst a4-1-1 t/m a4-2-4, 4.x): verwijder uit data/interventies/all.ts en uit alle validatie en tests. Verplaats het bestand naar docs/_archief-oude-recept-map/ als interventies-a4-concept-VERVALLEN.ts zodat de tekst bewaard blijft.
2. Pas data/interventies/types.ts aan: de speciale regel interventiesBeschikbaarPerRonde voor episode 4 ronde 2 (= 3) vervalt. Voor episode 4 geldt het aantal kaarten uit data/rounds.ts (vijf per ronde); laat KEUZES_PER_RONDE en de keuzeregels van de demo ongewijzigd en leg vast welke regel de demo toepast (aantal te kiezen kaarten, tegenstrijdige paren 'contra').
3. Leg in docs/BESLUITEN-CURSOR.md vast: "Aflevering 4 volgt de demo; kaarten A–E (ronde 1) en F–J (ronde 2) zijn de A4-interventies; Piotr loopt via begrotingspost piotr-vast; 4.x-lijst vervallen (3 november 2026)." Noteer ook de tien kaartnamen: Vitaliteitsweek, Aanwezigheidsbonus, Flexkrachten, TEMPO-norm begrenzen, Coaching en extra ploegleider; Gewetensclausule, Defensie via TEMPO, Regels schrappen, Ploegleiders opleiden, Compliance-afdeling.
4. Zoek alle verwijzingen (echo's, opvolging, tests, docs, nabespreking) naar a4-1-x, a4-2-x of nummers 4.1.x/4.2.x. Verzin niets nieuws: lijst ze per bestand in docs/OPEN-VRAGEN.md onder 'A4-verwijzingen na besluit demo leidend' zodat Richard kan kiezen welke demokaart ze vervangt (bijvoorbeeld Gewetensclausule in plaats van het gewetensbezwaar-loket). Laat bestaande echo's naar A1–A3 ongemoeid.
5. Contentstatus: als data/contentStatus.ts of rounds.ts een status per A4-kaart kent, zet de tien kaarten op 'definitief' (Richard heeft de demo goedgekeurd). Bestaat zo'n status niet, meld dat dan en voeg niets toe.
6. Piotr-lijn, variantscène 2031, begroting piotr-vast en de definitieve A1–A3-interventies blijven ongewijzigd.
7. Tests: pas alleen de tests aan die de vervallen 4.x-lijst controleren (verwijderen of omzetten naar de demokaarten); draai alle tests; verwacht: groen. Voeg toe: (a) data/rounds.ts bevat per ronde precies vijf kaarten met de genoemde namen; (b) interventies-a4-concept is nergens meer geïmporteerd.
8. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: A4 = demo leidend (3 november 2026); open blijft: nabespreking A1 t/m A4, interventies A5, Sanne en overige nabespreking, beeldakkoord, A4-verwijzingen uit punt 4. Alle docs staan alleen in recept/docs.
9. Meld kort: wat is aangepast, testresultaat, afwijkingen. Commit niet zelf; ik doe dat.

## Bronnen

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes: A meta-analysis. Journal of Applied Psychology, 87(2), 268–279. https://doi.org/10.1037/0021-9010.87.2.268
