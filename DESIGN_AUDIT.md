# Arçelik.com.tr — Design Audit

Live inspection of https://www.arcelik.com.tr/ at 1440 / 768 / 390 px, values
from `getComputedStyle`. Used to drive the design tokens for this project.
No source code, copy, or assets were taken from the reference.

## Typography

| Token | Value |
|---|---|
| Font family | **Sofia Sans**, Arial, sans-serif (Google Fonts) |
| Base body | 14px / line-height ~18px (≈1.28) / color `#222222` |
| Body large (product name, lead) | 18px / weight **400** / LH 24 |
| Section title (desktop) | **32px** / weight **900** / LH 37.8 (≈1.18) / letter-spacing normal |
| Section title (mobile ≤768) | **22px** / weight 900 / LH 26 |
| Card model code / eyebrow | 22px / 900 |
| Price | 18px / weight **900** |
| Nav link | 14px / weight **400** (regular, NOT bold) / `#222` |
| Button label | **12px / weight 900** / (uppercase) |

Takeaway: only **two** weights in play — 400 for running text & nav, **900**
for every heading, price and button. No 600/700 middle weight. Letter-spacing
is always `normal` (no tracked headings).

## Color

| Role | Value |
|---|---|
| Text / ink | `#222222` |
| Brand red | `#E4032E` (approx; CTA red) |
| Page background | `#ffffff` |
| Footer background | `#EEEEEE` |
| Neutral borders | light grey ~`#E6E6E6` |

## Container / grid

| Token | Value |
|---|---|
| Content max-width | **1360px** (`.container-max-1360`; 1392 incl. padding) |
| Side padding | **16px** at every breakpoint (1440 / 768 / 390 all 16px) |
| Hero / banner | full container width, edge-to-edge image, radius 0 |

## Header

| Breakpoint | Height | Behavior |
|---|---|---|
| 1440 | **68px**, white, position relative (not fixed at top) | logo left · text nav (Ürünler ▾ / Kampanyalar / Teknolojiler / Blog) · search field · account/util icons right |
| 768 | **50px** | collapses to hamburger + logo + icons |
| 390 | **50px** | hamburger + logo + icons |
| Below header | horizontal category tile strip: image tiles **180×70** (AR 2.57), radius 0, active item has a thick dark underline; strip is horizontally scrollable |

Nav links: 14px **regular**, `#222`, padding 16px horizontal / 8px vertical.

## Hero slider

| Breakpoint | Image | Aspect |
|---|---|---|
| 1440 | 1360 × 600 | 2.27 (wide) |
| 768 | 736 × 600 | ~1.23 |
| 390 | 358 × 600 | **0.60 (portrait)** — mobile hero is tall |

Radius 0, full-bleed within container. Slot height ~686 desktop. `margin-bottom: 16px`.
Dot pagination + prev/next chevrons.

## Buttons

| Token | Value |
|---|---|
| Height | **44px** |
| Padding-inline | ~50px (generous) |
| Radius | 22px → fully pill at this height |
| Font | 12px / weight 900 / uppercase |
| Variants | solid red (primary), solid white w/ dark text, outline |

Buttons are the **only** pill-shaped element. Everything else is square.

## Cards (product / campaign)

- Border-radius on images and card containers: **0–5px** (essentially square).
- Card = image (square-ish, ~1:1 to 4:3) + model code (22/900) + name
  (18/400) + price (18/900) + pill CTA.
- Minimal or no shadow; separation via whitespace and 1px borders.
- Grid: 4-up desktop, 2-up tablet, 1–2-up mobile, gap ~16–24px.

## Sections / vertical rhythm

- Content assembled from full-width CMS slots; no uniform section padding class.
- Effective spacing between major blocks ≈ **60px** desktop; tighter on mobile.
- Promo banner block ≈ 327px tall, full container width.

## Footer

- Background `#EEEEEE`, text `#222`, 14px.
- Tall (link columns + newsletter + legal row + social).

## Responsive breakpoints (observed)

| BP | Change |
|---|---|
| ~1024 | desktop nav → hamburger; header 68→50 |
| ~768 | grid 4→2; hero wide→square |
| ~480 | grid →1–2; hero →portrait |

---

## Corrections applied to this project after the audit

1. **De-round everything.** Card radius 18px → 6px; card image radius 12px → 2px.
   Only buttons stay pill.
2. **Nav links → regular weight** (were bold).
3. **Two-weight type system**: 400 body / 900 headings, prices, buttons. Drop
   600/700 usage. Remove tracked/letter-spaced headings.
4. **Container 1328 → 1360**, side padding unified to **16px** (24px ≥1280 kept
   for breathing room — single deliberate deviation).
5. **Header height 76 → 68** desktop, **64 → 56** mobile.
6. **Section titles**: 32px desktop / 22px mobile, weight 900, LH ~1.15.
7. **Button labels**: 12px / 900 / uppercase.
8. **Footer background** → `#EEEEEE`.
9. **Hero**: 600px desktop; portrait crop on mobile.
