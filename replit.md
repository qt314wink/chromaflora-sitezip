# ChromaFlora Design System v4.0
**Creator:** Jennipher Troup — girlwithstarryeyes@outlook.com · @halcyonminx

A cosmic bioluminescent design system and portfolio built with pure HTML/CSS/JS. No dependencies, no external images — all visuals are procedural Canvas 2D or CSS.

## Server
`python3 -m http.server 8000 --directory public`

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Main landing — 18-tile live gallery, hero, stats |
| `projects.html` | Void drift project portfolio with physics cards |
| `player.html` | ChromaSynth — 7-genre Web Audio procedural synthesizer |
| `studio.html` | Art Studio — layered canvas + paint pour physics |
| `tokens.html` | Design token browser |
| `components.html` | Interactive component lab |
| `blog.html` | Blog — fractal image grid, scroll reveal, search, expandable articles |
| `about.html` | About page — Jennipher Troup, socials, services |
| `gallery.html` | Creator gallery — shared art + songs from the community |
| `admin.html` | Password-protected admin dashboard — CMS, content moderation, email list |
| `swirl-generator.html` | Procedural swirl art generator |

## Core JS
| File | Purpose |
|------|---------|
| `effects.js` | 18 canvas effect renderers + hover/click interactions |
| `drawer.js` | Global interaction system (Drawer, Modal, FloatWidget, Dropdown, EraserList, PageTransitions, MicroInteractions) |
| `player-bar.js` | Persistent cross-page music player bar (fixed bottom bar, all pages except player.html) |

## Key Features

### 🎵 Persistent Music Player (player-bar.js)
- Fixed 62px bottom bar on every page
- Web Audio synthesizer — 7 genres: Lofi (75), Ambient (50), R&B (92), Techno (132), Jazz (115), House (128), Liquid Dub (172 BPM)
- State persisted via `localStorage.cf_player` — auto-resumes on page load
- Mini frequency visualizer, genre cycling, volume control
- On `player.html`, auto-detects and defers to the full player
- Exposes `window.CFPlayer` globally for cross-page control

### 🎨 Creator System
- **Art Studio**: "Share to Gallery" button → prompts for username + caption → saves to `localStorage.cf_artworks`
- **ChromaSynth**: "Save Song" button → prompts for nickname + title → saves to `localStorage.cf_songs`
- **Gallery page**: Shows all shared art (with thumbnail) and songs (with waveform + play)
- Download: art downloads as PNG, songs as metadata text + info for external editors
- Share: Web Share API (native) with Instagram/Twitter/copy link fallback

### 🎨 Art Studio
- Multi-layer canvas (Brush, Eraser, Pour, Swirl, Fill, Rect, Ellipse, Line, Stamp)
- Paint pour physics: gravity/viscosity/tension, 4 modes
- Swirl: pixel displacement engine
- Export PNG + Share to Gallery
- Fixed NaN guard on radial gradient brush drawing

### 🎵 ChromaSynth Player
- 7 genre modes with unique chord progressions, beat scheduling, synthesis
- Per-genre oscillator type, filter freq, reverb mix
- Save Song with creator nickname + title stored to community gallery
- Share via native share API or clipboard

### 📓 Blog
- 8 articles with unique fractal Julia set thumbnails (procedural Canvas, no images)
- IntersectionObserver scroll reveal
- Real-time search + category filter chips
- Click to expand: full-length modal with fractal art header
- Newsletter signup → `localStorage.cf_subscribers`
- Fetches CMS posts from `localStorage.cf_blog_posts` (admin-added posts show here)

### 🔐 Admin Dashboard
- First-visit: creates username+password stored in `localStorage.cf_admin_creds`
- Sidebar navigation: Overview, Artworks, Songs, Blog CMS, Subscribers, Settings
- Overview stats: artwork count, song count, subscriber count, blog post count
- Content moderation: view + delete any shared artwork or song
- Blog CMS: rich text post editor with category, tags, excerpt → saved to `localStorage.cf_blog_posts`
- Email list: view all subscribers, export as CSV
- Settings: change password, danger zone (clear all content types)

### 🌌 About Page
- Jennipher Troup hero with bioluminescent particle canvas background
- Mini mandala animation in avatar area
- Social links: Instagram (/halcyonminx), Facebook (/halcyonminx), LinkedIn, Email
- Services section with 6 service cards
- Inquiry CTA → mailto:girlwithstarryeyes@outlook.com with pre-filled subject
- Links to all site sections

### 🔭 Projects — Theme Physics
Each void-drift card has an overlay canvas with theme-specific physics:
1. **ChromaFlora Core** → orbiting glow orbs (purple/aqua/pink)
2. **Neon Liquid** → neon drip streaks flowing down
3. **Plasma Interface** → electric arc lightning bolts
4. **Cosmic Tide OS** → orbital rings with animated dots
5. **Acid Pour Studio** → bubbles rising upward
6. **Crystal Formation** → shard geometric spikes radiating
7. **Deep Space Atlas** → rotating star constellation
8. **Watercolor Engine** → soft color bloom spheres

Click any card → burst of theme-colored particles.

### 🔍 SEO (all pages)
- `<meta name="description">`
- `<meta name="keywords">`
- `<meta name="author" content="Jennipher Troup">`
- Open Graph tags (og:title, og:description, og:type)
- Twitter card + `@halcyonminx` creator tag
- JSON-LD structured data on index.html

## Design Tokens
- `--t-snap: 0.1s cubic-bezier(0.4,0,0.2,1)` — 100ms micro-interactions
- `--t-spring: 0.4s cubic-bezier(0.34,1.56,0.64,1)` — spring bounce
- Colors: `--purple:#a855f7` `--aqua:#22d3ee` `--pink:#ec4899` `--orange:#f97316` `--green:#10b981`
- No `background-image` URLs ever — pure CSS gradients + Canvas only

## localStorage Keys
| Key | Content |
|-----|---------|
| `cf_player` | `{genreIdx, isPlaying, volume, isMuted, bpmOffset}` |
| `cf_artworks` | `[{id, username, prompt, dataUrl, timestamp}]` |
| `cf_songs` | `[{id, nickname, title, genre, bpm, tags, timestamp}]` |
| `cf_subscribers` | `["email@example.com", ...]` |
| `cf_blog_posts` | `[{id, title, cat, read, excerpt, body, tags, date, colorA, colorB}]` |
| `cf_admin_creds` | `{user, pass}` |
