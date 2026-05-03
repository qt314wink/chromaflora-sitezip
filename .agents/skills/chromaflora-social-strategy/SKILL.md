---
name: chromaflora-social-strategy
description: ChromaFlora v5.0 social media strategy, content pillars, GEO/SEO plan, and posting framework for Jennipher Troup (@halcyonminx). Load when generating social posts, content calendars, captions, TikTok scripts, podcast scripts, or SEO/GEO content for ChromaFlora. Contains brand voice, platform specs, hook formulas, and schema markup templates.
---

# ChromaFlora Social Strategy Skill

## When to Use

- Writing captions or scripts for any ChromaFlora social content
- Planning content calendar or scheduling posts
- Generating SEO meta tags or schema markup for ChromaFlora pages
- Writing podcast scripts for "The Frequency" show
- Creating TikTok/Reels storyboards for ChromaFlora
- Drafting LinkedIn posts about ChromaFlora's philosophy
- Planning a content series around a ChromaFlora feature

---

## Brand Voice Quick Reference

**Do**: Specific, precise, curious, otherworldly, expert-casual
**Don't**: Promotional, generic, "excited to share", emoji-heavy, conventional

**ChromaFlora voice test**: Would this sound like it was transmitted from deep ocean or deep space? Is it genuinely strange and precise?

**Banned openers**: "Excited to share…" / "Check this out!" / "Here's a thread 🧵" / "In today's fast-paced world"

---

## The Five Content Pillars

1. **Math Behind the Beauty** — Euclidean rhythms, logistic map chaos, simplex noise, Bjorklund algorithm
2. **Design System Philosophy** — Bioluminescence as principle, anti-engagement-loop design, beauty as infrastructure
3. **Generative Output** — Mandala exports, sequencer recordings, reverse-engineered prompts
4. **Discovery Engine** — Card shares, mystery question reveals, cross-territory connections
5. **Agency Building** — Code snippets, design decisions explained, how-I-built-X series

---

## Platform-Specific Rules

### Instagram (primary visual platform)
- Image format: 1080×1080 (square) or 1080×1350 (portrait 4:5)
- Caption: 3–5 sentences. Hook within first 125 chars.
- Hashtags: 5 max, embedded in caption (not separate)
- Stories: 1080×1920, safe zone 14%–80% vertical
- Post: 3× per week

**Hook formulas:**
- Observation: "Every culture that makes music independently develops the same rhythm. Here's the math."
- Question: "What's the difference between a mandala and a noise field? One has intent."
- Inverse: "I stopped using design software. Here's what happened."

### TikTok (algorithm + growth)
- Duration sweet spot: 21–34 seconds
- Hook must fire in 0–2 seconds
- Caption SEO: front-load keywords ("Euclidean rhythm explained • generative music • step sequencer")
- Series: "What question is this?" / "Math behind the sound" / "I turned this into sound"

**Hook scripts:**
- "The rhythm of African drums, Cuban clave, and Turkish folk music are the same mathematical pattern — let me show you."
- "I built a music tool that only makes beautiful accidents."
- "This is what color theory looks like when designed by someone who has never seen the sun."

### Twitter/X (ideas + threads)
- Hook in 280 chars, even with premium account
- Best content: single insight + image, threads, community questions
- Example hook: "Bjorklund's algorithm was designed for nuclear reactor fuel rod placement in 1982. It's also the basis for every compelling drum pattern in recorded history."

### LinkedIn (professional + philosophy)
- Hook: 110 chars max (mobile truncation)
- Body: 800–1000 chars total
- Angle: design systems thinking, engineering as creative practice, anti-optimization
- Strong hook: "I designed a system that actively fights against its own engagement optimization."

### YouTube
- Series 1: "ChromaFlora Explained" (10–15 min, scripted)
- Series 2: "Creative Sessions" (20–40 min, unscripted)
- Thumbnails: 1280×720, ChromaFlora aesthetic on void background

---

## Weekly Content Minimum

| Day | Platform | Content Type |
|-----|---------|-------------|
| Monday | LinkedIn | Philosophy insight post |
| Tuesday | TikTok | "What question is this?" card |
| Wednesday | Instagram | Mandala export |
| Thursday | Twitter/X | Algorithm/math insight |
| Friday | Instagram Stories | Behind the scenes |
| Saturday | TikTok | "Math behind the sound" |
| Sunday | — | Write next week's scripts |

---

## Podcast: "The Frequency"

- Format: Solo explainer, 10–15 min
- Host: Jennipher Troup
- Opening catchphrase: "Welcome to The Frequency. I'm Jennipher Troup. Let's talk about something unexpected."
- Recurring segment: "Today's Discovery" — narrate one discovery engine card
- Episodes: use podcast-generator skill for scripting, Web Speech API for draft, ElevenLabs for final

**First 6 episode topics:**
1. "The Rhythm of the Universe: Why Euclidean Patterns Appear Everywhere"
2. "Bioluminescence as a Design System: Beauty That Serves Function"
3. "The Anti-Feedback Loop: Designing Software That Fights Itself"
4. "Reverse Engineering Beauty: Visual Grammar Extraction"
5. "Mathematics of Flow: Designing for Altered States"
6. "The Question Behind the Answer: Inquiry-First Community"

---

## GEO Content Requirements

Every ChromaFlora page needs:
1. **Direct answer block** in first 40–60 words of body
2. **Unique, descriptive `<title>`** (not just "ChromaFlora")
3. **`<meta name="description">`** that answers "what does this page do?" in 140-160 chars
4. **JSON-LD schema markup** (WebApplication + Person author)
5. **At least 3 statistics or specific claims** per page/doc

**Target AI queries:**
- "What is a bioluminescent design system?"
- "How does the Bjorklund algorithm work?"
- "How to build a step sequencer with Tone.js"
- "Free AI image generation browser"
- "Anti-feedback-loop discovery algorithm"

---

## Schema Template (all pages)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ChromaFlora",
  "author": { "@type": "Person", "name": "Jennipher Troup", "alternateName": "@halcyonminx" },
  "description": "[page-specific description]",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "keywords": "bioluminescent design system, step sequencer, mandala generator, generative art"
}
</script>
```

---

## Competitive Intelligence Monitoring

Google Alerts to activate:
- https://www.google.com/alerts?q=bioluminescent+design+system
- https://www.google.com/alerts?q=generative+design+studio+browser
- https://www.google.com/alerts?q=euclidean+rhythm+generator

Communities to engage: r/generative, r/webaudio, Creative Code community, Codrops

Collaboration targets: @Nervous_System (generative jewelry), @patternsinchaos, IRCAM Paris
