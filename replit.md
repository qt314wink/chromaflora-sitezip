# ChromaFlora Design System v5.0
**Creator:** Jennipher Troup — jennipher@melodicbloom.com · @halcyonminx

A cosmic bioluminescent design system and portfolio — pure HTML/CSS/JS, no external images, all procedural Canvas 2D + CSS.

## Server
`python3 -m http.server 8000 --directory public`

## Phase 3 — Current Active Pages (8 core modules)

| File | Purpose |
|------|---------|
| `studio.html` | Art Studio — layered canvas + paint pour physics + sacred geometry overlays + Three.js WebGL bioluminescent particle field |
| `mandala.html` | Mandala Studio — real-time polar math, simplex noise, Rose Curves, Spirograph, Lissajous, Sacred Geometry, Toroid. Web Worker offload, DPR scaling |
| `sonic-waves.html` | Sonic Waves — oscilloscope, harmonic synthesizer, spectrum analyzer, Lissajous display. Web Audio API |
| `band.html` | Band Studio — 8-track step sequencer, Bjorklund Euclidean rhythm algorithm, logistic map chaos, human groove, pattern memory A/B/C/D |
| `ai-studio.html` | AI Studio — Pollinations.ai image generation (free, no API key), Reverse Image Engineering |
| `discovery.html` | Discovery Engine — 24 inquiry cards × 9 territories, anti-echo weighting, living preference model, mystery questions |
| `asmr.html` | ASMR Module — binaural beat engine (Web Audio API), Solfeggio presets, sleep timer, slow mandala visual |
| `playlist.html` | Playlist Hub — Circle of Fifths/Fourths, harmonic scale browser, interval math, playlist manager, audio synesthesia |
| `embed.html` | Embed Generator — iframe builder for mandala/waves/sequencer/particles with URL params |

## Additional Pages (legacy / extended system)
| File | Purpose |
|------|---------|
| `index.html` | Main landing — 18-tile live gallery |
| `projects.html` | Void drift project portfolio |
| `player.html` | ChromaSynth v2 — harmonic synthesis, 4 visualizer modes |
| `plotter.html` | Plotter Studio — SVG/GCode export for AxiDraw |
| `tokens.html` | Design token browser |
| `components.html` | Interactive component lab |
| `blog.html` | Blog — fractal image grid, expandable articles |
| `about.html` | About — Jennipher Troup, socials, services |
| `gallery.html` | Creator gallery — upvotes, comments, remix |
| `profile.html` | Creator profile |
| `marketplace.html` | Asset packs, commission board |
| `challenges.html` | Community challenges + leaderboard |

## Phase 3 Documentation (public/docs/)
| File | Purpose |
|------|---------|
| `phase3-optimized-prompt.md` | Prompt engineering framework, taxonomy, params, heuristics, variables |
| `phase3-competitive-analysis.md` | Full competitive landscape, ICP, feature matrix, market sizing |
| `phase3-monetization.md` | 4-tier pricing (Free/Creator Pro $19/Studio Pro $49/Agency $199) + checkout flows |
| `phase3-brand.md` | Brand manifesto, about me copy (short/medium/long), taglines, brand voice |
| `phase3-image-prompts.md` | 9 art styles × 3 prompts each, Pollinations model guide |
| `phase3-social-launch.md` | Launch sequence, TikTok scripts, Twitter thread, LinkedIn post, podcast script |
| `phase3-seo-audit.md` | Page-by-page SEO spec, schema templates, GEO strategy, robots.txt/sitemap spec |
| `phase3-qa-master.md` | Master QA checklist — all 8 modules × all feature + edge cases |
| `phase3-competitive-analysis.md` | Competitive analysis — 4 quadrants, 20+ competitors |

## Infrastructure
| File | Purpose |
|------|---------|
| `robots.txt` | Allow GPTBot/PerplexityBot/Googlebot, block CCBot, sitemap link |
| `sitemap.xml` | 9 URLs, weekly changefreq |

## SEO Status (Phase 3)
All 8 core module pages now have:
- ✅ `<html lang="en">`
- ✅ Unique `<title>` per page
- ✅ Unique `<meta name="description">` per page (140–160 chars)
- ✅ `<link rel="canonical">`
- ✅ Full OG tags (og:title, og:description, og:url, og:type, og:site_name)
- ✅ Twitter card meta tags
- ✅ `<meta name="theme-color" content="#04040f">`
- ✅ JSON-LD WebApplication schema (+ FAQPage on band.html, ai-studio.html, discovery.html, asmr.html)
- ✅ `<link rel="preconnect">` for Google Fonts

## Nav Convention (v5.0 — Unified)
Every page (all 25 HTML files) has navigation. Two patterns:

**Pattern A — Core modules (studio, mandala, sonic-waves, band, ai-studio, discovery, asmr, playlist)**
- Cross-link each other only (8 links: Studio, Mandala, Waves, Band, AI Studio, Discover, ASMR, Playlist)
- No logo or System link in the bar — immersive experience
- Classes vary by file: `.nav-link`, `.nl`, or `.cf-nav a`
- `band/ai-studio/discovery` use `.nav-links` wrapper div

**Pattern B — Legacy/tool/community pages (index, projects, about, blog, gallery, challenges, marketplace, profile, player, tokens, components, plotter, project, swirl-generator, beats-boxes, hidden-order, embed, admin)**
- Always: `System` link + all 8 core module links + current page active
- Logo/home link present
- `admin.html` is a special dashboard (top-bar only, no cross-links)

**Pattern C — Homepage (index.html)**
- v5.0 branded nav with two dropdowns: "Modules" (8 core + embed + player) and "Pages" (community + tools)
- Plus flat links: System · Projects · About
- Full nav drawer (left) with all modules, utilities, and community pages

## Design Tokens (Canonical)
```css
--void:     #04040f   /* cosmic background — additive light not pigment */
--iris:     #a855f7   /* primary / loading / active states */
--aqua:     #22d3d8   /* sequencer playhead / success / secondary active */
--bloom:    #ec4899   /* error / warning / danger (cosmic aposematism) */
--ember:    #f97316   /* warm accent / heat / energy */
--viridian: #10b981   /* success / growth / organic */
```
Timing:
- `--t-snap: 0.1s cubic-bezier(0.4,0,0.2,1)` — micro-interactions
- `--t-spring: 0.4s cubic-bezier(0.34,1.56,0.64,1)` — spring bounce

## localStorage Keys (Phase 3)
| Key | Content |
|-----|---------|
| `cf_preference_model` | Living system model — tracks ASMR freq/beat, discovery category opens/saves, playlist visits, session timing |
| `cf_asmr_stats` | `{sessions, minutes, freqs: {hz: count}}` |
| `cf_playlist` | `[{id, title, artist, url, key, mode, bpm, notes}]` |
| `cf_discovery_notebook` | `[{id, title, savedAt}]` |
| `cf_mystery_guesses` | Last 8 mystery game guesses |
| `cf_artworks` | `[{id, username, prompt, dataUrl, timestamp}]` |
| `cf_songs` | `[{id, nickname, title, genre, bpm, tags, timestamp}]` |
| `cf_upvotes` | `{artworkId: count}` |
| `cf_comments` | `{artworkId: [{user, text, timestamp}]}` |
| `cf_player` | `{genreIdx, isPlaying, volume, isMuted, bpmOffset}` |
| `cf_blog_posts` | Blog content |
| `cf_commissions` | Commission board entries |
| `cf_challenge_entries` | Challenge submissions |

## Living System Intelligence (Phase 3)
`cf_preference_model` is written by:
- `asmr.html` → records base frequency, beat frequency, session count
- `playlist.html` → records visit count
- `discovery.html` → records category opens, saves, last explored card
  - `renderBaitGrid()` uses model to weight least-explored categories higher (anti-echo)
  - `surpriseMe()` picks a card from the least-explored territory

## Embed System (embed.html)
URL params:
- `type=mandala|waves|sequencer|particles` — module to render
- `color=iris|aqua|bloom|ember|viridian` — primary color token
- `folds=4|6|8|10|12` — mandala fold count
- `speed=0.2|0.5|1|2` — animation speed multiplier
- `seed=N` — deterministic random seed
- `hide` — hide the bottom UI bar
No type param → shows the Embed Generator UI

## Core JS (Legacy)
| File | Purpose |
|------|---------|
| `effects.js` | 18 canvas effect renderers |
| `drawer.js` | Global interaction system |
| `player-bar.js` | Persistent cross-page music player bar |

## Key Features (Phase 2b, still active)

### Three.js WebGL Particle Layer (studio.html)
- 3000 particles, ChromaFlora token palette, `THREE.AdditiveBlending`
- Breathing opacity (0.45–0.70), dims while drawing

### Web Worker — Mandala Math (mandala-math.worker.js)
- Offloads supplementary point computation from main thread
- Protocol: `postMessage({type:'compute', ...params})` → `Float32Array`

### Bjorklund Algorithm (band.html)
- Euclidean rhythm generation: E(k,n)
- Originally: nuclear reactor fuel rod placement (Bjorklund 1982)
- Musicological application: Toussaint 2005 — underlies most world music rhythms

### Pollinations.ai (ai-studio.html)
- Free image generation, no API key required
- Base URL: `https://image.pollinations.ai/prompt/{encoded_prompt}`
- Models: flux, flux-realism, flux-anime, flux-3d, any-dark, turbo

### ASMR Binaural Engine (asmr.html)
- Left oscillator = base frequency (Solfeggio: 432/396/417/528/639/741/852/963 Hz)
- Right oscillator = base + beat offset (1.5/4/7/10/14/20/40 Hz)
- AudioContext created only after user gesture (autoplay policy compliance)
- Smooth fade in (adjustable 1-30s) and fade out

### Circle of Fifths (playlist.html)
- Canvas 2D rendering, 12 outer (major) + 12 inner (relative minor) keys
- Click to select key → shows scale notes + compatible keys
- Color-mapped to ChromaFlora token palette

## IMPORTANT CONVENTIONS
- localStorage prefix: `cf_` on ALL keys without exception
- Background always `--void` (#04040f) — never white
- Six token colors only: iris/aqua/bloom/ember/viridian + void
- Two fonts only: Inter (UI) + JetBrains Mono (data/code)
- All canvas pages: DPR scaling applied
- No hardcoded hex values in CSS — always `var(--token-name)`
- Screenshot tool targets port 5000, site runs port 8000 — user verifies in preview pane
- AudioContext always created after user gesture (Web Audio autoplay policy)
- CDN stack: Tone.js (tone@14), Three.js (0.162), Google Fonts
