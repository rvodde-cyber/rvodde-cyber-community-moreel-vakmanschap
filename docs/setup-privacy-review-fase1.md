# Setup — privacyvragen Fase 1 (huidige stand, geen bouw)

Antwoorden op de vier vragen van Richard (2026-08-31). Alleen rapportage van de huidige code.

## 1. Zijn fetch/purge adviseur-only?

**Nee.** `GET /api/setup/fetch` en `POST /api/setup/purge` zijn niet adviseur-only.

- Geen authenticatie, geen rolcheck, geen token, geen HMAC.
- Iedereen die een geldige `trajectoryId` kent, kan alle ciphertext-blobs ophalen of het traject wissen.
- De UI toont fetch/purge alleen op de adviseursrol, maar dat is client-side presentatie — de API dwingt het niet af.

Relevant: `api/setup/fetch.js`, `api/setup/purge.js`.

## 2. Is trajectoryId hoog-entropisch?

**Ja, qua generatie.** `createTrajectory` maakt `trajectoryId` met `crypto.getRandomValues` over **18 bytes** (~144 bits), geëncoded als base64url (`randomId(18)` in `setup/src/lib/crypto.js`).

Dat is niet praktischerwijs te raden of te enumereren. Bescherming tegen ongeautoriseerde fetch/purge rust daarmee **volledig op geheimhouding van de trajectoryId** (security through obscurity van een groot id), niet op server-side autorisatie.

## 3. Eigen IV/nonce per blob?

**Ja.** `encryptPayload` trekt bij elke aanroep een verse 12-byte IV via `crypto.getRandomValues` en stuurt die mee naast de ciphertext. Geen hergebruik van nonce per encryptie-call.

Let op: bij **upsert** van hetzelfde respondent-item wordt opnieuw versleuteld met een nieuwe IV (prima voor GCM). Het gevaar “zelfde key + zelfde IV, andere plaintext” treedt in de huidige helper niet op.

## 4. Wat is `s=` — en kan A de blob van B overschrijven?

**Betekenis:** `s=` in `#t=&k=&r=&s=` is een **respondent-/sessie-id**. Bij submit wordt die als `respondentId` gebruikt. De mailbox-sleutel is:

`setup:blob:{trajectoryId}:{role}:{respondentId}`

**Overschrijven:**

- Respondent A met `s=A` overschrijft **niet** automatisch de blob van B (`s=B`): andere key.
- **Maar:** de server valideert niet dat de caller “eigenaar” is van die `respondentId`. Wie `trajectoryId` + een gekozen `respondentId` post, kan die blob upserten — dus A kan B’s blob overschrijven **als A B’s `s` kent of raadt**, of een willekeurige id verzint en zo een valse blob toevoegt.
- Huidige linkgeneratie maakt **één** teamlink met **één** vooraf gegenereerde `s=`. Delen die link met meerdere teamleden, dan delen zij dezelfde `respondentId` en **overschrijven elkaars upserts**. Dat botst met multi-respondent + hervatten per persoon (brief §5.3); per respondent een unieke `s` (of server-uitgegeven submit-token) is nog niet geïmplementeerd.

**Samenvatting risico’s (huidige stand):**

| Capabiliteit | Bescherming nu |
|---|---|
| Blobs lezen (ciphertext) | Alleen geheim `trajectoryId` |
| Traject wissen | Alleen geheim `trajectoryId` |
| Blob overschrijven | Wie id’s kent/kiest; gedeelde team-`s` = onderlinge overwrite |
| Plaintext lezen | Vereist de AES-sleutel uit het fragment (`k=`) — en die zit nu in **alle** rol-links |

De laatste regel is precies de aanleiding voor de asymmetrische leesroute (apart voorstel).
