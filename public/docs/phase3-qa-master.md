# ChromaFlora — Master QA Checklist
**Phase 3 · May 2026**
**Status:** Work in progress — check items as completed

---

## QA Protocol

- Check each item in Chrome 120+, Firefox 120+, and iOS Safari 17+ (mobile)
- Console must show zero errors for each page
- All animations must run at ≥60fps on desktop
- Mobile must not have horizontal scroll
- Each module must work offline (except Pollinations AI generation)

---

## Global — All Pages

### Navigation
- [ ] All 6 nav links present on every page: Studio · Mandala · Sonic Waves · Band · AI Studio · Discover
- [ ] ASMR nav link added to all pages
- [ ] Active page highlighted in nav
- [ ] Nav links use correct class (`nav-link` or `nl` per page)
- [ ] Mobile nav is usable on small screens (no overlap, tap targets ≥44px)
- [ ] Keyboard navigation works (Tab through all nav items)
- [ ] All nav links resolve (no 404s)

### SEO/Meta
- [ ] `<html lang="en">` on all pages
- [ ] Unique `<title>` per page (50-65 chars)
- [ ] Unique `<meta name="description">` per page (140-160 chars)
- [ ] `<link rel="canonical">` present and correct
- [ ] `<meta property="og:title">` present
- [ ] `<meta property="og:description">` present
- [ ] `<meta property="og:url">` present
- [ ] `<meta property="og:type" content="website">` present
- [ ] `<meta property="og:site_name" content="ChromaFlora">` present
- [ ] `<meta name="twitter:card" content="summary_large_image">` present
- [ ] `<meta name="twitter:site" content="@halcyonminx">` present
- [ ] `<meta name="theme-color" content="#04040f">` present
- [ ] JSON-LD WebApplication schema present
- [ ] Async font loading pattern (not render-blocking)

### Performance
- [ ] No console errors on load
- [ ] No console warnings on load (acceptable: WebGL context warnings on non-WebGL pages)
- [ ] First Contentful Paint < 1.5s (subjective, no Lighthouse)
- [ ] Fonts loaded before any text content visible
- [ ] CDN assets loading correctly (Three.js, Tone.js, Google Fonts)

### Accessibility
- [ ] Color contrast ≥4.5:1 for body text
- [ ] All interactive elements have visible focus state
- [ ] All images have alt text
- [ ] ARIA labels on icon-only buttons
- [ ] `role="main"` on primary content area
- [ ] Skip link available (optional but noted)
- [ ] Reduced motion: check `prefers-reduced-motion` respected for animations

### Aesthetic Compliance (ChromaFlora System)
- [ ] Background is exactly `--void` (#04040f), no exceptions
- [ ] No new colors beyond the 6 tokens
- [ ] Only Inter and JetBrains Mono fonts used
- [ ] Glow effects use box-shadow with token colors
- [ ] Borders use 1px with low-opacity token colors
- [ ] All empty states handled gracefully (no raw "null" or "undefined" shown)

### Data / localStorage
- [ ] All localStorage keys use `cf_` prefix
- [ ] localStorage reads wrapped in try/catch
- [ ] Data survives page refresh
- [ ] Clear data gracefully handles corrupt JSON
- [ ] No localStorage calls blocking render

---

## studio.html — Art Studio

### Feature Checklist
- [ ] Canvas initializes correctly on load
- [ ] Paint pour physics generates organic blobs
- [ ] Flood fill operates correctly
- [ ] Swirl tool responds to mouse/touch
- [ ] Spray paint tool renders correctly
- [ ] Sacred geometry overlays: Flower of Life renders
- [ ] Sacred geometry overlays: Metatron's Cube renders
- [ ] Sacred geometry overlays: Phi Grid renders
- [ ] Three.js WebGL bioluminescent particle field active in background
- [ ] Particle field dims while user is drawing
- [ ] Particle field re-illuminates after drawing stops
- [ ] Color picker responds correctly
- [ ] Opacity sliders functional
- [ ] Clear canvas works
- [ ] Undo function works (if implemented)
- [ ] PNG export downloads correctly
- [ ] Cmd+S / Ctrl+S keyboard shortcut triggers save
- [ ] Download includes full canvas content
- [ ] Share button copies shareable link (if implemented)
- [ ] Saved artworks appear in gallery section (if implemented)

### Edge Cases
- [ ] Drawing on mobile (touch events)
- [ ] Canvas resize on window resize
- [ ] Very fast mouse movement doesn't break physics
- [ ] Multiple rapid clicks don't cause memory leak

---

## mandala.html — Mandala Studio

### Feature Checklist
- [ ] Mandala renders on load (default preset active)
- [ ] Symmetry slider (fold count) changes mandala in real-time
- [ ] Frequency slider changes petal density in real-time
- [ ] Turbulence slider adds/removes noise
- [ ] Animation: spin rotation animates smoothly
- [ ] Animation: breathing/scale pulse works
- [ ] Pattern switching: Rose Curve, Spirograph, Lissajous, Sacred Geometry, Toroid
- [ ] Each pattern renders without errors
- [ ] DPR-scaled canvas (high-res on Retina displays)
- [ ] Aurora save animation triggers on save
- [ ] Cmd+S / Ctrl+S keyboard shortcut triggers save
- [ ] PNG export at full DPR resolution
- [ ] Saved mandalas appear in gallery
- [ ] Web Worker active (mandala-math.worker.js loaded)
- [ ] Web Worker computation offloading verified in DevTools
- [ ] Complexity toggle: reduces fold count / turbulence in one click
- [ ] Auto-animate mode cycles through parameter changes

### Edge Cases
- [ ] Very high fold counts (>20) don't crash
- [ ] Turbulence at maximum doesn't produce NaN artifacts
- [ ] Worker errors fall back to main thread gracefully

---

## sonic-waves.html — Sonic Wave Visualizer

### Feature Checklist
- [ ] Microphone permission prompt handled gracefully (user denied → show message)
- [ ] Oscilloscope visualization renders
- [ ] Frequency spectrum visualization renders
- [ ] Waveform responds to audio input in real-time
- [ ] Color mode changes (iris/aqua/bloom/rainbow)
- [ ] Sensitivity slider functional
- [ ] Record/capture feature works (if implemented)
- [ ] Embed code available
- [ ] Mobile: works with device microphone

### Edge Cases
- [ ] No microphone connected: graceful error state
- [ ] Browser doesn't support Web Audio: polite message
- [ ] Audio stops: visualizer stops gracefully

---

## band.html — Band & Step Sequencer

### Feature Checklist
- [ ] Sequencer loads with default pattern
- [ ] Play/stop button functional
- [ ] BPM slider changes tempo in real-time
- [ ] All 8 tracks functional
- [ ] Track step buttons toggle correctly
- [ ] Each track has its own instrument/synth
- [ ] Euclidean rhythm generation: E(k,n) fills track correctly
- [ ] Chaos/logistic map generation works
- [ ] Human groove probability toggle works
- [ ] Swing slider functional
- [ ] Pattern memory slots A/B/C/D: save and recall
- [ ] Pattern memory slot switching is smooth (no audio glitch)
- [ ] Volume per track functional
- [ ] Mute per track functional
- [ ] Keyboard shortcut: Space = play/stop
- [ ] Synthesizer parameters (attack, release, etc.) functional
- [ ] All nav links use `nl` class (not `nav-link`)
- [ ] Visual playhead syncs to sequencer timing

### Edge Cases
- [ ] Starting/stopping rapidly doesn't cause Tone.js errors
- [ ] Changing BPM while playing works
- [ ] All 8 tracks active simultaneously: no audio dropout
- [ ] Tone.js AudioContext resumed after user gesture (autoplay policy)

---

## ai-studio.html — AI Studio

### Feature Checklist
- [ ] Tab switching: Generate → Reverse → Gallery
- [ ] Generate tab: prompt input field functional
- [ ] Generate tab: model selector works
- [ ] Generate tab: dimensions selector works
- [ ] Generate tab: seed input functional (random + manual)
- [ ] Image generates and displays on submit
- [ ] Loading state shown during generation
- [ ] Error state shown if generation fails
- [ ] Generated image added to gallery (localStorage)
- [ ] Gallery displays all saved images in grid
- [ ] Gallery: copy prompt button works
- [ ] Gallery: download image button works
- [ ] Gallery: delete image button works
- [ ] Reverse Image Engineering tab: image upload functional
- [ ] Reverse: URL input functional
- [ ] Reverse: Analysis button triggers Pollinations reverse analysis
- [ ] Reverse: Report outputs all 7 analysis dimensions
- [ ] Reverse: Copy report button works
- [ ] Reverse: "Generate from these parameters" pre-fills Generate tab
- [ ] Share button: copies shareable URL or image

### Edge Cases
- [ ] Very long prompts don't break URL encoding
- [ ] Image upload with wrong file type: handled gracefully
- [ ] Pollinations API down: graceful error message

---

## discovery.html — Discovery Engine

### Feature Checklist
- [ ] 24 discovery cards render on load
- [ ] Cards display in 9 territory categories
- [ ] Territory filter buttons work
- [ ] Card flip animation works (front/back)
- [ ] Card save to notebook works
- [ ] Notebook tab: displays saved cards
- [ ] Anti-echo algorithm: unseen territories weighted higher
- [ ] "Surprise Me" button navigates to least-explored territory
- [ ] Search/filter within cards works
- [ ] Share card: copies card content
- [ ] cf_discovery_notebook localStorage key saves correctly
- [ ] Living system: visit tracking updates preference model
- [ ] Preference model: cf_preference_model key written
- [ ] Discovery suggestions weighted by preference model

### Edge Cases
- [ ] All cards saved: handles overflow gracefully
- [ ] First visit (empty notebook): shows onboarding message
- [ ] Very rapid card flips: animation doesn't break

---

## asmr.html — ASMR Module (NEW)

### Feature Checklist
- [ ] Page loads with binaural tone engine ready
- [ ] AudioContext created only after user gesture (autoplay policy)
- [ ] Base frequency selector: 432Hz, 528Hz, 639Hz, 741Hz, 852Hz presets
- [ ] Custom frequency input functional
- [ ] Binaural beat offset: 4Hz (delta), 7Hz (theta), 10Hz (alpha), 14Hz (beta), 40Hz (gamma)
- [ ] Binaural beat explained in UI (what delta/theta/alpha/beta/gamma do)
- [ ] Left ear tone = base frequency
- [ ] Right ear tone = base + offset frequency
- [ ] Volume control functional
- [ ] Fade in on start (smooth, not immediate)
- [ ] Mandala visual: ultra-slow rotation (auto-animate)
- [ ] Mandala visual: breathing opacity pulse
- [ ] Mandala visual: low complexity (meditative, not stimulating)
- [ ] Breathing particle field (very slow, sparse)
- [ ] Sleep timer: 5 min, 15 min, 30 min, 60 min options
- [ ] Sleep timer: displays countdown
- [ ] Sleep timer: fade out volume over last 60 seconds
- [ ] Stop: smooth fade out before AudioContext closed
- [ ] Session duration tracked in localStorage
- [ ] Headphones reminder shown
- [ ] Mobile: works with headphones plugged in

### Edge Cases
- [ ] User opens multiple tabs: only one AudioContext active
- [ ] Timer runs out during browsing another tab: fades gracefully
- [ ] Browser suspends AudioContext on mobile: resumes on interaction

---

## playlist.html — Playlist Module (NEW)

### Feature Checklist
- [ ] Playlist loads saved tracks from localStorage
- [ ] Add track by URL: validates and adds
- [ ] Add track from ChromaFlora generated sources
- [ ] Track list renders with title, artist, duration, key
- [ ] Play/pause per track
- [ ] Skip next/previous
- [ ] Shuffle mode
- [ ] Loop mode
- [ ] Remove track from playlist
- [ ] Circle of Fifths visualization renders (Canvas 2D)
- [ ] Circle highlights current track's key
- [ ] Clicking circle node navigates to that key's tracks
- [ ] Harmonic scale browser: major, minor, pentatonic, dorian, etc.
- [ ] Scale browser shows all notes in scale with frequencies
- [ ] Scale overlay on Circle of Fifths
- [ ] Export playlist as JSON
- [ ] Import playlist from JSON file
- [ ] Share playlist link (encoded in URL)
- [ ] Visual audio synesthesia: color pulses with playback (estimated from BPM)
- [ ] Math overlay: shows interval relationships

---

## Embeddable System

### Feature Checklist
- [ ] Embed URL param: `type=mandala` loads mandala
- [ ] Embed URL param: `type=waves` loads sonic waves
- [ ] Embed URL param: `type=sequencer` loads sequencer
- [ ] Iframe snippet generator button on each relevant page
- [ ] Generated snippet includes correct URL + params
- [ ] Snippet copies to clipboard on click
- [ ] Embedded iframe shows minimal UI (no full nav)
- [ ] Embedded iframe is interactive (user can change params)
- [ ] Embedded iframe: postMessage API for parent page communication (future)

---

## Living System Intelligence

### Feature Checklist
- [ ] `cf_preference_model` key written to localStorage
- [ ] Model tracks: territories visited, cards saved, sequences generated
- [ ] Model tracks: time spent per module
- [ ] Model tracks: generation parameters used
- [ ] Model updates on every meaningful user action
- [ ] Discovery engine reads model when computing card weights
- [ ] Discovery engine: territories visited < 2 times get 3× weight boost
- [ ] Suggestion system: "You might enjoy..." based on model
- [ ] Model exportable as JSON
- [ ] Model resettable (with confirmation dialog)

---

## Cross-Module Features

### Share + Download (all outputs)
- [ ] Every generated artifact has a Download button
- [ ] Download produces correct file type (PNG, JSON, WebM)
- [ ] Copy button copies data URL or JSON to clipboard
- [ ] Share button triggers native share API (if supported) or copy link
- [ ] Shared URLs decode correctly on recipient's browser

### Community Challenges
- [ ] Challenge banner visible on discovery.html
- [ ] Current challenge description clear
- [ ] How to participate: clear instructions
- [ ] Submit button opens share flow
- [ ] Challenge gallery shows recent submissions (localStorage)

---

## Final Checklist Before Launch

- [ ] All pages pass this QA checklist
- [ ] All docs written and current
- [ ] robots.txt live
- [ ] sitemap.xml live
- [ ] Schema markup on all pages validated (Google Rich Results Test)
- [ ] OG tags tested with social media debuggers
- [ ] Fonts load asynchronously
- [ ] Zero console errors across all pages
- [ ] replit.md updated with Phase 3 features
- [ ] All nav menus include ASMR + Playlist links
- [ ] Social media accounts set up with ChromaFlora branding
- [ ] Launch content scheduled or ready to post
- [ ] Pricing page / upgrade modal implemented
