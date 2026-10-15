# Krushna's Heaven — shipped interface system

This file describes the current implementation. `INTENT.md` remains the only source for product intent, research, facts, approvals and future plans.

> **Update, 15 October 2026:** the homepage now follows the qissa.co.uk flow (`FIXES.md`, R01–R16). In short: the home order is hero → signatures → flavour band → gallery → story → menu highlights → visit. The home header condenses into a dark glass bar. Every page uses a three-line menu button whose overlay opens as a circle. The signatures and gallery share a night field (`--night`) with drifting café lights. The gallery has a photo opener, a masonry grid with 1s fade-up reveals and hover captions, a Follow line and a closing card. Round 3 (G01–G06): the homepage gallery is now a moving photo reel (`src/gallery-reel.ts`) with "View the full gallery", and the full grid lives on `gallery.html`. Round 4 (M01–M19): the menu page is a dark "carte" built by `scripts/build-menu.cjs` and enhanced by `src/menu-page.ts`, and the home order is now hero → signatures → moving photos → flavour band → explore the menu → feast band → dish stories → story → visit. Where this file disagrees, `FIXES.md` and `src/site.css` ("Reference flow", "Round 3" and "Round 4" blocks) are current.

## Current delivery: Phase 2

The shipped static interface covers four public routes:

- `index.html` — responsive seven-second preparation-film hero and five-experience homepage.
- `menu.html` — category shell with selected verified examples.
- `story.html` — parent-brand and franchise relationship shell.
- `visit.html` — locality-level visit shell with provisional business details.

The advanced five-chapter scroll journey, complete menu, live directions and broader page-level GSAP choreography remain later phases.

## Brand hierarchy

Krushna's Heaven is always the primary brand. The five experiences appear in this order: Premium Gelatos, Woodfire Pizza, Brews, Waffles, Savoury Bites. Mr Gelato appears only inside the Premium Gelatos context.

## Tokens

The canonical runtime tokens live in `src/site.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--ivory` | `#fff8ed` | main reading surface |
| `--paper` | `#f7eee2` | secondary light surface |
| `--paper-deep` | `#eadbc9` | image placeholder and soft contrast |
| `--raspberry` | `#cf1554` | primary action and brand accent |
| `--raspberry-deep` | `#a40e3f` | text accent and hover state |
| `--wine` | `#4b121c` | cinematic section field |
| `--wine-soft` | `#6f2632` | secondary dark tone |
| `--espresso` | `#2a1713` | primary text and footer |
| `--cocoa` | `#4c332a` | secondary dark neutral |
| `--amber` | `#d5a35d` | restrained chapter detail |
| `--line` | `#ddcbb8` | light-surface rule |
| `--line-dark` | `#7e4e4f` | dark-surface rule |
| `--muted` | `#765e52` | supporting text |
| `--white` | `#fffdfa` | high-contrast text |
| `--focus` | `#157b78` | keyboard focus ring |

The palette comes from Krushna's pink identity, warm café interiors and the approved premium references. Ivory is used as a brand surface rather than a generic neutral: it always pairs with raspberry, wine, editorial type and warm food photography.

## Typography

- Display: self-hosted Fraunces from `assets/krushna/fraunces.ttf`.
- Interface and body: self-hosted Karla from `assets/krushna/karla.ttf`.
- Hero and page headings use tight tracking, balanced wrapping and fluid sizes.
- Labels use Karla, uppercase treatment and wide tracking.
- Menu item names use Fraunces; prices and metadata use Karla.
- Body copy stays near 1rem–1.25rem with readable line lengths.

The production font files are bundled locally. There is no runtime font dependency.

## Layout

- Maximum content width: `90rem`.
- Horizontal gutter: `clamp(1.25rem, 4vw, 4.75rem)`.
- Section spacing: `clamp(5rem, 9vw, 9rem)`.
- Primary breakpoints: `68rem`, `56.25rem`, and `40rem`.
- Desktop page heroes use a two-column copy/image split.
- Mobile page heroes stack copy above media.
- The home hero uses `100svh`-safe sizing and retains readable live HTML over separate desktop and mobile film masters.
- Horizontal content rails use native overflow and scroll snapping on smaller screens.

## Component inventory

### Header and navigation

- Home uses a fixed transparent-to-ivory header controlled by scroll state.
- Inner pages use a sticky ivory header.
- Desktop shows four primary links and one visit action.
- Smaller screens use a full-screen wine menu.
- The menu synchronises `aria-expanded`, `aria-hidden`, `inert`, Escape handling and focus restoration.

### Buttons

- Primary: raspberry fill with ivory text.
- Outline: transparent with current-colour border.
- Ivory: light fill for dark photographic fields.
- Buttons have visible keyboard focus, immediate active feedback and at least 44px target height.

### Homepage

- Poster-first cinematic hero with live heading, support copy, actions, pause control and timeline-synchronised five-category rail.
- Editorial story bridge with an arched image treatment.
- Full-width wine five-experience field.
- Asymmetric signature-food mosaic.
- Exterior-photo visit invitation.

### Inner pages

- Split page hero with optional circular handwritten seal.
- Sticky category rail on Menu.
- Editorial list rows for menu examples.
- Sticky story heading and image gallery.
- Franchise relationship split section.
- Visit facts, real café image and explicitly provisional map treatment.

### Footer

- Espresso field, four-column desktop layout and stacked mobile layout.
- External Instagram link is the only verified social destination.
- Provisional contact facts are shown as text, never active actions.

## Photography

- Food images use large crops, warm grading and limited decorative framing.
- The approved exterior and interior files anchor the café identity.
- Generated product imagery remains illustrative until the client approves production media.
- The hero poster is `assets/krushna/hero-poster.png`; later video must hand off from the same visual composition without moving the live text.

## Motion currently shipped

Phase 2 adds one deliberate hero motion system while preserving the restrained Phase 1 interactions:

- Header background and height transition on scroll.
- Mobile menu opacity and translate transition.
- Button press and hover feedback.
- Navigation underline and image-scale hover states behind fine-pointer media queries.
- Native horizontal scroll and scroll snapping on mobile.
- GSAP stages the header, masked headline lines, supporting copy, actions and category rail on homepage entry.
- The hero film crossfades over its poster only after media is ready, preventing a blank or flashing first frame.
- The film pauses when offscreen or when the tab is hidden; the visible pause/play control provides a direct override.
- The category counter, progress line and active card follow the current film chapter.
- Data Saver, effective 2G connections and reduced-motion preferences retain the static poster.
- All transitions collapse under `prefers-reduced-motion: reduce`.

ScrollTrigger, chapter pinning and broader page choreography have not been added to the final routes yet.

## Hero media delivery

- Editable source: `hero-film/`.
- Desktop: `assets/video/krushna-hero-desktop.webm` with MP4 fallback.
- Mobile: `assets/video/krushna-hero-mobile.webm` with MP4 fallback.
- Runtime source selection changes at `40rem` and retries MP4 when WebM fails.
- All four exports are silent, seven seconds long and under 1.7 MB each.
- These preparation clips are temporary licensed stock, tracked for replacement before production.

## Accessibility and mobile rules

- Skip link and semantic landmarks are present on every route.
- Every page has one primary heading.
- Meaningful images have alternative text; decorative hero media uses an empty alternative.
- Keyboard focus uses a high-contrast teal outline independent of brand pink.
- The full-screen menu removes hidden content from navigation with `inert`.
- Escape closes the menu and returns focus to the trigger.
- Viewports include `viewport-fit=cover`; full-height layouts use safe viewport units.
- Touch controls use `touch-action: manipulation`; horizontal rails keep vertical page scrolling available.
- Form controls retain 16px text on small screens.
- Hover-only effects are gated behind `(hover: hover) and (pointer: fine)`.

## Factual boundaries

- Wanwadi, Pune may be shown at locality level.
- The exact address, hours, phone, ordering links and live map stay provisional until owner confirmation.
- Only supplied item-level prices and labels may be displayed.
- Nutrition, health, reviews, awards and facility claims are withheld until verified.

## Build and source

- `src/site.css` compiles to `public/site.css`.
- `src/site.ts` bundles to `public/site.js`.
- `npm run build` performs TypeScript checking and minifies the production assets.
- All runtime URLs remain relative for GitHub Pages project-site deployment.
