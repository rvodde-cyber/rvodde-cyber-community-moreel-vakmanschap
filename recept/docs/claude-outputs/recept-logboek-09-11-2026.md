# Recept – logboek en stand van zaken (9 november 2026)

Startpunt voor de volgende sessie. Vervangt `recept-logboek-05-11-2026.md` als bron voor de actuele stand; die blijft bestaan voor de eerdere besluiten.

## Stand in één alinea

Alle vijf afleveringen zijn speelbaar van intro tot nabespreking: A1 (1984), A2 (1996), A3 (2009), A4 (2026, demo) en A5 (2036). Elke aflevering heeft cold opens voor ronde 1 en 2, onderzoeken, interventies met budgetpunten, een gesprekskaart, een privédilemma, een slotscène met slotLine-varianten en een pauzekaart. De demo staat online (https://recept-k8m3n7p2.netlify.app/, docent: `?docent=1`). Laatste commit op `feat/recept-a1`: f176ae6, gepusht. Cursor meldt 211 tests groen en een geslaagde build; het is nog niet bevestigd of de laatste deploy (introbeeld op telefoon en tablet) online staat.

## Gebeurd sinds het logboek van 5 november

| Onderdeel | Stand |
| --- | --- |
| Worstenbroodje en bedrijfsverhaal | Product is het worstenbroodje; Van Gorp Machinebouw B.V. (2009), dronesorder rond 2020, Van Gorp Drones (2026), Van Gorp Groep (2036). A4 heeft het blok "HOE HET ZO VER KWAM"; A3-slotfilm heeft de brugzin naar 2020. |
| Houtskoolschets-pakket A2, A3, A5 | Door Richard goedgekeurd ("zit ook de sfeer van Succession in"). Bron: `claude/recept-houtskoolschets-a2-a3-a5-06-11-2026.md`. Cold open ronde 2, privédilemma, slotscène met twee openingszinnen en pauzekaart per aflevering. |
| A2, A3, A5 speelbaar | Motor 'interventie' voor alle drie; dilemma's: briefje over Wim (A2), sms's van Marco over Waalwijk (A3), app-bericht van Anne-Fleur over het schrift (A5, zonder voorspelling). Label "Schets" komt nu bij geen enkele aflevering meer voor (alle vijf "Speelbaar"); de houtskoolschets-tekst blijft beschikbaar voor toekomstige afleveringen. |
| Houdoe | Afscheid van Gerrit en Lies in de slotscène van A1; taalgids bijgewerkt (1984 gewoon, 1996 sporadisch, vanaf 2009 verdwenen). |
| Onderzoeken (stap 2) | Vijf onderzoeken per ronde voor A1, A2, A3 en A5, met een bevinding en een pijlenregel zoals A4 (bijvoorbeeld "▲ TEMPO  ▼ KWALITEIT"). Instructie in de tekst: "kies maximaal 3". De onderzoek-id's wegen niet mee in de motor. |
| Introscherm | Scrollen gerepareerd (`#intro-split-scroll`, `dvh`); kader met polaroid (witte onderrand), kettingpapier, venster en glas omsluit beeld en onderschrift; telefoon 4:5 en tablet 4:3; focuspunt per aflevering (A1 55/62, A2 50/60, A3 en A5 50/50). Richard: "de afbeeldingen bij alle delen zijn erg mooi". |
| QR-code | `recept/docs/qr/` (PNG, SVG) en een deelplaatje met titel; verwijst naar het tijdelijke Netlify-adres. |
| Rapport en opschoning | `recept/docs/RAPPORT-A2-A3-A5-06-11-2026.md`; tests weer groen na het afstemmen op A5 als interventie. |

## Commits (feat/recept-a1)

f2a0462 worstenbroodje en machinebouw; 1813c5a A2, A3 en A5 speelbaar; 39a1203 Houdoe en onderzoeksinstructie; 8f47270 onderzoeken met bevindingen; 0b0a16e kaderfix; f176ae6 introbeeld telefoon en tablet.

## Open

1. **Richard speelt A2, A3 en A5 door** en noteert opmerkingen (toon, lengte, dilemma's, slotscène). Per aflevering een korte lijst of screenshots.
2. **Telefoon en tablet controleren** na de laatste deploy (hard verversen): staat het hoofdonderwerp van elk beeld in beeld? Focuspunten A3 en A5 zijn een eerste inschatting.
3. **Nabesprekingen A1 t/m A5** zijn nog `concept`.
4. **Kalibratie** startwaarden en effecten A2, A3 en A5; A1-kalibratie na speeltest.
5. **Piotr-lijn en de doorstreping in het schrift** (A5): inhoud bewust open; afstemmen met `docs/PIOTR-LIJN.md`.
6. **Ontbrekende beelden**: prikbordbriefje (A2), telefoon met sms (A3), app-scherm (A5), restaurant 2009, schuur 2036 met kist; plus Firefly-lijst Renault en rekwisieten.
7. **Geluid**: audiobestanden per tijdperk (`docs/GELUID-CHECK.md`).
8. **Vergelijkscherm v1** (teamExport-import, twee ranglijsten) en later de regiekamer v2.
9. **Hosting en multi-user**: Netlify is tijdelijk; definitieve plek (Fontys/SURF, eigen domein, privacy/AVG) en multi-user (sessiecode, docent met e-maillink, Supabase EU) nog te bespreken. Een korte vaste link (bijvoorbeeld een eigen subdomein) maakt de QR-code toekomstbestendig.
10. **Verfraaiing per scherm**: Richard stuurt screenshots, Claude schrijft prompts (standaard werkwijze).
11. Richard: lege map `Cursor projecten\Recept` verwijderen; contrast landingspagina meten (4,5:1).

## Openstaande Cursor-prompts

Geen. Alle prompts zijn uitgevoerd en gecommit. Nieuwe kandidaten, in voorgestelde volgorde: (1) opmerkingen uit de speeltest; (2) nabesprekingen A1 t/m A5; (3) vergelijkscherm v1; (4) Piotr-lijn en doorstreping; (5) definitieve hosting en multi-user.

## Werkafspraken (ongewijzigd)

- Nederlands; prompts compleet en token-friendly, in de chat in definitieve vorm; geen bronvermeldingen in de chat, wel APA in documenten.
- Cursor: open de map `rvodde-cyber-community-moreel-vakmanschap`; opdrachten in de agent-chat, git in de terminal.
- Claude commit op de computer (alleen `recept/`, zonder `.netlify`); Richard pusht (`git push` in de map `recept`) en deployt: in `recept` `npm run build` en `npx netlify-cli deploy --prod --dir=dist --site 196fccdd-6d86-4267-9c87-d6cda8cc69e6`. Na een deploy altijd Ctrl+F5.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. *Harvard Business Review, 50*(4), 37–46.

Tenbrunsel, A. E., & Messick, D. M. (2004). Ethical fading: The role of self-deception in unethical behavior. *Social Justice Research, 17*(2), 223–236. https://doi.org/10.1023/B:SORE.0000027411.35832.53
