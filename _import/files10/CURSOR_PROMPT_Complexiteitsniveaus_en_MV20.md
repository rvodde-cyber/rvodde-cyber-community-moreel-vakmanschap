# CURSOR-PROMPT — Complexiteitsniveaus (micro/meso/macro) + MV_20 KNMG-Dilemmamethode

**Project:** Community Moreel Vakmanschap
**Datum:** 3 juli 2026
**Scope:** drie samenhangende toevoegingen, in één sessie te bouwen

---

## ONDERDEEL A — Theorieblok op de Wegen-pagina

**Doel:** de Wegen-pagina (Stap 3, roze `#993556`) krijgt een compact theorieblok dat de micro/meso/macro-indeling van dilemma's uitlegt, naast de bestaande Rest/Karssing/Biesta-fundamenten.

**Plaatsing:** direct onder de bestaande theorie-sectie van de Wegen-pagina, vóór de bibliotheek/werkbladen-lijst.

**Component:** `ComplexiteitsniveausBlok.jsx` (of vergelijkbare naamgeving passend bij bestaande componentstructuur)

**Inhoud NL:**

```
Titel: Drie niveaus van complexiteit
Intro: Niet elk dilemma weegt even zwaar. Om dilemma's — en de
gesprekskaarten die ze oproepen — gestructureerd te kunnen duiden,
onderscheiden we drie niveaus:

★ Micro — directe, persoonlijke keuze
Een conflict tussen twee waarden op individueel niveau. Direct
overzichtelijke gevolgen.
Voorbeeld: een collega maakt een fout — meld je dit, of bespreek je
het onder vier ogen?

★★ Meso — organisatorisch dilemma
Spanning tussen persoonlijke waarden en de regels, cultuur of
belangen van een organisatie. Meerdere stakeholders, tegenstrijdige
belangen.
Voorbeeld: bezuiniging op zorgtijd — houd je je aan het protocol, of
blijf je langer voor noodzakelijke aandacht?

★★★ Macro — systemisch dilemma
Wetgeving, politiek, cultuur en mensenrechten kruisen elkaar. Geen
eenduidig goed antwoord, gevolgen zijn onzeker of onomkeerbaar.
Voorbeeld: de inzet en regulering van AI binnen organisaties.

Bron: dr. Kim Meijer (HAN, klankbordgroep dit project), proefschrift
"Impossible and Inevitable" (Tilburg University) — over hoe
organisaties complexe meso- en macro-dilemma's te snel proberen te
vangen in platte regels, terwijl morele professionaliteit vraagt om
het uithouden van die complexiteit.
```

**Inhoud EN:**

```
Title: Three levels of complexity
Intro: Not every dilemma carries the same weight. To structure how
we read dilemmas — and the conversation cards that raise them — we
distinguish three levels:

★ Micro — direct, personal choice
A conflict between two values at the individual level. Consequences
are directly visible.
Example: a colleague makes a mistake — do you report it, or address
it privately?

★★ Meso — organisational dilemma
Tension between personal values and the rules, culture or interests
of an organisation. Multiple stakeholders, conflicting interests.
Example: budget cuts reduce time per patient — do you follow
protocol, or stay longer for necessary care?

★★★ Macro — systemic dilemma
Legislation, politics, culture and human rights intersect. There is
no single right answer; consequences are uncertain or irreversible.
Example: the deployment and regulation of AI within organisations.

Source: dr. Kim Meijer (HAN, this project's advisory group), doctoral
thesis "Impossible and Inevitable" (Tilburg University) — on how
organisations tend to flatten complex meso- and macro-dilemmas into
simple rules, while genuine moral professionalism requires enduring
that complexity.
```

**Styling:**
- Gebruik bestaande TaalContext voor NL/EN-switch (geen nieuwe i18n-structuur)
- Kader/card met linkerrand `border-left: 4px solid #993556`
- Sterren-iconen in `#993556`, gevuld (niet decoratief geel/goud — geen gamification-signaal)
- Bronvermelding onderaan in kleinere, secundaire tekstkleur `#5f5e5a`, cursief
- Typografie: titel Cormorant Garamond, body DM Sans (consistent met bestaand design system)

---

## ONDERDEEL B — Sterrensysteem voor gesprekskaarten

**Doel:** elke gesprekskaart en elk werkblad krijgt een complexiteitsniveau (1–3 sterren) als filterbaar metadata-veld, náást de bestaande domein-tags uit Fase 2 van het stappenplan.

### B1. Data-structuur (`bibliotheekData.js`)

Voeg aan elk item-object een veld toe:

```js
{
  id: "mv_20",
  // ...bestaande velden (titel, stap, bestand_nl, bestand_en, domein, etc.)
  complexiteit: 2,        // 1 = micro, 2 = meso, 3 = macro
  complexiteitLabel: {
    nl: "Meso — organisatorisch dilemma",
    en: "Meso — organisational dilemma"
  }
}
```

Loop na toevoeging éénmalig door alle bestaande items (MV_01 t/m MV_19) en ken een niveau toe. Voorstel als startpunt (pas gerust aan op inhoudelijke gronden):

| Werkblad | Niveau | Toelichting |
|---|---|---|
| MV_01–11 (Zien) | 1 (micro) | gericht op individuele waarneming |
| MV_12–17 (Wegen) | 2 (meso) | organisatorische afwegingen |
| MV_18 Moral Crossroads | 3 (macro) | systemisch, geen eenduidig antwoord |
| MV_19 Terugkeren/Returning | 2 (meso) | procesmatige heroverweging |
| MV_20 KNMG-Dilemmamethode | 2 (meso) | methode zelf is niveau-onafhankelijk; default meso, gebruiker bepaalt niveau in stap "Voorbereiding" |

### B2. UI-component: `ComplexiteitsSterren.jsx`

```jsx
// Props: { niveau: 1 | 2 | 3, label?: string, size?: 'sm' | 'md' }
// Rendert 3 ster-iconen, waarvan {niveau} gevuld in #993556 en de rest
// leeg/outline in #d3d1c7.
// Bij hover/tap op de sterren: tooltip met complexiteitLabel (NL/EN via
// TaalContext) — zelfde tooltip-patroon als bestaande hover/tap-tooltips
// in het cirkelmodel.
// GEEN animatie van "verdienen" of "unlocken" — puur statische indicator,
// geen gamification-signalen (geen confetti, geen progress-bar, geen
// badge-stijl kader).
```

Plaats dit component:
- Op elke werkbladkaart in de bibliotheek, rechtsboven naast de stap-kleurbadge
- Op de detailweergave/preview van een werkblad (indien aanwezig)

### B3. Filter op complexiteitsniveau

Voeg naast de bestaande domein-tag-filter (Fase 2 stappenplan) een filterrij toe:

```
Alle niveaus | ★ Micro | ★★ Meso | ★★★ Macro
```

Filterlogica combineert met bestaande stap-filter en domein-tag-filter (AND, niet OR) — consistent met de al aanwezige filterstructuur op de bibliotheekpagina.

---

## ONDERDEEL C — MV_20 registreren: KNMG-Dilemmamethode

**Bestanden** (bijgevoegd, plaats in de repo):
- `public/downloads/wegen/MV_20_KNMG_Dilemmamethode_NL.docx`
- `public/downloads/wegen/MV_20_KNMG_Dilemma_Method_EN.docx`

**Toevoegen aan `bibliotheekData.js`:**

```js
{
  id: "mv_20",
  nummer: 20,
  stap: "wegen",
  titel: {
    nl: "KNMG-Dilemmamethode",
    en: "The KNMG Dilemma Method"
  },
  ondertitel: {
    nl: "Een dilemma stap voor stap ontleden",
    en: "Taking a dilemma apart, step by step"
  },
  beschrijving: {
    nl: "Zes stappen om een dilemma systematisch te ontleden: feiten, betrokkenen, opties en vier ethische principes — inclusief bepaling van het complexiteitsniveau vooraf.",
    en: "Six steps to systematically take a dilemma apart: facts, stakeholders, options and four ethical principles — including determining the complexity level up front."
  },
  bestand_nl: "/downloads/wegen/MV_20_KNMG_Dilemmamethode_NL.docx",
  bestand_en: "/downloads/wegen/MV_20_KNMG_Dilemma_Method_EN.docx",
  duur: "45–60 min",
  groepsgrootte: "2–6",
  complexiteit: 2,
  complexiteitLabel: {
    nl: "Meso — niveau wordt in de opdracht zelf bepaald",
    en: "Meso — level is determined within the exercise itself"
  },
  combineerMet: ["moreel_beraad", "vertrouwenspiegel", "mv_18"],
  domein: ["algemeen", "methodiek"]
}
```

**"Combineer met →" koppelingen** (conform het al geplande cross-step feature uit "NU METEEN"):
- Vanaf MV_20 → Moreel Beraad, Vertrouwenspiegel, MV_18 Moral Crossroads
- Vanaf het nieuwe theorieblok (Onderdeel A) → directe link/scroll naar MV_20 als praktische toepassing van de theorie

---

## ACCEPTATIECRITERIA

- [ ] Theorieblok zichtbaar op Wegen-pagina, volledig tweetalig via TaalContext, geen nieuwe taalstructuur naast bestaande
- [ ] Bronvermelding Kim Meijer / Tilburg University zichtbaar en correct
- [ ] Sterrensysteem werkt op alle bestaande werkbladen (MV_01–19) + MV_20, met tooltip in juiste taal
- [ ] Filter op complexiteitsniveau werkt in combinatie met bestaande stap- en domeinfilters
- [ ] MV_20 downloadbaar in beide talen vanaf de bibliotheekpagina onder Wegen
- [ ] Geen gamification-elementen toegevoegd (geen progress bars, badges, unlockable states) — sterren zijn puur informatief
- [ ] Bestaande styling (kleuren, fonts, spacing) van de rest van de site één-op-één toegepast, geen nieuwe kleuren geïntroduceerd

---

*Community Moreel Vakmanschap · Lectoraat Ethisch Werken, Fontys Hogescholen*
