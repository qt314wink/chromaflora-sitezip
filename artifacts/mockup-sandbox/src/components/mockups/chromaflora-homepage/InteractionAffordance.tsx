import React, { useState, useEffect } from 'react';

export default function InteractionAffordance() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .interactive-card, input, select');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const progressWidth = (scrollProgress * 100) + '%';
  const progressGlowX = (scrollProgress * 100) + 'vw';

  return (
    <div className="min-h-[100vh] overflow-y-auto text-white" style={{ background: '#04040f' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
          cursor: none;
        }

        :focus-visible {
          outline: 2px solid #22d3d8;
          outline-offset: 2px;
          border-radius: inherit;
        }

        .aurora-gradient {
          background: linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981);
        }

        .aurora-text {
          background: linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
        }

        /* Nav */
        .nav-header {
          background: rgba(8, 8, 24, 0.85); /* Increased opacity for affordance */
        }
        
        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-bottom: 2px solid #a855f7;
        }
        .nav-link.active {
          background: #a855f7;
          border-radius: 999px;
          border-bottom: none;
        }
        
        /* Buttons */
        .btn-primary {
          background: #22d3d8;
          color: #04040f;
          transition: all 0.2s ease;
          box-shadow: 0 0 10px rgba(34, 211, 216, 0.2);
        }
        .btn-primary:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(34, 211, 216, 0.6);
        }

        .btn-secondary {
          background: transparent;
          border: 1.5px solid #ffffff;
          color: #ffffff;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-tertiary {
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          transition: all 0.2s ease;
        }
        .btn-tertiary:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Custom Cursor */
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          background: #fff;
          border: 1px solid #a855f7;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease, background 0.2s ease;
        }
        .cursor-dot.hovering {
          transform: translate(-50%, -50%) scale(1.5);
          background: transparent;
          border-color: #22d3d8;
        }

        /* Scroll Progress */
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          z-index: 1000;
        }
        .scroll-progress-glow {
          position: fixed;
          top: 0;
          width: 10px;
          height: 3px;
          background: #fff;
          box-shadow: 0 0 10px #22d3d8, 0 0 20px #22d3d8;
          z-index: 1001;
        }

        /* Interactive Card */
        .interactive-card {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .interactive-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px);
        }
        .interactive-card .card-arrow {
          transition: transform 0.3s ease;
        }
        .interactive-card:hover .card-arrow {
          transform: translateX(4px);
        }
        .interactive-card .card-explore {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .interactive-card:hover .card-explore {
          opacity: 1;
        }

        /* Dropdown Icon */
        .dropdown-trigger:hover .dropdown-icon {
          transform: rotate(180deg);
        }
        .dropdown-icon {
          transition: transform 0.3s ease;
        }

        /* Stats Card Hover */
        .stat-card {
          transition: background 0.3s ease;
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .stat-card .stat-view-all {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .stat-card:hover .stat-view-all {
          opacity: 1;
        }

        /* Blob Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Custom Cursor */}
      <div 
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Scroll Progress */}
      <div className="scroll-progress-bar aurora-gradient" style={{ width: progressWidth }} />
      <div className="scroll-progress-glow" style={{ transform: 'translateX(' + progressGlowX + ')' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel nav-header border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 interactive-card" role="button" tabIndex={0}>
          <div className="w-8 h-8 rounded aurora-gradient flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">C</span>
          </div>
          <span className="font-bold text-xl tracking-tight aurora-text">ChromaFlora</span>
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-white/10 text-white/70">v3.0</span>
        </div>

        <nav className="flex items-center gap-2">
          <a href="#" className="nav-link px-4 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white">System</a>
          
          <div className="relative group">
            <button className="nav-link px-4 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white flex items-center gap-1 dropdown-trigger">
              Pages
              <svg className="w-3 h-3 dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <a href="#" className="nav-link active px-4 py-2 text-sm font-medium text-white">Tokens</a>
        </nav>

        <button className="btn-primary rounded-full px-6 py-2.5 text-sm font-bold min-w-[120px]">
          Export Kit
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass-panel p-10 rounded-3xl relative interactive-card group">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-aqua text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#22d3d8] animate-pulse-glow" />
              Bioluminescent Interface OS
            </div>
            
            <h1 className="text-6xl font-black tracking-tight mb-6 leading-tight">
              Cosmic Design <br/>
              <span className="aurora-text">Language</span>
            </h1>
            
            <p className="text-lg text-white/50 mb-10 max-w-md leading-relaxed">
              An interstellar design system prioritizing vibrant glows, profound depth, and unmistakable interactions.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="btn-primary flex items-center justify-center gap-2 h-[44px] px-5 rounded-full font-bold min-w-[120px]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started
              </button>
              <button className="btn-secondary h-[44px] px-5 rounded-full font-semibold min-w-[120px]">
                Documentation
              </button>
              <button className="btn-tertiary h-[44px] px-4 font-medium min-w-[120px]">
                Generator
              </button>
            </div>

            <div className="absolute bottom-4 left-6 text-[10px] text-white/30 font-medium tracking-wide card-explore">
              Drag to explore &rarr;
            </div>
          </div>

          <div className="relative h-[500px] rounded-3xl bg-[#13132a] border border-[#a855f7]/20 flex items-center justify-center overflow-hidden interactive-card" style={{ boxShadow: 'inset 0 0 40px rgba(168, 85, 247, 0.1)' }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            
            <div className="w-64 h-64 rounded-full aurora-gradient blur-3xl opacity-30 animate-float" />
            <div className="w-48 h-48 rounded-full bg-[#1a1a38] border border-white/10 z-10 flex flex-col items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 rounded-full border border-[#22d3d8]/30 scale-110 opacity-50" />
              <span className="text-4xl mb-2 text-[#a855f7]">✦</span>
              <span className="text-xs font-bold tracking-widest text-white/70 uppercase">Bioluminescent<br/>Core</span>
            </div>
            
            <div className="absolute bottom-6 right-6 flex items-center gap-1 text-sm font-medium text-white/50 card-explore">
              Interact <span className="card-arrow">&rarr;</span>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Effects', val: '18+', color: '#22d3d8' },
            { label: 'Genres', val: '7', color: '#a855f7' },
            { label: 'Morphisms', val: '6', color: '#ec4899' },
            { label: 'Dependencies', val: '0', color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-start stat-card interactive-card cursor-pointer" role="button" tabIndex={0}>
              <span className="text-4xl font-black mb-1" style={{ color: stat.color }}>{stat.val}</span>
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">{stat.label}</span>
              <div className="mt-4 text-[10px] text-white/40 uppercase tracking-widest font-bold stat-view-all flex items-center gap-1">
                View all <span className="card-arrow">&rarr;</span>
              </div>
            </div>
          ))}
        </section>

        {/* Morphism Strip */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white/90">Design Philosophies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Glassmorphism', desc: 'Frosted depth', color: '#22d3d8' },
              { name: 'Claymorphism', desc: 'Soft 3D volumes', color: '#a855f7' },
              { name: 'Neumorphism', desc: 'Extruded surfaces', color: '#ec4899' },
              { name: 'Material', desc: 'Quantum paper', color: '#f97316' }
            ].map((morph, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-l-4 interactive-card cursor-pointer group" style={{ borderLeftColor: morph.color }} role="button" tabIndex={0}>
                <h3 className="text-lg font-bold text-white mb-2">{morph.name}</h3>
                <p className="text-sm text-white/50">{morph.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: morph.color }}>Explore</span>
                  <span className="card-arrow" style={{ color: morph.color }}>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tokens Section */}
        <section className="glass-panel p-10 rounded-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-2">Core Tokens</h2>
            <p className="text-sm text-white/50">Foundational colors driving the bioluminescent aesthetic.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Iris', hex: '#a855f7' },
              { name: 'Aqua', hex: '#22d3d8' },
              { name: 'Bloom', hex: '#ec4899' },
              { name: 'Ember', hex: '#f97316' },
              { name: 'Viridian', hex: '#10b981' }
            ].map((color, i) => (
              <div key={i} className="interactive-card rounded-xl overflow-hidden cursor-pointer" role="button" tabIndex={0}>
                <div className="h-24 w-full" style={{ background: color.hex }} />
                <div className="p-4 bg-[#080818] border-t border-white/5 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">{color.name}</span>
                  <span className="text-xs text-white/40 font-mono">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 mt-8">
            <div className="grid grid-cols-4 text-xs font-bold text-white/30 uppercase tracking-wider pb-2 border-b border-white/5">
              <span>Token</span>
              <span>Value</span>
              <span>Role</span>
              <span className="text-right">Action</span>
            </div>
            {[
              { token: 'bg-void', val: '#04040f', role: 'Deepest background' },
              { token: 'bg-abyss', val: '#080818', role: 'Secondary background' },
              { token: 'text-primary', val: '#ffffff', role: 'Main headings' },
              { token: 'glass-blur', val: 'blur(32px)', role: 'Panel frost' }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 text-sm items-center py-3 border-b border-white/5 hover:bg-white/5 transition-colors rounded px-2 -mx-2">
                <span className="font-mono text-white/70">{row.token}</span>
                <span className="font-mono text-[#22d3d8]">{row.val}</span>
                <span className="text-white/50">{row.role}</span>
                <div className="text-right">
                  <button className="text-xs text-[#a855f7] hover:text-white font-medium interactive-card">Copy</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg aurora-text">ChromaFlora</span>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-glow" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Systems Online</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-white/50">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Figma</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
