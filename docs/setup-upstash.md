# Setup — Upstash Redis (bevestigd)

**Besluit (Richard, 2026-08-31):** de blinde postbus gebruikt **Upstash Redis**, gekoppeld via de **Vercel Marketplace-integratie** (“Upstash for Redis”), niet via een los Upstash-account.

## Waarom

- Vercel KV bestaat niet meer als losse optie (stores gemigreerd naar Upstash, dec 2024).
- Upstash biedt native TTL en is blind voor plaintext (wij slaan alleen ciphertext op).
- Marketplace-koppeling zet credentials automatisch als env-vars en lift mee op bestaande Vercel-billing.

## Handmatige stap (Richard)

In het Vercel-project van de community-hub:

1. Open het project → **Storage** / **Integrations**, of [vercel.com/marketplace/upstash](https://vercel.com/marketplace/upstash).
2. Installeer **Upstash for Redis** en koppel het aan dit project (nieuwe DB of bestaande).
3. Bevestig dat deze env-vars op Production + Preview staan:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Redeploy na koppeling zodat serverless functions de vars zien.

Zonder deze vars blijven `/api/setup/*` **fail-closed** met `503 mailbox_not_configured` op Vercel. Lokaal blijft de file-store via `npm run dev:setup-api` werken.

## Code

`lib/setup-mailbox.js` praat al tegen Upstash REST wanneer beide env-vars gezet zijn. Geen SDK-verplichting; raw REST + TTL (`SET … EX`).
