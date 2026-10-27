# Portretprompts (Firefly) voor PERSONEN

Gekozen stijl: gestileerd illustratieportret, één rustige stijl voor alle personen. Vierkant 1:1, export 512 × 512 WebP naar `public/portretten/<slug>.webp`. Leeftijden zijn die uit het ontwerpdocument.

## Gedeelde stijlregel (in elke prompt plakken)

Stijl: warm, rustig gestileerd illustratieportret in gouache-achtige vlakken, zachte contouren, gedempt palet, neutrale effen achtergrond in lichtgrijs-blauw, borstbeeld, rustig frontaal, ontspannen neutrale blik, geen tekst, geen logo, geen watermerk, geen realistische fotostijl.

## Per persoon

| Bestand | Prompt (aanvullend op de stijlregel) |
| --- | --- |
| `harrie.webp` | Man van 71, bedrijfsoprichter, grijs kortgeknipt haar, werkjas over overhemd, vermoeide maar warme blik, handen van een vakman. |
| `marco.webp` | Man van 46, directeur, verzorgd kort haar, hemd zonder das, alert en wat gespannen blik, laptoptas over de schouder. |
| `erik.webp` | Man van 49, zakelijk adviseur, nette blazer, vriendelijke zelfverzekerde blik, tablet in de hand. Niet als schurk of sluwe figuur weergeven. |
| `ans.webp` | Vrouw van 57, ploegleider in een productiehal, praktische werkkleding met veiligheidsvest, nuchtere en betrokken blik. |
| `joost.webp` | Man van 52, ondernemingsraadvoorzitter, casual colbert, open en aandachtige blik, notitieblok in de hand. |

Aanvullend (nodig voor berichten): `dennis.webp` man van 39, financieel/operationeel manager; `yasmin.webp` vrouw van 29, medewerker in de assemblage; `piotr.webp` man van 34, medewerker in de assemblage. Geef geen enkele rol een vaste achtergrond-aanduiding; laat herkomst buiten de prompt.

## Controle na generatie

1. Zijn de portretten onderling even prominent en even warm uitgewerkt?
2. Is geen rol visueel aan één achtergrond gekoppeld en is Erik niet als schurk getekend?
3. Past de leeftijd bij het ontwerpdocument?
4. Alt-tekst beschrijft de rol, niet het uiterlijk.

Bron: Bianchi, F., Kalluri, P., Durmus, E., Ladhak, F., Cheng, M., Nozza, D., Hashimoto, T., Jurafsky, D., Zou, J., & Caliskan, A. (2023). Easily accessible text-to-image generation amplifies demographic stereotypes at large scale. In *Proceedings of the 2023 ACM Conference on Fairness, Accountability, and Transparency* (pp. 1493–1504). ACM. https://doi.org/10.1145/3593013.3594095
