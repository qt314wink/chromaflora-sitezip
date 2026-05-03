---
name: chromaflora-engineering-patterns
description: ChromaFlora v5.0 engineering patterns for Web Workers, Three.js WebGL, Canvas 2D performance, audio signal flow, Tone.js sequencer architecture, DPR scaling, localStorage management, and cross-page state. Load when implementing features in studio.html, mandala.html, band.html, or any ChromaFlora page that involves audio, canvas, or WebGL.
---

# ChromaFlora Engineering Patterns

## When to Use

- Implementing Three.js WebGL effects in studio.html
- Building or modifying the Tone.js step sequencer in band.html
- Optimizing Canvas 2D rendering in mandala.html or sonic-waves.html
- Adding Web Worker offloading for heavy math
- Managing localStorage / sessionStorage state
- Adding DPR scaling to any canvas page
- Implementing keyboard shortcuts or touch interactions

---

## Pattern 1: Three.js WebGL Layer (studio.html)

Two canvas layers: Canvas 2D for user drawing (interactive), Three.js WebGL for effects (non-interactive).

```html
<!-- Layer order (bottom to top) -->
<canvas id="studio-canvas" style="position:absolute;z-index:5"></canvas>
<canvas id="webgl-canvas"  style="position:absolute;z-index:10;pointer-events:none"></canvas>
```

```javascript
// Three.js lazy import (only when studio page loads)
async function initThreeJS() {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js');
  
  const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('webgl-canvas'), 
    alpha: true,    // transparent bg — shows Canvas 2D below
    antialias: true 
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  // Particle system (5000 bioluminescent particles)
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 600;
    positions[i*3+1] = (Math.random() - 0.5) * 600;
    positions[i*3+2] = (Math.random() - 0.5) * 200;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({ 
    color: 0xa855f7,  // --iris
    size: 1.5, 
    transparent: true, 
    opacity: 0.6,
    blending: THREE.AdditiveBlending  // additive = bioluminescent glow
  });
  
  scene.add(new THREE.Points(geometry, material));

  // Bloom post-processing (requires three/examples/jsm/postprocessing)
  // UnrealBloomPass: strength=1.5, radius=0.8, threshold=0

  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.0003;
    renderer.render(scene, camera);
  }
  animate();
}
```

---

## Pattern 2: Web Worker for Mandala Math

Offload heavy computation to prevent main thread frame drops.

```javascript
// mandala.html — main thread
const worker = new Worker('mandala-math.worker.js');

worker.onmessage = ({ data }) => {
  const { points, length } = data;  // Float32Array of (x,y,r,g,b,a)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < length; i += 6) {
    ctx.fillStyle = `rgba(${points[i+2]},${points[i+3]},${points[i+4]},${points[i+5]})`;
    ctx.beginPath();
    ctx.arc(points[i], points[i+1], 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

function requestFrame(params) {
  worker.postMessage({ type: 'compute', ...params, time: performance.now() });
}
```

```javascript
// mandala-math.worker.js
self.onmessage = ({ data }) => {
  const { rings, steps, complexity, time, seed } = data;
  const points = [];
  
  for (let r = 0; r < rings; r++) {
    const radius = (r + 1) * 40;
    for (let s = 0; s < steps; s++) {
      const angle = (s / steps) * Math.PI * 2 + time * 0.001;
      const noise = Math.sin(angle * complexity + seed) * 10;
      const x = Math.cos(angle) * (radius + noise) + 400;
      const y = Math.sin(angle) * (radius + noise) + 400;
      // Color from 6-token system, mapped by ring
      const colors = [[168,85,247],[34,211,216],[236,72,153],[249,115,22],[16,185,129],[168,85,247]];
      const [red, green, blue] = colors[r % 6];
      points.push(x, y, red, green, blue, 0.8);
    }
  }
  
  const typed = new Float32Array(points);
  self.postMessage({ points: typed, length: typed.length }, [typed.buffer]);
};
```

---

## Pattern 3: DPR Canvas Scaling (all canvas pages)

Apply this on every canvas page or the art looks blurry on retina.

```javascript
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

// Call on init AND on window resize
window.addEventListener('resize', () => { ctx = setupCanvas(canvas); });
```

---

## Pattern 4: LERP Parameter Transitions

Smooth parameter changes instead of jarring jumps.

```javascript
const params = { rings: 6, steps: 16, rotation: 0.003 };
const targets = { rings: 6, steps: 16, rotation: 0.003 };
const LERP = 0.05;  // ~300ms settling time at 60fps

// In draw loop:
function lerpParams() {
  params.rings    += (targets.rings    - params.rings)    * LERP;
  params.steps    += (targets.steps    - params.steps)    * LERP;
  params.rotation += (targets.rotation - params.rotation) * LERP;
}

// When slider changes: set target, not param
slider.addEventListener('input', e => { targets.rings = +e.target.value; });
```

---

## Pattern 5: Aurora Save Feedback

```javascript
function triggerAuroraFeedback() {
  const aurora = document.createElement('div');
  aurora.className = 'cf-aurora';
  document.body.appendChild(aurora);
  setTimeout(() => aurora.remove(), 800);
}

// CSS (in page <style>):
// @keyframes cf-aurora {
//   0%   { opacity:0; transform:scale(0); }
//   20%  { opacity:0.6; transform:scale(0.8); }
//   60%  { opacity:0.3; transform:scale(1.5); }
//   100% { opacity:0; transform:scale(2); }
// }
// .cf-aurora {
//   position:fixed; top:50%; left:50%; width:200px; height:200px;
//   margin:-100px 0 0 -100px; border-radius:50%; pointer-events:none;
//   background:radial-gradient(circle, rgba(168,85,247,.8) 0%, rgba(34,211,216,.6) 33%, rgba(236,72,153,.4) 66%, transparent 100%);
//   animation:cf-aurora 800ms ease-out forwards; z-index:9999;
// }
```

---

## Pattern 6: Keyboard Shortcuts

```javascript
// Add once, globally
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    cfGlobalSave();
    triggerAuroraFeedback();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    cfUndo();
  }
  if (e.key === 'Escape') {
    document.querySelector('.cf-lightbox')?.classList.remove('active');
  }
});
```

---

## Pattern 7: Undo Stack

```javascript
const cfUndoStack = [];
const CF_UNDO_LIMIT = 10;

function cfPushUndo(stateSnapshot) {
  cfUndoStack.push(structuredClone(stateSnapshot));
  if (cfUndoStack.length > CF_UNDO_LIMIT) cfUndoStack.shift();
}

function cfUndo() {
  if (!cfUndoStack.length) return;
  const prev = cfUndoStack.pop();
  restoreState(prev);  // implement per-page
}
```

---

## Pattern 8: localStorage Utilities

```javascript
const CF_PREFIX = 'cf_';

function cfSave(key, data) {
  try {
    localStorage.setItem(CF_PREFIX + key, JSON.stringify(data));
    triggerAuroraFeedback();
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Storage full. Delete old items to save more.');
    }
    return false;
  }
}

function cfLoad(key, fallback = null) {
  try {
    const raw = localStorage.getItem(CF_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function cfStorageUsedKB() {
  return Math.round(
    Object.entries(localStorage)
      .filter(([k]) => k.startsWith(CF_PREFIX))
      .reduce((acc, [,v]) => acc + v.length * 2, 0) / 1024
  );
}
```

---

## Pattern 9: Cross-Page Session Bus

```javascript
// On page unload (every page):
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('cf_session', JSON.stringify({
    lastPage: location.pathname,
    timestamp: Date.now(),
    // page-specific context here
  }));
});

// On page load (every page):
const session = JSON.parse(sessionStorage.getItem('cf_session') || '{}');
```

---

## Pattern 10: Tone.js Lazy Init

Never initialize Tone.js before a user gesture. The audio context requires user interaction first.

```javascript
let toneReady = false;

async function ensureTone() {
  if (toneReady) return;
  await Tone.start();  // requires user gesture
  Tone.getTransport().bpm.value = seqBpm;
  // init synths here
  toneReady = true;
  updatePlayButtonState();
}

// Only call ensureTone() in response to user action:
document.getElementById('play-btn').addEventListener('click', async () => {
  await ensureTone();
  togglePlayback();
});
```

---

## Performance Targets

| Page | 60fps target | Main thread budget | Worker offload |
|------|------------|-------------------|----------------|
| mandala | Yes | <8ms/frame | Math → Worker |
| sonic-waves | Yes | <8ms/frame | FFT → Worker |
| studio | Yes | <8ms/frame | Three.js on GPU |
| band | 30fps ok | <16ms DOM update | No (sequencer is light) |
| discovery | N/A | N/A | No |

## Three.js CDN Import

```javascript
// ES module import (lazy, doesn't block page load)
const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js');
```

Do not use the non-module build (`/build/three.js`) — it pollutes global scope and is larger.
