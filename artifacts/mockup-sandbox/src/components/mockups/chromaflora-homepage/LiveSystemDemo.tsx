import React, { useState, useEffect } from 'react';

const ACCENTS = {
  iris: { hex: '#a855f7', name: 'Iris' },
  aqua: { hex: '#22d3d8', name: 'Aqua' },
  bloom: { hex: '#ec4899', name: 'Bloom' },
  ember: { hex: '#f97316', name: 'Ember' },
  viridian: { hex: '#10b981', name: 'Viridian' }
};

export function LiveSystemDemo() {
  const [accent, setAccent] = useState<'iris' | 'aqua' | 'bloom' | 'ember' | 'viridian'>('iris');
  const [blur, setBlur] = useState<number>(32);
  const [opacity, setOpacity] = useState<number>(0.05);
  const [morphism, setMorphism] = useState<'glass' | 'clay' | 'neu'>('glass');
  const [toast, setToast] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast('Copied ' + text);
    setTimeout(() => setToast(null), 2000);
  };

  const currentAccent = ACCENTS[accent];

  const getCardStyle = (morph: 'glass' | 'clay' | 'neu') => {
    if (morph === 'glass') {
      return {
        background: 'rgba(255, 255, 255, ' + opacity + ')',
        backdropFilter: 'blur(' + blur + 'px)',
        WebkitBackdropFilter: 'blur(' + blur + 'px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
      };
    }
    if (morph === 'clay') {
      return {
        background: '#13132a',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: 'inset -4px -4px 10px rgba(0, 0, 0, 0.5), inset 4px 4px 10px rgba(255, 255, 255, 0.1), 8px 8px 16px rgba(0, 0, 0, 0.4)'
      };
    }
    if (morph === 'neu') {
      return {
        background: '#0d0d26',
        borderRadius: '16px',
        border: 'none',
        boxShadow: 'inset 2px 2px 5px rgba(255, 255, 255, 0.05), inset -3px -3px 7px rgba(0, 0, 0, 0.5), 5px 5px 15px rgba(0, 0, 0, 0.5), -5px -5px 15px rgba(255,255,255,0.02)'
      };
    }
    return {};
  };

  const getDynamicStyle = () => {
    return {
      ...getCardStyle(morphism),
      boxShadow: morphism === 'glass' ? '0 0 40px ' + currentAccent.hex + '33, inset 0 1px 0 rgba(255,255,255,0.1)' : getCardStyle(morphism).boxShadow,
      borderColor: morphism === 'glass' ? currentAccent.hex + '66' : getCardStyle(morphism).border
    };
  };

  return (
    <div style={{
      backgroundColor: '#04040f',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Slider styling */
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          margin-top: -6px;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
        
        /* Effects Animations */
        @keyframes orbPulse {
          0% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 10px #a855f7; }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 30px #a855f7, 0 0 50px #a855f7; }
          100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 10px #a855f7; }
        }
        
        @keyframes auroraFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes starDrift {
          from { transform: translateY(100px); opacity: 0; }
          50% { opacity: 1; }
          to { transform: translateY(-100px); opacity: 0; }
        }
        
        @keyframes morphBlob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          33% { border-radius: 70% 30% 50% 50% / 50% 70% 30% 50%; }
          66% { border-radius: 50% 50% 30% 70% / 70% 30% 70% 30%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899; }
          20%, 22%, 24%, 55% { opacity: 0.5; text-shadow: none; }
        }
        
        @keyframes gravityBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          51% { animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }

        .morphism-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .morphism-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#ffffff',
          color: '#04040f',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: 600,
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(4, 4, 15, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: currentAccent.hex, boxShadow: '0 0 12px ' + currentAccent.hex }}></div>
          <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '18px' }}>ChromaFlora</span>
        </div>
        <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>System</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Tokens</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Components</a>
        </nav>
        <button style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Export Kit
        </button>
      </header>

      {/* Hero Playground */}
      <section style={{ height: 'calc(100vh - 70px)', display: 'flex' }}>
        {/* Left: Canvas */}
        <div style={{
          width: '55%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)'
        }}>
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            fontVariantNumeric: 'tabular-nums'
          }}>
            — {currentAccent.name} Token Active
          </div>

          <div style={{
            width: '400px',
            padding: '40px',
            borderRadius: '24px',
            transition: 'all 0.3s ease',
            ...getDynamicStyle()
          }}>
            <div style={{ fontSize: '32px', color: currentAccent.hex, marginBottom: '24px' }}>✦</div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Live Component</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '15px' }}>
              Interact with the controls to mutate this surface. The CSS is updated in real-time, completely bypassing static mockups.
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div style={{
          width: '45%',
          padding: '64px',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          background: '#080818',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '40px'
        }}>
          {/* Accent Control */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Accent Colour</label>
              <button onClick={() => copyToClipboard('var(--cf-' + accent + ')')} style={{ background: 'none', border: 'none', color: currentAccent.hex, fontSize: '12px', cursor: 'pointer' }}>Copy Token</button>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {(Object.keys(ACCENTS) as Array<keyof typeof ACCENTS>).map((key) => (
                <button
                  key={key}
                  onClick={() => setAccent(key)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: ACCENTS[key].hex,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: accent === key ? '0 0 0 2px #080818, 0 0 0 4px ' + ACCENTS[key].hex : 'none',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Morphism Switcher */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Surface Archetype</label>
            </div>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px' }}>
              {['glass', 'clay', 'neu'].map(type => (
                <button
                  key={type}
                  onClick={() => setMorphism(type as any)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    background: morphism === type ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: morphism === type ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Blur Slider */}
          <div style={{ opacity: morphism === 'glass' ? 1 : 0.3, pointerEvents: morphism === 'glass' ? 'auto' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Glass Blur: {blur}px</label>
              <button onClick={() => copyToClipboard('blur(' + blur + 'px)')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer' }}>Copy Value</button>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
            />
          </div>

          {/* Opacity Slider */}
          <div style={{ opacity: morphism === 'glass' ? 1 : 0.3, pointerEvents: morphism === 'glass' ? 'auto' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Surface Opacity: {opacity.toFixed(2)}</label>
              <button onClick={() => copyToClipboard('rgba(255, 255, 255, ' + opacity + ')')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer' }}>Copy Value</button>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.20"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
          </div>

        </div>
      </section>

      {/* Effects Gallery */}
      <section style={{ padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ color: ACCENTS.iris.hex, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interaction Engine</span>
          <h3 style={{ fontSize: '32px', fontWeight: 700, marginTop: '8px' }}>18 Live Effects</h3>
        </div>
        
        <div className="no-scrollbar" style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '24px' }}>
          {/* Orb Pulse */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: ACCENTS.iris.hex, animation: 'orbPulse 2s infinite ease-in-out' }}></div>
            </div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Orb Pulse</div>
          </div>
          
          {/* Aurora Flow */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1, margin: '24px', borderRadius: '8px', background: 'linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981)', backgroundSize: '300% 300%', animation: 'auroraFlow 4s ease infinite' }}></div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Aurora Flow</div>
          </div>

          {/* Star Drift */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ position: 'absolute', width: '2px', height: '2px', background: '#fff', borderRadius: '50%', left: 20 * i + '%', animation: 'starDrift ' + (2 + i*0.5) + 's infinite linear', animationDelay: i*0.2 + 's' }}></div>
              ))}
            </div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>Star Drift</div>
          </div>

          {/* Morph Blob */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: ACCENTS.aqua.hex, animation: 'morphBlob 4s infinite ease-in-out' }}></div>
            </div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Morph Blob</div>
          </div>

          {/* Neon Flicker */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENTS.bloom.hex, fontSize: '24px', fontWeight: 800, animation: 'neonFlicker 3s infinite' }}>
              NEON
            </div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Neon Flicker</div>
          </div>

          {/* Gravity Bounce */}
          <div style={{ minWidth: '200px', height: '160px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
              <div style={{ width: '16px', height: '16px', background: ACCENTS.ember.hex, borderRadius: '50%', animation: 'gravityBounce 1s infinite' }}></div>
            </div>
            <div style={{ padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Gravity Bounce</div>
          </div>
        </div>
      </section>

      {/* Morphism Comparison */}
      <section style={{ padding: '80px 32px', background: '#080818' }}>
        <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Surface Renderings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="morphism-card" style={{ ...getCardStyle('glass'), padding: '32px' }}>
            <div style={{ color: ACCENTS.aqua.hex, fontSize: '24px', marginBottom: '16px' }}>▣</div>
            <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Glass</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>Translucent panels utilizing backdrop blur and subtle edge highlighting.</p>
          </div>

          <div className="morphism-card" style={{ ...getCardStyle('clay'), padding: '32px' }}>
            <div style={{ color: ACCENTS.bloom.hex, fontSize: '24px', marginBottom: '16px' }}>▤</div>
            <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Clay</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>Soft, volumetric extrusions with inset lighting and smooth shadows.</p>
          </div>

          <div className="morphism-card" style={{ ...getCardStyle('neu'), padding: '32px' }}>
            <div style={{ color: ACCENTS.viridian.hex, fontSize: '24px', marginBottom: '16px' }}>▦</div>
            <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Neu</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>Extruded flat surfaces matching the background, separated by directional shadow.</p>
          </div>

        </div>
      </section>

      {/* Token Reference */}
      <section style={{ padding: '80px 32px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '40px', textAlign: 'center' }}>Accent Tokens</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {(Object.entries(ACCENTS) as [keyof typeof ACCENTS, typeof ACCENTS[keyof typeof ACCENTS]][]).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => copyToClipboard(val.hex)}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{val.name}</span>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: val.hex,
                boxShadow: '0 0 24px ' + val.hex + '40',
                marginBottom: '16px',
                transition: 'transform 0.2s'
              }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></div>
              <span style={{ fontSize: '14px', fontFamily: 'monospace' }}>{val.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 700, color: '#fff' }}>ChromaFlora</span>
          <span>by @halcyonminx</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENTS.viridian.hex, boxShadow: '0 0 8px ' + ACCENTS.viridian.hex }}></div>
          System Live
        </div>
      </footer>

    </div>
  );
}
