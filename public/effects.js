/**
 * ChromaFlora Effects Engine v3.0
 * Bioluminescent Cosmic Interface System
 * =======================================
 * - WebGL-style Canvas Nebula Particle Field
 * - Magnetic Button / Element Attraction
 * - 3D Tilt with Specular Highlight
 * - Scroll Reveal with Stagger
 * - Text Scramble Cipher
 * - Ripple Click Effect
 * - Mouse Parallax Depth
 * - Cursor Sparkle Trail
 * - Dynamic Waveform
 * - Film Grain Noise Overlay
 */

'use strict';

/* ═════════════════════════════════════════════════
   1. NEBULA PARTICLE CANVAS
   Full-screen WebGL-style bioluminescent particle field
   Particles drift, glow, and connect with light threads
═════════════════════════════════════════════════ */
(function NebulaField() {
  const canvas = document.getElementById('nebulaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [
    [168, 85,  247],  // iris
    [ 34, 211, 216],  // aqua
    [236,  72, 153],  // bloom
    [249, 115,  22],  // ember
    [  6, 182, 212],  // cyan
    [ 16, 185, 129],  // viridian
  ];

  let W, H, particles, mouse = { x: -9999, y: -9999 };
  const COUNT = 90;
  const CONNECT_DIST = 140;
  const MOUSE_REPEL  = 100;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function Particle() {
    this.reset = function() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2.2 + 0.8;
      this.rgb = randomColor();
      this.alpha = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.glowR = Math.random() * 14 + 6;
    };
    this.reset();
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawParticle(p, t) {
    const pulse = 0.5 + 0.5 * Math.sin(t * p.pulseSpeed + p.pulseOffset);
    const a = p.alpha * (0.6 + 0.4 * pulse);
    const r = p.r * (0.8 + 0.2 * pulse);
    const gR = p.glowR * (0.7 + 0.3 * pulse);

    const [rc, gc, bc] = p.rgb;

    // Outer glow
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gR);
    grad.addColorStop(0, `rgba(${rc},${gc},${bc},${a * 0.9})`);
    grad.addColorStop(0.5, `rgba(${rc},${gc},${bc},${a * 0.3})`);
    grad.addColorStop(1, `rgba(${rc},${gc},${bc},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, gR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rc},${gc},${bc},${Math.min(a * 1.4, 1)})`;
    ctx.fill();
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * 0.12;
          const [ra, ga, ba] = a.rgb;
          const [rb, gb, bb] = b.rgb;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${ra},${ga},${ba},${opacity})`);
          grad.addColorStop(1, `rgba(${rb},${gb},${bb},${opacity})`);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    t++;

    // Large drifting glow orbs
    const orbs = [
      { cx: W * 0.15 + Math.sin(t*0.003) * 80, cy: H * 0.2 + Math.cos(t*0.004) * 60, r: 300, rgb: [168,85,247], a: 0.06 },
      { cx: W * 0.85 + Math.sin(t*0.004+2) * 70, cy: H * 0.8 + Math.cos(t*0.003+1) * 50, r: 280, rgb: [34,211,216], a: 0.05 },
      { cx: W * 0.5 + Math.sin(t*0.002+4) * 120, cy: H * 0.5 + Math.cos(t*0.003+3) * 90, r: 220, rgb: [236,72,153], a: 0.04 },
    ];
    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.cx, o.cy, 0, o.cx, o.cy, o.r);
      g.addColorStop(0, `rgba(${o.rgb.join(',')},${o.a})`);
      g.addColorStop(1, `rgba(${o.rgb.join(',')},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(o.cx, o.cy, o.r, o.r * 0.6, t * 0.001, 0, Math.PI * 2);
      ctx.fill();
    });

    // Update and draw particles
    for (const p of particles) {
      // Mouse repel
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.sqrt(mdx*mdx + mdy*mdy);
      if (md < MOUSE_REPEL && md > 0) {
        const force = (MOUSE_REPEL - md) / MOUSE_REPEL * 0.8;
        p.vx += (mdx / md) * force;
        p.vy += (mdy / md) * force;
      }

      // Drag
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Max speed
      const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if (spd > 1.5) { p.vx = p.vx/spd*1.5; p.vy = p.vy/spd*1.5; }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      drawParticle(p, t);
    }

    drawConnections();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  init();
  animate();
})();


/* ═════════════════════════════════════════════════
   2. 3D CARD TILT + SPECULAR HIGHLIGHT
   Cards respond to mouse with 3D perspective rotation
   and a moving specular light point
═════════════════════════════════════════════════ */
(function CardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    const MAX_TILT = 14;
    const PERSPECTIVE = 900;
    let raf = null;
    let targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0;

    // Create specular highlight element
    const spec = document.createElement('div');
    spec.className = 'tilt-spec';
    spec.style.cssText = `
      position: absolute; pointer-events: none; z-index: 10;
      width: 120px; height: 120px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0; top: 50%; left: 50%;
    `;
    if (getComputedStyle(card).position === 'static') {
      card.style.position = 'relative';
    }
    card.appendChild(spec);

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      targetRX = -dy * MAX_TILT;
      targetRY =  dx * MAX_TILT;

      // Specular
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top)  / rect.height) * 100;
      spec.style.left    = sx + '%';
      spec.style.top     = sy + '%';
      spec.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      targetRX = 0; targetRY = 0;
      spec.style.opacity = '0';
    });

    function loop() {
      currentRX += (targetRX - currentRX) * 0.12;
      currentRY += (targetRY - currentRY) * 0.12;
      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
      raf = requestAnimationFrame(loop);
    }
    loop();
  });
})();


/* ═════════════════════════════════════════════════
   3. MAGNETIC BUTTON ATTRACTION
   Buttons within proximity attract to cursor
═════════════════════════════════════════════════ */
(function MagneticButtons() {
  const els = document.querySelectorAll('.magnetic');

  els.forEach(el => {
    const STRENGTH  = 0.35;
    const RADIUS    = 90;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;

    function loop() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const bx = rect.left + rect.width  / 2;
      const by = rect.top  + rect.height / 2;
      const dx = e.clientX - bx;
      const dy = e.clientY - by;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < RADIUS) {
        tx = dx * STRENGTH;
        ty = dy * STRENGTH;
        el.style.transition = 'none';
      } else {
        tx = 0; ty = 0;
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    });

    el.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  });
})();


/* ═════════════════════════════════════════════════
   4. SCROLL REVEAL — IntersectionObserver stagger
   Elements animate in as they enter viewport
═════════════════════════════════════════════════ */
(function ScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay * 1000);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();


/* ═════════════════════════════════════════════════
   5. TEXT SCRAMBLE CIPHER
   Letters shuffle randomly before resolving to real text
═════════════════════════════════════════════════ */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾛﾝﾀﾈｴｷﾃﾑﾕﾗｾﾈｽﾀﾂｷ01アイウエオカキクケコ∆Ωπ∑√∞≠≈';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const old = this.el.innerText;
    const len = Math.max(old.length, newText.length);
    return new Promise(resolve => {
      const chars = [];
      let frame = 0;
      const maxFrames = 24;
      const update = () => {
        let out = '';
        for (let i = 0; i < len; i++) {
          if (i < newText.length) {
            const progress = (frame - i * 1.2) / maxFrames;
            if (progress > 1) {
              out += newText[i];
            } else if (progress > 0) {
              out += this.chars[Math.floor(Math.random() * this.chars.length)];
            } else {
              out += this.chars[Math.floor(Math.random() * this.chars.length)];
            }
          }
        }
        this.el.innerHTML = out;
        frame++;
        if (frame < maxFrames + newText.length * 1.2) {
          requestAnimationFrame(update);
        } else {
          this.el.innerHTML = newText;
          resolve();
        }
      };
      requestAnimationFrame(update);
    });
  }
}

// Apply to elements with data-scramble
(function initScramble() {
  document.querySelectorAll('[data-scramble]').forEach(el => {
    const scrambler = new TextScramble(el);
    const original  = el.textContent.trim();
    const hover     = el.dataset.scramble || original;

    el.addEventListener('mouseenter', () => scrambler.setText(hover));
    el.addEventListener('mouseleave', () => scrambler.setText(original));
  });

  // Hero title auto-scramble on load
  const heroTitle = document.querySelector('.hero-h1');
  if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.scramble-line');
    lines.forEach((line, i) => {
      const sc = new TextScramble(line);
      setTimeout(() => sc.setText(line.dataset.text), 300 + i * 200);
    });
  }
})();


/* ═════════════════════════════════════════════════
   6. RIPPLE CLICK EFFECT
   Material-inspired ripple on all buttons + interactive els
═════════════════════════════════════════════════ */
(function RippleEffect() {
  const RIPPLE_COLORS = {
    'btn-primary': 'rgba(255,255,255,0.35)',
    'btn-glass':   'rgba(34,211,216,0.4)',
    'btn-clay':    'rgba(168,85,247,0.4)',
    'chip':        'rgba(168,85,247,0.3)',
    'gallery-tile':'rgba(255,255,255,0.15)',
  };

  function getColor(el) {
    for (const cls in RIPPLE_COLORS) {
      if (el.classList.contains(cls)) return RIPPLE_COLORS[cls];
    }
    return 'rgba(255,255,255,0.2)';
  }

  function ripple(e) {
    const el = e.currentTarget;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2.5;

    const rip = document.createElement('span');
    rip.style.cssText = `
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      background: ${getColor(el)};
      width: ${size}px; height: ${size}px;
      left: ${x - size/2}px; top: ${y - size/2}px;
      transform: scale(0);
      animation: ripple-expand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      z-index: 100;
    `;
    el.appendChild(rip);
    rip.addEventListener('animationend', () => rip.remove());
  }

  document.querySelectorAll('.btn, .chip, .gallery-tile, .morph-card, .nav-pill, .token-swatch, .filter-chip').forEach(el => {
    el.addEventListener('click', ripple);
  });
})();


/* ═════════════════════════════════════════════════
   7. MOUSE PARALLAX — Hero depth layers
   Different elements move at different rates
═════════════════════════════════════════════════ */
(function MouseParallax() {
  const layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length) return;

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function tick() {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;

    layers.forEach(el => {
      const depth = parseFloat(el.dataset.parallax || 1);
      const tx = cx * depth * 20;
      const ty = cy * depth * 14;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });
    requestAnimationFrame(tick);
  }
  tick();
})();


/* ═════════════════════════════════════════════════
   8. CURSOR SPARKLE TRAIL
   Small DOM particles spawn at cursor, fade+float away
═════════════════════════════════════════════════ */
(function CursorSparkle() {
  const COLORS = ['#a855f7','#22d3d8','#ec4899','#67e8f9','#f472b6','#c084fc'];
  let lastX = 0, lastY = 0, frame = 0;
  const pool = [];

  function spawn(x, y) {
    let spark = pool.pop();
    if (!spark) {
      spark = document.createElement('div');
      spark.style.cssText = `
        position: fixed; pointer-events: none; z-index: 9998;
        border-radius: 50%;
        mix-blend-mode: screen;
      `;
      document.body.appendChild(spark);
    }

    const size = Math.random() * 6 + 3;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    const life  = 600 + Math.random() * 400;
    const vx    = Math.cos(angle) * speed;
    const vy    = Math.sin(angle) * speed - 1.5; // slight upward drift

    let sx = x + (Math.random() - 0.5) * 12;
    let sy = y + (Math.random() - 0.5) * 12;
    let elapsed = 0;
    const start = performance.now();

    spark.style.width  = size + 'px';
    spark.style.height = size + 'px';
    spark.style.background = color;
    spark.style.boxShadow = `0 0 ${size*2}px ${color}`;
    spark.style.left = sx + 'px';
    spark.style.top  = sy + 'px';
    spark.style.opacity = '1';
    spark.style.display = 'block';

    const animate = (now) => {
      elapsed = now - start;
      const t = elapsed / life;
      if (t >= 1) {
        spark.style.display = 'none';
        pool.push(spark);
        return;
      }
      sx += vx * 0.6;
      sy += vy * 0.6;
      spark.style.left    = sx + 'px';
      spark.style.top     = sy + 'px';
      spark.style.opacity = (1 - t * t).toString();
      spark.style.transform = `scale(${1 - t * 0.5})`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  let throttle = 0;
  window.addEventListener('mousemove', e => {
    throttle++;
    if (throttle % 3 !== 0) return; // every 3rd move event
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const speed = Math.sqrt(dx*dx + dy*dy);
    if (speed > 4) {
      const count = Math.floor(speed / 8) + 1;
      for (let i = 0; i < Math.min(count, 4); i++) spawn(e.clientX, e.clientY);
    }
    lastX = e.clientX; lastY = e.clientY;
  });
})();


/* ═════════════════════════════════════════════════
   9. DYNAMIC WAVEFORM — Real-time sine animation
   Audio waveform bars animate with live math
═════════════════════════════════════════════════ */
(function DynamicWaveform() {
  const bars = document.querySelectorAll('.waveform-bar');
  if (!bars.length) return;

  const count = bars.length;
  let t = 0;
  const freqs = Array.from({ length: count }, (_, i) => 0.08 + i * 0.03 + Math.random() * 0.04);
  const phases= Array.from({ length: count }, () => Math.random() * Math.PI * 2);
  const amps  = Array.from({ length: count }, () => 0.35 + Math.random() * 0.65);

  function tick() {
    t += 0.04;
    bars.forEach((bar, i) => {
      const h = (0.2 + amps[i] * (0.5 + 0.5 * Math.sin(t * freqs[i] * 4 + phases[i])));
      const glow = 0.5 + 0.5 * h;
      bar.style.height = (h * 100) + '%';
      bar.style.opacity = (0.5 + 0.5 * h).toString();
      bar.style.boxShadow = `0 0 ${glow * 8}px rgba(34,211,216,${glow * 0.8})`;
    });
    requestAnimationFrame(tick);
  }
  tick();
})();


/* ═════════════════════════════════════════════════
   10. FILM GRAIN NOISE OVERLAY
   Canvas-based animated noise texture for depth
═════════════════════════════════════════════════ */
(function FilmGrain() {
  const canvas = document.getElementById('grainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  function drawGrain() {
    frame++;
    if (frame % 3 !== 0) { requestAnimationFrame(drawGrain); return; } // 20fps

    const W = canvas.width, H = canvas.height;
    const imageData = ctx.createImageData(W, H);
    const d = imageData.data;

    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i]   = v;
      d[i+1] = v;
      d[i+2] = v;
      d[i+3] = Math.random() < 0.5 ? 0 : (Math.random() * 12) | 0;
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawGrain);
  }
  drawGrain();
})();


/* ═════════════════════════════════════════════════
   11. AURORA PROGRESS BAR — Tracks scroll position
   Animated gradient follows scroll progress
═════════════════════════════════════════════════ */
(function ScrollProgress() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;

  let hue = 0;
  function updateProgress() {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 || 0;
    hue = (hue + 0.5) % 360;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
})();


/* ═════════════════════════════════════════════════
   12. GLOW CARD AURA — Follows cursor across cards
   Dynamic gradient that tracks mouse position
═════════════════════════════════════════════════ */
(function CardAura() {
  const cards = document.querySelectorAll('.aura-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--aura-x', x + '%');
      card.style.setProperty('--aura-y', y + '%');
      card.style.setProperty('--aura-opacity', '1');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--aura-opacity', '0');
    });
  });
})();


/* ═════════════════════════════════════════════════
   13. TOKEN SWATCH COPY — Click to copy CSS var
═════════════════════════════════════════════════ */
(function TokenCopy() {
  document.querySelectorAll('.token-row').forEach(row => {
    row.addEventListener('click', () => {
      const val = row.querySelector('.token-val');
      if (!val) return;
      navigator.clipboard.writeText(val.textContent).then(() => {
        const chip = row.querySelector('.token-chip');
        if (chip) {
          const prev = chip.textContent;
          chip.textContent = 'Copied!';
          chip.style.color = '#22d3d8';
          setTimeout(() => {
            chip.textContent = prev;
            chip.style.color = '';
          }, 1400);
        }
      });
    });
  });
})();


/* ═════════════════════════════════════════════════
   14. HEADER GLASS INTENSITY — Increases on scroll
═════════════════════════════════════════════════ */
(function HeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const a = Math.min(y / 200, 1);
    header.style.background = `rgba(8,8,24,${0.65 + a * 0.25})`;
    header.style.boxShadow  = `0 1px 0 rgba(255,255,255,${0.05 + a * 0.03}), 0 4px ${8 + a*24}px rgba(0,0,0,${0.3 + a * 0.2})`;
  }, { passive: true });
})();


/* ═════════════════════════════════════════════════
   15. STAT COUNTER ANIMATION
   Numbers count up when they enter the viewport
═════════════════════════════════════════════════ */
(function CountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      const dur    = 1400;
      const start  = performance.now();

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      function step(now) {
        const t = Math.min((now - start) / dur, 1);
        const val = target * easeOut(t);
        el.textContent = Number.isInteger(target)
          ? Math.round(val).toLocaleString()
          : val.toFixed(1);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
})();
