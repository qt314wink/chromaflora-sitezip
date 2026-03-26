# ChromaFlora Design System v3.0

A cosmic bioluminescent design system and portfolio website built with pure HTML/CSS/JS. No images — all visuals are procedural Canvas 2D or CSS.

## Architecture

**Server:** `python3 -m http.server 8000 --directory public`

## File Structure

```
public/
├── index.html          — Main landing: 18-tile live gallery + hero + stats
├── projects.html       — Void drift project case studies
├── player.html         — ChromaSynth: 7-genre Web Audio procedural music engine
├── studio.html         — Art Studio: layered canvas + paint pour physics + AI prompt
├── tokens.html         — Design token browser (colors, type, spacing, shadows, easings)
├── components.html     — Interactive component lab (buttons, cards, lists, accordion, tabs)
├── swirl-generator.html — Procedural swirl art generator
├── effects.js          — 18 canvas effect renderers + hover/click interactions
└── drawer.js           — Global interaction system (Drawer, Modal, Widget, Dropdown, EraserList)
```

## Key Features

### Gallery (index.html)
- 18 procedural canvas tiles in a 6-col grid
- Effects: abstractFlows, liquidNeon, plasmaDrift, mandala, cosmicTide, floralGlow, deepSpace, liquidMercury, quilling, tectonicShift, rippleField, bubble, crystallize, liquify, paperLayer, coloringBook, acidPour, vortex
- Hover: oil drip effect; Click: watercolor bleed burst

### ChromaSynth Player (player.html)
- Web Audio API oscillator synthesis — no external APIs needed
- 7 genre modes: Lofi (75 BPM), Ambient (50 BPM), R&B (92 BPM), Techno (132 BPM), Jazz (115 BPM), House (128 BPM), Liquid Dub (172 BPM)
- Per-genre chord progressions, beat scheduling, kick/snare/bass synthesis
- Frequency visualizer canvas, FX rack with draggable knobs
- Sliders: volume, reverb, filter cutoff, BPM offset, chorus, bass boost

### Art Studio (studio.html)
- Multi-layer canvas system with composite rendering
- Tools: Brush (soft gradient), Eraser, Paint Pour, Swirl, Flood Fill, Rect, Ellipse, Line, Stamp, Select/Import
- Paint Pour physics: particles with gravity/viscosity/tension, 4 modes (drip/flood/splatter/marbling)
- Swirl: pixel displacement engine on mouse drag
- AI Image Prompt Builder with JSON schema output
- Export PNG, undo/redo stack

### Design Tokens (tokens.html)
- Color primitives (16) + semantic colors (12) — click to copy hex
- Typography scale (9 sizes), spacing scale (12 steps)
- Border radius, glow shadows, motion easings — all interactive

### Component Lab (components.html)
- Buttons (7 variants + sizes + icon), Badges/Chips
- Inputs with icons, Toggles/Switches
- Cards (4 morphism styles), Progress bars
- Avatar groups, Accordion, Notification toasts
- EraserList (canvas strikethrough animation), Tabs

### Drawer & Interaction System (drawer.js)
- `Drawer` — slide-in panels (left nav, right settings), ESC to close, focus trap
- `Modal` — centered interactive module with spring animation
- `FloatWidget` — radial floating action orb (5 actions, arc layout)
- `initDropdowns()` — animated multi-level nav dropdown menus
- `EraserList` — canvas-based pink eraser strikethrough animation
- `initPageTransitions()` — curtain wipe between pages
- `initMicroInteractions()` — button press scale, card 3D tilt, input focus glow

## Design Tokens

- `--t-snap: 0.1s cubic-bezier(0.4,0,0.2,1)` — 100ms micro-interactions
- `--t-spring: 0.4s cubic-bezier(0.34,1.56,0.64,1)` — spring bounce
- `--purple: #a855f7`, `--aqua: #22d3ee`, `--pink: #ec4899`
- No `background-image` URLs — pure CSS gradients + Canvas only

## Navigation (index.html)
- Hamburger (☰) button → Left nav drawer (all 7 pages)
- "Pages" nav dropdown → All pages + Open Module + Settings
- Gear (⚙) button → Right settings drawer (themes, effects, accent color)
- Floating widget (bottom-right) → 5-action radial menu
- "Export Kit" button → Modal with download options
