import React, { useState } from 'react';

export default function AccessibleReadable() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-y-auto text-white font-sans" style={{ backgroundColor: '#04040f', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :focus-visible {
          outline: 3px solid #a855f7 !important;
          outline-offset: 3px !important;
        }

        .glass-panel {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .aurora-text {
          background: linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-breathe { animation: breathe 8s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" aria-label="ChromaFlora home" className="flex items-center gap-3 group rounded-md">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 via-purple-500 to-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold aurora-text tracking-tight">ChromaFlora</span>
              <span className="px-2 py-0.5 rounded-full text-[12px] font-medium bg-white/10 text-white/90 border border-white/20">v3.0</span>
            </a>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <a href="#" className="text-white/88 hover:text-white font-medium underline decoration-white/30 underline-offset-4 rounded-sm">System</a>
              <div className="relative group">
                <button className="flex items-center gap-1 text-white/88 hover:text-white font-medium underline decoration-white/30 underline-offset-4 rounded-sm" aria-expanded="false" aria-haspopup="true">
                  Pages
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              <a href="#" className="text-white/88 hover:text-white font-medium underline decoration-white/30 underline-offset-4 rounded-sm">Tokens</a>
            </nav>

            <div className="hidden md:flex">
              <button className="px-5 py-2.5 rounded-full bg-white text-[#04040f] font-bold text-sm hover:bg-gray-100 transition-colors">
                Export Kit
              </button>
            </div>
            
            <button className="md:hidden p-2 text-white/90 rounded-md" aria-label="Toggle menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Notice for reduced motion */}
        <div className="hidden media-[prefers-reduced-motion:reduce]:block bg-white/10 text-white/90 text-sm py-2 px-4 text-center border-b border-white/10">
          Animations paused for accessibility preferences.
        </div>

        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Col */}
            <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 text-[#c084fc] text-sm font-semibold mb-8 border border-purple-500/30">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Bioluminescent Interface OS
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
                Cosmic Design <br />
                <span className="aurora-text">Language</span>
              </h1>
              
              <p className="text-lg text-white/88 mb-10 max-w-xl leading-relaxed font-medium">
                A design system built for the stars. ChromaFlora combines deep void backgrounds with bioluminescent accents and accessible glassmorphism to create highly legible, accessible, and stunning interfaces.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_4px_14px_rgba(168,85,247,0.3)]">
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
                <a href="#" className="px-6 py-3.5 rounded-full glass-panel text-white/90 font-bold hover:bg-white/10 transition-colors border border-white/20 underline decoration-white/50 underline-offset-4 flex items-center justify-center">
                  Documentation
                </a>
                <button className="px-6 py-3.5 rounded-full bg-transparent text-[#22d3d8] font-bold hover:bg-[#22d3d8]/10 transition-colors border border-[#22d3d8]/30 underline decoration-[#22d3d8]/50 underline-offset-4">
                  Generator
                </button>
              </div>
            </div>

            {/* Right Col */}
            <div className="relative h-[500px] flex items-center justify-center lg:justify-end">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_60%)] animate-breathe rounded-full"></div>
              
              <div className="relative w-full max-w-md aspect-square bg-[#13132a] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_20px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center p-8 overflow-hidden z-10 animate-float">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[60px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-[60px] rounded-full mix-blend-screen"></div>
                
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#ec4899] via-[#a855f7] to-[#22d3d8] flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)] mb-8">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ec4899] via-[#a855f7] to-[#22d3d8] blur-md absolute opacity-50 animate-breathe"></div>
                  <span className="text-5xl text-white relative z-10 font-serif">✦</span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2 text-center">Bioluminescent Core</h2>
                <p className="text-white/88 text-center text-sm font-medium max-w-[200px]">The nexus of cosmic design principles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-12 border-y border-white/10 bg-[#080818]" aria-label="System Statistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black aurora-text mb-2" aria-label="18 plus effects">18+</div>
                <div className="text-white/88 font-semibold text-sm tracking-wide uppercase">Effects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black aurora-text mb-2" aria-label="7 Genres">7</div>
                <div className="text-white/88 font-semibold text-sm tracking-wide uppercase">Genres</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black aurora-text mb-2" aria-label="6 Morphisms">6</div>
                <div className="text-white/88 font-semibold text-sm tracking-wide uppercase">Morphisms</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black aurora-text mb-2" aria-label="0 Dependencies">0</div>
                <div className="text-white/88 font-semibold text-sm tracking-wide uppercase">Dependencies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Morphisms */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Design Languages</h2>
            <p className="text-white/88 text-lg max-w-2xl font-medium">Explore the different visual paradigms supported out of the box by ChromaFlora's token system.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Glassmorphism */}
            <button className="text-left group glass-panel p-6 rounded-2xl hover:bg-white/10 transition-colors border border-[#22d3d8]/30 h-full w-full focus-visible:outline-none">
              <div className="w-12 h-12 rounded-lg bg-[#22d3d8]/20 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded bg-[#22d3d8]"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Glassmorphism</h3>
              <p className="text-white/88 text-sm leading-relaxed">Translucent backgrounds with background blur and subtle borders.</p>
            </button>

            {/* Claymorphism */}
            <button className="text-left group bg-[#13132a] p-6 rounded-2xl border border-[#a855f7]/30 shadow-[4px_4px_16px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(0,0,0,0.5),inset_4px_4px_8px_rgba(255,255,255,0.1)] hover:brightness-110 transition-all h-full w-full focus-visible:outline-none">
              <div className="w-12 h-12 rounded-lg bg-[#a855f7]/20 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded-full bg-[#a855f7]"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Claymorphism</h3>
              <p className="text-white/88 text-sm leading-relaxed">Soft, inflated surfaces with double inner shadows for a tactile feel.</p>
            </button>

            {/* Neumorphism */}
            <button className="text-left group bg-[#0d0d26] p-6 rounded-2xl border border-transparent shadow-[5px_5px_10px_#05050f,-5px_-5px_10px_#15153d] hover:shadow-[inset_5px_5px_10px_#05050f,inset_-5px_-5px_10px_#15153d] transition-shadow h-full w-full focus-visible:outline-none">
              <div className="w-12 h-12 rounded-lg bg-[#ec4899]/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded bg-[#ec4899] rotate-45"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Neumorphism</h3>
              <p className="text-white/88 text-sm leading-relaxed">Extruded surfaces that appear to push out from the background.</p>
            </button>
            
            {/* Material */}
            <button className="text-left group bg-[#1a1a38] p-6 rounded-2xl border border-[#f97316]/20 shadow-lg hover:shadow-xl transition-shadow h-full w-full focus-visible:outline-none">
              <div className="w-12 h-12 rounded-lg bg-[#f97316]/20 flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-[#f97316]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Material</h3>
              <p className="text-white/88 text-sm leading-relaxed">Flat surfaces with distinct elevation dropshadows and sharp edges.</p>
            </button>
          </div>
        </section>

        {/* Tokens Section */}
        <section className="py-24 bg-[#080818] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12">Core Tokens</h2>
            
            <div className="space-y-12">
              {/* Colors */}
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-6 border-b border-white/10 pb-2">Accents</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Iris', hex: '#a855f7', textColor: 'text-white' },
                    { name: 'Aqua', hex: '#22d3d8', textColor: 'text-[#04040f]' },
                    { name: 'Bloom', hex: '#ec4899', textColor: 'text-white' },
                    { name: 'Ember', hex: '#f97316', textColor: 'text-white' },
                    { name: 'Viridian', hex: '#10b981', textColor: 'text-[#04040f]' }
                  ].map(color => (
                    <div key={color.name} className="flex flex-col gap-2">
                      <div className="h-20 rounded-lg w-full border border-white/10 shadow-sm" style={{ backgroundColor: color.hex }}></div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-white">{color.name}</span>
                        <span className="text-white/70 font-mono">{color.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backgrounds */}
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-6 border-b border-white/10 pb-2">Backgrounds</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Void', hex: '#04040f' },
                    { name: 'Abyss', hex: '#080818' },
                    { name: 'Deep', hex: '#0d0d26' },
                    { name: 'Surface', hex: '#13132a' },
                    { name: 'Elevated', hex: '#1a1a38' }
                  ].map(color => (
                    <div key={color.name} className="flex flex-col gap-2">
                      <div className="h-20 rounded-lg w-full border border-white/20" style={{ backgroundColor: color.hex }}></div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-white">{color.name}</span>
                        <span className="text-white/70 font-mono">{color.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#04040f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white tracking-tight">ChromaFlora</span>
            <span className="flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              All systems nominal
            </span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm" aria-label="Footer Navigation">
            <a href="#" className="text-white/88 hover:text-white underline decoration-white/30 underline-offset-4">GitHub</a>
            <a href="#" className="text-white/88 hover:text-white underline decoration-white/30 underline-offset-4">Figma</a>
            <a href="#" className="text-white/88 hover:text-white underline decoration-white/30 underline-offset-4">Twitter</a>
            <a href="#" className="text-white/88 hover:text-white underline decoration-white/30 underline-offset-4">NPM</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
