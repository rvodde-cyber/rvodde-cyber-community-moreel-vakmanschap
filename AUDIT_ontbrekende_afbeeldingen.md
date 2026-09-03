# Audit ontbrekende afbeeldingen — Gesprekskaarten

**Datum:** 2026-07-10  
**Project:** Community Moreel Vakmanschap

## Databronnen

| Bron | Rol | Opmerking |
|------|-----|----------|
| `src/data/gesprekskaarten/cards.json` | **Primaire databron** — 58 gesprekskaarten (NL + EN content) | Afbeelding via `assets.afbeelding` |
| `public/data/gesprekskaarten/catalog.json` | Afgeleide catalogus (build-time) | Spiegelt `heeftAfbeelding` uit cards.json |
| `src/data/bibliotheekData.js` | Bibliotheek-metadata (downloads, geen kaartafbeeldingen) | Geen afbeeldingsvelden per kaart |
| Supabase | — | **Niet aanwezig** in dit project |

## Methode

Per kaart gecontroleerd of `assets.afbeelding`:
- ontbreekt (geen key of geen `assets`-object),
- leeg/null/undefined is,
- verwijst naar een niet-bestaand bestand onder `/public`, of
- een externe URL is (geen externe URL's gevonden).

Bestaande afbeeldingen in `/public/images/gesprekskaarten/`: `kaart-1.jpg`, `kaart-2.jpg`, `kaart-3.jpg` — **niet gekoppeld** aan enige kaart in `cards.json`.

---

## Ontbrekende of ongeldige afbeeldingen (58)

### 1. De roddelende vriend

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_01` |
| **Titel (NL)** | De roddelende vriend |
| **Titel (EN)** | The gossiping friend |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 24 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De roddelende vriend", reflecting: De muziek beukt, lichten flitsen, en dan hoor je het: je beste vriend verspreidt leugens over jullie vriendin. Pure rodd…, everyday life setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 2. Buurman mishandelt zijn vrouw

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_02` |
| **Titel (NL)** | Buurman mishandelt zijn vrouw |
| **Titel (EN)** | Neighbor abuses his wife |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 56 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Buurman mishandelt zijn vrouw", reflecting: Emma is getuige van huiselijk geweld bij haar buurvrouw, mevrouw Janssen. Meneer Janssen mishandelt haar regelmatig, wat…, everyday life setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 3. De gevonden portemonnee

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_03` |
| **Titel (NL)** | De gevonden portemonnee |
| **Titel (EN)** | The found wallet |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 88 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De gevonden portemonnee", reflecting: Op een verlaten bankje ligt een zware, leren portemonnee. Geld en een identiteitskaart staren je aan. Niemand in de buur…, everyday life setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 4. Collega declareert onterecht overuren

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_04` |
| **Titel (NL)** | Collega declareert onterecht overuren |
| **Titel (EN)** | Colleague falsely claims overtime |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 120 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Collega declareert onterecht overuren", reflecting: Mark ontdekt dat zijn collega Emma fraudeert met overuren. Dit veroorzaakt oneerlijkheid en ontevredenheid in het team.…, professional workplace setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 5. Collega presteert slecht wegens persoonlijke problemen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_05` |
| **Titel (NL)** | Collega presteert slecht wegens persoonlijke problemen |
| **Titel (EN)** | Colleague underperforms due to personal problems |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 152 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Collega presteert slecht wegens persoonlijke problemen", reflecting: Sophie merkt dat haar collega Mark vaak te laat komt en zijn werk niet goed uitvoert. Dit zorgt voor extra werkdruk bij…, professional workplace setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 6. Leidinggevende maakt discriminerende opmerkingen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_06` |
| **Titel (NL)** | Leidinggevende maakt discriminerende opmerkingen |
| **Titel (EN)** | Manager makes discriminatory remarks |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 184 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Leidinggevende maakt discriminerende opmerkingen", reflecting: Emma merkt dat haar leidinggevende, meneer Jansen, regelmatig discriminerende opmerkingen maakt over collega's. Dit creë…, professional workplace setting, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 7. De goedkope stage in het buitenland

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_07` |
| **Titel (NL)** | De goedkope stage in het buitenland |
| **Titel (EN)** | The low-cost internship abroad |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 216 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De goedkope stage in het buitenland", reflecting: Sophie, een ambitieuze student internationale betrekkingen, krijgt een onbetaalde stage aangeboden bij een gerenommeerde…, sustainability and environment context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 8. De verdiende vakanties

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_08` |
| **Titel (NL)** | De verdiende vakanties |
| **Titel (EN)** | The well-earned holidays |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 248 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De verdiende vakanties", reflecting: Als hardwerkende verpleegkundige geniet Laura van haar welverdiende vakanties. Zon, zee, strand, tegen spotprijzen. Maar…, sustainability and environment context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 9. Het onderzoek naar dierproeven

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_09` |
| **Titel (NL)** | Het onderzoek naar dierproeven |
| **Titel (EN)** | The animal testing research |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 280 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Het onderzoek naar dierproeven", reflecting: Pim, een student diergeneeskunde, doet onderzoek naar alternatieven voor dierproeven. Zijn onderzoek wordt gefinancierd…, sustainability and environment context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 10. De anonieme sollicitatie

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_10` |
| **Titel (NL)** | De anonieme sollicitatie |
| **Titel (EN)** | The anonymous job application |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 312 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De anonieme sollicitatie", reflecting: Een stapel cv's ligt voor je, kandidaten voor een felbegeerde functie. Twee cv's vallen op: Jan de Vries en Ahmed Khalil…, diversity and inclusion context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 11. Grappen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_11` |
| **Titel (NL)** | Grappen |
| **Titel (EN)** | Jokes |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 344 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Grappen", reflecting: Tom voelt zich al weken ongemakkelijk. Zijn vrienden, met wie hij al jaren optrekt, maken steeds vaker homofobe grappen.…, diversity and inclusion context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 12. De gemengde relatie

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_12` |
| **Titel (NL)** | De gemengde relatie |
| **Titel (EN)** | The intercultural relationship |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 376 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De gemengde relatie", reflecting: Je hart bonkt in je borst, een mix van opwinding en angst. Je bent hopeloos verliefd op iemand met een andere culturele…, diversity and inclusion context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 13. Foto

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_13` |
| **Titel (NL)** | Foto |
| **Titel (EN)** | Photo |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 408 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Foto", reflecting: Je hebt een foto geplaatst van een vriend zonder toestemming, en de vriend is boos omdat de foto een gênant moment vastl…, digital social media context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 14. Reputatie

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_14` |
| **Titel (NL)** | Reputatie |
| **Titel (EN)** | Reputation |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 440 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Reputatie", reflecting: In een gestreste gemoedstoestand plaatst je een negatieve recensie van het bedrijf van een concurrent om hun reputatie t…, digital social media context, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 15. Fijn groepswerk

| Veld | Waarde |
|------|--------|
| **ID** | `GK_MM_15` |
| **Titel (NL)** | Fijn groepswerk |
| **Titel (EN)** | Great group work |
| **Modelstap** | Handelen |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 472 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Fijn groepswerk", reflecting: Yip zucht. Samenwerken met Tijn is een ramp. Hij is de ster van de opleiding, met zijn vlotte babbel en charisma, maar z…, student life on campus, decisive moment of moral action and courageous choice under pressure, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 16. De weggenomen kantoorspullen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_01` |
| **Titel (NL)** | De weggenomen kantoorspullen |
| **Titel (EN)** | The missing office supplies |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 504 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De weggenomen kantoorspullen", reflecting: Thomas ziet zijn collega Bas aan het einde van de dag een pak printerpapier en een nieuwe muis in zijn tas stoppen. Niem…, professional workplace setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 17. De leugen voor de ouders

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_02` |
| **Titel (NL)** | De leugen voor de ouders |
| **Titel (EN)** | The lie for the parents |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 538 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De leugen voor de ouders", reflecting: Sanne stapt net onder de douche als haar telefoon drie keer trilt. Haar beste vriendin Iris appt: "Als mijn ouders belle…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 18. Voor de goede sfeer

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_03` |
| **Titel (NL)** | Voor de goede sfeer |
| **Titel (EN)** | For the sake of team spirit |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 572 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Voor de goede sfeer", reflecting: Het is vrijdagmiddag vijf uur en Youssef pakt net zijn jas als teamleider Marieke langsloopt. "Zou je nog een uurtje kun…, professional workplace setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 19. De groepsapp

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_04` |
| **Titel (NL)** | De groepsapp |
| **Titel (EN)** | The group chat |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 606 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De groepsapp", reflecting: Om 23:40 uur licht Femkes telefoon op. In de klassengroepsapp verschijnen steeds meer berichten over Julian — screenshot…, digital social media context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 20. De gevonden portemonnee

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_05` |
| **Titel (NL)** | De gevonden portemonnee |
| **Titel (EN)** | The found wallet |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 640 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De gevonden portemonnee", reflecting: Tussen de fietsenstalling en de supermarkt ziet Daan iets bruins liggen. Een portemonnee. Hij raapt hem op: twee briefje…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 21. De fout in het rapport

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_06` |
| **Titel (NL)** | De fout in het rapport |
| **Titel (EN)** | The error in the report |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 674 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De fout in het rapport", reflecting: Lotte loopt stage bij een adviesbureau en heeft het eindrapport voor een grote klant net doorgenomen. Ze ziet een rekenf…, student life on campus, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 22. De foto die rondgaat

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_07` |
| **Titel (NL)** | De foto die rondgaat |
| **Titel (EN)** | The photo going around |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 708 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De foto die rondgaat", reflecting: In de vriendengroep-app verschijnt ineens een foto: een meisje van school, duidelijk niet wetend dat ze gefotografeerd w…, digital social media context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 23. De klant aan de balie

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_08` |
| **Titel (NL)** | De klant aan de balie |
| **Titel (EN)** | The customer at the desk |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 742 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De klant aan de balie", reflecting: Aisha werkt achter de balie van de bibliotheek wanneer een vaste bezoeker weigert door haar geholpen te worden. "Ik wil…, diversity and inclusion context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 24. De goedbetaalde bijbaan

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_09` |
| **Titel (NL)** | De goedbetaalde bijbaan |
| **Titel (EN)** | The well-paid side job |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 776 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De goedbetaalde bijbaan", reflecting: Mila krijgt een berichtje: een modemerk waar ze eerder solliciteerde, biedt haar een bijbaan aan met een salaris dat twe…, sustainability and environment context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 25. Het antwoordblaadje

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_10` |
| **Titel (NL)** | Het antwoordblaadje |
| **Titel (EN)** | The answer sheet |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 810 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Het antwoordblaadje", reflecting: Tijdens het tussentijdse tentamen wiskunde ziet Noor, twee rijen verderop, hoe haar vriendin Elif een spiekbriefje uit h…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 26. De review voor geld

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_11` |
| **Titel (NL)** | De review voor geld |
| **Titel (EN)** | The review for money |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 844 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De review voor geld", reflecting: Sven krijgt een privébericht van een webwinkel waar hij ooit een koptelefoon kocht: vijftig euro cadeaubon in ruil voor…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 27. Maar het zijn maar grapjes

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_12` |
| **Titel (NL)** | Maar het zijn maar grapjes |
| **Titel (EN)** | But they're just jokes |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 878 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Maar het zijn maar grapjes", reflecting: Aan de keukentafel van het studentenhuis maakt huisgenoot Ruben weer een grap — dit keer over Marokkaanse buren en "wat…, diversity and inclusion context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 28. De goedkope trui

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_13` |
| **Titel (NL)** | De goedkope trui |
| **Titel (EN)** | The cheap jumper |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 912 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De goedkope trui", reflecting: In de winkel hangt een trui voor zes euro, in de uitverkoop nog goedkoper. Emma weet, na een schoolproject over de kledi…, sustainability and environment context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 29. De vraag van de leidinggevende

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_14` |
| **Titel (NL)** | De vraag van de leidinggevende |
| **Titel (EN)** | The manager's request |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 946 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De vraag van de leidinggevende", reflecting: Teamleider Iris vraagt Bram om in een klantpresentatie de resultaten van het project "iets positiever te brengen dan ze…, professional workplace setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 30. De dakloze op straat

| Veld | Waarde |
|------|--------|
| **ID** | `GK_BG_15` |
| **Titel (NL)** | De dakloze op straat |
| **Titel (EN)** | The homeless man on the street |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 980 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De dakloze op straat", reflecting: Voor de supermarkt zit een man met een kartonnen bord: "Elke euro helpt, dankjewel." Julia heeft net haar hele weekbudge…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 31. Hulp

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_01` |
| **Titel (NL)** | Hulp |
| **Titel (EN)** | Help |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1013 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Hulp", reflecting: De trein schokt, een doffe dreun. Een meisje, amper achttien, ligt uitgestrekt op de koude vloer. Rillend, tandenklapper…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 32. Vriend rijdt onder invloed van alcohol

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_02` |
| **Titel (NL)** | Vriend rijdt onder invloed van alcohol |
| **Titel (EN)** | Friend drives under the influence of alcohol |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1047 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Vriend rijdt onder invloed van alcohol", reflecting: Sophie ziet met lede ogen hoe Tom, haar vriend, na een avondje drinken steevast achter het stuur kruipt. Angst knaagt aa…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 33. Buurman dumpt afval in het park

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_03` |
| **Titel (NL)** | Buurman dumpt afval in het park |
| **Titel (EN)** | Neighbour dumps rubbish in the park |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1081 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Buurman dumpt afval in het park", reflecting: David ziet met groeiende ergernis hoe meneer Bakker, zijn buurman, het park als vuilstortplaats gebruikt. Het ooit zo gr…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 34. Vriend pleegt winkeldiefstal

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_04` |
| **Titel (NL)** | Vriend pleegt winkeldiefstal |
| **Titel (EN)** | Friend shoplifts |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1115 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Vriend pleegt winkeldiefstal", reflecting: Delano ziet hoe Mark, zijn vriend, stelselmatig winkels berooft. Angst bekruipt hem: arrestatie, een strafblad, de gevol…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 35. Buurvrouw laat kinderen vaak alleen thuis

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_05` |
| **Titel (NL)** | Buurvrouw laat kinderen vaak alleen thuis |
| **Titel (EN)** | Neighbour often leaves children home alone |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1149 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Buurvrouw laat kinderen vaak alleen thuis", reflecting: Emma's hart bonkt in haar keel. Mevrouw Jansen laat haar jonge kinderen weer alleen thuis, de deur klettert dicht. Klein…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 36. Vriend rijdt te hard en overtreedt verkeersregels

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_06` |
| **Titel (NL)** | Vriend rijdt te hard en overtreedt verkeersregels |
| **Titel (EN)** | Friend drives too fast and breaks traffic rules |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1183 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Vriend rijdt te hard en overtreedt verkeersregels", reflecting: Lisa maakt zich zorgen over Mark, haar vriend, die regelmatig te hard rijdt. Ze ziet hoe hij verkeersregels negeert en v…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 37. De gevonden portemonnee

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_07` |
| **Titel (NL)** | De gevonden portemonnee |
| **Titel (EN)** | The found wallet |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1217 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De gevonden portemonnee", reflecting: Op een verlaten bankje ligt een zware, leren portemonnee. Geld en een identiteitskaart staren je aan. Niemand in de buur…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 38. De roddelende vriend

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_08` |
| **Titel (NL)** | De roddelende vriend |
| **Titel (EN)** | The gossiping friend |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1251 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De roddelende vriend", reflecting: De muziek beukt, lichten flitsen, en dan hoor je het: je beste vriend verspreidt leugens over jullie vriendin. Pure rodd…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 39. Het geleende geld

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_09` |
| **Titel (NL)** | Het geleende geld |
| **Titel (EN)** | The borrowed money |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1285 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Het geleende geld", reflecting: Je was bijna klaar, maar onverwachte rekeningen gooiden roet in het eten. Nu zit je in de penarie. Je vriend, die je met…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 40. De gemanipuleerde online beoordeling

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_10` |
| **Titel (NL)** | De gemanipuleerde online beoordeling |
| **Titel (EN)** | The manipulated online review |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1319 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De gemanipuleerde online beoordeling", reflecting: De nieuwe koffiezaak pronkt met verdacht perfecte reviews. Vijf sterren, jubelende reacties, allemaal in een paar dagen.…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 41. Buurman mishandelt zijn vrouw

| Veld | Waarde |
|------|--------|
| **ID** | `GK_DL_11` |
| **Titel (NL)** | Buurman mishandelt zijn vrouw |
| **Titel (EN)** | Neighbour abuses his wife |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1353 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Buurman mishandelt zijn vrouw", reflecting: Emma is getuige van huiselijk geweld bij haar buurvrouw, mevrouw Janssen. Meneer Janssen mishandelt haar regelmatig, wat…, everyday life setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 42. Dertig minuten geleden

| Veld | Waarde |
|------|--------|
| **ID** | `GK_NM_01` |
| **Titel (NL)** | Dertig minuten geleden |
| **Titel (EN)** | Thirty Minutes Ago |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1387 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Dertig minuten geleden", reflecting: Sanne werpt een blik op het rooster voordat de deur opengaat. Kamer 3, volgende patiënt — longkanker, vanmorgen vastgest…, nuclear medicine clinical setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 43. De eerste die het vraagt

| Veld | Waarde |
|------|--------|
| **ID** | `GK_NM_02` |
| **Titel (NL)** | De eerste die het vraagt |
| **Titel (EN)** | The First Person Who Asks |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1422 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De eerste die het vraagt", reflecting: Meneer Verhoeven is achtentachtig en vandaag is het zijn eerste PET/CT sinds de diagnose. Erik roept hem binnen, legt de…, nuclear medicine clinical setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 44. Waar zij het voor ruilde

| Veld | Waarde |
|------|--------|
| **ID** | `GK_NM_03` |
| **Titel (NL)** | Waar zij het voor ruilde |
| **Titel (EN)** | What She Would Trade For |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1457 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Waar zij het voor ruilde", reflecting: Eva is elf en heeft weken over, geen maanden. De bloedmonsters zijn nog steeds nodig — om de cijfers te volgen die het t…, nuclear medicine clinical setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 45. Tussen de compressies

| Veld | Waarde |
|------|--------|
| **ID** | `GK_NM_04` |
| **Titel (NL)** | Tussen de compressies |
| **Titel (EN)** | Between Compressions |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1492 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Tussen de compressies", reflecting: De compressies stoppen voor niemand, zelfs niet voor een bloedafname. Tomas knielt naast de brancard en wacht op het hal…, nuclear medicine clinical setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 46. De volgorde van de namen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_RI_01` |
| **Titel (NL)** | De volgorde van de namen |
| **Titel (EN)** | The Order of Names |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1527 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De volgorde van de namen", reflecting: Lotte heeft veertien maanden aan dit artikel gewerkt — elk experiment, elke tabel, elke late avond waarin ze de discussi…, academic research integrity context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 47. De extra naam op de lijst

| Veld | Waarde |
|------|--------|
| **ID** | `GK_RI_02` |
| **Titel (NL)** | De extra naam op de lijst |
| **Titel (EN)** | The Extra Name on the List |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1562 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De extra naam op de lijst", reflecting: Het manuscript is klaar, gereviewd, geaccepteerd — tot er een e-mail binnenkomt van de uitgever. Een senior editor bij e…, academic research integrity context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 48. Hetzelfde resultaat, twee keer

| Veld | Waarde |
|------|--------|
| **ID** | `GK_RI_03` |
| **Titel (NL)** | Hetzelfde resultaat, twee keer |
| **Titel (EN)** | The Same Result, Twice |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1597 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Hetzelfde resultaat, twee keer", reflecting: Dr. Willemsens dataset van drie jaar geleden is solide — peer-reviewed, gepubliceerd, af. Maar de financieringscyclus sl…, academic research integrity context, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 49. De stille regel

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_01` |
| **Titel (NL)** | De stille regel |
| **Titel (EN)** | The unspoken rule |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1632 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De stille regel", reflecting: Meneer Van Dijk zet zijn koffie neer in de lerarenkamer als collega Tessa hem terzijde neemt. "Weet jij dat Smit en die…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 50. De lege stoel achterin

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_02` |
| **Titel (NL)** | De lege stoel achterin |
| **Titel (EN)** | The empty chair at the back |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1666 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De lege stoel achterin", reflecting: Mevrouw Peters ziet Ahmed vrijdagmiddag als laatste het klaslokaal verlaten, hoofd gebogen, rugzak dichtgeritst tegen zi…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 51. Het lijstje in de kantine

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_03` |
| **Titel (NL)** | Het lijstje in de kantine |
| **Titel (EN)** | The list in the staff room |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1700 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Het lijstje in de kantine", reflecting: Meneer Janssen zit dinsdagmiddag in de kantine met de cijferlijst van klas 4B open op zijn laptop. Hij vergelijkt het ha…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 52. Wat er blijft hangen

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_04` |
| **Titel (NL)** | Wat er blijft hangen |
| **Titel (EN)** | What stays behind |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1734 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Wat er blijft hangen", reflecting: Mevrouw Van der Meer staat woensdagochtend voor lokaal 1.14 als ze door de kier van de deur meneer Jansens stem hoort: e…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 53. De afwezige stoel

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_05` |
| **Titel (NL)** | De afwezige stoel |
| **Titel (EN)** | The absent seat |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1768 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "De afwezige stoel", reflecting: Mevrouw Visser noteert donderdagochtend de vierde afwezigheid van Kimberly deze maand in het absentiesysteem. Ze belt na…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 54. Tien minuten voor het assessment

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_06` |
| **Titel (NL)** | Tien minuten voor het assessment |
| **Titel (EN)** | Ten minutes before the assessment |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1802 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Tien minuten voor het assessment", reflecting: Om 08:50 uur staat Lisa huilend in de deuropening van het toetslokaal, tien minuten voor haar herkansing. Gisteravond ho…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 55. 5,3 op het scherm

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_07` |
| **Titel (NL)** | 5,3 op het scherm |
| **Titel (EN)** | 5.3 on the screen |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1836 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "5,3 op het scherm", reflecting: Meneer De Groot staart dinsdagmiddag naar het beoordelingssysteem: 5,3, onvoldoende. Het is de derde poging van student…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 56. Het rooster van meneer De Vries

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_08` |
| **Titel (NL)** | Het rooster van meneer De Vries |
| **Titel (EN)** | Mr De Vries's timetable |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1870 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Het rooster van meneer De Vries", reflecting: Mevrouw Jansen hoort het weer in de wandelgangen: leerlingen die klagen dat de lessen van meneer De Vries "een chaos" zi…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 57. Buiten de kalibratie

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_09` |
| **Titel (NL)** | Buiten de kalibratie |
| **Titel (EN)** | Outside calibration |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1904 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Buiten de kalibratie", reflecting: In de docentenkamer, vrijdag na schooltijd, ziet Marieke hoe collega Ruud voor de zoveelste keer een stapel werkstukken…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

### 58. Twee opstellen naast elkaar

| Veld | Waarde |
|------|--------|
| **ID** | `GK_OW_10` |
| **Titel (NL)** | Twee opstellen naast elkaar |
| **Titel (EN)** | Two essays side by side |
| **Modelstap** | Zien |
| **Databestand** | `src/data/gesprekskaarten/cards.json` |
| **Regelnummer** | 1938 (`assets.afbeelding`) |
| **Huidige waarde** | `null` |
| **Reden** | leeg/null/lege string |

**Adobe Firefly-prompt:**

```
A neutral inclusive scene inspired by "Twee opstellen naast elkaar", reflecting: Meneer Bakker zit donderdagmiddag na schooltijd met twee opstellen naast elkaar: dat van Lisa en dat van haar klasgenoot…, education and classroom setting, observant and attentive atmosphere, quietly noticing subtle moral tension, depicting the moral situation without identifiable persons or celebrities, no logos or brands, cinematic portrait photography, sharp subject focus, soft bokeh background, natural or dramatic lighting, high resolution, photorealistic, professional color grading, no text, no logos.
```

---

## Totaaltelling

**58 van de 58 gesprekskaarten** missen een geldige afbeelding (0 kaarten met geldige afbeelding).
