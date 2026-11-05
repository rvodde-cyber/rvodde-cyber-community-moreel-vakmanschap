# Recept – Cursor-prompt: aflevering 5 interventies definitief (3 november 2026)

Status: Richard heeft op 3 november 2026 alle acht interventies van aflevering 5 akkoord gegeven (ronde 1: 5.1.1 t/m 5.1.4; ronde 2: 5.2.1 t/m 5.2.4). Interventie 5.2.3 (Bureaucratie afslanken) blijft staan als bewuste echo van de demokaart 'Regels schrappen' (A4, ronde 2, kaart H). Verder geen tekstwijzigingen. De nabespreking van aflevering 5 (a5-nb-1 t/m a5-nb-5) blijft `concept`.

Voorwaarde: voer eerst CURSOR-PROMPT-A4-DEMO-LEIDEND-03-11-2026.md uit (A4 volgt de demo), daarna dit prompt.

## Cursor-prompt

Taak: aflevering 5 interventies definitief maken. Taal NL. Wijzig alleen wat hieronder staat. Niet koppelen aan de spelmotor. Geen deploy. Zelfde aanpak als bij aflevering 1 t/m 3.

1. In data/interventies-a5.ts: zet voor alle acht interventies (ids a5-1-1, a5-1-2, a5-1-3, a5-1-4, a5-2-1, a5-2-2, a5-2-3, a5-2-4) status='definitief' en interventieDefinitief=true. Teksten, effecten, verborgen meters, anker, ethischRisico, uitkomsttekst en opvolging blijven exact zoals nu.
2. Nabespreking a5-nb-1 t/m a5-nb-5 blijft status 'concept'; de definitief-markering werkt alleen op de acht interventies.
3. Echo bij a5-2-3 (Bureaucratie afslanken): voeg echo toe met bron 'demo-a4-H' (de demokaart 'Regels schrappen', ronde 2 van A4, data/rounds.ts kaart H) en tekst: "Het klinkt bekend: ook in aflevering 4 schrapten jullie regels. Nu gaat het over het hele conglomeraat, niet over één fabriek." Voeg 'demo-a4-H' toe aan een lijst ECHO_BRON_DEMO_KAARTEN_IDS in data/interventies/types.ts (naast ECHO_BRON_BEGROTING_IDS) en laat assertEchoBronnenBestaan die lijst accepteren; controleer dat kaart H in data/rounds.ts bestaat met naam 'Regels schrappen'. De echo wordt alleen getoond als die kaart gekozen was; de koppeling met het spelverloop volgt in de spelmotor-fase, nu alleen data.
4. Controleer dat voor elke definitieve interventie alle verplichte velden gevuld zijn (validate.ts moet slagen). Als een veld ontbreekt: niet verzinnen, maar stoppen en melden in docs/OPEN-VRAGEN.md.
5. Studentmodus: de acht A5-interventies zijn nu zichtbaar; verborgen meters (eerlijkheid, menselijke maat) blijven onzichtbaar. Docentmodus: geen label 'CONCEPT' meer bij deze acht.
6. Tests: draai alle tests. Voeg toe: (a) alle acht A5-interventies zijn definitief en hebben alle velden; (b) studentmodus toont ze zonder verborgen meters; (c) nabespreking A5 is nog 'concept'; (d) a5-2-3 heeft een echo met bron 'demo-a4-H' en die bron bestaat; (e) a5-1-3 (Anne-Fleur) is aanwezig en definitief.
7. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: A5-interventies definitief (3 november 2026), echo a5-2-3; open blijft: nabespreking A1 t/m A5, Sanne en overige nabespreking, beeldakkoord, A4-verwijzingen (zie A4-prompt punt 4). Alle docs staan alleen in recept/docs.
8. Meld kort: wat is aangepast, testresultaat, eventuele afwijkingen. Commit niet zelf; ik doe dat.

## Bronnen

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.

Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes: A meta-analysis. Journal of Applied Psychology, 87(2), 268–279. https://doi.org/10.1037/0021-9010.87.2.268

Tenbrunsel, A. E., & Smith-Crowe, K. (2008). Ethical decision making: Where we've been and where we're going. Academy of Management Annals, 2(1), 545–607. https://doi.org/10.1080/19416520802211677
