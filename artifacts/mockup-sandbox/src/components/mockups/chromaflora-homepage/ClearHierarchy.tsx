import React from 'react';
import { Layers, Box, Droplets, Palette, ChevronDown, ArrowRight, Play, Book, Star } from 'lucide-react';

export function ClearHierarchy() {
  return (
    <div className="min-h-[100vh] w-full font-sans text-white overflow-y-auto" style={{ backgroundColor: '#04040f' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .aurora-text {
          background: linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .aurora-bg {
          background: linear-gradient(135deg, #ec4899, #a855f7, #22d3d8, #10b981);
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .section-divider {
          height: 1px;
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-orb {
          animation: pulse-slow 4s ease-in-out infinite, float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg aurora-bg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
          <span className="font-bold text-xl aurora-text tracking-tight">ChromaFlora</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/70 border border-white/10 ml-2">v3.0</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white text-sm font-semibold bg-purple-500/20 px-3 py-1.5 rounded-md transition-colors">System</a>
          <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
            Pages <ChevronDown size={14} />
          </a>
          <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Tokens</a>
        </nav>
        
        <button className="aurora-bg text-white text-sm font-semibold px-5 py-2 rounded-full hover:shadow-[0_0_20px_rgba(34,211,216,0.6)] transition-all">
          Export Kit
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-24 pt-16 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col items-start gap-6">
            <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22d3d8] animate-pulse"></span>
              <span className="text-[11px] font-semibold text-[#22d3d8] uppercase tracking-wider">Bioluminescent Interface OS</span>
            </div>
            
            <h1 className="text-[72px] font-[800] leading-[1.05] tracking-tight">
              Cosmic Design <br />
              <span className="aurora-text">Language</span>
            </h1>
            
            <p className="text-[16px] font-[400] text-white/80 max-w-[40ch] leading-relaxed">
              A comprehensive design system that brings the ethereal beauty of bioluminescence to modern web interfaces. Engineered for depth, clarity, and motion.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button className="bg-[#22d3d8]/10 text-[#22d3d8] border border-[#22d3d8]/50 font-bold text-[16px] px-8 py-4 rounded-lg flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,216,0.2)] hover:shadow-[0_0_40px_rgba(34,211,216,0.4)] hover:bg-[#22d3d8]/20 transition-all">
                Get Started <ArrowRight size={18} />
              </button>
              
              <button className="glass-panel text-white/90 font-medium text-[14px] px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors border-white/10 flex items-center gap-2">
                <Book size={16} /> Documentation
              </button>
              
              <button className="glass-panel text-white/90 font-medium text-[14px] px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors border-white/10 flex items-center gap-2">
                <Play size={16} /> Generator
              </button>
            </div>
          </div>
          
          {/* Right: Visual */}
          <div className="relative flex justify-center items-center opacity-70">
            <div className="absolute inset-0 bg-[#a855f7]/20 blur-[100px] rounded-full"></div>
            <div className="glass-panel p-12 rounded-2xl border-white/10 relative z-10 flex flex-col items-center justify-center aspect-square w-full max-w-md bg-[#13132a]/80 shadow-2xl">
              <div className="w-32 h-32 rounded-full aurora-bg animate-orb shadow-[0_0_60px_rgba(236,72,153,0.5)] flex items-center justify-center">
                <Star className="text-white w-12 h-12" />
              </div>
              <div className="mt-8 text-center">
                <span className="text-[11px] font-semibold text-[#a855f7] uppercase tracking-wider">✦ Bioluminescent Core</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start shadow-[inset_0_0_20px_rgba(168,85,247,0.05)] border-t border-t-[#a855f7]/30">
            <span className="text-[38px] font-[800] text-white leading-none mb-2">18+</span>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">Effects</span>
          </div>
          
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start shadow-[inset_0_0_20px_rgba(34,211,216,0.05)] border-t border-t-[#22d3d8]/30">
            <span className="text-[38px] font-[800] text-white leading-none mb-2">7</span>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">Genres</span>
          </div>
          
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start shadow-[inset_0_0_20px_rgba(236,72,153,0.05)] border-t border-t-[#ec4899]/30">
            <span className="text-[38px] font-[800] text-white leading-none mb-2">6</span>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">Morphisms</span>
          </div>
          
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start shadow-[inset_0_0_20px_rgba(249,115,22,0.05)] border-t border-t-[#f97316]/30">
            <span className="text-[38px] font-[800] text-white leading-none mb-2">0</span>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">Dependencies</span>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Morphism Strip */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#22d3d8] uppercase tracking-wider">Visual Language</span>
            <h2 className="text-[28px] font-[700] text-white">Morphism Catalog</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-[#22d3d8]/10 border border-[#22d3d8]/30 flex items-center justify-center text-[#22d3d8] group-hover:scale-110 transition-transform">
                <Droplets size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#22d3d8] uppercase tracking-wider">Style 01</span>
                <h3 className="text-[17px] font-[700] text-white">Glassmorphism</h3>
                <p className="text-[13px] font-[400] text-white/30 leading-snug mt-1">Frosted layers with distinct blur parameters and subtle inner borders.</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7] group-hover:scale-110 transition-transform">
                <Box size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#a855f7] uppercase tracking-wider">Style 02</span>
                <h3 className="text-[17px] font-[700] text-white">Claymorphism</h3>
                <p className="text-[13px] font-[400] text-white/30 leading-snug mt-1">Soft extruded elements combining multiple inner shadows for tactile depth.</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/30 flex items-center justify-center text-[#ec4899] group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#ec4899] uppercase tracking-wider">Style 03</span>
                <h3 className="text-[17px] font-[700] text-white">Neumorphism</h3>
                <p className="text-[13px] font-[400] text-white/30 leading-snug mt-1">Extruded surfaces matching background color with soft opposing light sources.</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center text-[#f97316] group-hover:scale-110 transition-transform">
                <Palette size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#f97316] uppercase tracking-wider">Style 04</span>
                <h3 className="text-[17px] font-[700] text-white">Material</h3>
                <p className="text-[13px] font-[400] text-white/30 leading-snug mt-1">Strict elevation shadows implying physical distance between layers.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Tokens Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#22d3d8] uppercase tracking-wider">System Foundations</span>
            <h2 className="text-[28px] font-[700] text-white">Design Tokens</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
              <div className="h-16 rounded-md bg-[#a855f7] shadow-[0_4px_20px_rgba(168,85,247,0.3)]"></div>
              <div>
                <div className="text-[13px] font-[600]">Iris</div>
                <div className="text-[11px] font-[400] text-white/50">#a855f7</div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
              <div className="h-16 rounded-md bg-[#22d3d8] shadow-[0_4px_20px_rgba(34,211,216,0.3)]"></div>
              <div>
                <div className="text-[13px] font-[600]">Aqua</div>
                <div className="text-[11px] font-[400] text-white/50">#22d3d8</div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
              <div className="h-16 rounded-md bg-[#ec4899] shadow-[0_4px_20px_rgba(236,72,153,0.3)]"></div>
              <div>
                <div className="text-[13px] font-[600]">Bloom</div>
                <div className="text-[11px] font-[400] text-white/50">#ec4899</div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
              <div className="h-16 rounded-md bg-[#f97316] shadow-[0_4px_20px_rgba(249,115,22,0.3)]"></div>
              <div>
                <div className="text-[13px] font-[600]">Ember</div>
                <div className="text-[11px] font-[400] text-white/50">#f97316</div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
              <div className="h-16 rounded-md bg-[#10b981] shadow-[0_4px_20px_rgba(16,185,129,0.3)]"></div>
              <div>
                <div className="text-[13px] font-[600]">Viridian</div>
                <div className="text-[11px] font-[400] text-white/50">#10b981</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 p-4 border-b border-white/10 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
              <div>Token Name</div>
              <div>Value</div>
              <div>Usage</div>
            </div>
            <div className="grid grid-cols-3 p-4 border-b border-white/5 text-[13px]">
              <div className="font-mono text-[#a855f7]">--bg-void</div>
              <div className="text-white/70">#04040f</div>
              <div className="text-white/50">Deepest background layer</div>
            </div>
            <div className="grid grid-cols-3 p-4 border-b border-white/5 text-[13px]">
              <div className="font-mono text-[#22d3d8]">--glass-bg</div>
              <div className="text-white/70">rgba(255,255,255,0.04)</div>
              <div className="text-white/50">Panel backgrounds</div>
            </div>
            <div className="grid grid-cols-3 p-4 text-[13px]">
              <div className="font-mono text-[#ec4899]">--glass-blur</div>
              <div className="text-white/70">20px</div>
              <div className="text-white/50">Panel backdrop filter</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#04040f] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-tight">ChromaFlora</span>
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)] ml-2"></span>
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-widest">All Systems Normal</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-[13px] font-[400] text-white/50 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-[13px] font-[400] text-white/50 hover:text-white transition-colors">Github</a>
            <a href="#" className="text-[13px] font-[400] text-white/50 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
