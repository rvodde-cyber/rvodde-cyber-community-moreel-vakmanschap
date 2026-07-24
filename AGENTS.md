# AGENTS.md

## Cursor Cloud specific instructions

This repo hosts two independent Vite + React (JavaScript) single-page apps. There is no
TypeScript, Next.js, or backend server to run locally — everything is static/client-side.
Dependencies for both apps are installed by the startup update script (`npm install` in the
repo root and in `teamkompas/`).

### Services / apps

| App | Path | Dev command | Notes |
|-----|------|-------------|-------|
| Community Moreel Vakmanschap (main site) | repo root | `npm run dev` (Vite, port 5173) | Public platform: welkom, model, bibliotheek, gesprekskaarten (with live filter/search). |
| Wisselwerking (teamkompas) | `teamkompas/` | `cd teamkompas && npm run dev -- --port 5174` | Standalone team-reflection tool. In production it is built and mounted under `/wisselwerking/`; in dev it serves at base `/`. Run on a separate port so both apps run at once. |

### Lint / build

- There is **no linter configured** (no ESLint). "Checking for errors" = running the build.
- Build the whole thing with `npm run build` from the repo root. This is non-trivial: it runs
  data-generation scripts (`scripts/generate-gesprekskaarten-catalog.mjs`,
  `scripts/sync-workshop-hub.mjs`), builds the main app, then `cd teamkompas && npm install`
  and builds the teamkompas app into `dist/wisselwerking`.
- The build regenerates `public/data/gesprekskaarten/catalog.json` and
  `public/data/workshop/hub-apps.json` — these only change a `generatedAt`/`generated_at`
  timestamp, so revert them (`git checkout --`) unless you actually intend to commit new data.

### Gotchas

- `teamkompas/` is its own npm project with its own `package-lock.json`; installing root deps
  does **not** install its deps. The update script installs both.
- Workshop Hub is **disabled by default** (`WORKSHOP_HUB_ENABLED` / `VITE_WORKSHOP_HUB_ENABLED`
  unset → treated as off). With it off, `/workshop*` and `/besloten*` render a static
  "Binnenkort beschikbaar" page. Enabling it requires `WORKSHOP_SESSION_SECRET` to be set or the
  session code throws. You do not need the hub for normal development.
- `.env.example` documents optional Vite build-time vars (`VITE_GOOGLE_FORM_URL`, workshop hub
  flags/secrets). None are required to run either dev server.
- The `cards:*` / `*-docx` npm scripts under `scripts/` are one-off content tooling. The `.py`
  ones need Python packages (e.g. `python-docx`) that are not part of the standard dev setup;
  they are not needed to run or build the apps.
