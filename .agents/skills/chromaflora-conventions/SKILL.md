---
name: chromaflora-conventions
description: ChromaFlora v5.0 project conventions for Jennipher Troup (@halcyonminx). Load whenever working on any ChromaFlora page — design tokens, nav patterns, CDN stack, localStorage schema, aesthetic rules, file structure. Essential for any agent touching band.html, ai-studio.html, discovery.html, studio.html, mandala.html, sonic-waves.html, or any new page.
---

# ChromaFlora Conventions

## When to Use

- Any time you are editing or creating a page in the ChromaFlora project (`public/*.html`)
- When adding a new feature, nav link, or style to any page
- When a fresh agent needs to understand the project without reading all existing files

---

## Design Tokens (CSS Custom Properties)

These six tokens are the entire color system. Never introduce new colors.

```css
--void:     #04040f;  /* Background — near-black cosmic base */
--iris:     #a855f7;  /* Primary — violet/purple energy */
--aqua:     #22d3d8;  /* Secondary — teal/cyan light */
--bloom:    #ec4899;  /* Accent — hot pink bioluminescent */
--ember:    #f97316;  /* Warm accent — orange energy */
--viridian: #10b981;  /* Growth accent — green life */
```

Apply as `color: var(--iris)`, `background: var(--void)`, etc. All glow effects use these with `rgba()` or `box-shadow`.

## Typography

Only two fonts, ever:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- Body / UI: `font-family: 'Inter', sans-serif`
- Code / data / monospaced labels: `font-family: 'JetBrains Mono', monospace`

---

## CDN Stack (No npm, No Build Step)

```html
<!-- Three.js WebGL -->
<script src="https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js" type="module">

<!-- Tone.js Audio -->
<script src="https://cdn.jsdelivr.net/npm/tone@14/build/Tone.js">

<!-- Fonts (above) -->
```

Python static server: `python3 -m http.server 8000 --directory public`

---

## Navigation Patterns

**Critical:** Two different CSS classes are in use across pages. Match the existing class on the page you're editing.

| Pages | Nav link class |
|---|---|
| `band.html` | `nl` |
| `studio.html`, `mandala.html`, `sonic-waves.html`, `ai-studio.html`, `discovery.html` | `nav-link` |

Standard nav order (all pages should include all of these):
```
Studio · Mandala · Sonic Waves · Band · AI Studio · Discover
```

Nav HTML pattern (`nav-link` variant):
```html
<nav>
  <a href="studio.html" class="nav-link">Studio</a>
  <a href="mandala.html" class="nav-link">Mandala</a>
  <a href="sonic-waves.html" class="nav-link">Sonic Waves</a>
  <a href="band.html" class="nav-link">Band</a>
  <a href="ai-studio.html" class="nav-link">AI Studio</a>
  <a href="discovery.html" class="nav-link">Discover</a>
</nav>
```

---

## localStorage Schema

All keys are namespaced: `cf_` + domain + `_` + identifier

| Key | Type | Purpose |
|---|---|---|
| `cf_bands` | JSON array | Band records |
| `cf_tracks_{bandId}` | JSON array | Tracks per band |
| `cf_palettes` | JSON array | Saved color palettes |
| `cf_mandalas` | JSON array | Saved mandala configs |
| `cf_waves` | JSON array | Saved sonic wave configs |
| `cf_swirls` | JSON array | Saved swirl generator configs |
| `cf_gen_images` | JSON array | Pollinations.ai generated images |
| `cf_rev_history` | JSON array | Reverse image engineering reports |
| `cf_discovery_notebook` | JSON array | Saved discovery engine cards |
| `cf_seq_patterns` | JSON object | Sequencer pattern memory slots A/B/C/D |

---

## Aesthetic Rules

1. **Background is always `--void`** — no white, no light backgrounds anywhere
2. **Glow is the shadow system** — use `box-shadow: 0 0 Xpx rgba(token, alpha)` for depth
3. **Borders use 1px with low-opacity token colors** — e.g. `border: 1px solid rgba(168,85,247,0.3)`
4. **Generative over static** — prefer Canvas 2D / WebGL math over image files
5. **Bioluminescent pulse** — subtle CSS `@keyframes` glow animations on key elements
6. **No placeholder content** — all data comes from localStorage or live API; show empty states gracefully

---

## File Structure

```
public/
├── index.html          — Landing / hub
├── studio.html         — Main design studio (Canvas 2D generative)
├── mandala.html        — Mandala generator (polar math)
├── sonic-waves.html    — Sonic wave visualizer (Web Audio API)
├── band.html           — Band manager + Tone.js step sequencer
├── ai-studio.html      — AI image gen (Pollinations) + Reverse Image Engineering
├── discovery.html      — Discovery Engine (24 bait cards, 9 territories)
├── swirl-generator.html
├── player.html
├── docs/
│   └── chromaflora-master.md   — Full living documentation
```

---

## Common Patterns

**Tab switching (used in band.html, ai-studio.html):**
```javascript
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}
```

**localStorage save/load pattern:**
```javascript
function cfSave(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function cfLoad(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
```

**Pollinations image generation** — see `pollinations-free-api` skill for full details.

**Tone.js sequencer architecture** — see `tone-sequencer-pattern` skill for full details.
