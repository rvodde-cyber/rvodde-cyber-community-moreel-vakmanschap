# Setup — voorstel asymmetrische leesroute (nog niet bouwen)

**Status:** schets ter akkoord. Bewuste afwijking van “gedeelde symmetrische AES-GCM-sleutel” in de brief. **Niet implementeren zonder groen licht van Richard.**

## Probleem

Alle links (team, leidinggevende, adviseur) delen nu dezelfde AES-GCM-sleutel in `#k=`.  
Combineer dat met open `GET /api/setup/fetch` (alleen `trajectoryId` nodig): een teamrespondent die blobs ophaalt, kan ook het zelfbeeld van de leidinggevende en antwoorden van collega’s **ontsleutelen**. Dat botst met spec §7bis en de kern van het instrument.

## Richting

Respondenten **alleen encrypt**, adviseur **decrypt**:

1. Adviseur genereert client-side een sleutelpaar (voorstel: **ECDH P-256** + per-bericht ephemeral key → AES-GCM, of **RSA-OAEP** wrapping van een content-key).
2. Respondent-fragment krijgt alleen de **publieke** sleutel (bijv. `#t=&pk=&r=&s=`).
3. Adviseur-fragment (of lokaal bewaarde recovery) houdt de **private** sleutel (`#t=&sk=&r=advisor`).
4. Submit blijft ciphertext + metadata; server blijft blind.
5. Fetch mag desnoods open blijven voor ciphertext: zonder private key is plaintext onbereikbaar. Purge/autorisatie blijft een apart vraagstuk (nog steeds geen adviseur-proof op de API).

Voorkeursvariant om te bevestigen: **ECDH (P-256) + AES-GCM** via WebCrypto — compacte keys in URL-fragmenten, moderne browser-support, geen grote RSA-blobs in de link.

## Wat raakt de refactor?

| Onderdeel | Impact |
|---|---|
| **Fragmentstructuur** | Ja. `k=` (gedeelde raw AES-key) verdwijnt. Respondent: `pk=` (of JWK). Adviseur: `sk=` (+ eventueel `pk=`). Rol `r=` en sessie `s=` blijven. |
| **Mailbox-blobformaat** | Ja, licht. Naast `ciphertext` + `iv` waarschijnlijk `ephemeralPublicKey` (ECDH) of `wrappedKey` (RSA-OAEP). Index/TTL/API-paden (`submit`/`fetch`/`purge`) kunnen gelijk blijven. |
| **`setup/src/lib/crypto.js`** | Ja, herschrijven: keygen asymmetrisch, `encryptForAdvisor(pk, payload)`, `decryptWithAdvisor(sk, blob)`. |
| **UI linkgeneratie / probe** | Ja. `createTrajectory` levert andere links; respondent mag niet meer kunnen decrypten; adviseursconsole blijft decrypten. |
| **Bestaande tests** | Ja. Crypto-tests en fragment-asserts moeten om. Mailbox-unit tests (opaque store) grotendeels herbruikbaar. E2E-probe herschrijven. |
| **Al opgeslagen Fase-1 blobs** | Niet backward-compatible. Acceptabel: Fase 1 was skelet; purge/TTL, geen productie-data. |
| **Chassis-UI (Fase 2)** | **Niet geraakt** — pure presentatie; encryptie-hook blijft “versleutel payload vóór submit”. |

## Geschatte omvang

- Klein-middel: crypto-module + linkbouw + blobvelden + tests/docs.
- Geen schema-migratie op de server buiten optioneel extra opaque veld.
- Autorisatie op fetch/purge is **niet** opgelost door asymmetrische crypto alleen (wel het plaintext-lek tussen respondenten).

## Open keuzes vóór bouw

1. ECDH+AES-GCM vs RSA-OAEP?
2. Hoe bewaart de adviseur `sk` bij verlies van de tab (alleen fragment-link, of extra downloadbaar recovery-bestand)?
3. Pakken we tegelijk per-respondent unieke `s=` (multi-teamlink of first-open binding) mee, of later?

**Wacht op akkoord voordat crypto wordt omgezet.**
