# Stap flow-onderzoek — aflevering 1 (5 november 2026)

Doel: hapering en overmatig klikken in de speelflow; A4/golden ongewijzigd.

## Oorzaak hapering (opgelost)

| Probleem | Locatie | Fix |
| --- | --- | --- |
| Cold open stopte bij regel 5 | `gameReducer` `COLD_NEXT` met vaste `max = 4` | Grens uit register: `canColdNext()` / `coldOpenMaxSub()` in `data/episodes/coldOpenFlow.ts` |
| A1 r1 heeft 8 regels (index 0–7), r2 heeft 5 regels (0–4) | `COLD_OPEN_EP1` | Zelfde fix; geen wijziging aan cold-openteksten |

## Faseovergangen aflevering 1 (reducer)

| Fase | Uitgang | Actie | Opmerking |
| --- | --- | --- | --- |
| intro | cold | `SET_PHASE` | 1× Verder (bewust leesmoment) |
| cold (trailer) | cold (scène) | `PLAY_FILM` → `END_FILM` of `TRAILER_DONE` | Trailer eindigt automatisch met `END_FILM`; geen extra klik |
| cold (scène) | onderzoek | auto `COLD_NEXT` + 1× Start MT-overleg | Geen klik per regel meer |
| onderzoek | besluit | `SET_PHASE` / flow UI | Ongewijzigd |
| besluit | scan/uitkomst | `CONFIRM_BESLUIT` | Ongewijzigd |
| uitkomst | film | `PLAY_FILM` slot | Bewuste klik slot |
| film slot-r1 | tussen | `END_FILM` | Automatisch einde film |
| tussen | intro r2 | `START_ROUND_2` | 1× CTA pauzekaart |
| intro r2 | cold r2 | `SET_PHASE` | Kort leesmoment briefje — behouden |
| … r2 | voorspel | `END_FILM` finale | Automatisch einde film |
| voorspel | nabespreking | keuze + knop | Voorspelling = keuzemoment |

Geen blokkades gevonden: elke film (`trailer-r1`, `slot-r1`, `finale`) heeft een `END_FILM`-pad; skelet-stub voor A2/A3/A5 ongewijzigd.

## Verplichte klikken vóór / na (A1, ronde 1 tot MT-overleg)

| Moment | Vóór (nov) | Na (nov) |
| --- | --- | --- |
| Intro → cold | 1 | 1 |
| Trailer starten | 1 | 1 |
| Cold open (8 regels) | 7× Verder + laatste knop | 0 (auto) + 1× Start MT-overleg |
| **Totaal intro → onderzoek** | **~10** | **3** |

Optioneel: Overslaan, Naar de scène (trailer), Pauze — niet meegeteld als verplicht.

## Overige fasen A1 (stap 4)

| Fase | Aanpassing | Reden |
| --- | --- | --- |
| TussenPhase | Geen | Eén pauzekaart-CTA + tafelvragen = leesmoment |
| UitkomstPhase | Geen | Slotfilm-knop + dilemma/keuzes elders |
| VoorspelPhase | Geen | Voorspelling + tafelvragen |
| IntroPhase r2 | Geen | Tekst over briefje — leesmoment |

## Teksten

- Generieke „Stap 1 van 4…” vervangen door `coldOpenCopy.ts` (trailer + scène).
- „Beslistijd tien minuten” alleen als `usesBeslistijdTimer(episode)` (interventie + A4).

## Tests

`engine/__tests__/coldOpenFlow.test.ts` — registergrenzen, leestijd, auto-gate, 3 klikken, A1 `END_FILM`-paden.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
