# Handleiding — Engelse vertaling Moreel Woordenboek

Stap-voor-stap: hoe je met Claude de ~390 ontbrekende Engelse termen
vertaalt en terugzet in de site.

**Benodigd:** deze repo lokaal, Node.js, een Claude-chat (claude.ai of Cursor),
en de prompt in `docs/claude-prompt-woordenboek-vertaling-en.md`.

**Hulpscripts:**

| Commando | Doel |
|----------|------|
| `npm run woordenboek:batch` | Haalt de volgende open termen op, klaar om te plakken |
| `npm run woordenboek:apply -- bestand.json` | Zet Claude’s JSON terug in `entries.json` |

---

## Overzicht van de hele ronde

```
┌─────────────┐    plakken     ┌─────────┐    JSON-array    ┌──────────────┐
│ batch-export│ ─────────────► │ Claude  │ ───────────────► │ batch-apply  │
└─────────────┘                └─────────┘                  └──────────────┘
       ▲                                                          │
       │              nalezen + npm run build                     │
       └──────────────────── herhaal tot klaar ◄──────────────────┘
```

Reken op **1 proefbatch (20)** + **±8 batches van 40–50**. Tussendoor even
pauzeren na de proef: jouw correcties worden het stijlkader voor de rest.

---

## Stap 0 — Eenmalig klaarzetten

1. Zorg dat je op een actuele `main` zit (of een featurebranch daarvan),
   mét het woordenboek (na merge van PR #12):
   ```bash
   git pull origin main
   npm install
   ```
2. Open Claude in een **nieuw** gesprek of Project.
3. Kopieer uit `docs/claude-prompt-woordenboek-vertaling-en.md` alles
   **tussen de streepjes** (het grote promptblok) en plak dat als eerste
   bericht.
4. Claude antwoordt kort met iets als “Klaar voor batch.”  
   → klaar voor stap 1.

Tip: bewaar dit gesprek. Alle volgende batches plak je in **dezelfde** chat,
zodat Claude de eerdere keuzes blijft volgen.

---

## Stap 1 — Proefbatch (20 termen)

Eerst klein, zodat jij de toon kunt bijsturen vóórdat er 400 termen staan.

```bash
npm run woordenboek:batch -- --size 20 --out tmp/woordenboek-batch-00.txt
```

1. Open `tmp/woordenboek-batch-00.txt`.
2. Kopieer **alles** (inclusief de statusregels bovenaan én de JSON).
3. Plak het in Claude als tweede bericht.
4. Claude geeft een JSON-array terug met `id`, `term_en`, `definition_en`
   (soms met `"note"`).

**Nalezen — let op:**
- Klinkt het als ethiekonderwijs, niet als Google Translate?
- Leenwoorden (bystander, phronesis, …) onvertaald gelaten waar dat hoort?
- Definities niet langer of moralistischer dan het Nederlands?
- Items met `"note": "nl_source_noisy"`: is de EN-definitie wel bruikbaar?

Noteer 3–5 correcties (“gebruik X i.p.v. Y”, “korter”, “houden als leenwoord”).
Plak die als kort bericht naar Claude:

> Correcties op deze batch: …  
> Pas dit toe op alle volgende batches.

---

## Stap 2 — Antwoord opslaan en toepassen

1. Kopieer Claude’s JSON-array (vanaf `[` tot en met `]`).
2. Sla op als bestand, bijvoorbeeld:
   ```bash
   # plak in je editor, of:
   pbpaste > tmp/woordenboek-antwoord-00.json   # macOS
   # of handmatig opslaan als tmp/woordenboek-antwoord-00.json
   ```
3. Droogtest (wijzigt nog niets):
   ```bash
   npm run woordenboek:apply -- --dry-run tmp/woordenboek-antwoord-00.json
   ```
   Check: `bijgewerkt` ≈ 20, `onbekend` = 0.
4. Echt toepassen:
   ```bash
   npm run woordenboek:apply -- tmp/woordenboek-antwoord-00.json
   ```
5. Controleer in de browser:
   ```bash
   npm run dev
   ```
   Ga naar `/dictionary`, zoek één term uit de batch, wissel NL↔EN.

Als iets mis is: `git checkout -- src/data/woordenboek/entries.json` en opnieuw.

---

## Stap 3 — Productiebatches (40–50)

Herhaal tot de status `nog_open: 0` zegt.

```bash
# Batch 1 — standaard 40 stuks vanaf het begin van wat nog open is
npm run woordenboek:batch -- --size 40 --out tmp/woordenboek-batch-01.txt

# Na apply van batch 1 pakt het script automatisch de volgende open termen
npm run woordenboek:batch -- --size 40 --out tmp/woordenboek-batch-02.txt
```

Per batch hetzelfde ritueel:

1. Bestand in Claude plakken (zelfde chat).
2. JSON-antwoord opslaan als `tmp/woordenboek-antwoord-0N.json`.
3. `npm run woordenboek:apply -- --dry-run …` → daarna zonder `--dry-run`.
4. Steekproef: 5 termen op `/dictionary` checken.
5. Items met `note` in een lijstje bijhouden (Excel of notitie) voor later.

**Optioneel filteren** (handig als je per letter wilt nalezen):

```bash
npm run woordenboek:batch -- --letter A --size 50 --out tmp/batch-A.txt
npm run woordenboek:batch -- --cluster reflectie-oordeel --out tmp/batch-reflectie.txt
```

---

## Stap 4 — Afronden

Als `woordenboek:batch` meldt dat er niets meer open is:

1. Bouwen:
   ```bash
   npm run build
   ```
2. Committen:
   ```bash
   git add src/data/woordenboek/entries.json
   git commit -m "Add English translations for Moral Dictionary entries"
   git push
   ```
3. Open een PR, of push naar `main` als je dat zo afspreekt.
4. Na deploy: `/dictionary` openen en een paar letters + clusters nalopen.

---

## Stap 5 — Nabewerking (niet vergeten)

- **Alle `nl_source_noisy`-notes**: apart NL-definities redigeren (die zijn
  vaak te woordenboekachtig). Dat is geen vertaalwerk — dat is redactie.
- **Twijfelgevallen** (`note: chose X over Y`): één keer langslopen met jou
  als vakinhoudelijk eindredacteur.
- De 24 kerntermen die al vertaald waren **niet** opnieuw laten doen; het
  exportscript slaat alles met een gevulde `term_en` automatisch over.

---

## Problemen & snelle fixes

| Symptoom | Oplossing |
|----------|-----------|
| Claude geeft uitleg i.p.v. JSON | Zeg: “Alleen de JSON-array, geen inleiding.” |
| `onbekend: 3` bij apply | Claude heeft een `id` veranderd — corrigeer handmatig of vraag opnieuw met “behoud exact de id’s” |
| `Incomplete vertaling` | Lege `term_en`/`definition_en` — die term opnieuw laten vertalen |
| Batch bevat termen die al EN hebben | Je zat op een oude `entries.json` — `git pull` en opnieuw exporteren |
| `/dictionary` toont nog NL | Hard refresh; check of `getEntryDisplay` de nieuwe velden ziet (build/dev herstarten) |

---

## Checklist per batch

- [ ] Batch geëxporteerd met `woordenboek:batch`
- [ ] In **dezelfde** Claude-chat geplakt als de prompt
- [ ] Antwoord opgeslagen als `.json`
- [ ] `--dry-run` gecontroleerd
- [ ] Apply gedraaid
- [ ] 5 termen op `/dictionary` bekeken
- [ ] Notes genoteerd
- [ ] (Na alle batches) `npm run build` + commit/PR

---

*Prompt: `docs/claude-prompt-woordenboek-vertaling-en.md`*  
*Scripts: `scripts/woordenboek-batch-export.mjs`, `scripts/woordenboek-batch-apply.mjs`*
