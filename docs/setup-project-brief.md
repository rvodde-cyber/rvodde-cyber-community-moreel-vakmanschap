# Setup — projectbrief voor Claude Project + Cursor

Eén document met de volledige stand van zaken, bedoeld om te gebruiken als:
- **Claude Project**: voeg dit bestand + `setup-instrument-spec.md` toe als knowledge/project-bestanden, en zet de "Vaste beslissingen" en "Bouwvolgorde" hieronder als project-instructies.
- **Cursor**: plak de sectie "Instructie voor Cursor" onderaan als eerste bericht in de projectmap.

Auteur van dit traject tot nu toe: samenwerking tussen Richard Voddé en Claude (Claude Code). Dit document vervangt eerdere losse instructies (`cursor-instructies.md`, `lokale-variant.md` uit een eerdere sessie) — die gingen uit van een Next.js + Supabase-opzet die inmiddels is losgelaten ten gunste van de aanpak hieronder.

---

## 1. Wat Setup is

Een diagnose- en begeleidingsinstrument voor organisatieadviseurs die teams begeleiden in een verandertraject. Vijf secties, elk met een eigen invalshoek en een eigen invoerinstrument in plaats van een standaardformulier:

- **Chassis** — organisatiediagnose (ESH: strategie, structuur, systemen, sleutelvaardigheden, managementstijl, personeel, cultuur). Draaiknop-invoer, Likert 1-5. Spreiding tussen respondenten is het belangrijkste signaal, niet het gemiddelde.
- **Rijlijn** — De Caluwé-kleurentest, los van de ESH-variabelen, forced-choice via een schakelaar. Kleurprofiel van de hele groep, niet alleen de dominante kleur.
- **Vermogen** — veranderbereidheid (willen/moeten/kunnen, Ajzen/Metselaar & Cozijnsen). Drie subschalen apart tonen, plus een "lichtbalk" die pas oplicht als alle drie tegelijk leveren.
- **Chauffeur** — ethisch leiderschap (ELW), team-over-leidinggevende én leidinggevende-over-zichzelf apart bevraagd. Plus stijl-fit: de Rijlijn-kleur van de chauffeur tegen die van het team, gevisualiseerd als een stuurwiel dat scheef staat bij mismatch.
- **Pitcrew** — vertrouwen, verbinding en isolatierisico. Pas zinvol en pas getoond vanaf 3 respondenten.

Het instrument **diagnosticeert, het oordeelt niet**: bevindingen worden als vraag geformuleerd, nooit als uitspraak over een persoon. Het rapport is een instrumentenpaneel (vijf analoge meters + stuurwiel), geen tekstdocument.

**Volledige spec, vraagbanken, exacte scoringlogica en visuele stijlgids**: zie `setup-instrument-spec.md` (apart bestand, leidend document — lees dat eerst volledig).

## 2. Waar dit moet komen

Setup wordt **geen los project**, maar een nieuwe sub-app in de bestaande, live community-hub:

- **Repo**: `rvodde-cyber/rvodde-cyber-community-moreel-vakmanschap`
- **Patroon**: zelfde opzet als de bestaande sub-apps `teamkompas/` en `frisse-organisatie/` in die repo — eigen map `setup/` met eigen `package.json`, gebouwd met Vite, output gekopieerd naar `dist/setup/`, ontsloten via een `vercel.json`-rewrite op `/setup`.
- **Niet gebruiken**: de eerder gebouwde Next.js + Supabase-scaffold in de aparte repo `moreel-vakmanschap-leergang` — die was voor een standalone-opzet die is losgelaten. De spec en de architecturale beslissingen daaruit blijven wel geldig; alleen de technische scaffold (Next.js App Router, Supabase-tabellen, RLS) wordt niet hergebruikt.

## 3. Tech stack

Consistent met de rest van de hub:

- **Frontend**: Vite + React + Tailwind CSS (geen Next.js). React Router voor de sectienavigatie.
- **Backend**: Vercel serverless functions onder `api/setup/*.js`, naar het patroon van het bestaande `api/workshop/*.js` in de hub-repo.
- **Grafieken**: recharts, voor het radardiagram (Chassis-detail) en het staafdiagram (Vermogen-detail).
- **Eigen componenten**: draaiknop, schakelaar, schuifje, de vijf dashboard-meters en het stuurwiel — pure SVG/React, `rotate()` op basis van een 0-100-score, geen externe gauge-library.
- **PDF-export**: react-pdf of vergelijkbaar, voor het adviseursrapport.

## 4. Privacy-architectuur — versleutelde tijdelijke postbus (vastgesteld)

Richard wil remote invullen ondersteunen (link vooraf sturen, mensen vullen op hun eigen moment in, over meerdere dagen — zoals in de spec beschreven), maar zonder dat er ergens leesbare persoonsdata wordt opgeslagen. Overwogen alternatief was een pure live-sessie zonder server (niets wordt ooit verstuurd, maar iedereen moet tegelijk met de adviseur online zijn) — **dat is niet gekozen** omdat het niet past bij de asynchrone flow uit de spec.

**Gekozen aanpak — end-to-end versleuteling met een tijdelijke, blinde tussenopslag:**

1. De adviseur maakt een traject aan **client-side in de browser**. Genereert lokaal een symmetrische sleutel (WebCrypto, AES-GCM) en twee links (team + leidinggevende), met de sleutel in het **fragment** van de URL (het deel ná `#`) — dat deel wordt door browsers nooit naar een server verstuurd. De adviseur bewaart deze links zelf; kwijtraken betekent onherstelbaar verlies van toegang tot het rapport. Dat is de bewuste prijs van echte end-to-end-versleuteling, geen bug.
2. Een respondent opent zijn link; de sleutel wordt uit het fragment gelezen en blijft in de browser. Elk antwoord wordt vóór verzending versleuteld en gepost naar `POST /api/setup/submit`.
3. Die serverless function schrijft **alleen de cijferbrij** weg naar een tijdelijke key-value-opslag **met een verloopdatum (TTL)** — voorlopige keuze: **Vercel KV / Upstash Redis**, omdat dat naadloos aansluit op de bestaande Vercel-hosting en ingebouwde TTL heeft. De server ziet op geen enkel moment leesbare inhoud.
4. De adviseur haalt via `GET /api/setup/fetch` de cijferbrij voor zijn traject op en ontsleutelt die **in zijn eigen browser** met de sleutel uit zijn eigen link. Pas daar worden aggregaten, spreiding, de 3-respondenten-anonimiteitscheck en de meters berekend.
5. Na ophalen kan `POST /api/setup/purge` de blobs actief wissen (extra hygiëne, naast de TTL als vangnet).

**Nog te bevestigen door Richard**: het gebruik van Vercel KV/Upstash als tussenopslag is een voorstel, geen vastgestelde keuze — bevestig dit bij het opzetten in Cursor, of vervang door een alternatief met dezelfde eigenschap (blind voor plaintext, TTL-ondersteuning).

## 5. Vaste architecturale keuzes — niet zonder overleg wijzigen

1. **Rol "leidinggevende"**: geen apart account, geen zelfselectie. Aparte link per rol, door de adviseur bij intake gegenereerd (zie punt 4.1 hierboven).
2. **Anonimiteitsdrempel**: 3 respondenten geldt voor **alle** secties (Chassis, Rijlijn, Vermogen, Chauffeur-teambeeld, Pitcrew), niet alleen Pitcrew. Wordt client-side afgedwongen in de adviseursbrowser (waar de ontsleuteling toch al gebeurt) — niet tonen totdat er ≥3 respondent-datasets voor die rol/traject ontsleuteld zijn.
3. **Hervatten**: een respondent kan tussentijds stoppen en later verdergaan. Antwoorden worden per item verstuurd/geüpsert (niet pas bij volledige afronding), zodat een sessie-token in de link/cookie hervatten mogelijk maakt.
4. **Schaal**: overal 1-5 als opgeslagen/versleutelde Likert-waarde. 0-100 is puur een rekenstap in de weergavelaag voor de naaldhoek van een meter.
5. **Vraagcatalogus leeft in de applicatiecode** (JS/TS-constanten in `setup/src/`), niet in enige database.
6. **Accentkleur**: donker racing green, bewust niet rood — rood is gereserveerd voor het isolatierisico-lampje op het dashboard (hoofdstuk 10 van de spec).
7. **Toon**: Nederlandse interface-teksten, rustige volwassen toon, geen uitroeptekens, geen gamification-taal. Code/commentaar/variabelen in het Engels. Rapportbevindingen altijd als vraag/observatie, nooit als declaratieve uitspraak over een persoon.
8. **Visuele stijl**: "strak Apple-achtig" — rustig, veel witruimte, één duidelijke actie per scherm, glaseffect (backdrop-blur) op kaarten, geen generieke Bootstrap/Material-uitstraling. Zie hoofdstuk 10 van de spec.

## 6. Bouwvolgorde — stop na elke fase voor akkoord

Zelfde discipline als bij de rest van dit traject: niet in één keer doorbouwen.

1. **Fase 1 — Skelet + versleutelingslaag.** De `setup/`-map opzetten volgens het bestaande sub-app-patroon, de `api/setup/*`-functions (submit/fetch/purge) met de KV-opslag, en de client-side crypto-helpers (sleutel genereren, link samenstellen, versleutelen/ontsleutelen). Nog geen echte vragenlijst-UI. Laat dit zien voor akkoord — dit is de laag waar alle privacy-garanties op rusten, die moet eerst kloppen.
2. **Fase 2 — Eén sjabloonpagina: Chassis.** Sectiepagina met voortgangsindicator, de draaiknop-component, placeholder-illustratie (gradient in het palet), glaseffect-kaarten. Wordt het sjabloon voor de rest.
3. **Fase 3 — Overige secties**: Rijlijn (schakelaar), Vermogen (drie meters + lichtbalk), Chauffeur, Pitcrew.
4. **Fase 4 — Rapport en dashboard**: vijf meters, stuurwiel, detailweergaven (radar/staafdiagram/kleurprofiel), Setup-check, PDF-export.
5. **Fase 5 — Polish**: anonimiteitsdrempel-gedrag scherpstellen, disclaimers, adviseursinstellingen (de "schroef" voor de isolatierisico-drempel), toegankelijkheid (`aria-valuetext`, toetsenbordbediening).

Na elke fase: korte samenvatting + openstaande keuzes, niet doorbouwen zonder akkoord.

## 7. Openstaande punten

- **KV-store-keuze** (zie hoofdstuk 4): Vercel KV/Upstash is een voorstel, geen besluit.
- **Firefly-illustraties**: er ligt al een kant-en-klare promptset (zes prompts, gedeelde stijlgids racing-green/staalblauw) uit een eerdere sessie — vraag Richard om `firefly-prompts.md` als die nog niet is meegegeven.
- **GitHub-toegang**: op het moment van schrijven had de Claude-sessie geen push-toegang tot `rvodde-cyber-community-moreel-vakmanschap` (GitHub App wel geautoriseerd, niet geïnstalleerd met repository-toegang — fix via https://github.com/apps/claude/installations/select_target). Niet relevant voor Cursor, wel voor eventueel verder werk via Claude Code in deze repo.

---

## Instructie voor Cursor (plak dit als eerste bericht)

Je gaat de sub-app **Setup** bouwen in deze repo (`rvodde-cyber-community-moreel-vakmanschap`), naast de bestaande sub-apps `teamkompas/` en `frisse-organisatie/`. Lees eerst `setup-instrument-spec.md` en dit hele document (`docs/setup-project-brief.md`) volledig — samen zijn ze leidend. Volg hoofdstuk 6 hierboven (bouwvolgorde) en stop na elke fase voor akkoord van Richard, in plaats van in één keer door te bouwen. Wijk niet stilzwijgend af van de vaste keuzes in hoofdstuk 5, en bouw de privacy-architectuur uit hoofdstuk 4 zoals beschreven — dat is het fundament, niet een detail dat later ingevuld kan worden. Volg voor de projectstructuur en build-integratie exact het patroon van `teamkompas/` en `frisse-organisatie/` (eigen `package.json`, `VITE_BASE_PATH`, build-script in de root `package.json`, rewrite in `vercel.json`) zodat Setup meelift op de bestaande Vercel-deployment.
