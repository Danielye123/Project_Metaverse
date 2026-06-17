# Case Study: Tutorial → Mine

A running log of how this project diverged from the JS Mastery "Metaversus" tutorial result.
Baseline preserved on the `tutorial-original` git branch (commit `cd242cb`).

## Direction
- **Goal:** rebrand in the same immersive/futuristic genre — new name, palette, and original copy over the tutorial's layout, animations, and media.
- **Reusing** the tutorial's existing images/videos.

---

## Changelog

### Step 1 — Understand & baseline
- Mapped stack (Next 13 App Router target, React 18, Tailwind 3, Framer Motion 7), sections, and assets.
- Created `tutorial-original` baseline branch from the tutorial state for before/after diffing.

### Structural fix — single router (App Router)
- **Problem:** repo shipped with both an App Router (`app/`) and Pages Router (`pages/`) defining `/`, with `next.config.js` `appDir:false` — so `app/` was dead code and `pages/index.js` actually rendered.
- Set `experimental.appDir: true` in `next.config.js`.
- Deleted `pages/` (`_app.js`, `index.js`, `api/hello.js`).
- `app/page.js` is now the live page. Build verified: `/` served by `Route (app)`.

### Step 2 — Rebrand: Metaversus → AETHER
Identity: **AETHER**, tagline "Step into worlds that feel real." Palette violet `#7C3AED` / cyan `#22D3EE` on base `#0E1116`.

- **Color SSOT:** defined the palette as CSS variables in `:root` (`styles/globals.css`); pointed Tailwind tokens (`primary-black`, `secondary-white`, new `surface`/`accent`/`glow`) at those vars; retuned all gradients to the violet/cyan scheme.
- **De-hardcoded colors:** replaced scattered `bg-[#323F5D]`, `bg-[#5D6680]`, `bg-[#25618B]`, `text-[#B0B0B0]` with the new `surface`/`accent`/`secondary-white` tokens (NewFeatures, StartSteps, World, Footer).
- **Name:** swapped wordmark everywhere (Navbar, Footer ×2, buttons, ExploreCard label, testimonial). Also corrected the tutorial's "METAVERUS"/"Metaverus" misspellings as a side effect.
- **Hero:** reworked the "Metaverse / Ma|Ness" treatment into "Enter / Ae|Ther".
- **Copy:** original text for About, all section eyebrows/titles, the 5 Explore worlds (dropped copyrighted names like "Hogwarts"/"Upside Down"), onboarding steps, feature cards, the 3 insight posts, and the testimonial.
- **Meta:** real `<title>` + description in `app/head.js`.
- Build verified green; no "metaverse" strings remain.

### Step 3 — Fixed tutorial leftovers
- **"Title" prefix bug:** `NewFeatures` rendered `Title {title}` → now just `{title}`.
- **Broken image paths:** `World` used `people-01.png`/`people-03.png` (no leading slash) → `/people-01.png` etc.
- **Step number spacing:** `GetStarted` produced `"0 1"` → now `"01"` (`${index + 1 < 10 ? '0' : ''}${index + 1}`).
- **Copy-paste alt text:** `ExploreCard`/`InsightCard` now use `alt={title}`; fixed `WhatsNew` (`alt="get-started"`), `Feedback` (`alt="planet-09"`), and `World` map/avatar alts.
- Deferred: consolidating the two ESLint configs (`.eslintrc.js` + `.eslintrc.json`) — not approved; build warns "Next.js plugin not detected" but lints fine.

### Step 4 (batch 1) — New sections
- **Pricing** (`sections/Pricing.jsx`): Explorer/Creator/Studio tiers with a monthly↔annual `useState` toggle and a highlighted "popular" plan. Reuses `glassmorphism`/`surface`/`accent`, header + motion variants. `id="pricing"`.
- **Stats** (`sections/Stats.jsx`): four metrics with count-up-on-scroll (`useInView` + rAF easing). Reuses `staggerContainer`/`fadeIn`, `surface` chips.
- **FAQ** (`sections/Faq.jsx`): accessible accordion (`<button aria-expanded>`, `AnimatePresence` height animation), reusing Explore's single-active toggle pattern. `id="faq"`.
- Data added to `constants/index.js` (`statistics`, `pricingPlans`, `faqs`, `navLinks`, social `link`s).
- Wired into `app/page.js`; added `id="get-started"` to GetStarted for the upcoming Hero CTA.
- New page order: Hero → About → Explore → GetStarted → WhatsNew → **Pricing** → World → **Stats** → Insights → **FAQ** → Feedback → Footer.
- Build verified green.

### Step 4 (batch 2) — Nav wiring + Hero upgrade + Footer wiring
- **Navbar:** rebuilt as a real nav — `navLinks` (Worlds/Pricing/FAQ), a "Get access" CTA, sticky positioning with dark glass + blur on scroll, active-link highlight via `IntersectionObserver`, and an animated mobile hamburger menu (`AnimatePresence`). Wordmark is a scroll-to-top button (a11y: `href="#"` is invalid). Dropped the non-functional search icon.
- **Hero:** added a tagline + two CTA buttons (Enter AETHER → `#explore`, How it works → `#get-started`), a bottom gradient overlay on the cover, scroll-parallax on the cover (`useScroll`/`useTransform`), and a slowly rotating stamp as a scroll affordance.
- **Footer:** social icons are now real `<a>` links (from `socials[].link`); "Enter AETHER" scrolls to `#pricing`.
- Added `scroll-mt-[110px]` to anchor-target sections so the sticky nav doesn't cover them on jump.
- Build verified green.

### Step 4 (batch 2, fixes)
- **Sticky nav fix:** page root `overflow-hidden` was disabling `position: sticky` on the nav → changed to `overflow-x-clip` (clips horizontal animation overflow without creating a scroll container).
- **Hero secondary CTA** now targets the About section (`#about`, added id + `scroll-mt`); relabeled "How it works" → "Learn more".

### Step 4 (batch 3) — Motion polish
- **World:** connection arcs now animate as flowing dashes (`motion.path` strokeDashoffset loop) and each explorer marker emits a staggered pulse ring — kept the dashed look you added.
- **Insights:** cards lift on hover (`whileHover`), image zooms (`group-hover:scale-110` in a clipped container), and the arrow circle fills with `accent` + slides; added category·read-time meta (data in `constants`).
- **GetStarted:** added a vertical connector line through the numbered step badges.
- Build verified green.

<!-- Next: Tier A world re-theme (world-select recolors the site via CSS vars), then Step 5 polish (responsive/a11y/reduced-motion). Tier C + image-perf logged in TODO.md. -->
