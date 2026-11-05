# Recept – Cursor-prompt stap 3: interventiemodel aan de spelmotor (5 november 2026)

Goedgekeurd door Richard op 5 november 2026 (uitgangspunten). Doel: aflevering 1 volledig speelbaar met de echte, definitieve interventies. Opzet blijft zo gebouwd dat A2, A3 en A5 er later zonder nieuwe motor op aansluiten.

## Ontwerpbesluiten

1. Per ronde 4 interventiekaarten, het team kiest er 2 (zoals A4: 5 kaarten, kies 2). Aflevering 1 heeft 2 rondes.
2. Budget in budgetpunten: **aflevering 1** ronde 1 = **8**, ronde 2 = **9** (`BUDGET_PER_RONDE_A1` / `budgetVoorRonde`); getoond in de munt van de tijd (gulden in 1984 en 1996, euro vanaf 2009). Kosten per kaart: € = 3, €€ = 5, €€€ = 6. Twee keer €€ (10) mag niet; € + €€ (8) wel. De volledige begroting met posten (zoals in A4) komt pas vanaf aflevering 3.
3. Vertaaltabel van tekens naar getallen. Zichtbare meters: ++ = +8, + = +4, 0 = 0, - = -4, -- = -8. Verborgen meters (eerlijkheid, menselijke maat): ++ = +6, + = +3, 0 = 0, - = -3, -- = -6. Productiviteit en betrokkenheid zijn indexpunten (0 tot 100). Verzuim en verloop zijn percentages: 1 tabelpunt = 0,25 procentpunt (dus ++ = 2,0 procentpunt, + = 1,0). Bij verzuim en verloop betekent "-" dat de meter daalt (gunstig).
4. Een effect "later" (effectLater) werkt in de volgende ronde door met 50% van de tabelwaarde. Effecten uit ronde 2 gaan niet als meterwaarde mee naar de volgende aflevering; wel als tekst (opvolging en echo). Elke aflevering begint met eigen startwaarden.
5. Balans: elke combinatie van twee kaarten per ronde moet een echte afweging blijven; geen combinatie mag alle andere combinaties op alle zichtbare meters (productiviteit, betrokkenheid, verzuim, verloop, budgetrest) overtreffen of evenaren.

## Cursor-prompt

Taak: stap 3, interventiemodel koppelen aan de spelmotor. Taal NL. Geen deploy. Commit niet zelf. Aflevering 4 (data/rounds.ts, engine/compute.ts, golden-referenties) blijft ongewijzigd en alle bestaande tests blijven groen. Werk in de map recept/. Volg de ontwerpbesluiten 1 t/m 5 hierboven letterlijk.

Context: de A4-motor (engine/compute.ts) rekent met 16 drijvers (START_DRIVERS) en berekent de meters daaruit. De skeletafleveringen gebruiken een stub (src/game/stubCompute.ts) met vaste waarden. De definitieve interventies (data/interventies-a1/a2/a3/a5.ts, type Interventie in data/interventies/types.ts) hebben tekens (++/+/0/-/--) op de zichtbare meters, effectLater en verborgen effecten, en zijn niet aan de motor gekoppeld. We bouwen daarom een lichte tweede berekening, de interventiemodus, náást de A4-motor. De A4-motor wordt niet aangepast.

1. Verkenning (eerst, geen codewijziging). Lees engine/compute.ts, engine/types.ts, src/game/gameReducer.ts, src/game/stubCompute.ts, src/game/budgetUi.ts, src/game/budgetFix.ts, src/game/hiddenMeters.ts, src/game/roundSource.ts, data/episodes/content.ts, data/schemas/rounds.schema.ts en de uitkomst- en dashboardschermen. Schrijf docs/STAP3-VERKENNING.md: (a) welke ComputeResult-velden de UI per meter toont (productiviteit, betrokkenheid, verzuim, verloop, budget, verborgen meters); (b) waar stubCompute wordt aangeroepen; (c) hoe de budgetUi/budgetFix werkt en wat er moet veranderen voor budgetpunten zonder begrotingsposten; (d) welke aanpassingen minimaal zijn. Past iets niet of is een ontwerpbesluit technisch onhaalbaar, noteer dat in dat document, pas het kleinst mogelijke alternatief toe en meld het in je eindrapport. Verzin geen nieuwe ontwerpbesluiten.
2. Vertaaltabel en constanten: nieuw data/interventies/vertaaltabel.ts met de tabel uit besluit 3, de omrekening verzuim/verloop (0,25), de kostencategorie in punten (3, 5, 6), `BUDGET_PER_RONDE_A1` (ronde 1: 8, ronde 2: 9) / `budgetVoorRonde` en LATER_FACTOR = 0,5. Eén bron van waarheid; geen getallen elders hardcoderen.
3. Startwaarden: nieuw data/interventies/startwaarden.ts per aflevering. Aflevering 1 voorlopig: productiviteit 50, betrokkenheid 70, verzuim 3,0 procent, verloop 4,0 procent; verborgen meters gelijk aan de startwaarde die A4 gebruikt. Aflevering 2, 3 en 5: voorlopig dezelfde waarden, met TODO-opmerking en een regel in docs/OPEN-VRAGEN.md (kalibratie na playtest).
4. Berekening: nieuw engine/interventieCompute.ts. Invoer: aflevering, ronde, gekozen interventie-ids (precies 2) en de later-effecten uit de vorige ronde; uitvoer: een object dat de UI voor ComputeResult verwacht (vul de velden die de UI toont, de overige met neutrale waarden zoals de stub nu doet) plus de wijziging op de verborgen meters en het budget dat overblijft. Valideer: precies 2 kaarten, kosten binnen BUDGET_PER_RONDE.
5. Kaarten: genereer de ronde-kaarten voor aflevering 1 uit de definitieve interventies (4 per ronde, kaart-id = interventie-id, titel = naam, omschrijving, kosten uit kostenCategorie). Pas data/schemas/rounds.schema.ts zo aan dat 4 kaarten mag in interventiemodus en 5 in A4-modus; A4 blijft 5. Geen contra-paren en geen PILOT-advies in interventiemodus (1984 kent geen PILOT). Registreer in EPISODE_CONTENT[1].
6. Spelflow aflevering 1: gameReducer/UI gebruiken interventieCompute voor episode 1 (via het register, niet via if-takken op episode === 1). Budget als puntenbalk met de munt van het jaar (gulden voor 1984), geen begrotingsposten. Toon in het uitkomstscherm per gekozen interventie de uitkomsttekst; ethischRisico, opvolging en echo komen in de nabespreking. Toon in de UI de meters met tekens of waarden zoals de dashboardskin 1984 dat toelaat.
7. slotLineA1: koppel aan de echte gekozen interventie-ids (a1-1-4, a1-2-2, a1-2-3: minstens 2 in de gekozen set geeft de snelle variant); verwijder de skeleton-id's uit de koppeling.
8. Zet aflevering 1 in de interventiemodus aan; aflevering 2, 3 en 5 blijven skeleton (hun data volgt later), maar de motor moet er zonder wijziging op kunnen draaien.
9. Tests, alle bestaande tests blijven groen (inclusief golden A4). Voeg toe: (a) vertaaltabel (alle tekens, verzuim/verloop x0,25); (b) later-effect 50% in de volgende ronde en niet doorgegeven naar een volgende aflevering; (c) budget: twee keer €€ geweigerd, € + €€ toegestaan, precies 2 kaarten verplicht; (d) balanstest: voor elke ronde van aflevering 1 (en, als de data het toelaat, ook A2, A3 en A5) alle 6 combinaties van 2 kaarten; geen combinatie die alle andere combinaties op alle zichtbare meters overtreft of evenaart; (e) slotLineA1 met echte keuzes; (f) aflevering 4 ongewijzigd.
10. Docs: werk docs/DESIGNGIDS.md §7, docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij (A1 stap 3 klaar; open: kalibratie, A2/A3/A5 naar interventiemodus, nabespreking, begroting vanaf A3).
11. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen en eventuele technische bezwaren uit de verkenning.

## Bronnen

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
