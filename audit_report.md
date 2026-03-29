# Visual & Architectural Audit Report
**Project:** mian-web

## 1. Project Overview & Architecture
- **Framework:** Next.js 16 (App Router) with React 19.
- **Styling:** Tailwind CSS (v4) supplemented by extensive custom CSS (`globals.css`, `tokens.css`) emphasizing a highly crafted, "luxury" aesthetic with gold accents and dark themes.
- **Animation/Effects:** Heavy use of custom WebGL (raw shaders), CSS animations (`shimmer`, `pulseDot`, etc.), Framer Motion, and GSAP.

## 2. Visual Aesthetic & Theming
- **Palette:** Dark base (`var(--color-bg)`) with a strong emphasis on gold accents (`var(--color-gold)` #d4a96e, amber, tobacco). Light mode is supported but seems secondary.
- **Typography:**
  - Headings: *Cormorant Garamond* (italic, razor-thin) for an editorial/Vogue feel.
  - Body: *Inter* for clean legibility.
  - Accents/Mono: *DM Mono* for technical/eyebrow text.
- **Consistency:** High level of consistency enforced via CSS custom properties (`tokens.css`). Recurring motifs include "silk slides", "gold shimmer sweeps", "glassmorphism" (`.glass`), and "subsurface glows".

## 3. Component Review

### 3.1 Layout (`Header.tsx`)
- **Structure:** Fixed header with a blur backdrop. Includes brand logo, desktop nav with a morphing gold underline, light/dark toggle, "Classic View" toggle (disables motion), a vintage clock widget, and a mobile hamburger menu.
- **UX:** Excellent touch with the scroll progress bar at the bottom of the header. The "Classic View" is a great accessibility feature for users who prefer reduced motion.

### 3.2 Key Scenes (`HeroSection.tsx`)
- **Visuals:** Uses a raw WebGL ambient background shader behind the content.
- **Interaction:** Implements "Ludic Micro-Parallax" (mouse tracking to subtly shift content).
- **Typography:** Uses the `.headline-shimmer` effect.

### 3.3 Effects (`TokenStream.tsx`, etc.)
- **Execution:** Custom canvas implementations (e.g., `TokenStream.tsx` for falling matrix-like characters) rather than relying heavily on external libraries, indicating a focus on performance and bespoke design.

### 3.4 AI Integration (`ChatWidget.tsx`)
- **Design:** Floating action button in the bottom right that expands into a glassmorphic chat panel. Matches the site's aesthetic perfectly (gold accents, dark theme).
- **Functionality:** Uses a standard Next.js API route (`/api/ai`) for backend communication.

## 4. Observations & Recommendations (No-Edit Audit)

1.  **Performance:** The site uses multiple raw WebGL canvases and continuous `requestAnimationFrame` loops (e.g., in Hero, TokenStream). While visually stunning, this could impact performance on lower-end devices or drain battery on mobile. The "Classic View" toggle is a good mitigation, but consider adding an `IntersectionObserver` to pause animations when they are off-screen (already done well in `TokenStream.tsx`, ensure it's applied globally).
2.  **Accessibility (a11y):** The `.skip-link` in `globals.css` is a great inclusion. The explicit `aria-label`s and ARIA live regions for scroll progress in the Header show strong attention to accessibility.
3.  **Responsiveness:** The CSS handles grid changes well across breakpoints (900px, 768px, 600px). Mobile navigation overlays are well implemented.
4.  **CSS Complexity:** `globals.css` is very large (~1100 lines) and handles a lot of logic that might normally be componentized in modern React stacks (e.g., specific animation keyframes for cards). While it enforces consistency, it might become hard to maintain as the site grows.

## 5. Conclusion
The project exhibits a very high level of front-end craftsmanship. The visual identity is distinct, luxurious, and technically complex. The architecture correctly balances this complexity with accessibility considerations (Classic View, Semantic HTML). No immediate critical fixes are required from a visual standpoint; the site is well-engineered for its specific aesthetic goals.