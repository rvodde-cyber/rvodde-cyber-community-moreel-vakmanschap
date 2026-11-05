# Bouwplanning Recept (stap 1–8)

1. **Projectopzet** — [x] Vite/React/TS, Zod (`npm run validate`), engine/data/content. [x] `SessionAdapter` + `localSession`. [x] `themes/periods.ts`. [ ] `useReducer`-gamestore, mappen `components/`, `screens/`, `audio/`.
2. **Spelmotor** — [x] Port v6, 4 golden ronde 1 + richtingstests (10). [ ] Zevendeling toetsing `spelmotor.md` (volledige campagnes) als aparte golden-suite.
3. **Aflevering 4 ronde 1** — [x] Eerste speelbare flow (intro, cold open, onderzoek, besluit, scan, uitkomst, controlekamer). [ ] Grafiek, HR-tabel detail, groepsapp, trailer-geluid, slotscène.
4. **UX §3.4** — Opdrachtbalk, Wie is wie, Nog nodig:, Hoe het werkt, vijf oordelen.
5. **Berichten & dilemma** — Groepsapp/privé, reacties, dilemma aflevering 4.
6. **Trailer & ronde 2** — Web Audio, `slotLine`, pauzekaart; ronde 2 + padeffect.
7. **Afleveringen 1–3 & 5** — Skelet + conceptinterventies; dashboardthema’s; opvolging.
8. **Afwerking** — Portretten, `?docent=1`, nabespreking, a11y, README, root `build:recept`.

**Bronnen:** `Cursor projecten/Recept/` → sync naar `recept/` in monorepo. Drive-tabs Introteksten/Morele dilemma’s: bijwerken en opnieuw syncen.

**Fase 0 (3 nov 2026):** `docs/DESIGNGIDS.md` vastgelegd (afgeleid van aflevering 4).

**Volgende bouwstappen (na designgids):**

1. **Docent-vergelijkscherm v1** — import van meerdere `teamExport`-bestanden; twee ranglijsten naast elkaar; geen server (zie `docs/LATER.md`).
2. **Live regiekamer v2** — sync, auth, AVG-plan, gebeurtenissen naar teams (zie `docs/LATER.md`).
3. Daarna: bouwstenen A1–A3 en A5 naar `playMode: full` volgens checklist in `DESIGNGIDS.md` §7.

**Eerdere focus:** stap 3–6 (speelbare aflevering 4) grotendeels aanwezig; zie `docs/VOORTGANG.md`.
