# Recept – Cursor-prompt: aflevering 3 interventies definitief (3 november 2026)

Status: Richard heeft op 3 november 2026 alle acht interventies van aflevering 3 akkoord gegeven (ronde 1: 3.1.1 t/m 3.1.4; ronde 2: 3.2.1 t/m 3.2.4), inclusief de aandelenregeling voor het MT (3.2.4), zonder tekstwijzigingen. De nabespreking van aflevering 3 (a3-nb-1 t/m a3-nb-5) blijft `concept`.

## Cursor-prompt

Taak: aflevering 3 interventies definitief maken. Taal NL. Wijzig alleen wat hieronder staat. Niet koppelen aan de spelmotor. Geen deploy. Volg dezelfde aanpak als bij aflevering 1 en 2.

1. In data/interventies-a3.ts: zet voor alle acht interventies (ids a3-1-1, a3-1-2, a3-1-3, a3-1-4, a3-2-1, a3-2-2, a3-2-3, a3-2-4) status='definitief' en interventieDefinitief=true. Teksten, effecten, verborgen meters, anker, ethischRisico, uitkomsttekst, opvolging en echo's (ECHO_BONUS_KWALITEIT) blijven exact zoals nu in de data.
2. De nabespreking-items a3-nb-1 t/m a3-nb-5 in hetzelfde bestand blijven status 'concept'; zorg dat de definitief-markering alleen op de acht interventies werkt en niet op de nabespreking.
3. Controleer dat voor elke definitieve interventie alle verplichte velden gevuld zijn (validate.ts moet slagen). Als een veld ontbreekt: niet verzinnen, maar stoppen en melden in docs/OPEN-VRAGEN.md.
4. Echo's: controleer dat de echo-bronnen (a1-2-2 en a2-2-2) bestaan en definitief zijn en dat de echo-validatie slaagt.
5. Studentmodus: de acht A3-interventies zijn nu zichtbaar; verborgen meters (eerlijkheid, menselijke maat) blijven onzichtbaar. Docentmodus: geen label 'CONCEPT' meer bij deze acht.
6. Tests: draai alle tests. Voeg toe: (a) alle acht A3-interventies zijn definitief en hebben alle velden; (b) studentmodus toont ze zonder verborgen meters; (c) nabespreking A3 is nog 'concept'; (d) a3-2-4 is aanwezig en definitief.
7. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: A3-interventies definitief (3 november 2026); open blijft: nabespreking A1 t/m A3, interventies A4 en A5, A4 versus demo v6, Sanne en overige nabespreking, beeldakkoord. Alle docs staan alleen in recept/docs.
8. Meld kort: wat is aangepast, testresultaat, eventuele afwijkingen. Commit niet zelf; ik doe dat.

## Bronnen

Agency-theorie, zelfbeschikking, HPWS en JD-R vormen het wetenschappelijke kader van de interventies in aflevering 3.

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.

Jensen, M. C., & Meckling, W. H. (1976). Theory of the firm: Managerial behavior, agency costs and ownership structure. Journal of Financial Economics, 3(4), 305–360. https://doi.org/10.1016/0304-405X(76)90026-X
