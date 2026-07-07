# Gesprekskaarten — import & redactie (~100 kaarten)

Stapsgewijze aanpak voor categoriseren, sterren, tekst (max. 150 woorden) en Firefly-afbeeldingen.

## 1. Inventaris (spreadsheet)

Maak één **Google Sheet / Excel** met kolommen:

| Kolom | Voorbeeld | Toelichting |
|-------|-----------|-------------|
| `id` | GK_042 | Uniek, blijft gelijk NL/EN |
| `bron` | Word-bestand / map | Waar staat de kaart nu? |
| `titel_nl` | De roddelende vriend | |
| `verhaal_nl` | … | Max. **150 woorden** |
| `titel_en` | The gossiping friend | Later vertalen |
| `verhaal_en` | … | Max. 150 woorden |
| `categorie` | dagelijks-leven | Zie lijst hieronder |
| `moeilijkheid` | 1 / 2 / 3 | ★ = complexiteit casus (1=micro, 2=meso, 3=macro) |
| `complexiteit` | micro / meso / macro | Optioneel; wordt afgeleid uit `moeilijkheid` als leeg |
| `taalniveau` | B1 / B2 / C1 | Leesniveau van de **casustekst** |
| `stap` | 1–5 | Modelstap (Zien t/m Volhouden) |
| `status` | concept / getest / aanbevolen | |
| `firefly_prompt` | cinematic, no text… | Engels, voor Adobe Firefly |
| `afbeelding` | /images/gesprekskaarten/GK_042.jpg | Na export |
| `woorden_nl` | =LEN formule | Controle ≤ 150 |
| `opmerking` | | Redactie-notities |

**Categorie-slugs** (vast):  
`dagelijks-leven` · `werk` · `duurzaamheid` · `diversiteit-inclusie` · `social-media` · `studentenleven` · `zorg` · `onderwijs` · `overheid`

## 2. Werkwijze in drie rondes (niet alles tegelijk)

### Rond 1 — Sorteren (1–2 dagen)
- Alle ~100 kaarten in spreadsheet
- **Categorie** + **moeilijkheid (1–3)** + **modelstap** invullen
- Nog geen tekstwijzigingen — alleen indelen

**Sterren-richtlijn:**
- ★ — herkenbaar, weinig stakeholders, duidelijke keuze
- ★★ — meerdere belangen, beroepscontext
- ★★★ — systeem/hiërarchie/wetgeving/meerdere waarden botsen

### Rond 2 — Tekst (batchgewijs)
- Per batch van **10–15 kaarten**:
  1. Verhaal inkorten tot **max. 150 woorden**
  2. Eén duidelijk dilemma, geen moraliserende slotzin
  3. Vaste reflectievragen blijven (staan al in de app)
- Laat `woorden_nl` / `woorden_en` in spreadsheet bijhouden
- **Tip:** geef Claude/GPT per batch: titel + ruwe tekst + “max 150 woorden, neutraal, geen oplossing”

### Rond 3 — Beeld (Firefly)
- Per kaart één **`firefly_prompt`** (Engels):
  - Photo / cinematic, geen tekst, geen gezichten herkenbaar indien gewenst
  - Sfeer van de setting, niet het dilemma letterlijk
- Export JPEG → `public/images/gesprekskaarten/{id}.jpg`
- Vul pad in spreadsheet + in `cards.json` → `assets.afbeelding`

**Firefly-instellingen:** Photo, 16:9, geen tekst/watermerk (zelfde lijn als Ethos Studio).

## 3. Technisch: kaart toevoegen

Elke kaart = één object in `src/data/gesprekskaarten/cards.json`:

```json
{
  "id": "GK_042",
  "set": "morele-moed",
  "stap": 4,
  "categorie": "werk",
  "moeilijkheid": 2,
  "complexiteit": "meso",
  "taalniveau": "B2",
  "status": "getest",
  "nl": { "titel": "...", "verhaal": "...", "vraag1": "...", "vraag2": "..." },
  "en": { "titel": "...", "verhaal": "...", "vraag1": "...", "vraag2": "..." },
  "assets": {
    "afbeelding": "/images/gesprekskaarten/GK_042.jpg",
    "fireflyPrompt": "...",
    "pdfNl": null,
    "pdfEn": null
  },
  "meta": { "woordenNl": 128, "woordenEn": 132 }
}
```

Daarna:
```bash
npm run cards:normalize   # complexiteit ↔ moeilijkheid sync
npm run cards:catalog     # public/data/gesprekskaarten/catalog.json
npm run build
```

### Ethos Studio → community

Exporteer JSON uit Ethos Studio (één kaart of batch). Preview:
```bash
npm run cards:import-ethos -- --input ./ethos-export.json --id GK_042 --categorie werk --stap 4 --lang nl
```

Toevoegen aan `cards.json`:
```bash
npm run cards:import-ethos -- --input ./ethos-export.json --id GK_042 --categorie werk --append
```

Ethos-velden: `title`, `story`, `complexity` (micro/meso/macro), `image_prompt`, `values`, `facilitator_tip`. Firefly-prompt krijgt automatisch de vaste stijlzin uit de Conversation Card Generator-specificatie.

## 4. Hulp van AI (efficiënt)

| Taak | Aanpak |
|------|--------|
| Categoriseren + sterren | Batch van 20 titels + korte samenvatting → laat AI voorstel doen, jij corrigeert |
| Inkorten 150 woorden | Per kaart of batch van 5 |
| EN vertaling | Pas **na** definitieve NL-tekst |
| Firefly-prompt | Per kaart: “moral dilemma setting, [sector], cinematic, no text” |

**Ethos Studio** kan nieuwe kaarten genereren (Stamkaart v2.0) — gebruik dat als **maker**, daarna handmatig in spreadsheet/`cards.json` zetten na review.

## 5. Volgorde van ~100 kaarten

1. Spreadsheet klaar  
2. Rond 1: alle metadata  
3. Rond 2: tekst NL (prioriteit)  
4. Rond 3: Firefly + export afbeeldingen  
5. Rond 4: vertaling EN  
6. Import batches van 25 → `cards.json` → test op `/gesprekskaarten`  
7. Optioneel: batch-PDF per set (Word/InDesign), niet via browser

## 6. Kwaliteitscheck vóór live

- [ ] Verhaal ≤ 150 woorden (NL + EN)  
- [ ] Categorie + sterren + taalniveau ingevuld  
- [ ] Afbeelding aanwezig of bewust placeholder  
- [ ] ID uniek, NL/EN dezelfde `id`  
- [ ] `npm run build` slaagt  
- [ ] Filters op site getest  

---

*Structuur live sinds juni 2026 — 15 teaserkaarten gemigreerd naar `cards.json`.*
