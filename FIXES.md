# Krushna's Heaven — fix log

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
