# Voortgang Recept (Cursor-bouw)

Laatste update: **29 oktober 2026** (Piotr-lijn + demo-link prompt)

## Onderdeel A — Voorcontrole commits (`origin/main..HEAD`)

| Commit | Omschrijving | Recept stap 2–5? |
| --- | --- | --- |
| f9f2f3e | DEPLOY.md bijgewerkt (commits ahead) | ja |
| ac495db | voortgang, open vragen, toegankelijkheid | ja |
| 46366d1 | stap 4 a11y + tests | ja |
| d134e70 | stap 3 inhoudsslots, flags, beelden | ja |
| a286b2f | stap 2 deploy-config | ja |
| b0cb786 | stap 8 portretten, docent, nabespreking | ja (§11) |
| f6eb8f2 | stap 7 skelet 1-3-5 | ja (§11) |
| 2b34817 | stap 6 trailer, slot | ja (§11) |
| 272e42c | stap 5 groepsapp, Piotr-dilemma | ja (§11) |
| 89f370b | stap 4 glossarium, pauze | ja (§11) |
| 592dbec | Piotr-lijn docs | ja (§11) |
| 8d548b7 | aflevering 4 ronde 1 | ja (§11) |
| 0193fc2 | SessionAdapter, thema | ja (§11) |
| 155969a | projectopzet, spelmotor | ja (§11) |

**Geen vreemde commits** in deze reeks — alles Recept.

### Tests (29 okt 2026, na Piotr-lijn)

- `npm test`: **18** groen.
- `npm run build`: groen.
- `git push origin main`: **uitgevoerd** (29 okt).

### Live URL's

| Link | URL |
| --- | --- |
| Student | _na Netlify deploy_ |
| Docent | _`<student-url>?docent=1`_ |

Rooktest live: zie tabel onderaan na deploy.

### Geblokkeerd op Richard / Claude

1. Uitgewerkte scèneteksten (`PIOTR-SCENES-VOORSTEL`, status → definitief).
2. `GESPREKSVRAGEN-EP4-VOORSTEL.md` + Veilig gesprek.
3. Beelden akkoord + `STEREOTYPENCHECK-CRITERIA.md`.
4. Variant slotscène `variantZonderContract` (OPEN-VRAGEN).

### Top-3 volgende acties

1. **Netlify:** `netlify login` of Drop van `recept/dist` → URL + rooktest + `npm run qr`.
2. Claude: `GESPREKSVRAGEN-EP4-VOORSTEL.md` + `STEREOTYPENCHECK-CRITERIA.md`.
3. Richard: scèneteksten definitief + variant slotscène + `interventieDefinitief`.

## Lokaal

```bash
cd recept && npm run dev
```

Docent: `?docent=1`

## Rooktest live

| Check | Student | Docent |
| --- | --- | --- |
| Aflevering 4 start | _ | _ |
| Nabespreking | _ | _ |
| Instellingenmodal | _ | _ |
| Consolefouten | _ | _ |
