# Toegankelijkheid (WCAG 2.2 AA) — controle v1

Datum: oktober 2026 · Recept webbuild

## Geïmplementeerd

- **Toetsenbord**: modals (`Modal`), tabs groepsapp, knoppen en formulieren focusbaar; zichtbare focus via CSS `:focus-visible` in `recept.css`.
- **Doelgebied**: primaire knoppen `.btn`, `.btn.big`, timer en menu ≥ 44 px hoogte waar mogelijk.
- **Kleur + symbool**: ▲/▼ en good/bad in uitkomst; ticker gebruikt ▲/● naast kleur.
- **Live regions**: chat-toast, verborgen meters in docentpaneel, cold-open ondertitels `aria-live="polite"`.
- **Ondertitels / reduced motion**: `FilmOverlay` respecteert `prefers-reduced-motion` (kortere cues, geen flits).
- **Alt-tekst portretten**: rolbeschrijving, geen uiterlijk (`portretAlt` in data).
- **Contrast**: donker thema controlekamer; initialen-fallback op `--cyan-dim` / `--cyan`.

## Handmatig nog testen

- Volledige toetsenbordroute door aflevering 4 (onderzoek → besluit → uitkomst).
- VoiceOver / NVDA op iPad Safari en desktop Chrome.
- Zoom 200% zonder horizontaal scrollen op 375 px breedte.
- Donkere modus OS vs. vaste donkere UI (geen toggle in v1 — noteren voor later).

## Bewust buiten scope v1

- Instellingenmodal “groot lettertype / hoog contrast” (stub in bouwplanning stap 4).
- Licht thema voor hele app.
