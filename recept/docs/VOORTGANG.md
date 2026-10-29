# Voortgang Recept (Cursor-bouw)

Laatste update: **29 oktober 2026** — prompt Piotr-lijn + demo-link (A–G)

## Onderdeel A — Voorcontrole

**`git log --oneline origin/main..HEAD`:** leeg (main = origin). Relevante Recept-commits (17 stuks, chronologisch oud→nieuw):

| Commit | Omschrijving | Recept stap 2–5? |
| --- | --- | --- |
| 155969a | projectopzet, spelmotor, tests | ja |
| 0193fc2 | SessionAdapter, thema-types | ja |
| 8d548b7 | aflevering 4 ronde 1 | ja |
| 592dbec | Piotr-lijn docs | ja |
| 89f370b | glossarium, pauze, MT-belang | ja |
| 272e42c | groepsapp, dilemma Piotr, meters | ja |
| 2b34817 | trailer, slot, pauzekaart, ronde 2 | ja |
| f6eb8f2 | skelet afleveringen 1–3–5 | ja (§11) |
| b0cb786 | portretten, docent, nabespreking | ja (§11) |
| a286b2f | robots, Netlify, DEPLOY | ja |
| d134e70 | inhoudsslots, flags, beelden | ja |
| 46366d1 | a11y-instellingen, modals, tests | ja |
| ac495db | voortgang, open vragen | ja |
| f9f2f3e | DEPLOY commits ahead | ja |
| d2872f4 | Piotr-lijn data, statusmodel | ja |
| f94ad93 | voortgang prompt | ja |
| 0442815 | DEPLOY, QR-script | ja |

Geen vreemde commits in deze reeks.

- **`npm test`:** 18/18 groen (6 bestanden).
- **`npm run build`:** groen (validate + tsc + vite).
- **`git push`:** main was al gesynchroniseerd; nieuwe commit volgt na deze sessie.

## Onderdeel B — Demo-link

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

QR: `docs/qr-student.png`. Wachtwoordbeveiliging: niet (betaald); zie DEPLOY.md.

## Onderdeel C — Statusmodel

`data/contentStatus.ts` — tests in `engine/__tests__/contentStatus.test.ts`.

## Onderdeel D — Piotr-lijn

`data/piotr-lijn.ts` — 8 scènes, alle `concept`, teksten uit `docs/VOORSTELLEN-RECEPT-29-10-2026.md` §2; `variantZonderContract` `leeg`.

## Onderdeel E — Beelden

`docs/BEELDEN-CHECK.md` + `data/beeldenCheck.ts` — geen akkoord Richard → silhouet in UI.

## Onderdeel F / F2

- Nabespreking: `data/nabespreking-ep4.ts` (12 vragen, concept) + `VEILIG_GESPREK_EP4` (concept).
- Slots: `sanneReactieEp4`, `greinerCrisisEp4` (concept, niet aan motor).
- Interventies: `data/interventies-skelet.ts` (16 items, `interventieDefinitief: false`).

## Onderdeel G — Richard / top-3

**Wacht op Richard:** definitief maken scènes + nabespreking; variant slotscène; beeldakkoord; interventie Piotr; Sanne-variant; Greiner-sync demo/serie.

**Top-3 acties**

1. Richard: akkoord concept → `definitief` waar nodig + variant testament.
2. Beelden/portretten akkoord + WebP in `public/`.
3. Volledige live rooktest ep4 t/m nabespreking na inhoud definitief.

## Lokaal

```bash
cd recept && npm run dev
```

Docent: `?docent=1`
