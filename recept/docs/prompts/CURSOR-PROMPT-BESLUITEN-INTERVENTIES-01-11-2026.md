# Recept – Cursor-prompt: besluiten interventies verwerken (1 november 2026)

Status: besluiten genomen door Richard op 1 november 2026. Interventies blijven `concept` en `interventieDefinitief = false` tot per aflevering akkoord volgt.

## Besluiten

1. Notatie: `+`/`-` is de richting van de meterwaarde. Verzuim `-` = verzuim daalt (gunstig). Budget `-` = budget daalt (uitgave). Geldt voor alle afleveringen.
2. 1.1 corrigeren: verloop wordt `+(later)` (overstructurering verhoogt verloop).
3. 2.2 (A1) uitkomsttekst aanvullen met de presenteïsme-lijn.
4. 1.4 hernoemen naar "Flexkrachten inhuren voor piekdrukte" (geen leeftijdscriterium in de naam).
5. Bonus A1 (2.2) en A2 (2.2.2) = bewuste echo. Beide blijven. A2-uitkomst verwijst terug als A1-bonus gekozen is.
6. Piotr via begroting (`piotr-vast`). Interventie 4.2.1 vervalt als keuze-interventie. A4 ronde 2 heeft daardoor drie interventies (4.2.2, 4.2.3, 4.2.4), team kiest er twee.

## Cursor-prompt

Taak: besluiten interventies A1–A5 verwerken. Taal NL. Alles blijft status 'concept' en interventieDefinitief=false. Niet koppelen aan de spelmotor. Bron: docs/INTERVENTIES-AFLEVERING-1-29-10-2026.md en docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md. Wijzig alleen wat hieronder staat.

1. Notatie. Voeg in data/interventies-*.* en in docs een legenda toe: "+ / - = richting van de meterwaarde. Verzuim '-' = verzuim daalt (gunstig). Budget '-' = budget daalt (uitgave). (later) = effect in de volgende ronde of aflevering." Controleer alle interventies A1–A5 op consistentie met deze legenda; meld afwijkingen in docs/OPEN-VRAGEN.md, pas ze niet zelf aan behalve onder punt 2 en 3.

2. A1 interventie 1.1 (id a1-1-1): effect.verloop moet effectLater.verloop='+' zijn (voorheen '-(later bij overstructurering)'). Verdere velden ongewijzigd.

3. A1 interventie 2.2 (id a1-2-2, Bonus op output): uitkomsttekst wordt letterlijk: "De productie stijgt direct. Wie ziek is, meldt zich minder snel af – voorlopig." effect.verzuim='-', effectLater.verzuim='+' (presenteïsme, later hoger verzuim). Overige velden ongewijzigd.

4. A1 interventie 1.4 (id a1-1-4): naam wordt "Flexkrachten inhuren voor piekdrukte". Alle verwijzingen in data, echo's, docs en tests aanpassen (zoek op "Flexibele jongeren"). Omschrijving, effecten en opvolging ongewijzigd.

5. Echo bonus. In data/interventies-a2.* interventie 2.2.2 (Bonus op volume): voeg echo toe: { bron: 'a1-2-2', tekst: 'Het volume stijgt opnieuw. Het klinkt bekend: ook in de schuur werd de bonus een reden om door te werken.' }. De echo-tekst wordt alleen getoond als a1-2-2 gekozen was. Voeg aan data/nabespreking-a2.* bij fase Wegen een conditionele vraag toe (alleen tonen als a1-2-2 gekozen was en a2 2.2.2 gekozen is), status concept: "Jullie kozen in de schuur al een bonus op output. Wat maakte dat jullie die keuze nu herhaalden, of juist niet?"

6. Piotr. Verwijder interventie 4.2.1 (a4-2-1) uit data/interventies-a4.* als keuze-interventie. Ronde 2 van A4 bevat dan drie interventies (4.2.2, 4.2.3, 4.2.4); het team kiest er maximaal twee. De Piotr-keuze loopt uitsluitend via ronde-2-begroting 'piotr-vast' (>= 25.000 = contract) en de bestaande variantscène 2031. Verwijder test (d) uit het A2–A5-addendum (4.2.1 definitief zonder variantscène), omdat het item vervalt. Pas echo's aan die naar 4.2.1 verwijzen: bron wordt de begrotingskeuze 'piotr-vast'. Test: faalt als echo naar een niet-bestaande bron verwijst.

7. Tests. Draai alle tests; verwacht: bestaande 38 blijven groen. Voeg toe: (a) a1-1-1 heeft effectLater.verloop '+'; (b) a1-1-4 heet 'Flexkrachten inhuren voor piekdrukte' en 'Flexibele jongeren' komt nergens meer voor; (c) echo a2-2-2 verschijnt alleen als a1-2-2 gekozen is; (d) A4 ronde 2 heeft precies drie interventies, maximaal twee kiesbaar.

8. Docs. Werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij. Noteer als besloten: notatie, hernoeming 1.4, bewuste bonus-echo, Piotr via begroting. Noteer als open: akkoord per aflevering (A1 t/m A5) voor interventieDefinitief; A4 versus bestaande demo v6; Sanne en overige nabespreking; beeldakkoord. Alle docs staan voortaan alleen in deze map (recept/docs); er is geen aparte kopie meer in 'Cursor projecten/Recept'.

9. Oplevering. Geen deploy nodig tenzij tests slagen en studentmodus ongewijzigd blijft. Meld kort: wat is aangepast, testresultaat, en eventuele afwijkingen uit punt 1.

## Bronnen

Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
