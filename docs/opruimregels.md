# Opruimregels gesprekskaarten (website)

1. Een oude of dubbele kaart wordt pas uit `cards.json` verwijderd als de vervanger op de site staat met `meta.afbeeldingStatus: "v3"` en een bestaand `.jpg` in `public/images/gesprekskaarten/`.
2. Vóór elke opruiming die kaarten of bestanden verwijdert: git-tag op de laatste commit zonder die verwijdering (bijv. `pre-opruiming-YYYY-MM-DD`).
3. Afbeeldingen, PDF’s en andere assets alleen verwijderen als geen andere kaart, script of broncode naar hetzelfde pad verwijst (repo-brede zoekactie op bestandsnaam).
4. Geen id’s van behouden kaarten wijzigen; geen afbeeldingen van behouden kaarten overschrijven.
5. Na wijzigingen: `npm run cards:catalog` zodat `catalog.json` en `count` kloppen.
6. Dubbelen met andere titel of inhoud dan de v3-vervanger: niet verwijderen — eerst rapporteren.
7. Het veld `hidden` blijft beschikbaar maar is geen vervanging voor definitieve verwijdering in deze opruimfase.
