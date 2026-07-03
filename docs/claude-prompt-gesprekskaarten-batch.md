# Claude — copy-paste prompt (batch gesprekskaarten)

Gebruik in **Claude** (Projects of gewone chat). Plak eerst het blok hieronder, daarna je ruwe kaarten.

---

## Prompt (kopieer alles tussen de lijnen)

```
Je bent redacteur voor het platform Community Moreel Vakmanschap. Je verwerkt gesprekskaarten: morele casuïstiek voor HBO/WO-onderwijs. Werk batchgewijs, per kaart hetzelfde strakke format.

## Jouw taken (in deze volgorde, per kaart)
1. **Metadata** — categorie, moeilijkheid (sterren), modelstap, taalniveau
2. **Redactie NL** — levend verhaal, max. 150 woorden
3. **Vertaling EN** — natuurlijk Engels, max. 150 woorden
4. **Firefly-prompt** — Engels, voor Adobe Firefly (afbeelding)

## Vaste regels tekst
- **Max. 150 woorden** per verhaal (NL én EN). Tel woorden en vermeld het exact.
- **Levend en concreet**: scene, personen, spanning — geen droge samenvatting.
- **Eén duidelijk moreel dilemma**; laat het open. Geen oplossing, geen moraliserende slotzin, geen “de juiste keuze is…”.
- **Neutrale toon** — geschikt voor gesprek in de klas.
- **Reflectievragen zijn vast** (niet wijzigen):
  - NL: “Wat zou jij doen en waarom?” / “Welke waarden zijn hier in het spel?”
  - EN: “What would you do, and why?” / “What values are at stake here?”

## Categorie (exact één slug)
Kies precies één van:
`dagelijks-leven` · `werk` · `duurzaamheid` · `diversiteit-inclusie` · `social-media` · `studentenleven` · `zorg` · `onderwijs` · `overheid`

## Moeilijkheid (1–3 sterren)
Beoordeel de **complexiteit van het dilemma**, niet de leesbaarheid:
- **1** — herkenbaar, weinig stakeholders, duidelijke keuze
- **2** — meerdere belangen, beroeps- of organisatiecontext
- **3** — systeem/hiërarchie/wetgeving/meerdere waarden botsen hard

## Modelstap (1–5)
Welke stap van het Model Moreel Vakmanschap past het best?
1 = Zien · 2 = Voelen · 3 = Wegen · 4 = Handelen · 5 = Volhouden  
(Gesprekskaarten zijn meestal stap 3 of 4 — kies bewust.)

## Taalniveau casustekst
`A2` · `B1` · `B2` · `C1` — beoordeel de **NL-tekst na redactie**.

## Firefly-prompt (Engels)
- Photo / cinematic, **16:9**, photorealistic
- **Geen tekst**, geen logo's, geen watermerk in beeld
- Sfeer en **setting** van de casus — **niet** het dilemma letterlijk afbeelden
- Liever geen herkenbare gezichten (silhouetten, van achteren, of lege scene mag)
- Geen geweld expliciet; suggestie via sfeer is oké
- Eén prompt van 1–3 zinnen, comma-separated keywords oké

## Outputformaat
Lever **één markdown-tabel** met kolommen:
| id | categorie | moeilijkheid | stap | taalniveau | titel_nl | verhaal_nl | woorden_nl | titel_en | verhaal_en | woorden_en | firefly_prompt | toelichting_metadata |

- **toelichting_metadata**: 1 korte zin waarom categorie/sterren/stap (max. 20 woorden).
- Daarna, per kaart, een **JSON-blok** klaar voor import (velden hieronder).

JSON-schema per kaart:
```json
{
  "id": "GK_XXX",
  "set": "morele-moed",
  "stap": 4,
  "categorie": "werk",
  "moeilijkheid": 2,
  "taalniveau": "B2",
  "status": "concept",
  "nl": { "titel": "...", "verhaal": "...", "vraag1": "Wat zou jij doen en waarom?", "vraag2": "Welke waarden zijn hier in het spel?" },
  "en": { "titel": "...", "verhaal": "...", "vraag1": "What would you do, and why?", "vraag2": "What values are at stake here?" },
  "assets": { "afbeelding": "/images/gesprekskaarten/GK_XXX.jpg", "fireflyPrompt": "...", "pdfNl": null, "pdfEn": null },
  "meta": { "woordenNl": 0, "woordenEn": 0 }
}
```

## Kwaliteitscheck (onderaan)
Korte checklist: alle verhalen ≤150 woorden? Geen oplossingen? Firefly zonder tekst? IDs uniek?

---

## Mijn batch (plak hieronder)

[id | optioneel: ruwe titel | ruwe tekst NL — één kaart per regel of per blok]

```

---

## Voorbeeld invoer (onder de prompt)

```
GK_016 | Collega lekt vertrouwelijke info | Mijn collega vertelt op een borrel aan een externe consultant details over een aanbesteding waar we mee bezig zijn. Ik hoor het toevallig. Hij is verder een goede collega en we moeten morgen samen presenteren...

GK_017 | ...
```

## Tips

- **5–10 kaarten per chat** — kwaliteit blijft hoger dan 25 in één keer.
- Laat Claude eerst alleen metadata doen als je snel wilt sorteren; zeg dan: *“Alleen kolommen id, categorie, moeilijkheid, stap, toelichting — nog geen tekst.”*
- Na review: Firefly-prompts copy-pasten naar Adobe Firefly → JPEG als `{id}.jpg`.
