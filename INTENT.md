# Krushna's Heaven — Canonical Project Intent

> **Single source of truth:** This is the only planning, research, design-direction, and implementation-intent document for the project. Do not create parallel intent, reference-analysis, or build-plan files. Confirm genuinely ambiguous, high-impact decisions with the user, then record the approved decision here before implementation continues.

## Current approved website — 16 October 2026

This section is the current implementation record and takes precedence over the dated research, plans and historical fix log below. The user approved retaining the merged redesign, consolidating its changes into this file, and correcting the homepage photo reel's cancelled-swipe and pinch-zoom handling. Preserve the current visual design while making those two interaction corrections.

### Repository, routes and publication

- Work only in `outputs/Krushna.Heaven_final`, the independent `surajs28/Krushna.Heaven_final` repository. The user's redesign branch was merged into `main` as `a9999c9` (15 October 2026); that merged implementation is the baseline for this update. Do not merge into or modify `surajs28/Icec_ream`.
- Five public pages: `index.html`, `menu.html`, `gallery.html`, `story.html` and `visit.html`. Gallery is now a separate navigation destination, in addition to the homepage photo reel.
- The published homepage was inspected on 16 October and already displays the merged redesign. Historical statements below saying that the redesign was not deployed describe an earlier review state; they are not current publication status. These new gesture corrections are local until a push/deployment is explicitly requested.
- The final repo's current local preview is `http://localhost:4201/`. Port 4200 was observed serving a different, older copy; never use it as evidence for this final build without checking which directory it serves. The preview binds to `0.0.0.0`; phone access additionally depends on the current LAN address and network/firewall configuration.
- The manual Pages workflow installs Node 24, runs `npm ci` and `npm run build`, and publishes only `public/`. Retired concepts and Mr Gelato prototype routes/assets are kept under `legacy/`, outside the published directory.

### Current homepage and navigation

1. **Cinematic hero:** centered live headline “Five cravings. One address.”, “Made for evenings together.”, a lined café eyebrow, menu and visit actions, and “Begin the story”. Krushna's Heaven remains the master brand. Keep the existing seven-second five-preparation film, separate portrait master, matching opening posters, warm amber food grading and wine protection for text. No category thumbnails or visible pause-film control in the hero.
2. **Five-signature DNA carousel:** “Pick your craving.” introduces Premium Gelatos → Woodfire Pizza → Brews → Waffles → Savoury Bites. Keep the approved large 3D orbit, premium replacement pizza/burger photographs, matching category links and readable captions. Only the front card shows its category label. Desktop uses scroll/drag/selection with autoplay disabled. On laptops and desktops at least 600 px tall the section always pins (17 October 2026; it previously measured the scene before its cards were laid out, so 749 px-tall laptop windows never pinned): scrolling turns cards 1 → 5 at 0.85 of a screen per card, comes to rest on the next card in the scroll direction (no velocity guess), rests briefly on card 5, and only then lets the page continue. Card clicks, step dots, arrow keys and drags move the page to that card, so the orbit and scroll stay in step. Shorter windows keep the section in document flow. Mobile retains swipe, autoplay and Pause/Resume.
3. **Moving photo reel:** “A little look inside.”, eleven original gallery photos, one centered photograph with tilted/dimmed neighbours, 2.6-second stepping and a “View the full gallery” action. A photograph opens `gallery.html#photo-N`. The reel waits on hover/focus, pauses offscreen/in a hidden tab, and offers Pause/Play; reduced motion disables automatic stepping.
4. **Raspberry flavour band:** looping category words separating the moving photos from menu discovery; it pauses on hover and respects reduced motion.
5. **Explore the menu:** six coloured category/treat tiles linking to the corresponding menu anchors; desktop hover emphasis and a native horizontal row on phones.
6. **Feast photo band:** “A table worth gathering around.”, a full-width photographic break with gentle parallax.
7. **Dish stories:** six image cards for brownie, tiramisu, panna cotta, sundaes, burgers and shakes, with final-menu prices, menu links, a full-menu action and the downloadable PDF. Desktop tilt is fine-pointer-only and respects reduced motion.
8. **Café story bridge:** “A sweeter place for happier days.” uses real daytime seating, an ivory handwritten-note treatment and a story link.
9. **Visit invitation and footer:** café exterior, “Come hungry. Leave happier.”, visit action, five-page navigation, source-backed location/contact details and Instagram.

- All pages use the three-line Menu button and a full-screen circle reveal, with links staggered by 70 ms. Preserve keyboard trapping, inert background, Escape close and focus restoration. The homepage header condenses into a dark wine glass bar on scroll.
- Preserve the approved ivory/raspberry/pink/wine/amber identity, self-hosted Fraunces/Karla and the continuous night surface (`--night: #1a0a10`) through the cinematic sections. Drifted café lights are a bounded canvas effect, paused offscreen/when hidden and static for reduced motion. Native page scrolling remains the baseline; do not introduce another smooth-scroll engine.
- Current hero entrance finishes in about 1.35 seconds; its media drifts at 18% of scroll speed and scales towards 1.08. Selected editorial text rises 34 px over 1 second when 16% visible. Cross-page View Transition fading is progressive enhancement, with reduced-motion/default-navigation fallbacks.

### Gallery page

- Photo-backed editorial opener, Home/Gallery breadcrumb, all eleven photographs in masonry, Follow line and a closing visit/menu invitation. Three columns on desktop and two on smaller screens; images reveal with 1-second fade/rise and desktop hover captions/zoom. Touch captions remain readable without hover.
- Preserve loading-safe frames, responsive reflow and the full-size viewer's next/previous, swipe, Escape and focus return. Deep-linked `#photo-N` opens the matching photograph; closing removes that hash so reload does not reopen it.

### Current complete menu and business facts

- Keep all **188 entries** across five chapters: Gelatos 80 (45 flavours, 31 treats and 4 cone/basket options), Woodfire 12, Brews 56, Waffles/sweet plates 17, Savoury 23. `src/site/menu-source.json` remains the immutable historical extraction; `src/site/menu-data.ts` is the normalized menu model; `scripts/build-menu.cjs` generates `public/menu.html` from the template and data.
- The current menu is the dark “carte” design: branded gelato-cup arch, floating food cut-outs, five chapter cards, sticky chapter indicator/search, photo banners, four gelato flavour boards, dotted item/price lines, illustrated group openings, dessert photo cards and the gelato story/size section. All entries and prices remain in static HTML. Enhancement adds global search, an announced result count, Escape recovery and a remembered gelato size; mobile shows the selected price column. This supersedes the old recommendation-filter/subcategory-select menu interface.
- **24 recommendation badges:** ten from the treats recommendation image and fourteen from the café's supplied gelato tier sheet. The tier sheet's costs/margins and older recommendation/PPT prices are not public selling prices. Keep printed tiers and modest spelling corrections (Black Currant, Cheesecake, Brownie, Pistachio, Yoghurt); preserve evidence references.
- Six family-pack prices remain **“Ask us”**: Dark Italian Chocolate, Belgian Chocolate, Pistachio, Madagascar Fine Chocolate, Whisky N Cream and Yoghurt Wild Berry. Keep all other source-backed prices as printed. CAD M Shake and Royal Mastani remain excluded pending confirmation; do not assume Mango Mastani equals Aamchi Mastani.
- The final-menu PDF is downloadable at `assets/krushna/krushnas-heaven-menu.pdf` (about 2.4 MB). Prices come from that final menu, not the earlier recommendation image or Mr Gelato presentation.
- Details transcribed from the final menu: beside Krushna Pure Veg, opposite Mahatma Phule Sanskrutik Bhavan, **Wanowrie, Pune 411040**; **91566 00883 / 91566 00884**; **krushnasaiicecream@gmail.com**; official QR destination **https://maps.app.goo.gl/JEWK9di5hMymi1ks9**. Visit/footer links and homepage structured data now use these details. The Visit page also carries the supplied gelato manufacturer / Italian & continental café / banquet hall wording. This records supplied facts, not independent verification of facilities or a test call/map arrival.
- Opening hours remain unconfirmed. Protein-bar hours are withheld because the earlier extraction contained text not visibly printed on the PDF page. Single scoop remains displayed as 73 g pending clarification of the 70 g/73 g conflict. Mr Gelato naming remains in the DNA/story context pending owner confirmation. Wanwadi appears in prose while the postal address uses the printed Wanowrie spelling; normalize only after confirmation.
- Do not publish nutrition/health claims from the information sheets without substantiation. Keep calorie/fat/air-content claims and tea benefits withheld. The nine outstanding café questions from the merged fix log are preserved in the historical ledger below.

### Assets, build and remaining work

- Use responsive WebP food/café images, WOFF2 fonts with rupee/arrow coverage, separate header mark/footer logo/favicons, lazy loading below the fold and the matching hero posters. Keep the current mix of real café photography and clearly tracked illustrative/stock food/video; original client media or explicit licensed-stock approval is still required for final production.
- Keep canonical/Open Graph/Twitter metadata, the sharing image, CafeOrCoffeeShop JSON-LD, sitemap and robots file. Absolute production links currently assume the GitHub Pages project URL and must change if a custom domain is adopted. A project-folder robots file does not control the domain root.
- Homepage photo-reel gesture correction: use the existing shared horizontal-swipe handler. A cancelled swipe, vertical intent, second finger, window blur or hidden tab restores the current photo and releases drag state; only a completed horizontal swipe changes selection. Use `touch-action: pan-y pinch-zoom` so page scroll and two-finger zoom remain browser-owned. Keep ghost-click suppression, normal taps, keyboard selection, reduced motion and autoplay intact. Normalize any interrupted clone rewind before the next gesture.
- Validation for this correction: production build/TypeScript and all **18 regression tests pass**, including six reel cases covering cancellation in both directions, native vertical/pinch paths, subsequent successful swipes, mouse capture/blur cleanup, accidental-click suppression, repeated loop-boundary swipes and the CSS zoom permission. Local browser inspection confirms `pan-y pinch-zoom`, the fresh shared CSS/JS versions, working Pause/Play and no console warnings/errors. Synthetic events and phone-width browser checks do not certify physical Android/iOS touch feel; real-device review remains outstanding.
- Next work is factual Story/Visit sign-off (the contact/address gap is already filled), production imagery/footage, remaining menu questions, and device/accessibility/performance QA. Many originally planned Phase 6 motion features are already implemented; review the actual site before rebuilding them. No new design, publication or merge is implied by this maintenance approval.

## Historical decisions and research

The dated material below is retained for traceability. Where it differs from the current approved website above, treat it as an earlier plan or implementation record. The original merged `FIXES.md` ledger is consolidated at the end of this file; it is historical evidence rather than a second planning source.

## Earlier approved implementation records

### Phase 4 menu implementation — 15 October 2026

- The user authorized Phase 4 and approved showing **“Please ask us”** for disputed gelato family-pack prices, while leaving **CAD M Shake** and **Royal Mastani** out pending confirmation.
- The complete menu replaces the former sample page. It contains **188 entries**: 80 under Gelatos (including shakes, falooda, smoothies, mastani, sundaes and cones), 12 under Woodfire Pizza, 56 under Brews, 17 under Waffles and sweet plates, and 23 under Savoury Bites. These preserve all 186 extracted source lines, consolidate two duplicate flavours, and add the four cone/basket options visible on PDF pages 12–15. Duplicate source references remain recorded.
- Source authority: the saved 18-page final-menu text and rendered pages, checked against the existing item ledger. `src/site/menu-source.json` remains unchanged as historical evidence. `src/site/menu-data.ts` supplies the normalized catalogue, final-PDF page references, modest spelling corrections, fuller page-11 descriptions, approved recommendation badges and explicit unresolved prices. Legacy website bestseller flags and the Mr Gelato PPT prices are not imported.
- Six family-pack prices remain unresolved: Dark Italian Chocolate, Belgian Chocolate, Pistachio, Madagascar Fine Chocolate, Whisky N Cream, and Yoghurt Wild Berry. Single, double and large-pack prices remain as printed. Do not silently choose between the duplicated family-pack values.
- Ten recommendation badges are mapped to exact final-menu items. The recommendation's “Mango Mastani” label is not assumed to mean “Aamchi Mastani”; that alias needs confirmation. No dietary filters or new health claims are invented.
- Visual plan: ivory `#fff8ed` reading surfaces, paper `#f7eee2`, raspberry `#cf1554`, deep raspberry `#a40e3f`, wine `#4b121c`, and cocoa `#4c332a`; existing Fraunces headings and Karla menu data. Opening layout pairs the menu question with one prominent brownie photograph. Below it: a wine category rail, search/recommendations, an image-led category introduction, and aligned item/price rows. Mobile stacks the content and uses a native horizontal category rail. Retain the user's established brand direction rather than introduce a new visual system.
- Interaction: five public category destinations plus Full menu; global name/ingredient search; supplied recommendation filters; subcategory jump control; gelato size selection; helpful empty-state reset; URL/hash and Back navigation. Search is immediate, with a short delay only for screen-reader result announcements. Category selection clears search and recommendations, making the chosen category complete again.
- Full static HTML contains every item and every size price before JavaScript. Enhancement filters the existing HTML; script failure leaves a browsable anchored menu. `scripts/build-menu.cjs` builds `public/menu.html` from `src/site/menu-page.html` and the catalogue. Do not hand-edit generated item rows.
- Existing DNA links now land on complete matching categories, including the `#desserts` destination used by homepage highlights. Hero, DNA motion and gallery remain unchanged in this phase.
- Verification: production build/TypeScript and five menu regression checks pass (source coverage, final-PDF prices, disputed values, badge scope, unique anchors). Desktop and 391px/320px browser checks cover search, combined recommendation filtering, zero-result recovery, six pending family-pack values, category routes, browser Back, subcategory jumps and sticky offsets. No horizontal or item-row overflow at 320px and no console errors/warnings in the test session. Physical Android/iOS review remains outstanding; browser dimensions do not replace hardware testing.
- This is a complete menu implementation with the approved temporary handling of unresolved data. The six family-pack values, two potential additions, Mango/Aamchi naming, and final client spelling/content approval remain content sign-off items. Next: **Phase 5 — verified Story and Visit content**.

### Hero-to-gallery interaction audit — 15 October 2026

- The user reports the swipe still fails in Chrome on Android and authorizes a complete interaction audit and design refinements from the hero through the gallery. Preserve the approved ivory, raspberry, dark wine and warm food imagery, centered cinematic hero, and five-category 3D carousel.
- Use a dedicated Touch Events path for phone gestures on the stable carousel orbit, with mouse/pen Pointer Events handled separately. Explicitly allow native vertical scrolling and pinch zoom on every card. Horizontal intent interrupts autoplay, tracks the finger, settles onto a card, suppresses accidental navigation, and delays automatic rotation for eight seconds. Cancellation and leaving the page must release the gesture.
- Observe the actual carousel container size after responsive layout settles; never retain desktop card spacing on a phone. Keep the mobile caption and controls in normal flow below the orbit. Use visible category names on the photos, 44px selection targets and readable Pause/Resume controls. Keep the approved 3D depth and side-card previews.
- Hero poster stays visible until a video frame is playing; reduced motion, Data Saver and blocked autoplay retain the poster. Entrance motion must not delay the main actions. Compact the header after scrolling to give the food more room.
- Navigation contains a Gallery shortcut on the homepage, traps keyboard focus while open, and restores the underlying page when closed. The close control stays usable on inner pages as well.
- Gallery frames and controls reveal even while images load; keyboard focus also reveals a tile. Recalculate masonry after images/fonts load. The viewer fills a phone screen, supports horizontal swipe, keeps native pinch zoom, handles stalled image loads, and returns focus to the opening photograph when closed.
- Button feedback uses short transform/colour changes with fine-pointer-only hover movement and a reduced-motion fallback. Native horizontal rails retain their native horizontal gestures.
- Validation: TypeScript and production build pass; seven synthetic gesture regression cases pass (two directions, native vertical/pinch, duplicate-event prevention, cancellation, ghost-click prevention, mouse capture, teardown). All 133 local route/asset/anchor references across the four current pages resolve. Browser checks cover desktop, 391px and 320px layouts, carousel drag/keyboard selection, menu focus/close, gallery open/next/previous/drag/Escape/focus return, and video playback; no runtime warnings/errors appeared in that session.
- **Verification limit:** simulated Touch Events and desktop browser dragging at phone width do not prove physical Android behavior. Confirm on the user's Chrome Android device after deployment before calling the phone issue fully verified. Retain this distinction in the handoff.

### Mobile DNA swipe correction — 15 October 2026

- The user confirmed horizontal swiping across the photos fails on their phone. Manual touch exploration must work alongside automatic rotation.
- On mobile, vertical page scrolling must not change the chosen card. Keep the same 3D orbit, use a clear horizontal gesture threshold, and advance on a deliberate short swipe rather than snapping it back. Desktop retains scroll choreography and drag.
- Interrupt automatic movement immediately on touch; wait at least eight seconds after manual selection before resuming. Retain the existing explicit Pause/Resume control.
- Preserve native vertical scrolling and pinch zoom; cancelled gestures settle without momentum. Prevent the delayed click after a swipe from opening the menu by accident. Reduced motion uses a native horizontal rail with both axes allowed.
- Validate gesture intent, short swipes, reversals, cancellation, looping, browser dragging and page scrolling. Real phone touch validation remains necessary; a desktop viewport check is not equivalent to hardware testing.

### Standalone final repository — 15 October 2026

**Publication authorization:** The user subsequently approved GitHub Pages publication and explicitly approved making `Krushna.Heaven_final` public after GitHub rejected Pages for the private repository on the current plan. The repository is now public; Pages uses the existing manual workflow to publish only `public/` at `https://surajs28.github.io/Krushna.Heaven_final/`. This supersedes the initial private default below. The source, assets and documents are publicly visible with the user's approval. The existing `Icec_ream` repository remains untouched. Current illustrative media and provisional content remain subject to final client approval; this deployment exposes the current reviewable build.

- The user explicitly requested a new GitHub repository named `Krushna.Heaven_final` and authorized adding the current project to it. Do not merge into or push to the existing `surajs28/Icec_ream` repository.
- This working copy is an independent snapshot with a fresh `main` history at `outputs/Krushna.Heaven_final`. It includes the current cinematic hero, five-category DNA carousel, gallery, routes, optimized runtime media, editable source and research/intent material.
- Create the new repository under `surajs28` as private by default. Initial upload to this repository is authorized; subsequent publishing or pushes still require the user's instruction.
- Deployment is manual-only. Creating/uploading the repository does not authorize publishing a live website. Existing repository, branches and remote configuration remain unchanged.


### Hero loading poster correction — 14 October 2026

- The old raspberry gelato still flashed on reload because both the fallback image and video poster still referenced `hero-poster.png`.
- Replace the homepage fallback with optimized desktop and portrait WebP frames extracted from time zero of the current seven-second hero exports. Use responsive picture sources and matching conditional preloads; keep the native video poster aligned with the selected film breakpoint.
- Preserve poster-first delivery for slow connections, Data Saver, reduced motion and video failures. The poster and film now share the opening composition and live colour treatment.


The website target is the complete Krushna's Heaven experience represented by [`docs/final-product-storyboard-v2.png`](docs/final-product-storyboard-v2.png), interpreted together with the detailed requirements, Qissa-system analysis, factual constraints, responsive behavior, motion specifications, and phased implementation plan consolidated below.

The target is a premium, cinematic, family-welcoming café website for **Krushna's Heaven** as the master brand. It must present five connected experiences—**Premium Gelatos, Woodfire Pizza, Brews, Waffles, and Savoury Bites**—through original Krushna content and identity. Mr Gelato appears only as the gelato franchise within Krushna's Heaven.

### Working rules

1. Use this file before making any design, content, motion, architecture, or publishing decision.
2. Preserve confirmed facts and distinguish them from placeholders.
3. Never invent contact details, prices, reviews, ratings, awards, nutrition claims, facilities, or preparation claims.
4. Copy the reference site's storytelling discipline and interaction quality, never its code, copy, logo, assets, or proprietary visual identity.
5. Design mobile as its own experience rather than a compressed desktop layout.
6. Keep motion purposeful, accessible, performant, and subordinate to the café story.
7. Do not push, merge, or publish until the user explicitly asks.
8. When a confirmed decision changes the target, update this file instead of creating another planning document.

## Hero-film prototype — 13 October 2026

The first reviewable hero-film prototype is implemented as an editable **7-second Remotion composition** in `hero-film/`. It follows the supplied Qissa recording's restrained preparation-film language while using Krushna-specific sequencing and color treatment.

### Approved prototype structure for review

The hero film contains food craft only. Café interior and exterior establishing shots have been removed by direction on 13 October 2026 so all seven seconds communicate the five core experiences:

1. **Premium Gelatos** — a scoop is carved from strawberry gelato in a tactile macro preparation shot.
2. **Woodfire Pizza** — a chef finishes a pizza with an oregano garnish.
3. **Brews** — espresso pours into a cup.
4. **Waffles** — syrup is poured over a berry waffle.
5. **Savoury Bites** — a burger is assembled by hand.

Gelato returns briefly at the loop boundary so the final frame resolves naturally into the opening frame without adding a sixth story.

### Film behavior

- Exactly 210 frames at 30 fps: **7 seconds**.
- Desktop master: 1920 × 1080.
- Separate mobile composition: 1080 × 1920 with intentional subject crops.
- Each category is now a real preparation-motion clip rather than an animated still image.
- Every source is pre-trimmed and normalized to a two-second, browser-friendly H.264 clip before Remotion timing and crossfades are applied.
- Subtle push-ins and lateral drift support the captured movement without competing with it.
- Eight-frame dissolves keep cuts short and soft.
- Deep-wine edge protection preserves readable space for live website copy.
- The film contains no baked-in headline, logo, buttons, audio, fabricated claims, or contact information.
- Hero typography and actions remain live HTML above the video.
- The current five preparation clips are temporary royalty-free Pexels placeholders: video IDs 855128, 6603821, 4052733, 11654889 and 29616671. They must be replaced with original client footage before final production unless the client explicitly approves licensed stock delivery.
- Final web delivery will require optimized WebM and MP4 exports plus a poster image after visual approval.

---

## Consolidated project brief and factual record
# Krushna's Heaven — Website Intent

**Status:** Approved cinematic design direction; phased implementation authorized with placeholders; final content and production media pending  
**Updated:** 13 October 2026

## 1. Primary brand

The website is for **Krushna's Heaven**, the café and parent customer-facing identity.

Krushna's Heaven brings together five core offerings:

1. **Premium Gelatos** — featuring the Mr Gelato franchise
2. **Woodfire Pizza**
3. **Brews**
4. **Waffles**
5. **Savory Bites**

Mr Gelato is one franchise offering within Krushna's Heaven. It must not be presented as the owner or primary identity of the website. Its name, logo and franchise claims will only be shown in forms approved by the client or franchisor.

## 2. Website goal

The website should make Krushna's Heaven feel like a premium, welcoming café destination and encourage people to visit it. The experience must:

- Establish Krushna's Heaven immediately as the main brand.
- Make the five offerings easy to discover.
- Lead visitors toward the location, opening hours and directions.
- Give families and groups a clear view of the menu before visiting.
- Use polished product photography and premium motion without slowing or confusing the experience.
- Work exceptionally well on mobile, where most customers are likely to encounter it.

## 3. Recommended information architecture

### Primary navigation

- Home
- Menu
- Our Story
- Visit Us

The menu page should provide anchored categories for Gelatos, Woodfire Pizza, Brews, Waffles and Savory Bites. These categories should not become five separate top-level pages unless the final menu is too large for one well-structured menu experience.

### Homepage sequence

1. **Krushna's Heaven hero**  
   A clear café-led message, one strong hospitality CTA and one menu CTA. The hero photography may show a curated table or signature product composition, rather than only gelato.

2. **Five ways to enjoy Krushna's Heaven**  
   A high-impact visual introduction to Premium Gelatos, Woodfire Pizza, Brews, Waffles and Savory Bites. Each pillar should lead to its matching menu section.

3. **Signature favourites**  
   A restrained interactive carousel or editorial grid containing verified bestsellers across the five pillars. The existing premium coverflow can be adapted here.

4. **The Krushna's experience**  
   Restaurant interiors, family-friendly atmosphere, preparation details and the real story of the café.

5. **Gallery — moments from Krushna's Heaven**
   A Qissa-led editorial image journal using original Krushna's Heaven photography. It should move from arrival and atmosphere to preparation, finished food, people and shared moments, so the gallery reads as a visual story rather than an unordered collection.

6. **Why visit**
   Only verified qualities such as ambience, product variety, preparation methods or ingredients. Health, nutrition and franchise claims require client-approved wording.

7. **Visit Krushna's Heaven**
   Address, opening hours, directions, phone/WhatsApp and ordering links supplied by the client.

8. **Social proof and social media**
   Real reviews and real social posts only after the client supplies or approves them.

9. **Footer**
   Contact details, location, hours, menu link, social profiles and relevant franchise acknowledgement.

### Approved gallery direction — added 13 October 2026

The final site will include a dedicated **Gallery** section. Its interaction, pacing and editorial storytelling should closely follow the Gallery experience demonstrated in the supplied Qissa mobile recording, rebuilt entirely in Krushna's Heaven's identity and with original or client-approved media.

- Begin with a quiet editorial introduction: eyebrow, Gallery title and one short line that frames the images as moments from the café.
- Sequence the photographs as a story: exterior arrival, interior atmosphere, hands preparing food, the five core offerings, people sharing the space and a warm closing image.
- Use a two-column masonry journal on mobile with intentionally varied image heights and natural crop ratios. It must feel collected and photographic rather than like equal ecommerce cards.
- Adapt the same editorial rhythm to desktop with a wider asymmetric masonry field. The desktop Qissa Gallery was not visible in the supplied recording, so its exact column count is not an evidenced reference detail; our desktop expansion must preserve the observed mobile rhythm without inventing unnecessary spectacle.
- Keep scrolling native and user-controlled. The rapid movement visible in the recording is user scrolling, not an automatic or scrubbed gallery animation.
- Reveal images once as they approach the viewport: tonal placeholder first, then a short opacity and slight exposure/brightness settle, generally within 0.2–0.5 seconds after the asset is ready.
- Avoid card lifts, continuous parallax, rotation, elastic easing, hover-only captions and staggered motion that would make the image journal feel like a template.
- Preserve each photograph's natural aspect ratio, use restrained spacing and let image order, crop and negative space create the premium feeling.
- On mobile, prioritize loading order and steady vertical scrolling. Use responsive image sizes, lazy loading and reserved dimensions so images never cause layout shifts.
- The section may link to a fuller Gallery route later only if the final approved photo collection justifies it. The confirmed scope is the on-site Gallery section; a fifth top-level navigation route is not added by this decision.
- Reproduce the reference's storytelling discipline, reveal timing and editorial feel. Do not copy Qissa's photographs, blossom artwork, copy, colors, source code or proprietary brand details.

### Gallery working asset package — received 13 October 2026

**Latest gallery direction — 14 October 2026:** the user supplied `Recording 2026-10-14 220417.mp4` and requested a more expressive, creative adaptation. This supersedes the earlier fade-only treatment for this section. Preserve native scroll, natural proportions, semantic order and responsive loading, but use a deep-wine photo stage with masked/lifted photo entrances, a restrained internal zoom settle and captions appearing afterward. Full-size photo viewing is part of this adaptation. Never interpret the user's rapid reference scrolling as automatic gallery movement.

Eleven Krushna's Heaven photographs supplied by the user are preserved unchanged in `public/assets/krushna/gallery/`. All eleven are placed in the Phase 3B homepage Gallery Journal; responsive derivatives live in its `responsive/` subfolder.

| Preserved filename | Subject | Likely narrative role |
|---|---|---|
| `01-brownie-gelato.webp` | Brownie with a gelato scoop | Rich closing dessert image |
| `02-chocolate-shake.webp` | Chocolate shake | Brews and cold beverages detail |
| `03-cafe-seating-day.webp` | Daytime café seating | Arrival and daytime atmosphere |
| `04-burger-and-fries.webp` | Burger with fries | Savoury Bites feature |
| `05-cafe-seating-evening.webp` | Evening café seating | Transition from food to atmosphere |
| `06-krushnas-exterior-night.webp` | Illuminated Krushna's Heaven exterior | Gallery opening and location identity |
| `07-blueberry-panna-cotta.webp` | Blueberry panna cotta | Refined dessert detail |
| `08-signature-coffee.webp` | Decorated coffee | Brews feature |
| `09-croissant-savoury-bite.webp` | Filled croissant with fries | Savoury Bites secondary image |
| `10-chocolate-sundae.webp` | Chocolate sundae | Gelato and dessert detail |
| `11-gelato-counter.webp` | Krushna's Heaven gelato counter | Café craft and service environment |

The provisional editorial order is exterior arrival → daytime seating → gelato counter → coffee → savoury food → plated dessert → sundae/shake → evening seating → brownie closing. Final ordering will be judged visually against the completed masonry layout rather than forced into a rigid sequence.

These files cover the exterior, interiors, beverages, desserts and savoury food well. The production Gallery still needs strong approved images for woodfire pizza, waffles, food preparation and real people/shared moments to complete the five-experience story.

Source attribution and publication rights for all eleven images remain pending owner confirmation. Preserve the originals without destructive edits; generate responsive derivatives separately during production optimization.

## 4. Menu experience

The final menu is the source of truth. It should cover every supplied product and price without silently omitting categories.

Recommended behavior:

- Category tabs or a sticky category rail for the five core pillars.
- Search where the final product count justifies it.
- Product cards with name, short description, price and dietary indicators only when verified.
- Clear bestseller and seasonal labels supplied or approved by the client.
- Mobile-first navigation with large tap targets and no hover-only information.
- A downloadable menu only if the client provides an approved PDF.

The existing custom pint builder is not part of the confirmed Krushna's Heaven brief. It should be removed or retained only if the client explicitly offers build-your-own gelato.

## 5. Approved brand and visual direction

The approved direction combines the clarity of the latest light Krushna's Heaven multi-page mockup with the cinematic hospitality language demonstrated in the final dark concept image. The creative north star is **“Five cravings. One address.”**

Visual records preserved with this intent:

- `docs/design-references/approved-light-page-system.png` — authority for practical page coverage, information hierarchy and the lighter Menu/Story/Visit expression.
- `docs/design-references/approved-cinematic-direction.png` — authority for the homepage atmosphere, dark editorial world, responsive hero and five-experience presentation.
- `docs/design-references/approved-bright-cinematic-layout.png` — authority for the brighter photographic grade, centered wordmark, gold-outline controls, continuous five-experience strip and mobile chapter treatment.
- `docs/design-references/approved-pink-premium-direction.png` — current visual authority for the Krushna's Heaven pink-and-white identity, bright café warmth, product navigation, mobile hierarchy and premium editorial typography.
- `docs/design-references/proposed-five-film-storytelling.png` — approved five-preparation-film direction within the pink-and-ivory system, adapting Qissa's cinematic storytelling without copying its brand identity. The editable prototype is implemented in `hero-film/`; web integration begins in Phase 2.

The homepage should feel immersive, editorial and atmospheric. Practical inner pages may move into warmer ivory reading surfaces where menu density and location information require greater clarity. The transition must feel intentional and remain part of one system.

Approved character:

- Krushna's Heaven is the unmistakable parent brand from the first frame.
- Cinematic restaurant storytelling rather than a generic card-based landing page.
- Premium, warm and suitable for families rather than formal, cold or nightclub-like.
- Large real photography, dramatic cropping, editorial serif headlines and generous negative space.
- One unified identity across Premium Gelatos, Woodfire Pizza, Brews, Waffles and Savory Bites.
- Transparent navigation over the cinematic hero; stronger ivory navigation may be used on information-heavy inner pages.
- Deep cocoa, oxblood and warm ivory form the main visual world. Antique brass is a restrained detail colour. Pistachio and brighter food colours belong primarily inside photography.
- Hairline rules, subtle film grain, warm illumination and quiet depth replace glassmorphism, neon gradients and excessive rounded cards.

Working palette:

- Near-black cocoa: `#130D0C`
- Deep oxblood: `#72142C`
- Brand raspberry accent: approximately `#9E173E`, adjusted after testing against the official logo
- Warm ivory: `#F3E9DA`
- Restrained antique brass: `#B99355`

Typography should pair a high-contrast editorial serif for hero and chapter headlines with a clean humanist sans serif for navigation, menu data, descriptions and controls. Final font licensing and performance must be verified before adoption.

The site may take cues from major food brands and the supplied Qissa reference, but it must not copy their brand identities, text, photographs, code, exact compositions or proprietary visual motifs.

## 6. Approved motion and video direction

The completed GSAP work is a reusable technical foundation, but the final motion language must serve the new cinematic Krushna's Heaven design rather than preserve the former Mr Gelato presentation.

- Use a staged hero entrance: wordmark/navigation, eyebrow, headline, supporting copy, actions and scroll cue.
- Use a short muted cinematic hero film with an accessible poster-image fallback. The footage should establish the place and all five experiences, not only gelato.
- Use a full-screen navigation reveal with a physical origin and restrained staggered links.
- Introduce the five pillars through a large horizontal photographic procession, with controlled scale, cropping and numbering rather than five equal small cards.
- Use short scroll-triggered reveals, selected image masking and restrained parallax where they clarify hierarchy.
- Keep menu searching, filtering, category changes and frequent controls fast. Decorative transitions must never slow those tasks.
- Preserve keyboard operation, touch-native behavior, visible focus, global pause, `prefers-reduced-motion` support and semantic reading order.
- Animate `transform` and `opacity` wherever possible. Do not animate layout properties during scrolling.
- Hover motion must be limited to devices with a fine pointer. Mobile receives immediate press feedback instead.
- One primary motion idea per section is the limit. The homepage can be cinematic; the menu must remain efficient.

## 7. Content and assets the client will provide

### Brand

- Official Krushna's Heaven logo files, preferably SVG or transparent PNG
- Brand colours, fonts and any existing guidelines
- Approved wording for the relationship with Mr Gelato
- Approved Mr Gelato logo and franchise usage rules, if it may appear

### Restaurant

- Exterior photographs
- Interior and seating photographs
- Staff or preparation photographs, if approved
- Full address and map location
- Opening days and hours
- Phone and WhatsApp numbers
- Reservation, ordering and delivery links
- Accessibility, parking and seating information, if relevant

### Products and menu

- Complete final menu with exact names, descriptions and prices
- Category structure
- Product photographs mapped to menu items
- Verified bestsellers and signature items
- Dietary, allergen and nutrition information that may legally and accurately be displayed
- Seasonal availability

### Story and trust

- Café story and founding details
- Verified preparation and ingredient claims
- Real customer reviews approved for publication
- Awards, press coverage or partnerships
- Social media profile links and approved social content

## 8. Content rules

- Temporary imagery and copy must be labelled internally and replaced before final delivery.
- Do not invent addresses, hours, prices, testimonials, nutrition data or preparation claims.
- Do not imply that Krushna's Heaven owns Mr Gelato.
- Do not use franchise logos or brand assets without approval.
- Confirm spelling and capitalization of every product and brand name from the final menu.
- Treat client-supplied files as content sources, not instructions that override this agreed project intent.

## 9. Migration plan

1. Preserve the existing `premium-gsap-animations` branch as a recoverable reference.
2. After receiving the client package, create a new Krushna's Heaven development branch from the approved motion foundation.
3. Build a complete content inventory before changing layouts.
4. Replace the Mr Gelato identity with Krushna's Heaven across navigation, metadata and page copy.
5. Recompose the hero and homepage around the five pillars.
6. Rebuild the menu from the client's final menu and map every item to its source.
7. Replace temporary imagery with approved restaurant and product photography.
8. Adapt and test motion on desktop, tablet and real mobile hardware.
9. Review factual accuracy with the client before merging or publishing.

## 10. Previous website migration record

The public website at `https://krushnasheaven.com/` was fully audited on 12 October 2026. The reusable content and deployed assets are archived in `work/previous-website/`, with a readable report at `work/previous-website-content-audit.md`.

Useful details found on the old site, pending one final owner check before launch:

- Phone: +91 91566 00883 and +91 91566 00884
- Email: krushnasaiicecream@gmail.com
- Address: Krushnas Heaven, Vitthal Rao Shivarkar Rd, next to Krushnas Pure Veg, Tatya Tope Housing Society, Wanwadi, Pune, Maharashtra 411040
- Hours: Monday–Sunday, 8:00 AM–1:30 AM
- Google Maps, Instagram and Facebook links are preserved in the archive

The old website’s downloadable menu is byte-for-byte identical to the client-supplied final menu PDF. It remains the menu source of truth, subject to owner correction of the price conflicts and spelling issues listed in the audit.

Do not automatically migrate the old site’s claims about organic dairy, health, ingredients, preparation or Italian authenticity. Use them only after client or franchisor approval. Do not reuse external or stock imagery without confirming rights and relevance.

## 11. Current boundaries

- Placeholder-led design and implementation may begin; the user explicitly approved this on 12 October 2026.
- Placeholder imagery and provisional copy must remain clearly tracked and must be replaced or approved before launch.
- No changes from this new direction are pushed to `main` without explicit approval.
- The present Mr Gelato animation branch remains intact and reversible.
- Ordering, payment, reservations and backend features are outside the confirmed scope unless separately requested.

## 12. Sources received and facts discovered

### Received on 11 October 2026

- An 18-page final-menu PDF covering savory food, pizzas, beverages, desserts and gelato.
- A saved snapshot of the official `@krushnasheaven` Instagram profile with 12 captured posts plus the profile image.
- Restaurant exterior and interior photographs.
- A plated brownie-and-gelato photograph.
- A small shake photograph.
- A third-party educational graphic comparing ice cream, frozen dessert, gelato and sorbet.

### Confirmed presentation hierarchy

The five public-facing pillars remain:

1. Premium Gelatos
2. Woodfire Pizza
3. Brews
4. Waffles
5. Savory Bites

The menu contains additional subcategories that must remain available rather than being omitted:

- Gelato, shakes, falooda, smoothies, mastani and sundaes
- Sourdough pizzas, calzones and artisanal panuozzo
- Hot coffee, cold coffee, iced coffee, iced tea, mocktails, coolers, protein smoothies, juices and tea
- Waffles, pancakes and plated artisanal desserts
- Pasta, fries, croissant sandwiches, burgers and nachos

### Contact and location details found in supplied sources

- Instagram: `https://www.instagram.com/krushnasheaven/`
- Instagram location wording: Wanwadi, Pune
- Menu address wording: Krushna's Heaven, beside Krushna Pure Veg, opposite Mahatma Phule Sanskrutik Bhavan, Wanowrie, Pune 411040
- Menu phone: 9156600884; another page presents 9156600883/4
- Menu email: `krushnasaiicecream@gmail.com`
- Instagram hours: 8:00 AM to 1:30 AM; operating days are not stated
- Menu services: Gelatos Manufacturer, Italian & Continental Cafe, Banquet Hall
- Menu cover visually presents `EST. 2023`

All contact details remain provisional until the client verifies their preferred public form.

### Material conflicts requiring client confirmation

- The menu says **Sourdough Pizzas** while the public pillar says **Woodfire Pizza**. Confirm whether every listed pizza is actually wood-fired and which term should lead.
- Wanwadi and Wanowrie are both used in the supplied sources.
- Two telephone-number presentations appear.
- Gelato tables contain clear price conflicts and likely data-entry errors. Dark Italian Chocolate and Belgium Chocolate appear twice with different family-pack prices; several premium family-pack values display `100` while equivalent products display `450` elsewhere.
- Earlier signature-flavour information included Jamun Sorbet and Lemon Cello Ice. The final menu does not list Jamun Sorbet and uses Lemon Ice (Sorbet).
- Product naming contains spelling inconsistencies such as Yoghurt/Yohgurt, Calzone/Calzon and several ingredient names. The website should use client-approved corrections rather than reproduce accidental errors.
- The third-party comparison graphic describes general product categories. It is not evidence that Krushna's Heaven products meet low-fat, fat-free or health claims.

### Initial media assessment

- The night exterior is strong material for the Visit section and brand story.
- The counter/interior photograph establishes the real café palette and can support the experience section.
- The portrait brownie-and-gelato image can support desserts, but a full-resolution original is preferable.
- The supplied shake image is only 141 × 235 pixels and cannot support a large or retina-quality composition.
- Captured Instagram graphics are mostly 480–512 × 640 pixels and contain embedded campaign text. They are suitable for a social strip or reference, not primary hero photography.
- The official logo should be supplied as SVG, PDF/vector, or a large transparent PNG; the 150 × 150 profile image is insufficient as the production master.

## 13. Content still required before production launch

### Required

- Original Krushna's Heaven logo file and any brand guidelines.
- Written approval for the exact Mr Gelato franchise wording and any logo-use rules.
- A corrected menu or written answers resolving all price, spelling and duplicate-item conflicts.
- Three to five verified signature products for each of the five pillars.
- The exact public address, Google Maps link, opening days/hours, primary phone, WhatsApp number and email.
- Confirmation of the preferred conversion action: directions, WhatsApp, phone call, table reservation, delivery order or a priority order among them.
- Original full-resolution restaurant and product photographs, with permission to publish them.
- At least one strong landscape photograph for each pillar and one wide photograph suitable for the homepage hero.
- Delivery-platform, ordering, reservation and social-profile links that should appear.
- Client-approved dietary, allergen, sugar-free and nutrition statements.

### Strongly recommended

- The origin story, opening year, owner/chef story and meaning behind the brand.
- Seating capacity, banquet-hall capacity, parking, accessibility and family facilities.
- Verified testimonials, press mentions and awards.
- Seasonal items, availability rules and bestseller labels.
- Whether prices should appear on the website or only in a downloadable menu.
- Whether the site is English-only or needs Marathi/Hindi content.
- Whether online enquiries require a form, WhatsApp handoff or a backend.

## 14. Mr Gelato franchise reference

A 23-slide legacy Mr Gelato presentation was supplied as background information. It confirms a separate historical identity with the wordmark **“mr. gelato”** and tagline **“The Taste of Italy.”** Its visual identity uses turquoise, black and orange with a cartoon gelato character.

### Usable strategic context

- The deck presents Mr Gelato as an Italian-inspired gelato offering adapted to Indian tastes.
- The stated audience includes children, young people, professionals and families.
- Historical product material includes fruit, chocolate, coffee, kulfi and cheesecake flavours.
- Jamun appears in the legacy menu, explaining its presence in the earlier client response despite its absence from the current Krushna's Heaven menu.
- Seasonal flavours listed are Mango, Chikoo, Litchi and Sarifa.
- The deck shows multiple kiosk/store formats, production photographs, events and catering activity.
- Historical services include outdoor catering, marriages, large gatherings, birthday parties, bulk orders, gifting and corporate tie-ups.

### Claims that require current written approval

The deck states that Mr Gelato uses 3.5% low-fat milk and 100% natural flavours, that gelato is 97% fat free, that sorbets are 99.9% fat free and that the products contain fewer calories than ice cream. These statements must not appear on the website without current recipe data and client or franchisor approval.

The statement that gelato is “less dense than ice cream” is questionable and conflicts with the usual explanation that gelato contains less incorporated air and is therefore denser. Do not publish it.

### Historical information that must not be treated as current

- Legacy scoop and 500-gram prices. The user confirmed that these must be ignored.
- Legacy Delhi telephone numbers, personnel contacts, email addresses and delivery line.
- The historical `mrgelato.in` website address unless the client confirms it remains official.
- Store photographs as evidence of current operating locations.
- The claim that all flavours are vegetarian without current confirmation.

### Website use

The user confirmed that the supplied Mr Gelato logo is the current logo and may be used. The tagline **“The Taste of Italy”** may also be used.

Mr Gelato is a franchise available inside Krushna's Heaven. It will receive a clearly labelled feature within the Premium Gelatos pillar while Krushna's Heaven remains the primary identity across the header, navigation, metadata and contact information.

The final Krushna's Heaven menu is the only source of truth for current products, availability and prices. Every item in that final menu is currently available. Legacy products or prices from the Mr Gelato presentation must not be added unless they also appear in the final menu.

## 15. Confirmed featured-item labels

A separate client image supplies recommendation labels for four Scoops & Treats subcategories. Use these labels for merchandising, while continuing to use the final menu PDF for current prices.

| Subcategory | Must Try | Best Seller | Chef's Special |
|---|---|---|---|
| Shakes | Brownie Shake | Cookie & Blast Shake | CAD M Shake* |
| Falooda | Kesar Pista Falooda | Dry Fruit Falooda | Mango Falooda |
| Mastani | Mango Mastani | Sitaphal Mastani | Royal Mastani* |
| Sundae | Choco Brownie Sundae; Cookie Madness Sundae | Belgian Choco Sundae | Pistachio Kulfi Sundae |

`CAD M Shake` and `Royal Mastani` do not appear in the supplied final menu PDF. Confirm whether they are current additions before displaying them. Prices shown in the recommendation image conflict with the final menu and must not be copied.

## 16. Approved page system

### Home

The homepage is the emotional and cinematic entry point.

1. Transparent navigation over a full-viewport hero film or poster.
2. Eyebrow: **“Five experiences · one heaven”** or an approved refinement.
3. Primary working headline: **“Five cravings. One address.”**
4. Primary actions: **Explore the Menu** and **Plan Your Visit**. Visiting the café remains the conversion priority.
5. A scroll cue leading into the five-experience chapter.
6. Large horizontal procession for Gelato, Woodfire, Brews, Waffles and Savoury.
7. An editorial café-story section using the real counter/interior and family-oriented copy.
8. Verified signature products and recommendation labels across the five pillars.
9. Café ambience, social proof and a visit conversion block.
10. Address, hours, directions, phone/WhatsApp, Instagram and franchise acknowledgement in the footer.

### Menu

The menu should use the lighter, information-led expression of the same design system.

- One complete menu page with a sticky category rail for the five public pillars and all required subcategories.
- Search only if it improves navigation for the final item count.
- Verified item names, descriptions, prices, dietary indicators and recommendation labels.
- Category introductions may use cinematic photography, but food data must remain easy to scan.
- No custom pint builder unless the owner confirms the service exists.
- No live cart, payment or ordering backend in the current scope.

### Our Story

- Brand origin and founding facts once supplied.
- Real exterior, interior, team and preparation photography.
- The five experiences presented as one destination.
- Mr Gelato shown as a franchise partner inside Premium Gelatos, never as the parent brand.
- Family warmth, celebrations and café atmosphere supported by factual client material.

### Visit Us

- Address, opening days and hours, phone, WhatsApp and map directions.
- Parking, accessibility, seating, banquet and family facilities only when verified.
- Exterior landmark photography for recognition on arrival.
- Mobile-first call and directions actions.

### Navigation and footer

Primary navigation remains Home, Menu, Our Story and Visit Us. The desktop homepage may use a transparent cinematic header. Mobile uses a compact header and a full-screen menu containing navigation, directions, hours, phone and social links. The footer must repeat essential visit information and the approved Mr Gelato relationship.

## 17. Qissa reference analysis and adaptation rules

Reference: `https://www.qissa.co.uk/` and the supplied screen recording `Recording 2026-10-12 012137.mp4`.

The reference is valued for its cinematic discipline rather than its specific Indian fine-dining identity. Direct inspection found:

- A full-viewport, autoplaying, muted, looping, inline hero video with a poster fallback.
- A 47.8-second 1080p WebM on the reference site. Krushna's version should normally be shorter and include both WebM and MP4 sources.
- A transparent, fixed visual hierarchy over the hero.
- Staged one-second headline/supporting entrances with controlled delays.
- A full-screen navigation opened through a large clip-path transition with staggered numbered links.
- Editorial chapters on a continuous dark canvas.
- A large automatically advancing and tilted food-gallery procession.
- A very slow typographic marquee, scroll reveals, testimonial transitions and count-up statistics.
- A fixed ambient canvas effect, which must not be copied literally.
- Custom CSS and JavaScript rather than GSAP, Lenis, ScrollTrigger or Swiper.
- Reduced-motion handling for the major decorative effects.

What Krushna's Heaven should adapt:

- Cinematic atmosphere before dense information.
- Transparent hero navigation and carefully sequenced arrival.
- Chapter-based storytelling rather than generic stacked card sections.
- Large photography with confident cropping and restrained copy.
- A dramatic full-screen menu with useful visit details.
- Slow ambient motion paired with fast functional controls.
- Clear conversion choices at the beginning and end of the journey.

What must remain original:

- Krushna's logo, palette, typography, copy, content hierarchy and photography.
- The five-experience concept and family-oriented positioning.
- No Qissa logo, wording, blossom imagery, star field, navy-and-gold identity, exact menu shape or duplicated layout.
- No reuse of Qissa source code or proprietary media.

## 18. Hero-film production brief

The hero should eventually use original Krushna's Heaven footage. Until approved footage exists, use a static poster or clearly marked temporary film.

Recommended final loop: approximately 12–18 seconds, seamless, muted and visually understandable without audio.

Suggested shot sequence:

1. The illuminated Krushna's Heaven exterior at night.
2. Gelato being scooped or finished at the counter.
3. Pizza entering or leaving the woodfire oven, subject to confirmation that the process is genuinely wood-fired.
4. Espresso or another signature brew being prepared.
5. A waffle or plated dessert receiving its final garnish.
6. A savoury dish finishing in the kitchen.
7. Families or friends sharing the café experience, with publication permission.
8. Return to the glowing exterior for a seamless loop.

Delivery requirements:

- Landscape master with protected central framing for mobile crops.
- WebM and MP4 exports plus a high-quality WebP/AVIF poster.
- No essential information contained only in video.
- Autoplay only when muted and inline; pause when the page is hidden.
- Respect reduced-motion and data-saving preferences where supported.
- Avoid aggressive cuts, flashing light and constant camera movement.

## 19. Responsive and mobile intent

Mobile is a designed experience, not a scaled desktop page.

- Use `100svh` for the stable opening hero and safe-area-aware padding.
- Keep the logo legible and the menu trigger reachable with one hand.
- Stack hero actions or make them full-width when necessary.
- Keep the five-category procession horizontally swipeable with native scroll snapping and `touch-action: pan-y` where appropriate.
- Show one dominant category or photograph at a time rather than compressing five desktop panels.
- Use at least 44 × 44 CSS-pixel targets, 16px minimum form text and immediate active feedback.
- Gate hover effects behind `(hover: hover) and (pointer: fine)`.
- Avoid sticky hover, tap-highlight flashes, content under device notches and `100vh` browser-chrome errors.
- Preserve text, actions and imagery when video is disabled or reduced motion is enabled.
- Validate on real Android and iOS hardware before calling the experience complete.

## 20. Phased implementation plan

Each phase ends with a reviewable local result. Work proceeds on a dedicated Krushna's Heaven branch. Nothing is pushed to `main`, merged or published until the user explicitly requests it.

### Phase 0 — Source freeze and project foundation

- Preserve the existing Mr Gelato and `premium-gsap-animations` work as recoverable references.
- Create the dedicated Krushna's Heaven development branch when implementation starts.
- Confirm the final project structure, route strategy, build command and GitHub Pages compatibility.
- Maintain one content ledger mapping every public statement and menu item to its source.

**Review gate:** project structure, branch and content ledger.

**Phase 0 execution status — complete locally on 13 October 2026**

- Active branch: `krushnas-heaven-cinematic`; no remote push, merge or deployment performed.
- Delivery model: static multi-page site published from `public/`, compatible with GitHub Pages project paths.
- Canonical routes: `index.html`, `menu.html`, `story.html`, and `visit.html`.
- Runtime URLs must be relative so `/Icec_ream/` deployment works without a server rewrite.
- Final shared site configuration begins in `src/site/config.ts`; reusable React UI remains in `components/ui/`.
- The item-level menu evidence ledger is preserved in `src/site/menu-source.json` with 186 extracted lines and source metadata; it is evidence, not silent approval of disputed prices or spelling.
- Final media belongs in `public/assets/krushna/`; editable hero-film source remains isolated in `hero-film/`.
- The existing Mr Gelato pages, experiments and GSAP implementation remain recoverable references until the final four routes replace them.
- Build command remains `npm run build`; it performs strict TypeScript checking, JavaScript bundling and minified Tailwind compilation.

#### Phase 0 content ledger

| Content or claim | Current source | Status | Publication rule |
| --- | --- | --- | --- |
| Parent brand is Krushna's Heaven | Client clarification | Verified | Use throughout the site |
| Five experiences and their order | Client clarification | Verified | Gelato, Woodfire Pizza, Brews, Waffles, Savoury Bites |
| Mr Gelato is a franchise available inside Krushna's Heaven | Client clarification | Verified | Mention only inside Premium Gelatos and approved franchise context |
| Hero line “Five cravings. One address.” | Approved creative direction | Approved | Use as the working homepage headline |
| Final public routes | Phase 0 architecture decision | Approved | Home, Menu, Our Story, Visit Us |
| Final menu items | Client PDF and matching old-site PDF; item ledger in `src/site/menu-source.json` | Source received: 186 extracted lines | Import all items; resolve documented conflicts before launch |
| Bestseller, Must Try and Chef Special labels | Client-supplied menu material | Partially verified | Use only the supplied item-level labels |
| Address | Menu, Instagram and previous website | Conflicting | Owner must confirm Wanwadi/Wanowrie wording and preferred landmark |
| Phone numbers | Menu and previous website | Provisional | Owner must confirm whether to publish one or both numbers |
| Opening hours | Instagram and previous website | Provisional | Confirm days and current hours before launch |
| Email | Menu and previous website | Provisional | Confirm before enabling a public mail action |
| Instagram profile | Supplied account and previous website | Verified destination | May link to `instagram.com/krushnasheaven/` |
| Krushna logo | Supplied presentation and captured imagery | Provisional production asset | Replace with owner-supplied SVG or transparent master when available |
| Restaurant and product photographs | Client-supplied files | Usable for design | Confirm final publication selection and permissions |
| Five preparation clips | Temporary licensed stock prototype | Placeholder | Replace with original client footage unless stock delivery is approved |
| Low-fat, healthy, natural or nutrition claims | Form answers and third-party educational image | Unverified | Do not publish without exact owner-approved substantiation |
| Reviews, ratings, awards and statistics | Not supplied | Missing | Do not invent; add only after verified material is provided |
| Parking, accessibility, seating and banquet details | Partial menu wording only | Missing or incomplete | Publish only after owner verification |

**Phase 0 review result:** the project has one canonical intent, an explicit final route model, a typed site configuration, a GitHub Pages-safe URL policy and a factual ledger. Phase 1 may begin without deleting the earlier work.

### Phase 1 — Design system and responsive prototype

- Integrate the official Krushna's Heaven logo when supplied; use a clearly marked temporary asset until then.
- Establish palette, typography, spacing, photography treatment, buttons, focus states and responsive breakpoints.
- Build high-fidelity desktop and mobile shells for Home, Menu, Our Story and Visit Us.
- Reconcile the dark cinematic homepage with lighter information-heavy inner pages.

**Review gate:** static desktop and mobile visual system before major motion.

**Phase 1 execution status — complete locally on 13 October 2026**

- Added the shared production visual system in `src/site.css` and the responsive navigation/runtime shell in `src/site.ts`.
- Established the final working tokens: warm ivory surfaces, Krushna raspberry actions, dark wine storytelling fields, espresso typography and restrained amber accents.
- Self-hosted Fraunces and Karla provide the editorial display voice and readable interface voice without a runtime font request.
- Built high-fidelity static shells for `index.html`, `menu.html`, `story.html` and `visit.html`; all runtime links and assets remain relative for `/Icec_ream/` deployment.
- Home now establishes the approved hierarchy: cinematic poster hero, five-experience rail, shared-café story, five-category overview, menu highlights and visit invitation.
- Menu introduces the five category model and verified gelato/dessert examples without treating unresolved items or availability as final.
- Story presents Krushna's Heaven as the parent café and Mr Gelato only inside the gelato chapter.
- Visit uses Wanwadi, Pune at locality level and clearly withholds the exact address, hours and phone until owner approval.
- Desktop and mobile share one content hierarchy; mobile uses native horizontal overflow, safe viewport units, touch-safe controls and a full-screen menu.
- Keyboard focus, skip navigation, reduced-motion preferences, colour contrast, selection styling and visible focus states are part of the base system.
- The hero still uses a static poster by design. Video media, poster handoff and cinematic entrance choreography remain later-phase work.
- Temporary product imagery is identified as illustrative. The supplied exterior and interior photographs are used as working café media pending final publication approval.
- Build verification passes with strict TypeScript checking, bundled JavaScript and minified CSS.
- No remote push, merge or deployment was performed.

**Phase 1 review result:** the four final routes now have one coherent responsive visual language and can be reviewed before motion work begins. Navigation architecture is visually present, while advanced transitions, complete menu search and cinematic media remain intentionally outside this phase.

### Phase 2 — Cinematic hero and navigation refinement

- Implement poster-first hero rendering.
- Add staged entrance choreography and accessible fallbacks.
- Integrate temporary footage or approved final footage with WebM/MP4 delivery.
- Tune responsive crops and preserve readable contrast at every breakpoint.
- Refine the shipped transparent home header, sticky inner header and full-screen menu around the final media lifecycle.

**Review gate:** desktop and mobile hero, reduced motion and low-bandwidth fallback.

**Phase 2 execution status — complete locally on 13 October 2026**

- Exported the approved 210-frame Remotion prototype as separate 1920 × 1080 desktop and 1080 × 1920 mobile masters.
- Delivered both H.264 MP4 and VP9 WebM versions in `public/assets/video/`; each file is approximately 1.1–1.7 MB for a seven-second loop.
- Replaced the static-only homepage treatment with poster-first progressive media. The poster remains the instant render and crossfades only after the selected film source reaches `loadeddata`.
- The browser selects the desktop or mobile composition at the `40rem` breakpoint and falls back from WebM to MP4 when required.
- Data Saver, effective 2G connections and `prefers-reduced-motion` keep the static poster and do not initialize the film.
- The film pauses when the hero leaves the viewport or the document is hidden, resumes only when appropriate and has a compact accessible pause/play control.
- The live chapter counter, progress line and active Gelato/Woodfire/Brews/Waffles/Savoury card follow the film timeline.
- Added a restrained GSAP load sequence for the header, two headline lines, supporting copy, actions and category rail. All text and controls remain live HTML above the film.
- Desktop at 1440 × 900 and mobile at 390 × 844 were reviewed in the browser. Video selection, autoplay, pause/resume, chapter state, mobile menu and console health passed.
- The five film clips remain licensed temporary placeholders and require client footage or explicit stock approval before production release.
- No remote push, merge or deployment was performed.

**Phase 2 review result:** the homepage now opens as the approved five-food preparation story with an intentional desktop/mobile crop, readable live messaging and resilient poster fallback. Phase 3 can focus on the five-signature DNA carousel below the fold without changing the hero system.

### Phase 3 — Five-signature DNA carousel and gallery journal

**Hands-free carousel direction — 15 October 2026:** The user wants the DNA stage to advance automatically and react to scroll/movement, without requiring the two previous/next arrow buttons. Remove those arrows and retain restrained numbered category selectors plus a compact Pause/Resume control. Preserve the ordered cycle Gelato → Woodfire → Brews → Waffles → Savoury, rather than random category jumps.

- While at least 25% of the media stage is visible, wait 3.8 seconds between automatic 1.15-second GSAP orbit transitions. Pause automatic motion when offscreen, the document is hidden, the site menu is open, the user is reading the copy with a mouse, keyboard focus is active, or the Pause control is selected.
- Native vertical scrolling now drives the same shared orbit on desktop and mobile. Desktop may pin only when its full content fits; phones remain unpinned. Scroll input interrupts automatic movement at its current position instead of resetting to an earlier category. Resume automatic cycling after scroll settles and the next reading interval.
- Horizontal drag/swipe, side-card selection and numbered positions remain available. Keyboard Arrow/Home/End selections update immediately. Reduced motion keeps the ordered static rail and does not create autoplay timers.
- This implementation belongs only to the new `Krushna.Heaven_final` working copy; do not modify or merge into `Icec_ream`.
- Validation: desktop categories advanced without navigation input; Pause held the selected category; native scrolling changed the active category and its menu link; the 391px phone view advanced automatically once the media stage was visible, with no horizontal overflow and approximately 50px of card/copy clearance in the initial view. Keyboard End selected Savoury immediately. Build and strict TypeScript pass with no browser errors/warnings. Reduced-motion timer exclusion was verified from the setup gate; actual touch feel still requires a real phone review. Publish this refinement only to the approved new repository's Pages preview.


**Carousel scale and scroll refinement — 15 October 2026:** Keep the active category's "Explore…" menu destination as a restrained text link. Side-card selection and dragging browse categories; the explicit link opens the menu at that category, without requiring visitors to infer card-tap behaviour. Expose this live link to keyboard and screen-reader users rather than hiding it with the decorative copy.

- Increase desktop cards from 19vw (224–304px) to 21.5vw (248–344px), phone cards from 46vw to 52vw (160–320px), and tablet cards from 38vw to 42vw. Expand the media stage alongside the cards to preserve neighbouring portraits and copy clearance. This supersedes the preceding 46vw mobile sizing.
- Bind scroll progress to an actual GSAP animation so numeric 0.65-second ScrollTrigger scrub performs interpolation. Preserve one shared category state and reverse scrolling.
- Pin only desktop scenes whose measured content fits the viewport. Short laptop windows use an unpinned native scroll sequence so category links and navigation remain reachable. Mobile retains horizontal swipe and native vertical flow.
- A wheel input interrupts a pending button/drag settling tween from its current rendered position. New pointer or button input cancels offset-reset motion, preventing competing animations.
- Re-evaluate the desktop pin after viewport-height changes. Browser checks confirmed forward and reverse category scroll, an unpinned 933 × 533 laptop layout, and pin restoration at 1018 × 890. At 320px and 391px phone widths, cards clear the copy with no horizontal overflow. Build and strict TypeScript pass; no browser errors or warnings. Real-phone swipe feel still requires hardware confirmation. No remote push or deployment.


**DNA food photograph refresh — 15 October 2026:** Replace only the Woodfire Pizza and Savoury Bites carousel images with original AI-generated illustrative portrait assets. The former pizza image was a 700px landscape oven shot cropped too tightly; the former burger used a flat pink studio backdrop. New portraits use warm amber side light, wine-brown backgrounds, crisp food textures and the existing waffle image as a style reference. Preserve the other three cards, motion, category copy and menu destinations. These are temporary illustrative assets, not photographs of dishes actually served by the café; replace with approved client photography when available. The original supplied gallery photos remain unchanged.

Built-in imagegen was used with `public/assets/krushna/waffle-savoury-atlas.png` as the lighting/style reference. Generated masters were saved by the tool; project finals are `public/assets/krushna/dna/woodfire-pizza.webp` and `savoury-burger.webp` (800 × 1200), with 480 × 720 counterparts for smaller screens. Responsive sources, lazy loading and async decoding limit transfer size.

Prompt set (shared brief plus the corresponding subject brief):

- Shared: "Use case: photorealistic-natural. Asset type: a tall food photograph for a premium cafe website's 3D carousel. Produce ONE standalone portrait photograph, aspect ratio 2:3, no collage, no UI, no typography, no logo, no watermark. The attached image is only a style reference for rich warm amber food highlights, wine-brown shadows, tactile sharp food textures, shallow depth of field and tasteful restaurant atmosphere. Keep the food recognizable and naturally realistic, with balanced highlights instead of flat darkness. Compose for a tall card crop with the dish centered, room around its edges and a quiet upper-left corner for an existing small numbered badge."
- Pizza: "Subject: a fresh vegetarian woodfire Margherita pizza, airy blistered and lightly charred crust, bright tomato sauce, softly melted mozzarella and fresh basil leaves, on a round rustic wooden serving board. Editorial three-quarter overhead camera angle, the full pizza clearly visible and appetizing, not on a narrow metal peel. Warm ivory stone table with softly blurred wine-toned restaurant and a very subtle amber oven glow in the distance. Golden directional window-like side lighting, deep but detailed shadows, crisp crust texture, attractive lush reds and greens."
- Savoury: "Subject: an appetizing premium vegetarian cafe burger on a warm wooden serving board, golden sesame brioche bun, a crisp vegetable patty, melted cheese, fresh lettuce, tomato and a small portion of golden fries alongside. No meat, no bacon. The burger is the clear hero centered in the middle/lower portion, shot at a low three-quarter food-editorial angle with enough surrounding space to keep its full silhouette in a portrait crop. Warm ivory stone table, softly blurred deep wine and brown cafe background with gentle amber bokeh, similar golden side light and tactile food detail to the style reference. Natural realistic proportions, restrained styling, no excessive food tower."


**Latest mobile direction — 14 October 2026:** The user requested the same DNA composition on mobile as desktop. This supersedes the earlier shallower mobile orbit and 74vw foreground card. Use the desktop orbit's depth, tilt, scale hierarchy and vertical offsets, uniformly reduced for the viewport. Phone cards are 46vw with substantial neighboring portraits visible, with enough space above the copy and controls. Keep swipe, side-card selection, arrows, category destinations and native vertical page flow; retain the static rail for reduced motion.

Implemented and checked locally: the 390px view shows a tall foreground portrait and two tilted neighbours; browser pointer drag advances the shared position state, next selects Woodfire Pizza and updates its menu link, and the 320px layout has no horizontal overflow or card/copy overlap. Arrow targets stay 46px square. Build and TypeScript pass, with no browser warnings/errors. Touch-axis arbitration and swipe feel still need confirmation on actual Android/iOS hardware. Nothing pushed or deployed.

- Place the approved DNA-style 3D carousel immediately after the hero so the owner's five primary offerings are the first complete message after the film: Premium Gelatos, Woodfire Pizza, Brews, Waffles and Savoury Bites.
- Replace the earlier flat or horizontal five-chapter procession with one connected spatial system: a tall active card in the foreground and neighboring cards moving continuously along a curved 3D orbit.
- Preserve the reference recording's tactile drag, damped inertia, depth hierarchy and restrained interface while rebuilding all content, typography, color and controls in Krushna's Heaven's identity.
- Use semantic DOM cards with CSS 3D perspective and GSAP coordination rather than a canvas-only or Three.js implementation, so category links, keyboard order and responsive content remain accessible.
- On capable desktop layouts, use a short controlled ScrollTrigger sequence to introduce all five categories, while also supporting direct drag, side-card selection, arrow keys and visible menu links. The section must remain interruptible and must not hijack scrolling beyond the approved short chapter distance.
- On mobile, preserve a shallower 3D orbit with one dominant portrait card, partial neighboring cards, native-feeling horizontal swipe, a `01 / 05` indicator and normal vertical page flow. Do not require a long pinned mobile sequence.
- Play media only on the active card. Inactive cards use poster frames; reduced motion receives five static chapters in document order.
- Connect every category to its correct menu destination and track every temporary photograph, poster and short process clip for final replacement.
- Add the approved Qissa-led Gallery section after the café story: editorial introduction, narrative image order, asymmetric desktop masonry and two-column mobile masonry.
- Match the reference gallery's restrained lazy-load opacity/exposure reveals and natural user-controlled scroll behavior.

**Review gate:** complete desktop drag/scroll/keyboard carousel, real-device mobile swipe behavior, reduced-motion structure, active-media lifecycle, category destinations and the complete Gallery rhythm.

**Phase 3 carousel milestone — complete locally on 14 October 2026**

- Replaced the earlier flat five-category preview immediately below the hero with one connected CSS 3D orbit for Premium Gelatos, Woodfire Pizza, Brews, Waffles and Savoury Bites.
- Desktop uses a short GSAP ScrollTrigger pin that maps native vertical progress across all five resting positions. Reverse scroll follows the same state instead of playing a separate transition.
- Pointer drag, side-card selection, numbered steps, previous/next controls and Arrow/Home/End keyboard input all retarget the same interruptible position state.
- Mobile remains in normal document flow with a shallower orbit, one dominant 74vw card, visible neighbors, horizontal swipe and preserved vertical scroll intent.
- Active copy changes with a short asymmetric exit/entrance sequence. Repeated input cancels prior copy, position and offset tweens so stale callbacks cannot overwrite the current chapter.
- Each semantic card links to the matching menu anchor. Focus states, 44px controls and ordered DOM content remain usable without relying on visual depth.
- Reduced motion removes the pin, orbit and inertia and exposes the five cards as a native horizontal scroll-snap rail in document order.
- The runtime already supports active-only process videos and pauses them offscreen, under the site menu or when the document is hidden; current cards intentionally use still placeholders until the approved category clips exist.
- Desktop wheel, direct controls, pointer state, keyboard navigation, mobile swipe, mobile vertical scrolling and console health were checked in the local browser. Real Android/iOS hardware profiling remains part of Phase 8.
- The build and strict TypeScript check pass. No remote push, merge or deployment was performed.

**Hero simplification refinement — complete locally on 14 October 2026**

- Removed the duplicate five-category thumbnail rail, chapter counter and timeline from the hero. The DNA carousel now owns category discovery immediately below the film.
- Removed the visible pause/play pill so the opening frame retains a quieter cinematic hierarchy.
- The muted film continues to pause automatically when the hero is offscreen, the full-screen menu is open or the document is hidden; reduced-motion and Data Saver visitors keep the static poster.
- Rebalanced the hero's bottom spacing around the headline, supporting copy and two primary actions on desktop and mobile.
- Rechecked the result at 1440 × 900 and 390 × 844. The production build and strict TypeScript check pass with no browser console warnings or errors.
- No remote push, merge or deployment was performed.

**Premium hero art-direction refinement — complete locally on 14 October 2026**

- Translated the approved editorial-left mockup into the live hero while retaining the seven-second desktop/mobile preparation films and poster-first delivery.
- The hero now uses the concise hierarchy “A café for every craving” → “Five cravings. One address.” → “Made for evenings together.” Category names remain intentionally absent because the DNA carousel immediately below reveals and explains all five offerings.
- Applied a consistent deep-wine cinematic grade, warmer amber highlights and restrained exposure treatment so live ivory copy remains readable across changing film scenes.
- Reworked the action hierarchy into one raspberry “Explore the menu” button and a quieter underlined “Find us” text action.
- Added a rotating embossed `KH` brand seal on capable desktop layouts and a minimal “Begin the story” anchor. Mobile removes the seal, shortens the scroll cue and preserves each headline phrase on one line.
- Motion is limited to a staged GSAP entrance, masked headline rise, subtle media/copy scroll departure, slow seal rotation and the scroll-cue line. `prefers-reduced-motion` retains the fully composed static state.
- Reviewed at 1440 × 900 and 390 × 844 across multiple film frames. The build, strict TypeScript check and browser console all pass.
- No remote push, merge or deployment was performed.

**Hero colour-grade refinement — complete locally on 14 October 2026**

- Lifted film exposure and saturation while retaining natural food colour, warm amber highlights and deep-wine brand tonality.
- Reduced the full-frame wine veil and concentrated contrast protection around the live copy, allowing food preparation, fruit, fire and pale backgrounds to retain more visible detail.
- Added a restrained screen-blended warm highlight over the image side and softened the transparent header gradient so the hero feels brighter without losing legibility.
- Mobile keeps a stronger lower wine gradient because the copy overlaps the moving subject, while the upper film receives the brighter grade.
- Checked dark and light film moments at desktop and mobile sizes; copy contrast remained stable and the browser console stayed clear.
- No remote push, merge or deployment was performed.

**Phase 3B Gallery Journal — implemented locally on 14 October 2026**

- Inserted the gallery after the café story and before menu highlights, with an editorial opening, eleven narrative figures and a quiet closing visit action. A footer anchor provides direct access without adding a fifth page route.
- Preserved the supplied photographs and their natural proportions. A responsive shortest-column layout uses three subtly offset columns on desktop and two on mobile; semantic DOM order remains arrival → seating → counter → coffee → savoury → desserts → evening → brownie.
- Matched the evidenced Qissa gallery motion: native scrolling, warm placeholders, a 400 ms image-opacity reveal and 500 ms exposure-overlay settle on first viewport approach after image decoding. No pins, parallax, image tilts, hover-only captions or scroll hijacking are added.
- Reserved every image's width/height, measured caption space, updated column packing on width changes and font readiness, and included a readable CSS grid fallback. Reduced motion exposes the photos immediately; loading failures preserve alt text and captions.
- Created 480px and 800px WebP derivatives with `scripts/prepare-gallery.py` without modifying originals. Responsive `srcset`/`sizes`, native lazy loading and async decoding keep phone downloads smaller.
- Website build and strict TypeScript checking pass. Browser DOM checks found no tile overlap or horizontal overflow on desktop or at approximately 391 × 844 CSS pixels, with smaller image sources selected on mobile and no console warnings/errors.
- Browser screenshot capture returned blank frames despite visible DOM content, so visual composition/pacing confirmation and real Android/iOS review remain outstanding. These checks must be completed before launch; the implementation is available for local user review.
- Missing final pizza/waffle/preparation/people photos and source publication approval remain tracked for the production-content phase.
- No remote push, merge or deployment was performed.

**Next planned phase:** Phase 4 — complete final-menu import and discovery. Phase 3 visual/device review remains a release gate.

**Gallery motion upgrade from the new recording — 14 October 2026**

- Studied the full 8.83-second desktop recording with 36 chronological quarter-second frames. It shows three columns with varied heights on a dark navy field, photos gaining opacity/clarity as they enter, and manual scroll pauses. No evidence of automatic travel, pinned panels, card rotation or large 3D effects was found.
- Adapted its dark photographic presentation into Krushna's deep wine, ivory captions and raspberry/amber detail. Added original mask openings, a 32px lift with a subtle 0.98 scale, internal photo zoom from 1.07 to 1, column delays of 0/60/120ms and captions following by 110ms. These are creative extensions, not claimed as exact Qissa timings.
- Desktop entrances use a 500–850ms marketing sequence. Mobile uses an 18px lift and 350–600ms timing. Each photo reveals once after decoding and reaching the viewport; layout dimensions remain reserved and scroll stays native.
- Every photo now opens in a native modal dialog with original-size media, photo count, visible close/previous/next controls, arrow-key navigation, Escape, scroll locking and focus restoration. Repeated asynchronous image requests are versioned so stale decodes cannot replace the current selection; load failure provides a retry/next-photo message.
- Respect reduced-motion preferences by exposing gallery photos immediately and disabling position/scale/mask animation. Keyboard photo changes settle immediately; pointer photo changes use a brief 180ms exposure fade. Preserved responsive derivatives and caption visibility.
- Website build/TypeScript and browser DOM interaction checks passed: opening, next-photo click, arrow-key change, native modality, Escape, scroll unlock, restored focus and no console warnings/errors. Screenshot capture continues to return blank frames, so visual pacing and real-phone confirmation remain outstanding.
- At approximately 391 × 844 CSS pixels, verified the mobile 350/480ms reveal timing, eleven photo controls, no horizontal overflow, and a full-size viewer that fits within the viewport without internal overflow. Updated captions announce politely for screen readers.
- No remote push, merge or deployment was performed.

**Centred hero composition — 14 October 2026**

- The latest supplied Qissa screenshot supersedes the previous left-aligned hero arrangement. Home now uses a menu trigger at left, centred Krushna branding and the visit action at right; the existing navigation overlay provides all four page links on desktop as well as mobile.
- Hero content follows one centred reading order: “A café for every craving”, two-line “Five cravings. One address.”, “Made for evenings together.”, outlined menu action and filled raspberry Find us action, then the lower “Begin the story” cue.
- Repositioned the wine contrast mask behind central copy, retaining the clean films and warm colour treatment. Defined explicit video/overlay/content stacking so GSAP transforms cannot place the film above its readability mask.
- On mobile the brand stays centred, menu label and header visit pill give way to compact navigation, both hero buttons remain together, and the decorative seal stays hidden.
- Retained masked headline entrance and reduced-motion fallbacks; changed the eyebrow arrival to a centred vertical settle. Verified desktop/mobile composition, mobile menu opening/closing, zero horizontal overflow at 390px and an empty browser warning/error log. Website build and strict TypeScript check pass.
- No remote push, merge or deployment was performed.

**Hero grade retry and preview recovery — 14 October 2026**

- Found the root cause of the dull film: Remotion had baked a dark wine gradient, reduced brightness/saturation, vignette and stripe texture into each clip, then the website applied another wine mask.
- Removed the baked overlays and exported fresh seven-second desktop/mobile MP4 and WebM films. Colour protection now belongs to the live CSS layer once, retaining clean highlights and fruit/food detail on the right, with wine contrast around text.
- Replaced the screen-blended haze with a restrained warm soft-light treatment. Mobile retains its own lower contrast mask. Added an asset version to the hero CSS and video URLs to invalidate the previous cached films.
- Verified the brighter waffle export as a still; both WebM versions are seven seconds and approximately 1.66 MB desktop / 1.48 MB mobile. Website build and film lint/typechecking pass.
- Restarted the local preview on port 4200 because 4190 is on port-safety blocklists. Added video MIME types and byte-range responses for phone playback; verified the updated HTML/CSS return HTTP 200 and mobile MP4 range requests return HTTP 206.
- Browser visual inspection was unavailable due to a browser-tool URL authority rejection in this turn. Final page colour/readability still requires a desktop/mobile browser review; no visual QA claim is made for this retry.
- The source footage has different lighting from the generated amber mockup; the grade preserves its real detail and cannot recreate the mockup's lighting or set.
- No remote push, merge or deployment was performed.

### Phase 4 — Complete menu and discovery

- Rebuild the complete menu from the final PDF without omissions.
- Resolve documented price, spelling and duplicate-item conflicts before presenting disputed data as final.
- Add category filtering or search only where the final item count makes it useful.

**Review gate:** complete menu and factual price audit.

### Phase 5 — Verified story and visit content

- Replace the shipped Story shell's provisional copy with owner-approved history, quotes and imagery.
- Replace the Visit shell's locality-level placeholders with verified address, hours, phone, map, accessibility and facility details.

**Review gate:** factual content audit and complete multi-page review.

### Phase 6 — Premium motion pass

- Add purposeful GSAP/CSS motion to carousel entry, image masks, gallery transitions and selected statistics.
- Keep functional interface transitions under approximately 300ms unless a slower deliberate transition is justified.
- Ensure animations are interruptible where users can trigger them repeatedly.
- Implement global pause, visibility pausing, reduced motion and mobile-specific simplifications.

**Review gate:** motion map and side-by-side desktop/mobile recording.

### Phase 7 — Production content and trust

- Replace all temporary photography, logo files and provisional copy.
- Replace every Gallery placeholder with an approved real café, preparation, product or people photograph and confirm its publication rights.
- Add only verified reviews, social content, claims and franchise language.
- Confirm alt text, structured data, metadata, social preview image and contact links.
- Validate image rights and permissions.

**Review gate:** client content sign-off.

### Phase 8 — Performance, accessibility and device QA

- Optimize video, responsive images, font loading and JavaScript execution.
- Test keyboard navigation, focus order, contrast, zoom, screen-reader semantics and reduced motion.
- Test major desktop browsers and real Android/iOS devices.
- Verify layout at small phones, large phones, tablets, laptops and wide desktop screens.

**Review gate:** QA report with remaining limitations stated plainly.

### Phase 9 — Controlled release

- Produce the final review build on the development branch.
- Push only when the user asks.
- Merge into `main` and publish only after explicit user approval.
- Verify the production URL, mobile rendering, analytics consent and every external link after deployment.

**Review gate:** final launch approval.

## 21. Definition of done

The project is complete only when:

- Krushna's Heaven is consistently the parent brand.
- All five experiences are clearly represented.
- Every published menu item and price matches the approved final source.
- Mr Gelato is presented accurately as a franchise within Premium Gelatos.
- The official logo and approved photography replace temporary assets.
- The homepage delivers the approved cinematic experience without sacrificing clarity or performance.
- Home, Menu, Our Story and Visit Us work across desktop and mobile.
- Visit information and calls to action are verified and functional.
- Accessibility, reduced motion and real-device mobile behaviour are tested.
- No unapproved health, nutrition, preparation, ownership or testimonial claim remains.
- The user has explicitly approved the final push, merge and publication.



---

## Complete reference study and adaptation rules

# Qissa Reference Analysis for Krushna's Heaven

## Scope, method, and confidence

This document studies the two supplied Qissa screen recordings as a motion and storytelling reference:

- Desktop recording: **1:39.8**, 1896 × 912, 30 fps.
- Mobile recording: **1:22.1**, 384 × 850, approximately 94.6 fps.

Both recordings were extracted at four frames per second. Motion-heavy moments were then extracted at higher density and reviewed in sequence. Timestamps below are approximate because some parts of the recordings are fast manual scrolling rather than site-controlled animation.

Three distinctions matter throughout this analysis:

1. **Observed** means the behavior is directly visible in the supplied recordings.
2. **Inferred** means the footage strongly suggests a behavior, but its implementation cannot be proven from video.
3. **Unseen** means the relevant interaction was not demonstrated and should not be invented from assumption.

The white translucent circles visible in the mobile recording are **touch indicators from the screen recorder/device**, not part of Qissa's interface.

---

## 1. Site map

### A. Home page — fully evidenced

The desktop home page is visible from approximately `00:00–01:09`. The mobile home page is visible in several passes from approximately `00:00–00:19`, `00:33–01:09`.

| Order | Section | Purpose |
|---:|---|---|
| 1 | Fixed site header | Keeps the brand and primary actions available over the entire story. Desktop exposes menu, ordering, and reservation controls; mobile reduces this to the emblem and hamburger. |
| 2 | Cinematic hero | Establishes mood before information through a full-screen food/interior video, the Qissa name, a short positioning statement, and two primary actions. |
| 3 | “Begin the story” cue | Signals that the page should be experienced as a sequence rather than scanned as a catalogue. |
| 4 | “What is Qissa?” | Explains the name and idea through editorial copy, a pull quote, and an image composition on desktop. |
| 5 | “Masterpieces” | Presents signature plates as large circular objects in a scroll-controlled horizontal sequence. This is the clearest cinematic chapter on the page. |
| 6 | Gold vocabulary marquee | Creates a short rhythmic break with words such as aroma, texture, taste, craft, gathering, celebration, origin, and spice. |
| 7 | Cuisine overview | Introduces the menu “course by course” through six food categories. Desktop uses a hover-focus row; mobile uses large stacked cards. |
| 8 | Kitchen statement banner | Uses a full-bleed food image and a short emotional line to reconnect food with gathering and occasion. |
| 9 | Signatures | Shows selected dishes with story-led titles, labels, short descriptions, and routes to the complete menus. |
| 10 | “The tale so far” statistics | Adds social proof through rating, review count, dish count, and an infinity symbol for stories. |
| 11 | “The Room” | Changes the subject from food to atmosphere and the physical dining experience. |
| 12 | Testimonials | Places customer words over a darkened room image, with a rating, stars, attribution, and carousel dots. |
| 13 | Private dining and celebrations | Expands the visit from an ordinary meal into an occasion and provides an enquiry action. |
| 14 | “Your Table Awaits” | Ends the conversion story with two explicit choices: reserve a table or order takeaway/delivery. |
| 15 | Footer | Closes with brand positioning, newsletter, navigation, hours, contact information, social links, and an oversized Qissa wordmark. |

### B. Gallery page — fully evidenced on mobile

Visible approximately `00:19.5–00:33` in the mobile recording.

| Order | Section | Purpose |
|---:|---|---|
| 1 | Fixed mobile header | Keeps the emblem and hamburger available. |
| 2 | Gallery introduction | Uses a blossom-led background, breadcrumb, eyebrow, “Gallery” title, and short introduction. |
| 3 | Masonry image journal | A two-column sequence of food, interiors, exterior signage, and people. Unequal image heights make it feel editorial rather than like a uniform ecommerce grid. |
| 4 | Footer | Repeats the site-wide closing information and navigation. |

The gallery returns to the previous home-page scroll position when the browser Back action is used. That restoration is useful to preserve in our implementation.

### C. Menu page — fully evidenced

Visible approximately `01:13.7–01:39.8` on desktop and `01:09.7–01:22.1` on mobile.

| Order | Section | Purpose |
|---:|---|---|
| 1 | Menu hero | Introduces “The Menu” over a spice still life, with a short explanation and restrained editorial composition. |
| 2 | Category navigation | Lets the user jump directly to menu groups. It is a wide pill row on desktop and a horizontally scrollable compact strip on mobile. |
| 3 | Appetisers | Panoramic food image followed by names, descriptions, and prices. |
| 4 | Vegetarian Starters | A dedicated vegetarian starter group using the same image-plus-list language. |
| 5 | Grills | Grilled and tandoor dishes, supported by a category photograph and menu rows. |
| 6 | Biryani | Rice-led category with its own visual banner and list. |
| 7 | Mains | Main-course items in a clean text-and-price system. |
| 8 | Traditional Curries | A story-led category with image, short introduction, and rows. |
| 9 | Vegetarian Sides & Mains | Vegetarian dishes separated for rapid discovery. |
| 10 | Rice + Indian Breads | Supporting staples in the same consistent list system. |
| 11 | Vegan | Dietary category clearly separated in navigation. |
| 12 | Drinks area/page | A distinct drinks hero and at least a Cocktails section are visible on desktop. The complete drinks taxonomy is not shown. |
| 13 | Footer | Visible at the end of the mobile menu journey. |

The category controls update the active state and move the user to the relevant section. The footage supports anchor-like navigation rather than a swipe-controlled content carousel.

### D. Pages evidenced only by navigation labels

These routes appear in navigation/footer language but are not opened in the supplied footage, so their internal sections cannot be documented reliably:

- Our Story
- Private Dining
- Journal
- Visit & Contact
- Reservation flow
- Online ordering flow

The presence of these labels belongs in the site map; their layouts and motion do not.

---

## 2. Storytelling system

### Narrative order

The home page follows a deliberate emotional-to-practical sequence:

1. **Mood:** a cinematic hero makes the place feel desirable before explaining it.
2. **Meaning:** the “What is Qissa?” section gives the name and experience an idea.
3. **Craft:** the Masterpieces sequence treats dishes as authored objects.
4. **Breadth:** cuisine categories show that the menu has range.
5. **Desire:** the kitchen banner and signature cards make the food concrete and appetising.
6. **Trust:** ratings, reviews, and testimonials reduce uncertainty.
7. **Place:** the room and private-dining sections show where the experience happens.
8. **Action:** reserve or order becomes the final decision.

This order is one of the strongest parts of the reference. It does not begin with a dense menu, prices, or business information. It first establishes an atmosphere, then gives food meaning, then proves breadth and quality, and only then asks for conversion.

### Chapter structure

The page behaves like a sequence of editorial chapters rather than a collection of unrelated sections. Each chapter usually contains:

- a small uppercase eyebrow;
- one short serif statement;
- one primary visual device;
- one concise supporting paragraph;
- zero or one call to action.

The visual device changes by chapter: video in the hero, asymmetric collage in the origin story, circular plates in Masterpieces, cards in Cuisine and Signatures, numbers in social proof, and full-bleed imagery for atmosphere. Repetition comes from typography, color, spacing, and motion rather than repeating the same card component everywhere.

### What the user sees first, next, and last

- **First:** moving imagery, dark atmosphere, centered identity, and two actions. The user understands “special occasion and food” before reading the copy.
- **Next:** a definition and then a gallery of crafted dishes. This turns beauty into a brand idea and a proof of culinary intent.
- **Last:** place, people, testimonials, booking, and practical contact details. Emotion resolves into a visit or order.

### Feeling before reading

The site creates feeling through four devices before the copy does any work:

1. Food and room footage fills the viewport and uses slow visual pacing.
2. Dark navy treatment and small gold accents signal evening hospitality and restraint.
3. Large serif typography makes the page feel editorial rather than promotional.
4. Sections have enough vertical space that every idea receives a pause.

### Media allocation

- **Video:** hero only in the captured pages. It is used where ambience and sensory anticipation matter most.
- **Large still photography:** Masterpieces, kitchen statement, signatures, room, testimonials, private dining, and menu-category banners.
- **Photo collections:** origin story, room, and Gallery.
- **Text-led moments:** origin explanation, statistics, some menu rows, and the final actions.

This restraint is important. Video is not scattered through every section; it is concentrated at the entrance, while still photography carries the rest of the experience.

---

## 3. Hero

### What plays and how it loops

The hero contains a muted, full-bleed montage of plated food and restaurant interiors. On mobile, the footage is composed vertically rather than appearing to be a careless center crop of the desktop media. Scenes hold for roughly **2–3 seconds**, then change through a very short crossfade or dip toward darkness of approximately **0.2–0.4 seconds**.

No complete loop is captured. The recordings begin after the page has already loaded and leave the hero before the first frame visibly repeats. Therefore, the exact source duration and loop point cannot be measured. The montage is almost certainly autoplaying, muted, looping, and set to play inline on mobile, but only the visual behavior is proven.

No sound, mute, pause, timeline, or playback control is visible.

### Desktop composition

- Video covers the viewport below/behind the fixed header.
- A dark navy overlay protects the type and unifies clips with different exposure.
- The main content is centered horizontally and vertically.
- A small label sits above the title.
- “Qissa” is the largest element, approximately **64–80 px** at the recorded desktop width.
- The supporting copy is narrow, centered, and kept to a few lines.
- “View Menu” appears as the quieter action; “Reserve a Table” is the luminous gold primary action.
- “Begin the story” and a thin line sit close to the bottom center.

### Mobile composition

- The hero remains close to full viewport height.
- A portrait media treatment keeps subjects useful within the narrow frame.
- The title is approximately **36–44 px** and remains centered.
- Buttons stack vertically and become easy touch targets.
- The desktop utility actions in the header disappear, leaving the emblem and hamburger.
- The bottom story cue remains, with less empty space around it.

### Text entrance and exit

The recording begins after the hero has settled, so the initial text reveal is not visible. There is no evidence for a split-character animation, blur reveal, or rotating headline. The safe conclusion is that the text is static after load, possibly preceded by a short fade.

When the user scrolls away, the hero content moves upward with the page. It does not visibly pin, collapse into the header, scale dramatically, or dissolve through a complex timeline. The persistent header remains while the hero exits.

### Controls and indicators

Observed:

- two CTA buttons;
- bottom “Begin the story” cue;
- fixed navigation.

Not observed:

- video play/pause;
- sound toggle;
- slide counter;
- montage progress bar;
- carousel arrows or dots;
- drag/swipe control over the montage.

---

## 4. Animation inventory

The timing values below are measured estimates from recorded behavior, not source-code values.

### Global and page-level motion

| Animation | Location | Trigger | Movement and properties | Timing and feel | Behavior |
|---|---|---|---|---|---|
| Hero montage cuts | Home hero | Time | Video scenes change with a short crossfade or dip in brightness; copy remains stable. | Scene hold ~2–3 s; transition ~0.2–0.4 s; cinematic and restrained. | Autonomous loop; exact full duration unseen. |
| Section entrance | Most home sections | Scroll into viewport | Content typically moves upward ~20–50 px while opacity rises from 0/dim to 1. Some images begin slightly darker. | ~0.5–0.9 s; soft ease-out; modest stagger between label, title, copy, and image. | Predominantly one-shot. |
| Fixed header continuity | All captured pages | Scroll | Header remains at the top while page content passes beneath. Its dark/translucent treatment maintains contrast. | Continuous; no visible jump. | Fixed/sticky. |
| Smooth scrolling feel | Site-wide | Wheel/touch | Scroll has slight damping and continuity without a long float or heavy overshoot. | Light inertia; responsive rather than theatrical. | Continuous; implementation uncertain. |
| Route content swap | Home → Gallery/Menu | Click/tap | Current page gives way quickly; text/structure appears, followed by the hero image fading to full exposure. | Structure within ~0.1–0.2 s; hero image settles in ~0.2–0.4 s. | One-shot per navigation. No full-screen loader observed. |
| Image lazy-load reveal | Gallery and lower pages | Image enters/load completes | Empty/dark placeholder becomes an image, mainly through opacity; no decorative rotation. | ~0.2–0.5 s where visible. | One-shot per image. |

### Home-page motion, in narrative order

#### 4.1 Hero ambient motion

- **Where:** first viewport.
- **Trigger:** time after page load.
- **Moves:** the underlying video only; text does not track the scene.
- **Properties:** clip replacement/crossfade, slight exposure dip between scenes, full-cover crop.
- **Timing:** clips hold for a few seconds; transitions are shorter than half a second.
- **Character:** slow visual content, quick clean edits.
- **Mode:** looping media, not scroll-scrubbed.

#### 4.2 “Begin the story” prompt

- **Where:** bottom of the hero.
- **Trigger:** present after load.
- **Moves:** no clearly visible repeated bounce in the supplied footage. The cue relies more on placement and the thin line than on animation.
- **Mode:** static in the observed state.

#### 4.3 Origin-story reveal

- **Where:** “What is Qissa? A word that means a tale.”
- **Trigger:** section enters the viewport.
- **Moves:** heading/copy and desktop collage settle upward and fade in. The pull quote follows the main copy.
- **Properties:** translateY, opacity, possibly slight image exposure transition.
- **Timing:** approximately 0.6–0.9 s with a small stagger.
- **Character:** slow and editorial.
- **Mode:** one-shot; not pinned.

#### 4.4 Masterpieces horizontal plate journey

- **Where:** “Crafted icons & signature plates.”
- **Trigger:** vertical scroll.
- **Moves:** a row of oversized circular top-down dish images travels horizontally from right to left as vertical scrolling continues. One dish occupies the visual center while neighboring dishes remain partly visible.
- **Properties:** horizontal translation is primary. The footage does not prove strong per-plate scale or rotation; perceived dominance comes mostly from position and crop.
- **Timing:** distributed across several viewport heights; movement is directly coupled to scroll rather than played as a fixed-duration tween.
- **Character:** smooth, nearly linear, with enough damping to feel controlled.
- **Mode:** **pinned and scrubbed** is the strongest inference. The chapter heading remains visually stable while the plate sequence advances.
- **Mobile:** same vertical-to-horizontal mapping, with one plate centered and thin fragments of neighbors at the edges.

#### 4.5 Gold word marquee

- **Where:** immediately after Masterpieces.
- **Trigger:** visible when section enters; motion may already be running.
- **Moves:** repeated sensory words translate horizontally across a gold band.
- **Properties:** translateX, seamless repetition.
- **Timing:** constant, medium-slow speed; no acceleration is visible.
- **Character:** rhythmic separator.
- **Mode:** likely infinite CSS/GSAP loop; not evidently scrubbed.

#### 4.6 Desktop cuisine-card focus

- **Where:** “Explore the menu, course by course.”
- **Trigger:** pointer hover on an individual category.
- **Moves:** hovered card grows roughly 1.3–1.45×, lifts slightly, and regains color/brightness. Adjacent cards dim or desaturate and visually recede.
- **Properties:** scale, brightness/saturation/filter, shadow/glow, possibly width allocation.
- **Timing:** approximately 0.25–0.4 s.
- **Easing:** smooth ease-out; no bounce.
- **Mode:** reversible hover state.
- **Mobile replacement:** cards stack at useful size. The key information does not depend on hover.

#### 4.7 Button hover and press feedback

- **Where:** CTAs across hero, gallery, menu, and home.
- **Trigger:** hover on desktop, touch on mobile.
- **Moves:** subtle fill/exposure change; arrows appear to translate a few pixels. Mobile taps briefly show a blue/cyan pressed or focus state in the recording.
- **Properties:** background, color, shadow/glow, translateX on icon.
- **Timing:** approximately 0.15–0.25 s.
- **Character:** quick and quiet.
- **Mode:** reversible. The blue mobile state may partly be browser focus styling and should not be copied literally without confirmation.

#### 4.8 Kitchen banner reveal

- **Where:** “From our kitchen / A feast worth gathering for.”
- **Trigger:** scroll.
- **Moves:** the full-bleed photograph enters from below with the page; centered text fades into readable contrast.
- **Properties:** opacity and modest translateY; possibly background-position parallax, though the recording is not sufficient to prove it.
- **Timing:** approximately 0.6–0.9 s.
- **Mode:** one-shot; not clearly pinned.

#### 4.9 Signature-card reveals

- **Where:** “Dishes with a story to tell.”
- **Trigger:** scroll into viewport.
- **Moves:** cards appear in reading order with a small rise and fade. On mobile, cards reveal down a single column.
- **Properties:** translateY, opacity, image exposure.
- **Timing:** ~0.5–0.8 s per group, with ~0.08–0.15 s stagger.
- **Character:** controlled and consistent; the photographs remain the focus.
- **Mode:** one-shot.

#### 4.10 Statistics count-up

- **Where:** “The tale so far / A story worth telling.”
- **Trigger:** statistics panel enters the viewport.
- **Moves:** numeric values increment to approximately 4.8 rating, 410 reviews, and 100+ dishes. Infinity appears as a symbolic final value.
- **Properties:** text content/value; perhaps a slight opacity rise around each number.
- **Timing:** roughly 1.3–1.8 s on desktop; around 1 s is visible on the faster mobile pass.
- **Easing:** decelerating count, fast initially and settling gently.
- **Mode:** one-shot per page visit in the footage.

#### 4.11 Room collage reveal

- **Where:** “The Room / Beneath the blossoms.”
- **Trigger:** scroll.
- **Moves:** collage images rise/fade in and the text follows or alternates beside them on desktop. Mobile becomes one column with text before/around the collage.
- **Properties:** translateY, opacity; no visible card spin.
- **Timing:** ~0.6–0.9 s with editorial stagger.
- **Mode:** one-shot.

#### 4.12 Testimonial rating and quote transition

- **Where:** testimonial section over a dim room photograph.
- **Trigger:** entry and then time.
- **Moves:** rating counts to 4.8; stars and quote settle in. Later, quote and attribution crossfade to the next testimonial while the overall background and rating remain stable.
- **Properties:** numeric interpolation, opacity, slight vertical shift for text.
- **Timing:** rating ~0.8–1.1 s; quote crossfade ~0.3–0.5 s; slide dwell cannot be measured confidently from the short captured interval.
- **Easing:** soft ease-out.
- **Mode:** initial one-shot plus likely timed carousel. Dots communicate position.

#### 4.13 Private-dining reveal

- **Where:** “Private Dining & Celebrations.”
- **Trigger:** scroll.
- **Moves:** framed photograph and copy rise into place with restrained fade.
- **Properties:** translateY and opacity.
- **Timing:** ~0.6–0.9 s.
- **Mode:** one-shot.

#### 4.14 Final conversion cards

- **Where:** “Your Table Awaits / Two ways to taste the tale.”
- **Trigger:** scroll; hover states are implied but not clearly exercised.
- **Moves:** two cards settle into view; CTAs provide normal button feedback.
- **Properties:** opacity, translateY, button color/arrow movement.
- **Timing:** ~0.5–0.8 s.
- **Mode:** one-shot entrance, reversible CTA feedback.

#### 4.15 Footer entrance

- **Where:** page end.
- **Trigger:** normal scroll.
- **Moves:** no separate theatrical reveal is visible. The large watermark and columns arrive with page flow.
- **Mode:** normal document movement.

### Gallery motion

#### 4.16 Gallery hero image settle

- **Where:** Gallery top.
- **Trigger:** route arrival and asset load.
- **Moves:** title structure appears first; blossom background follows through a short opacity/exposure fade.
- **Timing:** about 0.2–0.4 s after route content is visible.
- **Mode:** one-shot.

#### 4.17 Masonry image loading

- **Where:** Gallery grid.
- **Trigger:** load/viewport proximity.
- **Moves:** placeholders become photographs. Some frames briefly show dark or empty outlined tiles before the assets appear.
- **Properties:** opacity, possibly a slight brightness transition.
- **Timing:** variable by asset, generally under half a second once loaded.
- **Mode:** one-shot lazy-load behavior.

The recording scrolls the gallery rapidly. That speed is user input, not a programmed gallery animation.

### Menu motion

#### 4.18 Menu hero arrival

- **Where:** Menu page top.
- **Trigger:** navigation.
- **Moves:** text and navigation structure appear quickly; the spice image settles through opacity/exposure.
- **Timing:** structural swap <=0.2 s; image ~0.2–0.4 s.
- **Mode:** one-shot.

#### 4.19 Category active-state change

- **Where:** horizontal menu navigation.
- **Trigger:** category click/tap or arrival at an anchor.
- **Moves:** the selected label receives a compact filled pill/highlight. On mobile, the strip can move horizontally to keep nearby choices reachable.
- **Properties:** background, text color, possibly translateX of the strip.
- **Timing:** ~0.15–0.3 s.
- **Mode:** reversible state transition.

#### 4.20 Anchor movement between menu groups

- **Where:** long menu document.
- **Trigger:** category selection.
- **Moves:** page jumps or quickly scrolls to the corresponding category section. The footage is too compressed and manually navigated to establish whether this is native smooth scrolling or a controlled tween.
- **Mode:** one navigation action per tap.

### Animations requested in the brief but not visible

- **Menu open/close:** the mobile hamburger is never opened, so overlay direction, stagger, close gesture, and timing are unknown.
- **Custom cursor:** no custom cursor is visible; the desktop recording shows a normal pointer.
- **Magnetic buttons:** no pointer-following displacement is demonstrated.
- **Keyboard navigation:** not tested.
- **Swipe-controlled chapters:** not demonstrated. Vertical touch scrolling drives the mobile journey.
- **Loader:** no branded loader is captured.
- **Complex page transition:** no curtain, wipe, morph, or shared-element transition is visible.
- **Definite image parallax:** small apparent shifts can be explained by normal page scroll; a separate parallax layer is not proven.

---

## 5. Navigation and interaction

### Desktop header

- Fixed across the page on a dark or translucent navy surface.
- Menu/navigation control on the left.
- Qissa emblem centered.
- Ordering and reservation actions on the right.
- The reservation CTA is visually primary through a gold fill/glow.
- The header maintains a calm height, approximately 68–76 px in the recording.

The desktop menu itself is not opened, so the exact navigation architecture behind the left control remains unknown.

### Mobile header and menu

- Fixed header with the emblem at left and a hamburger at right.
- Desktop ordering/reservation actions are removed from the bar to protect space.
- The hamburger's open/close behavior is not recorded.

### Moving through the story

- The home page is primarily navigated by normal vertical scroll.
- Masterpieces converts vertical scroll into horizontal plate movement.
- Gallery and full menu are reached through CTA taps.
- Menu categories are reached by compact tabs/anchors.
- Testimonials appear to advance by time and expose dots, but arrows/swiping were not tested.
- The browser Back action restores the prior home scroll position after Gallery.

### Mobile gestures

Observed gestures are vertical swipes for page scroll, taps on CTAs, and taps on menu-category pills. Direct horizontal dragging of Masterpieces, Gallery, or testimonials is not shown.

### Pointer and button behavior

- Desktop cuisine cards react strongly to hover.
- Buttons react with small color/icon changes.
- No custom cursor is visible.
- No magnetic attraction is visible.
- No exaggerated tilt or spring is visible.

### Smooth-scroll behavior

The page feels lightly damped, with slightly eased continuation after wheel/touch input. It avoids the long, delayed floating effect that makes some cinematic sites hard to use. A smooth-scroll library is plausible but not proven from recording alone.

---

## 6. Visual system

### Typography

The system pairs a high-contrast classical display serif with a compact sans-serif:

- **Display serif:** titles, large statements, statistics, and editorial pull quotes. It has a literary, hospitality-led character rather than a geometric or technology feel.
- **Sans-serif:** body copy, navigation, buttons, prices, labels, and metadata.
- **Eyebrows:** uppercase, small, widely tracked, often gold or muted ivory.

Approximate scale at the recorded widths:

| Role | Desktop | Mobile |
|---|---:|---:|
| Hero title | 64–80 px | 36–44 px |
| Major section heading | 40–56 px | 28–36 px |
| Card title | 20–30 px | 19–26 px |
| Body | 14–18 px | 14–16 px |
| Eyebrow/navigation | 9–12 px | 9–11 px |

Headlines generally occupy short lines. The design does not force long promotional paragraphs into display type. Line height is tight for headings and relaxed for body copy. Labels use tracking to add ceremony without making every line loud.

### Layout rhythm

- Desktop content uses a contained editorial width around 1200–1400 px, depending on the section.
- Full-bleed media interrupts contained sections at deliberate points.
- Desktop spacing between major chapters is approximately 80–160 px.
- Mobile spacing contracts to roughly 48–88 px while preserving clear chapter breaks.
- Asymmetry appears in story/collage sections, while category and statistic sections use strict grids.
- Long menu pages use stable repeatable rows, reducing cognitive load after the expressive homepage.

### Color and contrast

The reference is dominated by:

- deep midnight/navy backgrounds;
- ivory/white text;
- brass/champagne gold accent;
- bright food colors contained inside photography;
- occasional muted borders and blue/cyan interaction feedback.

Dark overlays normalize photographs and protect white type. Gold is used selectively on primary actions, labels, lines, and numbers. It does not coat every card.

### Image and video treatment

- Hero video is full-bleed, cover-cropped, and strongly overlaid.
- Food photography is warm, detailed, and tightly cropped.
- Masterpiece dishes are circular/top-down and read like objects on a stage.
- Signature images use bottom gradients where text overlays the photo.
- Room and gallery images retain natural composition and varied aspect ratios.
- Gallery tiles are lazy-loaded and use a masonry arrangement.
- Mobile receives portrait-aware crops and, in the hero, appears to use a specifically suitable vertical edit.

### Borders, radii, shadows, and texture

- Borders are thin, low-contrast, and often warm/gold-tinted.
- Radii are moderate, approximately 12–20 px on many media cards; they never become bubbly everywhere.
- Heavy drop shadows are rare. Depth comes from imagery, overlays, and separation in tone.
- CTA glow is reserved for the main gold action.
- A subtle star/dust speckle texture appears over deep navy areas, giving large dark fields tactile depth.
- Fine rules and small gold lines help structure sections without boxing everything.

---

## 7. Mobile versus desktop

| Concern | Desktop | Mobile |
|---|---|---|
| Hero media | Wide cinematic treatment across the viewport. | Portrait-oriented composition that keeps subjects meaningful in a narrow frame. |
| Header | Left control, centered emblem, right ordering/reservation actions. | Emblem and hamburger only. |
| Hero actions | Two actions on one row. | Stacked touch-friendly actions. |
| Typography | Large display scale and longer controlled line lengths. | Smaller but still dominant headings; more line breaks. |
| Origin story | Text and collage share the viewport. | Primarily single-column text in the visible recording; desktop collage is omitted or repositioned. |
| Masterpieces | Multiple large plates can be perceived at once. | One main plate plus narrow neighboring fragments. |
| Cuisine categories | Six-card row with pointer-driven focus, scale, and dimming. | Full-width vertical cards; no hover dependency. |
| Signature dishes | Asymmetric/two-column editorial grid. | Single-column sequence. |
| Statistics | Four columns. | 2 × 2 grid. |
| Room/private dining | Split editorial layouts with side-by-side copy and collage. | Linear reading order: copy, action, then imagery. |
| Menu navigation | Wide pill row with many categories visible. | Horizontally scrollable strip with only a few labels visible. |
| Menu content | Two-column item lists and panoramic category imagery. | Single-column menu rows and compact category images. |
| Gallery | Not demonstrated on desktop. | Two-column masonry with variable tile heights. |
| Motion pacing | Hover states and larger scroll stages can breathe longer. | Shorter reveal distances, fewer simultaneous layers, and direct touch response. |
| Gestures | Wheel/trackpad and hover. | Vertical swipe and tap. No captured direct chapter swipe. |

The mobile design is not a uniformly shrunk desktop layout. It changes information density, interaction mode, media composition, and reading order. That is essential to reproduce.

---

## 8. What creates the premium feeling

1. **The site waits before it explains.** The first viewport is sensory and emotionally legible, with very little copy.
2. **One visual idea leads each chapter.** Video, plate strip, cards, numbers, collage, or testimonial—never all effects at once.
3. **Motion follows reading order.** Labels, headings, copy, and images settle in sequence instead of appearing as an undifferentiated group.
4. **Scroll animation is used for one signature moment.** The horizontal Masterpieces chapter is memorable because every other section is quieter.
5. **The motion has no bouncey template character.** Scale, opacity, and translation are restrained; easing settles cleanly.
6. **Photography carries texture.** Warm food detail and dim room imagery do more work than decorative gradients or floating blobs.
7. **Dark treatment is consistent.** Different images feel as though they belong to the same evening world.
8. **Gold is rationed.** It marks moments of value and action, so it retains meaning.
9. **Whitespace creates pauses.** Each chapter receives enough vertical room to register before the next appears.
10. **Typography is editorial.** Short serif statements create authority while the sans-serif remains easy to use.
11. **The menu becomes calmer.** Once users need practical information, the design reduces spectacle and increases consistency.
12. **Mobile is art-directed.** Portrait media, stacked controls, and simplified compositions preserve the idea rather than the exact desktop geometry.
13. **Social proof arrives after desire.** Reviews support an experience the user already wants instead of leading with sales persuasion.
14. **Transitions are fast at decision points.** Route changes and controls answer quickly; cinematic pacing is reserved for observation, not navigation.
15. **There is visible restraint.** No constant 3D tilt, particle field, oversized glass panels, random text shimmer, or motion on every object.

---

## 9. Likely technical approach

This section separates evidence-based inference from speculation.

| Confidence | Likely approach | Reasoning |
|---|---|---|
| **Confident** | Responsive HTML video with autoplay, muted, loop, and plays-inline behavior | The hero plays without controls or user initiation on both desktop and mobile. |
| **Confident** | Separate or intentionally art-directed desktop/mobile hero media | Mobile composition preserves meaningful portrait framing rather than simply clipping a wide subject at the center. |
| **Confident** | Fixed or sticky site header | Header remains in place throughout long scroll passages. |
| **Confident** | Lazy-loaded gallery and lower-page images | Placeholders and delayed image opacity are visible during rapid mobile scrolling. |
| **Confident** | Responsive breakpoints with component reordering | Multi-column desktop chapters become single-column mobile sequences, and hover-only behavior is replaced. |
| **Confident** | Anchor/category navigation in the menu | Selecting categories updates the active pill and moves to named menu sections. |
| **Confident** | Intersection-based entrance triggers | Reveals and number counting begin as sections enter the viewport. This could be IntersectionObserver or an animation library. |
| **Guess, strong** | GSAP ScrollTrigger for Masterpieces | The pinned, scroll-scrubbed vertical-to-horizontal sequence fits ScrollTrigger closely. A custom requestAnimationFrame implementation is also possible. |
| **Guess, moderate** | GSAP timelines for reveal groups and counters | Staggered reveals and count-up timing are consistent with GSAP, but CSS/IntersectionObserver can produce the same result. |
| **Guess, moderate** | Lenis or a similar lightweight smooth-scroll layer | Scroll has mild damping and remains responsive. The recording cannot distinguish Lenis from browser/platform scrolling plus CSS. |
| **Guess, moderate** | Swiper, Embla, or a small custom testimonial carousel | Timed crossfade and pagination dots suggest a standard carousel primitive. |
| **Guess, strong** | CSS keyframes or a simple GSAP loop for the gold marquee | The repeated words translate continuously at steady speed. |
| **Guess, moderate** | Hero video poster, preload metadata/auto, and compressed MP4/WebM variants | This would explain quick visual readiness and is the appropriate production strategy, but network details are not visible. |
| **Guess, moderate** | `srcset`/responsive image delivery plus modern formats | Necessary for a photography-heavy mobile site; not provable from video. |
| **Guess, weak** | A client-side router with minimal transition hooks | Route content changes rapidly and then imagery fades. The same behavior could also come from fast multi-page navigation and browser caching. |

There is no visual evidence of Three.js, WebGL, elaborate shader work, a global custom cursor, or a heavy page-transition framework. Those technologies are unnecessary to recreate the observed quality.

### Performance techniques we should adopt regardless of the original implementation

- Supply genuinely separate 16:9 and 9:16 hero edits.
- Keep the first video muted, short, and aggressively compressed; include a poster frame.
- Preload only the hero media and critical logo/font assets.
- Lazy-load gallery and below-fold photography.
- Animate transform and opacity whenever possible.
- Disable or simplify scrubbed sequences under reduced-motion preferences.
- Avoid decoding many full-resolution food images simultaneously.
- Preserve scroll restoration when returning from Gallery/Menu.

---

## 10. Mapping the system to Krushna's Heaven

### Brand hierarchy

Krushna's Heaven must be the primary brand. Mr Gelato should appear as the gelato franchise/partner inside one category, not as the site's master identity. The Krushna's Heaven logo belongs in the header and all first-impression moments.

### Reference-to-Krushna mapping

| Qissa system | Krushna's Heaven translation |
|---|---|
| Cinematic food-and-room hero | A short original montage around **“Five cravings. One address.”** showing all five categories and the café as the shared destination. |
| Dark evening mood | Ivory content fields, deep wine/mulberry contrast sections, Krushna pink actions, and warm amber photography. Premium comes from controlled contrast rather than copying navy and gold. |
| “What is Qissa?” origin chapter | “A sweeter place for happier days”: a short story about family, variety, and bringing people together at one address. |
| Masterpieces plate strip | Five cinematic chapter objects/scenes: Gelato, Woodfire Pizza, Brews, Waffles, and Savoury Bites. Vertical scroll drives a horizontal progression through them. |
| Sensory word marquee | A branded rhythm line using original language tied to Krushna's: churned, fired, brewed, pressed, shared—or similarly concise verified copy. |
| Six cuisine hover cards | Five category cards. Desktop can use the same focus-and-dim system; mobile must use stacked or snap-friendly cards with no hover dependence. |
| Kitchen banner | A real café-wide moment: woodfire flame, gelato counter, or a table shared by a family. It should reconnect the categories to one physical place. |
| Signature dish cards | Real Best Seller, Must Try, and Chef Special items from the final menu. Use genuine menu prices and real photography when supplied. |
| Stats | Only verifiable facts: rating/review total, years, menu breadth, or another client-approved number. Do not invent “100+” or visitor counts. |
| Room section | The real Krushna's Heaven exterior, illuminated sign, gelato counter, seating, and family-friendly environment. |
| Testimonials | Real customer or critic quotations with source/attribution. Avoid fabricated praise in the final release. |
| Private dining chapter | Adapt only if the café actually supports parties, birthdays, groups, or reservations. Otherwise use “Made for family time” or another truthful visit-led section. |
| “Your Table Awaits” | Make **Visit Us / Get Directions** the primary conversion because the client's stated goal is café visits. Ordering can remain secondary. |
| Gallery masonry | Real café exterior/interior, preparation, dishes, and people. Maintain varied crop ratios and editorial order. |
| Long menu | Five top-level category anchors, then the detailed final menu beneath them. Keep the practical menu visually calmer than the homepage. |

### Our five chapters

The five chapters should each have a distinct sensory action and media shot while sharing one timing grammar:

1. **Premium Gelato** — spatula folds dense gelato; scoop pulls through texture; final cup is presented. Mr Gelato can be identified here as the franchise partner.
2. **Woodfire Pizza** — dough stretch, sauce/cheese, flame in the oven, blistered crust landing on the table.
3. **Brews** — espresso extraction, milk microfoam, latte-art finish, cup placed into warm window light.
4. **Waffles** — batter pour, iron close, steam release, crisp waffle finished with fruit or gelato.
5. **Savoury Bites** — grill or pan detail, finishing seasoning, and a shareable plate joining the table.

These are chapters in one café story, not five mini-brands competing for attention.

### Hero montage recommendation

Create an original **12–18 second seamless montage** with five short process beats and one ending café/family beat:

- 0–3 s: gelato texture and scoop;
- 3–6 s: pizza and woodfire flame;
- 6–8.5 s: espresso extraction;
- 8.5–11 s: waffle steam and finish;
- 11–14 s: savoury bite plating;
- 14–18 s: the café/table/sign, resolving back to the opening color or motion for a clean loop.

Desktop should use a wide edit with space for left/center copy. Mobile should use a separately edited 9:16 version with close actions and centered subjects. It should not be a mechanical crop of the desktop file.

### Krushna visual language

- **Foundation:** warm ivory rather than pure white.
- **Primary dark:** deep wine/mulberry for premium contrast and serif display text.
- **Action color:** Krushna raspberry/pink in concentrated areas—buttons, active rules, small tags, and focus states.
- **Warmth:** amber and caramel drawn from café lighting, crust, espresso, and waffle photography.
- **Photography grade:** warm, tactile, appetising, and consistent; control pink saturation so food remains natural.
- **Type:** a confident dark-wine editorial serif paired with a precise sans-serif.

The premium effect should come from crop quality, typography, spacing, motion timing, and real imagery. It should not depend on covering the interface in gradients or glass effects.

### What can be adapted as a system

- emotional-to-practical narrative order;
- hero video as the main atmospheric device;
- one signature pinned horizontal chapter;
- restrained scroll reveals;
- hover focus on desktop with a non-hover mobile equivalent;
- editorial mix of full-bleed media and contained text;
- section pacing and whitespace;
- calm, utility-first menu architecture;
- fast navigation feedback and scroll restoration;
- desktop/mobile art direction rather than simple resizing.

### What must remain original

- all code and animation implementation;
- Krushna's Heaven logo and brand hierarchy;
- photographs and video footage;
- words, section titles, labels, menu descriptions, and claims;
- exact colors, typography, icons, shapes, and page compositions;
- the five-category chapter concept and category-specific direction;
- all customer data, prices, contact details, location details, and testimonials.

We should reproduce the **discipline and choreography**, not trace Qissa's screens.

---

## 11. Gaps and questions

### What the recordings do not prove

1. **Hero loop duration and loop seam:** neither recording remains on the hero long enough to show a full repeat.
2. **Initial page load:** recordings begin with the interface already visible, so any loader or first-entry title animation is absent.
3. **Mobile hamburger:** it is never opened; layout, reveal direction, stagger, focus trap, and close gesture are unknown.
4. **Desktop main navigation:** the left-side control is not opened.
5. **Full page set:** Our Story, Private Dining, Journal, and Visit & Contact appear in navigation but are not visited.
6. **Gallery desktop layout:** only mobile Gallery is recorded.
7. **Complete drinks menu:** desktop reaches a drinks hero and Cocktails, but does not document every drinks category.
8. **Testimonial control:** only one automatic-looking crossfade is visible; arrow, dot, swipe, pause-on-hover, and full interval behavior are not tested.
9. **Keyboard behavior:** no keyboard interaction is recorded.
10. **Reduced-motion behavior:** system accessibility settings are not demonstrated.
11. **True parallax:** the footage does not separate normal scroll movement from independent background-position animation.
12. **Exact easing curves and source durations:** visual estimates can guide matching, but source values cannot be recovered from screen video.
13. **Hover treatment outside cuisine cards:** the pointer does not systematically test every link/card.
14. **Whether smooth scrolling is a library:** browser/platform behavior and a mild smoothing library can look similar in a recording.
15. **Video audio strategy:** no sound controls or audible behavior are demonstrated.

### Footage that would remove the remaining uncertainty

- A fresh-load recording from a fully closed browser tab, held on the hero until the montage visibly loops once.
- Desktop and mobile recordings opening and closing the main menu slowly.
- Slow recordings of each footer-linked page from top to bottom.
- A desktop Gallery pass.
- A complete drinks-menu pass.
- A pointer-only desktop pass that deliberately hovers every interactive component.
- A mobile pass that attempts horizontal swipes on Masterpieces and Testimonials.
- A reduced-motion pass, if accessibility parity is an important reference requirement.

### Questions for the Krushna implementation, to resolve before production

These are not blockers for concept work, but they affect the final production plan:

1. Can the client supply or approve original preparation footage for all five categories, in both landscape and portrait framing?
2. Which five to ten products have the strongest real photographs and verified menu names/prices?
3. Which claims about low fat, low calorie, natural, fresh, or fat-free are approved for public use?
4. Does Krushna's Heaven accept table reservations, party enquiries, online orders, or all three?
5. Are ratings, review totals, founding year, and visitor/menu statistics verified and current?
6. Are family/customer faces cleared for website use?
7. Should the site expose the Mr Gelato partnership inside the Gelato chapter only, or also in the footer/about story?

---

## Working conclusion

Qissa feels premium because it combines **cinematic media, editorial typography, spacious chapter pacing, one memorable scroll-controlled sequence, and restrained interaction feedback**. Its strongest reusable idea is not a specific color or component. It is the way the page moves from atmosphere to meaning, craft, menu breadth, proof, place, and finally action.

For Krushna's Heaven, the correct adaptation is a brighter ivory-and-raspberry world supported by deep wine and warm amber photography. The five categories should become the central narrative, with a separately edited desktop/mobile hero montage followed by one tactile DNA-style 3D carousel. The rest of the motion should remain quiet enough for that moment—and the food—to feel special.


---

## Approved build and motion plan

# Krushna's Heaven Build Plan

## Status and purpose

This is an implementation plan only. It does not authorize construction, asset generation, deployment, or changes to the website.

The goal is to translate the reference system analysed and consolidated above into an original Krushna's Heaven experience: cinematic, editorial, responsive, family-welcoming, and premium. Krushna's Heaven remains the parent brand. Mr Gelato appears inside the Premium Gelatos chapter as a franchise partner.

The governing motion principle is:

> **One cinematic entrance, one unforgettable scroll chapter, and quiet precision everywhere else.**

We will not animate every object. The hero establishes mood, the five-signature DNA carousel delivers the signature interaction, and the rest of the interface uses motion only for reading order, state, and feedback.

---

## 1. Animation and interaction priority

### Priority 1 — Cinematic hero montage

**Classification: Must-have**

The hero is the emotional entry point and the first proof that the site is premium.

It will include:

- a poster-first full-viewport media stage;
- a landscape montage for desktop and a separately edited portrait montage for mobile;
- a dark wine-to-transparent contrast treatment that protects the copy without making the food muddy;
- a short ordered entrance for the logo/header, eyebrow, headline, supporting sentence, actions, and scroll cue;
- a muted autoplay loop only after the poster has rendered;
- a discreet accessible way to pause continuous background motion;
- automatic pausing when the hero is offscreen or the browser tab is hidden;
- a still-poster experience for reduced-motion, low-data, failed-video, and unsupported-autoplay conditions.

The headline and actions will remain stable while the film changes. No word rotator, floating 3D object, particle system, or constant mouse-follow effect will compete with the montage.

### Priority 2 — Five-signature DNA carousel

**Classification: Must-have**

This is the signature interaction of the site and the first major section after the hero. It will present:

1. Premium Gelatos
2. Woodfire Pizza
3. Brews
4. Waffles
5. Savoury Bites

The five cards will behave as one continuous curved 3D orbit. On desktop, a short scroll-led introduction will advance through the five resting positions and direct drag will remain available. On mobile, a shallower swipe-led orbit will sit in normal vertical page flow. Each category will have:

- a chapter number and category name;
- one strong image or short muted process loop;
- one brief sensory line;
- an optional verified featured item;
- a direct route to the matching menu anchor;
- a visible five-step progress indicator;
- an accessible semantic card and menu link independent of the visual transform.

Only the active card will receive full contrast, foreground scale and optional video playback. Neighboring cards remain visible in progressively reduced depth, opacity and scale so direction is understandable without distracting from the active frame. The system must move continuously through space; independent card fades or hard slide cuts are not an acceptable substitute.

### Priority 3 — Navigation and full-screen menu

**Classification: Must-have**

The navigation must feel immediate and dependable because it is used repeatedly.

Planned behavior:

- transparent header over the hero;
- solid ivory or deep-wine state after leaving the hero, selected according to the page background;
- desktop navigation with immediate hover/focus feedback;
- a full-screen mobile menu with Krushna's primary routes, directions, hours, phone/WhatsApp, and social access;
- short clip or curtain reveal for the full-screen menu;
- staggered links in reading order;
- Escape-to-close, focus containment, focus restoration, and locked background scroll;
- instant or greatly simplified behavior under reduced motion.

The menu transition will be fast enough to feel functional. It will not imitate Qissa's exact shape or choreography.

### Priority 4 — Section reading-order reveals

**Classification: Must-have**

Major editorial sections will reveal in a consistent order:

1. eyebrow;
2. headline;
3. supporting copy;
4. action;
5. image or image group.

Most sections will use a small upward movement and opacity change. Reveal distances stay short, and each section runs once. Long text, menu prices, contact information, and anything the user is actively trying to read will remain stable after appearing.

### Priority 5 — Image and video reveals

**Classification: Must-have**

Large photographs will enter with controlled masks or exposure reveals:

- hero poster transitions cleanly into video;
- chapter images reveal from a directional crop related to scroll direction;
- story and café images use simple overflow-mask reveals;
- gallery images fade from a tonal placeholder as they load;
- menu photography remains quieter and quicker than homepage imagery.

No image will spin, bounce, or repeatedly zoom. A slow background-position shift may be used in one or two full-bleed sections only after performance testing.

### Priority 6 — Buttons, links, cards, and active states

**Classification: Must-have**

Functional feedback will be quick and subtle:

- buttons compress slightly on press;
- arrows travel a few pixels in the direction of action;
- underline or indicator movement confirms navigation state;
- desktop category cards gain modest scale/brightness emphasis while siblings recede;
- hover motion is gated to devices with a fine pointer;
- focus styles remain visible and do not depend on hover;
- mobile receives touch feedback without sticky hover states.

These interactions will use short CSS transitions rather than GSAP timelines.

### Priority 7 — Menu navigation behavior

**Classification: Must-have**

The complete menu needs practical interaction rather than spectacle:

- sticky category rail after the menu introduction;
- direct anchor navigation to each of the five pillars and their subcategories;
- active-category indicator that updates while scrolling;
- horizontally scrollable category rail on mobile;
- automatic alignment of the active mobile pill without fighting user scroll;
- optional search only if the verified final item count makes it materially useful;
- no decorative delay when filtering or jumping to a section.

### Priority 8 — Testimonial transition and verified counters

**Classification: Must-have only when real content is available; otherwise omitted**

If the client supplies verified reviews and statistics:

- statistics count once when they enter the viewport;
- testimonial copy crossfades with a small vertical settle;
- controls and dots remain operable by keyboard and touch;
- autoplay pauses on hover, focus, touch interaction, hidden tabs, and reduced motion.

We will not display invented review counts, ratings, years, visitor totals, or quotations merely to fill this section.

### Priority 9 — Sensory word marquee

**Classification: Nice-to-have**

A slow repeating line may separate major chapters using original Krushna language such as “churned · fired · brewed · pressed · shared.”

It will:

- run at constant linear speed;
- pause or become static under reduced motion;
- appear once on the homepage;
- avoid duplicating Qissa's words, colors, or exact band treatment.

### Priority 10 — Lightweight page transitions

**Classification: Nice-to-have**

Navigation between Home, Menu, Our Story, and Visit Us may use a short tonal fade or masked image settle where supported. The route must change immediately; the transition cannot delay access to content.

This will be progressive enhancement. Unsupported browsers will receive normal navigation.

### Priority 11 — Ambient image movement

**Classification: Nice-to-have**

One or two large images may use very slow, low-amplitude parallax after device testing. It will be removed on touch devices if it introduces judder and disabled for reduced motion.

### Priority 12 — Custom cursor or magnetic behavior

**Classification: Excluded from the initial build**

The reference does not rely on a custom cursor. A custom cursor would add complexity without improving the visit goal. Magnetic movement may be tested later on a single desktop hero action, but it is not part of the approved baseline.

### Priority 13 — Three.js, WebGL particles, and continuous 3D effects

**Classification: Excluded**

The new Qissa-led direction depends on film, photography, typography, and controlled scroll choreography. WebGL would add load and device risk while weakening the editorial restraint.

---

## 2. Must-have versus nice-to-have summary

### Must-have

- responsive hero montage with poster and accessibility fallbacks;
- ordered hero entrance;
- transparent-to-solid header behavior;
- accessible full-screen mobile navigation;
- five-experience scroll journey;
- progress and active states for all five chapters;
- one-shot reading-order reveals;
- controlled image/mask reveals;
- button, link, focus, and touch feedback;
- sticky menu category navigation;
- mobile-specific motion and layout rather than scaled desktop behavior;
- reduced-motion versions of every major animation;
- visibility pausing and offscreen pausing for media/timed movement;
- verified-content-only testimonials and counters.

### Nice-to-have

- sensory word marquee;
- progressive page transitions;
- subtle limited parallax;
- autoplay testimonial rotation after usability testing;
- short active-category process loops in place of stills when suitable footage exists;
- restrained desktop pointer response on one hero visual or CTA;
- Lenis-style scroll damping if later testing proves it improves the site without harming mobile or accessibility.

### Explicitly excluded from the first production version

- Three.js gelato model;
- particle field or persistent decorative canvas;
- motion on every card;
- scroll-jacking that ignores user input;
- a large visible play/pause button among the chapter navigation controls;
- custom cursor as a site-wide requirement;
- duplicated Framer Motion and GSAP animation systems;
- a pint builder unless the café confirms that customers can actually build one;
- fabricated social proof, health claims, or menu facts.

---

## 3. Tools and responsibilities

### GSAP core

**Use:** Complex marketing timelines that require sequencing and clean interruption.

GSAP will control:

- the hero's initial staged entrance;
- the DNA carousel's shared orbit angle, depth states and active-category transitions;
- category image/copy choreography where CSS alone would become difficult to coordinate;
- verified number count-ups;
- cleanup and reversal when breakpoints or preferences change.

GSAP is justified because the project already needs coordinated scroll animation. It will not be used for basic button hover or color changes.

### GSAP ScrollTrigger

**Use:** The short desktop introduction to the DNA carousel and selected viewport-driven transitions.

ScrollTrigger will provide:

- short pinning on capable desktop layouts only;
- scroll-progress mapping to the five carousel resting positions;
- shared orbit rotation rather than independent slide translation;
- active category/progress updates;
- precise start/end measurements;
- refresh handling after fonts, media metadata, and responsive layout changes;
- breakpoint-specific timelines through match-media behavior.

ScrollTrigger is the correct tool for the desktop introduction because its state must remain synchronized with scroll position and reverse correctly when the user scrolls backward. It will not control ordinary mobile page scrolling.

### GSAP Observer or Draggable

**Use:** Interruptible direct manipulation of the DNA carousel.

The gesture layer will provide:

- horizontal pointer and touch drag mapped to the same shared orbit angle;
- open-hand and active-grab cursor feedback on fine pointers;
- velocity-aware release with restrained inertia;
- soft settling to the nearest category position;
- click-to-focus behavior for visible side cards;
- cancellation and retargeting from the current position when the user changes direction.

The gesture system must cooperate with ScrollTrigger rather than start a second competing animation. Mobile horizontal intent will be distinguished from vertical page scrolling, and the control will not call `preventDefault()` until horizontal intent is clear.

### CSS transitions

**Use:** High-frequency interface feedback.

CSS will handle:

- button press and hover;
- arrow movement;
- color and border changes;
- navigation indicators;
- focus presentation;
- card emphasis on fine-pointer devices;
- mobile menu control feedback.

These transitions will name only the affected properties. Functional interactions will generally stay between 100 and 250 ms.

### CSS keyframes

**Use:** Predetermined constant motion.

The sensory marquee, if approved, will use a linear CSS animation. It does not require a frame-by-frame JavaScript loop.

### IntersectionObserver

**Use:** Simple one-shot section reveals, lazy media activation, and offscreen pausing.

This avoids using ScrollTrigger for every minor element and keeps the motion system understandable. IntersectionObserver will mark a section as entered; CSS will perform the transform/opacity transition.

### Native HTML video

**Use:** Hero and optional short chapter loops.

The media element will provide:

- muted, inline autoplay where allowed;
- WebM and MP4 sources;
- a poster image visible before playback;
- manual pause/resume control;
- visibility and offscreen pausing;
- no-audio dependency;
- static fallbacks.

Video remains content, not a CSS background, so it can be managed accessibly and efficiently.

### Native browser scroll

**Use:** Default scrolling on every device.

Native scrolling is the baseline because it gives the best touch behavior, accessibility, browser history restoration, and mobile address-bar compatibility. The page can still feel premium through ScrollTrigger choreography and disciplined easing.

### Lenis or another smooth-scroll library

**Status: Nice-to-have, conditional**

Lenis will be considered only after the complete native-scroll version is stable. It will be enabled only if side-by-side testing shows a meaningful improvement on desktop trackpads and mouse wheels.

Conditions for adopting it:

- no degraded keyboard navigation;
- correct anchor links and browser Back behavior;
- no conflict with ScrollTrigger pinning;
- no lag on mid-range hardware;
- no interference with mobile touch or browser chrome;
- complete removal under reduced motion if smoothing feels like unwanted movement.

The plan does **not** depend on Lenis. Mobile will remain native-scroll-first.

### CSS scroll snap

**Use:** Mobile fallback if the shallow 3D swipe treatment is unreliable on real devices.

The fallback will expose all five semantic cards in a horizontally scrollable rail with native momentum, clear partial next-card visibility, and accessible previous/next controls. It will not require a carousel library.

### View Transitions API

**Status: Nice-to-have progressive enhancement**

It may support a short page fade or shared header continuity on compatible browsers. Normal navigation remains the fallback.

### Tools deliberately avoided

- **Framer Motion:** avoids a second runtime and competing motion vocabulary when GSAP is already necessary.
- **Swiper/large carousel library:** unnecessary for five categories and a simple testimonial crossfade.
- **Three.js/WebGL:** unnecessary for the approved DNA visual; semantic DOM cards and CSS 3D preserve accessibility while delivering the required depth.
- **Heavy scroll hijacking:** risks accessibility and mobile reliability.

---

## 4. Hero montage behavior

### Desktop hero

#### Composition

- Full viewport opening with a minimum stable height and protected safe zones for browser chrome.
- Transparent header over the film.
- Copy sits on the left or within a controlled central-left column, depending on final footage composition.
- Primary headline: the approved equivalent of **“Five cravings. One address.”**
- Actions: **Explore the Menu** and **Plan Your Visit**, with visiting the café remaining the primary business outcome.
- A quiet scroll cue anchors the bottom edge.

#### Film structure

Recommended final duration: **12–18 seconds**.

Suggested sequence:

1. illuminated Krushna's Heaven exterior;
2. gelato texture and scoop;
3. dough, oven, and woodfire pizza finish;
4. espresso extraction or signature brew;
5. waffle steam and garnish;
6. savoury dish finish;
7. family/friends or a shared-table moment;
8. return to an exterior or color-compatible frame for a seamless loop.

Individual shots should generally hold 1.5–3 seconds. Cuts remain calm enough to read the headline. The montage will have no essential audio or text embedded in the video.

#### Entrance choreography

After the poster is visible:

1. header settles in;
2. eyebrow appears;
3. headline rises a short distance and resolves from soft opacity;
4. supporting sentence follows;
5. actions appear together with a small stagger;
6. scroll cue arrives last.

The entrance runs once. It will use transform and opacity, not layout properties. Marketing timing may be slightly slower than ordinary UI, but users can interact with the header and buttons immediately.

#### Scroll exit

The hero will leave naturally with the page. A very small media scale or vertical shift may be tied to the first portion of scroll, but the text will not remain pinned over unrelated content. The header changes to its readable page state near the hero boundary.

### Mobile hero

#### Separate media edit

Mobile receives a purpose-built 9:16 or similarly portrait master. It will prioritize hands, food texture, faces with permission, and the illuminated sign. It will not be a center crop of the desktop film.

Recommended duration: **10–14 seconds**, using the same story in tighter shots.

#### Layout

- stable `svh`-based hero with safe-area-aware padding;
- logo and menu trigger at the top;
- shorter headline lines positioned away from important subjects;
- stacked, full-width or nearly full-width actions;
- readable overlay tailored to each shot sequence;
- minimum 44 × 44 CSS-pixel controls;
- no tiny playback button mixed with chapter arrows.

#### Mobile behavior

- native inline muted autoplay when permitted;
- poster remains complete if autoplay is blocked;
- video pauses offscreen and while the tab is hidden;
- reduced motion uses the poster only;
- low-data mode avoids automatically fetching the full loop where detectable;
- no pointer parallax or desktop hover effects.

### Hero pause control

Continuous motion requires a user-accessible pause mechanism. It will be visually quiet and separate from navigation—likely a small labelled control at the lower edge or inside an accessibility/motion control area. It will not appear as a large carousel-style pause button. Its state will persist for the session and pause other optional timed motion as well.

---

## 5. Five-signature DNA carousel

### Approved reference reading

The supplied 6.17-second recording demonstrates a continuous, draggable 3D orbit rather than a conventional slider. A tall active card occupies the foreground while every other card moves along one connected curved path. Cards approaching the center gain scale, exposure and frontal orientation; cards leaving it recede through Z-depth, smaller scale, lower opacity and gentle Y-axis rotation. Horizontal drag controls the shared orbit, release carries restrained momentum and the nearest card settles without elastic bounce.

The reference's generic black overlay, `3D` badge, close control, anonymous imagery and lack of category information are not part of the Krushna implementation. We preserve its spatial choreography, tactile manipulation, depth hierarchy and restraint while rebuilding the experience in Krushna's identity.

### Content contract

Every category uses the same semantic contract:

- number `01–05`;
- category name;
- one original sensory line;
- one portrait-capable poster;
- optional short muted process loop;
- one verified signature item or descriptor;
- direct menu destination;
- meaningful alternative text for still imagery;
- static semantic content that remains understandable without animation.

The category order is fixed:

1. Premium Gelatos
2. Woodfire Pizza
3. Brews
4. Waffles
5. Savoury Bites

This creates a deliberate progression from cold and creamy through fire, aroma, crisp texture and finally a broader meal. Mr Gelato appears only within Premium Gelatos as the franchise partner.

### Visual system

- The stage follows the hero on a near-black deep-wine field with warm ivory type, restrained Krushna raspberry accents and warm amber media.
- The introduction uses the eyebrow **Our Five Signatures** and the approved central idea **Five cravings. One address.**
- The active portrait card occupies roughly 26–30% of a wide desktop viewport and 70–76% of the available stage height.
- Previous and next cards remain visible at middle depth, with more distant cards near the edges when space allows.
- Card spacing follows one continuous orbit. Independent card animations, hard slide cuts and unrelated crossfades are not acceptable substitutes.
- The active card is established primarily by depth, scale and exposure. Avoid animated glow, animated shadow and continuous blur.
- Active category information sits outside the media so photography remains clean: number, title, sensory line and **Explore** menu action.

### Desktop behavior

#### Entry and scroll introduction

- The hero exits naturally and the DNA stage begins with a short editorial introduction.
- On capable desktop layouts, the stage pins for a controlled distance of approximately 2–2.5 viewport heights, subject to real testing.
- Vertical scroll rotates the shared orbit through the five category resting positions.
- Reverse scrolling reverses the same motion from its current state.
- After Savoury Bites, the orbit opens slightly and releases into the following café story rather than ending in a hard cut.

#### Direct interaction

- Horizontal pointer drag rotates the same orbit used by scroll.
- Release carries restrained, velocity-aware inertia and settles softly to the nearest category.
- Clicking a visible side card focuses it.
- Arrow keys and accessible previous/next controls move one category at a time.
- The gesture must remain interruptible; changing direction retargets from the current transform instead of restarting a keyframe animation.
- Scroll and drag never compete for ownership. The last deliberate input updates one shared carousel state.

#### Active-state choreography

- The active card reaches full contrast, foreground scale and the most frontal orientation.
- Inactive cards recede through transform and opacity; continuous filter animation is avoided.
- The number changes with the resting category.
- Category title reveals through a short vertical mask.
- The sensory line follows with a restrained 40–80 ms stagger.
- The menu action follows last and remains immediately usable.
- Only the active card may play its short muted process loop; all other cards show poster frames.

### Mobile behavior

Mobile preserves the DNA identity without reproducing the desktop pinning burden:

- the section remains in normal vertical document flow;
- one dominant portrait card uses approximately 74–80% of the viewport width;
- adjacent cards remain partially visible at shallower depth;
- horizontal swipe advances the orbit while vertical intent continues page scrolling;
- rotation, Z travel and scale range are reduced;
- category copy remains below the visual and stable long enough to read;
- a clear `01 / 05` indicator and accessible previous/next controls expose progress;
- no hover-only content and no long mobile scroll lock;
- only the active card's media can load or play.

If real-device testing shows gesture or rendering problems, mobile switches to a native horizontal scroll-snap rail with the same semantic cards, partial next-card visibility, controls and progress indicator.

### Accessibility and reduced motion

- Each category remains a real semantic card with a real menu link regardless of its visual position.
- Keyboard order follows `01–05` and does not change when the visual orbit wraps.
- Screen readers receive one ordered section and no continuous announcements while the orbit moves.
- Touch and control targets meet a minimum 44 × 44 CSS pixels.
- Reduced motion removes pinning, orbit travel, inertia and process-video autoplay.
- The reduced-motion layout presents five static editorial cards in document order with opacity-only entry at most.
- Meaning never depends on Z-depth, animation or video.

### Performance constraints

- Build the cards as semantic DOM elements with CSS perspective and `transform`/`opacity` motion.
- Do not use Three.js or a canvas-only card renderer for this section.
- Keep `will-change` scoped to cards currently participating in motion and remove it after settling where practical.
- Reserve dimensions for every poster and video to avoid layout shift.
- Load the active media and, at most, the immediately adjacent posters ahead of need.
- Pause active media when the section is offscreen, the document is hidden or the global motion control is paused.
- Profile the complete hero-to-carousel handoff on mid-range Android and iOS hardware before accepting the effect.

---

## 6. Placeholder asset plan

Temporary assets will be tracked explicitly so none survive unnoticed into the client release.

### Hero

For now:

- use the supplied real illuminated exterior photograph as the main poster where resolution permits;
- use a static poster-first hero if suitable five-category footage is unavailable;
- if a temporary montage is required for motion approval, use clearly identified licensed stock or generated clips representing each process;
- do not present generated people, interiors, or dishes as documentary footage of Krushna's Heaven.

Final replacement:

- original landscape and portrait footage filmed at Krushna's Heaven;
- footage rights and visible-person consent confirmed;
- final grade matched across all shots.

### DNA carousel categories

For now:

- Gelato: approved/supplied Mr Gelato or illustrative gelato photography;
- Woodfire Pizza: temporary pizza/oven image until the actual oven and process are photographed and “woodfire” is verified;
- Brews: temporary espresso/latte preparation image;
- Waffles: temporary waffle preparation/finish image;
- Savoury Bites: temporary photograph matched to a verified current menu item.

Final replacement:

- at least one portrait-capable original poster and one optional short process clip for each category;
- accurate products from the final menu;
- consistent warm café color grade.

### Signature food cards

- Product names and prices will come only from the final menu and resolved client corrections.
- Existing recommendation labels may be used only where confirmed.
- Temporary images will carry an internal replacement marker and must not be described as actual product photography.

### Story and café atmosphere

- Use the supplied exterior and gelato-counter/interior photographs where they support the layout.
- Additional interior, team, family, preparation, and table imagery remains placeholder until supplied with permission.

### Visit section

- No fictional address, hours, map pin, phone number, parking statement, or facility claim.
- A clearly labelled map/visit placeholder may hold layout space until verified public details arrive.

### Testimonials and statistics

- Omit these blocks or show a non-public structural preview until verified content arrives.
- Do not generate fake customer names, quotations, ratings, review counts, or awards.

### Logo and franchise assets

- Use the supplied current Krushna's Heaven identity as the visual reference.
- Replace low-resolution captures with an official vector or high-resolution transparent master before production.
- Use Mr Gelato branding only inside the Gelato/franchise context and according to approved franchise rules.

---

## 7. Risks and mitigation

### Risk 1 — Hero video is too large

**Impact:** Slow first load, high mobile data use, delayed Largest Contentful Paint, and blank media on weak networks.

**Mitigation:**

- poster renders as the hero's first visual;
- short 10–18 second edits rather than a long film;
- separate desktop and mobile encodes;
- WebM and MP4 sources at measured bitrates;
- preload poster and only essential media metadata;
- delay non-critical video work until the page is ready;
- stop playback offscreen and when hidden;
- test throttled 4G and mid-range phones;
- retain a complete static experience when video fails.

### Risk 2 — ScrollTrigger pinning causes mobile jank

**Impact:** Jumping content, address-bar height issues, lost scroll position, overheating, or dropped frames.

**Mitigation:**

- native scrolling remains the foundation;
- use stable viewport units and safe-area padding;
- animate only transform and opacity;
- avoid blur/filter animation during scroll;
- keep chapter media dimensions fixed and decoded ahead of entry;
- refresh measurements after fonts and media metadata settle;
- build and test the native scroll-snap fallback;
- test real Android and iOS hardware before choosing the final mobile mode.

### Risk 3 — Smooth scrolling conflicts with accessibility or anchors

**Impact:** Laggy navigation, broken keyboard movement, bad Back behavior, and ScrollTrigger mismatch.

**Mitigation:**

- ship native scroll first;
- treat Lenis as conditional enhancement rather than a dependency;
- disable smoothing for touch/reduced-motion contexts if adopted;
- validate anchors, keyboard navigation, history restoration, and browser find;
- remove Lenis completely if benefits are cosmetic rather than material.

### Risk 4 — Too much motion weakens premium restraint

**Impact:** The site feels like an animation demo and food becomes secondary.

**Mitigation:**

- enforce the motion hierarchy in this plan;
- reserve scrubbed motion for the short desktop introduction to the DNA carousel;
- keep most entrances one-shot and short-distance;
- keep functional interactions under 300 ms;
- remove any effect whose purpose cannot be named as feedback, state, continuity, explanation, or deliberate delight;
- review full-page recordings rather than isolated components.

### Risk 5 — Mobile layouts become compressed desktop designs

**Impact:** Poor crops, unreadable headlines, tiny controls, and gesture conflicts.

**Mitigation:**

- separate portrait hero edit;
- breakpoint-specific GSAP timelines;
- mobile-first control sizes and safe areas;
- one dominant chapter at a time;
- no hover-dependent information;
- native vertical gesture priority;
- real-device review at small and large phone sizes.

### Risk 6 — AI or stock media misrepresents the café

**Impact:** Loss of client trust and a misleading final website.

**Mitigation:**

- mark temporary assets in an asset ledger;
- never describe placeholder imagery as real;
- use generated media only for composition/motion approval;
- require client-approved original replacements before launch;
- avoid invented architecture, staff, customers, or branded products.

### Risk 7 — Photography from different sources looks inconsistent

**Impact:** The page feels assembled rather than authored.

**Mitigation:**

- define crop and color-grade rules before asset replacement;
- use warm amber highlights, natural food color, and controlled pink saturation;
- normalize exposure with overlays only where text requires it;
- keep consistent aspect-ratio families per component;
- conduct one full-site photography pass after final assets arrive.

### Risk 8 — Unverified menu facts or claims enter production

**Impact:** Incorrect pricing, misleading health claims, and franchise confusion.

**Mitigation:**

- final menu remains the source of truth;
- disputed items stay flagged rather than silently corrected;
- omit unapproved health and nutrition language;
- use Krushna's Heaven as the parent identity everywhere;
- display Mr Gelato only as the Gelato franchise partner;
- require a factual sign-off before release.

### Risk 9 — Accessibility is added too late

**Impact:** Motion sickness, unusable menu controls, keyboard traps, and inaccessible carousels.

**Mitigation:**

- reduced-motion behavior is specified with each animation;
- semantic content exists before visual pinning;
- skip control for the chapter sequence;
- visible focus, correct focus restoration, and touch targets from the start;
- a quiet pause control for continuous motion;
- no essential meaning exists only in movement or video;
- keyboard and screen-reader verification included before visual polish is considered complete.

### Risk 10 — Static hosting and asset paths fail

**Impact:** Video, fonts, or images work locally but break on GitHub Pages or another static host.

**Mitigation:**

- use repository-aware asset paths;
- test the production build under its actual base path;
- keep routes compatible with the selected static-host strategy;
- verify direct page loads and browser refreshes;
- test media MIME types and cache behavior on the final host.

### Risk 11 — Animation cleanup and resize bugs

**Impact:** Duplicate timelines, incorrect pinned heights, memory growth, or broken orientation changes.

**Mitigation:**

- create animations within scoped lifecycle contexts;
- kill/rebuild breakpoint-specific timelines cleanly;
- debounce resize refreshes where needed;
- handle orientation changes explicitly;
- pause timers and media on hidden tabs;
- avoid multiple libraries controlling the same properties.

---

## 8. Motion specifications to carry into implementation

These are planning constraints, not code values frozen beyond review.

### Functional motion

- Button press: 100–160 ms.
- Hover, arrow, and active-state transitions: 150–220 ms.
- Mobile menu open/close: approximately 250–450 ms, with links following in short sequence.
- Use strong ease-out for entrances/exits and ease-in-out for movement already on screen.
- No bounce on navigation, menus, or reading content.

### Editorial motion

- Section reveal: approximately 500–850 ms.
- Stagger: approximately 40–80 ms between related elements.
- Image mask: approximately 700–1100 ms where it is the focal reveal.
- Hero entrance: complete enough to interact immediately, visually settled in roughly 1–1.5 seconds.
- Chapter strip: duration determined by scroll distance, not an autonomous timer.

### Animation properties

Preferred:

- transform;
- opacity;
- clip-path only for a few deliberate masks;
- video opacity for poster handoff.

Avoid during continuous scroll:

- animated blur;
- box-shadow animation;
- width, height, margin, or positional layout properties;
- large fixed backgrounds on mobile;
- high-frequency DOM text replacement.

---

## 9. Planned implementation sequence after approval

### Stage 1 — Motion foundation

- confirm the final semantic page order;
- establish motion tokens, reduced-motion policy, and global pause state;
- prepare hero and DNA carousel asset slots;
- implement visibility and media lifecycle rules.

**Approval view:** static structure plus documented motion markers, without polish.

### Stage 2 — Hero

- poster-first desktop and mobile hero;
- media source selection;
- entrance sequence;
- offscreen/tab/reduced-motion behavior;
- transparent-to-solid header transition.

**Approval view:** desktop and mobile recordings, including slow-network poster behavior.

### Stage 3 — Five-signature DNA carousel

- semantic ordered content;
- shared CSS 3D orbit and five resting positions;
- desktop short pinned introduction plus drag, side-card selection and keyboard controls;
- mobile shallow swipe version in normal vertical flow;
- native scroll-snap fallback;
- progress, active-media lifecycle and menu destinations;
- reduced-motion static version.

**Approval view:** desktop wheel/trackpad/drag/keyboard recording, real-device mobile swipe recording, reduced-motion capture and performance trace through the hero-to-carousel handoff.

### Stage 4 — Navigation and supporting motion

- full-screen menu;
- reading-order reveals;
- image masks;
- buttons/cards/menu category feedback;
- optional marquee.

**Approval view:** full homepage journey without temporary debugging controls.

### Stage 5 — Inner pages

- calm menu behavior;
- Our Story image/copy reveals;
- Visit Us actions and map behavior;
- Gallery loading/reveal system if retained;
- optional page transitions.

**Approval view:** complete multi-page desktop/mobile flow.

### Stage 6 — Performance and accessibility decision pass

- test video budgets and weak-network behavior;
- profile the DNA carousel and its gesture handling on mid-range mobile;
- compare native scroll against Lenis on desktop;
- verify reduced motion, keyboard, focus, screen reader, zoom, and touch;
- remove optional effects that do not survive testing.

**Approval view:** final motion matrix showing full, mobile, and reduced-motion behavior.

---

## 10. Approval decisions this plan establishes

If approved, implementation proceeds with these decisions:

1. Krushna's Heaven is the parent brand; Mr Gelato belongs inside Gelato.
2. The site uses an original cinematic system inspired by Qissa, not copied assets, text, layouts, or code.
3. The hero and five-signature DNA carousel receive most of the motion budget.
4. GSAP, ScrollTrigger and an interruptible GSAP gesture layer coordinate one shared carousel state.
5. CSS and IntersectionObserver handle routine feedback and reveals.
6. Native scrolling ships first; Lenis remains conditional.
7. Desktop and mobile hero videos are separately edited.
8. Mobile receives its own shallow DNA choreography and a native scroll-snap fallback.
9. Placeholder media is temporary, identified, and replaced before release.
10. Reduced motion, pause behavior, keyboard support, and performance are part of the initial architecture.
11. The approved local phased implementation may continue, but no GitHub push, merge or publication occurs until explicit approval.

---

## Consolidated historical redesign ledger — 15 October 2026

Imported from the merged redesign fix log on 16 October 2026. Preserve this dated ledger as evidence of review rounds, resolved issues, deliberate differences and remaining café questions. Its old deployment instructions/status and superseded implementations are historical; the current approved website section at the top governs present work.

Review and fixes: 15 October 2026. Round 1 = critique fixes (F-series). Round 2 = reference flow from qissa.co.uk (R-series). Round 3 = moving photos + gallery page (G-series). Round 4 = final menu + menu flow (M-series).

- **Before:** the live site, https://surajs28.github.io/Krushna.Heaven_final/ (identical to git tag `original`).
- **After:** this folder's `public/` build. The live site has **not** been redeployed.

Status key: ✅ fixed · 🟡 partly fixed · ⏸ needs the owner (facts, photos or footage) · ➖ not changed (recommendation only) · ↩️ reverted

**Round 1:** 24 fixed · 1 reverted in round 2 (F09) · 2 partly fixed · 2 need the owner · 2 recommendations only (31 items).
**Round 2:** 16 items, all done (R01–R16).
**Round 3:** 6 items, all done (G01–G06).
**Round 4:** 19 items, all done (M01–M19), plus 9 questions for the café (Q1–Q9).

## How to compare

1. Open the live site and the new build side by side. To run the new build: `npm ci && npm run build && npm run preview`, then open http://localhost:4200.
2. Every change is staged in git against the original snapshot:
   - `git diff --staged original --stat` lists every changed, added and moved file.
   - `git diff --staged original -- src/site.ts src/site.css public/index.html` shows the main code changes.
3. Use the "Check" column below for what to look at on each page.

## Round 4: final menu + menu flow

Request: build the menu like the reference (qissa.co.uk's homepage menu sections and its menu page) from the café's final menu PDF and info sheets, "best aesthetic, premium, way creative". Names, prices and contact details now come from the final menu PDF.

| ID | What changed | Status | Check |
|---|---|---|---|
| M01 | The menu page is now a dark "carte" on the night field. The hero frames the branded gelato cup in the printed menu's arch, with floating scoops, a peacock feather, "Five chapters · 188 dishes", "Start with gelato" and "Download the menu (PDF · 2.4 MB)" | ✅ | Menu page, top |
| M02 | Five chapter cards (number, name, dish count, cut-out art) lift on hover and swipe sideways on tablets and phones | ✅ | Under the menu hero |
| M03 | Sticky chapter bar: a glass pill whose gradient marker slides to the chapter you're reading. It gains a blurred backdrop once pinned; on phones it scrolls itself to keep the current chapter in view | ✅ | Scroll the menu |
| M04 | Search across all 188 dishes (names, descriptions, sections). Empty sections hide, the count is announced to screen readers, Escape clears. "mango" finds 4 | ✅ | Search button in the bar |
| M05 | Gelato: 45 flavours on four boards (Chocolate classics, Fruit fresh, Creamy delights, Premium indulgence), grouped by the printed tiers (Classics, Most loved, Premium picks), every size priced. The size switch highlights one column on desktop, shows only that column on phones, and remembers the choice | ✅ | Gelato chapter |
| M06 | 24 recommendation tags from the café's tier sheet (Bestseller, Must try, Chef's special, Kids' special). That sheet's purchase costs, margins and older prices are not used anywhere | ✅ | Tags on flavours and treats |
| M07 | Every other dish is a menu line with a dotted leader to its price, plus a "Make it a cone" strip for cones and baskets | ✅ | Any chapter |
| M08 | "The story of gelato": Italian for "frozen", four facts (slow-churned, 100% vegetarian, sorbetto, variegato), gelato words (una coppa, un cono, gusti) and the four scoop sizes drawn to scale | ✅ | After the gelato boards |
| M09 | Each chapter opens with a photo banner (gentle parallax where the browser supports it), a number, title and handwritten-style note. Sections carry cut-out art; signature desserts are photo cards with full descriptions | ✅ | Each chapter |
| M10 | A downloadable copy of the final menu, slimmed from 15.4 MB to 2.4 MB | ✅ | "Download the menu" |
| M11 | Homepage "Explore the menu, chapter by chapter": six colour tiles that open their chapter. Hovering one greys out the rest, as on the reference; a swipe row on phones | ✅ | Home, after the flavour band |
| M12 | Homepage "A table worth gathering around": a full-width photo band with slow parallax | ✅ | Home |
| M13 | Homepage "Dishes with a story to tell": six signature dishes in a bento grid with their menu prices; cards tilt toward the pointer on desktop. "Explore the full menu" and "Download the menu" follow. Replaces the old "From the menu" highlights near the end of the page | ✅ | Home |
| M14 | The café's details on every page: beside Krushna Pure Veg, opp. Mahatma Phule Sanskrutik Bhavan, Wanowrie, Pune 411040 · 91566 00883 / 91566 00884 · krushnasaiicecream@gmail.com · the official Google Maps link (read from the menu's QR code). Every footer has "Find us" and links to all five pages. Visit page: full address, "Call or write", Instagram message link and "Under one roof: gelato manufacturer · Italian & continental café · banquet hall". Search data (JSON-LD) has the full address, phone, email and map. **Resolves F06** except opening hours | ✅ | Footers, Visit page |
| M15 | Menu copy cleaned up: "Black Current" → "Black Currant" (3 items); "Cheese Cake" → "Cheesecake" (4 flavours); the gelato intro no longer mentions "Mr Gelato" (the final menu doesn't); Protein bar hours removed (Q4) | ✅ | Gelato and Brews chapters |
| M16 | While searching, a board's flavour count hides (it would contradict the filtered rows) | ✅ | Search "mango" |
| M17 | Addresses are marked up as addresses (`<address>`) in the body font | ✅ | Footers, Visit page |
| M18 | Bug from before this round: the Visit page facts sat 40px right of their labels (the browser's default list indent) | ✅ | Visit page facts |
| M19 | Housekeeping: the old menu filters (`menu-discovery.js/.css`) moved to `legacy/public/`; the menu script is `menu-page.js`; caches bumped to `?v=carte-1`. Checks: `npm run build` and both test files pass (12 tests); all 415 links and assets on the five pages resolve; no sideways scroll at 375px; no failed requests | ✅ | — |

### Questions for the café

The site uses the safe choice until these are answered.

| # | Question | On the site now |
|---|---|---|
| Q1 | Family-pack prices for Dark Italian Chocolate and Belgian Chocolate (the PDF prints ₹100 on page 12 but ₹350/₹450 on page 15), and for Pistachio, Madagascar Fine Chocolate, Whisky N Cream and Yoghurt Wild Berry (printed ₹100, below their ₹250 double scoop) | "Ask us" |
| Q2 | Prices off their tier's pattern: Pink Guava family ₹300 (its tier: ₹350); Rose Melody sits in Most loved but has Classics prices except a ₹400 family pack; Coconut single ₹130 with a ₹190 double | As printed |
| Q3 | Single scoop: 73 g (story sheet) or 70 g (pricing sheet)? | 73 g |
| Q4 | Protein bar hours: the PDF has "Available from 6.30am - 10.30 am" only as hidden text; the printed page doesn't show it | No hours shown |
| Q5 | Nutrition and health claims on the info sheets (calorie counts, "97% fat free", "fructose 150 cal", "90% less air", the herbal tea benefits) | Not published until there's a source |
| Q6 | "Mr Gelato" isn't in the final menu, but the story page and the homepage carousel still name it. Keep it? | Unchanged there |
| Q7 | The menu's address says Wanowrie; the site's copy says Wanwadi (same area). One spelling for both? | Address: Wanowrie; text: Wanwadi |
| Q8 | Opening hours | "Coming soon" |
| Q9 | For the print file: "Black Current", mixed "Cheese Cake" / "Cheesecake", and "Una Cona" (should be "Un cono") | Fixed on the site |

Also left out on purpose: the ham panuozzo stock photo and the herbal tea image with health claims.

## Round 3: moving photos + gallery page

Request: "just images moving", and "View the gallery" should open the images. Built after the reference home page, where the signature plates step past and "View the full gallery" opens the gallery page. (I couldn't open the second recording: macOS blocks the temporary screen-recording folder. If something differs, save the recording to the Desktop and I'll match it.)

| ID | What changed | Status | Check |
|---|---|---|---|
| G01 | The homepage gallery is now just the photos moving. One photo holds the centre while the others tilt away and dim, stepping on every 2.6 seconds. You can drag or swipe one photo at a time. It pauses on hover, on keyboard focus, off screen and in a hidden tab, and has a Pause button. With reduced motion it stays still (swiping still works) | ✅ | Home, after the signatures |
| G02 | "View the full gallery" opens the new Gallery page (`gallery.html`): the café at night as the hero, a Home / Gallery breadcrumb, all 11 photos in the masonry (round-2 reveal, hover and viewer), the Follow line and the closing card | ✅ | Click the button |
| G03 | Tapping any moving photo opens the Gallery page with that photo already open full size (`gallery.html#photo-N`). Closing it clears the link, so Back or reload won't reopen it. A drag never counts as a tap | ✅ | Tap a photo in the reel |
| G04 | "Gallery" in every menu, header and footer now opens `gallery.html`; the sitemap includes it | ✅ | Any page |
| G05 | Homepage order now matches the reference: signatures → moving photos + View the full gallery → flavour band → story | ✅ | Home |
| G06 | Bugs found while building, all fixed: the reel started off centre (the no-script strip had scroll-snapped first); copies of photos slid in blank (they hadn't loaded); keyboard focus could scroll the reel out of alignment | ✅ | — |

This replaces round 2's homepage gallery grid (R01). The same grid now lives on the Gallery page.

## Round 2: reference flow (qissa.co.uk)

Source: the screen recording of https://www.qissa.co.uk (home page, full-screen menu and gallery page) plus that site's own CSS and JS for exact timings. We copied the **flow and motion**, not the look: colours, photos, copy and the café-lights effect are ours.

| ID | What the reference does | What we built | Status | Check |
|---|---|---|---|---|
| R01 | Gallery page: a room photo fading into the background behind a lined eyebrow, big title and intro line; a masonry grid; tiles rise 34px and fade in over 1s; hover zooms the photo to 1.06 over 1.2s while a caption slides in; then "Follow @…" and a "Better in person" card | Same flow on our homepage gallery: gelato-counter photo opener ("— A visual journey", "A little look *inside.*"), slow parallax, masonry (3 columns, 2 on tablets and phones), the same reveal and hover timings, captions always visible on touch, a "Follow @krushnasheaven" line, and a "Come and see / Some moments are *better shared.*" card with Plan your visit + Explore the menu. The counter photo moved from the grid into the opener (10 tiles) | ✅ | Home → gallery: hover a tile on desktop; scroll to the card at the end |
| R02 | "Begin the story" lands on the next section | Our cue stopped 136px short of the signatures section (a page-wide scroll margin). Now it lands exactly on it | ✅ | Click "Begin the story" |
| R03 | Header condenses into a dark glass bar on scroll | Home header turns into a dark wine glass bar (was an ivory bar over the dark sections) | ✅ | Scroll past the hero |
| R04 | Menu button: three gold lines of different lengths that even out on hover | Same on every page; the lines fold into an × when open. **This reverts F09**, so desktop is back to the reference's menu button | ✅ | Header, any page |
| R05 | Menu opens as a circle growing from its button; links rise in one after another | Same: circle from the button (left on Home, right on inner pages), links 70ms apart; header goes clear and its CTA hides while open | ✅ | Open the menu |
| R06 | Lined gold eyebrows and gold gradient text | Lined eyebrows and a pink-to-amber gradient on italic accents in the night sections | ✅ | "Our five signatures", "A visual journey", "Come and see" |
| R07 | One continuous dark field | Signatures and gallery share one night colour (`--night: #1a0a10`) | ✅ | Scroll signatures → gallery |
| R08 | Twinkling starfield behind every section | Our version: warm café lights (ivory, pink and amber) drifting behind the signatures and gallery, with a slight mouse parallax. Paused off screen and in hidden tabs; a still frame for reduced motion | ✅ | Dark sections, desktop |
| R09 | Gold marquee band after the signature plates | Raspberry band: *Premium gelato ✦ Woodfire pizza ✦ Slow brews ✦ Golden waffles ✦ Savoury bites ✦ Good food brings people closer*. Pauses on hover | ✅ | Between signatures and gallery |
| R10 | Ghost button and hover lift | Ghost button; buttons in the gallery card lift 3px on hover | ✅ | Gallery card |
| R11 | Copy reveals: rise 34px, fade 1s, once 16% is visible | Same for the gallery heading, Follow line and card | ✅ | Scroll into the gallery |
| R12 | — (our own bug) | The pinned signature orbit only worked on screens 900px or taller; most laptops got the un-pinned fallback. Now it pins at 1280×720, 1366×768, 1536×864 and 1440×900, with a 17–21px gap between heading and cards (measured) | ✅ | Laptop-size window |
| R13 | Hero film drifts at 18% of scroll speed and scales to 1.08 | Same values | ✅ | Scroll slowly from the top |
| R14 | Order: hero → story → plates → gallery link | Ours: hero → signatures → flavour band → gallery → story → menu highlights → visit. The story section moved below the gallery so the three night sections run together | ✅ | Homepage order |
| R15 | "Gallery" is in the navigation on every page | Added to the Story, Visit and Menu pages (desktop bar and menu) | ✅ | Inner-page navigation |
| R16 | — (bugs found while building) | Phone menu lines were hidden by an old rule; a 1px seam showed under the gallery opener; captions crowded narrow phone tiles (phones now show the title only) | ✅ | Phone home page |

**Deliberate differences from the reference:** our colours and type; café lights instead of stars; our photos and wording; we kept the photo viewer (the reference has none); our masonry keeps left-to-right order and ends level (the reference reads top-to-bottom and ends ragged); 2 columns on phones (the reference uses 1, but its gallery is a whole page, ours is a homepage section); our signatures stay a pinned 3D orbit (the reference uses a flat auto-stepping slider).

**Not verified in round 2:** smoothness in a visible browser window (the test browser pauses animations while hidden), the café-lights canvas on a real phone, and Safari's rendering of the circle reveal and photo mask.

## Round 1: critique fixes

### Bugs

| ID | Issue | What changed | Status | Check |
|---|---|---|---|---|
| F01 | Carousel caption ("Premium Gelatos") printed on top of the left card's label ("Savoury Bites") on desktop | Only the front card shows its label; a dark gradient scrim sits behind the caption (`src/site.css`, "Review fixes" block) | ✅ | Home, desktop, "Pick your craving" section: caption never overlaps a card label |
| F02 | Carousel heading could vanish for good after a window resize: `gsap.from` re-ran and recorded the hidden state as the end state | `fromTo` with explicit end values; a flag stops a rebuilt scene re-hiding a heading already shown; teardown clears inline styles (`src/site.ts`) | ✅ | Load the home page in a narrow window, widen it, scroll down: heading visible. Tested at 800×600 → 1440×900: before, opacity 0; after, 1 |
| F03 | Carousel heading touched the tops of the cards | Desktop heading size `clamp(3.4rem, 5.4vw, 5.6rem)` | ✅ | Clear gap between "craving." and the cards |
| F04 | Old Mr Gelato and concept pages publicly live, plus ~7 MB of unused bundles | 69 files (46 MB) moved from `public/` to `legacy/public/` (see `legacy/README.md`); `build.cjs` and `package.json` build only the live pages. `public/` is now 14 MB (was 57 MB) | ✅ | Locally, `flavours.html`, `outlets.html`, `contact.html`, `concept/`, `experience-sample/` all return 404. **They stay live online until the site is redeployed** |
| F05 | Footer logo was a white blob (`filter: brightness(0) invert(1)`) | Filter removed; footer uses a new full-colour `logo-full.webp` | ✅ | Footer on any page |
| F06 | Every "Find us / Plan your visit" button ended on a page with no address, map or phone | Visit page: "Open in Google Maps" links (a search for "Krushna's Heaven Wanwadi Pune"), "Message us on Instagram" link, header button "Get directions". **Interim:** the exact address, hours and phone are still unknown. **Round 4 (M14):** the real address, phone numbers, email and official map link are in; only opening hours remain | 🟡 | Visit page: header button, Location and Contact rows, map section button |
| F07 | Internal review notes shown to visitors | Removed the "owner quotes still require approval" and "await owner confirmation" pills and the "visual placeholder" panel. "Pending" wording became "Coming soon" / "Full address coming soon" | ✅ | Story and Visit heroes, Visit facts, footers |

### Design and content

| ID | Issue | What changed | Status | Check |
|---|---|---|---|---|
| F08 | "Five cravings. One address." used as both the hero H1 and the next section's H2 | Section heading is now "Pick your *craving.*" | ✅ | Home, second section |
| F09 | Homepage desktop navigation hidden behind a "MENU" button that clashed with the food menu | Round 1 showed text links on desktop. **Reverted in round 2 (R04)** to follow the reference's menu button | ↩️ | Home header at desktop width |
| F10 | One destination, three labels ("Find us", "Plan your visit", "Find the café") | "Plan your visit" everywhere; "Get directions" on the Visit page itself | ✅ | Home hero, all headers |
| F11 | AI-generated and stock food imagery next to real café photos | Real café photos now used for the home intro section, Story hero, Story gallery and Visit photo. Carousel cards, menu-preview cards, Menu hero and hero video are still AI or stock | 🟡 ⏸ | Needs the owner's real food photos and footage |
| F12 | Same images repeated (gelato ×4, café front ×3); Story and Visit shared one hero | Story hero → gelato counter photo; home intro → daytime seating; Story gallery and Visit photo → other real photos. Café front now appears on Visit and the home "Come hungry" section only | ✅ | Story vs Visit heroes |
| F13 | Home intro: red handwritten note unreadable over the photo; "KH" watermark clashed with the heading | Note is now an ivory sticker below the photo; watermark faded; photo fills a clean top arch | ✅ | Home, "A sweeter place for happier days" |
| F14 | "A table worth gathering around." squeezed into 4 lines on the right | Eyebrow and title grouped on the left (2 lines), intro text on the right | ✅ | Home, menu preview section |
| F15 | Gallery columns ended at different heights, leaving a dark gap | Masonry layout lets each column's last photo crop up to 60% taller so all columns end level (`src/site.ts`) | ✅ | Home gallery bottom edge: all columns end on one line |
| F16 | Several dark sections in a row; carousel background `#17090d` isn't a colour token | Not changed: a taste call for the owner | ➖ | — |
| F17 | Menu page is a long text-only list (no veg/non-veg marks, flavour colours or "most loved" tags); two sticky bars | Not changed: needs veg status and bestsellers from the owner | ⏸ | — |
| F18 | Header logo crop showed a slice of the script text under the icon | New icon-only `logo-mark.webp` (192 px, 16 KB) | ✅ | Every header |

### Animation

| ID | Issue | What changed | Status | Check |
|---|---|---|---|---|
| F19 | Carousel driven by scroll, auto-play and drag at once; pinned section lasted 1.9 screens | Desktop: scroll, clicks and drag only. No auto-play, and the pause button is hidden there. Cards **snap to the nearest card** 0.7 s after scrolling stops (new). Pin is 1.3 screens. Phones keep swipe + auto-play + pause | ✅ | Desktop: scroll through and stop mid-way; it settles on one card |
| F20 | "Swipe to find your craving" shown to mouse users and overlapped a card | Hidden for mouse/trackpad (`hover: hover` and `pointer: fine`) | ✅ | Desktop: no vertical hint. Phone: hint still shown |
| F21 | Hero intro showed the buttons before the headline; reveal took ~1.5 s (~1.9 s in all) | Headline starts at 0 s and is done by 0.9 s; buttons at 0.5 s; whole intro ≈1.35 s | ✅ | Reload the home page |
| F22 | No transition between pages | Cross-page View Transition fade (260 ms), off for reduced motion. Works in Chrome/Edge and Safari 18.2+; other browsers navigate normally | ✅ | Click between pages in Chrome |
| F23 | Ideas: photo zooms into the gallery viewer, gallery parallax, five-clip hero | Not done | ➖ | — |

### Performance

| ID | Issue | What changed | Status | Check |
|---|---|---|---|---|
| F24 | Heavy PNGs: `exterior.png` 1.9 MB (main image on Story and Visit), `interior.png` 1.5 MB, `brownie.png` 1.2 MB, two 2.6 MB atlases on the homepage | WebP with responsive sizes: exterior 172 KB (76 KB at 800 px), atlases 212 KB and 224 KB; brownie and interior use the existing gallery WebPs | ✅ | Network tab: no PNG photos on the four pages |
| F25 | Fonts shipped as TTF (Fraunces 351 KB, Karla 91 KB) | Subset WOFF2: Fraunces 124 KB, Karla 36 KB (all variable axes kept; includes ₹ and arrows). Fraunces is preloaded on Home | ✅ | Network tab: only `.woff2` fonts load |
| F26 | 205 KB, 1486 px logo used for favicon, header and footer | Header 16 KB, footer 44 KB (lazy), favicons 2–6 KB, Apple touch icon | ✅ | — |

### Search, sharing and launch

| ID | Issue | What changed | Status | Check |
|---|---|---|---|---|
| F27 | No Open Graph / Twitter tags | All four pages have title, description, URL and a 1200×630 `og-image.jpg` (café front at night) | ✅ | Paste the URL into WhatsApp once redeployed |
| F28 | No structured data, canonical links, `robots.txt` or sitemap | Canonical links on all pages; `CafeOrCoffeeShop` JSON-LD on Home (Wanwadi, Pune; Instagram; menu link; no unconfirmed facts); `sitemap.xml`; `robots.txt`. Note: `robots.txt` only takes effect at a domain root, so on the GitHub Pages project URL submit the sitemap in Google Search Console instead | ✅ | View source on Home |
| F29 | Pages workflow published `public/` without building it | `.github/workflows/static.yml` now installs Node 24 and runs `npm ci && npm run build` before upload. **Not yet run on GitHub** | ✅ | Run the "Manually deploy" workflow |
| F30 | README build commands only worked on Windows | macOS/Linux commands added; legacy note updated | ✅ | `README.md` |
| F31 | Mobile hero still an unreadable blur; hero video is generic stock | Not changed: needs real footage | ⏸ | — |

## Other changes

- Cache-busting versions bumped to `?v=review-1` so returning visitors get the new CSS/JS.
- Absolute URLs (canonical, Open Graph, sitemap, JSON-LD) assume `https://surajs28.github.io/Krushna.Heaven_final/`. Update them if the site moves to its own domain.
- Original PNG masters were moved, not deleted: they're in `legacy/public/assets/`.

## Not verified

- Animation timing was checked in code and screenshots, not measured in a real browser window (the test browser pauses animations while hidden).
- View Transitions, the GitHub Actions build, the Instagram message link and the Google Maps search result were not tested end to end.
- No test on a physical phone (swipe feel, Safari).
- Round 4: the phone numbers, email and Maps short link are copied from the final menu (the link from its QR code); they weren't dialled or opened. Search, the size switch and the chapter bar were tested in the in-app browser at 1440×900, 1366×768 and 375×812, not on a real phone.
