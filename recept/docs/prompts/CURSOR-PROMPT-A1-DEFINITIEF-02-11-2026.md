# Recept – Cursor-prompt: aflevering 1 interventies definitief (2 november 2026)

Status: Richard heeft op 2 november 2026 alle acht interventies van aflevering 1 akkoord gegeven (ronde 1: 1.1 t/m 1.4; ronde 2: 2.1 t/m 2.4). Geen tekstwijzigingen. De nabespreking van aflevering 1 blijft `concept` tot apart akkoord.

## Cursor-prompt

Taak: aflevering 1 interventies definitief maken. Taal NL. Wijzig alleen wat hieronder staat. Niet koppelen aan de spelmotor. Geen deploy.

1. In data/interventies-a1.ts: zet voor alle acht interventies (ids a1-1-1, a1-1-2, a1-1-3, a1-1-4, a1-2-1, a1-2-2, a1-2-3, a1-2-4) status='definitief' en interventieDefinitief=true. Teksten, effecten, verborgen meters, anker, ethischRisico, uitkomsttekst en opvolging blijven exact zoals nu in de data (inclusief a1-1-1 effectLater.verloop '+', a1-1-4 naam "Flexkrachten inhuren voor piekdrukte", a1-2-2 uitkomst "De productie stijgt direct. Wie ziek is, meldt zich minder snel af – voorlopig.").
2. Controleer dat voor elke definitieve interventie alle verplichte velden gevuld zijn (validate.ts moet slagen). Als een veld ontbreekt: niet verzinnen, maar stoppen en melden in docs/OPEN-VRAGEN.md.
3. Studentmodus: de acht A1-interventies zijn nu zichtbaar (alleen definitief wordt getoond); verborgen meters (eerlijkheid, menselijke maat) blijven onzichtbaar. Docentmodus: geen label 'CONCEPT' meer bij deze acht.
4. Nabespreking A1 (data/nabespreking-a1.*) blijft status 'concept'; wijzig dat niet.
5. Echo's: controleer dat de echo van a2-2-2 naar a1-2-2 nog werkt en dat 'Flexibele jongeren' nergens meer voorkomt.
6. Tests: draai alle tests (verwacht 40+ groen). Voeg toe: (a) alle acht A1-interventies zijn definitief en hebben alle velden; (b) studentmodus toont ze, maar toont geen verborgen meter; (c) nabespreking A1 is nog 'concept'.
7. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: A1-interventies definitief (2 november 2026); open blijft: nabespreking A1, interventies A2–A5, A4 versus demo v6, Sanne en overige nabespreking, beeldakkoord. Alle docs staan alleen in recept/docs.
8. Meld kort: wat is aangepast, testresultaat, eventuele afwijkingen. Commit niet zelf; ik doe dat.

## Bronnen

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
