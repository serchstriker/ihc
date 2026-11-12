---
name: Technical Craft Dark
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#bc1d25'
  on-tertiary-container: '#ffd0cc'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system embodies the rigor of software engineering combined with the polish of high-end product design. Crafted for mobile UI engineers, product designers, and technical architects, the aesthetic bridges the systematic authority of Apple Developer documentation with the actionable precision of modern UI engineering guides. 

The visual personality is authoritative, analytical, and distinctly tactile. It delivers a calibrated dark-mode workspace where interactive components, touch targets, and accessibility audits feel tangible. Interfaces evoke focus and mastery through deep slate backdrops, sharp geometric alignments, deliberate neon-infused status accents, and high-legibility typographic hierarchies. Avoid decorative skeuomorphism or frivolous gradients; all visual treatments serve to explain, evaluate, and demonstrate ergonomic excellence.

## Colors

The palette operates on a disciplined semantic color architecture engineered for high-contrast dark environments:

- **Primary (`#4F46E5` - Electric Blurple):** Anchors primary brand actions, selected interactive states, active code toggles, and primary navigation nodes.
- **Secondary (`#10B981` - Emerald Green / "Do"):** Designates compliant patterns, validated accessibility checks, WCAG passes, and recommended ergonomics.
- **Tertiary (`#EF4444` - Coral Rose / "Don't"):** Highlights anti-patterns, accessibility violations, cramped tap targets, and design errors.
- **Warning Accent (`#F59E0B` - Amber Studio):** Emphasizes warnings, conditional rules, cautionary thresholds, and platform-specific quirks.
- **Surface Hierarchy:**
  - `Canvas / Root`: `#0B0F19` (Deeper base for maximum dynamic range)
  - `Surface 1 (Base Panels)`: `#0F172A` (Slate base container)
  - `Surface 2 (Cards & Modules)`: `#1E293B` (Elevated interactive surfaces)
  - `Surface 3 (Overlays & Modals)`: `#334155` (Highest local elevation layer)
- **Stroke & Boundary:**
  - `Subtle Border`: `#1E293B` with 50% opacity
  - `Defined Border`: `#334155`
  - `Focus / Spec Outline`: `#6366F1`
- **Text & Foreground:**
  - `Text Primary`: `#F8FAFC` (100% contrast readability)
  - `Text Secondary`: `#94A3B8` (Metadata, technical captions, labels)
  - `Text Tertiary / Muted`: `#64748B` (Disabled nodes, inactive states)

## Typography

Typography establishes an educational rhythm between human-readable guidance and machine-precise specifications.

- **Proportional UI Type (Plus Jakarta Sans):** Handles visual titles, narrative lessons, rationale, and interface labels. Its contemporary geometry ensures fast legibility in dark environments while maintaining warmth and approachability.
- **Monospace Spec Engine (JetBrains Mono):** Exclusively reserved for design tokens, measurement readouts (`48dp`, `44pt`, `min-h: 48px`), hex codes, WCAG contrast ratios (`7.1:1 AAA`), and code snippets.
- **Contrast Discipline:** Ensure all instructional body copy maintains at least 4.5:1 against surfaces. Spec badges in `JetBrains Mono` must maintain strict 7:1 (AAA) clarity against their respective status backgrounds.

## Layout & Spacing

The layout is grounded in a fluid 4-column (mobile), 8-column (tablet), and 12-column (desktop) layout system adhering to strict 4px/8px incremental spatial rhythm.

- **Ergonomic Safe Zones:** On mobile viewports, high-priority interactive test fields must reside within the primary lower thumb zone (the bottom 60% of the screen height), while read-only specs and metrics occupy the top viewing band.
- **Touch Target Geometry:** Every interactive target reinforces the core rule of mobile GUI design: standard touch zones must maintain a min-size box of `48px x 48px` (or `44pt` on iOS-equivalent presets), even when visual iconography inside is smaller (`20px` to `24px`).
- **Breakpoints:**
  - **Compact (Mobile):** `< 600px` (4 columns, `margin: 1rem`, `gutter: 1rem`)
  - **Medium (Tablet):** `600px - 1024px` (8 columns, `margin: 1.5rem`, `gutter: 1rem`)
  - **Expanded (Desktop / Studio View):** `> 1024px` (12 columns, `margin: 2.5rem`, `gutter: 1.5rem`)
- **Interactive Split Grids:** Comparative "Do vs. Don't" demonstrations stack vertically on compact screens and render as synchronized side-by-side columns on tablet and desktop viewports.

## Elevation & Depth

Visual hierarchy does not rely on heavy drop shadows. Instead, it employs **Tonal Layering** complemented by **Precise Edge Lighting** and **Subtle Colored Glows**:

- **Layer 0 (Canvas Base):** Deepest `#0B0F19`. Zero shadow.
- **Layer 1 (Module Container):** Surface `#0F172A` with a 1px border of `#1E293B`.
- **Layer 2 (Interactive Playground & Cards):** Surface `#1E293B`, 1px border of `#334155`. Accompanied by an ambient shadow: `0 4px 16px -2px rgba(0, 0, 0, 0.45)`.
- **Layer 3 (Floating Inspect Overlays & Modals):** Surface `#334155`, 1px border `#475569`, shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.65)`.
- **Active Spec Highlights:** Focus elements and validated interactive states receive an internal edge illumination (`inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`) and an external glow tint:
  - Selected state: `0 0 0 1px #4F46E5, 0 4px 12px rgba(79, 70, 229, 0.25)`
  - Correct ("Do") pass: `0 0 0 1px #10B981, 0 4px 12px rgba(16, 185, 129, 0.2)`
  - Error ("Don't") fail: `0 0 0 1px #EF4444, 0 4px 12px rgba(239, 68, 68, 0.2)`

## Shapes

The design system follows a modern squircle-adjacent curved language with Level 2 roundedness (`rounded-md: 0.5rem`, `rounded-lg: 1rem`, `rounded-xl: 1.5rem`).

- **Base Cards & Canvases:** `rounded-lg` (16px) creates a balanced, organic containment area for mobile device frames and spec viewports.
- **Interactive Controls (Inputs, Buttons, Segmented Tabs):** `rounded-md` (8px to 12px) provides deliberate tactile boundaries that distinguish components from container frames.
- **Badges, Metric Chips & Micro Indicators:** Pill-shaped (`rounded-full` / 9999px) ensures immediate categorization as status metadata rather than clickable containers.
- **Spec Overlays & Ruler Guides:** Retain crisp 2px to 4px corners to communicate mechanical measurement precision.

## Components

### 1. Buttons
- **Primary Action:** Background `#4F46E5`, text `#F8FAFC`, border `1px solid rgba(255,255,255,0.15)`, height `48px`, padding horizontal `20px`, corner radius `12px`. Hover/Active shifts to `#4338CA` with subtle primary glow.
- **Secondary / Ghost:** Surface `#1E293B`, text `#F8FAFC`, border `1px solid #334155`, height `48px`.
- **Destructive / 'Don't' Button:** Tinted background `rgba(239, 68, 68, 0.12)`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.3)`.

### 2. Status & Metric Chips (Badges)
- **Structure:** Monospace text in `JetBrains Mono` (10px or 12px), height `24px`, padding `0 10px`, pill-shaped.
- **WCAG AAA / Do Chip:** Background `rgba(16, 185, 129, 0.12)`, border `1px solid rgba(16, 185, 129, 0.35)`, text `#10B981`. Includes leading check icon or pass indicator.
- **Fail / Don't Chip:** Background `rgba(239, 68, 68, 0.12)`, border `1px solid rgba(239, 68, 68, 0.35)`, text `#EF4444`. Includes leading cross icon.
- **Spec Dimension Chip:** Background `#0F172A`, border `1px solid #334155`, text `#94A3B8`. Displays live px/dp readouts.

### 3. Cards & Comparison Panels ("Do vs. Don't")
- **Dual Container:** Split container on `#1E293B` card. Top header contains status indicator ("DO: 48dp Touch Target" vs. "DON'T: 28dp Cramped Target").
- **Header Badge:** Emerald `#10B981` tag for "Recommended", Coral `#EF4444` for "Anti-Pattern".
- **Internal Sandbox:** A recessed preview sandbox (`#0B0F19`) displaying the live interactive element with toggleable ruler guides.

### 4. Interactive Toggles & Segmented Controls
- **Segmented Platform Switcher:** iOS, Android, and Web toggles built on a track of `#0F172A` with `4px` padding. Active tab sits on `#1E293B` with high-contrast text and a 1px border of `#475569`.
- **Inspector Switches:** Tactile mobile switches (`width: 48px`, `height: 28px`) utilizing `#4F46E5` for active states and `#334155` for inactive tracks.

### 5. Input Fields
- **Container:** Height `48px`, background `#0F172A`, border `1px solid #334155`, corner radius `10px`, typography `14px Plus Jakarta Sans`.
- **Focus State:** Border `#4F46E5`, box-shadow `0 0 0 3px rgba(79, 70, 229, 0.25)`.
- **Error State:** Border `#EF4444`, box-shadow `0 0 0 3px rgba(239, 68, 68, 0.2)`.

### 6. Specialized Pedagogical Modules
- **Touch Target Heatmap:** Translucent overlay grid with a circular radial gradient indicating user thumb reach (`rgba(79, 70, 229, 0.35)` core expanding outward).
- **Dimension Ruler:** Monospace annotations displaying dynamic bounding boxes (`48 × 48 px`) rendered with dashed `1px #6366F1` guides and anchored dimension ticks.