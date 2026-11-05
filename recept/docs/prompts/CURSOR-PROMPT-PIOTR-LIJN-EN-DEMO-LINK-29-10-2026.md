# CURSOR-PROMPT – Recept: Piotr-lijn + werkbare demo-link (29 oktober 2026)

Taal: Nederlands (code-identifiers mogen Engels). Toon: professioneel, persoonlijk, niet hyperbolisch. Werk in kleine commits met Nederlandse berichten. Houd `docs/VOORTGANG.md` na elk onderdeel bij. Bij twijfel over inhoud of ethiek: NIET zelf invullen, maar noteren in `docs/OPEN-VRAGEN.md` en doorgaan met het volgende punt. Geen force-push. Bouw geen accounts, analytics of multiplayer.

## Doel

1. Een werkbare, besloten demo-link (live URL) waarmee Richard en geselecteerde studenten aflevering 4 kunnen spelen.
2. De Piotr-lijn (aflevering 4 en slot, aflevering 5) technisch klaarzetten als getypte, statusgestuurde scènes, zodat inhoud van Richard/Claude zonder codewijziging erin kan.

## Vaste ethische spelregels (altijd bewaken)

- Piotr is een mens met een eigen verhaal, geen herkomst-cliché. Wit-Rusland wordt NIET expliciet genoemd in spel- of beeldtekst. Zijn herkomst blijft impliciet ("hij komt van ver").
- Geen "juist antwoord" bij het dilemma. Nabespreking werkt met open gespreksvragen.
- Het woord "cliffhanger" komt nergens in de UI of copy voor. De slotscène start na de knop "Einde van dit deel".
- Keuzes heten "interventies".
- Het Defensie-contract gaat ALTIJD door. De keuze van het MT raakt alleen de verborgen meters "eerlijkheid" en "menselijke maat" (en de bijbehorende nabespreking), niet het contract zelf.
- Concepttekst wordt nooit als definitief getoond aan studenten (zie statusmodel).

## Onderdeel A – Voorcontrole en push

1. Toon `git log --oneline origin/main..HEAD` (14 commits). Zet per commit één regel in `docs/VOORTGANG.md` en meld of er iets bij zit dat niet bij stap 2–5 hoort. Zo ja: stop en meld.
2. Draai `npm test` en `npm run build` in `recept/`. Alleen bij groen: `git push` (geen force).
3. Controleer dat `recept/dist` geen testdata, sleutels of persoonsgegevens bevat en dat er geen externe requests worden gedaan (alleen eigen domein). Noteer in `docs/DEPLOY.md`.

## Onderdeel B – Werkbare demo-link (Netlify)

1. Probeer eerst de Netlify-CLI: `npx netlify-cli status`. Niet ingelogd? Voer `npx netlify-cli login` uit en laat Richard de browserstap bevestigen. Lukt dit niet, schrijf dan in `docs/DEPLOY.md` een stappenplan voor handmatig slepen van `recept/dist` naar https://app.netlify.com/drop en ga door met onderdeel C.
2. Maak een site met een niet-raadbare naam: `recept-` + 8 willekeurige tekens (kleine letters en cijfers). Deploy met `npx netlify-cli deploy --prod --dir=recept/dist`.
3. Zorg dat deze bestanden bestaan: `<meta name="robots" content="noindex,nofollow">`, `public/robots.txt` met `Disallow: /`, `netlify.toml` (publish = `recept/dist`, SPA-redirect `/* /index.html 200`).
4. Twee URL's documenteren in `docs/DEPLOY.md`:
   - Studentlink: `https://<site>.netlify.app/` (alleen definitieve inhoud).
   - Docentlink: `https://<site>.netlify.app/?docent=1` (concepten zichtbaar met label "CONCEPT").
5. Genereer een QR-code (PNG, lokaal gegenereerd, geen externe service) voor de studentlink en sla op als `docs/qr-student.png`. Voeg een README-regel toe dat de URL niet publiek gedeeld wordt.
6. Wachtwoordbeveiliging bij Netlify is mogelijk betaald. Kan dat niet, meld expliciet in `DEPLOY.md` en in je antwoord: "Toegang berust op een niet-raadbare URL; gebruik alleen voor besloten demo's zonder persoonsgegevens."
7. Rooktest op de live URL (beide links): aflevering 4 start, `?docent=1` werkt, nabespreking opent, instellingenmodal werkt, geen consolefouten. Noteer uitkomst in VOORTGANG en geef in je antwoord de twee URL's.

## Onderdeel C – Statusmodel voor inhoud

Gebruik overal hetzelfde type:

```
type Status = 'leeg' | 'concept' | 'definitief'
type Scene = { id: string; titel: string; tekst: string; status: Status; bron?: string }
```

- Student: alleen `definitief`; bij `leeg` of `concept` een neutrale fallbacktekst ("Dit onderdeel volgt.") en nooit een leeg scherm.
- Docentmodus (`?docent=1`): `concept` zichtbaar met duidelijk label "CONCEPT".
- Test: faalt als een scène `definitief` is zonder niet-lege tekst, of als een `concept` zonder label wordt gerenderd in studentmodus.

## Onderdeel D – Piotr-lijn als data (`data/piotr-lijn.*`)

Maak scènes met onderstaande beats. Schrijf per scène GEEN eigen literaire tekst; zet de beat letterlijk als `tekst` met status `concept` (Claude/Richard leveren de uitgewerkte tekst in `docs/VOORSTELLEN-RECEPT-29-10-2026.md`, sectie 2; voer die in als `concept`).

**Aflevering 4, ronde 1**
- `a4r1-piotr-intro`: Piotr werkt als flexkracht via uitzendbureau Brabantse Personeelsdiensten (contactpersoon Peter Kramer). Overige flexkrachten blijven anoniem; alleen Piotr heeft naam, portret en verhaal.

**Aflevering 4, ronde 2**
- `a4r2-keuze-contract`: MT-interventie "Piotr in dienst nemen" (loyaliteit, kleine post, aanname € 25.000; pas mogelijk na een jaar via het bureau). Maak dit een interventie met flag `interventieDefinitief` = false tot Richard akkoord geeft.
- `a4r2-harrie-belt`: tijdens het rondje MT belt Harrie. Hij noemt Piotr "een van ons", ziet hem als geadopteerd kind en staat bij Defensie garant, terwijl de familie twijfelt.
- `a4r2-erik-twijfel`: Erik twijfelt met zakelijke argumenten (aansprakelijkheid, licentie), nooit met herkomstargumenten.
- `a4r2-dilemma-privebericht`: een screening door Defensie maakt Piotr verdacht om zijn herkomst, terwijl er niets met hem aan de hand is. Het dilemma komt via Piotr zelf, privé, bij de zus (de speler), niet via het MT-dashboard en los van de spelmotor.

**Aflevering 4, slotscène (2031)** – start na "Einde van dit deel"
- `a4-slot-testament`: Harrie is overleden. In zijn testament staat een zin die Piotr de schuur in Berkel-Enschot nalaat, door Harrie eigenhandig en zonder overleg met de familie. Een andere pen heeft de zin doorgestreept. Piotr weet van niets en staat bij de deur.
- Variantlogica: noteer in OPEN-VRAGEN dat de vertakking afhankelijk van het MT-contract in ronde 2 nog bevestigd moet worden (bron: "zonder MT-contract in ronde 2 had Harrie het zelf geregeld; het MT mist die kans"). Bouw één slotscène met een leeg variantveld `variantZonderContract` (status `leeg`) en wacht op Richard.

**Aflevering 5 (2036)**
- `a5-onthulling`: Erik blijkt de zin te hebben doorgestreept (grond, Sanne, Optivora). Aan het licht via een brief van Harrie in de schuur en Lies die zijn woorden herkent. Erik legt het zakelijk uit. Sanne wist het niet.
- `a5-overdracht`: Piotr (vaste ploegleider, huis en gezin in Nederland) draagt de schuur over aan Anne-Fleur. Lies geeft haar beslissende stem aan Anne-Fleur.

Voeg per scène toe: `fase` (Zien | Voelen | Wegen | Handelen | Volhouden) als nabespreekanker, en `beeld` (verwijzing naar I1–I5 of `placeholder`).

## Onderdeel E – Beelden en portretten

- Toon alleen beelden met akkoord = ja in `docs/BEELDEN-CHECK.md`; anders neutraal silhouet.
- Maak in BEELDEN-CHECK per beeld een kolom met de stereotypencheck uit sectie 6 van `docs/VOORSTELLEN-RECEPT-29-10-2026.md` (Richard plaatst dit bestand in `docs/`).
- Alt-teksten in het Nederlands, beschrijvend en zonder herkomstlabels.

## Onderdeel F – Nabespreking koppelen (zonder inhoud te verzinnen)

- Lees sectie 5 van `docs/VOORSTELLEN-RECEPT-29-10-2026.md` in als datastructuur `data/nabespreking-ep4.*` met status `concept`. Toon in docentmodus gegroepeerd per fase, met label "CONCEPT".
- Voeg in docentmodus een "Veilig gesprek"-blok toe boven de vragen met de tekst uit het voorstelbestand. Studenten zien het blok niet.

## Onderdeel F2 – Overige voorstellen alleen als structuur

Zet sectie 3 (Sanne), 4 (Greiner-crisis) en 7 (interventies) uit het voorstelbestand in de lege slots `sanneReactieEp4`, `greinerCrisisEp4` en de interventieskeletten, alles op `concept` en `interventieDefinitief = false`. Koppel niets aan de spelmotor. Houd de bestaande test die faalt bij een true-flag zonder volledige gevolgen.

## Bronnen (voor in docs/ en nabespreking)

Bianchi, F., Kalluri, P., Durmus, E., Ladhak, F., Cheng, M., Nozza, D., Hashimoto, T., Jurafsky, D., Zou, J., & Caliskan, A. (2023). Easily accessible text-to-image generation amplifies demographic stereotypes at large scale. In *Proceedings of the 2023 ACM Conference on Fairness, Accountability, and Transparency* (pp. 1493–1504). ACM. https://doi.org/10.1145/3593013.3594095

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation. https://www.w3.org/TR/WCAG22/

## Onderdeel G – Eindrapport

Werk `docs/VOORTGANG.md` en `docs/OPEN-VRAGEN.md` bij. Sluit af met: wat klaar is, live URL's (student en docent), testresultaten (aantallen), wat op Richard wacht, en de top-3 volgende acties. Houd de mededeling kort.
