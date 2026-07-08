# Scherpstellen

Interactieve web-app voor congres 2027. Standalone module onder `/verdenk`.

## Routes

| Route | Beschrijving |
|-------|-------------|
| `/verdenk` | Landingspagina |
| `/verdenk/test/1` … `/verdenk/test/6` | Dimensiepagina's |
| `/verdenk/resultaat` | Persoonlijk resultaat |
| `/verdenk/live` | Live scherm voor congres (projectie) |

## Lokaal draaien

```bash
npm install
npm run dev
```

Open `http://localhost:5173/verdenk`

## Supabase instellen

1. Maak een Supabase-project aan
2. Voer `supabase/verdenk_schema.sql` uit in de SQL Editor
3. Kopieer project-URL en anon key naar `.env`:

```env
VITE_SUPABASE_URL=https://jouw-project.supabase.co
VITE_SUPABASE_ANON_KEY=jouw-anon-key
```

Zonder Supabase werkt de app lokaal; resultaten worden dan niet opgeslagen en het live scherm toont demo-modus.

## Congres

- Deelnemers: `/verdenk` op hun telefoon
- Groot scherm: `/verdenk/live` (full screen, real-time aggregatie)
