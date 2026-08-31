# Setup — Fase 1 (skelet + versleutelingslaag)

Sub-app in de community-hub, naast `teamkompas/` en `frisse-organisatie/`.

## Privacy

- AES-GCM-sleutel wordt client-side gegenereerd.
- Sleutel zit alleen in het URL-fragment (`#…`) — browsers sturen dat nooit mee naar de server.
- `POST /api/setup/submit` schrijft uitsluitend cijferbrij weg (TTL).
- Ontsleuteling gebeurt in de adviseursbrowser via `GET /api/setup/fetch`.

## Lokaal draaien

```bash
# Terminal 1 — blinde postbus (file-backed onder /tmp)
node scripts/setup-dev-api.mjs

# Terminal 2 — Vite-app (proxy’t /api/setup → :3001)
cd setup && npm install && npm run dev
```

## Productie / Vercel

Zet secrets (niet committen):

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Zonder deze variabelen weigeren de serverless functions op Vercel opslag (`mailbox_not_configured`).
Lokaal valt de mailbox terug op een file-store.

## Bouwen in de hub

Root-script `npm run build:setup` (en onderdeel van `npm run build`) kopieert naar `dist/setup/`.
Rewrite in root-`vercel.json`: `/setup`.
