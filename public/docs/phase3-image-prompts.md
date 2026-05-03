# ChromaFlora — Image Generation Prompt Library
**Phase 3 · May 2026**
**Format:** Pollinations.ai compatible (free, no key)
**Base URL:** `https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&model=flux&seed={seed}&nologo=true`

---

## Prompt Architecture

Every ChromaFlora prompt follows this template:
```
[SUBJECT], [AESTHETIC], [LIGHTING], [COLOR_PALETTE], [TECHNICAL], [MOOD], --no [EXCLUSIONS]
```

The six token colors translated to prompt language:
- `--void` → "near-black cosmic void, deep space darkness, 97% black"
- `--iris` → "bioluminescent violet, amethyst glow, deep purple luminescence"
- `--aqua` → "phosphorescent teal, cyan bioluminescence, aquamarine light"
- `--bloom` → "magenta bioluminescence, hot pink deep-sea glow, coral emission"
- `--ember` → "orange bioluminescence, amber phosphorescence, warm deep-sea light"
- `--viridian` → "emerald bioluminescence, teal-green organic light, viridian emission"

---

## Style 1: Bioluminescent Deep-Sea

**Art Direction:** Absolute darkness. Organisms that generate their own light. Isolation, beauty, alien intelligence. The aesthetic origin of ChromaFlora.

**Prompt A (Organisms)**
```
macro photography of deep-sea bioluminescent organisms, absolute oceanic darkness, violet phosphorescent tentacles, cyan glowing filaments, magenta bioluminescent nodes, microscopic detail, wet glass refraction, 97% black background, additive light only, no ambient illumination, otherworldly, scientifically precise beauty
--no: sunlight, daylight, white background, surface ocean, tropical, warm lighting, studio flash
```

**Prompt B (Field)**
```
vast underwater bioluminescent field, thousands of glowing organisms creating a galaxy of biological light, violet and teal spectral emission, near-black void background, depth of field from 1mm to infinite, macro-to-landscape composite, organic particle field, cymatics-like distribution pattern, ultra high definition, scientific illustration aesthetic
--no: warm colors, surface light, bubbles, diver, artificial light sources
```

**Prompt C (Single Organism)**
```
isolated deep-sea jellyfish, pure bioluminescence against absolute black, fractal bell structure, violet core radiating to aqua edges, trailing tentacles as light filaments, perfect radial symmetry with organic variation, photographic realism, macro lens compression, sacred geometry embedded in biology
--no: background, other organisms, color contamination, white, grey
```

---

## Style 2: Cosmic Nebula

**Art Direction:** Interstellar gas and dust lit by dying stars. Infinite scale compressed into a frame. The macro version of the bioluminescent system.

**Prompt A (Nebula Cloud)**
```
Hubble-style interstellar nebula, violet and cyan gas clouds, star formation regions, deep space photography, cosmic dust illuminated by infant stars, fractal cloud structure following logarithmic spirals, chromaflora palette (violet/aqua/magenta/void), extreme depth and scale, astrophotography aesthetic, zero gravity composition
--no: planets, artificial satellites, warm orange (except ember accent), NASA watermark
```

**Prompt B (Stellar Nursery)**
```
stellar nursery deep space photography, thousands of proto-stars emerging from violet-teal nebula, each star a distinct iris glow point, cosmic web structure, scale from galaxies to dust motes visible simultaneously, astrophotography with chromatic aberration used artistically, void-dominant composition (80% black sky), bioluminescent interpretation of cosmic scale
--no: green, yellow, brown, red stars predominantly, busy crowded composition
```

**Prompt C (Abstract Cosmic)**
```
abstract cosmic energy field, swirling violet plasma against absolute void, teal energy tendrils reaching across frame, mathematical spiral structures (Fibonacci/golden ratio), luminous particle trails, quantum field visualization aesthetic, fine art photography of impossible phenomenon, 6-color chromaflora palette only
--no: faces, figures, geometric regularity (squares/triangles), text, watermarks
```

---

## Style 3: Sacred Geometry Overlay

**Art Direction:** Mathematical structures that emerge from natural systems. Metatron's Cube, Flower of Life, Sri Yantra — seen as light structures in darkness.

**Prompt A (Geometric Light)**
```
sacred geometry light structure, Flower of Life pattern constructed from violet bioluminescent filaments, absolute black background, thin precise glowing lines forming nested circle geometry, each node a luminous point, mathematical precision with organic light scatter, fine photography of fiber optic installation, ChromaFlora aesthetic
--no: color fills, thick lines, heavy saturation, background texture, golden proportions in warm gold (use violet/aqua instead)
```

**Prompt B (Metatron)**
```
Metatron's Cube sacred geometry, rendered as glowing plasma in absolute darkness, violet primary structure, aqua secondary connections, bloom-pink tertiary intersections, perfect mathematical construction, 3D depth achieved through layered glow intensity, crystal-like clarity of each geometric element, fine art mathematical visualization
--no: color fills between lines, background gradients, warm colors
```

**Prompt C (Living Geometry)**
```
sacred geometry transforming into biological structure, mandala dissolving into mycelial network, mathematical perfection becoming organic chaos, violet-to-aqua gradient through the transformation zone, motion blur on the dissolving edges, sharp at the center, in-camera double exposure aesthetic, philosophical tension between order and chaos made visible
--no: white space, warm tones, urban elements
```

---

## Style 4: Crystal Resonance

**Art Direction:** Crystalline structures as if built from frozen light. Cymatics made permanent. Sound waves that became geometry.

**Prompt A (Crystal Formation)**
```
macro photography of synthetic crystal formation, violet-aqua birefringence under polarized light, geometric internal structure visible, light bending through crystal lattice, absolute black background, scientific microscopy aesthetic, each crystal face a mirror catching specific spectral frequencies, ultra sharp detail at crystalline edges, soft glow beyond the crystal boundary
--no: warm tones, yellow crystals, gemstone clichés (rubies/emeralds), dirty textures
```

**Prompt B (Cymatic Crystal)**
```
cymatic pattern crystallized from sound, geometric interference pattern frozen in glass material, violet and teal resonance nodes, mathematical wave interference visible as physical structure, Chladni figure made three-dimensional, macro photography, fine art scientific photography, perfect symmetry with natural variation at crystal boundaries
--no: circular wave ripples (use standing wave interference patterns instead), color mixing beyond the 6-token palette
```

**Prompt C (Spectral)**
```
prismatic crystal dispersion of bioluminescent light, single source violet light entering crystal and dispersing to full chromaflora spectrum, each color ray visible as distinct fiber of light, absolute darkness surrounding the dispersion event, physics of light made visible, laboratory aesthetic, chromatic art photograph
--no: rainbows on white background, obvious prism clichés, warm yellow-green spectrum
```

---

## Style 5: Mycelial Network

**Art Direction:** Underground fungal networks as information systems. The original internet. Organic connectivity as aesthetic.

**Prompt A (Root Network)**
```
mycelial network root system macro photography, glowing bioluminescent tendrils against dark soil background, violet and viridian-green filaments, connection nodes as luminous points, network topology made beautiful, scientific microscopy color treatment applied to macroscopic scale, deep focus with selective glow, mathematical graph theory made organic
--no: mushrooms themselves (just the mycelium), green forest context, daylight
```

**Prompt B (Information Flow)**
```
bioluminescent information flowing through mycelial network, light pulses traveling along fungal filaments, violet pulses becoming aqua at connection nodes, network topology visualization, fine art scientific photography, selective focus on specific transmission pathways, dark soil background, 97% void, organic circuit diagram made real
--no: warm tones, clear daylight, above-ground plants
```

**Prompt C (Dissolution)**
```
mycelial network dissolving into particle field, organic filaments decomposing into bioluminescent dust, biological to digital dissolution aesthetic, ChromaFlora token colors (violet/aqua/viridian), extreme depth of field capturing both sharp network origins and dissolved particle endpoints, transformation photography, philosophical beauty of dissolution
--no: clear background, dark-only or light-only, single color
```

---

## Style 6: Aurora Cascade

**Art Direction:** Atmospheric electromagnetic phenomena. Charged particles following magnetic field lines. The macroscopic version of the bioluminescent system.

**Prompt A (Aurora Curtain)**
```
aurora borealis photographed at ground level looking up, violet and teal curtains of light, absolute black sky between aurora sheets, vertical light columns suggesting mathematical order, long exposure photography aesthetic, no stars (pure void background), ChromaFlora palette (iris/aqua dominant, bloom/ember accents), extreme vertical composition, fine art landscape astrophotography
--no: warm green aurora (use violet/teal only), mountains/landscape (pure sky and aurora), visible moon
```

**Prompt B (Aurora Abstract)**
```
abstract aurora energy, electromagnetic field visualization through colored plasma, violet energy currents flowing through absolute void, teal luminescent sheets perpendicular to viewing angle, fine art interpretation of magnetic field lines, infinite depth created through aurora layering, cosmic weather made aesthetic, ChromaFlora 6-token palette applied to atmospheric physics
--no: representational elements, warm colors, static composition, obvious photography clichés
```

---

## Style 7: Mandala Dissolution

**Art Direction:** Perfect geometric order dissolving into bioluminescent particles. The tension between system and entropy. The philosophical core of ChromaFlora made visual.

**Prompt A (Perfect Dissolution)**
```
sacred mandala dissolving into bioluminescent particle field, center sharp and geometrically perfect, edges dissolving into glowing violet dust, 8-fold symmetry visible in both the sharp mandala and the particle distribution, long exposure photography aesthetic, violet-to-aqua color shift through the dissolution zone, absolute black background, mathematical order becoming organic chaos at edges
--no: full geometric mandala without dissolution, uniform backgrounds, warm colors
```

**Prompt B (Emergence)**
```
bioluminescent particles spontaneously organizing into mandala structure, chaos-to-order visual narrative, individual violet and aqua points clustering into recognizable radial symmetry, the moment before full crystallization, quantum mechanics aesthetic, particle physics made beautiful, ChromaFlora philosophy made tangible (mathematics emerging from void)
--no: complete mandala (capture the emergence moment only), static composition
```

**Prompt C (Multi-scale)**
```
mandala within mandala within mandala, fractal sacred geometry across multiple scales simultaneously, each scale level glowing in different ChromaFlora token color (violet at center, aqua at mid-scale, bloom at edges), infinite regression implied through soft focus at extremes, mathematical self-similarity made photographically beautiful
--no: square grid patterns, non-circular geometry, warm tones
```

---

## Style 8: Quantum Field

**Art Direction:** Probability wave functions as visual phenomena. Heisenberg uncertainty as aesthetic. The mathematics of reality made visible.

**Prompt A (Wave Function)**
```
quantum wave function visualization, probability amplitude rendered as bioluminescent color intensity, violet highest-probability nodes, aqua moderate-probability regions, void for zero-probability, standing waves in multiple interference patterns, fine art scientific visualization, mathematical beauty of quantum mechanics, Feynman diagram aesthetic applied to bioluminescence
--no: representational physics diagrams, text/notation, warm colors, classical wave ripples (use probability clouds)
```

**Prompt B (Entanglement)**
```
quantum entanglement visualization, two bioluminescent particle systems connected across void, violet on left/aqua on right, connection filament as bloom-pink luminescent thread, each particle system displaying correlated internal structure, 97% void background, fine art interpretation of non-local quantum physics, spooky action at a distance made beautiful
--no: arrows/labels, warm colors, large crowded composition
```

---

## Style 9: Synesthetic Soundscapes

**Art Direction:** Music made visible. Frequency as color. Rhythm as form. The philosophical core of the Band and Sonic Waves modules.

**Prompt A (Frequency Field)**
```
musical frequency spectrum rendered as bioluminescent light field, bass frequencies as deep violet masses, mid frequencies as aqua energy, treble as bloom-pink fine particles, frequency distribution following logarithmic musical scale, no waveforms (translate sound to color field not line), fine art audio visualization, ChromaFlora aesthetic applied to music physics
--no: waveform lines, equalizer bars, obvious music visualization clichés
```

**Prompt B (Euclidean Rhythm)**
```
euclidean rhythm pattern visualized as radial geometry, 16 steps arranged in circle, active beats as violet luminous nodes, inactive beats as void, the pattern E(5,16) producing natural asymmetric beauty, bioluminescent point light sources against absolute black, mathematical music theory made visual, 5 evenly-distributed glowing points on a 16-step circle, African musical geometry
--no: drum kit imagery, music notation, warm colors, irregular spacing (the whole point is mathematical evenness)
```

**Prompt C (Harmonic Series)**
```
harmonic overtone series visualization, fundamental frequency as large violet sphere, each harmonic as progressively smaller aqua sphere at mathematical intervals (2x, 3x, 4x frequency), connected by luminescent filaments showing harmonic relationship, sound physics made three-dimensional, bioluminescent interpretation of Fourier decomposition, scientific beauty of acoustic resonance
--no: musical notation, instruments, warm tones
```

---

## Prompt Modifiers (Apply to Any Style)

### Resolution and Quality
```
(Add to end of any prompt for maximum quality)
, ultra high definition, 8K resolution, professional photography, museum quality, no compression artifacts, RAW camera quality
```

### Atmospheric Depth
```
, atmospheric perspective (near elements sharp, distant elements softer), implied infinite depth, void as depth cue, glow intensity as proximity indicator
```

### Organic vs. Geometric Control
```
/* More organic */ , biological irregularity, natural variation, no perfect symmetry
/* More geometric */ , mathematical precision, perfect symmetry, crystalline exactness
```

### Emotional Tone
```
/* Meditative */ , slow revelation, quiet, contemplative, still
/* Electric */ , kinetic energy, dynamic tension, about-to-happen
/* Sacred */ , reverent, ancient, timeless
```

---

## Pollinations Model Guide

| Model | Best For | Style Character |
|-------|---------|----------------|
| `flux` | Most styles | Balanced quality, good for abstract |
| `flux-realism` | Crystal, Aurora, Deep-sea photography | Photorealistic rendering |
| `flux-anime` | Stylized mandala, Synesthetic | Illustrative quality |
| `flux-3d` | Crystal, Geometric | 3D rendered aesthetic |
| `any-dark` | All ChromaFlora styles | Optimized for dark backgrounds |
| `turbo` | Quick iteration | Faster, slightly lower quality |

**Recommendation:** Use `any-dark` for all ChromaFlora prompts. It produces the best results on void backgrounds.

---

## Usage in AI Studio

These prompts are designed to be pasted directly into the AI Studio's prompt input on `ai-studio.html`. The Reverse Image Engineering feature can then analyze the outputs and extract the visual grammar — closing the loop from prompt to image to prompt.

**Workflow:**
1. Generate image using a prompt from this library
2. Save to your generated images gallery
3. Switch to Reverse Image Engineering tab
4. Analyze the generated image
5. The extracted report gives you new vocabulary to refine your next prompt
