import React, { useEffect, useState, useRef } from 'react';

export function TighterHierarchy() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const StatItem = ({ label, value }: { label: string; value: number }) => {
    const [count, setCount] = useState(0);
    const [hasTriggered, setHasTriggered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            let start = 0;
            const duration = 1500;
            const stepTime = 16;
            const steps = duration / stepTime;
            const stepValue = value / steps;

            const timer = setInterval(() => {
              start += stepValue;
              if (start >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, stepTime);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) observer.disconnect();
      };
    }, [value, hasTriggered]);

    return (
      <div ref={ref} className="flex flex-col items-center justify-center p-6 border-r border-white/5 last:border-0">
        <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-[#22d3d8] mb-2 font-mono">
          {count}
        </div>
        <div className="text-sm font-medium tracking-widest text-white/50 uppercase">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#04040f] text-white font-sans overflow-x-hidden relative selection:bg-[#a855f7]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --iris: #a855f7;
          --aqua: #22d3d8;
          --bloom: #ec4899;
          --ember: #f97316;
          --viridian: #10b981;
          --void: #04040f;
          --abyss: #080818;
          --deep: #0d0d26;
          --surface: #13132a;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--void);
          color: white;
          margin: 0;
          padding: 0;
        }

        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        @keyframes ambient-orb {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes rotate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .orb-1 {
          animation: ambient-orb 15s ease-in-out infinite;
          background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0) 70%);
        }

        .orb-2 {
          animation: ambient-orb 18s ease-in-out infinite reverse;
          background: radial-gradient(circle, rgba(34,211,216,0.1) 0%, rgba(34,211,216,0) 70%);
        }

        .orb-3 {
          animation: ambient-orb 20s ease-in-out infinite 2s;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0) 70%);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .glass-nav {
          background: rgba(4, 4, 15, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gradient-text-primary {
          background: linear-gradient(135deg, #ffffff 0%, var(--aqua) 50%, var(--iris) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .clay-visual {
          border-radius: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
          box-shadow: 
            inset 5px 5px 20px rgba(255,255,255,0.05),
            inset -5px -5px 20px rgba(0,0,0,0.5),
            0 20px 40px rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
        }

        .clay-orb {
          background: linear-gradient(135deg, var(--bloom), var(--iris), var(--aqua), var(--viridian));
          background-size: 300% 300%;
          animation: rotate-gradient 8s ease infinite;
          box-shadow: 
            inset -10px -10px 20px rgba(0,0,0,0.3),
            inset 10px 10px 20px rgba(255,255,255,0.4),
            0 0 40px rgba(168,85,247,0.4);
        }

        .btn-primary {
          background: rgba(34, 211, 216, 0.1);
          border: 1px solid rgba(34, 211, 216, 0.5);
          color: var(--aqua);
          text-shadow: 0 0 10px rgba(34, 211, 216, 0.5);
          box-shadow: 0 0 20px rgba(34, 211, 216, 0.2);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: rgba(34, 211, 216, 0.2);
          box-shadow: 0 0 30px rgba(34, 211, 216, 0.4);
          transform: translateY(-2px);
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s ease;
        }

        .btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .bg-grain {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#22d3d8] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] orb-1 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] orb-2 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] orb-3 rounded-full mix-blend-screen filter blur-[100px]" />
        
        {/* Starfield / Grid overlay could go here */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22d3d8] flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#04040f] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#22d3d8] shadow-[0_0_10px_rgba(34,211,216,0.8)]" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight gradient-text-primary">ChromaFlora</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-[#a855f7]/30 text-[#a855f7] bg-[#a855f7]/10">v3.0</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#" className="hover:text-white transition-colors">Components</a>
            <a href="#" className="hover:text-white transition-colors">Tokens</a>
            <div className="w-[1px] h-4 bg-white/10" />
            <a href="#" className="text-white hover:text-[#22d3d8] transition-colors">Documentation</a>
            <button className="px-5 py-2 rounded-full text-white text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              Download Kit
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-stretch min-h-[70vh]">
          {/* Glass Hero Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group min-h-[600px]">
            <div className="bg-grain" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#22d3d8]" />
                <span className="text-[#22d3d8] text-sm font-bold tracking-[0.2em] uppercase">Design System</span>
              </div>
              
              <h1 className="text-5xl md:text-[62px] leading-[1.1] font-black tracking-[-0.02em] mb-8">
                Cosmic <span className="gradient-text-primary">Bioluminescent</span><br />
                Architecture.
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-[44ch]">
                A tactile, post-screen design language blending glassmorphism depth, glowing clay surfaces, and dark void aesthetics for next-generation interfaces.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-primary px-8 py-4 rounded-full font-semibold tracking-wide">
                  Explore Components
                </button>
                <button className="btn-ghost px-8 py-4 rounded-full font-medium tracking-wide">
                  Read Philosophy
                </button>
                <button className="text-white/50 hover:text-white text-sm font-medium px-4 py-2 transition-colors ml-auto md:ml-4">
                  View Source →
                </button>
              </div>
            </div>
            
            {/* Subtle border highlight effect */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-3xl transition-colors duration-700 pointer-events-none" />
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
          </div>

          {/* Clay Visual */}
          <div className="lg:col-span-5 clay-visual p-8 flex items-center justify-center relative min-h-[400px] lg:min-h-[600px]">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full clay-orb relative z-10">
              <div className="absolute inset-0 rounded-full border border-white/20 mix-blend-overlay" />
            </div>
            {/* Decorative orbit rings */}
            <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full border-dashed" />
            <div className="absolute w-[150%] h-[150%] border border-[#a855f7]/20 rounded-full" />
          </div>
        </section>

        {/* Morphism Strip */}
        <section className="py-10 border-y border-white/10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-[#22d3d8]" />
            <span className="text-[#22d3d8] text-xs font-bold tracking-widest uppercase">Design Paradigms</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Glassmorphism", desc: "Translucent layers & blur", icon: "🧊" },
              { title: "Claymorphism", desc: "Soft extruded surfaces", icon: "🫧" },
              { title: "Neumorphism", desc: "Extruded void shapes", icon: "🌒" },
              { title: "Material", desc: "Tactile hierarchy", icon: "🔮" }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group">
                <div className="text-3xl mb-4 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm text-white/50 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Row */}
        <section className="glass-panel rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-white/5">
            <StatItem label="Effects" value={18} />
            <StatItem label="Genres" value={7} />
            <StatItem label="Morphisms" value={6} />
            <StatItem label="Dependencies" value={0} />
          </div>
        </section>

        {/* Design Tokens Preview */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-[#22d3d8]" />
            <span className="text-[#22d3d8] text-xs font-bold tracking-widest uppercase">Core Tokens</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Accent Palette</h3>
              <div className="space-y-4">
                {[
                  { name: '--iris', color: '#a855f7' },
                  { name: '--aqua', color: '#22d3d8' },
                  { name: '--bloom', color: '#ec4899' },
                  { name: '--ember', color: '#f97316' },
                  { name: '--viridian', color: '#10b981' }
                ].map(token => (
                  <div key={token.name} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: token.color, boxShadow: `0 0 15px \${token.color}40` }} />
                    <div className="flex-1">
                      <div className="font-mono text-sm">{token.name}</div>
                      <div className="text-xs text-white/40">{token.color}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6">Gradients</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm mb-2 text-white/70">Aurora</div>
                    <div className="h-16 rounded-xl bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#22d3d8]" />
                  </div>
                  <div>
                    <div className="text-sm mb-2 text-white/70">Nebula</div>
                    <div className="h-16 rounded-xl bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#a855f7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22d3d8] flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#04040f] rounded-full" />
            </div>
            <span className="font-semibold text-white/80">ChromaFlora</span>
          </div>
          <div className="text-sm text-white/40 flex items-center gap-6">
            <span>© 2024 Jennipher Troup</span>
            <a href="https://twitter.com/halcyonminx" className="hover:text-[#22d3d8] transition-colors">@halcyonminx</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
