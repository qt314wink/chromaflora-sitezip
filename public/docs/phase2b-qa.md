# ChromaFlora v5.0 — Phase 2b QA Checklist

**Author:** Jennipher Troup (@halcyonminx)
**Scope:** All pages, all features, all devices, all edge cases
**Date:** May 2026
**Status:** Living document — add items as features are added

---

## Section 1 — Visual Design QA

### Token Consistency
- [ ] All six tokens defined in every page's `<style>`: `--void`, `--iris`, `--aqua`, `--bloom`, `--ember`, `--viridian`
- [ ] No hardcoded hex values in CSS (use `var(--token)`)
- [ ] Background is always `--void` (#04040f) — no white, no grey
- [ ] Fonts loaded: Inter + JetBrains Mono (Google Fonts CDN)
- [ ] No font substitutions visible (check on clean device)
- [ ] All glow effects use rgba() variants of the 6 tokens

### Layout & Spacing
- [ ] Nav bar fixed at top, 56px height, z-index >= 100
- [ ] Nav links: `nl` class on band.html, `nav-link` class on all others
- [ ] All 6 nav links present and correctly linked on every page
- [ ] Page content begins at least 56px from top (nav clearance)
- [ ] No horizontal scroll on any page (desktop 1280px+)
- [ ] Cards and panels have consistent border-radius (8px standard)

### Aesthetic Compliance
- [ ] No white backgrounds anywhere
- [ ] No images or assets with light backgrounds
- [ ] All borders use rgba() token colors at ≤0.4 opacity
- [ ] Loading states use breathing pulse animation (not spinner)
- [ ] Save feedback uses aurora flash (not toast notification)

### Colorblind Simulation (use colblindor.com)
- [ ] Deuteranopia (green-blind): key UI states distinguishable
- [ ] Protanopia (red-blind): key UI states distinguishable
- [ ] Achromatopsia (monochrome): key UI states distinguishable

---

## Section 2 — band.html Sequencer QA

### Transport Controls
- [ ] BPM slider works (60–200 range)
- [ ] Swing slider works (0–50% range)
- [ ] Play/stop button toggles correctly
- [ ] Audio starts after user gesture (not before)
- [ ] "Tap to begin" indicator shown before first gesture

### Audio Engine
- [ ] Tone.js loads from CDN before any audio call
- [ ] All 8 synths initialize without errors
- [ ] Each track plays its correct synth (kick = MembraneSynth, etc.)
- [ ] FeedbackDelay and Reverb effects audible
- [ ] BPM changes apply immediately while playing
- [ ] Swing changes apply immediately while playing

### Sequencer Grid
- [ ] 8 tracks × 32 steps render correctly
- [ ] Step cells toggle on click (active/inactive)
- [ ] Playing indicator moves through steps in time
- [ ] Playing indicator uses `--aqua` color
- [ ] Active+playing cell shows maximum brightness
- [ ] Mute button works per track (silences that track)
- [ ] Muted tracks show visual indicator

### Pattern Algorithms
- [ ] Euclidean button generates E(k,n) pattern on selected track
- [ ] Chaos button generates logistic map pattern
- [ ] Groove button adds human variation to current pattern
- [ ] Random button generates random pattern
- [ ] Algorithm UI prompts for parameters (steps, hits)

### Pattern Memory
- [ ] Save to Slot A/B/C/D works
- [ ] Load from Slot A/B/C/D restores pattern
- [ ] Patterns persist across page refresh (localStorage)
- [ ] cf_seq_patterns key written to localStorage correctly

### Grid Steps Toggle
- [ ] Toggle between 16 and 32 steps works
- [ ] 16-step view: only first 16 cells visible/active
- [ ] 32-step view: all 32 cells visible/active

---

## Section 3 — ai-studio.html QA

### Pollinations Image Generation
- [ ] Prompt input accepts text
- [ ] Model selector (flux/realism/anime/3d/any-dark/turbo) works
- [ ] Width, height, seed inputs work
- [ ] Generate button triggers correct Pollinations URL
- [ ] Loading state shown during generation (3–15s)
- [ ] Image displays on successful generation
- [ ] Error state shown on failure + retry option
- [ ] Generated image saved to cf_gen_images (localStorage)
- [ ] Image history grid shows up to 20 most recent
- [ ] "Copy Prompt" button copies to clipboard
- [ ] Delete button removes from history

### Reverse Image Engineering
- [ ] File drop zone accepts image files (PNG, JPG, WebP)
- [ ] Analysis runs without external API call (local analysis)
- [ ] Report sections populate: colors, texture, composition, style, prompt
- [ ] History saved to cf_rev_history
- [ ] History panel shows previous analyses
- [ ] Sensory → visual lookup works (text input → visual description)
- [ ] Fashion taxonomy section populates

### API Key Indicators
- [ ] HuggingFace key dot shows correct state
- [ ] Grok key dot shows correct state
- [ ] Pollinations dot shows "free / no key" state

---

## Section 4 — discovery.html QA

### Card Grid
- [ ] 24 cards render on page load
- [ ] Cards span all 9 territories
- [ ] Cards fade in sequentially (100ms stagger)
- [ ] First card revealed is from least-visited territory
- [ ] Card grid is 4-column on desktop, 2-column on tablet, 1-column on mobile

### Anti-Feedback Algorithm
- [ ] Territory visit counts update correctly
- [ ] Weighted random selection favors unvisited territories
- [ ] Cooldown prevents same territory appearing consecutively
- [ ] cf_discovery_territories key updated in localStorage

### Card Interaction (Lightbox)
- [ ] Click card → lightbox opens
- [ ] Lightbox shows: What, Why, Applications, Provenance, Mini-Report
- [ ] Mystery question input accepts text
- [ ] Reveal button shows original question
- [ ] Save button adds to cf_discovery_notebook
- [ ] Close button (×) or Escape key closes lightbox
- [ ] Lightbox scroll works on long content

### Notebook
- [ ] Saved cards appear in notebook panel
- [ ] Notebook count shown in header
- [ ] Remove from notebook works
- [ ] Notebook persists across page refresh

---

## Section 5 — mandala.html QA

### Canvas Rendering
- [ ] Canvas renders at full page width/height
- [ ] Device pixel ratio scaling applied (retina support)
- [ ] Mandala centered on canvas
- [ ] Continuous rotation at default speed

### Parameter Controls
- [ ] All sliders change mandala in real time
- [ ] LERP smoothing applied (no jarring jumps)
- [ ] Rings parameter changes ring count
- [ ] Steps parameter changes division count
- [ ] Rotation speed slider works (including negative/reverse)
- [ ] Complexity parameter changes petal shape

### Save/Load
- [ ] Save button stores current parameters to cf_mandalas
- [ ] Load restores saved mandala
- [ ] Multiple saved mandalas listed and selectable
- [ ] Export as PNG works (canvas.toDataURL)

### Performance
- [ ] Animation runs at 60fps on target hardware
- [ ] No frame drops during parameter changes
- [ ] No memory leak on extended use (>10 min)

---

## Section 6 — studio.html QA

### Canvas Tools
- [ ] Brush tool draws on canvas
- [ ] Brush size slider works
- [ ] Brush opacity slider works
- [ ] Color swatches (6 tokens) apply to brush
- [ ] Clear canvas button works
- [ ] Undo (Cmd+Z) reverts last action (if implemented)

### Three.js Layer (Phase 2b)
- [ ] Three.js CDN loads without error
- [ ] WebGL canvas renders above 2D canvas
- [ ] Particle system visible
- [ ] Bloom effect visible
- [ ] No z-index conflict with UI controls
- [ ] pointer-events: none on WebGL canvas

---

## Section 7 — Cross-Page QA

### Navigation
- [ ] All pages have nav bar
- [ ] All 6 nav links present and correct on every page
- [ ] Active page is visually indicated in nav
- [ ] Nav links work correctly (correct filenames, no 404)
- [ ] Fixed nav doesn't overlap page content

### localStorage Integrity
- [ ] All cf_* keys use correct format
- [ ] JSON.parse() doesn't throw on any stored value
- [ ] cfLoad() fallback works when key missing
- [ ] No key collisions between features

### SessionStorage Cross-Page
- [ ] cf_session key written on page unload
- [ ] cf_session read correctly on page load
- [ ] ai-studio.html reads discovery prompts from sessionStorage

### Performance
- [ ] Each page loads in < 3.5s on 4G
- [ ] Tone.js deferred (not blocking load)
- [ ] Three.js lazy-loaded (not blocking load)
- [ ] Google Fonts use `display=swap`

---

## Section 8 — Browser Compatibility QA

### Desktop Browsers
- [ ] Chrome 120+ — all features work
- [ ] Firefox 120+ — canvas, Web Audio work
- [ ] Safari 17+ — Web Audio requires gesture, Test AudioContext.state
- [ ] Edge 120+ — Chromium-based, same as Chrome

### Mobile Browsers
- [ ] iOS Safari — Test Web Audio gesture requirement
- [ ] Android Chrome — Test vibrate API
- [ ] iOS Chrome — Test localStorage limits

### Feature Support Checks
- [ ] Web Audio API: `window.AudioContext || window.webkitAudioContext`
- [ ] Web Speech API: `window.speechSynthesis` check before use
- [ ] navigator.vibrate: check before calling
- [ ] backdrop-filter: provide fallback for Firefox (solid bg)
- [ ] Canvas 2D: universally supported, no check needed
- [ ] CSS custom properties: universally supported in target browsers

---

## Section 9 — Accessibility QA

### Keyboard Navigation
- [ ] All interactive elements reachable by Tab key
- [ ] Focus indicator visible against --void background
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/lightboxes
- [ ] Cmd+S triggers save on all pages

### Screen Reader
- [ ] All images have alt text
- [ ] Canvas elements have aria-label describing content
- [ ] Dynamic content updates announced via aria-live
- [ ] Navigation has aria-nav role
- [ ] Buttons have descriptive labels (not just icons)

### Color & Contrast
- [ ] Body text (#c4b5d0 or similar on --void) meets WCAG AA (4.5:1 contrast)
- [ ] Large text/headings meet WCAG AA (3:1 contrast)
- [ ] Interactive elements meet 3:1 contrast requirement
- [ ] No information conveyed by color alone

### Motion
- [ ] `@media (prefers-reduced-motion: reduce)` implemented
- [ ] Mandala rotation: stops on reduced-motion
- [ ] Aurora animation: skipped on reduced-motion
- [ ] Breathing pulse: reduced to static glow on reduced-motion

---

## Section 10 — Edge Cases & Stress Tests

### localStorage Edge Cases
- [ ] What happens when localStorage is full?
- [ ] What happens when localStorage is disabled (private mode)?
- [ ] What happens after 100 saved mandalas?
- [ ] What happens after 50 discovery notebooks?
- [ ] JSON.parse on corrupt data throws → caught by try/catch?

### Audio Edge Cases
- [ ] What if Tone.js CDN fails to load?
- [ ] What if the user navigates away while audio is playing?
- [ ] What if the user sets BPM to 200 with all 32 steps active?
- [ ] What if the user spams the play/stop button?

### Pollinations Edge Cases
- [ ] What if the Pollinations server is down?
- [ ] What if the prompt contains special characters?
- [ ] What if the prompt is empty?
- [ ] What if seed = 0?
- [ ] What if width or height is set to 0?

### Network Edge Cases
- [ ] What if Google Fonts CDN fails? (font-display: swap fallback)
- [ ] What if Tone.js CDN fails? (graceful degradation message)
- [ ] What if user is offline? (all pages should work except API features)

### Discovery Engine Edge Cases
- [ ] What if all 24 cards have been visited?
- [ ] What if cf_discovery_territories is corrupted?
- [ ] What if the mystery question input is XSS payload?
- [ ] What if the lightbox is opened on a very short card?

---

## Section 11 — GEO & SEO QA

### Meta Tags (all pages)
- [ ] `<title>` is unique and descriptive per page
- [ ] `<meta name="description">` is 140-160 chars, answers "what does this page do?"
- [ ] `<meta property="og:title">` set
- [ ] `<meta property="og:description">` set
- [ ] `<meta property="og:image">` set (1200×630px image)
- [ ] `<meta property="og:url">` set
- [ ] `<meta name="twitter:card" content="summary_large_image">` set
- [ ] `<link rel="canonical">` set

### Schema Markup
- [ ] WebApplication JSON-LD on index.html
- [ ] Author Person JSON-LD on all pages
- [ ] BreadcrumbList on docs pages

### Content Accessibility for AI Engines
- [ ] Each page has a clear, GEO-readable description in first 60 words of body
- [ ] Key features described in definition format ("ChromaFlora Band is a step sequencer that...")
- [ ] Statistics and specific claims cited where possible

---

## Section 12 — Sign-Off Criteria

A feature is considered QA-complete when:
- [ ] All items in its section checked
- [ ] Cross-page QA items checked
- [ ] Tested on Chrome 120+ desktop
- [ ] Tested on iOS Safari (or Android Chrome)
- [ ] No console errors
- [ ] No console warnings related to the feature
- [ ] Lighthouse Performance > 80 on desktop
- [ ] Lighthouse Accessibility > 85 on desktop

**Phase 2b complete when:**
- [ ] Three.js layer in studio.html passes section 6 QA
- [ ] Web Worker in mandala.html passes section 5 QA (performance)
- [ ] All social media templates created (section 3 of social strategy)
- [ ] All API keys registered and tested
- [ ] All docs in /docs/ directory are accurate and complete
- [ ] All skills in .agents/skills/ are written and tested
