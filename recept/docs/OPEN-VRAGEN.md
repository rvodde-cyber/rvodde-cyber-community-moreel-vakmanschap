# Open vragen en aanleveringen

Laatste update: **29 oktober 2026** (prompt Piotr-lijn + demo-link). Zie `docs/VOORSTELLEN-RECEPT-29-10-2026.md` §8.

## Wat Cursor niet kon / Richard moet doen

| Onderwerp | Status |
| --- | --- |
| **Live deploy** | https://recept-k8m3n7p2.netlify.app/ (29 okt, deploy `6ae314145ef87064a75debcb`). |
| **Wachtwoord op URL** | Netlify Site Protection is betaald; niet geconfigureerd. Toegang via niet-raadbare URL only. |
| **Scèneteksten definitief** | Alle Piotr-scènes staan op `concept` in `data/piotr-lijn.ts`; studenten zien fallback. Richard akkoord → `definitief`. |
| **Variant slotscène `variantZonderContract`** | Veld `leeg`; vertakking afhankelijk van MT-contract ronde 2 moet Richard bevestigen (voorstel §2 opmerking). |
| **Interventie Piotr in dienst** | `interventieDefinitief: false` in `data/ep4Interventies.ts` tot Richard akkoord. |
| **Nabespreking studenten** | 12 vragen + Veilig gesprek ingelezen als `concept`; studenten zien pas vragen bij `definitief`. |
| **Beelden** | Geen enkel beeld met akkoord Richard; app toont silhouet/placeholder — zie `docs/BEELDEN-CHECK.md`. |
| **Sanne standaardvariant** | Data bevat A én B; standaard A (SANNE-UITWERKING). Richard kiest definitieve variant. |
| **Greiner A4** | Concept bureaucratie in slot; demo in spel kan nog leiderschap/autonomie tonen — Richard besluit sync met serie. |
| **Privébericht toon** | Voorstel gebruikt "u"; open vraag informeel "jij" (voorstel §8.4). |
| **Meelezen migratieachtergrond** | Procesvraag Richard (voorstel §8.5). |
| **Interventies skelet 1/2/3/5** | 16 items in `data/interventies-skelet.ts`, niet aan spelmotor gekoppeld. Richard schrapt/toevoegt (§8.6). |

## Inhoud al ingelezen (concept, niet definitief)

- Piotr-scènes §2 → `data/piotr-lijn.ts`
- Sanne §3 + SANNE-UITWERKING → `sanneReactieEp4`
- Greiner §4 → `greinerCrisisEp4`
- Nabespreking §5 → `data/nabespreking-ep4.ts` + `VEILIG_GESPREK_EP4`
- Interventies §7 → `data/interventies-skelet.ts`

## Media

- 8 portretten → `public/portretten/` (`PORTRETTEN-PROMPTS.md`)
- Beeldbank I1–I5 → `public/beelden/`

## Technisch

- Golden-suite zevendeling `spelmotor.md` (nu 18 tests waarvan 4 golden ronde 1)
- Multiplayer/regiekamer: bewust niet v1
