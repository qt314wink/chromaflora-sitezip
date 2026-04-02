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


/* ═════════════════════════════════════════════════
   16. GALLERY TILE CANVAS RENDERERS
   18 unique procedural art effects
   + Oil/Water drip hover + Click burst + Watercolor bleed
═════════════════════════════════════════════════ */
(function GalleryTileRenderers() {
  const PI2 = Math.PI * 2;
  const DPR = Math.min(window.devicePixelRatio, 2);

  function initCanvas(canvas) {
    const tile = canvas.parentElement;
    const W = tile.offsetWidth  || 200;
    const H = tile.offsetHeight || 180;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    return { ctx, W, H };
  }

  function abstractFlows(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t = 0;
    (function frame() {
      ctx.fillStyle = 'rgba(5,2,18,0.18)'; ctx.fillRect(0,0,W,H);
      const hue = t * 0.4;
      for (let i=0; i<7; i++) {
        ctx.beginPath();
        const baseY = H*(0.15+i*0.12); ctx.moveTo(0,baseY);
        for (let x=0; x<=W; x+=3) {
          const y = baseY+Math.sin(x*0.018+t*0.05+i*1.1)*22+Math.sin(x*0.009-t*0.03+i*0.7)*14;
          ctx.lineTo(x,y);
        }
        ctx.strokeStyle=`hsla(${(hue+i*35)%360},90%,60%,0.55)`;
        ctx.lineWidth=1.8; ctx.shadowColor=`hsl(${(hue+i*35)%360},100%,65%)`; ctx.shadowBlur=5;
        ctx.stroke(); ctx.shadowBlur=0;
      }
      t++; requestAnimationFrame(frame);
    })();
  }

  function liquidNeon(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const drops = Array.from({length:10},(_,i)=>({x:W*(0.05+i*0.1),y:-20-Math.random()*120,speed:0.9+Math.random()*1.4,hue:i*36,w:2.5+Math.random()*3,tail:40+Math.random()*70}));
    (function frame() {
      ctx.fillStyle='rgba(2,2,14,0.28)'; ctx.fillRect(0,0,W,H);
      for(const d of drops){d.y+=d.speed;if(d.y-d.tail>H){d.y=-d.tail;d.x=Math.random()*W;}const g=ctx.createLinearGradient(d.x,d.y-d.tail,d.x,d.y+8);g.addColorStop(0,`hsla(${d.hue},100%,60%,0)`);g.addColorStop(0.7,`hsla(${d.hue},100%,70%,0.8)`);g.addColorStop(1,`hsla(${d.hue},100%,95%,1)`);ctx.beginPath();ctx.moveTo(d.x,d.y-d.tail);ctx.lineTo(d.x,d.y);ctx.strokeStyle=g;ctx.lineWidth=d.w;ctx.lineCap='round';ctx.shadowColor=`hsl(${d.hue},100%,65%)`;ctx.shadowBlur=10;ctx.stroke();ctx.shadowBlur=0;ctx.beginPath();ctx.ellipse(d.x,d.y+4,d.w*1.5,d.w*2,0,0,PI2);ctx.fillStyle=`hsla(${d.hue},100%,80%,0.9)`;ctx.fill();}
      requestAnimationFrame(frame);
    })();
  }

  function plasmaDrift(canvas) {
    const tile=canvas.parentElement,W=tile.offsetWidth||200,H=tile.offsetHeight||180,sc=4;
    canvas.width=Math.floor(W/sc);canvas.height=Math.floor(H/sc);canvas.style.width=W+'px';canvas.style.height=H+'px';canvas.style.imageRendering='pixelated';
    const ctx=canvas.getContext('2d'),cW=canvas.width,cH=canvas.height;let t=0;
    (function frame(){const img=ctx.createImageData(cW,cH);const d=img.data;for(let y=0;y<cH;y++)for(let x=0;x<cW;x++){const v=Math.sin(x*0.22+t*0.05)+Math.sin(y*0.18-t*0.04)+Math.sin((x+y)*0.14+t*0.06)+Math.sin(Math.sqrt((x-cW/2)**2+(y-cH/2)**2)*0.3-t*0.07);const h=(v+4)/8;const i=(y*cW+x)*4;d[i]=Math.sin(h*PI2+4.19)*127+128;d[i+1]=Math.sin(h*PI2)*60+40;d[i+2]=Math.sin(h*PI2+2.09)*127+128;d[i+3]=255;}ctx.putImageData(img,0,0);t+=0.6;requestAnimationFrame(frame);})();
  }

  function mandala(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    (function frame(){ctx.fillStyle='rgba(3,1,14,0.2)';ctx.fillRect(0,0,W,H);const cx=W/2,cy=H/2,arms=12,maxR=Math.min(W,H)*0.46;for(let layer=0;layer<7;layer++){const r=(layer+1)*(maxR/7),rot=t*0.004*(layer%2===0?1:-1);for(let a=0;a<arms;a++){const angle=(a/arms)*PI2+rot,hue=(t*0.3+layer*30+a*12)%360;ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.beginPath();ctx.ellipse(r,0,r*0.28,r*0.12,0,0,PI2);ctx.fillStyle=`hsla(${hue},85%,55%,0.12)`;ctx.fill();ctx.strokeStyle=`hsla(${hue},90%,70%,0.55)`;ctx.lineWidth=0.8;ctx.stroke();ctx.beginPath();ctx.arc(r*1.1,0,2,0,PI2);ctx.fillStyle=`hsla(${hue},100%,85%,0.9)`;ctx.shadowColor=`hsl(${hue},100%,70%)`;ctx.shadowBlur=6;ctx.fill();ctx.shadowBlur=0;ctx.restore();}ctx.beginPath();ctx.arc(cx,cy,r,0,PI2);ctx.strokeStyle=`hsla(${(t*0.2+layer*25)%360},60%,50%,0.1)`;ctx.lineWidth=0.6;ctx.stroke();}const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,12);cg.addColorStop(0,`hsla(${t*0.8%360},100%,85%,1)`);cg.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,12,0,PI2);ctx.fillStyle=cg;ctx.fill();t++;requestAnimationFrame(frame);})();
  }

  function cosmicTide(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    (function frame(){ctx.fillStyle='#01010e';ctx.fillRect(0,0,W,H);for(let i=7;i>=0;i--){ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=3){const p=(x/W)*PI2,y=H*0.42+i*14+Math.sin(p+t*0.03+i*0.5)*(16+i*5)+Math.sin(p*1.8-t*0.02+i)*(8+i*2.5);ctx.lineTo(x,y);}ctx.lineTo(W,H);ctx.closePath();const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,`hsla(${195+i*18},95%,55%,${0.1+i*0.055})`);g.addColorStop(1,`hsla(${220+i*18},80%,30%,0.04)`);ctx.fillStyle=g;ctx.fill();}t++;requestAnimationFrame(frame);})();
  }

  function floralGlow(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    (function frame(){ctx.fillStyle='rgba(3,1,14,0.25)';ctx.fillRect(0,0,W,H);const cx=W/2,cy=H/2,petals=8;for(let ring=0;ring<4;ring++){const r=14+ring*(Math.min(W,H)*0.1),rot=t*0.006*(ring%2===0?1:-0.7)+ring*0.4;for(let p=0;p<petals;p++){const angle=(p/petals)*PI2+rot,hue=(t*0.5+ring*60+p*20)%360,px=cx+Math.cos(angle)*r,py=cy+Math.sin(angle)*r;ctx.save();ctx.translate(px,py);ctx.rotate(angle+Math.PI/2);ctx.beginPath();ctx.ellipse(0,0,r*0.5,r*0.22,0,0,PI2);ctx.fillStyle=`hsla(${hue},85%,60%,0.2)`;ctx.fill();ctx.strokeStyle=`hsla(${hue},90%,70%,0.6)`;ctx.lineWidth=1;ctx.stroke();ctx.restore();}}const g=ctx.createRadialGradient(cx,cy,0,cx,cy,20);g.addColorStop(0,`hsla(${t*0.6%360},100%,80%,0.9)`);g.addColorStop(0.5,`hsla(${(t*0.6+60)%360},90%,60%,0.3)`);g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,20,0,PI2);ctx.fillStyle=g;ctx.fill();t++;requestAnimationFrame(frame);})();
  }

  function deepSpace(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const stars=Array.from({length:100},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6,hue:[0,180,300,210][Math.floor(Math.random()*4)],phase:Math.random()*PI2}));
    const nbs=[{x:W*0.3,y:H*0.4,r:W*0.25,h:260},{x:W*0.75,y:H*0.6,r:W*0.2,h:180},{x:W*0.5,y:H*0.2,r:W*0.18,h:320}];
    (function frame(){ctx.fillStyle='#010108';ctx.fillRect(0,0,W,H);for(const n of nbs){const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*(1+Math.sin(t*0.008)*0.12));g.addColorStop(0,`hsla(${n.h},75%,35%,0.2)`);g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(n.x,n.y,n.r*1.5,0,PI2);ctx.fillStyle=g;ctx.fill();}for(const s of stars){const pulse=0.5+0.5*Math.sin(t*0.04+s.phase);ctx.beginPath();ctx.arc(s.x,s.y,s.r*(0.7+0.3*pulse),0,PI2);ctx.fillStyle=`hsla(${s.hue},55%,92%,${0.4+0.6*pulse})`;if(s.r>1.2){ctx.shadowColor=`hsl(${s.hue},80%,80%)`;ctx.shadowBlur=7;}ctx.fill();ctx.shadowBlur=0;}t++;requestAnimationFrame(frame);})();
  }

  function liquidMercury(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const blobs=Array.from({length:6},(_,i)=>({x:W*(0.15+i*0.14),y:H*(0.35+(i%3)*0.15),vx:(Math.random()-0.5)*0.9,vy:(Math.random()-0.5)*0.6,r:12+i*7}));
    (function frame(){ctx.fillStyle='rgba(8,8,22,0.3)';ctx.fillRect(0,0,W,H);for(const b of blobs){b.x+=b.vx;b.y+=b.vy;if(b.x<b.r||b.x>W-b.r)b.vx*=-0.95;if(b.y<b.r||b.y>H-b.r)b.vy*=-0.95;const g=ctx.createRadialGradient(b.x-b.r*0.3,b.y-b.r*0.35,0,b.x,b.y,b.r);g.addColorStop(0,'rgba(230,235,255,0.98)');g.addColorStop(0.3,'rgba(150,160,210,0.85)');g.addColorStop(0.7,'rgba(70,80,150,0.5)');g.addColorStop(1,'rgba(30,30,70,0)');ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,PI2);ctx.fillStyle=g;ctx.fill();}t++;requestAnimationFrame(frame);})();
  }

  function quilling(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const coils=Array.from({length:14},(_,i)=>({x:W*(0.07+(i%5)*0.22),y:H*(0.12+Math.floor(i/5)*0.36+(i%2)*0.18),r:8+Math.random()*14,turns:2+Math.random()*3,hue:i*24,rot:Math.random()*PI2,speed:0.006+Math.random()*0.006}));
    (function frame(){ctx.fillStyle='rgba(5,3,16,0.22)';ctx.fillRect(0,0,W,H);for(const c of coils){c.rot+=c.speed;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);const tot=c.turns*60;for(let p=0;p<=tot;p++){const ang=(p/60)*PI2,rad=c.r*(p/tot),hue=(c.hue+p*1.8+t*0.2)%360;ctx.beginPath();ctx.arc(Math.cos(ang)*rad,Math.sin(ang)*rad,1.4,0,PI2);ctx.fillStyle=`hsla(${hue},80%,68%,0.85)`;ctx.fill();}ctx.restore();}t++;requestAnimationFrame(frame);})();
  }

  function tectonicShift(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const plates=Array.from({length:8},(_,i)=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.15,w:30+Math.random()*90,h:20+Math.random()*70,hue:i*40+10,rot:Math.random()*0.4}));
    const cracks=Array.from({length:14},()=>({x:Math.random()*W,y:Math.random()*H,angle:Math.random()*PI2,len:20+Math.random()*90,hue:Math.random()*60+10}));
    (function frame(){ctx.fillStyle='rgba(8,4,12,0.3)';ctx.fillRect(0,0,W,H);for(const p of plates){p.x+=p.vx;p.y+=p.vy;if(p.x<-p.w)p.x=W;if(p.x>W+p.w)p.x=-p.w;if(p.y<-p.h)p.y=H;if(p.y>H+p.h)p.y=-p.h;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot+t*0.001);const g=ctx.createLinearGradient(-p.w/2,-p.h/2,p.w/2,p.h/2);g.addColorStop(0,`hsla(${p.hue},55%,18%,0.7)`);g.addColorStop(1,`hsla(${p.hue+30},45%,10%,0.5)`);ctx.fillStyle=g;ctx.beginPath();ctx.rect(-p.w/2,-p.h/2,p.w,p.h);ctx.fill();ctx.strokeStyle=`hsla(${p.hue},80%,55%,0.3)`;ctx.lineWidth=1;ctx.stroke();ctx.restore();}for(const c of cracks){ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.angle+Math.sin(t*0.02)*0.1);ctx.beginPath();ctx.moveTo(0,0);let segx=0,segy=0;for(let s=1;s<=6;s++){segx=(c.len/6)*s;segy=(Math.random()-0.5)*10;ctx.lineTo(segx,segy);}ctx.strokeStyle=`hsla(${c.hue},90%,65%,0.4)`;ctx.lineWidth=0.8;ctx.stroke();ctx.restore();}t++;requestAnimationFrame(frame);})();
  }

  function rippleField(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const rings=Array.from({length:6},(_,i)=>({phase:(i/6)*PI2,hue:i*50+180,r:(i/6)*Math.max(W,H)*0.55,speed:0.7+i*0.12}));
    (function frame(){ctx.fillStyle='rgba(2,2,18,0.22)';ctx.fillRect(0,0,W,H);const cx=W/2,cy=H/2;for(const ring of rings){ring.r+=ring.speed;const maxR=Math.max(W,H)*0.7;if(ring.r>maxR)ring.r=0;const op=(1-ring.r/maxR)*0.7;ctx.beginPath();ctx.arc(cx+Math.sin(ring.phase)*8,cy+Math.cos(ring.phase)*8,ring.r,0,PI2);ctx.strokeStyle=`hsla(${ring.hue+t*0.3},85%,65%,${op})`;ctx.lineWidth=1.5;ctx.stroke();}t++;requestAnimationFrame(frame);})();
  }

  function bubble(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const bubbles=Array.from({length:22},(_,i)=>({x:Math.random()*W,y:H+Math.random()*H,r:4+Math.random()*18,vy:-(0.2+Math.random()*0.6),hue:Math.random()*360,phase:Math.random()*PI2,wobble:0.3+Math.random()*0.8}));
    (function frame(){ctx.fillStyle='rgba(2,6,20,0.25)';ctx.fillRect(0,0,W,H);for(const b of bubbles){b.y+=b.vy;b.x+=Math.sin(t*0.015*b.wobble+b.phase)*0.6;if(b.y+b.r<0){b.y=H+b.r;b.x=Math.random()*W;}const hue2=(b.hue+t*0.5)%360;const gg=ctx.createRadialGradient(b.x-b.r*0.3,b.y-b.r*0.35,0,b.x,b.y,b.r);gg.addColorStop(0,`hsla(${hue2},90%,90%,0.22)`);gg.addColorStop(0.4,`hsla(${(hue2+60)%360},80%,60%,0.1)`);gg.addColorStop(1,`hsla(${(hue2+120)%360},70%,50%,0.02)`);ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,PI2);ctx.fillStyle=gg;ctx.fill();const rim=ctx.createLinearGradient(b.x-b.r,b.y-b.r,b.x+b.r,b.y+b.r);rim.addColorStop(0,`hsla(${hue2},100%,80%,0.7)`);rim.addColorStop(0.5,`hsla(${(hue2+120)%360},100%,70%,0.4)`);rim.addColorStop(1,`hsla(${(hue2+240)%360},100%,80%,0.6)`);ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,PI2);ctx.strokeStyle=rim;ctx.lineWidth=1;ctx.stroke();ctx.beginPath();ctx.arc(b.x-b.r*0.3,b.y-b.r*0.35,b.r*0.22,0,PI2);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fill();}t++;requestAnimationFrame(frame);})();
  }

  function crystallize(canvas) {
    const tile=canvas.parentElement,W=tile.offsetWidth||200,H=tile.offsetHeight||180,sc=3;
    canvas.width=Math.floor(W/sc);canvas.height=Math.floor(H/sc);canvas.style.width=W+'px';canvas.style.height=H+'px';canvas.style.imageRendering='pixelated';
    const ctx=canvas.getContext('2d'),cW=canvas.width,cH=canvas.height;
    const seeds=Array.from({length:20},()=>({x:Math.random()*cW,y:Math.random()*cH,hue:Math.random()*360}));
    let t=0;
    (function frame(){const img=ctx.createImageData(cW,cH),d=img.data;for(let y=0;y<cH;y++)for(let x=0;x<cW;x++){let minD=9999,secD=9999,minS=seeds[0];for(const s of seeds){const dist=Math.hypot(x-s.x,y-s.y);if(dist<minD){secD=minD;minD=dist;minS=s;}else if(dist<secD)secD=dist;}const edge=secD-minD,hue=(minS.hue+t*0.08)%360,bright=edge<2?1:0.3+minD*0.015;const r=(Math.sin(hue*Math.PI/180)*0.5+0.5)*200*bright;const g=(Math.sin((hue+120)*Math.PI/180)*0.3+0.3)*80*bright;const b=(Math.sin((hue+240)*Math.PI/180)*0.5+0.5)*220*bright;const i=(y*cW+x)*4;d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=edge<2?240:200;}ctx.putImageData(img,0,0);t+=0.35;requestAnimationFrame(frame);})();
  }

  function liquify(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const blobs=Array.from({length:5},(_,i)=>({x:W*(0.2+i*0.15),y:H*(0.3+(i%3)*0.2),r:22+i*10,hue:i*60,phase:i*1.2}));
    (function frame(){ctx.fillStyle='rgba(6,3,16,0.3)';ctx.fillRect(0,0,W,H);for(const b of blobs){const cx2=b.x+Math.sin(t*0.025+b.phase)*20,cy2=b.y+Math.cos(t*0.02+b.phase)*14,hue=(b.hue+t*0.4)%360;ctx.save();ctx.translate(cx2,cy2);const sc2=1+Math.sin(t*0.04+b.phase)*0.25;ctx.scale(sc2,1/sc2);const g=ctx.createRadialGradient(0,-b.r*0.2,0,0,0,b.r);g.addColorStop(0,`hsla(${hue},85%,65%,0.8)`);g.addColorStop(0.6,`hsla(${(hue+40)%360},80%,45%,0.5)`);g.addColorStop(1,`hsla(${(hue+80)%360},70%,30%,0)`);ctx.beginPath();ctx.arc(0,0,b.r,0,PI2);ctx.fillStyle=g;ctx.fill();ctx.restore();}t++;requestAnimationFrame(frame);})();
  }

  function paperLayer(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const layers=Array.from({length:7},(_,i)=>({hue:i*38,offset:i*3,rotate:(i-3)*0.04}));
    (function frame(){ctx.fillStyle='#1a1408';ctx.fillRect(0,0,W,H);for(let i=layers.length-1;i>=0;i--){const l=layers[i],wave=Math.sin(t*0.015+i*0.5)*3;ctx.save();ctx.translate(W/2,H/2+l.offset+wave);ctx.rotate(l.rotate+Math.sin(t*0.01+i)*0.01);const pw=W*(0.85+i*0.022),ph=H*(0.55+i*0.04);const g=ctx.createLinearGradient(-pw/2,-ph/2,pw/2,ph/2);g.addColorStop(0,`hsla(${l.hue},30%,82%,0.9)`);g.addColorStop(1,`hsla(${l.hue+20},25%,70%,0.8)`);ctx.fillStyle=g;ctx.shadowColor='rgba(0,0,0,0.4)';ctx.shadowBlur=8;ctx.shadowOffsetY=2;ctx.beginPath();ctx.roundRect(-pw/2,-ph/2,pw,ph,4);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=`hsla(${l.hue},40%,92%,0.6)`;ctx.lineWidth=0.8;ctx.stroke();ctx.restore();}t++;requestAnimationFrame(frame);})();
  }

  function coloringBook(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const shapes=[{type:'circle',cx:W*0.15,cy:H*0.5,r:H*0.32,hue:0},{type:'circle',cx:W*0.45,cy:H*0.5,r:H*0.28,hue:120},{type:'circle',cx:W*0.78,cy:H*0.5,r:H*0.25,hue:240},{type:'rect',x:W*0.05,y:H*0.15,w:W*0.4,h:H*0.7,hue:60},{type:'rect',x:W*0.55,y:H*0.1,w:W*0.4,h:H*0.8,hue:180}];
    (function frame(){ctx.fillStyle='#02020c';ctx.fillRect(0,0,W,H);const fill=((t%200)/200);for(const s of shapes){const hue=(s.hue+t*0.5)%360;ctx.globalAlpha=fill*0.45;ctx.fillStyle=`hsla(${hue},80%,50%,1)`;ctx.beginPath();if(s.type==='circle')ctx.arc(s.cx,s.cy,s.r,0,PI2);else ctx.roundRect(s.x,s.y,s.w,s.h,8);ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle=`hsla(${hue},70%,70%,0.7)`;ctx.lineWidth=1.2;ctx.setLineDash([4,3]);ctx.beginPath();if(s.type==='circle')ctx.arc(s.cx,s.cy,s.r,0,PI2);else ctx.roundRect(s.x,s.y,s.w,s.h,8);ctx.stroke();ctx.setLineDash([]);}ctx.strokeStyle='rgba(100,150,255,0.05)';ctx.lineWidth=0.5;for(let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}t++;requestAnimationFrame(frame);})();
  }

  function acidPour(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const layers=Array.from({length:8},(_,i)=>({hue:i*44,blobs:Array.from({length:3},()=>({x:Math.random()*W,y:Math.random()*H,r:25+Math.random()*60,phase:Math.random()*PI2}))}));
    const bubs=Array.from({length:18},()=>({x:Math.random()*W,y:Math.random()*H,r:2+Math.random()*10,vy:-(0.15+Math.random()*0.4),phase:Math.random()*PI2}));
    (function frame(){ctx.fillStyle='rgba(4,2,12,0.2)';ctx.fillRect(0,0,W,H);for(const layer of layers)for(const b of layer.blobs){b.x+=Math.cos(t*0.008+b.phase)*0.3;b.y+=Math.sin(t*0.01+b.phase)*0.25;if(b.x<-b.r)b.x=W+b.r;if(b.x>W+b.r)b.x=-b.r;if(b.y<-b.r)b.y=H+b.r;if(b.y>H+b.r)b.y=-b.r;const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r),hue=(layer.hue+t*0.2)%360;g.addColorStop(0,`hsla(${hue},90%,55%,0.6)`);g.addColorStop(0.5,`hsla(${(hue+20)%360},85%,40%,0.3)`);g.addColorStop(1,`hsla(${(hue+40)%360},75%,28%,0)`);ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,PI2);ctx.fillStyle=g;ctx.fill();}for(const bub of bubs){bub.y+=bub.vy;bub.x+=Math.sin(t*0.02+bub.phase)*0.5;if(bub.y+bub.r<0){bub.y=H+bub.r;bub.x=Math.random()*W;}const op=0.4+0.3*Math.sin(t*0.08+bub.phase);ctx.beginPath();ctx.arc(bub.x,bub.y,bub.r,0,PI2);ctx.strokeStyle=`rgba(255,255,255,${op})`;ctx.lineWidth=0.8;ctx.stroke();const hl=ctx.createRadialGradient(bub.x-bub.r*0.3,bub.y-bub.r*0.35,0,bub.x,bub.y,bub.r);hl.addColorStop(0,'rgba(255,255,255,0.3)');hl.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(bub.x,bub.y,bub.r,0,PI2);ctx.fillStyle=hl;ctx.fill();}t++;requestAnimationFrame(frame);})();
  }

  function vortex(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    let t=0;
    const particles=Array.from({length:250},()=>{const angle=Math.random()*PI2,r=Math.random()*Math.min(W,H)*0.48;return{r,angle,speed:(0.01+Math.random()*0.025)*(Math.min(W,H)*0.5/(r+1)),hue:Math.random()*360,size:0.5+Math.random()*1.5,decay:0.95+Math.random()*0.04};});
    (function frame(){ctx.fillStyle='rgba(2,1,10,0.2)';ctx.fillRect(0,0,W,H);const cx=W/2,cy=H/2;for(const p of particles){p.angle+=p.speed;p.r*=p.decay;if(p.r<1){p.r=Math.min(W,H)*0.47;p.angle=Math.random()*PI2;p.hue=Math.random()*360;}const x=cx+Math.cos(p.angle)*p.r,y=cy+Math.sin(p.angle)*p.r,hue=(p.hue+t*0.3)%360,fade=p.r/(Math.min(W,H)*0.5);ctx.beginPath();ctx.arc(x,y,p.size,0,PI2);ctx.fillStyle=`hsla(${hue},90%,65%,${fade*0.8})`;ctx.fill();}t++;requestAnimationFrame(frame);})();
  }

  /* ── Effect Map ── */
  const effectMap = {
    'abstract-flows':abstractFlows,'liquid-neon':liquidNeon,'plasma-drift':plasmaDrift,
    'mandala':mandala,'cosmic-tide':cosmicTide,'floral-glow':floralGlow,
    'deep-space':deepSpace,'liquid-mercury':liquidMercury,'quilling':quilling,
    'tectonic-shift':tectonicShift,'ripple-field':rippleField,'bubble':bubble,
    'crystallize':crystallize,'liquify':liquify,'paper-layer':paperLayer,
    'coloring-book':coloringBook,'acid-pour':acidPour,'vortex':vortex,
  };

  /* Lazy-init via IntersectionObserver */
  const tileIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const tile = entry.target;
      const effect = tile.dataset.effect;
      const canvas = tile.querySelector('.tile-canvas');
      if (canvas && effect && effectMap[effect] && !canvas.dataset.started) {
        canvas.dataset.started = '1';
        effectMap[effect](canvas);
      }
      tileIO.unobserve(tile);
    });
  }, { threshold: 0.01, rootMargin: '120px' });

  document.querySelectorAll('.gallery-tile[data-effect]').forEach(tile => tileIO.observe(tile));

  /* ── Oil/Water iridescent drip on hover entry ── */
  function spawnOilDrip(canvas, mx, my) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const sw = parseInt(canvas.style.width) || 1;
    const dpr = canvas.width / sw;
    const sx = mx * dpr, sy = my * dpr;
    const drips = Array.from({length:6}, (_, i) => ({
      x: sx + (Math.random()-0.5)*28*dpr, y: sy,
      vy: (1.5+Math.random()*2.5)*dpr, r:(2+Math.random()*5)*dpr,
      hue: Math.random()*360, life:1.0
    }));
    let f=0;
    (function animDrip(){
      f++;
      if(f>55) return;
      for(const d of drips){
        d.y+=d.vy; d.vy+=0.12*dpr; d.life-=0.018;
        if(d.life<=0) continue;
        const grad=ctx.createLinearGradient(d.x,d.y-d.r*5,d.x,d.y+d.r);
        grad.addColorStop(0,`hsla(${d.hue},100%,70%,0)`);
        grad.addColorStop(0.6,`hsla(${d.hue},90%,65%,${d.life*0.55})`);
        grad.addColorStop(1,`hsla(${d.hue},100%,80%,${d.life*0.9})`);
        ctx.beginPath(); ctx.ellipse(d.x,d.y,d.r*0.45,d.r*1.8,0,0,PI2);
        ctx.fillStyle=grad; ctx.fill();
      }
      requestAnimationFrame(animDrip);
    })();
  }

  /* ── Click: watercolor bleed + DOM spark burst ── */
  function clickBurst(tile, canvas, mx, my) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const sw = parseInt(canvas.style.width) || 1;
    const dpr = canvas.width / sw;
    const sx=mx*dpr, sy=my*dpr, hue=Math.random()*360;
    let f=0;
    (function animBurst(){
      f++;
      if(f>55) return;
      const t=f/55;
      const maxR=Math.max(canvas.width,canvas.height)*0.85;
      for(let ring=0;ring<3;ring++){
        const r=t*maxR*(0.8+ring*0.1);
        const ox=(Math.random()-0.5)*r*0.12,oy=(Math.random()-0.5)*r*0.12;
        const g=ctx.createRadialGradient(sx+ox,sy+oy,r*0.75,sx+ox,sy+oy,r);
        g.addColorStop(0,`hsla(${(hue+ring*30)%360},85%,60%,0)`);
        g.addColorStop(0.8,`hsla(${(hue+ring*30)%360},90%,55%,${(1-t)*0.1})`);
        g.addColorStop(1,`hsla(${(hue+ring*30)%360},80%,50%,0)`);
        ctx.beginPath();ctx.arc(sx+ox,sy+oy,r,0,PI2);ctx.fillStyle=g;ctx.fill();
      }
      requestAnimationFrame(animBurst);
    })();
    // DOM sparks
    for(let i=0;i<10;i++){
      const spark=document.createElement('div');
      const angle=(i/10)*PI2, speed=40+Math.random()*70, size=4+Math.random()*8;
      spark.style.cssText=`position:absolute;pointer-events:none;z-index:30;width:${size}px;height:${size}px;border-radius:50%;background:hsl(${(hue+i*35)%360},90%,65%);box-shadow:0 0 ${size*2}px hsl(${(hue+i*35)%360},100%,70%);left:${mx}px;top:${my}px;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
      tile.appendChild(spark);
      const vx=Math.cos(angle)*speed,vy=Math.sin(angle)*speed,start=performance.now();
      (function animSpark(now){
        const el=(now-start)/1000,ease=1-el*2;
        if(ease<=0){spark.remove();return;}
        spark.style.left=(mx+vx*el)+'px'; spark.style.top=(my+vy*el+60*el*el)+'px';
        spark.style.opacity=ease; spark.style.transform=`translate(-50%,-50%) scale(${ease})`;
        requestAnimationFrame(animSpark);
      })(performance.now());
    }
  }

  /* Wire interactions to all tiles */
  document.querySelectorAll('.gallery-tile').forEach(tile => {
    const canvas = tile.querySelector('.tile-canvas');
    tile.addEventListener('mouseenter', e => {
      const r = tile.getBoundingClientRect();
      if (canvas && canvas.dataset.started) spawnOilDrip(canvas, e.clientX-r.left, e.clientY-r.top);
    });
    tile.addEventListener('click', e => {
      const r = tile.getBoundingClientRect();
      clickBurst(tile, canvas, e.clientX-r.left, e.clientY-r.top);
    });
  });

})();
