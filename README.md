# Krushna.Heaven_final

Live website: https://surajs28.github.io/Krushna.Heaven_final/

Production source for the Krushna's Heaven café website. Krushna's Heaven is
the parent brand; Mr Gelato appears only inside the Premium Gelatos offering.

The final public site is a static, multi-page build so it can run reliably on
GitHub Pages without server-side routing.

## Final routes

| Page | Public path | Purpose |
| --- | --- | --- |
| Home | `index.html` | Cinematic introduction and five experiences |
| Menu | `menu.html` | Phase 1 category shell with selected verified examples |
| Our Story | `story.html` | Brand, café and franchise relationship |
| Visit Us | `visit.html` | Locality-level visit shell pending verified business details |

Legacy Mr Gelato routes and visual experiments remain in the repository only
as recoverable references while the final pages are built. They are not the
target architecture.

## Source structure

- `INTENT.md` — the only planning and factual source of truth.
- `src/site/` — final site configuration, content data and shared logic.
- `src/site/menu-source.json` — item-level evidence ledger containing 186 menu
  lines; spelling and price conflicts remain intentionally unresolved.
- `src/site.css` and `src/site.ts` — Phase 1 shared visual system, responsive
  navigation and static page-shell behaviour.
- `src/krushna.css` and `src/krushna.js` — preserved pre-final prototype styles
  and interactions.
- `components/ui/` — reusable React UI components.
- `public/assets/krushna/` — approved or tracked temporary website media.
- `hero-film/` — editable Remotion source for desktop and mobile hero films.
- `docs/design-references/` — approved visual references, not runtime assets.

All runtime URLs must remain relative so project-site deployment under
`/Krushna.Heaven_final/` works without rewriting asset paths.

## Local commands

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run preview
```

The preview serves `public/` at `http://localhost:4200` and listens on the local
network for phone testing. Keep both devices on the same Wi-Fi. The production build
includes strict TypeScript checking and minified Tailwind output.

The hero-film workspace is independent:

```powershell
cd hero-film
npm.cmd ci
npm.cmd run lint
npm.cmd run dev
```

## Release boundary

This is a standalone repository with a fresh `main` branch, created from the
approved local snapshot on 15 October 2026. It has no merge relationship with
`surajs28/Icec_ream`. The owner authorized the initial upload to this separate
repository. Further pushes or website publication require an explicit request.

The owner approved making this repository public and publishing the current
website through GitHub Pages on 15 October 2026. Future deployment remains
manual-only through workflow dispatch. Uploading source does not automatically
publish changes. Temporary footage, disputed prices and
provisional business details must be resolved before the client release.
