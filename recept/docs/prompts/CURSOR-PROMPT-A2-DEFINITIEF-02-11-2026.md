# Recept – Cursor-prompt: aflevering 2 interventies definitief (2 november 2026)

Status: Richard heeft op 2 november 2026 alle acht interventies van aflevering 2 akkoord gegeven (ronde 1: 2.1.1 t/m 2.1.4; ronde 2: 2.2.1 t/m 2.2.4), inclusief de echo bij 2.2.2. Geen tekstwijzigingen. De nabespreking van aflevering 2 blijft `concept`.

## Cursor-prompt

Taak: aflevering 2 interventies definitief maken. Taal NL. Wijzig alleen wat hieronder staat. Niet koppelen aan de spelmotor. Geen deploy.

1. In data/interventies-a2.ts: zet voor alle acht interventies (ids a2-1-1, a2-1-2, a2-1-3, a2-1-4, a2-2-1, a2-2-2, a2-2-3, a2-2-4) status='definitief' en interventieDefinitief=true. Teksten, effecten, verborgen meters, anker, ethischRisico, uitkomsttekst, opvolging en echo's blijven exact zoals nu in de data.
2. Controleer dat voor elke definitieve interventie alle verplichte velden gevuld zijn (validate.ts moet slagen). Als een veld ontbreekt: niet verzinnen, maar stoppen en melden in docs/OPEN-VRAGEN.md.
3. Echo a2-2-2 verwijst naar a1-2-2 (nu definitief): controleer dat de echo-tekst alleen verschijnt als a1-2-2 gekozen was.
4. Studentmodus: de acht A2-interventies zijn nu zichtbaar; verborgen meters (eerlijkheid, menselijke maat) blijven onzichtbaar. Docentmodus: geen label 'CONCEPT' meer bij deze acht.
5. Nabespreking A2 (data/nabespreking-a2.*), inclusief de conditionele Wegen-vraag, blijft status 'concept'; wijzig dat niet.
6. Tests: draai alle tests. Voeg toe: (a) alle acht A2-interventies zijn definitief en hebben alle velden; (b) studentmodus toont ze zonder verborgen meters; (c) nabespreking A2 is nog 'concept'; (d) echo a2-2-2 alleen zichtbaar als a1-2-2 gekozen is.
7. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: A2-interventies definitief (2 november 2026); open blijft: nabespreking A1 en A2, interventies A3–A5, A4 versus demo v6, Sanne en overige nabespreking, beeldakkoord. Alle docs staan alleen in recept/docs.
8. Meld kort: wat is aangepast, testresultaat, eventuele afwijkingen. Commit niet zelf; ik doe dat.

## Bronnen

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.

Hackman, J. R., & Oldham, G. R. (1976). Motivation through the design of work: Test of a theory. Organizational Behavior and Human Performance, 16(2), 250–279. https://doi.org/10.1016/0030-5073(76)90016-7
