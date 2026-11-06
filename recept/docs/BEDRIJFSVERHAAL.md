# Bedrijfsverhaal — worstenbroodje en Van Gorp Machinebouw (6 november 2026)

Besluit Richard (5 november 2026): product **worstenbroodje**; tijdlijn **Van Gorp Machinebouw B.V.** (2009) → **Van Gorp Drones B.V.** (rond 2020) → **Van Gorp Groep** (2036); intro A4: blok **HOE HET ZO VER KWAM** (letterlijke tekst in `data/episodes/overstapUitlegA4.ts`).

## Inventarisatie → nieuwe tekst (belangrijkste plekken)

| Bestand | Was (kort) | Wordt |
| --- | --- | --- |
| `content/intros.nl.ts` (A1 geschiedenis) | hete olie, paneermeel | warm deeg, deeg |
| `content/intros.nl.ts` (A2 geschiedenis) | alleen hal | + eigen werkplaats naast de hal |
| `content/intros.nl.ts` (A2 uitdagingen) | hele kroket | heel worstenbroodje |
| `content/intros.nl.ts` (A3 geschiedenis) | — | + alinea Van Gorp Machinebouw B.V. |
| `content/intros.nl.ts` (A5 opdracht) | MT van de holding | MT van Van Gorp Groep |
| `src/screens/HomeScreen.tsx` | krokettenfabriek | worstenbroodjesfabriek |
| `data/gesprekskaarten.ts` (A1) | kratten kroketten | kratten worstenbroodjes |
| `data/episodes/tijdgeest.ts` (rekwisiet 1984) | kratten kroketten | kratten worstenbroodjes |
| `data/skeleton/coldOpen.ts` (A1 slot) | olie en nat gras | warm deeg en nat gras |
| `data/skeleton/coldOpen.ts` (A2 titelregel) | hele kroket | heel worstenbroodje |
| `data/episodes/coldOpenEp1.ts` (Gerrit) | kroketten / sneller | worstenbroodjes / sneller klaar |
| `data/skeleton/film.ts` (A3 slot) | één sub | + tweede sub Defensie 2020 / Machinebouw |
| `data/interventies-a5.ts` (echo) | hele conglomeraat | hele Van Gorp Groep |
| `data/beeldenCheck.ts` (I5) | conglomeraat in stereotypencheck | Van Gorp Groep |
| `data/episodes/content.ts` | — | veld `overstapUitleg` + `OVERSTAP_UITLEG_A4` |
| `src/screens/phases/IntroPhase.tsx` | — | `<h4>HOE HET ZO VER KWAM</h4>` na UITDAGINGEN (A4 r1) |
| `CURSOR-PROMPT.md` | kroketten, conglomeraat, holding-app | worstenbroodjes, Van Gorp Groep |
| `docs/serieconcept.md` | kroketten, conglomeraat, frituurhal | worstenbroodjes, Van Gorp Groep, bakstraat |
| `docs/introteksten.md` | olie, paneermeel, kroket | warm deeg, deeg, worstenbroodje + Machinebouw A3 + verwijzing overstap A4 |
| `docs/TIJDGEEST.md` | kroketten, croquettes | worstenbroodjes, sausage rolls in prompt EN § Bedrijfsnamen |
| `docs/TAALGIDS.md` | — | §7 Bedrijfsnamen en tijdlijn |
| `docs/PORTRETTEN-PROMPTS.md` | paneermeel | bloem en deegresten |
| `docs/dronefabriek-deel1.md` | krokettenfabriek, frituur | worstenbroodjesfabriek, ovens/bakstraat |
| `docs/spelmotor.md` | krokettenploeg | worstenbroodjesploeg |
| `docs/morele-dilemmas.md` | conglomeraat | Van Gorp Groep |
| Diverse `docs/prompts/*`, `docs/claude-outputs/*` | kroket / kroketten | worstenbroodje(s) (geen `_archief` gewijzigd) |

**Ongewijzigd bewust:** `data/rounds.ts` en engine golden snapshots (demo A4).

## Herschreven grap / woordspeling

- **Gerrit (A1 cold open, r1):** was „Van harder *lopen* worden *kroketten* echt niet *sneller*” (loop-tempo vs frituur). Nu: „Van harder lopen worden **worstenbroodjes** echt niet **sneller klaar**, Harrie.” (loop-tempo vs **bakken**/rijpings-tempo).

## Overgang A3 → A4

- **Bestaat:** slotfilm A3 (`SKELETON_SLOTS[3]`) had één ondertitelregel.
- **Toegevoegd:** tweede `sub`-cue: „Rond 2020 zoekt Defensie productiecapaciteit voor drones. Van Gorp Machinebouw krijgt de order.” Duur slotscript 10s → 11s, laatste cue `boom` naar 9200 ms.

## Tests

- `engine/__tests__/worstenbroodjeCopy.test.ts`: scan `src/`, `data/`, `themes/` op `kroket`, `paneer`, `frituur`; asserts A4 `overstapUitleg` + A3 geschiedenis.
- `landingIntro.test.tsx`, `episodeContent.test.ts`: verwachte strings bijgewerkt.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
