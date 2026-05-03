# ChromaFlora Design System v5.0
**Creator:** Jennipher Troup — girlwithstarryeyes@outlook.com · @halcyonminx

A cosmic bioluminescent design system and portfolio — pure HTML/CSS/JS, no external images, all procedural Canvas 2D + CSS.

## Server
`python3 -m http.server 8000 --directory public`

## Pages (20 total)
| File | Purpose |
|------|---------|
| `index.html` | Main landing — 18-tile live gallery (each tile → project page), hero, stats |
| `projects.html` | Void drift project portfolio with theme-physics cards |
| `player.html` | **ChromaSynth v2** — harmonic partial synthesis, 4 visualizer modes (spectrum/oscilloscope/Lissajous/harmonograph), 9 modal scales, spatial audio, tuning systems |
| `studio.html` | Art Studio — layered canvas + 12 style presets + paint pour + remix + **sacred geometry overlays** (Flower of Life, Metatron's Cube, Phi Grid, Vesica Piscis) + **Spirograph/Harmonograph draw tools** + **physical export panel** |
| `plotter.html` | Plotter Studio — digital-to-physical: Spirograph/Harmonograph/Lissajous/Sacred Geo pattern gen, SVG export (AxiDraw), GCode (.nc), TurtleToy script |
| `ai-studio.html` | **NEW — AI Studio** — HuggingFace Inference API (image+audio), Leonardo.ai API, Replicate API (ComfyUI/SDXL), SoundCloud embed, HF Spaces directory, pipeline builder, local gallery |
| `band.html` | **NEW — Band Manager** — band/artist profiles, track library, stem upload (IndexedDB binary storage), SoundCloud integration, AI-generated stems library |
| `tokens.html` | Design token browser |
| `components.html` | Interactive component lab |
| `blog.html` | Blog — fractal image grid, scroll reveal, search, expandable articles |
| `about.html` | About — Jennipher Troup, socials, services |
| `gallery.html` | Creator gallery — upvotes, comments, remix, trending, featured creators |
| `profile.html` | Creator profile — avatar, stats, artworks, songs, bio edit |
| `marketplace.html` | Marketplace — asset packs (4), commission board, NFT callout |
| `challenges.html` | Challenges + leaderboard — 4 challenges, entry system, ranked creators |
| `admin.html` | Password-protected CMS dashboard |
| `project.html` | Individual project detail — live canvas, specs, **embed variant system** (orientation 16:9/9:16/1:1/4:3/21:9 · size 400/600/800/full · color original/dark/light/mono/neon · 7 code formats: HTML/React/Vue/Svelte/Web Component/Next.js/Vanilla JS) |
| `swirl-generator.html` | Procedural swirl art generator |

## Core JS
| File | Purpose |
|------|---------|
| `effects.js` | 18 canvas effect renderers + hover/click interactions |
| `drawer.js` | Global interaction system (Drawer, Modal, Dropdown, PageTransitions, MicroInteractions) |
| `player-bar.js` | Persistent cross-page music player bar (fixed bottom, all pages except player.html) |

## Key Feature Systems

### 🎵 ChromaSynth v2 Audio Engine (player.html)
- **Harmonic synthesis**: Each voice built from up to 8 sine-wave partials (Fourier overtone series)
- **Partial presets**: Pure Sine, Warm Tape, Sawtooth, Square, Brass, String, Bell, Organ
- **9 modal scales**: Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, Pentatonic, Whole Tone
- **Tuning systems**: Equal Temperament, Just Intonation, Pythagorean, Quarter-comma Meantone
- **Root note selection**: All 12 chromatic root notes, transposable at runtime
- **Chord types**: Triads, 7th Chords, 9th Chords, Sus2, Sus4
- **Spatial audio**: StereoPannerNode with adjustable width per voice
- **4 Visualizer modes**: Spectrum (FFT bars), Oscilloscope (waveform), Lissajous (stereo phase, ChannelSplitter), Harmonograph (damped oscillation math)
- **Harmonograph parameters**: Freq ratio X/Y, phase offset, damping — render to canvas
- **FX chain**: Reverb (ConvolverNode), Delay (DelayNode + feedback), Saturation (WaveShaperNode), Bass Boost (BiquadFilter), Hi-Pass, Compressor (DynamicsCompressor)
- **ADSR**: Attack and Release controls per voice

### ✦ Math & Sacred Geometry Tools (studio.html + plotter.html)
- **Sacred geometry overlays** (non-destructive canvas layer): Phi Grid (golden ratio), Fibonacci spiral, Flower of Life, Metatron's Cube, Vesica Piscis, Seed of Life
- **Spirograph drawing tool**: Hypotrochoid curves from R/r/d parameters, click+drag to place on canvas
- **Harmonograph drawing tool**: Damped pendulum oscillation, freq ratio + phase + damping controls
- **Plotter preview mode**: Grayscale + high contrast filter for pen plotter visualization
- **Physical Export** (Pro-locked): SVG (AxiDraw-ready, mm dimensions), GCode (.nc with G0/G1 and Z-lift), TurtleToy script

### ⊡ Plotter Studio (plotter.html)
- 8 generative pattern types: Spirograph, Harmonograph, Lissajous, Sacred Geo, Penrose Tiling*, Flow Field*, Fractal Fern*, Voronoi* (*Pro)
- Paper size templates: A4, A3, Letter, Square, Custom mm
- Machine configs: AxiDraw V3/SE, EggBot, WaterColorBot, Generic GRBL, Jubilee
- Export: SVG (AxiDraw-ready), GCode (.nc), TurtleToy JavaScript
- Integrations: AxiDraw, EvilMadScientist, TurtleToy, Canva (soon), Figma (soon)

### 🖼 Embed Variant System (project.html)
- **Orientation**: 16:9, 9:16 Portrait, 1:1 Square, 4:3, 21:9 Ultrawide
- **Size presets**: 400px, 600px, 800px, Full Width
- **Color themes**: Original, Dark (+overlay), Light (+overlay), Mono, Neon+
- **7 code formats**: HTML, React (hooks), Vue 3 (composition API), Svelte, Web Component (`<chroma-flora>`), Next.js (TypeScript, SSR-safe), Vanilla JS (ESM)

### 🌐 Gallery Tile Navigation (index.html)
- All 18 gallery tiles are click-navigable to their project pages (`project.html?id=X`)
- Hover reveals "View Project →" chip with purple accent
- data-effect mapped to PROJECTS data object

### ✦ 12 ChromaFlora Art Style Presets (studio.html)
Unique procedural styles — each renders with pure Canvas 2D:
1. Void Crystal — geometric crystal spikes, cyan/indigo
2. Nebula Flow — flowing color ribbons, cosmic depth
3. Acid Pour — neon cell-drip fluid art
4. Biolume Tide — glowing deep-sea organisms + tendrils
5. Cosmic Mandala — symmetric petal rings, gold/purple
6. Plasma Storm — electric arc lightning network
7. Cherry Data — delicate floral + data grid overlay
8. Dark Matter — point-network graph topology
9. Neon Garden — neon stem + bloom flowers
10. Space Rift — fractal void crack + starfield
11. Electric Coral — branching recursive coral fractals
12. Chrome Dreams — spiral vortex with chrome sheen

### 🔍 Semantic Prompt Parser (studio.html)
- Analyzes free-text prompt input in real-time (600ms debounce)
- Extracts style/color/shape/material keywords from natural language
- Auto-updates prompt builder dropdowns to match detected intent
- Shows detected concept tags below the input field

### ♥ Gallery Social Features (gallery.html)
- **Upvotes**: heart button per artwork/song (localStorage `cf_upvotes`, `cf_my_upvotes`)
- **Comments**: per-artwork comment thread modal (localStorage `cf_comments`)
- **Remix**: opens studio with artwork loaded onto active layer + prompt pre-filled
- **Sort**: Newest / Trending (by upvotes) / Featured
- **Featured creators strip**: auto-generated from most active users
- **Artist profiles**: click @username → profile.html

### 👤 Creator Profiles (profile.html)
- URL: `profile.html?u=username`
- Procedural avatar canvas (gradient + mandala rings + initial)
- Spinning avatar ring animation
- Stats: artworks count, songs count, total upvotes received
- Editable bio (localStorage `cf_bios`)
- Grid of all their artworks + songs with play controls

### 🛒 Marketplace (marketplace.html)
- 4 asset packs with procedural canvas thumbnails (1 free, 3 pro)
- Commission board: post requests, view open commissions, respond via email
- NFT minting callout — mailto early access
- All commission data in localStorage `cf_commissions`

### 🏆 Challenges (challenges.html)
- 4 challenges: Bioluminescent Depths, Void Crystal Formation, First Drop NFT Collection, Acid Pour Collab
- Entry submission modal → stored in localStorage `cf_challenge_entries`
- Leaderboard: top 10 creators ranked by score (upvotes + art×2 + songs×3)
- Seeds with default creators when no local data
- Procedural thumbnail for each challenge

### 🔒 Premium Tier UX
- "Batch (3×)" and "Animate" buttons locked with overlay in studio
- Click lock → ChromaFlora Pro modal with 8 pro features listed
- Upgrade modal links to girlwithstarryeyes@outlook.com for early access
- window.showProModal() available globally

### 🎵 Persistent Music Player (player-bar.js)
- Fixed 62px bottom bar on every page, auto-hides on player.html
- 7 genres: Lofi (75), Ambient (50), R&B (92), Techno (132), Jazz (115), House (128), Liquid Dub (172 BPM)
- State: localStorage `cf_player`; exposes `window.CFPlayer`

### 🎨 Projects Theme Physics (projects.html)
Each void-drift card gets theme-specific overlay canvas (orbs/drips/sparks/orbiters/bubbles/shards/stars/bloom) on hover, particle burst on click.

## Phase 2b — Completed (May 2026)

### Three.js WebGL Particle Layer (studio.html)
- `<canvas id="cf-webgl">` layered above 2D canvas, `pointer-events:none`, `z-index:8`, `mix-blend-mode:screen`
- 3000 particles distributed in a flattened torus, colored by ChromaFlora token palette
- `THREE.AdditiveBlending` = bioluminescent glow without postprocessing pipeline
- Breathing opacity (0.45–0.70) at ~1Hz simulates living system
- Particles dim to 15% opacity while user draws (restores on pointer-up)
- Graceful CDN fallback — if Three.js fails to load, WebGL canvas hidden, no error
- Cmd/Ctrl+S saves canvas to `cf_studio_art` localStorage + aurora flash

### Web Worker — Mandala Math (mandala-math.worker.js)
- `public/mandala-math.worker.js` — offloads supplementary point computation from main thread
- Protocol: `postMessage({type:'compute', ...params})` → receives `Float32Array` of (x,y,r,g,b,a) tuples
- Computes additional dot field layer using simplex noise FBM + polar math
- Integrated with progressive enhancement: if Worker fails, main-thread render continues unaffected
- Worker layer only fires during animation (anim|spin|pulse) to avoid redundant computation

### Canvas DPR Scaling (mandala.html)
- `sizeCanvas()` now applies `window.devicePixelRatio` scaling to both mandala and glow canvases
- CSS size clamped to logical pixels; physical canvas = W×dpr, H×dpr — eliminates retina blurriness

### Aurora Save Feedback (mandala.html, studio.html)
- `triggerAurora()` / `triggerAuroraCF()`: radial burst of all 6 token colors, 900ms ease-out
- Fires on: Cmd+S, save-to-gallery button click, any explicit save action

### Keyboard Shortcuts (mandala.html, studio.html)
- `Cmd/Ctrl+S` → save + aurora flash (all pages)
- `Escape` → stop animation (mandala.html)
- `R` → reset (mandala.html, without modifier)

### Phase 2b Documentation (public/docs/)
| File | Content | Lines |
|------|---------|-------|
| `phase2b-socratic.md` | 20 Qs × 4 domains (Design/UX/IxD/HiFi) + RE questions | ~450 |
| `phase2b-engineering.md` | Blueprints, schematics, ASCII wireframes, parameter tables, signal flows | ~420 |
| `phase2b-social-strategy.md` | Platform strategy, content pillars, GEO/SEO, schema markup, podcast bible | ~380 |
| `phase2b-qa.md` | 150+ QA checklist items across 12 sections | ~300 |

### Phase 2b Skills (.agents/skills/)
| Skill | Purpose |
|-------|---------|
| `chromaflora-social-strategy` | Social media strategy, GEO/SEO, schema markup, podcast framework |
| `chromaflora-engineering-patterns` | Web Worker, Three.js, DPR scaling, LERP, aurora, localStorage patterns |

### API Key Direct Links (FREE, no key required)
- Pollinations.ai image + text: https://pollinations.ai — zero signup, used in ai-studio.html
- Wikipedia REST: https://en.wikipedia.org/api/rest_v1/ — no key
- Web Speech API: browser-native, no key

### API Key Direct Links (free tier with registration)
| Service | Direct Link |
|---------|-------------|
| HuggingFace | https://huggingface.co/settings/tokens |
| NASA APOD | https://api.nasa.gov/ |
| Google Gemini | https://aistudio.google.com/app/apikey |
| ElevenLabs TTS | https://elevenlabs.io/app/settings/api-keys |
| Leonardo.ai | https://app.leonardo.ai/settings/api-keys |
| Stability AI | https://platform.stability.ai/account/keys |
| Replicate | https://replicate.com/account/api-tokens |
| OpenRouter | https://openrouter.ai/keys |
| Freesound audio | https://freesound.org/apiv2/apply/ |
| Pexels images | https://www.pexels.com/api/ |
| Unsplash images | https://unsplash.com/developers |
| Last.fm music | https://www.last.fm/api/account/create |
| Spotify Web API | https://developer.spotify.com/dashboard |
| Grok / xAI | https://console.x.ai/ |
| OpenAI | https://platform.openai.com/api-keys |
| Anthropic Claude | https://console.anthropic.com/settings/keys |

## Design Tokens (Canonical)
```css
--void:     #04040f   /* cosmic background — additive light not pigment */
--iris:     #a855f7   /* primary / loading / active states */
--aqua:     #22d3d8   /* sequencer playhead / success / secondary active */
--bloom:    #ec4899   /* error / warning / danger (cosmic aposematism) */
--ember:    #f97316   /* warm accent / heat / energy */
--viridian: #10b981   /* success / growth / organic */
```
Semantic layer:
```css
--token-success:   var(--viridian)
--token-error:     var(--bloom)
--token-loading:   var(--iris)
--token-active:    var(--aqua)
--token-inactive:  rgba(168,85,247,0.3)
--token-hover:     rgba(34,211,216,0.15)
```
Timing:
- `--t-snap: 0.1s cubic-bezier(0.4,0,0.2,1)` — 100ms micro-interactions
- `--t-spring: 0.4s cubic-bezier(0.34,1.56,0.64,1)` — spring bounce
- Micro (hover/click): 100–200ms · State transition: 250–400ms · Ambient: 2000–8000ms

## IMPORTANT CONVENTIONS
- Nav class: `nl` on band.html ONLY; `nav-link` on all other pages
- localStorage prefix: `cf_` on all keys
- No hardcoded hex values in CSS — always `var(--token)`
- Never white backgrounds — always `var(--void)` (#04040f)
- All canvas pages must apply DPR scaling (see chromaflora-engineering-patterns skill)
- Screenshot tool tries port 5000 — site runs port 8000 — screenshots fail via tool; user verifies in preview

## localStorage Keys
| Key | Content |
|-----|---------|
| `cf_player` | `{genreIdx, isPlaying, volume, isMuted, bpmOffset}` |
| `cf_artworks` | `[{id, username, prompt, dataUrl, timestamp}]` |
| `cf_songs` | `[{id, nickname, title, genre, bpm, tags, timestamp}]` |
| `cf_upvotes` | `{artworkId: count}` |
| `cf_my_upvotes` | `[id, ...]` (current user's upvotes) |
| `cf_comments` | `{artworkId: [{user, text, timestamp}]}` |
| `cf_bios` | `{username: bioText}` |
| `cf_subscribers` | `["email@example.com", ...]` |
| `cf_blog_posts` | `[{id, title, cat, read, excerpt, body, tags, date, ...}]` |
| `cf_admin_creds` | `{user, pass}` |
| `cf_commissions` | `[{user, desc, style, budget, timestamp}]` |
| `cf_challenge_entries` | `[{challengeId, user, link, notes, timestamp}]` |
| `cf_featured` | `[id, ...]` (admin-featured artwork IDs) |
