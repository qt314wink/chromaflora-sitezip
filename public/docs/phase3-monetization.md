# ChromaFlora — Monetization Architecture & Pricing
**Phase 3 · May 2026**

---

## Pricing Philosophy

ChromaFlora's monetization must honor three principles:
1. **Full creative access stays free** — no paywalling of generative art, sequencer, or mandala
2. **Pro features enhance output** — higher resolution, more exports, API access, embedding
3. **Community is never gated** — discovery, challenges, and sharing are always free

This matches the "Notion / Figma / Canva free tier" precedent: free makes the product viral, pro converts the power users.

---

## Pricing Tiers

### Tier 0: Explorer (Free Forever)
**Price:** $0/month
**Tagline:** "Create without limits. Save without servers."

**Included:**
- All 6 studio modules (Studio, Mandala, Waves, Band, AI Studio, Discover)
- Unlimited Pollinations.ai image generation
- Full step sequencer (8 tracks × 32 steps, all algorithms)
- Full mandala generator (all 6 patterns, all parameters)
- Discovery engine (all 24 cards, all 9 territories)
- ASMR module (all binaural presets)
- localStorage save/load
- PNG export (1× screen resolution)
- Embed code generation (basic, 400×400)
- Community challenges participation
- Social sharing with attribution

**Limits:**
- PNG export: 1× resolution only
- No JSON state export
- No API access
- Embed: max 1 size (400×400)

---

### Tier 1: Creator Pro ($19/month | $190/year — save 17%)
**Tagline:** "Your creative system, amplified."

**Everything in Explorer, plus:**
- PNG export at 2× and 4× resolution (up to 4096px)
- JSON state export (save any configuration as a portable file)
- Standalone HTML export (single-file, self-playing artifact — the killer feature)
- Embed code for any size (up to 1920×1080)
- Batch generation (generate 10 images at once)
- Generation history: 500 images (vs. 50 in free)
- Mandala seeds library: save 100 configurations (vs. 10)
- ASMR: custom binaural frequency input (vs. presets only)
- Priority support (email response <48h)
- Creator badge in community
- Monthly "system seed" drops (exclusive pre-configured ChromaFlora starting points)

**Target:** Individual artists, music producers, content creators, art students

---

### Tier 2: Studio Pro ($49/month | $490/year — save 17%)
**Tagline:** "Build with ChromaFlora. Deliver to the world."

**Everything in Creator Pro, plus:**
- API access (REST endpoint for generating Pollinations images via ChromaFlora's prompt system)
- White-label embed (remove ChromaFlora branding from iframes)
- Custom domain embed (serve iframes from your domain)
- SVG export for all generative art (vector, infinite scale)
- GCode export for all patterns (pen plotter / AxiDraw ready)
- Animation export: WebM video of mandala/waves/sequencer (30 sec, 1080p)
- Team workspace: 3 seats (share a library of saved configurations)
- Webhook: trigger generation from external tools
- Priority support (<24h)
- Beta features access (see new modules before public release)

**Target:** Design studios, music visualization artists, agencies doing one-off projects

---

### Tier 3: Agency ($199/month | $1990/year — save 17%)
**Tagline:** "ChromaFlora as your creative infrastructure."

**Everything in Studio Pro, plus:**
- Unlimited team seats
- Client workspace: create isolated environments per client
- Custom branding: your logo, your colors in the system (design system override)
- SLA: 99.9% uptime guarantee (when deployed)
- White-glove onboarding (60-min setup call with Jennipher)
- Custom training session for team (90 min)
- Dedicated Slack channel for support
- Priority feature requests
- Co-branding opportunities (ChromaFlora × [Your Studio] case studies)

**Target:** Creative agencies, design studios, music production houses, UX consultancies

---

### Tier 4: Enterprise (Custom Pricing)
**Contact:** jennipher@melodicbloom.com

**Includes:**
- All Agency features
- Source code license (deploy on your infrastructure)
- Custom feature development (e.g., branded color system, custom algorithms)
- Annual contract with SLA
- IP licensing for the design system
- White-label complete rebranding

**Target:** Brands, media companies, record labels, educational institutions

---

## Checkout Flow Architecture

### For Free → Creator Pro

```
User hits pro feature (e.g., 4× export)
    │
    ▼
ProModal opens:
  "This feature is in Creator Pro ($19/mo)"
  [Try it free for 7 days] [See all Pro features]
    │
    ▼
Click "Try free":
  Stripe Checkout (or LemonSqueezy for solo)
  - Email collection (only required field)
  - Card details
  - 7-day trial, cancel anytime
    │
    ▼
Success:
  localStorage.setItem('cf_pro_tier', 'creator')
  localStorage.setItem('cf_pro_until', timestamp+7days)
  Aurora flash animation
  New features unlock
```

### Stripe Integration Pattern (when API key ready)

```javascript
// Minimal checkout without backend (using Stripe Payment Links)
const STRIPE_LINKS = {
  creator_monthly: 'https://buy.stripe.com/[CREATOR_MONTHLY_LINK]',
  creator_annual:  'https://buy.stripe.com/[CREATOR_ANNUAL_LINK]',
  studio_monthly:  'https://buy.stripe.com/[STUDIO_MONTHLY_LINK]',
  studio_annual:   'https://buy.stripe.com/[STUDIO_ANNUAL_LINK]',
  agency_monthly:  'https://buy.stripe.com/[AGENCY_MONTHLY_LINK]',
};

// Check pro status (honor system + localStorage, upgrade to Stripe webhook later)
function cfIsPro(tier = 'creator') {
  const proTier = localStorage.getItem('cf_pro_tier');
  const proUntil = parseInt(localStorage.getItem('cf_pro_until') || '0');
  const tierRank = { creator: 1, studio: 2, agency: 3, enterprise: 4 };
  const requiredRank = tierRank[tier] || 1;
  const userRank = tierRank[proTier] || 0;
  return userRank >= requiredRank && Date.now() < proUntil;
}
```

### LemonSqueezy (Alternative, No Backend)

LemonSqueezy supports static site checkout with webhook-less license key validation:
- Generate a license key on purchase
- User enters key in ChromaFlora settings
- LocalStorage stores the key
- Feature flags unlock based on key prefix (e.g., `CF-PRO-`, `CF-STUDIO-`)

```javascript
function cfActivateLicense(key) {
  if (key.startsWith('CF-PRO-')) {
    localStorage.setItem('cf_license', key);
    localStorage.setItem('cf_pro_tier', 'creator');
    localStorage.setItem('cf_pro_until', Date.now() + 365*24*60*60*1000);
    triggerAurora();
    return true;
  }
  // etc.
  return false;
}
```

---

## Product Offer Suite

### Offer 1: "ChromaFlora Starter Kit" — $0 (lead magnet)
**What:** A downloadable JSON bundle of 10 curated ChromaFlora configurations:
- 3 mandala seeds (lotus, galaxy, chaos)
- 3 sequencer patterns (Euclidean 5/16, Son Clave, Logistic Map)
- 3 AI generation prompt templates
- 1 "Frequency" podcast episode script template
**Format:** JSON + PDF
**CTA:** "Download free. No email required." (email optional for updates)
**Purpose:** Demonstrates system depth, builds email list

### Offer 2: "Creative System Bootcamp" — $97 (one-time)
**What:** A 5-day email course teaching ChromaFlora's design philosophy:
- Day 1: Bioluminescent Design Principles
- Day 2: Euclidean Rhythm Theory + Band.html walkthrough
- Day 3: Reverse Image Engineering for Prompt Writing
- Day 4: Building Your Personal Aesthetic System
- Day 5: Sharing Your Work / Community Participation
**Format:** 5 emails + 5 guided exercises in ChromaFlora
**Delivery:** Automated email sequence

### Offer 3: "Custom ChromaFlora System Build" — $497 (custom project)
**What:** Jennipher builds a custom ChromaFlora configuration for your project:
- Custom color token set (not the default 6 tokens)
- 3 mandala configurations representing your brand
- 5 sequencer patterns representing your sonic identity
- Complete documentation of the system
**Delivery:** 5 business days, 2 revision rounds
**Target:** Small brands, musicians, artists wanting a personal design system

### Offer 4: "Agency White-Label License" — $1500/year
**What:** Full white-label ChromaFlora for your agency:
- Remove all ChromaFlora branding
- Add your agency's visual identity
- Customized color token system
- Deployed on your domain
- Ongoing support
**Target:** Creative agencies

---

## Revenue Projections (Year 1)

| Source | Users | Conversion | MRR |
|--------|-------|-----------|-----|
| Explorer → Creator Pro | 5,000 free | 3% | 150 × $19 = $2,850 |
| Creator Pro → Studio Pro | 150 pro | 10% | 15 × $49 = $735 |
| Agency | Cold outreach | 5 agencies | 5 × $199 = $995 |
| Starter Kit (emails) | — | — | $0 (lead magnet) |
| Bootcamp course | 500 leads | 2% | 10 × $97 = $970 one-time |
| Custom builds | — | 2/mo | 2 × $497 = $994 one-time |

**Conservative Year 1 MRR target:** ~$5,500 → **$66K ARR**

---

## Pricing Page Copy

### Hero
**Headline:** "Create without compromise. Upgrade when you're ready."
**Subhead:** "ChromaFlora's full creative engine is free, forever. Pro features give your work a longer life and a wider reach."

### Objection Handling
- **"Is the free tier really free?"** Yes. Every generative feature — mandala, sequencer, AI studio, discovery, ASMR — is free. Pro features are for taking your work further (higher resolution, exports, embedding).
- **"Why should I upgrade?"** If you want to share a self-playing mandala, export a 4K print, or embed your sequencer in your portfolio — that's Pro territory.
- **"What if I cancel?"** Your work stays in your browser's localStorage. Nothing is lost. You just lose access to Pro features.

---

## Feature Gates Implementation

```javascript
// Centralized feature gate system
const CF_FEATURES = {
  export_2x:         { tier: 'creator', locked: true },
  export_4x:         { tier: 'creator', locked: true },
  export_json:       { tier: 'creator', locked: true },
  export_standalone: { tier: 'creator', locked: true },
  export_svg:        { tier: 'studio',  locked: true },
  export_video:      { tier: 'studio',  locked: true },
  embed_custom_size: { tier: 'creator', locked: true },
  embed_white_label: { tier: 'studio',  locked: true },
  api_access:        { tier: 'studio',  locked: true },
  batch_generate:    { tier: 'creator', locked: true },
  custom_binaural:   { tier: 'creator', locked: true },
  history_500:       { tier: 'creator', locked: true },
  team_workspace:    { tier: 'studio',  locked: true },
};

function cfGate(featureKey) {
  const feature = CF_FEATURES[featureKey];
  if (!feature) return true; // unknown features are unlocked
  return cfIsPro(feature.tier);
}
```
