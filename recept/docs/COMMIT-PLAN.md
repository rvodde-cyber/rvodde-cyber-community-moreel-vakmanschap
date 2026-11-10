# Commitplan — branch `feat/recept-a1`

Laatste update: **10 november 2026**. Richard commit zelf; elk `git add` op een eigen regel (PowerShell, map `recept`).

**Let op:** Commit 5 raakt dezelfde bestanden als eerdere commits (`IntroPhase.tsx`, `public/beelden/`, `.gitignore`, docs). Als de branch nog niet in vijf commits staat: **één merge-commit** of eerst historie herschikken. Onderstaand is de **bedoelde logische volgorde** bij een lineaire rebase.

---

## 1 — Zus als enige rol

**Bericht:** Eén spelersrol (jongere zus); argumentstap; MT-UI verwijderd; intro-opdracht en export.

```
git add data/episodes/introUiCopy.ts
git add content/howItWorks.nl.ts
git add content/intros.nl.ts
git add content/uitleg.ts
git add content/rolbeschrijving.nl.ts
git add src/screens/phases/ArgumentPhase.tsx
git add src/screens/phases/BesluitPhase.tsx
git add src/screens/argumentStep.test.tsx
git add src/game/gameReducer.ts
git add src/game/budgetUi.ts
git add src/game/uiTypes.ts
git add src/game/teamExport.ts
git add docs/INVENTARIS-MT-ROLLEN.md
git add docs/STAP-FLOW-ONDERZOEK.md
```

## 2 — A4 en rondebalk

**Bericht:** A4 carry-teksten en rondebalk Kijk…Kijk terug; openingsscène-uitleg.

```
git add src/game/spelStappen.ts
git add src/components/StepsNav.tsx
git add src/game/coldOpenCopy.ts
git add src/screens/phases/ColdPhase.tsx
git add engine/__tests__/spelStappen.test.ts
git add engine/__tests__/coldOpenUitleg.test.ts
```

## 3 — Portretten

**Bericht:** Portret-bouwsteen, glossarium, personen-register; portretten alleen in Wie is wie.

```
git add data/personen.ts
git add data/glossarium.ts
git add data/schemas/personen.schema.ts
git add src/components/Portret.tsx
git add src/components/PersonAvatar.tsx
git add src/components/PersonCard.tsx
git add src/components/modals/GlossaryModal.tsx
git add src/components/portret.test.tsx
git add docs/PORTRETTEN-LIJST.md
git add public/beelden/portretten/P-*.jpg
```

## 4 — Trailerfase

**Bericht:** Afleveringstrailer vóór intro; data, state v5, UI en tests.

```
git add data/trailers.ts
git add data/trailerBeeld.ts
git add data/schemas/trailers.schema.ts
git add data/episodes/content.ts
git add src/screens/phases/EpisodeTrailerPhase.tsx
git add src/lib/trailerProbe.ts
git add src/game/episodeTrailerFlow.ts
git add src/screens/GameShell.tsx
git add src/components/IntroTrailerReplay.tsx
git add src/game/migrateState.ts
git add src/hooks/useGame.ts
git add engine/__tests__/episodeTrailer.test.ts
git add scripts/validate-data.ts
```

## 5 — Bundel opmerkingen 1–3 + beelden

**Bericht:** Labels De situatie/De uitdaging, nieuwe hintteksten, aanhalingstekens gesproken regels, canonieke trailer-JPG’s, portret-originelen naar beelden-bron.

```
git add content/intros.nl.ts
git add src/screens/phases/IntroPhase.tsx
git add src/components/SpokenLineText.tsx
git add src/components/FilmOverlay.tsx
git add src/components/PhonePanel.tsx
git add data/trailerBeeld.ts
git add scripts/normalize-trailer-beelden.mjs
git add .gitignore
git add public/beelden/T1.jpg
git add public/beelden/W1.jpg
git add public/beelden/C1.jpg
git add public/beelden/L1.jpg
git add public/beelden/L4.jpg
git add public/beelden/TR2-2.jpg
git add public/beelden/TR2-3.jpg
git add public/beelden/TR2-4.jpg
git add public/beelden/TR2-5.jpg
git add public/beelden/TR3-1.jpg
git add public/beelden/TR3-2.jpg
git add public/beelden/TR3-3.jpg
git add public/beelden/TR3-4.jpg
git add public/beelden/TR3-5.jpg
git add public/beelden/TR4-2.jpg
git add public/beelden/TR4-4.jpg
git add public/beelden/TR4-5.jpg
git add public/beelden/TR5-1.jpg
git add public/beelden/TR5-2.jpg
git add public/beelden/TR5-3.jpg
git add public/beelden/TR5-4.jpg
git add public/beelden/portretten/P-ANNE-FLEUR-2036.jpg
git add engine/__tests__/bundelOpmerkingen.test.ts
git add docs/BEELDEN-CHECK.md
git add docs/VOORTGANG.md
git add docs/OPEN-VRAGEN.md
git add docs/COMMIT-PLAN.md
```

**Verwijderen uit git (lange Firefly-namen):** na commit 5 `git status` — ontbrekende deletes expliciet `git add` op verwijderde bestanden in `public/beelden/`.

---

`beelden-bron/` staat in `.gitignore` en wordt niet gecommit.
