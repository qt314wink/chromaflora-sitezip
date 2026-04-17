# ChromaFlora Design System v5.0
**Creator:** Jennipher Troup — girlwithstarryeyes@outlook.com · @halcyonminx

A cosmic bioluminescent design system and portfolio — pure HTML/CSS/JS, no external images, all procedural Canvas 2D + CSS.

## Server
`python3 -m http.server 8000 --directory public`

## Pages (14 total)
| File | Purpose |
|------|---------|
| `index.html` | Main landing — 18-tile live gallery, hero, stats |
| `projects.html` | Void drift project portfolio with theme-physics cards |
| `player.html` | ChromaSynth — 7-genre Web Audio procedural synthesizer |
| `studio.html` | Art Studio — layered canvas + 12 style presets + paint pour + remix |
| `tokens.html` | Design token browser |
| `components.html` | Interactive component lab |
| `blog.html` | Blog — fractal image grid, scroll reveal, search, expandable articles |
| `about.html` | About — Jennipher Troup, socials, services |
| `gallery.html` | Creator gallery — upvotes, comments, remix, trending, featured creators |
| `profile.html` | Creator profile — avatar, stats, artworks, songs, bio edit |
| `marketplace.html` | Marketplace — asset packs (4), commission board, NFT callout |
| `challenges.html` | Challenges + leaderboard — 4 challenges, entry system, ranked creators |
| `admin.html` | Password-protected CMS dashboard |
| `swirl-generator.html` | Procedural swirl art generator |

## Core JS
| File | Purpose |
|------|---------|
| `effects.js` | 18 canvas effect renderers + hover/click interactions |
| `drawer.js` | Global interaction system (Drawer, Modal, Dropdown, PageTransitions, MicroInteractions) |
| `player-bar.js` | Persistent cross-page music player bar (fixed bottom, all pages except player.html) |

## Key Feature Systems

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

## Design Tokens
- `--t-snap: 0.1s cubic-bezier(0.4,0,0.2,1)` — 100ms micro-interactions
- `--t-spring: 0.4s cubic-bezier(0.34,1.56,0.64,1)` — spring bounce
- Colors: `--purple:#a855f7` `--aqua:#22d3ee` `--pink:#ec4899` `--orange:#f97316` `--green:#10b981`
- No `background-image` URLs — pure CSS gradients + Canvas only

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
