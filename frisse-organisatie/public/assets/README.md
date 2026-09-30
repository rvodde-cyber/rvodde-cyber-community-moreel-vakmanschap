# Beeldmateriaal

De app draait volledig op de placeholders in deze map en op CSS-gradients; er is
geen enkel Firefly-beeld nodig om live te gaan. Wie een asset vervangt, hoeft
alleen het bestand te overschrijven — de bestandsnamen liggen vast.

**Belangrijk:** het klavertje op het resultaatscherm is géén afbeelding. Dat is
een levende component (`src/components/Leaf.jsx` + `Clover.jsx`) die reageert op
de scores. Vervang die nooit door een statisch beeld.

| # | Onderdeel | Bestand | Nu in gebruik | Firefly-prompt |
|---|---|---|---|---|
| 1 | Hero-achtergrond, 1920×1080 | `hero-bg.svg` | CSS-gradient in `src/index.css` (`body`) | *soft abstract background, pale off-white and mint gradient, subtle frosted glass shapes floating, minimal, airy, Apple keynote style, no text, no people* |
| 2 | Statisch klavertje, 512×512 | `clover-static.svg` | favicon + social share (`index.html`) | *minimal four-leaf clover icon, one leaf teal, one amber, one indigo, one coral, soft glassy highlight on each leaf, flat vector, white background, clean geometric style* |
| 3 | Hoekaccent stellingen, 200×200 | `droplet-accent.svg` | CSS-utility `.droplet-accent` | *tiny abstract glass droplet shape, pale teal and white, minimal, corner decoration, transparent background* |
| 4 | Achtergrond resultaat, 1600×1200 | `result-glow.svg` | CSS-utility `.result-glow` | *soft radial light glow, pale gradient from white to very light mint and amber, glassmorphism panel background, no objects, calm and premium feeling* |
| 5 | CTA-sectie, 800×600 | `cta-door.svg` | Lucide-icoon + lichtvlak in `screens/Result.jsx` | *minimal illustration of an open door with soft light coming through, pale color palette, glass and light textures, no people, abstract, premium editorial style* |
| 6 | PDF-kopregel, 2100×300 | `pdf-header.svg` | native getekend in `src/lib/pdf.js` (scherper dan een afbeelding) | *minimal header banner, pale gradient, small abstract four-leaf clover mark in corner, clean corporate but warm, no text* |

Genereer in Adobe Firefly met stijl *Photo* uit, richting *Illustratie* of
*Vector*, licht/wit palet.

## Alt-teksten

Functioneel beschrijven, niet decoratief:

- Assets 1, 3, 4 en de gloedvlakken zijn puur decoratief → `alt=""` of
  `aria-hidden="true"`, zodat schermlezers ze overslaan.
- Asset 2 (statisch klavertje) → beschrijvende `alt`/`<title>`, want het staat
  voor het merk.
- Asset 5 → beschrijvende `alt`, het beeld ondersteunt de doorverwijzing.
- Het levende klavertje krijgt per blad een dynamische `aria-label` met de naam
  van het domein plus de kwalitatieve stand ("Team & Samenwerking: vraagt
  aandacht") — nooit het cijfer, conform de "geen rapportcijfer"-lijn uit §6.
