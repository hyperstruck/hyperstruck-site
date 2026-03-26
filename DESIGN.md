# Design System Specification: The Monolithic Blueprint

## 1. Overview & Creative North Star
This design system is built upon the **Creative North Star: "The Monolithic Blueprint."** 

We are moving away from the "software-as-a-service" template look. Instead, we treat the interface as a high-end technical document—an engineered artifact that values precision over decoration. The aesthetic is defined by extreme structural clarity, intentional asymmetry, and a rhythmic use of whitespace that commands authority. We do not fill space; we curate it. 

By leveraging sharp 0px corners and a high-contrast monochromatic palette, we create an environment that feels less like an app and more like a high-performance terminal for the next generation of AI.

---

## 2. Colors & Surface Architecture
The color logic is rooted in "Tonal Depth." We avoid the "flat" look of early minimalism by using a sophisticated hierarchy of near-blacks and warm greys.

### The Surface Hierarchy
Depth is not created with shadows, but through **Nesting**.
*   **Base Layer:** `surface` (#131314) – The infinite void.
*   **Sectioning:** `surface-container-low` (#1C1B1C) – Used to define large functional regions.
*   **Interaction/Focus:** `surface-container-high` (#2A2A2B) – Reserved for active modules or cards.

### The "No-Line" Rule
Standard 1px solid borders for sectioning are strictly prohibited. Structural separation must be achieved through background color shifts. A `surface-container-low` section sitting on a `surface` background provides all the definition a professional user needs. 

### Signature Textures & Glass
To provide "visual soul" without breaking the technical mandate:
*   **The Technical Glow:** Use the `primary` (#FFFFFF) color with a 4% opacity overlay on large surfaces to create a "paper-grain" texture effect.
*   **Glassmorphism:** For floating overlays (modals/tooltips), use `surface-container-highest` with a `backdrop-blur` of 20px and 60% opacity. This ensures the "Blueprint" feels layered and physical.

---

## 3. Typography
We utilize a dual-font strategy to balance editorial sophistication with engineering precision.

*   **Display & Headlines (Space Grotesk):** This is our "Engineered Voice." Space Grotesk’s geometric quirks provide a technical, slightly brutalist character. Use `display-lg` (3.5rem) with tightened letter-spacing (-0.02em) for hero moments to create a sense of monumental scale.
*   **Body & Utility (Inter):** This is our "Functional Voice." Inter provides maximum legibility for complex AI data. 
*   **Technical Accents (Monospace):** Use JetBrains Mono for all data points, coordinates, and system statuses. This signals to the user that they are looking at raw, unadulterated intelligence.

---

## 4. Elevation & Depth
In this system, "Elevation" is a measure of light, not height.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a "recessed" effect. Conversely, place `surface-container-highest` on `surface` to create "lift."
*   **Ambient Shadows:** Traditional drop shadows are forbidden. If a floating element requires separation, use a shadow with a 64px blur at 4% opacity, tinted with `surface-tint`. It should feel like an atmospheric glow, not a shadow.
*   **The Ghost Border:** For high-density data where tonal shifts aren't enough, use a "Ghost Border." This is a 1px stroke using `outline-variant` (#474747) at 20% opacity. It should be barely perceptible—visible only when the eye searches for it.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#FFFFFF) with `on-primary` (#1A1C1D) text. Sharp 0px corners. No gradients.
*   **Secondary:** Ghost style. `outline` stroke (#919191) at 40% opacity. On hover, background shifts to `surface-container-highest`.
*   **Tertiary/Mono:** Pure monospace text with a 1px underline. Used for "technical" actions.

### Input Fields
*   **Minimalist Frame:** No four-sided boxes. Use a bottom-border only (1px `outline-variant`) or a subtle tonal shift using `surface-container-low`.
*   **Focus State:** The bottom border transitions to 2px `primary`.

### Cards & Lists
*   **Rule:** Forbid the use of divider lines. 
*   **Implementation:** Use `spacing-8` (2.75rem) to separate list items. If the list is dense, use alternating backgrounds (`surface` and `surface-container-low`) rather than lines.

### Technical HUD (Heads-Up Display)
*   A custom component for AI status. Small `label-sm` monospace text, all-caps, with a `secondary` color. This should be placed in the corners of containers to act as "metadata."

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align a headline to the left and a body paragraph to the far right of a grid to create an editorial, "un-templated" feel.
*   **Use Massive Padding:** When in doubt, increase padding. Use `spacing-16` (5.5rem) for section gutters.
*   **Align to the Pixel:** Because we use 0px border-radii, alignment errors are magnified. Ensure every element sits perfectly on the 4px baseline.

### Don't:
*   **Don't Use Rounded Corners:** Any radius above 0px violates the "engineered" confidence of the system.
*   **Don't Use Icons for Everything:** Only use icons when they serve a functional purpose. Prefer text labels in `label-md` Space Grotesk.
*   **Don't Use Pure Black:** Avoid #000000. Use `surface-container-lowest` (#0E0E0F) to keep the UI feeling premium and "ink-like" rather than "empty."

---

## 7. Spacing Scale Reference
*   **Macro (Layout):** Use `spacing-20` (7rem) and `spacing-24` (8.5rem).
*   **Micro (Components):** Use `spacing-3` (1rem) for internal button padding and `spacing-4` (1.4rem) for element grouping.
*   **The "Technical Gap":** Use `spacing-px` (1px) for hair-line separations between adjacent tonal blocks.