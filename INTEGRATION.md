# React islands integration

The static site uses React, TypeScript, Motion and Tailwind CSS v4 with a shadcn-compatible layout. src/menu.tsx mounts the hero into #berry-hero-image when present and coverflow into homepage #flavours only when body[data-page="index.html"] matches. Menu filters/search and the pint builder remain static-script controls. No context provider or additional state-management library is needed.

- Hero: components/ui/berry-hero-image.tsx; asset public/assets/hero-berry.png.
- Carousel: components/ui/3-d-coverflow-carousel.tsx; demo components/demo.tsx.
- Carousel geometry and swipe projection: components/ui/carousel-motion.ts.
- Shared signatures: src/signature-flavours.ts, consumed by carousel and src/gelato.js.
- React entry: src/menu.tsx; static interactions/menu data: src/gelato.js.
- Tailwind entry: src/gelato.css; imports coverflow.css, then berry-redesign.css, then ivory-redesign.css. The last import owns current ivory overrides.
- Utility: lib/utils.ts; strict checking and @/* root aliases: tsconfig.json.
- shadcn configuration: components.json; @/components/ui resolves to components/ui.

## Run and rebuild

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

Preview serves public/ at http://localhost:4188. Build runs typecheck, bundles islands through build.cjs into public/menu.js, bundles static scripts, and compiles Tailwind to public/gelato.css. Publish public/ contents. No shadcn initialization is needed.

## Data and imagery

Homepage highlights six client-selected signatures, initially centering Strawberry Cheese Cake (initialIndex=2). Up to five cards are visible on desktop. Menu combines six signatures with the retained 24 flavours (30 sample entries). Shared names, copy, scoop colours and atlas positions live in src/signature-flavours.ts; photography and descriptions remain illustrative.

public/assets/signature-atlas.png is a generated 3×2 atlas rendered at background-size:300% 200% in signature menu and carousel photographs:

| Name | Background position |
| --- | --- |
| Yoghurt Wild Berry | 0% 0% |
| Jamun Sorbe | 50% 0% |
| Strawberry Cheese Cake | 100% 0% |
| Madagascar Fine Chocolate | 0% 100% |
| Lemon Cello Ice | 50% 100% |
| Blue Sky | 100% 100% |

public/assets/menu-atlas.png is a generated 2×2 café-category atlas rendered at background-size:200% 200%: coffee & beverages at 0% 0%, shakes at 100% 0%, desserts at 0% 100%, pizza & savoury food at 100% 100%. Category links point to matching menu anchors. public/assets/gelato-craft.png shows illustrative scooping; public/assets/cafe-preview.png is a fictional interior. Replace placeholders with approved photography before representing them as the real café or catalogue.

## Carousel and hero behavior

Carousel props are items, sectionLabel, initialIndex, autoplay, autoplayDelay, className and onCtaClick. CarouselItem includes optional imgAlt and imagePosition; atlas items use a labelled background-image region, while other items use an image element. Autoplay defaults to true with 5000ms delay (minimum 3000ms). Default card actions link to flavours.html?flavour=<encoded name>#flavours; menu initializes search from that query. There is no homepage pint handoff. A supplied onCtaClick overrides the default link behavior.

Autoplay pauses during drag, mouse hover, keyboard focus, offscreen, hidden tabs, global Pause motion or OS reduced motion. Manual navigation pauses until resumed. Arrow keys, Home and End are scoped to the carousel; inactive card actions are excluded from keyboard navigation. Keyboard navigation is instantaneous. Empty, single, two-item and changing item arrays are handled.

Pointer drag distinguishes horizontal intent from vertical scrolling (touch-action:pan-y), captures the pointer after intent is established and updates fractional-slide geometry directly without a transition. Release projects dx + velocity × 120ms, requiring at least 12px actual travel and 22% of the slide step in projected distance to select one adjacent slide. Velocity expires after 90ms without movement. Cancellation settles without selecting; a 350ms release guard prevents accidental clicks. Settling uses Motion's duration-based spring (duration:0.5, bounce:0.2) with 200ms opacity. Reduced motion/global pause suppress live displacement and rotation and make selection immediate.

Hero static HTML imagery renders before JavaScript mounts. src/gelato.js uncrops the photo over 700ms and settles headline, supporting copy and actions over 500ms with 50ms stagger and 12px rise. The story photo reveals once at 20% intersection over 600ms; other supporting sections stay still. Reduced motion/global pause skip arrivals and cancel running animations on preference changes. Motion applies a fine-pointer spring (stiffness 100, damping 10); touch, reduced motion, hidden tabs and global pause suppress optional pointer response. The hero does not load the retained procedural Three.js implementation.

Menu filtering retains cached card nodes. Pointer filter changes animate retained positions with 250ms FLIP and new results with opacity/8px rise; keyboard filters and search input update immediately. Fine-pointer hover scales food photography to 1.035 and shifts action arrows 3px. Mobile navigation uses 200ms opening and 150ms closing opacity/translation, with keyboard disclosure immediate. Hidden mobile links are inert; Escape closes immediately and restores focus to the toggle. Motion preference changes cancel pending disclosure transitions and reconcile the menu state.

## Sample boundaries

The pint builder is only on flavours.html; menu Add actions select its first layer and focus the selector. Pint controls/downloads are demonstrations. Contact opens the user's email app; newsletter data is not stored. There are no API keys, checkout, live orders or backend. Address, hours, social links, dietary/health facts and final identity require confirmation. These notes do not establish whole-site visual approval, exact fidelity or physical-phone gesture quality.
