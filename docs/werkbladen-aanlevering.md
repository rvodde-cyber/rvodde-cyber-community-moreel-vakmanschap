# Werkbladen aanleveren (MV_22 t/m MV_58)

Dit document beschrijft hoe nieuwe werkbladen in de bibliotheek worden toegevoegd. De data staat in `src/data/werkbladen.json`; bestaande materialen MV_01–MV_21 blijven in `src/data/bibliotheekData.js`.

## JSON-schema

Elk item in de array heeft deze velden:

| Veld | Type | Toegestane waarden / regels |
|------|------|-----------------------------|
| `id` | string | `^MV_\d{2}$`, uniek, niet al in `bibliotheekData.js` |
| `titel` | `{ nl, en? }` | Verplicht `nl`; lege `en` → EN-weergave valt terug op NL |
| `omschrijving` | `{ nl, en? }` | Zelfde fallback als titel |
| `themas` | `{ nl: string[], en? }` | Lege `en` → fallback op `nl` |
| `fasen` | string[] | 1–5 waarden uit: `zien`, `voelen`, `wegen`, `handelen`, `volhouden`. Eerste = hoofdfase (kleur kaart) |
| `opleidingsniveau` | string | Vrije tekst (bijv. `HBO`) |
| `vakgebied` | string | Vrije tekst (bijv. `HRM`) |
| `complexiteit` | string | `micro`, `meso` of `macro` |
| `duur` | string | Vrije tekst (bijv. `45 min`) |
| `groep` | string | Vrije tekst (bijv. `4–6 personen`) |
| `oorspronkelijke_werkvorm` | string | Naam van de onderliggende werkvorm |
| `bronnen_apa` | string[] | APA-bronnen; lege array geeft build-waarschuwing |
| `licentie` | string | Altijd `CC BY-NC-SA 4.0` |
| `naamsvermelding` | string | Standaard: Richard Voddé, Lectoraat Ethisch Werken, Fontys Hogescholen |
| `niveau` | string | `concept`, `getest` of `aanbevolen` |
| `bestanden` | object | `student_nl`, `docent_nl`, `student_en`, `docent_en` — bestandsnaam of `null` |
| `sfeerbeeld` | string \| null | Bestandsnaam JPG in `public/images/werkbladen/`, of `null` |

## Voorbeeld (twee items)

```json
[
  {
    "id": "MV_22",
    "titel": { "nl": "Voorbeeld NL", "en": "Example EN" },
    "omschrijving": { "nl": "Korte omschrijving.", "en": "" },
    "themas": { "nl": ["Ethiek", "HRM"], "en": [] },
    "fasen": ["wegen", "handelen"],
    "opleidingsniveau": "HBO",
    "vakgebied": "HRM",
    "complexiteit": "meso",
    "duur": "45 min",
    "groep": "4–6 personen",
    "oorspronkelijke_werkvorm": "Moreel beraad",
    "bronnen_apa": ["Molewijk, B. et al. (2008). …"],
    "licentie": "CC BY-NC-SA 4.0",
    "naamsvermelding": "Richard Voddé, Lectoraat Ethisch Werken, Fontys Hogescholen",
    "niveau": "concept",
    "bestanden": {
      "student_nl": "MV_22_Student_NL.docx",
      "docent_nl": "MV_22_Docent_NL.docx",
      "student_en": null,
      "docent_en": null
    },
    "sfeerbeeld": "MV_22.jpg"
  },
  {
    "id": "MV_23",
    "titel": { "nl": "Tweede werkblad", "en": "Second worksheet" },
    "omschrijving": { "nl": "…", "en": "…" },
    "themas": { "nl": ["Reflectie"], "en": ["Reflection"] },
    "fasen": ["zien"],
    "opleidingsniveau": "MBO",
    "vakgebied": "Zorg",
    "complexiteit": "micro",
    "duur": "30 min",
    "groep": "2–4 personen",
    "oorspronkelijke_werkvorm": "Johari-venster",
    "bronnen_apa": ["Luft, J. & Ingham, H. (1955). …"],
    "licentie": "CC BY-NC-SA 4.0",
    "naamsvermelding": "Richard Voddé, Lectoraat Ethisch Werken, Fontys Hogescholen",
    "niveau": "getest",
    "bestanden": {
      "student_nl": "MV_23_Student_NL.docx",
      "docent_nl": "MV_23_Docent_NL.docx",
      "student_en": "MV_23_Student_EN.docx",
      "docent_en": "MV_23_Docent_EN.docx"
    },
    "sfeerbeeld": null
  }
]
```

## Mapstructuur

```
public/downloads/werkbladen/{id}/MV_XX_Student_NL.docx
public/downloads/werkbladen/{id}/MV_XX_Docent_NL.docx
public/downloads/werkbladen/{id}/MV_XX_Student_EN.docx   (optioneel)
public/downloads/werkbladen/{id}/MV_XX_Docent_EN.docx    (optioneel)
public/images/werkbladen/MV_XX.jpg                       (optioneel)
```

## Bestandsnamen

- `MV_XX_Student_NL.docx`
- `MV_XX_Docent_NL.docx`
- `MV_XX_Student_EN.docx`
- `MV_XX_Docent_EN.docx`

Geen spaties of accenten in bestandsnamen. Maximaal 20 MB per bestand (waarschuwing boven 2 MB).

## Sfeerbeelden

- Formaat: JPG, 1600×900 (16:9)
- Kleinere dan 300 KB aanbevolen
- Bestandsnaam in JSON: bijv. `MV_22.jpg`
- Ontbreekt het beeld: fallback naar `/images/bibliotheek/stap-{hoofdfase}.jpg`

## Werkwijze

1. Bestanden en eventueel sfeerbeeld in de juiste mappen plaatsen.
2. Item(s) toevoegen aan `src/data/werkbladen.json`.
3. Lokaal: `npm run build` (voert `scripts/validate-werkbladen.mjs` uit).
4. Pull request naar `main`.

## Checklist

- [ ] `id` uniek en niet in gebruik in `bibliotheekData.js`
- [ ] Alle verplichte velden ingevuld, `licentie` = CC BY-NC-SA 4.0
- [ ] `fasen`, `complexiteit` en `niveau` geldig
- [ ] NL-bestanden aanwezig op schijf als niet `null`
- [ ] Bestandsnamen zonder spaties/accenten
- [ ] Sfeerbeeld JPG ≤ 300 KB (of bewust `null`)
- [ ] `npm run build` slaagt zonder validatorfouten
