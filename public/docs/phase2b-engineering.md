# ChromaFlora v5.0 — Phase 2b Engineering Blueprints

**Type:** Technical Architecture, Schematics, Parameter Tables, Signal Flow, Wireframes
**Author:** Jennipher Troup (@halcyonminx)
**Date:** May 2026

---

## 1. System Architecture Blueprint

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHROMAFLORA v5.0 SYSTEM                      │
│                 Pure Client-Side Architecture                    │
└─────────────────────────────────────────────────────────────────┘

  ENTRY POINTS                    SHARED LAYERS
  ┌──────────────┐                ┌────────────────────────────┐
  │  index.html  │─────────────── │  localStorage (cf_*)       │
  │  studio.html │                │  sessionStorage (cf_session)│
  │  mandala.html│─── any page ───│  Design Tokens (CSS vars)  │
  │  band.html   │                │  Shared utils.js (future)  │
  │  sonic-waves │                └────────────────────────────┘
  │  ai-studio   │
  │  discovery   │                EXTERNAL APIs
  └──────────────┘                ┌────────────────────────────┐
                                  │  Pollinations.ai (no key)  │
  PYTHON STATIC SERVER            │  HuggingFace (free token)  │
  python3 -m http.server 8000     │  NASA APOD (free key)      │
  --directory public              │  Wikipedia REST (no key)   │
                                  │  Web Speech API (browser)  │
                                  │  Tone.js CDN               │
                                  │  Three.js CDN              │
                                  └────────────────────────────┘
```

---

## 2. Page-by-Page Feature Blueprint

### 2.1 studio.html

```
STUDIO.HTML ARCHITECTURE
═════════════════════════

 ┌─── NAV BAR (fixed, 56px) ──────────────────────────────────┐
 │  Studio | Mandala | Sonic Waves | Band | AI Studio | Discover│
 └─────────────────────────────────────────────────────────────┘

 ┌─── SIDEBAR (240px, fixed left) ─┐  ┌─── CANVAS AREA ────────┐
 │  Tool palette                   │  │                        │
 │  • Brush tools                  │  │  Three.js WebGL layer  │
 │  • Shape tools                  │  │  (position: absolute)  │
 │  • Color swatches (6 tokens)    │  │  z-index: 10           │
 │  • Opacity/Size sliders         │  │                        │
 │  • Palette generator            │  │  Canvas 2D layer       │
 │                                 │  │  (user drawing)        │
 │  Layer panel                    │  │  z-index: 5            │
 │  • Background (WebGL)           │  │                        │
 │  • Drawing (Canvas 2D)          │  │  pointer-events: all   │
 │  • Overlay (DOM)                │  │  on Canvas 2D only     │
 │                                 │  │                        │
 │  Export panel                   │  └────────────────────────┘
 │  • PNG export
 │  • SVG export (future)
 │  • Standalone HTML export
 └─────────────────────────────────┘

 Three.js Scene Graph:
   Scene
   ├── AmbientLight (intensity: 0.1)
   ├── PointLight (color: --iris, intensity: 2, distance: 500)
   ├── ParticleSystem (5000 points, orbital paths)
   │   └── BufferGeometry + PointsMaterial
   ├── EffectComposer
   │   ├── RenderPass
   │   ├── UnrealBloomPass (strength: 1.5, radius: 0.8, threshold: 0)
   │   └── FilmPass (noise: 0.25)
   └── OrbitControls (disabled — auto-rotate only)
```

### 2.2 mandala.html

```
MANDALA.HTML ARCHITECTURE
═════════════════════════

 Canvas 2D (main thread)
 ├── Clear with semi-transparent fill (trail effect)
 ├── Translate to center
 ├── Rotate by accumulated angle
 └── For each ring (n_rings):
     ├── Scale by ring_radius[i]
     ├── For each step (n_steps):
     │   ├── Rotate by (2π / n_steps * i)
     │   ├── Draw petal shape (Bezier curve)
     │   └── Apply color from token[i % 6]
     └── Apply glow filter

 Web Worker (mandala-math.worker.js) [PHASE 2B TARGET]
 ├── Receives: { rings, steps, complexity, seed, time }
 ├── Computes: Float32Array of (x, y, r, g, b, a) points
 ├── Uses: Simplex noise FBM for organic variation
 └── Returns: typed array via postMessage

 Parameter Table:
 ┌─────────────────┬──────────┬──────────┬──────────────────────┐
 │ Parameter       │ Min      │ Max      │ Default              │
 ├─────────────────┼──────────┼──────────┼──────────────────────┤
 │ n_rings         │ 2        │ 12       │ 6                    │
 │ n_steps         │ 4        │ 64       │ 16                   │
 │ rotation_speed  │ -0.02    │ 0.02     │ 0.003                │
 │ scale           │ 0.1      │ 1.0      │ 0.5                  │
 │ complexity      │ 1        │ 8        │ 3                    │
 │ noise_freq      │ 0.001    │ 0.1      │ 0.01                 │
 │ noise_amp       │ 0        │ 50       │ 10                   │
 │ color_shift     │ 0        │ 360      │ 0 (degrees/sec)      │
 │ line_width      │ 0.5      │ 4        │ 1.5                  │
 │ trail_alpha     │ 0.01     │ 0.15     │ 0.05                 │
 └─────────────────┴──────────┴──────────┴──────────────────────┘
```

### 2.3 band.html — Audio Signal Flow

```
TONE.JS AUDIO SIGNAL FLOW
═════════════════════════

 Track 0 (Kick)
 MembraneSynth ──────────────────────────────────────┐
                                                       │
 Track 1 (Snare)                                      │
 MetalSynth ─────────────────────────────────────────┤
                                                       │
 Track 2 (HH Closed)                                  ▼
 MetalSynth ──────────────────────────── FeedbackDelay (8n, 0.3)
                                                       │
 Track 3 (HH Open)                                    ▼
 MetalSynth ──────────────────────────── Reverb (1.5s)
                                                       │
 Track 4 (Bass)                                        ▼
 Synth (triangle) ──────────────────────────── Destination
                                                       ▲
 Track 5 (Lead)                                        │
 Synth (sine) ────────────────────────────────────────┘
                                                       │
 Track 6 (Pluck)                                       │
 PluckSynth ──────────────────────────────────────────┘
                                                       │
 Track 7 (Pad)                                         │
 FMSynth ─────────────────────────────────────────────┘

 Sequence Engine:
 Tone.Sequence (16n subdivisions)
   ├── Reads: seqPattern[8][32]
   ├── Triggers: synth.triggerAttackRelease()
   ├── Swing: Tone.Transport.swing (0–50%)
   ├── BPM: 60–200 bpm
   └── Visual sync: Tone.getDraw().schedule()

 Pattern Memory:
 Slot A ──┐
 Slot B ──┤── seqMemory{A,B,C,D} ── localStorage('cf_seq_patterns')
 Slot C ──┤
 Slot D ──┘

 Generative Algorithms:
 Euclidean (Bjorklund) ──┐
 Chaos (Logistic Map)   ──┤── seqPattern[track]
 Human Groove            ──┤
 Random                  ──┘
```

### 2.4 discovery.html — Anti-Feedback Algorithm

```
DISCOVERY ENGINE FLOWCHART
══════════════════════════

 ┌─ Session Start ─────────────────────────────────┐
 │  Load cf_discovery_notebook (visited card IDs)  │
 │  Load cf_discovery_territories (visit counts)   │
 └─────────────────────────────────────────────────┘
            │
            ▼
 ┌─ Territory Scoring ─────────────────────────────┐
 │  For each of 9 territories:                     │
 │    score = 1 / (visits + 1)^2                   │
 │  Territories with fewest visits get highest     │
 │  probability of selection                        │
 └─────────────────────────────────────────────────┘
            │
            ▼
 ┌─ Card Selection ────────────────────────────────┐
 │  Select territory by weighted random            │
 │  From that territory, select unvisited card     │
 │  If all visited: select least-recently-visited  │
 │  Avoid last 3 selected territories (cooldown)   │
 └─────────────────────────────────────────────────┘
            │
            ▼
 ┌─ Display ───────────────────────────────────────┐
 │  Cards fade in sequentially (100ms stagger)     │
 │  First card: highest-surprise territory         │
 │  Grid: 24 cards, 4-column desktop, 1-col mobile │
 └─────────────────────────────────────────────────┘
            │
            ▼
 ┌─ Interaction ───────────────────────────────────┐
 │  Click card → Lightbox expand                   │
 │  Lightbox: What | Why | Applications |          │
 │            Provenance | Mini-Report             │
 │  Mystery Question: user types guess → reveal    │
 │  Save to notebook: cf_discovery_notebook[]      │
 └─────────────────────────────────────────────────┘

 9 Territories:
 1. Ecological Systems & Biomimicry
 2. Abstract Mathematics & Topology
 3. Evolutionary Biology & Genetics
 4. Philosophy of Mind & Consciousness
 5. Cultural Anthropology & Ritual
 6. Materials Science & Nanotechnology
 7. Acoustic Physics & Sound Design
 8. Political Economy & Game Theory
 9. Astrobiology & Planetary Science
```

### 2.5 ai-studio.html — Feature Map

```
AI-STUDIO.HTML SYSTEM MAP
═════════════════════════

 ┌─ Sidebar Navigation ────────────────────────────┐
 │  Generate (Pollinations)                        │
 │  Reverse (Image Engineering)                    │
 │  Analyze (existing features)                    │
 └─────────────────────────────────────────────────┘

 Generate Tab:
 ┌──────────────────────────────────────────────┐
 │ Prompt Input (textarea)                      │
 │ Model selector (flux / realism / anime / 3d  │
 │                 any-dark / turbo)             │
 │ Dimensions (W × H) + Seed input              │
 │ [Generate] → Pollinations URL → <img>        │
 │ Generated images grid (cf_gen_images)        │
 │ [Copy Prompt] [Save] [Delete]                │
 └──────────────────────────────────────────────┘

 Pollinations URL Pattern:
 https://image.pollinations.ai/prompt/{encoded}
 ?width={w}&height={h}&seed={s}&model={m}&nologo=true

 Reverse Image Engineering Tab:
 ┌──────────────────────────────────────────────┐
 │ Drop Zone (image file or URL)                │
 │ Semantic Analysis Report:                    │
 │   • Color palette (extracted from canvas)    │
 │   • Texture vocabulary                       │
 │   • Composition type                         │
 │   • Lighting model                           │
 │   • Style era / movement                     │
 │   • Fashion taxonomy                         │
 │   • Reverse-engineered prompt               │
 │   • UI token extraction                      │
 │ History (cf_rev_history)                     │
 │ Sensory → Visual lookup (bidirectional)      │
 └──────────────────────────────────────────────┘
```

---

## 3. Data Flow Diagrams

### 3.1 localStorage Data Flow

```
USER ACTION
    │
    ▼
cfSave(key, data)
    │
    ├── JSON.stringify(data)
    │
    ├── localStorage.setItem(key, serialized)
    │
    └── Trigger UI feedback (aurora flash)

RESTORE ON LOAD:
    │
    ├── cfLoad(key, fallback)
    │   ├── JSON.parse(localStorage.getItem(key))
    │   └── Return fallback on error/null
    │
    └── Populate UI from loaded data

KEY NAMESPACE:
    cf_bands        cf_tracks_{id}    cf_palettes
    cf_mandalas     cf_waves          cf_swirls
    cf_gen_images   cf_rev_history    cf_discovery_notebook
    cf_seq_patterns cf_session        cf_ui_prefs
```

### 3.2 API Call Flow (Pollinations)

```
User enters prompt
    │
    ├── Sanitize: encodeURIComponent(prompt)
    │
    ├── Build URL:
    │   https://image.pollinations.ai/prompt/{encoded}
    │   ?width=768&height=768&seed={rand}&model={model}&nologo=true
    │
    ├── Create <img> element, set src = URL
    │
    ├── Show loading state (breathing pulse animation)
    │
    ├── img.onload: hide loading, show image, save to cf_gen_images
    │
    └── img.onerror: show fractal fallback + retry button

LATENCY: 3–15s depending on model + server load
COST: $0 — no account, no key, no rate limit (fair use)
PRIVACY: images are public via CDN URL
```

### 3.3 Web Worker Communication Protocol

```
MAIN THREAD                          WORKER THREAD
(mandala.html JS)                    (mandala-math.worker.js)

new Worker('mandala-math.worker.js')
     │
     ├── postMessage({                ─────────────────────►
     │     type: 'compute',
     │     rings: 6,
     │     steps: 16,
     │     complexity: 3,
     │     time: performance.now(),
     │     seed: 12345
     │   })
     │
     │                                Compute Float32Array
     │                                of (x,y,r,g,b,a) tuples
     │
     │◄──────────────────────────────  postMessage({
     │                                   type: 'frame',
     │                                   data: Float32Array,
     │                                   length: N
     │                                 })
     │
     ├── Receive typed array
     │
     └── Draw loop: ctx.arc(x,y,2,0,TAU) + ctx.fillStyle = rgba()
```

---

## 4. Wireframes (ASCII)

### 4.1 band.html — Desktop Wireframe

```
╔══════════════════════════════════════════════════════════════════╗
║  Studio  Mandala  Sonic Waves  Band  AI Studio  Discover        ║  56px nav
╠══════════════════════════════════════════════════════════════════╣
║ BAND MANAGER │ SEQUENCER                                         ║
║              │                                                    ║
║ [Band Name]  │ ┌──────────────────────────────────────────────┐  ║
║ Genre:       │ │  BPM: [120] ─── Swing: [20%] ─── Steps:[32] │  ║
║ Members:     │ │  [◀ PATTERN A ▶]  [Save A] [B] [C] [D]      │  ║  Transport
║ Bio:         │ │  [Euclidean] [Chaos] [Groove] [Random]       │  ║
║ [Save Band]  │ └──────────────────────────────────────────────┘  ║
║              │                                                    ║
║ [Bands list] │ Track  │ 1  2  3  4  5  6  7  8  9 10 11 12 ...32║
║              │ ───────┼────────────────────────────────────────  ║
║              │ KICK  M│ ░  ▓  ░  ░  ▓  ░  ░  ░  ▓  ░  ░  ░ ... ║
║              │ SNARE M│ ░  ░  ░  ▓  ░  ░  ░  ▓  ░  ░  ░  ▓ ... ║
║              │ HH-C  M│ ▓  ░  ▓  ░  ▓  ░  ▓  ░  ▓  ░  ▓  ░ ... ║
║              │ HH-O  M│ ░  ░  ░  ░  ░  ░  ░  ▓  ░  ░  ░  ░ ... ║
║              │ BASS  M│ ▓  ░  ░  ░  ▓  ░  ░  ░  ░  ▓  ░  ░ ... ║
║              │ LEAD  M│ ░  ░  ▓  ░  ░  ▓  ░  ░  ▓  ░  ░  ▓ ... ║
║              │ PLUCK M│ ░  ▓  ░  ░  ░  ░  ▓  ░  ░  ░  ░  ░ ... ║
║              │ PAD   M│ ░  ░  ░  ░  ░  ░  ░  ░  ▓  ░  ░  ░ ... ║
║              │                                                    ║
║              │ ▓ = active step   ░ = inactive   [playing] = aqua  ║
╚══════════════════════════════════════════════════════════════════╝
```

### 4.2 discovery.html — Desktop Wireframe

```
╔══════════════════════════════════════════════════════════════════╗
║  Studio  Mandala  Sonic Waves  Band  AI Studio  Discover        ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   ◆ DISCOVERY ENGINE                                             ║
║   Territories you haven't explored · Anti-echo architecture      ║
║                                                                  ║
║  [Shuffle] [Notebook(3)] [Territory: All ▼]                      ║
║                                                                  ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        ║
║  │ Card 1   │  │ Card 2   │  │ Card 3   │  │ Card 4   │        ║
║  │ ECOLOGY  │  │ MATH     │  │ CULTURE  │  │ PHYSICS  │        ║
║  │          │  │          │  │          │  │          │        ║
║  │ [title]  │  │ [title]  │  │ [title]  │  │ [title]  │        ║
║  │ excerpt  │  │ excerpt  │  │ excerpt  │  │ excerpt  │        ║
║  │          │  │          │  │          │  │          │        ║
║  │ ✦ Expand │  │ ✦ Expand │  │ ✦ Expand │  │ ✦ Expand │        ║
║  └──────────┘  └──────────┘  └──────────┘  └──────────┘        ║
║                                                                  ║
║  ┌──────────┐  ┌──────────┐  ...                                ║
║  │ Card 5   │  │ Card 6   │                                     ║
║  └──────────┘  └──────────┘                                     ║
║                                                                  ║
║  LIGHTBOX (on click):                                            ║
║  ┌─────────────────────────────────────────────────────────┐    ║
║  │ [Card Title]              [×] Close    [♡ Save]         │    ║
║  ├─────────────────────────────────────────────────────────┤    ║
║  │ WHAT          WHY            APPLICATIONS    PROVENANCE  │    ║
║  │ ─────         ──────────     ────────────    ──────────  │    ║
║  │ [content]     [content]      [content]       [content]   │    ║
║  ├─────────────────────────────────────────────────────────┤    ║
║  │ ? MYSTERY QUESTION                                       │    ║
║  │ "What question could this card be answering?"           │    ║
║  │ [type your guess here...]               [Reveal →]      │    ║
║  └─────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 5. Animation & Motion Graphics Specifications

### 5.1 Breathing Glow (Universal Loading Pattern)

```css
/* Phase: 0.8–1.2 Hz (resting heart rate analog) */
@keyframes cf-breathe {
  0%, 100% { 
    opacity: 0.35;
    box-shadow: 0 0 8px rgba(168,85,247,0.2);
  }
  50% { 
    opacity: 1.0;
    box-shadow: 0 0 24px rgba(168,85,247,0.8), 0 0 48px rgba(168,85,247,0.3);
  }
}
.cf-loading { animation: cf-breathe 1.2s ease-in-out infinite; }
```

### 5.2 Aurora Save Feedback

```css
@keyframes cf-aurora {
  0%   { opacity: 0; transform: scale(0); }
  20%  { opacity: 0.6; transform: scale(0.8); }
  60%  { opacity: 0.3; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(2); }
}
.cf-aurora {
  position: fixed; top: 50%; left: 50%;
  width: 200px; height: 200px;
  margin: -100px 0 0 -100px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(168,85,247,0.8) 0%,
    rgba(34,211,216,0.6) 33%,
    rgba(236,72,153,0.4) 66%,
    transparent 100%
  );
  pointer-events: none;
  animation: cf-aurora 800ms ease-out forwards;
  z-index: 9999;
}
```

### 5.3 Sequencer Playhead Highlight

```css
/* Step cell base */
.seq-step {
  width: 30px; height: 30px;
  border-radius: 4px;
  background: rgba(168,85,247,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  transition: background 80ms ease, box-shadow 80ms ease;
  cursor: pointer;
}

/* Active (user-placed beat) */
.seq-step.active {
  background: rgba(168,85,247,0.7);
  box-shadow: 0 0 8px rgba(168,85,247,0.5);
}

/* Currently playing position */
.seq-step.playing {
  background: var(--aqua);
  box-shadow: 0 0 12px rgba(34,211,216,0.8), inset 0 0 8px rgba(34,211,216,0.4);
}

/* Active + playing (beat fires) */
.seq-step.active.playing {
  background: #fff;
  box-shadow: 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(34,211,216,0.6);
}
```

### 5.4 Card Hover Transform

```css
.discovery-card {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 300ms ease;
}
.discovery-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(168,85,247,0.3), 
              0 0 0 1px rgba(168,85,247,0.4);
}
```

---

## 6. Technical Parameter Tables

### 6.1 Tone.js Synth Parameters

| Track | Synth Type | Key Params | Default Note | FX Chain |
|-------|-----------|-----------|-------------|---------|
| Kick | MembraneSynth | pitchDecay:0.05, octaves:8 | C1 | Delay+Reverb |
| Snare | MetalSynth | frequency:400, decay:0.1, envelope:{release:0.1} | — | Delay+Reverb |
| HH-C | MetalSynth | frequency:800, decay:0.05 | — | Reverb |
| HH-O | MetalSynth | frequency:600, decay:0.3 | — | Reverb |
| Bass | Synth | oscillator:{type:'triangle'}, envelope:{decay:0.3} | G2 | Delay+Reverb |
| Lead | Synth | oscillator:{type:'sine'}, envelope:{release:0.5} | D3 | Delay+Reverb |
| Pluck | PluckSynth | attackNoise:1, dampening:4000 | A3 | Reverb |
| Pad | FMSynth | harmonicity:3, modulationIndex:10 | E4 | Reverb |

### 6.2 Bjorklund Algorithm Presets

| Pattern Name | Steps | Hits | Distribution | Musical Reference |
|-------------|-------|------|-------------|------------------|
| Tresillo | 8 | 3 | [1,0,0,1,0,0,1,0] | Cuban / Afro-Cuban |
| Cinquillo | 8 | 5 | [1,0,1,1,0,1,1,0] | Cuban / West African |
| Bol | 7 | 2 | [1,0,0,1,0,0,0] | Turkish |
| Son Clave | 8 | 5 | [1,0,1,0,1,1,0,1] | Cuban |
| Standard | 16 | 5 | E(5,16) | Universal |
| Dense | 16 | 9 | E(9,16) | Dense groove |
| Sparse | 32 | 5 | E(5,32) | Spacious feel |

### 6.3 Chaos Pattern Parameters

| Parameter | Symbol | Range | Effect |
|-----------|--------|-------|--------|
| Growth rate | r | 3.57–4.0 | Below 3.57 = periodic; above 3.57 = chaotic |
| Seed value | x₀ | 0.1–0.9 | Initial condition; deterministic with same seed |
| Threshold | t | 0.3–0.7 | Probability cutoff for beat placement |
| Iterations | n | 16–32 | Number of steps generated |

---

## 7. Performance Specifications

### 7.1 Frame Budget Analysis

| Page | Render Task | Target | Current | Phase 2b |
|------|-----------|--------|---------|---------|
| mandala | Math compute | <4ms | ~12ms (main thread) | <2ms (worker) |
| mandala | Canvas draw | <8ms | ~8ms | <8ms |
| sonic-waves | FFT analysis | <2ms | ~3ms | <2ms (worker) |
| studio | WebGL render | <8ms | N/A | <8ms (Three.js) |
| band | DOM update | <2ms | ~4ms | <1ms |

### 7.2 Memory Budget

| Data Structure | Size | Limit | Cleanup Trigger |
|---------------|------|-------|----------------|
| seqPattern [8][32] | 256 bytes | N/A | Never |
| cf_gen_images (URLs) | ~200B/image | 500 images | >50MB total |
| cf_rev_history | ~5KB/report | 100 reports | >500KB |
| Three.js geometry | ~2MB | 4MB | Dispose on nav |
| Canvas imageData | W×H×4 bytes | 16MB (4096²) | Dispose on nav |

### 7.3 Network Budget

| Resource | Size | Strategy |
|---------|------|---------|
| Tone.js CDN | 438KB | Defer load, cache aggressively |
| Three.js CDN | 600KB | Lazy import (ES module) |
| Inter font | ~80KB | system-ui fallback if slow |
| JetBrains Mono | ~40KB | optional enhancement |
| Pollinations images | 100KB–2MB | Lazy load, IntersectionObserver |

---

## 8. Competitive Landscape & Differentiation

### Direct Competitors

| Platform | Core Feature | ChromaFlora Advantage |
|---------|-------------|----------------------|
| Figma | Design tool | CF is a *creative system*, not a production tool |
| Adobe Color | Color palettes | CF has generative + bioluminescent aesthetic identity |
| BeepBox | Browser sequencer | CF integrates sequencer with visual system |
| Chrome Music Lab | Music education | CF is for designers, not education |
| Spline | 3D design | CF is 2D/audio-first, more accessible |
| Artbreeder | AI image gen | CF has design system context, not just images |
| Are.na | Inspiration boards | CF is active (generative), not passive (curation) |

### Collaboration Opportunities

| Community | Collaboration Angle |
|-----------|-------------------|
| Creative Code community | Share mandala math on CodePen/Observable |
| Motif/Pattern designers | License ChromaFlora as pattern system |
| Eurorack musicians | ChromaFlora as visual companion for modular synth |
| NFT artists | Generative art system without blockchain overhead |
| Design education | ChromaFlora as teaching tool for design systems |

### Google Alert Monitoring

Set up Google Alerts for competitor intelligence:
- https://www.google.com/alerts?q=generative+design+system
- https://www.google.com/alerts?q=bioluminescent+art+tool
- https://www.google.com/alerts?q=browser+step+sequencer+design

---

## 9. Phase 2b Implementation Checklist

### Code
- [ ] Three.js WebGL layer in studio.html (particle system + bloom)
- [ ] Web Worker for mandala math (offload from main thread)
- [ ] Web Speech API TTS for discovery card narration
- [ ] Keyboard shortcut system (Cmd+S save, Cmd+Z undo)
- [ ] DPR canvas scaling on all canvas pages
- [ ] LERP parameter transitions in mandala
- [ ] Infinite scroll in discovery.html
- [ ] Haptic feedback (navigator.vibrate) on mobile
- [ ] Aurora save animation (all pages)
- [ ] 404.html page

### Documentation
- [x] Phase 2b Socratic Barrage (this session)
- [x] Engineering Blueprints (this document)
- [ ] Social Media Strategy (see phase2b-social-strategy.md)
- [ ] QA Checklist Phase 2b (see phase2b-qa.md)

### Skills
- [x] chromaflora-conventions
- [x] pollinations-free-api
- [x] tone-sequencer-pattern
- [ ] chromaflora-social-strategy
- [ ] chromaflora-engineering-patterns

### APIs to Set Up
- [ ] HuggingFace token → HUGGINGFACE_API_KEY
- [ ] NASA APOD key → NASA_API_KEY
- [ ] ElevenLabs (if podcast feature added) → ELEVENLABS_API_KEY
