# ChromaFlora v5.0 — Master Documentation

**Author:** Jennipher Troup (@halcyonminx)
**Version:** 5.0.0
**Last Updated:** May 2026
**Status:** Living Document · Active Development

---

## Table of Contents

1. [Vision & Philosophy](#1-vision--philosophy)
2. [Socratic Inquiry — 20 Questions](#2-socratic-inquiry--20-questions)
3. [Site Architecture & Content Map](#3-site-architecture--content-map)
4. [Products For Sale](#4-products-for-sale)
5. [Design System & Tokens](#5-design-system--tokens)
6. [Technology Stack](#6-technology-stack)
7. [Database Schema](#7-database-schema)
8. [API Integrations & Keys Required](#8-api-integrations--keys-required)
9. [Feature Modules — Complete Spec](#9-feature-modules--complete-spec)
10. [Discovery Engine](#10-discovery-engine)
11. [Reverse Image Engineering](#11-reverse-image-engineering)
12. [LLM Ingestion Flow](#12-llm-ingestion-flow)
13. [Community & Gamification](#13-community--gamification)
14. [Taxonomy & Heuristics](#14-taxonomy--heuristics)
15. [Scalability & Requirements](#15-scalability--requirements)
16. [Social Media Integration](#16-social-media-integration)
17. [Agency Building & Social Impact](#17-agency-building--social-impact)
18. [Navigation & UX Philosophy](#18-navigation--ux-philosophy)
19. [Execution Roadmap](#19-execution-roadmap)
20. [QA Checklist — Phase 2](#20-qa-checklist--phase-2)

---

## 1. Vision & Philosophy

ChromaFlora is a cosmic bioluminescent design system, creative studio, and curiosity engine built by Jennipher Troup. It is simultaneously:

- A **personal design system** (tokens, components, generative patterns)
- A **creative studio** (mandala, sonic waves, band sequencer, AI image generation)
- A **discovery engine** (anti-feedback-loop exploration across philosophy, ecology, engineering, culture)
- A **community platform** (mystery questions, community board, shared notebooks)
- A **product platform** (design system licenses, templates, workshops, consulting)
- A **social practice** (posts, documentation, teaching, agency building)

### Core Design Tenets

1. **Beauty as infrastructure** — the aesthetic is not decoration, it is the system
2. **Anti-optimization** — the discovery engine is explicitly designed to resist engagement loops
3. **Generative over static** — everywhere possible, math produces the image rather than an image file
4. **Locality first** — localStorage, no backend required, all state in the browser
5. **Cosmic bioluminescence** — every visual decision serves this singular aesthetic truth

### Color System

| Token | Value | Usage |
|---|---|---|
| `--void` | `#04040f` | Background — near-black cosmic base |
| `--iris` | `#a855f7` | Primary — violet/purple energy |
| `--aqua` | `#22d3d8` | Secondary — teal/cyan light |
| `--bloom` | `#ec4899` | Accent — hot pink bioluminescent |
| `--ember` | `#f97316` | Warm accent — orange energy |
| `--viridian` | `#10b981` | Growth accent — green life |

---

## 2. Socratic Inquiry — 20 Questions

These questions map the creative and strategic territory of ChromaFlora. They are not rhetorical — each one opens a field of work.

**Q1. What does it mean to design a system that learns the user without tracking them?**
The Discovery Engine must use local behavioral signals (which cards opened, how long spent, what was saved) to push against known preferences — not to optimize toward them. Anti-engagement-loop design is a technical challenge, not just a philosophy.

**Q2. How do we reverse-engineer the generative grammar of a visual style from a single image?**
The Reverse Image Engineering module attempts this. The challenge: most images are over-determined (many possible grammars) and under-specified (ambiguous at the token level). The answer may be probabilistic: a distribution over grammars, not a single one.

**Q3. What is the minimum viable information structure for a design system to be teachable?**
ChromaFlora's design system must be learnable by others, not just usable by Jennipher. This requires explicit taxonomy, documented heuristics, and educational materials — not just a token file.

**Q4. How do you build a community around anti-consensus thinking?**
The community mystery question mechanic inverts consensus: instead of "what is the right answer?" it asks "what is the right question?" This reframes community participation around inquiry, not opinion.

**Q5. What would a sequencer look like if it was designed for a designer, not a musician?**
The Tone.js sequencer in band.html prioritizes visual rhythm, generative pattern logic, and color-coded tracks over traditional DAW conventions. The design question: should it feel more like a pattern canvas than an instrument?

**Q6. How do we make the LLM interaction feel like discovery rather than query?**
The LLM flow (what question is this?) inverts the typical AI interaction. Instead of asking a question and getting an answer, the user presents something they don't have a name for — and the AI names it. This requires prompt engineering that produces contextual framing, not definitions.

**Q7. What is the relationship between mathematical pattern generation and cultural meaning?**
The mandala studio generates patterns from polar math. The question is whether meaning follows automatically from beautiful math, or whether cultural context must be explicitly layered. Both are true, and the interface should acknowledge this tension.

**Q8. How do you design educational experiences that respect the learner's existing expertise?**
The agency-building framework must handle diverse entry points — beginners, practitioners, experts — without condescending to any. ZPD (Zone of Proximal Development) design: always one step ahead of where the user currently is.

**Q9. What does a "reading experience that reads you back" actually mean technically?**
This implies biometric or behavioral sensing (scroll speed, dwell time, re-reading patterns) feeding back into content presentation. Without a backend, this must be done through local timing signals and explicit user input.

**Q10. How do we build a podcast generation system without a recording studio?**
The discovery engine's podcast output uses text-to-speech synthesis (HuggingFace TTS models) to generate listenable mini-podcasts from the structured reports. This requires: TTS API, content structuring, audio stitching, and a player interface.

**Q11. What is the right taxonomy for classifying creative inputs that are deliberately undefined?**
The LLM ingestion flow accepts "messy, uncoordinated, undefined" inputs from multiple users. The taxonomy of what's missing — what types of ingestion are needed to complete the picture — is itself a design artifact that the LLM produces.

**Q12. How do we make the bidirectional sensory-to-image lookup feel natural rather than gimmicky?**
"Something that smells like citrus and glows like the sun" must return plausible visual results through semantic bridging — not keyword matching. This is a semantic embedding problem: the input description and the visual description must occupy the same latent space.

**Q13. What does gamification look like when the prize is insight rather than points?**
The gamification loop (curiosity → exploration → breadcrumb → challenge → query → suggestion → feedback → transformation → iteration → puzzle → prize) produces understanding, not rewards. The "prize" is the moment of genuine surprise — the unexpected connection.

**Q14. How do you design for the anti-feedback loop without it feeling punishing?**
The Discovery Engine must feel pleasurable, not corrective. The bait must be genuinely enticing — the unfamiliar territory must feel like adventure, not homework. This is a tone and curation challenge, not a mechanism one.

**Q15. What is the relationship between the Bjorklund algorithm and musical meaning?**
Euclidean rhythms (from the Bjorklund algorithm implemented in the sequencer) appear across global music traditions. They are mathematically optimal in some sense — maximally distributed. But why do we find them compelling? This is the question of mathematical aesthetics.

**Q16. How do we handle the design of a system that is both a portfolio and a product?**
ChromaFlora serves as Jennipher's portfolio (demonstrating design and engineering capability), her product (sellable templates and tools), and her community (people who share her interests). These three functions have different, sometimes conflicting, design requirements.

**Q17. What does "reverse prompt engineering" produce that forward prompting cannot?**
Forward prompting starts with an intention. Reverse prompt engineering starts with an artifact and works backward to the intention space. The output is a probability distribution over possible intentions — much richer than any single prompt could specify.

**Q18. How does Three.js WebGL change what's possible in a browser-based design studio?**
Three.js enables: hardware-accelerated 3D rendering, shader-based visual effects, particle systems at scale, and real-time physics simulation. The studio's WebGL layer will make the canvas capable of effects previously only available in native applications.

**Q19. What is the social impact of a design system that is explicitly anti-algorithmic?**
ChromaFlora's anti-feedback-loop commitment is a political statement. In a world where engagement optimization is the dominant design paradigm, building systems that deliberately resist it is a form of activism. The social impact argument needs to be made explicit, not assumed.

**Q20. How do you sustain a solo creative practice that has the scope of a studio?**
ChromaFlora is one person's vision with studio-scale ambition. The answer involves: modular architecture (so it can grow in pieces), community leverage (so users contribute content and knowledge), AI augmentation (so one person can produce at scale), and product revenue (so it's financially sustainable).

---

## 3. Site Architecture & Content Map

### Current Pages

| Page | URL | Purpose | Status |
|---|---|---|---|
| Home/System | `/index.html` | Design system showcase, token reference | Live |
| Studio | `/studio.html` | WebGL canvas, layer system, tools | Live |
| Synth Player | `/player.html` | ChromaSynth v2, harmonic synthesis, genre modes | Live |
| Band Manager | `/band.html` | Band database, stems, sequencer | Live + Sequencer Added |
| AI Studio | `/ai-studio.html` | HuggingFace, Pollinations, image gen | Live + Pollinations Added |
| Mandala | `/mandala.html` | Interactive polar math pattern generator | Live |
| Sonic Waves | `/sonic-waves.html` | Oscilloscope, harmonic synthesizer | Live |
| Swirl Generator | `/swirl-generator.html` | Generative swirl canvas | Live |
| Discovery | `/discovery.html` | Anti-feedback-loop curiosity engine | Live |
| Projects | `/projects.html` | Project portfolio | Live |

### Planned Pages

| Page | URL | Purpose | Priority |
|---|---|---|---|
| Community Board | `/community.html` | Mystery questions, shared notebooks | High |
| Docs | `/docs/` | Educational documentation | High |
| Shop | `/shop.html` | Products for sale | Medium |
| About | `/about.html` | Jennipher's story, mission | Medium |
| LLM Oracle | `/oracle.html` | "What question is this?" interface | High |
| Dashboard | `/dashboard.html` | Personal stats, gallery, saved items | Medium |

### Content Strategy

**Primary content types:**
1. **Interactive modules** — things you do (generate, synthesize, explore)
2. **Discovery cards** — bait for unfamiliar territory
3. **Documentation** — how things work and why
4. **Community questions** — mystery questions and responses
5. **Generated assets** — images, audio, patterns you create and save

**Content principles:**
- Every page should be enterable from anywhere (rhizome, not tree)
- Every module should produce something saveable (output as artifact)
- Every concept should have a "what question is this?" hook
- Documentation should read like discovery, not instruction

---

## 4. Products For Sale

### Digital Products

| Product | Description | Price Range | Format |
|---|---|---|---|
| ChromaFlora Design Token Pack | Complete token set (CSS variables, Figma variables, Tailwind config) | $29–$49 | ZIP |
| Bioluminescent Icon Set | 200+ icons in the ChromaFlora aesthetic | $39–$69 | SVG/Figma |
| Mandala Pattern Library | 50 generated mandala patterns, various formats | $19–$39 | SVG/PNG |
| Sonic Waves Preset Pack | 20 synthesizer presets for the player | $14–$24 | JSON |
| ChromaSynth Template | Complete synthesizer starter (band.html + player.html base) | $79–$129 | HTML/JS |
| Discovery Engine License | White-label discovery engine for client use | $299–$499 | HTML/JS |

### Services

| Service | Description | Price Range |
|---|---|---|
| Design System Audit | Review client's design system against ChromaFlora principles | $500–$2000 |
| Generative Pattern Workshop | 2-hour workshop on algorithmic pattern design | $300–$800 |
| LLM Integration Consultation | Connect client projects to AI APIs using ChromaFlora patterns | $150/hr |
| Brand Bioluminescence | Apply ChromaFlora aesthetic to client brand | Project-based |

### Community / Membership

| Tier | Price | Benefits |
|---|---|---|
| Free | $0 | Full access to all public tools |
| Patron | $9/month | Early access, community board, monthly discovery drop |
| Studio | $29/month | All tools + templates + consultation hours |
| Agency | $99/month | White-label license + priority support |

---

## 5. Design System & Tokens

### Typography

```css
--font-display: 'Inter', sans-serif;  /* All text */
--font-mono: 'JetBrains Mono', monospace;  /* Code, labels, technical */

/* Scale */
--text-xs: 9px;
--text-sm: 11px;
--text-base: 13px;
--text-md: 14px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 22px;
--text-3xl: clamp(24px, 4vw, 36px);
--text-display: clamp(32px, 6vw, 58px);
```

### Spacing

8pt grid system. All spacing values are multiples of 4 or 8:
```
4px / 8px / 12px / 16px / 20px / 24px / 28px / 32px / 40px / 48px / 60px / 80px
```

### Border Radius Scale

```css
--radius-sm: 6px;    /* Buttons, chips, small elements */
--radius-md: 10px;   /* Inputs, minor cards */
--radius-lg: 14px;   /* Cards */
--radius-xl: 18px;   /* Large cards, canvases */
--radius-2xl: 24px;  /* Modals, lightboxes */
--radius-full: 99px; /* Pills, badges */
```

### Animation Tokens

```css
--t-snap: 0.12s cubic-bezier(0.4, 0, 0.2, 1);     /* Quick state changes */
--t-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* Springy entrances */
--t-ease: 0.25s cubic-bezier(0.4, 0, 0.2, 1);       /* Smooth transitions */
--t-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);        /* Dramatic reveals */
```

### Motion Physics (Spring System)

For all spring-based animations:
```
Stiffness: 200 (tight) → 120 (relaxed) → 60 (fluid)
Damping: 20 (snappy) → 15 (balanced) → 10 (bouncy)
Mass: 1.0 default
Initial velocity: 0 (or matched to gesture velocity)
```

---

## 6. Technology Stack

### Core (No Build Step Required)

| Layer | Technology | Rationale |
|---|---|---|
| Markup | HTML5 | Zero dependency, universal |
| Styling | CSS Custom Properties | Runtime theming, no preprocessor needed |
| Logic | Vanilla JavaScript (ES2020+) | No build step, direct DOM |
| Math | Canvas 2D API | Native, GPU-accelerated on modern browsers |
| 3D | Three.js (CDN) | WebGL without setup overhead |
| Audio | Web Audio API + Tone.js (CDN) | Native + high-level sequencing |
| Storage | localStorage / IndexedDB | Zero backend |
| Server | Python http.server | Zero-config static serving |

### External CDNs (No npm, No Build)

```html
<!-- Three.js (WebGL) -->
<script src="https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js" type="module">

<!-- Tone.js (Audio) -->
<script src="https://cdn.jsdelivr.net/npm/tone@14/build/Tone.js">

<!-- Inter + JetBrains Mono (Typography) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap">
```

### AI APIs (All via Fetch, No SDK)

| API | Auth | Cost | Use Case |
|---|---|---|---|
| HuggingFace Inference API | Bearer token | Free tier / pay-per-use | Image + audio generation |
| Pollinations.ai | None | Free, unlimited | Image generation (FLUX family) |
| Grok (xAI) | Bearer token | Pay-per-use | LLM text, "what question is this?" |
| Civitai | API key | Pay-per-use | Community models, LoRA |
| Leonardo.ai | API key | 150 tokens/day free | Image generation |
| Replicate | API token | Pay-per-use | SDXL, ComfyUI, video |

### Web Worker Architecture (Planned)

Heavy computation will move to Web Workers to prevent UI blocking:

```javascript
// Worker: mandala-math.worker.js
// Handles: simplex noise FBM, polar coordinate computation, spiral geometry
// Sends: Float32Array of points back to main thread
// Benefit: 60fps UI during complex pattern generation
```

---

## 7. Database Schema

ChromaFlora uses localStorage as its "database." All data is JSON-serialized. Below is the full schema for all stored objects.

### Namespace Conventions

All keys are prefixed: `cf_` + domain + `_` + identifier

---

### 7.1 Bands

```sql
-- Key: cf_bands (JSON array)
CREATE TABLE bands (
  id          TEXT PRIMARY KEY,        -- timestamp string
  name        TEXT NOT NULL,
  genre       TEXT,
  emoji       TEXT,                    -- Single emoji avatar
  members     TEXT,                    -- Comma-separated member names
  bio         TEXT,
  city        TEXT,
  year        INTEGER,                 -- Founded year
  label       TEXT,
  links       TEXT,                    -- Newline-separated URLs
  soundcloudUrl TEXT,
  soundcloudUsername TEXT,
  createdAt   TEXT NOT NULL            -- ISO 8601 datetime
);
```

### 7.2 Tracks

```sql
-- Key: cf_tracks_{bandId} (JSON array per band)
CREATE TABLE tracks (
  id          TEXT PRIMARY KEY,
  bandId      TEXT NOT NULL REFERENCES bands(id),
  title       TEXT NOT NULL,
  type        TEXT,                    -- 'original' | 'remix' | 'cover' | 'instrumental' | 'demo' | 'unreleased'
  bpm         INTEGER,
  key         TEXT,                    -- e.g. 'C Minor', 'F# Major'
  duration    TEXT,                    -- 'mm:ss' format
  year        INTEGER,
  tags        TEXT,                    -- JSON array of strings
  scUrl       TEXT,                    -- SoundCloud URL
  notes       TEXT,
  createdAt   TEXT NOT NULL
);
```

### 7.3 Stems

```sql
-- Stored in IndexedDB: cf_stems_db, store: stems
CREATE TABLE stems (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  bandId      TEXT NOT NULL,
  trackId     TEXT,
  name        TEXT NOT NULL,
  stemType    TEXT,                    -- 'kick' | 'snare' | 'bass' | 'melody' | 'pads' | 'lead' | 'fx' | 'full'
  fileName    TEXT,
  fileSize    INTEGER,                 -- bytes
  duration    REAL,                    -- seconds
  audioBlob   BLOB,                    -- stored as ArrayBuffer in IndexedDB
  createdAt   TEXT NOT NULL
);
```

### 7.4 AI Gallery

```sql
-- Key: cf_ai_gallery (JSON array)
CREATE TABLE ai_gallery (
  id          INTEGER PRIMARY KEY,     -- timestamp
  type        TEXT NOT NULL,           -- 'image' | 'audio'
  url         TEXT,                    -- blob URL or external URL
  prompt      TEXT,
  negPrompt   TEXT,
  model       TEXT,
  provider    TEXT,                    -- 'hf' | 'pollinations' | 'leonardo' | 'replicate'
  seed        INTEGER,
  width       INTEGER,
  height      INTEGER,
  steps       INTEGER,
  guidance    REAL,
  savedAt     TEXT NOT NULL
);
```

### 7.5 Mandala Gallery

```sql
-- Key: cf_mandala_gallery (JSON array)
CREATE TABLE mandala_gallery (
  id          INTEGER PRIMARY KEY,
  title       TEXT,
  thumbnail   TEXT,                    -- base64 PNG thumbnail
  params      TEXT,                    -- JSON of all slider values
  patternType TEXT,                    -- 'mandala' | 'rose' | 'spirograph' | 'lissajous' | 'sacred' | 'toroid'
  colorMode   TEXT,
  createdAt   TEXT NOT NULL
);
```

### 7.6 Sequencer Patterns

```sql
-- Key: cf_seq_pat_{0..3} (JSON 2D array per slot)
CREATE TABLE sequencer_patterns (
  slot        INTEGER PRIMARY KEY,     -- 0-3 (A, B, C, D)
  pattern     TEXT NOT NULL,           -- JSON: 8×32 boolean array
  bpm         INTEGER,
  swing       INTEGER,
  stepCount   INTEGER,
  savedAt     TEXT NOT NULL
);
```

### 7.7 API Keys

```sql
-- Keys: cf_api_{provider} — encrypted recommendation but stored as plain text
CREATE TABLE api_keys (
  provider    TEXT PRIMARY KEY,        -- 'hf' | 'leo' | 'replicate' | 'sc' | 'grok' | 'civitai'
  key         TEXT,                    -- User-supplied API key
  savedAt     TEXT
);
```

### 7.8 Discovery Notebook

```sql
-- Key: cf_discovery_notebook (JSON array)
CREATE TABLE discovery_notebook (
  id          INTEGER PRIMARY KEY,
  cardId      INTEGER NOT NULL,
  title       TEXT,
  notes       TEXT,
  tags        TEXT,                    -- JSON array
  savedAt     TEXT NOT NULL
);
```

### 7.9 Mystery Guesses

```sql
-- Key: cf_mystery_guesses (JSON array — local only)
CREATE TABLE mystery_guesses (
  user        TEXT DEFAULT 'You',
  text        TEXT NOT NULL,
  ts          INTEGER NOT NULL         -- timestamp ms
);
```

### 7.10 Reverse Image History

```sql
-- Key: cf_rev_history (JSON array)
CREATE TABLE reverse_image_history (
  id          INTEGER PRIMARY KEY,
  type        TEXT,                    -- detected image type
  thumb       TEXT,                    -- base64 thumbnail
  analysis    TEXT,                    -- JSON of extraction result
  createdAt   TEXT NOT NULL
);
```

### 7.11 User Preferences

```sql
-- Key: cf_prefs (JSON object)
CREATE TABLE user_preferences (
  theme         TEXT DEFAULT 'dark',
  discoveryFilters TEXT,              -- JSON array of active filters
  seenCards     TEXT,                 -- JSON array of card IDs seen
  savedPatterns INTEGER DEFAULT 0,
  totalGenerations INTEGER DEFAULT 0,
  lastVisited   TEXT,                 -- page name
  setupComplete BOOLEAN DEFAULT false
);
```

---

## 8. API Integrations & Keys Required

### Keys You Need to Provide

| API | Key Name | Where to Get | Cost | Priority |
|---|---|---|---|---|
| **HuggingFace** | `HF_TOKEN` | huggingface.co/settings/tokens | Free tier: 1000 req/day | HIGH — core image/audio gen |
| **Grok (xAI)** | `GROK_API_KEY` | console.x.ai | Pay-per-use, cheap | HIGH — LLM "what question is this?" |
| **Pollinations.ai** | None needed | Free, no key | Completely free | DONE — already integrated |
| **Replicate** | `REPLICATE_API_TOKEN` | replicate.com/account/api-tokens | Pay-per-use | MEDIUM — ComfyUI pipelines |
| **Leonardo.ai** | `LEONARDO_API_KEY` | app.leonardo.ai/api-access | 150 tokens/day free | LOW — alternative image gen |
| **Civitai** | `CIVITAI_API_KEY` | civitai.com/user/account | Free for public models | LOW — community LoRA models |

### How to Add Keys

In the AI Studio (ai-studio.html), click "API Keys" in the top right. Keys are stored in your browser's localStorage only — never sent to any server except the API you're calling directly.

### Pollinations.ai (Zero Config — Already Live)

```javascript
// No key needed. Usage:
const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt)
  + '?width=1024&height=1024&seed=42&model=flux&nologo=true';
// Just load the URL as an image src
```

### HuggingFace Inference API

```javascript
const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ inputs: prompt, parameters: { num_inference_steps: 30 } })
});
const imageBlob = await response.blob();
```

### Grok / xAI (for "What Question Is This?")

```javascript
const response = await fetch('https://api.x.ai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${GROK_API_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'grok-3',
    messages: [
      { role: 'system', content: CHROMAFLORA_ORACLE_SYSTEM_PROMPT },
      { role: 'user', content: userInput }
    ]
  })
});
```

---

## 9. Feature Modules — Complete Spec

### 9.1 ChromaSynth Player (player.html)

**Current:** Web Audio API, 9 modal scales, 7 genre modes, Lissajous visualizer, harmonic partials
**Phase 2:** Tone.js Transport integration for BPM-synced playback, pattern recording

**Architecture:**
- Raw Web Audio for synthesis chain (kick, bass, chord synthesis)
- Tone.js Transport for clock sync
- Analyser nodes feeding Canvas 2D visualizer
- LocalStorage for genre presets and user settings

### 9.2 Step Sequencer (band.html — Sequencer tab)

**Built:** 16-step × 8-track grid, Tone.js synths, Bjorklund Euclidean patterns, human groove, chaos (logistic map), random fill, swing, pattern memory (A/B/C/D slots), per-track mute

**Track Instruments:**
| Track | Tone.js Synth | Character |
|---|---|---|
| Kick | MembraneSynth | Sub punch, pitch decay |
| Snare | NoiseSynth (white) | Crisp transient |
| Hat | MetalSynth (high freq) | 16th note shimmer |
| Clap | NoiseSynth (pink) | Dry slap |
| Bass | MonoSynth (saw) | Filter envelope bass |
| Lead | Synth (square) | Melodic hook |
| Pad | PolySynth (sine) | Lush chord wash |
| Perc | MetalSynth (low freq) | Percussion texture |

### 9.3 Mandala Studio (mandala.html)

**Built:** 6 pattern types, simplex noise FBM, live math formula readout, 6 presets, PNG export, localStorage gallery

**Pattern Types:**
1. Mandala — radial symmetry with noise perturbation
2. Rose Curve — r = cos(k·θ) parametric polar
3. Spirograph — hypotrochoid/epitrochoid gear simulation
4. Lissajous — 2D harmonic oscillator
5. Sacred Geometry — Flower of Life, Metatron's Cube, Seed of Life
6. Toroid — perspective-projected torus wireframe

**Math Foundations:**
```
Rose: r = cos(k/n · θ) where k/n is the petal ratio
Spirograph: x = (R-r)cos(t) + d·cos((R-r)/r · t)
             y = (R-r)sin(t) - d·sin((R-r)/r · t)
Lissajous: x = A·sin(a·t + δ), y = B·sin(b·t)
Toroid: x = (R + r·cos(v))cos(u), y = (R + r·cos(v))sin(u), z = r·sin(v)
```

### 9.4 Sonic Waves (sonic-waves.html)

**Built:** 4 view modes (oscilloscope/spectrum/Lissajous/waterfall), 8 harmonics, ADSR, reverb/delay/LPF, live math formula

### 9.5 Studio (studio.html)

**Status:** Canvas layer system, ResizeObserver fixed
**Phase 2 (Planned):** Three.js WebGL overlay, physics-based particles, swirl generator integration as a mode

### 9.6 AI Studio (ai-studio.html)

**Built:** HuggingFace image/audio generation, Pollinations.ai (free), Reverse Image Engineering, pipeline builder, gallery

**Pollinations.ai Models Available:**
- `flux` — FLUX.1 (best quality)
- `flux-realism` — photorealistic FLUX
- `flux-anime` — anime style
- `flux-3d` — 3D render style
- `any-dark` — dark aesthetic
- `turbo` — fast generation

### 9.7 Discovery Engine (discovery.html)

**Built:** 24 bait cards across 9 territories, lightbox with full expansion, mystery question mechanic, community guess board, notebook save, Pollinations integration

**Territory Coverage:**
- Philosophy (Post-structuralism, Process, Phenomenology, Hermetics)
- Natural Phenomena (Mycelium, Vortex Streets, Convergent Evolution, Acoustic Levitation)
- Engineering (Ma/Negative Space, TRIZ Ideality, Morphogenesis/Turing, Work Hardening)
- Cultural (Griot tradition, Dreamtime/Songlines, Wabi-Sabi)
- Materials Science (Quasicrystals)
- Ecological (Edge Effect, Rhizome)
- Spiritual/Cosmology (Bardo, As Above So Below)
- Mathematics (Strange Attractors, Information Entropy, Topology)
- Human Behavior (Embodied Cognition, Diffusion of Responsibility, ZPD)

---

## 10. Discovery Engine

### Anti-Feedback Loop Architecture

The Discovery Engine is explicitly designed to push against the user's existing domain. This means:

1. **No engagement optimization** — cards are not sorted by clicks, shares, or "likes"
2. **Forced cross-domain** — every session surfaces cards from at least 3 different territory categories
3. **Behavioral anti-mirroring** — if a user repeatedly opens philosophy cards, surfaces more natural phenomena and engineering cards
4. **No recommendation engine** — random selection within cross-domain constraints

### The Bait Structure

Each discovery card follows this information architecture:

```
1. GLYPH — visual symbol of the domain
2. ORIGIN — discipline or tradition it comes from
3. TITLE — the concept name
4. REGION — geographic/temporal provenance  
5. TEASER — the hook (1-2 sentences, intriguing, incomplete)
6. FOOTER TAGS — domain taxonomy labels
7. CTA — "Take the bait →"

ON EXPANSION:
8. WHAT — clear explanation of the concept
9. WHY — the view it offers, why it matters now
10. IMAGES — 3 Pollinations-generated visual references
11. APPLICATIONS — 4 non-obvious applications to creative work
12. PROVENANCE — the history thread, the human story behind it
13. MINI-REPORT — generated on request (structured text)
```

### Podcast Generation (Planned)

When a user "takes the bait," they can generate a listenable mini-podcast:

```
1. Structured script generated from card data
2. HuggingFace TTS (microsoft/speecht5_tts or similar)
3. Background ambient audio from sonic waves parameters
4. 3-5 minute audio produced locally
5. Playable in browser, downloadable as MP3
```

---

## 11. Reverse Image Engineering

### Input Types

| Input | Output Type |
|---|---|
| Fashion/Costume photo | Taxonomy: silhouette, materials, era, occasion, style codes |
| UI/Design screenshot | Design tokens: colors, spacing, motion, components, brand primitives |
| Interior/Space photo | Atmosphere: materials, lighting, furnishings, spatial logic |
| Art/Illustration | Style: movement, influence, technique, mood, medium |
| Mood board / Vibe | Sensory: smells like, sounds like, feels like, tastes like, looks like |
| Product/Material | Material taxonomy: surface, texture, composition, behavior |
| Creature/Character | Anatomy, texture, style influence, cultural origin |
| Landscape/Nature | Geological, atmospheric, temporal, emotional |
| Pattern/Texture | Mathematical structure, cultural origin, material basis |

### Bidirectional Lookup

**Forward (image → semantics):** Upload an image → receive full semantic anatomy

**Reverse (description → image archetype):**
Input: "something that smells like citrus and glows like the sun and feels like controlled static"
Output: probabilistic mapping to visual archetypes + Pollinations generation

### Extraction Taxonomy (Universal)

Every image analysis produces output across:

```
COMPOSITIONAL: rule, center, balance, depth, hierarchy, flow, rhythm
CHROMATIC: primary palette (hex codes), temperature, saturation, value range, contrast ratio
LUMINANCE: source direction, quality (hard/soft/diffuse/point), drama level
TEXTURAL: micro-texture, macro-surface, apparent material, density, tactility
TEMPORAL: era, movement, cultural moment, temporal ambiguity
EMOTIONAL: affect, tension, energy, intimacy, scale-feeling
STYLE: movement, influence, hybrid lineage, technique
MOTION (if video): pace, rhythm, direction, physics, transition style
```

### Design Token Extraction (For UI/Design Images)

```
COLORS: hex values + semantic roles (primary, secondary, accent, neutral, background)
TYPOGRAPHY: weight distribution, contrast ratio, apparent size scale
SPACING: rhythm, grid evidence, breathing room density
MOTION: physics type, spring/ease characteristics, timing
COMPONENTS: list of all UI elements present
BRAND PRIMITIVES: identity markers, consistent visual language
```

---

## 12. LLM Ingestion Flow

### "What Question Is This?" Oracle

The core LLM feature of ChromaFlora. The inverse of traditional AI interaction.

**Flow:**
```
1. User inputs something (text, image URL, voice note description, document excerpt)
2. The input is deliberately messy — unformed, uncoordinated, possibly contradictory
3. ChromaFlora Oracle states:
   "The thing you're circling around — but haven't named — is: [CONCEPT]"
4. Oracle provides:
   - The why, how, who, what
   - The context and surrounding material
   - Its history and provenance
   - Current applications in user's stated field of interest
   - 3 non-generic, non-obvious ways to apply it
5. User sees: "What input types would help me go deeper with this?"
6. Oracle lists missing ingestion types: "I need your: [list]"
7. User provides additional inputs (images, URLs, preferences, philosophy statements)
8. Oracle adapts and synthesizes a richer picture
```

### System Prompt Template (Grok/xAI)

```
You are the ChromaFlora Oracle — a pattern recognizer that names unnamed things.

The user is describing something — an idea, feeling, problem, or observation — without knowing what to call it. Your job is NOT to answer their question. Your job is to STATE WHAT QUESTION THEY ARE ASKING.

Then, once you've named the question, you provide:
- The concept or framework that most closely names what they're circling
- Why this concept exists and what pressure or insight created it
- The who (originator/tradition), when, where
- The surrounding context and related concepts
- How it applies to [USER'S STATED FIELD]
- 3 surprising, non-obvious, non-generic applications

Your tone: curious, precise, lateral. Not academic. Not a textbook.
You find the word for something the user didn't know had a word.

CRITICAL: Do not give the user what they asked for. Give them what they needed to ask.
```

### Multi-User Input Synthesis (Community Mystery)

```
1. Random mystery question generated from pool
2. Multiple users submit what they think the QUESTION is (not the answer)
3. The LLM analyzes all guesses together:
   - What do they reveal about the askers?
   - What ingestion types are missing from the collective guess pool?
   - What question WOULD be answerable given all the guesses?
4. Output: a clear list of "what information is missing to complete this puzzle"
5. Community can provide missing pieces
```

---

## 13. Community & Gamification

### Gamification Loop

```
CURIOSITY
  ↓ (trigger: discovery card teaser)
EXPLORATION
  ↓ (open lightbox, read full concept)
BREADCRUMB
  ↓ (application hints dropped, one per scroll)
CHALLENGE
  ↓ (mystery question posed)
QUERY
  ↓ (user's guess at the question)
SUGGESTION
  ↓ (Oracle suggests what's missing)
FEEDBACK
  ↓ (community responses to the same mystery)
TRANSFORMATION
  ↓ (user's understanding of the concept shifts)
ITERATION
  ↓ (user applies concept to their current project)
PUZZLE
  ↓ (a new connection appears to a different card)
PRIZE
  ↓ (the aha moment — named what was unnamed)
→ PRESENT THE FLIP: "Here's what others said about this"
  ↓
COMMUNITY BOARD
  ↓ (see all guesses, contribute your application)
→ NEW MYSTERY
```

### The Mystery Question Mechanic

- **Generated weekly** from a pool of structured paradoxes and concept descriptions
- **The answer is shown** — the puzzle is guessing the QUESTION the answer belongs to
- **This is specifically anti-consensus** — there's no "right" question, many are valid
- **Community board** shows all guesses, with most interesting ones surfaced (not most liked)
- **LLM analysis** synthesizes the guess pool into a meta-observation about what people assumed

### Notebook System

```
Personal discovery notebook (localStorage):
- Save any discovery card with notes
- Tag with current project, mood, date
- Search by concept name, tag, or territory
- Export as markdown document
- Share as URL with note embedded
```

### Points / Badge System (Planned)

| Action | Points | Badge |
|---|---|---|
| Open first card | 10 | Curious |
| Open card from new territory | 25 | Explorer |
| Submit mystery guess | 15 | Questioner |
| Save to notebook | 20 | Archivist |
| Generate image from discovery | 30 | Bait-Taker |
| Complete all territories | 100 | Rhizome |
| Generate a report | 25 | Researcher |

---

## 14. Taxonomy & Heuristics

### Creative Input Types

ChromaFlora accepts and processes these input types for the Oracle and reverse engineering features:

| Type | Format | Use Case |
|---|---|---|
| Text description | Free text | Oracle input, sensory description |
| Image file | JPEG/PNG/WebP | Reverse image engineering |
| Image URL | HTTP URL | Reference image |
| Document excerpt | Pasted text | Oracle input for concept identification |
| Website URL | HTTP URL | Design token extraction |
| Philosophy statement | Free text | Oracle alignment calibration |
| Preference declaration | Form fields | Discovery personalization |
| Emotional description | Free text | Bidirectional sensory lookup |
| Process description | Free text | Oracle workflow analysis |
| Question (literal) | Free text | Oracle — what concept answers this? |

### Discovery Heuristics

**Bait quality heuristics (for evaluating new cards):**
1. Is this concept unknown to most people in design/creative fields?
2. Does it offer a genuine alternative framework to mainstream thinking?
3. Does it have a surprising human story behind it?
4. Does it have at least 3 non-obvious applications to creative work?
5. Is it visually/aesthetically rich enough to generate compelling images?
6. Does it connect to at least 2 other cards in non-obvious ways?

**Anti-feedback-loop heuristics:**
1. Never show the same card twice in the same session
2. If a user has opened 3+ philosophy cards, next random must be from a different territory
3. If a user saves only one category, force 50% cross-category on next visit
4. Popularity of a card REDUCES its probability of being shown (inverse engagement)

### Index Structure

**Concept Index:** Alphabetical list of all concepts with territory, origin date, and connected concepts
**Territory Index:** All cards grouped by the 9 territory categories
**Application Index:** All cards indexed by the field of application (music, design, UX, architecture, etc.)
**Provenance Index:** Cards indexed by geographic region and historical period
**Connection Graph:** Which cards reference each other, enabling a Rhizome browse mode

---

## 15. Scalability & Requirements

### Current Constraints (localStorage)

| Limit | Value | Mitigation |
|---|---|---|
| localStorage total | 5–10MB per origin | Compress images, store thumbnails not full res |
| IndexedDB | 50MB–unlimited | Used for audio stems (binary data) |
| Canvas resolution | Device pixel ratio capped | Use `devicePixelRatio` for HiDPI |
| Web Audio voices | ~32 simultaneous | Manage voice pool in sequencer |
| Tone.js Transport | Single per page | Re-initialize on page visit |

### Scaling Path (Backend Addition, Future)

When/if a backend is added:
1. **Authentication** — Replit Auth or similar
2. **PostgreSQL** — for bands, tracks, community content
3. **Object Storage** — for generated images, audio stems
4. **WebSocket** — for real-time community mystery syncing
5. **API proxy** — to hide API keys server-side

### Performance Requirements

| Page | Target FPS | Target Load Time |
|---|---|---|
| Mandala | 60fps canvas animation | < 1.5s |
| Sonic Waves | 60fps visualizer | < 1s |
| Studio | 60fps canvas | < 2s |
| Discovery | Static cards | < 0.8s |
| AI Studio | API-dependent | < 0.5s UI, 15-60s generation |
| Band/Sequencer | 60fps grid highlight | < 1.5s |

---

## 16. Social Media Integration

### Content Types for Social

| Type | Platform | Format | Frequency |
|---|---|---|---|
| Mandala exports | Instagram/Twitter | PNG square | 2-3x/week |
| "What is this?" oracle results | Twitter/Threads | Screenshot | Daily |
| Discovery card highlights | Instagram Stories | Card template | Daily |
| Process videos | TikTok/Reels | Screen recording | Weekly |
| Design system tokens | LinkedIn | Code screenshot | Weekly |
| Mystery questions | Twitter/Threads | Text + visual | Weekly |

### Auto-Share Flow (Planned)

From any generated output (mandala, AI image, sequencer pattern), a "Share" button:
1. Generates a canvas-composed social card with ChromaFlora branding
2. Includes: the prompt/parameters, the @halcyonminx attribution, the chromaflora URL
3. Downloads as PNG or copies to clipboard (Web Share API for mobile)

---

## 17. Agency Building & Social Impact

### Educational Agency Building

ChromaFlora's educational mission: give people the language and framework to name what they're doing, understand why it works, and go deeper on their own.

**Agency building through:**
1. **Naming** — the Oracle gives vocabulary to unnamed practices
2. **Provenance** — knowing where a concept came from gives permission to use it
3. **Application mapping** — showing how ancient concepts apply to present work
4. **Non-obvious connections** — the connections users wouldn't find in their own reading
5. **Community validation** — others are also using these frameworks

### Social Impact Claims

ChromaFlora's anti-feedback-loop commitment is a measurable social impact position:

1. **Epistemic diversity** — exposing people to genuinely foreign concepts reduces epistemic echo chambers
2. **Cross-domain transfer** — the edge effect in knowledge: connections between unrelated domains produce innovation
3. **Decolonizing design history** — the discovery cards center non-Western knowledge traditions (Griot, Dreamtime, etc.) as equal to Western philosophy
4. **Open tools** — all core tools are free, no paywall, accessible to everyone regardless of income
5. **Anti-extractive AI** — Pollinations.ai (free, no data training on user prompts) prioritized over extractive platforms

---

## 18. Navigation & UX Philosophy

### The "Reading Experience That Reads You Back"

Navigation should feel like being in a reading flow where the content adapts to your engagement:

1. **Scroll depth tracking** — how far you've read reveals interest level
2. **Dwell time** — how long spent on a section indicates resonance
3. **Interaction pattern** — what you click, expand, save builds a local interest profile
4. **Feedback loop** — next discovery card selection weighted against this profile
5. **But anti-mirror** — the profile is used to push AWAY from, not toward, known preferences

### Motion-Led Navigation

ChromaFlora's nav philosophy: animation IS navigation, not decoration.

```
Page transitions: The content morphs, not the page
Hover states: Spring physics, not easing (intentional overshoot)
Scroll behavior: Parallax depth reveals hierarchy
Active states: Bloom glow, not color change alone
Loading states: Generative patterns, not spinners
Empty states: Live canvas, not static illustration
```

### Article Format — Flow Reading

For documentation and discovery reports, the reading experience:
1. **Lead with the hook** — first sentence is the most surprising claim
2. **Layer revelation** — each paragraph reveals one more thing
3. **Breadcrumbs** — small typographic hints at what's coming next
4. **Sidebar resonance** — pull-quotes that the user might save
5. **Interactive checkpoint** — mid-article: "pause here, does this connect to your work?"
6. **End with an open question** — never close completely

---

## 19. Execution Roadmap

### Phase 1 — COMPLETE ✓

- [x] Mandala Studio (full)
- [x] Sonic Waves (full)
- [x] Studio ResizeObserver fix
- [x] Nav fixes (all pages)

### Phase 2 — IN PROGRESS

- [x] Tone.js step sequencer in band.html
- [x] Pollinations.ai free image gen in ai-studio.html
- [x] Reverse Image Engineering module
- [x] Discovery Engine (discovery.html)
- [x] Comprehensive documentation
- [ ] Three.js WebGL layer in studio.html
- [ ] Web Worker for mandala computation
- [ ] Swirl generator as Studio mode

### Phase 3 — PLANNED

- [ ] Grok/xAI Oracle integration ("what question is this?")
- [ ] HuggingFace TTS podcast generation
- [ ] Community board (community.html)
- [ ] Mystery question pool (30+ questions)
- [ ] Gamification loop (points, badges, notebook)
- [ ] Social share card generator
- [ ] Shop page
- [ ] ComfyUI pipeline via Replicate
- [ ] Three.js particle physics in studio

### Phase 4 — FUTURE

- [ ] Backend (PostgreSQL + auth)
- [ ] WebSocket real-time community mystery
- [ ] Mobile-optimized views
- [ ] Video generation integration
- [ ] Civitai LoRA library browser
- [ ] Multi-user collaborative mandala
- [ ] Live performance mode (MIDI input → sequencer)

---

## 20. QA Checklist — Phase 2

### Core Phase 2 Items

| # | Feature | Implementation | Status |
|---|---|---|---|
| P2-01 | Tone.js step sequencer in band.html | 8×16/32 grid, Bjorklund, chaos, human patterns | ✓ Built |
| P2-02 | Tone.js synths per track | MembraneSynth, NoiseSynth, MetalSynth, MonoSynth, PolySynth | ✓ Built |
| P2-03 | Swing amount control | Tone.Transport.swing | ✓ Built |
| P2-04 | Generative patterns: Euclidean | Bjorklund algorithm | ✓ Built |
| P2-05 | Generative patterns: Chaos | Logistic map attractor | ✓ Built |
| P2-06 | Generative patterns: Human groove | Hardcoded groove + humanization noise | ✓ Built |
| P2-07 | Generative patterns: Random | Density-weighted random | ✓ Built |
| P2-08 | Pattern save/load (A/B/C/D slots) | localStorage cf_seq_pat_{0..3} | ✓ Built |
| P2-09 | Per-track mute | seqMuted array | ✓ Built |
| P2-10 | Active step highlight (playhead) | CSS class + Tone.getDraw | ✓ Built |
| P2-11 | BPM slider | Tone.Transport.bpm.value | ✓ Built |
| P2-12 | Step count (8/16/32) | seqSetSteps() | ✓ Built |
| P2-13 | Volume control | Tone.Gain master | ✓ Built |
| P2-14 | Pollinations.ai image gen | image.pollinations.ai REST API | ✓ Built |
| P2-15 | Pollinations model selector | flux / flux-realism / anime / 3d / any-dark / turbo | ✓ Built |
| P2-16 | Pollinations size control | width/height params | ✓ Built |
| P2-17 | Pollinations seed control | seed param | ✓ Built |
| P2-18 | Pollinations save to gallery | cf_ai_gallery localStorage | ✓ Built |
| P2-19 | Reverse image upload | FileReader API, drag & drop | ✓ Built |
| P2-20 | Reverse image semantic extraction | Multi-category analysis output | ✓ Built |
| P2-21 | Reverse — fashion taxonomy output | Silhouette, materials, era, occasion | ✓ Built |
| P2-22 | Reverse — UI/design token extraction | Colors, spacing, motion, components | ✓ Built |
| P2-23 | Reverse — sensory translation (20 descriptors) | Smells/sounds/feels/tastes/looks/moves like | ✓ Built |
| P2-24 | Reverse — reverse-engineered prompts | Diffusion, LoRA, video versions | ✓ Built |
| P2-25 | Bidirectional sensory → visual | Text description → visual identification | ✓ Built |
| P2-26 | Discovery Engine (24 cards, 9 territories) | Full content + lightbox | ✓ Built |
| P2-27 | Discovery anti-filter logic | Category filtering | ✓ Built |
| P2-28 | Discovery lightbox full expansion | What/Why/Apps/Provenance/Report | ✓ Built |
| P2-29 | Mystery question mechanic | Guess the question, not the answer | ✓ Built |
| P2-30 | Discovery notebook save | localStorage cf_discovery_notebook | ✓ Built |
| P2-31 | Comprehensive documentation | This file | ✓ Built |
| P2-32 | Database schema | Section 7 above | ✓ Documented |
| P2-33 | 20 Socratic questions | Section 2 above | ✓ Answered |
| P2-34 | Discovery → Pollinations integration | "Generate image" from discovery card | ✓ Built |

### Remaining Phase 2 Items

| # | Feature | Status |
|---|---|---|
| P2-35 | Three.js WebGL layer in studio.html | ⬡ Planned Phase 2b |
| P2-36 | Web Worker for mandala math | ⬡ Planned Phase 2b |
| P2-37 | Swirl generator as Studio mode | ⬡ Planned Phase 2b |

### Phase 3 Keys Needed

To enable Phase 3 features, you'll need to provide these API keys in the AI Studio:

1. **HuggingFace token** — `huggingface.co/settings/tokens` (free, 1000 req/day)
2. **Grok/xAI key** — `console.x.ai` (pay-per-use, cheap)

Pollinations.ai is already live — no key needed.

---

*ChromaFlora v5.0 — Built by Jennipher Troup (@halcyonminx) — Anti-algorithmic, bioluminescent, curious by design.*
