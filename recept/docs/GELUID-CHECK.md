# Tijdgeest — geluid (controlelijst)

Bron teksten en regels: **`docs/TIJDGEEST.md`**. Mechanisme: `src/components/TijdgeestGeluid.tsx` (standaard uit, geen autoplay, tekstalternatief zichtbaar als geluid aan staat).

**Regel:** geen auteursrechtelijk beschermde opnames in de repo; eigen of rechtenvrij; bandnaam in tekst mag.

| Aflevering | Id (data) | Wat nog maken of kiezen | Bron | Tekstalternatief (UI) |
| --- | --- | --- | --- | --- |
| 1 · 1984 | `a1-cassette` | Zachte new-wave-achtige cassettemuziek (niet The Cure) | eigen | ♪ cassettemuziek, zacht |
| 2 · 1996 | `a2-kantine` | Zomerse dance-pop in de kantine, nagebouwd/rechtenvrij | rechtenvrij | ♪ zomerse dance-pop in de kantine, zacht |
| 3 · 2009 | `a3-chat` | Meldingsgeluidje chatprogramma | eigen | ♪ meldingsgeluidje van een chatprogramma |
| 4 · 2026 | `a4-melding` | Korte meldingstonen (smartphone/werk) | eigen | ♪ meldingstonen, zacht |
| 5 · 2036 | `a5-koffie` | Zachte synthetische stem koffieautomaat | eigen | ♪ zachte, synthetische stem van de koffieautomaat |

Na keuze: optioneel bestand onder `public/audio/tijdgeest/<id>.webm` (of vergelijkbaar) en `audioPath` in `data/episodes/tijdgeest.ts` zetten. Ontbreekt het bestand: geen fout, geen geluid.

Trailer-SFX (`src/audio/sfx.ts`) blijft los van tijdgeest.
