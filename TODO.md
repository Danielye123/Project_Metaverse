# TODO / Future enhancements

Deferred ideas, captured so we don't lose them. Not yet scheduled.

## Tier C — Full per-world "mode" (big)
Build on top of the Tier A live re-theme (which swaps the CSS-variable palette per selected world).
Tier C makes each world a distinct *experience*, not just a recolor: selecting a world cross-fades
the whole site into that world (hero imagery + heading + tagline, atmosphere, and per-section copy).

Per-world content object (each world grows from `{ id, title, imgUrl, theme }` into):
```js
{
  id, name, tagline,
  theme: { accent, glow, surface },        // Tier A
  hero: { cover, heading, sub },
  about,
  features: [{ icon, title, subtitle }],
  insights: [{ img, title, subtitle }],
  testimonial: { name, role, quote },
  meta: { title, description, ogImage },    // routed flavor
}
```
Sections render from `activeWorld.*` instead of static `constants`.

Two build flavors:
- **C1 — In-place morph (no routing):** swap the active world in context; page cross-fades
  (`AnimatePresence` keyed by world id). Single page, no shareable links.
- **C2 — Routed worlds (`/worlds/[slug]`):** each world is its own App-Router route with metadata +
  OG image; home stays the platform pitch and links into worlds. Deep-linkable + SEO. **Preferred**
  as the stronger portfolio artifact.

- **Builds on:** Tier A (palette engine).
- **Blocked on / pairs with:** the image-performance pass — Tier C swaps large backgrounds, so the
  3 MB+ PNGs should be converted to `next/image` + WebP/AVIF first.
- **Cost:** large — mostly content authoring (copy + imagery × 5 worlds × several sections) plus
  cross-fade transitions and (C2) dynamic routing. Risk: content volume + not diluting the
  platform-level landing page.

### Per-world signature ambience (part of Tier C)
Beyond color, give each world its own ambient effect so it has a personality:

| World | Color | Ambience |
|-------|-------|----------|
| Obsidian Spire | violet | twinkling **starfield** |
| Halcyon Drift | teal | slow **orbiting moon** + mist |
| Aurora Sands | pink | **comets / shooting stars** |
| Lumina Reach | gold | rising **light motes** (warm bokeh) |
| Verdant Expanse | emerald | drifting **fireflies / spores** |

- One `<WorldAmbience world={activeWorld} />` layer: fixed, full-screen, behind content
  (`pointer-events-none`, `aria-hidden`, low z), switching on the world's `ambience` type and
  cross-fading on world change (`AnimatePresence`).
- Each effect = transform/opacity-only animation; keep element counts low (~40 stars, a few comets);
  DOM+CSS/framer is enough (reach for `<canvas>` only if dense particles wanted).
- **Deterministic** positions (seeded, not `Math.random` at render) to avoid SSR hydration mismatch.
- **`prefers-reduced-motion` → static or off.**
- Rides on the same world-theme context as Tier A, so it could also be pulled forward as a
  "Tier A+" later without the full Tier C content authoring.

## Tier B — Re-theme + dynamic hero/copy (medium)
Middle ground between A and C: Tier A colors plus a hero tagline/atmosphere that changes per world.
Quick win if Tier A lands well and we want more without going full Tier C.

## Image performance pass (deferred from enhancements)
Convert the planet/cover PNGs (~24 MB total, several over 3 MB) to `next/image` + WebP/AVIF.
Biggest real-world LCP/Lighthouse win; also a strong before/after case-study metric.

## ESLint config consolidation (deferred from Step 3)
Two configs exist: `.eslintrc.js` (Airbnb) + `.eslintrc.json` (`next/core-web-vitals`).
Airbnb wins, so the build warns "Next.js plugin not detected." Consolidate to one config that
extends `next/core-web-vitals` for proper Next linting.

## WebGPU black-hole raytracing (stretch visual)
Raytrace a black hole (gravitational lensing + accretion disk) in a WebGPU compute/fragment shader as
a dramatic centerpiece — candidate homes: the hero background, a dedicated "world" (fits Obsidian
Spire's violet/void theme), or the most premium per-world ambience (see Tier C "Per-world signature
ambience"), one tier above the DOM/canvas starfield.

- **Reference / tutorial:** https://threejsroadmap.com/blog/raytracing-a-black-hole-with-webgpu
- **Gating:** WebGPU isn't universal yet — feature-detect `navigator.gpu` and fall back (static image
  or the existing starfield) when absent. Also honor `prefers-reduced-motion` → static/off.
- **Cost:** large — shader work + perf budget (GPU-heavy; cap resolution/DPR, pause when offscreen).
  Risk: device support + battery/thermals on mobile; keep it an enhancement, never required for the page.
