import React, { useEffect, useRef, useState } from 'react';

const BioluminescentFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, radius: number, speedX: number, speedY: number, color: string }[] = [];

    const colors = ['#ec4899', '#a855f7', '#22d3d8', '#10b981'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth / 10;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25 + 0.5, // flowing right mostly
          speedY: Math.random() * 0.4 - 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-[300px] relative overflow-hidden my-24 border-y border-white/5 bg-[#04040f]/50">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#04040f] via-transparent to-[#04040f]" />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
         <div className="text-center">
            <h3 className="text-[var(--aqua)] tracking-[0.2em] text-xs font-bold uppercase mb-4">Bioluminescent Flow</h3>
            <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">Particles driven by fluid dynamics algorithms, rendering at 60fps with canvas-native bloom.</p>
         </div>
      </div>
    </div>
  );
};

export function LuminousDepth() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrolled(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#04040f] text-white font-['Inter',sans-serif] overflow-x-hidden selection:bg-[#a855f7]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --iris: #a855f7;
          --aqua: #22d3d8;
          --bloom: #ec4899;
          --ember: #f97316;
          --viridian: #10b981;
        }

        .ambient-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 0;
          animation: float 20s infinite ease-in-out alternate;
          pointer-events: none;
        }

        .orb-1 { width: 900px; height: 900px; background: var(--iris); opacity: 0.4; top: -200px; left: -200px; }
        .orb-2 { width: 700px; height: 700px; background: var(--aqua); opacity: 0.3; bottom: -100px; right: -100px; animation-delay: -5s; }
        .orb-3 { width: 500px; height: 500px; background: var(--bloom); opacity: 0.25; top: 40%; left: 30%; animation-delay: -10s; }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
          100% { transform: translate(-30px, 60px) scale(0.9); }
        }

        @keyframes orb-morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }
        
        .hero-card {
          position: relative;
        }
        
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 20%, var(--iris) 50%, var(--aqua), transparent);
          z-index: 10;
        }

        .hero-card:hover {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .aurora-gradient {
          background: linear-gradient(135deg, var(--bloom), var(--iris), var(--aqua), var(--viridian));
          background-size: 300% 300%;
          animation: aurora-pan 10s ease infinite;
        }

        @keyframes aurora-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .clay-orb {
          width: 100%;
          height: 100%;
          animation: orb-morph 8s ease-in-out infinite;
          box-shadow: inset 20px 20px 60px rgba(255,255,255,0.2),
                      inset -20px -20px 60px rgba(0,0,0,0.5),
                      0 20px 40px rgba(0,0,0,0.4);
        }
        
        .clay-orb-inner {
          position: absolute;
          inset: 20%;
          background: linear-gradient(135deg, var(--viridian), var(--aqua), var(--iris), var(--bloom));
          background-size: 300% 300%;
          animation: orb-morph 6s ease-in-out infinite reverse, aurora-pan 8s ease infinite;
          box-shadow: inset 10px 10px 30px rgba(0,0,0,0.4),
                      0 10px 20px rgba(255,255,255,0.2);
          opacity: 0.8;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#04040f]">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPC9zdmc+')] opacity-20" />
      </div>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-50 aurora-gradient"
        style={{ width: `${scrolled * 100}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card rounded-2xl px-6 py-3" style={{ backdropFilter: 'blur(48px) saturate(2.0)', background: 'rgba(255,255,255,0.03)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full aurora-gradient animate-spin-slow shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--aqua)] to-[var(--iris)]">
              ChromaFlora
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-white/70 ml-2">v3.0</span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-white relative group">
              Philosophy
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--aqua)] shadow-[0_0_10px_var(--aqua)] scale-x-100 transition-transform" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Components</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Resources</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          
          <div className="glass-card hero-card rounded-3xl p-12">
            <h2 className="text-[var(--aqua)] tracking-[0.2em] text-xs font-bold uppercase mb-6">Design System</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]" style={{ textShadow: '0 0 20px rgba(168,85,247,0.5)' }}>Cosmic</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--aqua)] to-[var(--viridian)]" style={{ textShadow: '0 0 20px rgba(34,211,216,0.5)' }}>Design</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--bloom)] to-[var(--ember)]" style={{ textShadow: '0 0 20px rgba(236,72,153,0.5)' }}>Language</span>
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed font-light max-w-md">
              A comprehensive UI kit marrying deep space aesthetics with modern web capabilities. Neon, glass, and clay perfectly balanced.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-opacity-90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Explore Components
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all glass-card">
                Documentation
              </button>
            </div>
          </div>

          <div className="relative h-[600px] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--iris)] to-[var(--aqua)] opacity-20 blur-[100px] rounded-full" />
            <div className="w-[80%] h-[80%] relative">
               <div className="clay-orb aurora-gradient relative overflow-hidden">
                  <div className="clay-orb-inner" />
               </div>
            </div>
          </div>
        </div>

        <BioluminescentFlow />

        {/* Morphism Strip */}
        <div className="mb-32">
          <h2 className="text-[var(--aqua)] tracking-[0.2em] text-xs font-bold uppercase mb-12 text-center">Core Philosophies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              { title: 'Glassmorphism', color: 'var(--aqua)', desc: 'Blurred backdrops, translucent borders, and light edges.' },
              { title: 'Claymorphism', color: 'var(--iris)', desc: 'Soft 3D shapes, inner shadows, and fluffy depth.' },
              { title: 'Neumorphism', color: 'var(--bloom)', desc: 'Extruded surfaces matching the background void.' },
              { title: 'Material', color: 'var(--ember)', desc: 'Tactile layers, realistic shadows, and physical seams.' }
            ].map((card, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 opacity-70 group-hover:opacity-100" 
                  style={{ background: card.color, boxShadow: `0 0 20px \${card.color}` }}
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                  style={{ background: card.color }}
                />
                <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center glass-card relative z-10">
                  <div className="w-6 h-6 rounded-full" style={{ background: card.color, boxShadow: `0 0 15px \${card.color}` }} />
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10 text-white group-hover:text-transparent group-hover:bg-clip-text transition-colors" style={{ backgroundImage: `linear-gradient(90deg, white, \${card.color})` }}>{card.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed relative z-10 group-hover:text-white/70 transition-colors">{card.desc}</p>
              </div>
            ))}
            
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { label: 'Effects', val: '18', color: 'var(--iris)' },
            { label: 'Genres', val: '7', color: 'var(--aqua)' },
            { label: 'Morphisms', val: '6', color: 'var(--bloom)' },
            { label: 'Deps', val: '0', color: 'var(--ember)' }
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 text-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-40" style={{ background: stat.color }} />
              <div className="text-5xl font-black mb-2 tracking-tighter aurora-gradient text-transparent bg-clip-text relative z-10">{stat.val}</div>
              <div className="text-sm uppercase tracking-widest text-white/50 font-semibold relative z-10">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tokens Grid */}
        <div className="mb-32">
          <h2 className="text-[var(--aqua)] tracking-[0.2em] text-xs font-bold uppercase mb-12 text-center">Core Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
             {[
               { name: 'Void', hex: '#04040f', color: '#04040f', ring: 'rgba(255,255,255,0.1)' },
               { name: 'Abyss', hex: '#080818', color: '#080818', ring: 'rgba(255,255,255,0.1)' },
               { name: 'Deep', hex: '#0d0d26', color: '#0d0d26', ring: 'rgba(255,255,255,0.1)' },
               { name: 'Surface', hex: '#13132a', color: '#13132a', ring: 'rgba(255,255,255,0.2)' },
               { name: 'Iris', hex: '#a855f7', color: 'var(--iris)', ring: 'var(--iris)' },
               { name: 'Aqua', hex: '#22d3d8', color: 'var(--aqua)', ring: 'var(--aqua)' },
               { name: 'Bloom', hex: '#ec4899', color: 'var(--bloom)', ring: 'var(--bloom)' },
               { name: 'Ember', hex: '#f97316', color: 'var(--ember)', ring: 'var(--ember)' }
             ].map((token, i) => (
               <div key={i} className="flex flex-col items-center group">
                 <div 
                   className="w-20 h-20 rounded-full mb-4 border border-white/10 transition-all duration-300"
                   style={{ 
                     background: token.color,
                     boxShadow: `0 0 30px \${token.ring}`,
                     transform: 'scale(1)'
                   }}
                 />
                 <div className="text-sm font-semibold mb-1" style={{ color: i >= 4 ? token.color : 'white' }}>{token.name}</div>
                 <div className="text-xs text-white/40 font-mono">{token.hex}</div>
               </div>
             ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-card py-12 text-center mt-20">
        <div className="text-2xl font-bold tracking-tight mb-2 aurora-gradient text-transparent bg-clip-text inline-block">
          ChromaFlora v3.0
        </div>
        <div className="text-sm text-white/50">
          by Jennipher Troup <span className="mx-2 opacity-50">•</span> @halcyonminx
        </div>
      </footer>
    </div>
  );
}
