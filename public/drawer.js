/**
 * ChromaFlora Drawer & Interaction System v1.0
 * ─────────────────────────────────────────────
 * • Left / Right Slide Drawers
 * • Modal / Interactive Modules
 * • Radial Floating Widget
 * • Animated Dropdown Menus
 * • EraserList (canvas strike-through)
 * • Global Micro-interactions
 * • Page Transition System
 */

(function ChromaInteractions() {
  'use strict';

  /* ══════════════════════════════════════
     UTILS
  ══════════════════════════════════════ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
  const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);

  function trap(container) {
    const focusable = $$('a,button,input,select,textarea,[tabindex]', container)
      .filter(el => !el.disabled && el.tabIndex >= 0);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    on(container, 'keydown', e => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    });
  }

  /* ══════════════════════════════════════
     1. DRAWER SYSTEM
  ══════════════════════════════════════ */
  class Drawer {
    constructor({ id, side = 'left', width = '340px' }) {
      this.id = id;
      this.side = side;
      this.width = width;
      this.isOpen = false;
      this._build();
      this._bind();
    }

    _build() {
      // Backdrop
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'cf-backdrop';
      this.backdrop.dataset.drawerId = this.id;

      // Panel
      this.panel = document.createElement('aside');
      this.panel.className = `cf-drawer cf-drawer--${this.side}`;
      this.panel.id = this.id;
      this.panel.setAttribute('aria-modal', 'true');
      this.panel.setAttribute('role', 'dialog');
      this.panel.style.width = this.width;

      document.body.appendChild(this.backdrop);
      document.body.appendChild(this.panel);
    }

    _bind() {
      on(this.backdrop, 'click', () => this.close());
      on(document, 'keydown', e => { if (e.key === 'Escape' && this.isOpen) this.close(); });
    }

    setContent(html) { this.panel.innerHTML = html; return this; }

    open() {
      this.isOpen = true;
      this.backdrop.classList.add('cf-backdrop--visible');
      this.panel.classList.add('cf-drawer--open');
      document.body.style.overflow = 'hidden';
      trap(this.panel);
      this.panel.focus?.();
      return this;
    }

    close() {
      this.isOpen = false;
      this.backdrop.classList.remove('cf-backdrop--visible');
      this.panel.classList.remove('cf-drawer--open');
      document.body.style.overflow = '';
      return this;
    }

    toggle() { return this.isOpen ? this.close() : this.open(); }
  }

  /* ══════════════════════════════════════
     2. MODAL / INTERACTIVE MODULE
  ══════════════════════════════════════ */
  class Modal {
    constructor({ id, size = 'md' }) {
      this.id = id;
      this.size = size;
      this.isOpen = false;
      this._build();
      this._bind();
    }

    _build() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'cf-modal-overlay';
      this.overlay.dataset.modalId = this.id;

      this.dialog = document.createElement('div');
      this.dialog.className = `cf-modal cf-modal--${this.size}`;
      this.dialog.id = this.id;
      this.dialog.setAttribute('role', 'dialog');
      this.dialog.setAttribute('aria-modal', 'true');

      const closeBtn = document.createElement('button');
      closeBtn.className = 'cf-modal-close';
      closeBtn.innerHTML = '✕';
      closeBtn.setAttribute('aria-label', 'Close');
      on(closeBtn, 'click', () => this.close());

      this.body = document.createElement('div');
      this.body.className = 'cf-modal-body';

      this.dialog.append(closeBtn, this.body);
      this.overlay.appendChild(this.dialog);
      document.body.appendChild(this.overlay);
    }

    _bind() {
      on(this.overlay, 'click', e => { if (e.target === this.overlay) this.close(); });
      on(document, 'keydown', e => { if (e.key === 'Escape' && this.isOpen) this.close(); });
    }

    setContent(html) { this.body.innerHTML = html; return this; }

    open() {
      this.isOpen = true;
      this.overlay.classList.add('cf-modal-overlay--visible');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => this.dialog.classList.add('cf-modal--open'));
      trap(this.dialog);
      return this;
    }

    close() {
      this.isOpen = false;
      this.dialog.classList.remove('cf-modal--open');
      setTimeout(() => {
        this.overlay.classList.remove('cf-modal-overlay--visible');
        document.body.style.overflow = '';
      }, 280);
      return this;
    }
  }

  /* ══════════════════════════════════════
     3. FLOATING WIDGET (Radial Menu)
  ══════════════════════════════════════ */
  class FloatWidget {
    constructor(actions = []) {
      this.actions = actions;
      this.isOpen = false;
      this._build();
    }

    _build() {
      this.root = document.createElement('div');
      this.root.className = 'cf-widget';

      this.orb = document.createElement('button');
      this.orb.className = 'cf-widget-orb';
      this.orb.setAttribute('aria-label', 'Quick actions');
      this.orb.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>`;

      this.ring = document.createElement('div');
      this.ring.className = 'cf-widget-ring';

      this.actions.forEach((act, i) => {
        const btn = document.createElement('button');
        btn.className = 'cf-widget-action';
        btn.setAttribute('aria-label', act.label);
        btn.title = act.label;
        btn.innerHTML = act.icon;
        btn.style.setProperty('--idx', i);
        btn.style.setProperty('--total', this.actions.length);
        on(btn, 'click', () => {
          act.onClick?.();
          this.close();
        });
        this.ring.appendChild(btn);
      });

      on(this.orb, 'click', () => this.toggle());
      this.root.append(this.orb, this.ring);
      document.body.appendChild(this.root);
    }

    open() {
      this.isOpen = true;
      this.root.classList.add('cf-widget--open');
      this.orb.setAttribute('aria-expanded', 'true');
    }

    close() {
      this.isOpen = false;
      this.root.classList.remove('cf-widget--open');
      this.orb.setAttribute('aria-expanded', 'false');
    }

    toggle() { return this.isOpen ? this.close() : this.open(); }
  }

  /* ══════════════════════════════════════
     4. ANIMATED DROPDOWN
  ══════════════════════════════════════ */
  function initDropdowns() {
    $$('.cf-dropdown').forEach(dd => {
      const trigger = $('.cf-dropdown-trigger', dd);
      const menu = $('.cf-dropdown-menu', dd);
      if (!trigger || !menu) return;
      let open = false;

      function openMenu() {
        open = true;
        menu.classList.add('cf-dropdown-menu--open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      function closeMenu() {
        open = false;
        menu.classList.remove('cf-dropdown-menu--open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      on(trigger, 'click', e => {
        e.stopPropagation();
        open ? closeMenu() : openMenu();
      });
      on(document, 'click', e => {
        if (!dd.contains(e.target)) closeMenu();
      });
      on(document, 'keydown', e => { if (e.key === 'Escape') closeMenu(); });
    });
  }

  /* ══════════════════════════════════════
     5. ERASER LIST
     Canvas-based strikethrough animation
  ══════════════════════════════════════ */
  class EraserList {
    constructor(container) {
      this.el = container;
      this._init();
    }

    _init() {
      $$('.eraser-item', this.el).forEach(item => {
        const text = $('.eraser-text', item);
        const canvas = document.createElement('canvas');
        canvas.className = 'eraser-canvas';
        item.appendChild(canvas);
        on(item, 'click', () => this._toggle(item, text, canvas));
      });
    }

    _toggle(item, text, canvas) {
      if (item.classList.contains('eraser-item--animating')) return;
      const done = item.classList.contains('eraser-item--done');

      if (!done) {
        // Strike through with eraser
        item.classList.add('eraser-item--animating');
        const rect = text.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();
        const W = iRect.width, H = iRect.height;
        canvas.width = W; canvas.height = H;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        const ctx = canvas.getContext('2d');
        const y = text.offsetTop + text.offsetHeight / 2;
        let x = 0;
        const totalW = W;

        (function drawStrike() {
          x += totalW * 0.04;
          ctx.clearRect(0, 0, W, H);
          // Pink eraser smear
          const prog = Math.min(x, totalW);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(prog, y);
          ctx.strokeStyle = `rgba(236,72,153,0.7)`;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.stroke();
          // Eraser head glow
          if (prog < totalW) {
            const g = ctx.createRadialGradient(prog, y, 0, prog, y, 12);
            g.addColorStop(0, 'rgba(236,72,153,0.5)');
            g.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(prog, y, 12, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }
          ctx.restore();
          if (x < totalW + 20) requestAnimationFrame(drawStrike);
          else {
            item.classList.remove('eraser-item--animating');
            item.classList.add('eraser-item--done');
            text.style.opacity = '0.4';
          }
        })();
      } else {
        // Undo
        item.classList.remove('eraser-item--done');
        text.style.opacity = '';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  /* ══════════════════════════════════════
     6. PAGE TRANSITION
  ══════════════════════════════════════ */
  function initPageTransitions() {
    const curtain = document.createElement('div');
    curtain.className = 'cf-curtain';
    document.body.appendChild(curtain);

    // Reveal on load
    requestAnimationFrame(() => {
      curtain.classList.add('cf-curtain--out');
    });

    // Animate out on link click
    $$('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || a.target === '_blank') return;
      on(a, 'click', e => {
        e.preventDefault();
        curtain.classList.remove('cf-curtain--out');
        curtain.classList.add('cf-curtain--in');
        setTimeout(() => { window.location.href = href; }, 350);
      });
    });
  }

  /* ══════════════════════════════════════
     7. GLOBAL MICRO-INTERACTIONS
  ══════════════════════════════════════ */
  function initMicroInteractions() {
    // Button press scale
    $$('button, .btn, .nav-pill').forEach(btn => {
      on(btn, 'mousedown', () => btn.style.transform = 'scale(0.96)');
      on(btn, 'mouseup mouseleave', () => btn.style.transform = '');
    });

    // Card 3D lift on hover for any .micro-card
    $$('.micro-card').forEach(card => {
      on(card, 'mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px) scale(1.02)`;
        card.style.boxShadow = `${-x * 2}px ${-y * 2}px 30px rgba(168,85,247,0.25)`;
      });
      on(card, 'mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });

    // Input focus glow
    $$('input, textarea, select').forEach(inp => {
      on(inp, 'focus', () => inp.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.35)');
      on(inp, 'blur', () => inp.style.boxShadow = '');
    });

    // Chip toggle active
    $$('.chip').forEach(chip => {
      on(chip, 'click', () => chip.classList.toggle('chip--active'));
    });
  }

  /* ══════════════════════════════════════
     STYLES
  ══════════════════════════════════════ */
  const css = `
    /* ── Backdrop ── */
    .cf-backdrop {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0);
      backdrop-filter: blur(0px);
      pointer-events: none;
      transition: background 0.32s ease, backdrop-filter 0.32s ease;
    }
    .cf-backdrop--visible {
      background: rgba(0,0,10,0.65);
      backdrop-filter: blur(6px);
      pointer-events: all;
    }

    /* ── Drawer ── */
    .cf-drawer {
      position: fixed; top: 0; z-index: 1100;
      height: 100dvh;
      background: linear-gradient(160deg, #0d0822 0%, #07041a 50%, #080d28 100%);
      border: 1px solid rgba(255,255,255,0.07);
      display: flex; flex-direction: column;
      overflow-y: auto; overflow-x: hidden;
      transition: transform 0.36s cubic-bezier(0.4,0,0.2,1);
      will-change: transform;
      box-shadow: 0 0 60px rgba(0,0,0,0.8);
    }
    .cf-drawer--left  { left: 0; transform: translateX(-102%); border-right-color: rgba(168,85,247,0.18); }
    .cf-drawer--right { right: 0; transform: translateX(102%); border-left-color: rgba(168,85,247,0.18); }
    .cf-drawer--left.cf-drawer--open  { transform: translateX(0); }
    .cf-drawer--right.cf-drawer--open { transform: translateX(0); }

    /* ── Modal ── */
    .cf-modal-overlay {
      position: fixed; inset: 0; z-index: 1200;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.22s ease;
    }
    .cf-modal-overlay--visible { opacity: 1; pointer-events: all; }

    .cf-modal {
      position: relative;
      background: linear-gradient(145deg, #0d0822, #07041a);
      border: 1px solid rgba(168,85,247,0.25);
      border-radius: 22px;
      box-shadow: 0 40px 120px rgba(0,0,0,0.9), 0 0 40px rgba(168,85,247,0.15);
      transform: scale(0.88) translateY(20px);
      transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
      overflow: hidden;
      width: 100%;
      max-height: 90dvh;
      overflow-y: auto;
    }
    .cf-modal--sm { max-width: 420px; }
    .cf-modal--md { max-width: 600px; }
    .cf-modal--lg { max-width: 860px; }
    .cf-modal--open { transform: scale(1) translateY(0); }
    .cf-modal-close {
      position: absolute; top: 16px; right: 16px; z-index: 10;
      width: 32px; height: 32px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.1s ease;
    }
    .cf-modal-close:hover { background: rgba(236,72,153,0.2); color: white; }
    .cf-modal-body { padding: 40px; }

    /* ── Widget ── */
    .cf-widget {
      position: fixed; bottom: 28px; right: 28px; z-index: 900;
    }
    .cf-widget-orb {
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #a855f7, #ec4899, #22d3d8);
      border: none; cursor: pointer; color: white;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 30px rgba(168,85,247,0.5), 0 0 0 0 rgba(168,85,247,0.4);
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
      animation: widget-pulse 3s ease-in-out infinite;
    }
    @keyframes widget-pulse {
      0%,100% { box-shadow: 0 8px 30px rgba(168,85,247,0.5), 0 0 0 0 rgba(168,85,247,0.35); }
      50% { box-shadow: 0 8px 30px rgba(168,85,247,0.5), 0 0 0 12px rgba(168,85,247,0); }
    }
    .cf-widget--open .cf-widget-orb {
      transform: rotate(45deg) scale(1.05);
      animation: none;
      box-shadow: 0 12px 40px rgba(168,85,247,0.7);
    }
    .cf-widget-ring {
      position: absolute; bottom: 0; right: 0;
      width: 56px; height: 56px; pointer-events: none;
    }
    .cf-widget-action {
      position: absolute; bottom: 0; right: 0;
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(13,8,34,0.95);
      border: 1px solid rgba(168,85,247,0.3);
      color: white; cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
      transform: scale(0) translate(0,0);
      opacity: 0; pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
    }
    .cf-widget--open .cf-widget-action {
      pointer-events: all;
      opacity: 1;
    }
    .cf-widget--open .cf-widget-action:nth-child(1) { transform: translate(-68px, -4px) scale(1); transition-delay: 0.04s; }
    .cf-widget--open .cf-widget-action:nth-child(2) { transform: translate(-48px, -52px) scale(1); transition-delay: 0.08s; }
    .cf-widget--open .cf-widget-action:nth-child(3) { transform: translate(-4px, -70px) scale(1); transition-delay: 0.12s; }
    .cf-widget--open .cf-widget-action:nth-child(4) { transform: translate(44px, -52px) scale(1); transition-delay: 0.16s; }
    .cf-widget--open .cf-widget-action:nth-child(5) { transform: translate(64px, -4px) scale(1); transition-delay: 0.20s; }
    .cf-widget-action:hover { background: rgba(168,85,247,0.25); border-color: rgba(168,85,247,0.6); transform: scale(1.12) !important; }

    /* ── Dropdown ── */
    .cf-dropdown { position: relative; display: inline-block; }
    .cf-dropdown-trigger {
      display: flex; align-items: center; gap: 5px;
      background: none; border: none; cursor: pointer;
      color: inherit; font: inherit; padding: 0;
    }
    .cf-dropdown-trigger::after {
      content: '▾'; font-size: 10px;
      transition: transform 0.18s ease;
    }
    .cf-dropdown-trigger[aria-expanded="true"]::after { transform: rotate(180deg); }
    .cf-dropdown-menu {
      position: absolute; top: calc(100% + 10px); left: 50%;
      transform: translateX(-50%) translateY(-8px) scale(0.94);
      min-width: 200px; padding: 8px;
      background: rgba(10,6,28,0.97);
      border: 1px solid rgba(168,85,247,0.22);
      border-radius: 14px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 20px rgba(168,85,247,0.1);
      opacity: 0; pointer-events: none; z-index: 500;
      backdrop-filter: blur(20px);
      transition: opacity 0.18s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }
    .cf-dropdown-menu--open {
      opacity: 1; pointer-events: all;
      transform: translateX(-50%) translateY(0) scale(1);
    }
    .cf-dropdown-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 9px;
      color: rgba(255,255,255,0.8); text-decoration: none;
      font-size: 13px; font-weight: 500;
      transition: background 0.1s ease, color 0.1s ease, transform 0.1s ease;
      cursor: pointer;
    }
    .cf-dropdown-item:hover {
      background: rgba(168,85,247,0.15);
      color: white; transform: translateX(3px);
    }
    .cf-dropdown-item .icon { font-size: 16px; width: 20px; text-align: center; }
    .cf-dropdown-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 6px 0; }

    /* ── Eraser List ── */
    .eraser-list { list-style: none; padding: 0; margin: 0; }
    .eraser-item {
      position: relative; display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 10px; cursor: pointer;
      transition: background 0.12s ease;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      user-select: none;
    }
    .eraser-item:hover { background: rgba(255,255,255,0.04); }
    .eraser-check {
      width: 18px; height: 18px; border-radius: 5px;
      border: 1.5px solid rgba(168,85,247,0.5);
      flex-shrink: 0; transition: all 0.15s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .eraser-item--done .eraser-check {
      background: linear-gradient(135deg, #a855f7, #ec4899);
      border-color: transparent;
    }
    .eraser-item--done .eraser-check::after { content: '✓'; color: white; font-size: 11px; }
    .eraser-text { font-size: 14px; color: rgba(255,255,255,0.85); transition: opacity 0.3s ease; }
    .eraser-canvas {
      position: absolute; left: 0; top: 0;
      pointer-events: none; border-radius: 10px;
    }

    /* ── Page Curtain ── */
    .cf-curtain {
      position: fixed; inset: 0; z-index: 9999;
      background: linear-gradient(135deg, #0d0822, #07041a);
      transform-origin: top;
      transition: transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease;
    }
    .cf-curtain--out {
      transform: scaleY(0);
      opacity: 0;
      pointer-events: none;
    }
    .cf-curtain--in {
      transform: scaleY(1);
      opacity: 1;
    }

    /* ── Nav dropdown link style ── */
    .nav-link.has-dropdown { cursor: default; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ══════════════════════════════════════
     EXPORT to window
  ══════════════════════════════════════ */
  window.CF = {
    Drawer,
    Modal,
    FloatWidget,
    EraserList,
    initDropdowns,
    initPageTransitions,
    initMicroInteractions,
  };

  /* ── Auto-init on DOM ready ── */
  function autoInit() {
    initDropdowns();
    initPageTransitions();
    initMicroInteractions();

    // Auto EraserList
    $$('.eraser-list').forEach(el => new EraserList(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

})();
