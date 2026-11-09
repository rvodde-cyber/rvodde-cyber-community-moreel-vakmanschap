# Onderstroom in cold opens (Recept)

**Doel:** Tussen de gesproken regels van de cold open verschijnen korte, stiekeme berichten tussen familieleden — alsof ze appen onder de vergadertafel. De speler (de jongere zus) **leest alleen mee**; zij zit niet in die gesprekken. Wat hardop wordt gezegd versus wat onder tafel wordt gezegd voedt de nabespreking.

## Kanalen per tijdperk

| Jaar | Aflevering | Kanaal | Beeld |
| --- | --- | --- | --- |
| 1984 | A1 | **kantlijn** | Kasboekmarge; potlood (Lies), blokletters (Gerrit) |
| 1996 | A2 | **plakbriefje** | Gele plakbriefjes, handschrift, lichte scheefstand |
| 2009 | A3 | **sms** | Telefoonscherm 2009, korte regels |
| 2026 | A4 | **app** | Moderne chat (alleen achter vlag; demo A4 standaard uit) |
| 2036 | A5 | **lens** | Netvliesprojectie: doorschijnend glas, geen telefoon of toetsenbord; label **「Privé · buiten het bedrijfsplatform」** |

Skins: `src/components/Onderstroom.tsx` (cold open) en `LensDilemmaPanel.tsx` (privédilemma A5).

## Datamodel

- Gesproken/titelregels blijven in `ColdOpenDef.lines` als `[spreker, tekst]` (golden-referentie).
- Onderstroom: optioneel `onderstroom[]` met per invoeging:
  - `afterIndex` — invoegen **na** die regel in `lines`
  - `kanaal`, `van`, `naar?`, `tekst`
  - `doorgehaald?` — tekst blijft half leesbaar, doorgehaald in UI en a11y
  - `typIndicator?` — eerst 「… is aan het typen」, daarna verdwijnt het bericht zonder te verzenden
- Samengevoegde afspeellijst: `buildColdTimeline(def, onderstroomActief)` in `data/episodes/coldOpenTimeline.ts`.

## Vlag `onderstroomActief`

In `EpisodeContent` per aflevering. **A1, A2, A3, A5: aan.** **A4 (demo): uit** — cold open blijft identiek aan de golden-referentie; onderstroom-data ligt wel in `data/coldOpen.ts` maar wordt niet uitgevouwen.

## Gedrag en toegankelijkheid

- Cold open loopt automatisch door (geen extra klikken); onderstroom fade-in ±300 ms; typ-indicator ±1,5 s; berichten blijven in beeld tot het einde van de cold open (behalve typIndicator).
- `prefers-reduced-motion`: geen fade-animatie, direct zichtbaar.
- Schermlezer per regel: `Hardop, [naam]` of `Onderstroom, [van] aan [naar], [kanaal]`; doorgehaald: `doorgehaald: …`; typ: `[naam] begint een bericht en wist het` — zie `src/game/coldOpenA11y.ts`.
- Contrast minimaal 4,5:1 (ook op glas).

## Taal

Volg `docs/TAALGIDS.md` register per aflevering. Onderstroom is kort en menselijk; geen emoji in sms; 2036 afstandelijk behalve Anne-Fleur (warm, geen jargon).

## Nabesprekingsvragen (suggestie)

1. Wat werd **hardop** gezegd en wat alleen **onder tafel**?
2. Wie zat er **niet** aan tafel?
3. Waar kun je nog iets zeggen **zonder dat het wordt meegelezen**?

## Technisch

- UI: `ColdPhase.tsx` + stack `Onderstroom`
- Tests: `engine/__tests__/coldOpenOnderstroom.test.ts`, `coldOpenFlow.test.ts`
