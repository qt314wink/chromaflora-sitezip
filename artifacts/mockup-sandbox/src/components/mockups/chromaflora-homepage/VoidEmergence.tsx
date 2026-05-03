import React, { useState, useEffect, useRef } from 'react';

export function VoidEmergence() {
  const [phase, setPhase] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 600);
    const p2 = setTimeout(() => setPhase(2), 1400);
    const p3 = setTimeout(() => setPhase(3), 2000);
    const p4 = setTimeout(() => setPhase(4), 2800);
    const p5 = setTimeout(() => setPhase(5), 3400);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      clearTimeout(p5);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.05) {
        setPhase((prev) => (prev < 6 ? 6 : prev));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    const scrollEls = document.querySelectorAll('.scroll-reveal');
    scrollEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [phase]);

  const stars = useRef(
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 1,
      color: ['#ffffff', '#a855f7', '#22d3d8'][Math.floor(Math.random() * 3)],
      delay: i * 20
    }))
  ).current;

  return (
    <div className="void-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --cf-void: #04040f;
          --cf-abyss: #080818;
          --cf-deep: #0d0d26;
          --cf-surface: #13132a;
          --cf-elevated: #1a1a38;
          
          --cf-iris: #a855f7;
          --cf-aqua: #22d3d8;
          --cf-bloom: #ec4899;
          --cf-ember: #f97316;
          --cf-viridian: #10b981;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }

        body {
          background-color: var(--cf-void);
          color: #fff;
          overflow-x: hidden;
        }

        .void-container {
          position: relative;
          min-height: 200vh;
          background: var(--cf-void);
          overflow-x: hidden;
        }

        /* Ambient Orbs */
        .ambient-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
        }

        .orb-iris {
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: var(--cf-iris);
          animation: breathe 16s infinite ease-in-out alternate;
        }

        .orb-aqua {
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: var(--cf-aqua);
          animation: breathe 20s infinite ease-in-out alternate-reverse;
        }

        @keyframes breathe {
          0% { transform: scale(0.8) translate(0, 0); opacity: 0.2; }
          100% { transform: scale(1.2) translate(50px, 50px); opacity: 0.5; }
        }

        /* Starfield */
        .starfield {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: starFadeIn 800ms forwards;
        }

        @keyframes starFadeIn {
          to { opacity: 0.6; }
        }

        /* Main Content wrapper */
        .content-layer {
          position: relative;
          z-index: 10;
          min-height: 100vh;
        }

        /* Navigation */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 500ms ease, transform 500ms ease;
        }
        
        .phase-2-plus .nav-bar,
        .phase-3-plus .nav-bar,
        .phase-4-plus .nav-bar,
        .phase-5-plus .nav-bar,
        .phase-6-plus .nav-bar {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-logo {
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-mark {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cf-bloom), var(--cf-iris), var(--cf-aqua));
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 400ms ease, transform 400ms ease;
        }

        .phase-4-plus .nav-link,
        .phase-5-plus .nav-link,
        .phase-6-plus .nav-link {
          opacity: 1;
          transform: translateY(0);
        }
        
        .phase-4-plus .nav-link:nth-child(1) { transition-delay: 0ms; }
        .phase-4-plus .nav-link:nth-child(2) { transition-delay: 120ms; }
        .phase-4-plus .nav-link:nth-child(3) { transition-delay: 240ms; }

        /* Cinematic Center */
        .cinematic-center {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: opacity 600ms ease, transform 600ms ease;
          pointer-events: none;
          z-index: 50;
        }

        .phase-6-plus .cinematic-center {
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
        }

        .headline-group {
          margin-bottom: 48px;
        }

        .headline {
          font-size: 80px;
          font-weight: 800;
          letter-spacing: -2px;
          background: linear-gradient(135deg, var(--cf-bloom), var(--cf-iris), var(--cf-aqua), var(--cf-viridian));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .phase-3-plus .headline,
        .phase-4-plus .headline,
        .phase-5-plus .headline,
        .phase-6-plus .headline {
          opacity: 1;
          transform: scale(1);
        }

        .subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 16px;
          font-weight: 400;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 600ms ease 200ms, transform 600ms ease 200ms;
        }

        .phase-3-plus .subtitle,
        .phase-4-plus .subtitle,
        .phase-5-plus .subtitle,
        .phase-6-plus .subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--cf-bloom), var(--cf-iris), var(--cf-aqua), var(--cf-viridian));
          background-size: 200% 200%;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 500ms ease, transform 500ms ease;
          pointer-events: auto;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0);
          animation: pulse-glow 3s infinite alternate;
        }
        
        .phase-5-plus .cta-btn,
        .phase-6-plus .cta-btn {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes pulse-glow {
          0% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); background-position: 0% 50%; }
          100% { box-shadow: 0 0 30px rgba(34, 211, 216, 0.5); background-position: 100% 50%; }
        }

        /* Two-Column Hero Layout */
        .hero-layout {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 160px 5% 80px;
          min-height: 100vh;
          opacity: 0;
          pointer-events: none;
          transition: opacity 600ms ease;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .phase-6-plus .hero-layout {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-left h1 {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
        }

        .hero-left p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 480px;
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-radius: 24px;
          padding: 32px;
        }

        .glass-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--cf-aqua);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .stat-val {
          font-size: 32px;
          font-weight: 700;
          color: #fff;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 4px;
        }

        /* Scroll sections */
        .content-section {
          padding: 100px 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 500ms ease, transform 500ms ease;
        }

        .scroll-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .token-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 48px;
        }

        .token-card {
          height: 120px;
          border-radius: 16px;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          font-weight: 500;
          font-size: 14px;
        }
      `}</style>

      {/* Persistent Ambient Elements */}
      <div className="ambient-orb orb-iris"></div>
      <div className="ambient-orb orb-aqua"></div>

      {phase >= 1 && (
        <div className="starfield">
          {stars.map((star) => {
            const w = star.size + 'px';
            const h = star.size + 'px';
            const left = star.x + '%';
            const top = star.y + '%';
            
            return (
              <div
                key={star.id}
                className="star"
                style={{
                  width: w,
                  height: h,
                  left: left,
                  top: top,
                  backgroundColor: star.color,
                  animationDelay: star.delay + 'ms'
                }}
              />
            );
          })}
        </div>
      )}

      <div className={`content-layer phase-${phase}-plus`}>
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-logo">
            <div className="logo-mark"></div>
            ChromaFlora
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">System</a>
            <a href="#" className="nav-link">Pages</a>
            <a href="#" className="nav-link">Tokens</a>
          </div>
        </nav>

        {/* Cinematic Header */}
        <div className="cinematic-center">
          <div className="headline-group">
            <div className="headline">ChromaFlora</div>
            <div className="subtitle">Cosmic Design Language</div>
          </div>
          <button className="cta-btn" onClick={() => setPhase(6)}>
            Enter the System &rarr;
          </button>
        </div>

        {/* Hero Layout */}
        <div className="hero-layout">
          <div className="hero-left">
            <h1>Luminous &<br/>Unbound.</h1>
            <p>
              A design system born from the void. ChromaFlora combines deep cosmic 
              backgrounds with vibrant bioluminescent accents to create interfaces 
              that feel alive, mysterious, and infinitely deep.
            </p>
            <button className="cta-btn" style={{ opacity: 1, transform: 'none' }}>
              Explore Components
            </button>
          </div>
          <div className="hero-right">
            <div className="glass-card">
              <div className="glass-title">System Metrics</div>
              <div className="stat-grid">
                <div>
                  <div className="stat-val">48+</div>
                  <div className="stat-label">Cosmic Components</div>
                </div>
                <div>
                  <div className="stat-val">0.05</div>
                  <div className="stat-label">Glass Opacity</div>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))' }}>
              <div className="glass-title">Nebula Gradient</div>
              <div style={{ height: '8px', background: 'linear-gradient(135deg, var(--cf-ember), var(--cf-bloom), var(--cf-iris), var(--cf-aqua))', borderRadius: '4px', marginTop: '16px' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Sections */}
        {phase === 6 && (
          <div style={{ marginTop: '100vh', paddingBottom: '100px' }}>
            <section className="content-section scroll-reveal">
              <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Foundational Tokens</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px' }}>
                The core palette is rooted in the absence of light, building depth through 
                progressively lighter states of the void, punctuated by vibrant flora.
              </p>
              
              <div className="token-grid">
                <div className="token-card" style={{ background: 'var(--cf-void)', border: '1px solid rgba(255,255,255,0.1)' }}>Void #04040f</div>
                <div className="token-card" style={{ background: 'var(--cf-abyss)', border: '1px solid rgba(255,255,255,0.1)' }}>Abyss #080818</div>
                <div className="token-card" style={{ background: 'var(--cf-deep)', border: '1px solid rgba(255,255,255,0.1)' }}>Deep #0d0d26</div>
                <div className="token-card" style={{ background: 'var(--cf-surface)', border: '1px solid rgba(255,255,255,0.1)' }}>Surface #13132a</div>
              </div>
            </section>
            
            <section className="content-section scroll-reveal" style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Bioluminescence</h2>
              <div className="token-grid">
                <div className="token-card" style={{ background: 'var(--cf-iris)', color: '#fff' }}>Iris</div>
                <div className="token-card" style={{ background: 'var(--cf-aqua)', color: '#000' }}>Aqua</div>
                <div className="token-card" style={{ background: 'var(--cf-bloom)', color: '#fff' }}>Bloom</div>
                <div className="token-card" style={{ background: 'var(--cf-viridian)', color: '#fff' }}>Viridian</div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
