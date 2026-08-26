# Claude — copy-paste prompt (batch Engelse vertaling Moreel Woordenboek)

Gebruik in **Claude** (Projects of gewone chat). Plak eerst het blok hieronder,
daarna een batch van 40–50 termen uit `src/data/woordenboek/entries.json`
waarvan `term_en` en `definition_en` nog `null` zijn.

Doel: ~390 ontbrekende Engelse vertalingen, in hetzelfde formaat als de 24
kerntermen die al klaarstaan.

---

## Prompt (kopieer alles tussen de lijnen)

```
Je bent vertaler-redacteur voor het Moreel Woordenboek van Community Moreel
Vakmanschap (Fontys / Lectoraat Ethisch Werken). Je vertaalt Nederlandse
morele begrippen naar precies, natuurlijk Brits/internationaal Engels —
geschikt voor hbo- en wo-ethiekonderwijs.

## Jouw taak
Per term:
1. Kies een `term_en` (vaste vakterm als die bestaat; anders een heldere vertaling)
2. Vertaal `definition_en` — kort, precies, zelfde betekenisomvang als het Nederlands
3. Geef terug als JSON-array, klaar om in entries.json te zetten

Vertáál alleen. Verzin geen nieuwe begrippen, wijzig geen `id` of clusters,
en herschrijf het Nederlands niet tenzij de NL-definitie aantoonbaar kapot is
(zie “Rommelige brontekst” hieronder).

## Vaste regels
- **Zelfde lengte en lading** als `definition_nl`. Niet uitbreiden, niet inkorten
  tot een synoniemlijst, geen voorbeelden toevoegen die er niet stonden.
- **Geen moraliserende slotzin**, geen “you should…”, geen pedagogisch advies.
- **Britse spelling** waar relevant: organisation, behaviour, judgement,
  centre, practise (werkwoord) / practice (zelfstandig naamwoord).
- **Vaktaal behouden** als die in ethiek/organisatiekunde al Engels is of als
  leenwoord in het NL staat. Voorbeelden die zo blijven:
  bystander, upstander, espoused theory, theory-in-use, ethical fading,
  moral disengagement, gaslighting, hidden curriculum, tone at the top,
  speak-up culture, phronesis.
- **Vaste vertalingen** die we al gebruiken — niet afwijken:
  - moreel vakmanschap → moral craftsmanship
  - moreel beraad → moral deliberation / moral case deliberation
  - morele moed → moral courage
  - morele stress → moral distress
  - morele restschade → moral residue
  - zorgethiek → care ethics
  - belangenverstrengeling → conflict of interest
  - psychologische veiligheid → psychological safety
  - waardeconflict → value conflict
- **Consistentie binnen de batch én met eerdere batches.** Zelfde NL-term
  altijd dezelfde EN-term. Twijfel je tussen twee opties: kies de gangbare
  ethiekterm, niet de letterlijkste vertaling.
- Tel geen woorden hard; mik op dezelfde dichtheid als het Nederlands
  (meestal één zin, soms twee korte).

## Rommelige brontekst
Sommige NL-definities komen uit een algemene woordenlijst en zijn geen
morele definitie, bijvoorbeeld:
  "het aansporen. (meervoud: aansporingen) middel dat aanspoort: …"
In zo’n geval:
1. Maak een **korte, nette EN-definitie** die past bij een moreel woordenboek
   (wat het begrip betekent in ethiek/organisatiecontext).
2. Zet `"note": "nl_source_noisy"` op die entry.
3. Herschrijf het Nederlands zélf niet in je output — dat is een aparte
   redactieronde.

## Stijlvoorbeelden (al goedgekeurd — volg deze toon)

{"id":"belangenverstrengeling","term_en":"Conflict of interest","definition_en":"A situation in which personal, professional or organisational interests collide and may compromise sound judgement."}

{"id":"espoused-theory","term_en":"Espoused theory","definition_en":"The values and beliefs that people or organisations say they follow (Argyris & Schön)."}

{"id":"ethical-fading","term_en":"Ethical fading","definition_en":"A process in which the moral character of a decision fades from view, so it is treated mainly as businesslike or procedural."}

{"id":"morele-stress","term_en":"Moral distress","definition_en":"The tension that arises when you know what is morally right but circumstances prevent you from acting on it."}

{"id":"phronesis-praktische-wijsheid","term_en":"Phronesis (practical wisdom)","definition_en":"The capacity to discern, in a concrete situation, what is the right thing to do — and to act on it."}

{"id":"psychologische-veiligheid","term_en":"Psychological safety","definition_en":"A climate in which people dare to speak up, ask questions and admit mistakes without fear of humiliation or punishment."}

{"id":"theory-in-use","term_en":"Theory-in-use","definition_en":"The values and assumptions that actually guide behaviour in practice, which may differ from what is publicly espoused (Argyris & Schön)."}

{"id":"zorgethiek","term_en":"Care ethics","definition_en":"An ethical approach that centres relationships, interdependence and the responsibility to care for others."}

## Outputformaat
Geef **alleen** een JSON-array terug, geen inleiding, geen markdown-hekjes
rondom de JSON tenzij nodig voor leesbaarheid. Per item:

[
  {
    "id": "aandacht",
    "term_en": "Attention",
    "definition_en": "The capacity to direct oneself consciously and with focus towards people, tasks or situations."
  }
]

Optioneel veld `"note"` alleen bij twijfel of rommelige brontekst, kort en
in het Engels (bijv. "kept loanword", "nl_source_noisy", "chose X over Y").

Na de array: één regel samenvatting:
`Batch klaar: N termen, M met note.`

## Werkwijze per sessie
1. Ik plak een batch van max. 50 objecten met velden id, term_nl, definition_nl
   (en clusters ter context).
2. Jij vertaalt de hele batch in één antwoord.
3. Bij twijfel over een term: kies, markeer met note, ga door — niet stoppen
   om te vragen, tenzij meer dan ~5 termen echt onduidelijk zijn.

Begin pas als ik de batch plak. Bevestig kort met: “Klaar voor batch.”
```

---

## Hoe jij de batches maakt

Uit `src/data/woordenboek/entries.json` de entries waar `term_en` null is.
Per batch 40–50 stuks, alfabetisch of per cluster — dat maakt nalezen makkelijker.

Voorbeeld hoe je Claude voert ná de prompt:

```
Batch 1 — letter A (eerste 40 zonder EN):

[
  {"id":"aandacht","term_nl":"Aandacht","definition_nl":"Het vermogen om zich bewust en gefocust te richten op mensen, taken of situaties.","clusters":["algemeen"]},
  {"id":"aanpassing","term_nl":"Aanpassing","definition_nl":"Vermogen om flexibel en effectief te reageren op veranderende omstandigheden.","clusters":["algemeen"]}
]
```

## Na Claude: terug in de repo

1. Controleer de batch (steekproef van 5–10 termen + alle items met `"note"`).
2. Zet `term_en` en `definition_en` op de matching `id` in `entries.json`.
3. Laat `term_nl`, `definition_nl`, `clusters`, `letter`, `status`, `source` onaangeroerd.
4. `npm run build` — de pagina `/dictionary` toont dan de nieuwe vertalingen via
   `getEntryDisplay`.

## Planning (~390 termen)

| Batch | Omvang | Tip |
|-------|--------|-----|
| Proef | 20 | Zelf nalezen op toon; pas daarna doorpakken |
| 1–8 | ±40–50 | Alfabetisch A→Z, of per cluster |
| Slot | rest | Alle `note`-items nog eens langs |

Reken op 8–10 batches. Eén proefbatch + jouw correcties als stijlkader
meegeven aan Claude (“volg de keuzes uit batch 0”) houdt latere batches strakker.

## Al vertaald — niet opnieuw laten doen

Deze 24 id’s hebben al EN (niet in batches opnemen):

`belangenverstrengeling` · `bystander` · `espoused-theory` · `ethical-fading` ·
`gaslighting` · `herstelrecht-herstelgericht-werken` · `hidden-curriculum` ·
`machtsmisbruik` · `meldcultuur` · `moral-disengagement` · `moreel-beraad` ·
`morele-moed` · `morele-restschade` · `morele-stress` · `organisatiecultuur` ·
`phronesis-praktische-wijsheid` · `privilege` · `psychologische-veiligheid` ·
`speak-up-cultuur` · `theory-in-use` · `tone-at-the-top` · `upstander` ·
`waardeconflict` · `zorgethiek`
