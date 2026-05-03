import React, { useEffect, useState, useRef } from 'react';

export default function AtomicZoom() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Calculate progress 0 to 4
  const progress = Math.min(4, Math.max(0, scrollY / vh));
  
  const getLevelStyle = (levelIndex: number) => {
    const diff = progress - levelIndex;
    // diff < -1: far below, opacity 0, scale 0.95
    // diff = 0: current, opacity 1, scale 1
    // diff > 1: far above, opacity 0, scale 1.05
    let opacity = 0;
    let scale = 1;
    
    if (diff > -1 && diff < 1) {
      opacity = 1 - Math.abs(diff);
      scale = 1 + (diff * 0.05);
    } else if (diff <= -1) {
      scale = 0.95;
    } else if (diff >= 1) {
      scale = 1.05;
    }

    return {
      opacity,
      transform: 'scale(' + scale + ')',
      pointerEvents: (diff > -0.5 && diff < 0.5) ? 'auto' : 'none' as const,
    };
  };

  return (
    <div className="cf-zoom-container" ref={containerRef}>
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
          --cf-iris-light: #c084fc;
          
          --cf-text-high: #ffffff;
          --cf-text-med: rgba(255,255,255,0.75);
          --cf-text-low: rgba(255,255,255,0.5);
          --cf-text-dim: rgba(255,255,255,0.3);
          
          --cf-glass-bg: rgba(255,255,255,0.05);
          --cf-glass-border: rgba(255,255,255,0.10);
        }
        
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--cf-void);
          color: var(--cf-text-high);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        .cf-zoom-container {
          position: relative;
          height: 500vh;
        }
        
        .cf-fixed-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        
        .cf-starfield {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.5) 100%, transparent),
            radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.6) 100%, transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.7) 100%, transparent),
            radial-gradient(1px 1px at 80% 80%, rgba(255,255,255,0.5) 100%, transparent);
          background-size: 200px 200px;
          opacity: 0.3;
          z-index: 0;
        }
        
        .cf-ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          z-index: 0;
          transition: all 1s ease;
        }
        
        .cf-level {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          will-change: transform, opacity;
        }
        
        .cf-caption {
          position: absolute;
          bottom: 10vh;
          font-size: 14px;
          color: var(--cf-text-med);
          text-align: center;
          letter-spacing: 0.5px;
        }
        
        .cf-glow-circle {
          border-radius: 50%;
          box-shadow: 0 0 60px currentColor, inset 0 0 20px currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .cf-glass-card {
          background: var(--cf-glass-bg);
          border: 1px solid var(--cf-glass-border);
          backdrop-filter: blur(32px);
          border-radius: 24px;
          padding: 40px;
        }
        
        /* Level 0 */
        .cf-l0-circle {
          width: 180px;
          height: 180px;
          color: var(--cf-iris);
          background: var(--cf-iris);
        }
        .cf-l0-label {
          position: absolute;
          top: calc(100% + 24px);
          text-align: center;
          font-family: monospace;
        }
        
        /* Level 1 */
        .cf-l1-cluster {
          position: relative;
          width: 600px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cf-l1-token {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .cf-l1-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          box-shadow: 0 0 40px currentColor;
        }
        
        /* Level 2 */
        .cf-l2-card {
          width: 400px;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        /* Level 3 */
        .cf-l3-hero {
          display: flex;
          align-items: center;
          gap: 60px;
          max-width: 1200px;
          width: 100%;
          padding: 0 40px;
        }
        .cf-l3-left {
          flex: 1;
        }
        .cf-l3-right {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        
        /* Level 4 */
        .cf-l4-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          max-width: 1400px;
          width: 100%;
          padding: 40px;
        }
        .cf-l4-panel {
          height: 60vh;
          border-radius: 16px;
        }
        
        .aurora-text {
          background: linear-gradient(135deg, var(--cf-bloom), var(--cf-iris), var(--cf-aqua), var(--cf-viridian));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cf-btn-aurora {
          background: linear-gradient(135deg, var(--cf-bloom), var(--cf-iris), var(--cf-aqua), var(--cf-viridian));
          border: none;
          padding: 16px 32px;
          border-radius: 999px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .cf-btn-aurora:hover {
          opacity: 0.9;
        }
      `}</style>

      <div className="cf-fixed-wrapper">
        <div className="cf-starfield" />
        
        {/* Dynamic ambient orbs based on progress */}
        <div 
          className="cf-ambient-orb" 
          style={{ 
            top: '20%', left: '30%', width: '600px', height: '600px', 
            background: 'var(--cf-iris)',
            opacity: progress < 0.5 ? 0.3 : 0.15 
          }} 
        />
        <div 
          className="cf-ambient-orb" 
          style={{ 
            bottom: '10%', right: '20%', width: '500px', height: '500px', 
            background: progress >= 1 ? 'var(--cf-aqua)' : 'transparent',
            opacity: progress >= 1 ? 0.15 : 0
          }} 
        />

        {/* Level 0: The Atom */}
        <div className="cf-level" style={getLevelStyle(0)}>
          <div className="cf-glow-circle cf-l0-circle">
            <div className="cf-l0-label">
              <div style={{ color: 'var(--cf-text-high)', fontSize: '13px' }}>--iris</div>
              <div style={{ color: 'var(--cf-text-dim)', fontSize: '11px', marginTop: '4px' }}>#a855f7</div>
            </div>
          </div>
          <div className="cf-caption">This is where ChromaFlora begins.</div>
        </div>

        {/* Level 1: The Palette */}
        <div className="cf-level" style={getLevelStyle(1)}>
          <div className="cf-l1-cluster">
            {[
              { id: 'iris', color: 'var(--cf-iris)', label: '--iris', pos: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.2)' } },
              { id: 'aqua', color: 'var(--cf-aqua)', label: '--aqua', pos: { top: '20%', left: '20%' } },
              { id: 'bloom', color: 'var(--cf-bloom)', label: '--bloom', pos: { top: '20%', right: '20%' } },
              { id: 'ember', color: 'var(--cf-ember)', label: '--ember', pos: { bottom: '20%', left: '30%' } },
              { id: 'viridian', color: 'var(--cf-viridian)', label: '--viridian', pos: { bottom: '20%', right: '30%' } },
              { id: 'iris-light', color: 'var(--cf-iris-light)', label: '--iris-light', pos: { top: '80%', left: '50%', transform: 'translateX(-50%)' } },
            ].map(token => (
              <div key={token.id} className="cf-l1-token" style={token.pos}>
                <div className="cf-l1-circle" style={{ color: token.color, background: token.color }} />
                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--cf-text-med)' }}>{token.label}</div>
              </div>
            ))}
          </div>
          <div className="cf-caption">6 bioluminescent tokens. Every colour in the system.</div>
        </div>

        {/* Level 2: The Surface */}
        <div className="cf-level" style={getLevelStyle(2)}>
          <div className="cf-glass-card cf-l2-card">
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--cf-iris)', filter: 'blur(50px)', opacity: 0.5, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--cf-aqua)', filter: 'blur(50px)', opacity: 0.5, borderRadius: '50%' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1, marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--cf-bloom), var(--cf-aqua))' }} />
              <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>ChromaFlora</span>
            </div>
            <div style={{ zIndex: 1, color: 'var(--cf-text-med)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Design System
            </div>
          </div>
          <div className="cf-caption">One component. Six tokens. Infinite combinations.</div>
        </div>

        {/* Level 3: The System */}
        <div className="cf-level" style={getLevelStyle(3)}>
          <div className="cf-l3-hero">
            <div className="cf-l3-left">
              <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px' }}>
                <span className="aurora-text">Cosmic Design</span><br />
                Language
              </h1>
              <p style={{ fontSize: '20px', color: 'var(--cf-text-med)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                A bioluminescent design system built for deep space interfaces and elevated digital experiences.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="cf-btn-aurora">Get Started</button>
                <button className="cf-glass-card" style={{ padding: '16px 32px', borderRadius: '999px', border: '1px solid var(--cf-glass-border)', color: 'white', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Components</button>
              </div>
            </div>
            <div className="cf-l3-right">
              <div className="cf-glass-card cf-l2-card" style={{ transform: 'scale(1.2)' }}>
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--cf-iris)', filter: 'blur(50px)', opacity: 0.5, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--cf-aqua)', filter: 'blur(50px)', opacity: 0.5, borderRadius: '50%' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1, marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--cf-bloom), var(--cf-aqua))' }} />
                  <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>ChromaFlora</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cf-caption">The interface.</div>
        </div>

        {/* Level 4: The Design OS */}
        <div className="cf-level" style={getLevelStyle(4)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '40px' }}>
            
            <div className="cf-l4-grid">
              <div className="cf-glass-card cf-l4-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--cf-text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hero Section</div>
                <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ width: '60%', height: '24px', background: 'var(--cf-glass-bg)', borderRadius: '4px', marginBottom: '12px' }} />
                  <div style={{ width: '40%', height: '12px', background: 'var(--cf-glass-bg)', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ width: '45%', height: '12px', background: 'var(--cf-glass-bg)', borderRadius: '4px', marginBottom: '24px' }} />
                  <div style={{ width: '80px', height: '32px', background: 'var(--cf-iris)', borderRadius: '16px', opacity: 0.8 }} />
                </div>
              </div>
              
              <div className="cf-glass-card cf-l4-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--cf-text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Morphism Strip</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, background: 'var(--cf-glass-bg)', border: '1px solid var(--cf-glass-border)', borderRadius: '12px' }} />
                  ))}
                </div>
              </div>
              
              <div className="cf-glass-card cf-l4-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--cf-text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Token Grid</div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {['--cf-iris', '--cf-aqua', '--cf-bloom', '--cf-ember', '--cf-viridian', '--cf-iris-light'].map(t => (
                    <div key={t} style={{ background: `var(${t})`, borderRadius: '12px', opacity: 0.8 }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-1px' }}>ChromaFlora — Cosmic Design Language.</h2>
              <button className="cf-btn-aurora" style={{ padding: '16px 40px', fontSize: '18px' }}>
                Enter the System &rarr;
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
