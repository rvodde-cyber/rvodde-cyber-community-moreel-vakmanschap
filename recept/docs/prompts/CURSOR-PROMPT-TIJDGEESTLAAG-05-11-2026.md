# Recept – Cursor-prompt tijdgeestlaag (5 november 2026)

Voorwaarde: het budgetprompt (8 punten in ronde 1, 9 in ronde 2) is uitgevoerd. Bron: docs/TIJDGEEST.md.

## Cursor-prompt

Taak: tijdgeestlaag per aflevering (rekwisiet, optioneel geluid, tickergrapjes). Taal NL, teksten LETTERLIJK overnemen uit docs/TIJDGEEST.md. Puur sfeer: geen effect op motor, meters of golden-referenties. Geen deploy. Commit niet zelf. Wijzig data/rounds.ts (A4) en engine/compute.ts niet.

1. Docs: kopieer TIJDGEEST.md naar recept/docs/TIJDGEEST.md als het er nog niet staat (de teksten zijn leidend); verwijs ernaar in docs/DESIGNGIDS.md en docs/TAALGIDS.md.
2. Data: nieuw data/episodes/tijdgeest.ts met type Tijdgeest { rekwisieten: { id, omschrijving, beeldCode }[], geluid: { id, label, tekstalternatief, bron: 'geen' | 'eigen' | 'rechtenvrij' } | null, ticker: ['i' | '!', string][] } en een register TIJDGEEST per aflevering 1 t/m 5 met de teksten uit TIJDGEEST.md (per aflevering de drie tickerregels, rekwisieten met beeldcodes RENAULT-84, RENAULT-96, RENAULT-09, RENAULT-26, RENAULT-36 en de overige rekwisieten). Koppel via EPISODE_CONTENT (veld tijdgeest) in plaats van losse if-takken op aflevering.
3. Ticker: toon de tickerregels uit het register op de plek waar de ticker nu staat (dashboard/sidebar). Voor aflevering 4 komen ze ná de bestaande demo-ticker (rounds.ts blijft ongewijzigd; voeg de tijdgeestregels pas bij weergave toe). Raakt dit een golden-test of de demo-weergave, laat de A4-toevoeging dan weg en meld het. Voor aflevering 1 tot en met 3 en 5: toon de tijdgeestticker waar ook de skeleton-ticker staat of vervang daar de conceptregels.
4. Geluid: bouw alleen het mechanisme. Een aan/uit-knop (standaard UIT, nooit automatisch afspelen, bedienbaar met toetsenbord, aria-label), een zichtbaar tekstalternatief wanneer geluid aan staat (bijvoorbeeld "♪ cassettemuziek, zacht"), en een veilige fallback als er geen bestand is (geen fout, geen geluid). Voeg GEEN audiobestanden toe. Maak docs/GELUID-CHECK.md: per aflevering welk geluid nog moet worden gemaakt of gekozen, met de regel "geen auteursrechtelijk beschermde opnames in de repo; eigen of rechtenvrij; bandnaam in tekst mag".
5. Beeld: voeg de beeldcodes en de Firefly-prompts uit TIJDGEEST.md toe aan docs/beeldbank-codes.md en docs/BEELDEN-CHECK.md. Gebruik de bestaande placeholder-logica waar beeld ontbreekt; toon nergens een foutmelding. Toon een rekwisiet alleen als het beeld bestaat of als de aflevering al een achtergrondbeeld gebruikt waar het in past; anders alleen documenteren.
6. Toegankelijkheid: ticker en tekstalternatief zijn echte tekst (geen afbeelding), leesbaar contrast, geen knipperende animatie.
7. Tests: (a) register heeft voor elke aflevering 1 t/m 5 een tijdgeestblok met precies 3 tickerregels en de letterlijke teksten (eerste en laatste regel per aflevering); (b) geluid staat standaard uit en heeft een tekstalternatief; (c) geen audiobestanden in public/ of data/ toegevoegd; (d) A4: golden en demo-ticker ongewijzigd; alle bestaande tests blijven groen.
8. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij (tijdgeestlaag klaar; open: audio maken of kiezen, Firefly-beelden Renault en rekwisieten, beslissen waar rekwisieten in beeld komen).
9. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
