# START HIER: Recept in Cursor bouwen

## Wat je doet (vijf minuten)

1. Maak een lege map `recept` en open die in Cursor.
2. Alles staat al in deze map (`docs/`, `referentie/`, `CURSOR-PROMPT.md`). Open de map in Cursor.
3. Open Cursor Agent (Cmd/Ctrl+I), kies de sterkste beschikbare model, zet "Plan" aan voor de eerste ronde.
4. Plak het startbericht hieronder. Cursor leest de rest zelf.

## Startbericht (plakken in Cursor)

```
Lees CURSOR-PROMPT.md volledig en voer het uit. Alle bronnen staan in de mappen docs/ en referentie/ van deze repository (er is geen externe toegang nodig). Maak eerst een bouwplanning van maximaal 40 regels, werk daarna de volgorde uit paragraaf 11 af, commit na elke stap en lever de lijst "Wat Richard nog moet aanleveren". Alle zichtbare tekst is Nederlands.
```

## Wat Cursor al heeft

| Onderdeel | Waar |
| --- | --- |
| Hoofdprompt met alle regels | `CURSOR-PROMPT.md` |
| Nieuwste speelbare demo (versie 6) met beelden | `referentie/demo-aflevering4-v6.html` en `referentie/beelden/` |
| Rekenregels en personages | `docs/spelmotor.md`, `docs/dronefabriek-deel1.md` |
| Portretprompts voor de beeldgenerator | `docs/PORTRETTEN-PROMPTS.md` |
| Ontwerpdocumenten | `docs/overzicht.md`, `serieconcept.md`, `keuzes-en-dashboard.md`, `beeldbank-codes.md` |

## Wat jij nog moet aanleveren (kan later, Cursor bouwt met plaatsaanduidingen)

1. Portretten (8 stuks) maken met `docs/PORTRETTEN-PROMPTS.md` en opslaan in `public/portretten/`.
2. Overige Firefly-beelden (komen in `public/beelden/<code>.webp`; de tien beelden uit de demo staan al in `referentie/beelden/`).
3. Ontwerp van de interventies voor aflevering 1, 2, 3 en 5 (Cursor bouwt conceptversies).
4. Besluit over de Greiner-crisis van aflevering 4 (nu de demo-waarden).
5. Bevestiging dat de portretten gestileerd zijn (en niet fotorealistisch zoals de beeldbank).

## Na de eerste bouw

Laat Cursor `docs/AFWIJKINGEN.md` en `docs/BESLUITEN-CURSOR.md` zien en kom ermee terug naar Claude: dan beoordelen we samen wat klopt, wat afwijkt en wat nog gekalibreerd moet worden.

## Hervatten na een pauze

Cursor gaat niet uit zichzelf verder als zijn sessie stopt of het venster sluit; hij heeft altijd een nieuw bericht nodig. Plak bij hervatten:

```
Lees docs/VOORTGANG.md, docs/OPEN-VRAGEN.md en git log. Ga verder bij de eerstvolgende open stap uit CURSOR-PROMPT.md paragraaf 11. Verwerk wat nieuw is in OPEN-VRAGEN.md, commit na elke stap en werk docs/VOORTGANG.md bij.
```
