# Mr Gelato — revision 4

Hero update: the homepage now uses an AI-generated photorealistic strawberry, pistachio and chocolate waffle cone cutout, with a one-time entrance, gentle floating motion and spring-based desktop pointer tilt. Motion pauses offscreen, in hidden tabs and under reduced-motion preferences. This is an animated image, not a rotatable 3D model. The earlier procedural Three.js source remains available in the editable project.

Open `site/index.html` to explore the sample. All dependencies, fonts and assets used by the pages are bundled locally. No server or API key is required for the static preview.

## Included
- Five pages: Home, Flavours, Our Story, Visit Us and Contact.
- Compiled Tailwind CSS, local Plus Jakarta Sans / Inter and Lucide icons.
- Original Three.js cone with procedural waffle ridges, textured scoop geometry, physical materials, soft lighting, sprinkle particles, mouse/drag interaction, keyboard rotation and colour switching.
- Image fallback for unavailable WebGL or a lost context.
- Flavour search, Classic / Seasonal filters, an honest Vegan empty state and all 24 source flavour names.
- Three-layer custom pint, size/topping preview and a downloadable mix file.
- Frosted navigation, bento storytelling, illuminated builder border, gradient headline reveal, bounded card tilt, magnetic buttons and scroll-triggered motion.
- OS reduced-motion support and a persistent pause control. Three.js rendering pauses offscreen and in hidden tabs.
- Mock map zoom controls, illustrative testimonials, email-app enquiry handoff and a demo newsletter with confetti.

## Content requiring approval
Current outlet addresses/hours, social links, current contact email, real testimonials, recipes, pint sizes, toppings, calorie/allergen data, vegan suitability, ingredient provenance and preparation details. Generated food photography and the procedural 3D cone are illustrative, not exact representations of actual products.

The newsletter never sends or stores the email. The pint preview does not place an order. Testimonials and map location are explicitly examples.

## Checks completed
JavaScript builds and syntax checks; local HTML references; DOM tests covering navigation, icon rendering, keyboard menu focus, filters/search/empty state, 24-entry collection, pint layers/size/toppings, download handoff, reduced motion, map limits, demo newsletter and safe mailto encoding. Runtime npm audit reports zero vulnerabilities.

## Review still open
The approved browser tool cannot reach the local preview (connection timeout). Rendered desktop/mobile review, actual Three.js shader/render output, animation feel, real-device gestures and browser-based form validation still need inspection. This is an implemented sample for review, not a visually approved production release.

## References and licenses
21st.dev was used for free component metadata references; no paid component code was retrieved. Magic UI’s official card/confetti patterns informed the approach; its MCP tools were unavailable in this session. Effects are original CSS/JavaScript with canvas-confetti, not a claimed installation of Magic UI components.

Libraries: Three.js (MIT), Lucide (ISC), Tailwind CSS (MIT), canvas-confetti (ISC), esbuild (MIT). Font licenses are bundled in `assets/fonts`. See `THIRD-PARTY-NOTICES.txt` for runtime license text. Build-only dependency advisories remain in the local toolchain; those dependencies are not shipped to browsers.
