# Recept – Cursor-prompt aflevering 1, stap 1: volledige modus aflevering-onafhankelijk maken (3 november 2026)

Besluit Richard (3 november 2026): aflevering 1 wordt volledig speelbaar. Stap 1 is een refactor zonder gedragswijziging, zodat aflevering 1, 2, 3 en 5 later zonder A4-specifieke code kunnen worden gevuld. Stap 2 (inhoud aflevering 1) en stap 3 (koppeling van de interventies aan de spelmotor) volgen apart.

## Cursor-prompt

Taak: aflevering-onafhankelijke volledige modus (refactor, GEEN gedragswijziging). Taal NL. Geen deploy. Commit niet zelf.

Context: nu schakelt isFullEpisode(episode) tussen A4-hardcoded data (ROUNDS, COLD_OPEN, DILEMMA_EP4_PIOTR, slotLineRonde1 en slotLinesFinale, film-scripts) en skeleton-data (SKELETON_*). Zie o.a. src/game/roundSource.ts, budgetFix.ts, budgetUi.ts, filmResolve.ts, hiddenMeters.ts, teamExport.ts, src/screens/phases/ColdPhase.tsx en src/components/DilemmaChoices.tsx.

1. Maak data/episodes/content.ts met een register EPISODE_CONTENT: Record<EpisodeId, EpisodeContent>. Per aflevering: rounds (één of twee RoundDefinition), coldOpen per ronde ({ place, img, lines }), dilemma (DilemmaDef of null), slotLines (functies), film (trailer per ronde en slot als FilmScript), titel per ronde en kick. Voor aflevering 4 verwijs je naar de bestaande exports (ROUNDS, COLD_OPEN, DILEMMA_EP4_PIOTR, slotLines, bestaande trailer- en slotscripts); kopieer of wijzig die data niet. Voor aflevering 1, 2, 3 en 5 gebruik je de bestaande skeleton-data.
2. Definieer een type DilemmaDef: id, aflevering, ronde, status, titel, privéBericht { van, tekst, kanaal: 'app' | 'briefje', dil }, keuzes (niets, groep, prive), effecten (niets, groep, prive met minTekst), ethiekNoot. Laat DILEMMA_EP4_PIOTR eraan voldoen. DilemmaChoices en hiddenMeters ontvangen een DilemmaDef als parameter in plaats van de A4-import.
3. Vervang alle isFullEpisode-takken in de bestanden hierboven door opzoekingen in het register op basis van state.episode. isFullEpisode(ep) blijft bestaan als helper: true als het register voor die aflevering volledige rondes, dilemma en slot bevat. playMode in data/episodes/meta.ts blijft de bron voor het UI-label 'skelet'.
4. teamExport: aantal rondes en dilemmatitel uit het register, niet uit episode === 4.
5. Tests: alle bestaande tests blijven ongewijzigd groen. Voeg toe: (a) golden-test: voor aflevering 4 zijn roundDefFor, cold-open-data, dilemma-effecten en slotlijnen identiek aan vóór de refactor; (b) het register heeft een entry voor elke aflevering 1 t/m 5; (c) skeleton-afleveringen geven dezelfde output als voorheen.
6. Docs: werk docs/DESIGNGIDS.md §7, docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij: stap 1 klaar; open: A1 stap 2 (inhoud) en stap 3 (koppeling interventies aan de spelmotor). Alle docs staan alleen in recept/docs.
7. Meld kort: wat is aangepast, testresultaat, afwijkingen.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
