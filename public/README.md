# ChromaFlora Portfolio Site

A cosmic bioluminescent design system and portfolio.

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)
1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → Select this repo → Deploy
4. Done! Your site is live.

### Option 2: Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this entire folder onto the page
3. Done! Get your URL instantly.

### Option 3: GitHub Pages
1. Push to GitHub
2. Go to repo Settings → Pages
3. Set source to "main" branch
4. Your site is at `username.github.io/repo-name`

## 📁 Structure

```
chromaflora-site/
├── index.html           ← Main design system showcase
├── swirl-generator.html ← Interactive background generator
├── assets/
│   └── images/          ← Place generated backgrounds here
└── projects/            ← Add project case studies here
```

## 🎨 Pages

- **/** - Full design system with components, gallery, player
- **/swirl-generator.html** - Procedural cosmic background generator

## 🔧 Customization

### Change colors
Edit the CSS custom properties in `index.html`:
```css
:root {
  --accent-purple: #a855f7;
  --accent-cyan: #22d3d8;
  --accent-magenta: #ec4899;
}
```

### Add pages
Create new HTML files in root or `/projects/` folder.
Link to them from index.html navigation.

### Add generated backgrounds
1. Open `/swirl-generator.html`
2. Generate backgrounds you like
3. Click "Save PNG"
4. Place in `/assets/images/`
5. Reference in CSS: `background-image: url('/assets/images/your-bg.png')`

## 📱 Responsive

Both pages are responsive. Test at:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

## ⚡ Performance

- No external dependencies
- Pure HTML/CSS/JS
- ~50KB total (before images)
- Instant load times

## 🌐 Custom Domain

After deploying to Vercel/Netlify:
1. Go to project settings
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

---

Made with ✨ cosmic energy
