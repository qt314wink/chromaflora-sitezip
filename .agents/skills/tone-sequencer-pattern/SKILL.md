---
name: tone-sequencer-pattern
description: Build a Tone.js step sequencer with multi-track synthesis, Euclidean/Bjorklund rhythm generation, chaos patterns, human groove, swing, pattern memory, and visual playhead sync. Use when adding audio sequencer features to any HTML/JS page. Contains the full lazy-init architecture, visual sync pattern, and generative algorithm implementations from ChromaFlora band.html.
---

# Tone.js Step Sequencer Pattern

The architecture used in ChromaFlora `band.html`: 8 tracks × 32 steps, multiple synth types, generative pattern algorithms, pattern memory, swing, and visual playhead sync — all in vanilla JS with Tone.js from CDN.

## When to Use

- Adding a step sequencer to any web page
- Building drum machines, rhythm generators, or pattern-based audio tools
- Implementing generative music algorithms (Euclidean, chaos, groove)

---

## CDN Include

```html
<script src="https://cdn.jsdelivr.net/npm/tone@14/build/Tone.js"></script>
```

Must be loaded before any sequencer code. Tone.js requires a user gesture before audio context starts (browser policy).

---

## Core Data Structure

```javascript
const SEQ_TRACKS = 8;
const SEQ_STEPS  = 32;  // or 16 for simpler use

// 2D boolean array: seqPattern[track][step]
let seqPattern = Array.from({ length: SEQ_TRACKS }, () => new Array(SEQ_STEPS).fill(false));

// Playback state
let seqPlaying = false;
let seqTone    = null;   // Tone.Sequence instance
let seqStep    = 0;      // Current step (for visual sync)
let seqBpm     = 120;
let seqSwing   = 0;      // 0–50 (percentage)

// Pattern memory: 4 named slots
let seqMemory = { A: null, B: null, C: null, D: null };
let seqMutes  = new Array(SEQ_TRACKS).fill(false);
```

---

## Lazy Initialization (Critical Pattern)

Never init Tone.js on page load — always wait for user gesture. Wrap all audio setup in a lazy-init function:

```javascript
let seqSynths = [];

function seqEnsureTone() {
  if (seqSynths.length) return;  // Already initialized

  // Per-track synth configuration
  const configs = [
    { type: 'MembraneSynth', opts: { pitchDecay: 0.05, octaves: 8 },    note: 'C1'  }, // Kick
    { type: 'MetalSynth',    opts: { frequency: 400, decay: 0.1 },       note: null  }, // Snare
    { type: 'MetalSynth',    opts: { frequency: 800, decay: 0.05 },      note: null  }, // HH Closed
    { type: 'MetalSynth',    opts: { frequency: 600, decay: 0.3 },       note: null  }, // HH Open
    { type: 'Synth',         opts: { oscillator: { type: 'triangle' } }, note: 'G2'  }, // Bass
    { type: 'Synth',         opts: { oscillator: { type: 'sine' } },     note: 'D3'  }, // Lead
    { type: 'PluckSynth',    opts: {},                                   note: 'A3'  }, // Pluck
    { type: 'FMSynth',       opts: { harmonicity: 3, modulationIndex: 10 }, note: 'E4' }, // Pad
  ];

  const reverb = new Tone.Reverb(1.5).toDestination();
  const delay  = new Tone.FeedbackDelay('8n', 0.3).connect(reverb);

  seqSynths = configs.map(({ type, opts }) => {
    const synth = new Tone[type](opts);
    synth.connect(delay);
    return synth;
  });
  seqSynthNotes = configs.map(c => c.note);
}
```

---

## Playback with Visual Sync

The key pattern: use `Tone.getDraw().schedule` inside the sequence callback to sync visuals to audio without blocking the audio thread.

```javascript
function seqTogglePlay() {
  if (seqPlaying) {
    seqTone?.stop();
    Tone.getTransport().stop();
    seqPlaying = false;
    seqStep = 0;
    seqRenderPlayhead(-1);
    return;
  }

  seqEnsureTone();

  Tone.getTransport().bpm.value = seqBpm;
  Tone.getTransport().swing     = seqSwing / 100;

  seqTone = new Tone.Sequence((time, step) => {
    // Audio: trigger synths (runs in audio thread)
    seqPattern.forEach((track, t) => {
      if (track[step] && !seqMutes[t]) {
        const note = seqSynthNotes[t] || 'C4';
        seqSynths[t].triggerAttackRelease(note, '16n', time);
      }
    });

    // Visual: schedule DOM update to stay in sync
    Tone.getDraw().schedule(() => {
      seqStep = step;
      seqRenderPlayhead(step);
    }, time);
  }, [...Array(SEQ_STEPS).keys()], '16n');

  Tone.start().then(() => {
    seqTone.start(0);
    Tone.getTransport().start();
    seqPlaying = true;
  });
}
```

`Tone.getDraw().schedule` fires the callback on the next animation frame that corresponds to the audio time — this prevents visual drift without blocking audio.

---

## Generative Algorithms

### Euclidean / Bjorklund

Distributes `k` hits as evenly as possible across `n` steps. Appears in African, Middle Eastern, and Latin rhythms naturally.

```javascript
function bjorklund(steps, hits) {
  if (hits <= 0) return new Array(steps).fill(false);
  if (hits >= steps) return new Array(steps).fill(true);

  let pattern = [];
  let counts  = [];
  let remainders = [];
  let divisor = steps - hits;

  remainders.push(hits);
  let level = 0;

  while (remainders[level] > 1) {
    counts.push(Math.floor(divisor / remainders[level]));
    remainders.push(divisor % remainders[level]);
    divisor = remainders[level];
    level++;
  }
  counts.push(divisor);

  function build(lv) {
    if (lv === -1) { pattern.push(false); return; }
    if (lv === -2) { pattern.push(true);  return; }
    for (let i = 0; i < counts[lv]; i++) build(lv - 1);
    if (remainders[lv]) build(lv - 2);
  }
  build(level);
  return pattern;
}
```

Usage: `seqPattern[t] = bjorklund(SEQ_STEPS, 5)` → classic "5 in 32" Euclidean pattern.

### Chaos (Logistic Map)

Generates aperiodic, deterministic-but-unpredictable patterns via the logistic map equation.

```javascript
function chaosPattern(steps, r = 3.9, seed = Math.random()) {
  let x = seed;
  return Array.from({ length: steps }, () => {
    x = r * x * (1 - x);
    return x > 0.5;
  });
}
```

`r` between 3.57 and 4.0 produces chaotic output. Same seed = same pattern (useful for reproducibility).

### Human Groove

Adds subtle probability-based variation to a base pattern — simulates human imprecision:

```javascript
function humanGroove(basePattern, humanize = 0.15) {
  return basePattern.map(step => {
    if (step) return Math.random() > humanize ? true : false;   // drop hits occasionally
    return Math.random() < humanize * 0.3;                       // add ghost hits occasionally
  });
}
```

---

## Pattern Memory (A/B/C/D Slots)

```javascript
function seqSaveSlot(slot) {
  seqMemory[slot] = seqPattern.map(track => [...track]);
  const stored = JSON.parse(localStorage.getItem('cf_seq_patterns') || '{}');
  stored[slot] = seqMemory[slot];
  localStorage.setItem('cf_seq_patterns', JSON.stringify(stored));
}

function seqLoadSlot(slot) {
  if (!seqMemory[slot]) return;
  seqPattern = seqMemory[slot].map(track => [...track]);
  seqRenderGrid();
}

function seqLoadFromStorage() {
  const stored = JSON.parse(localStorage.getItem('cf_seq_patterns') || '{}');
  Object.entries(stored).forEach(([slot, pattern]) => {
    seqMemory[slot] = pattern;
  });
}
```

---

## Visual Playhead Rendering

```javascript
function seqRenderPlayhead(activeStep) {
  document.querySelectorAll('.seq-step').forEach(btn => {
    const t = parseInt(btn.dataset.track);
    const s = parseInt(btn.dataset.step);
    btn.classList.toggle('playing', s === activeStep);
    btn.classList.toggle('active', seqPattern[t]?.[s] ?? false);
  });
}
```

Step button HTML pattern:
```html
<button class="seq-step" data-track="0" data-step="0" onclick="seqToggleStep(0,0)"></button>
```

The `.playing` class should add a bright glow (use `--aqua` or `--iris`) distinct from the `.active` fill.

---

## BPM and Swing

```javascript
function seqSetBpm(val) {
  seqBpm = val;
  if (seqPlaying) Tone.getTransport().bpm.value = val;
}

function seqSetSwing(val) {
  seqSwing = val;  // 0–50
  if (seqPlaying) Tone.getTransport().swing = val / 100;
}
```

Swing at 50 produces a triplet feel. 20–30 is a subtle groove. 0 is mechanical.
