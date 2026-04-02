/**
 * ChromaFlora Persistent Player Bar v1.0
 * ─────────────────────────────────────────
 * Runs across ALL pages. Creates a fixed bottom bar
 * with Web Audio synthesis. State persists via localStorage.
 * On player.html, auto-minimizes the bar (full player takes over).
 */
(function ChromaPlayerBar() {
  'use strict';
  const STORAGE_KEY = 'cf_player';
  const IS_PLAYER_PAGE = location.pathname.includes('player.html');

  /* ── Genre definitions (compact) ── */
  const GENRES = [
    { key:'lofi',      name:'Lofi',       icon:'☕', bpm:75,  colorA:'#f97316', colorB:'#a855f7',
      chords:[[174.61,220,261.63],[164.81,207.65,246.94],[146.83,185,220],[130.81,164.81,196]],
      filterFreq:2800, reverbMix:0.55, type:'sine', kick:false, bass:true },
    { key:'ambient',   name:'Ambient',    icon:'🌌', bpm:50,  colorA:'#22d3ee', colorB:'#6366f1',
      chords:[[130.81,164.81,196,246.94],[174.61,220,261.63,329.63],[110,164.81,196,246.94],[98,130.81,164.81,196]],
      filterFreq:6000, reverbMix:0.85, type:'sine', kick:false, bass:false },
    { key:'rnb',       name:'R&B',        icon:'🎙', bpm:92,  colorA:'#ec4899', colorB:'#f97316',
      chords:[[130.81,164.81,196,246.94],[110,130.81,164.81,207.65],[174.61,220,261.63,329.63],[98,130.81,164.81,185]],
      filterFreq:5000, reverbMix:0.35, type:'sawtooth', kick:true, bass:true },
    { key:'techno',    name:'Techno',     icon:'⚡', bpm:132, colorA:'#6366f1', colorB:'#22d3ee',
      chords:[[110,130.81,164.81],[164.81,196,246.94],[146.83,174.61,220],[110,130.81,164.81]],
      filterFreq:8000, reverbMix:0.15, type:'sawtooth', kick:true, bass:true },
    { key:'jazz',      name:'Jazz',       icon:'🎷', bpm:115, colorA:'#f59e0b', colorB:'#ec4899',
      chords:[[130.81,164.81,196,246.94],[146.83,174.61,220,261.63],[98,130.81,185,220],[130.81,164.81,196,246.94]],
      filterFreq:7000, reverbMix:0.40, type:'triangle', kick:false, bass:true },
    { key:'house',     name:'House',      icon:'🏠', bpm:128, colorA:'#10b981', colorB:'#22d3ee',
      chords:[[110,130.81,164.81],[146.83,174.61,220],[98,123.47,164.81],[110,130.81,164.81]],
      filterFreq:9000, reverbMix:0.20, type:'sawtooth', kick:true, bass:true },
    { key:'liquiddub', name:'Liquid Dub', icon:'🌊', bpm:172, colorA:'#a855f7', colorB:'#10b981',
      chords:[[73.42,87.31,110],[98,116.54,146.83],[116.54,146.83,185],[110,130.81,164.81]],
      filterFreq:4000, reverbMix:0.60, type:'sine', kick:true, bass:true },
  ];

  /* ── State ── */
  let state = {
    genreIdx: 0, isPlaying: false, volume: 0.7,
    isMuted: false, bpmOffset: 0,
  };
  let audioCtx = null, masterGain, analyser, convolver, reverbGain;
  let beatInterval = null, beat = 0, chordIdx = 0;
  let activeNodes = [];
  let vizFrame = null;

  /* ── Load / Save state ── */
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      state = Object.assign(state, saved);
    } catch(e) {}
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  /* ── Audio init ── */
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    masterGain = audioCtx.createGain();
    masterGain.gain.value = state.volume;
    reverbGain = audioCtx.createGain();
    reverbGain.gain.value = 0.3;
    convolver = audioCtx.createConvolver();
    const buf = makeReverb(audioCtx, 2, 3);
    convolver.buffer = buf;
    masterGain.connect(analyser);
    masterGain.connect(convolver);
    convolver.connect(reverbGain);
    reverbGain.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function makeReverb(ctx, dur, decay) {
    const sr = ctx.sampleRate, len = sr * dur;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/len, decay);
    }
    return buf;
  }

  function playNote(freq, t, dur, vol, type, atk=0.01, rel=0.08) {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t+atk);
    gain.gain.setValueAtTime(vol, t+dur-rel);
    gain.gain.linearRampToValueAtTime(0, t+dur);
    osc.connect(gain); gain.connect(masterGain);
    osc.start(t); osc.stop(t+dur+0.05);
    activeNodes.push(osc, gain);
  }

  function playKick(t, vol=0.5) {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(150,t);
    osc.frequency.exponentialRampToValueAtTime(40,t+0.15);
    gain.gain.setValueAtTime(vol,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.3);
    osc.connect(gain); gain.connect(masterGain);
    osc.start(t); osc.stop(t+0.35); activeNodes.push(osc,gain);
  }

  function playSnare(t, vol=0.2, dur=0.07) {
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate*dur, audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    const src = audioCtx.createBufferSource(), gain = audioCtx.createGain();
    const filt = audioCtx.createBiquadFilter();
    filt.type='highpass'; filt.frequency.value=2200;
    gain.gain.setValueAtTime(vol,t); gain.gain.exponentialRampToValueAtTime(0.001,t+dur);
    src.buffer=buf; src.connect(filt); filt.connect(gain); gain.connect(masterGain);
    src.start(t); src.stop(t+dur+0.05); activeNodes.push(src,gain,filt);
  }

  function playBass(freq, t, dur, vol) {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    const lp = audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=350;
    osc.type='sawtooth'; osc.frequency.value=freq/2;
    gain.gain.setValueAtTime(0,t); gain.gain.linearRampToValueAtTime(vol,t+0.02);
    gain.gain.setValueAtTime(vol,t+dur-0.05); gain.gain.linearRampToValueAtTime(0,t+dur);
    osc.connect(lp); lp.connect(gain); gain.connect(masterGain);
    osc.start(t); osc.stop(t+dur+0.05); activeNodes.push(osc,gain,lp);
  }

  function scheduleBeat() {
    const g = GENRES[state.genreIdx];
    const beatDur = 60 / (g.bpm + state.bpmOffset);
    const now = audioCtx.currentTime, t = now;
    const beatInBar = beat % 16;
    if (beatInBar % 4 === 0) chordIdx = Math.floor(beatInBar/4) % g.chords.length;
    const freqs = g.chords[chordIdx];
    const root = freqs[0];

    switch(g.key) {
      case 'lofi':
        if (beatInBar%4===0) freqs.forEach((f,i)=>playNote(f,t+i*0.02,beatDur*3.5,0.12/freqs.length,g.type));
        if (g.bass&&beatInBar%2===0) playBass(root,t,beatDur*1.8,0.3);
        if (Math.random()>0.75) playSnare(t,0.025,0.015);
        break;
      case 'ambient':
        if (beatInBar%8===0) freqs.forEach((f,i)=>playNote(f,t+i*beatDur*0.3,beatDur*7,0.08/freqs.length,g.type,0.4,0.9));
        break;
      case 'rnb':
        if (beatInBar%4===0||beatInBar%4===2) freqs.forEach((f,i)=>playNote(f,t+i*0.015,beatDur*0.5,0.1/freqs.length,g.type));
        if (g.kick&&(beatInBar===0||beatInBar===8)) playKick(t,0.45);
        if (beatInBar===4||beatInBar===12) playSnare(t,0.18,0.1);
        if (g.bass&&beatInBar%2===0) playBass(root,t,beatDur*1.4,0.35);
        break;
      case 'techno':
        playKick(t,0.5); if (beatInBar%2===1) playSnare(t,0.13,0.04);
        playSnare(t+beatDur*0.5,0.08,0.02);
        if (g.bass&&beatInBar%4===0) playBass(root,t,beatDur*3.5,0.45);
        if (beatInBar%8===0) freqs.forEach(f=>playNote(f,t,beatDur*0.25,0.08/freqs.length,g.type));
        break;
      case 'jazz':
        playBass(freqs[beatInBar%freqs.length],t,beatDur*0.85,0.3);
        if (beatInBar%4===1||beatInBar%4===3) freqs.forEach((f,i)=>playNote(f,t+i*0.03,beatDur*0.6,0.08/freqs.length,g.type));
        playSnare(t,0.05,0.04); if (beatInBar%4===1||beatInBar%4===3) playSnare(t,0.15,0.08);
        break;
      case 'house':
        playKick(t,0.55); if (beatInBar%4===2) playSnare(t,0.18,0.1);
        if (beatInBar%2===1) playSnare(t,0.1,0.05);
        if (g.bass&&beatInBar%4<=1) playBass(root,t,beatDur*0.8,0.42);
        if (beatInBar%8===0) freqs.forEach(f=>playNote(f,t,beatDur*2,0.07/freqs.length,g.type));
        break;
      case 'liquiddub':
        if (beatInBar%4===0) playKick(t,0.65); if (beatInBar%4===2) playSnare(t,0.13,0.12);
        if (beatInBar%4===0&&g.bass) playBass(root,t,beatDur*3.5,0.55);
        if (beatInBar%8===0) {
          freqs.forEach(f=>playNote(f,t,beatDur*6,0.06/freqs.length,g.type));
          freqs.forEach(f=>playNote(f,t+beatDur*0.375,beatDur*4,0.03/freqs.length,g.type));
        }
        break;
    }
    beat++;
  }

  function startPlay() {
    if (!audioCtx) initAudio();
    if (audioCtx.state==='suspended') audioCtx.resume();
    const g = GENRES[state.genreIdx];
    const beatMs = (60/(g.bpm+state.bpmOffset))*1000;
    beat=0; chordIdx=0;
    scheduleBeat();
    beatInterval = setInterval(scheduleBeat, beatMs);
    state.isPlaying = true;
    saveState();
    updateBarUI();
    startViz();
  }

  function stopPlay() {
    clearInterval(beatInterval); beatInterval=null;
    if (masterGain && audioCtx) masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.25);
    setTimeout(()=>{
      activeNodes.forEach(n=>{try{n.stop?.();}catch(e){}});
      activeNodes=[];
      if (masterGain&&audioCtx) masterGain.gain.setValueAtTime(state.volume, audioCtx.currentTime);
    },280);
    state.isPlaying = false;
    saveState();
    updateBarUI();
  }

  function togglePlay() { if (state.isPlaying) stopPlay(); else startPlay(); }

  function prevGenre() { state.genreIdx=(state.genreIdx-1+GENRES.length)%GENRES.length; changeGenre(); }
  function nextGenre() { state.genreIdx=(state.genreIdx+1)%GENRES.length; changeGenre(); }
  function changeGenre() {
    const wasPlaying = state.isPlaying;
    if (wasPlaying) stopPlay();
    updateBarUI();
    saveState();
    if (wasPlaying) setTimeout(startPlay, 350);
    // Notify player page if open
    try { localStorage.setItem('cf_player_event', JSON.stringify({type:'genreChange', genreIdx:state.genreIdx, ts:Date.now()})); } catch(e) {}
  }

  /* ── Visualizer ── */
  function startViz() {
    if (vizFrame) cancelAnimationFrame(vizFrame);
    const canvas = document.getElementById('pb-viz');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dataArr = new Uint8Array(analyser ? analyser.frequencyBinCount : 64);
    function draw() {
      vizFrame = requestAnimationFrame(draw);
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      if (!analyser) return;
      analyser.getByteFrequencyData(dataArr);
      const g = GENRES[state.genreIdx];
      const bars = Math.min(dataArr.length, 32);
      for (let i=0;i<bars;i++) {
        const h = (dataArr[i]/255)*H*0.9;
        const x = (i/bars)*W, w=W/bars-1;
        const hue = i/bars*200+Date.now()*0.02;
        ctx.fillStyle = `hsla(${hue},90%,65%,0.85)`;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x,H-h,Math.max(w,1),Math.max(h,1),2);
        else ctx.rect(x,H-h,Math.max(w,1),Math.max(h,1));
        ctx.fill();
      }
    }
    draw();
  }

  /* ── Build bar UI ── */
  function buildBar() {
    const g = GENRES[state.genreIdx];
    const bar = document.createElement('div');
    bar.id = 'cf-player-bar';

    const css = `
      #cf-player-bar {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 800;
        height: 62px;
        background: rgba(4,4,15,0.97);
        backdrop-filter: blur(24px);
        border-top: 1px solid rgba(168,85,247,0.2);
        display: flex; align-items: center;
        padding: 0 18px; gap: 16px;
        box-shadow: 0 -4px 30px rgba(0,0,0,0.6);
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        font-family: 'Inter', -apple-system, sans-serif;
      }
      #cf-player-bar.pb-hidden { transform: translateY(100%); }
      .pb-genre {
        display: flex; align-items: center; gap: 8px; min-width: 100px;
        cursor: pointer;
      }
      .pb-icon { font-size: 20px; line-height: 1; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      .pb-genre:hover .pb-icon { transform: scale(1.2); }
      .pb-name { font-size: 12px; font-weight: 700; color: white; }
      .pb-bpm { font-size: 10px; color: rgba(255,255,255,0.4); font-family: 'JetBrains Mono', monospace; }
      .pb-controls { display: flex; align-items: center; gap: 8px; }
      .pb-btn {
        width: 32px; height: 32px; border-radius: 50%; border: none; cursor: pointer;
        background: rgba(255,255,255,0.07); color: white; font-size: 14px;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.1s ease;
      }
      .pb-btn:hover { background: rgba(255,255,255,0.15); transform: scale(1.1); }
      .pb-btn:active { transform: scale(0.92); }
      .pb-btn.play {
        width: 40px; height: 40px; font-size: 16px;
        background: linear-gradient(135deg, var(--pba, #a855f7), var(--pbb, #ec4899));
        box-shadow: 0 4px 14px rgba(168,85,247,0.35);
      }
      .pb-btn.play:hover { box-shadow: 0 6px 20px rgba(168,85,247,0.55); }
      .pb-viz-wrap {
        flex: 1; height: 40px; border-radius: 8px;
        background: rgba(0,0,0,0.3); overflow: hidden; position: relative;
      }
      #pb-viz { display: block; width: 100%; height: 100%; }
      .pb-vol-wrap { display: flex; align-items: center; gap: 6px; }
      .pb-vol-icon { font-size: 14px; color: rgba(255,255,255,0.5); cursor: pointer; }
      #pb-vol {
        width: 70px; height: 3px; -webkit-appearance: none; appearance: none;
        background: linear-gradient(to right, #a855f7 var(--pct,70%), rgba(255,255,255,0.12) var(--pct,70%));
        border-radius: 3px; cursor: pointer;
      }
      #pb-vol::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: white; }
      .pb-link {
        padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 600;
        border: 1px solid rgba(168,85,247,0.3); background: rgba(168,85,247,0.1);
        color: rgba(200,150,255,0.9); text-decoration: none; white-space: nowrap;
        transition: all 0.1s ease;
      }
      .pb-link:hover { background: rgba(168,85,247,0.2); color: white; }
      .pb-toggle {
        position: fixed; bottom: 62px; right: 16px; z-index: 801;
        width: 28px; height: 20px; border-radius: 6px 6px 0 0;
        background: rgba(168,85,247,0.4); border: none; cursor: pointer;
        color: white; font-size: 10px; display: flex; align-items: center; justify-content: center;
      }
      @media (max-width: 600px) {
        .pb-viz-wrap { display: none; }
        .pb-link { display: none; }
        .pb-bpm { display: none; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    bar.innerHTML = `
      <div class="pb-genre" id="pb-genre" title="Click to see genre">
        <div class="pb-icon" id="pb-icon">${g.icon}</div>
        <div>
          <div class="pb-name" id="pb-name">${g.name}</div>
          <div class="pb-bpm" id="pb-bpm">${g.bpm} BPM</div>
        </div>
      </div>
      <div class="pb-controls">
        <button class="pb-btn" id="pb-prev" title="Previous genre">⏮</button>
        <button class="pb-btn play" id="pb-play" title="Play / Pause"
          style="--pba:${g.colorA};--pbb:${g.colorB}">▶</button>
        <button class="pb-btn" id="pb-next" title="Next genre">⏭</button>
      </div>
      <div class="pb-viz-wrap">
        <canvas id="pb-viz"></canvas>
      </div>
      <div class="pb-vol-wrap">
        <span class="pb-vol-icon" id="pb-mute">🔊</span>
        <input type="range" id="pb-vol" min="0" max="100" value="${Math.round(state.volume*100)}"
          style="--pct:${Math.round(state.volume*100)}%">
      </div>
      <a href="player.html" class="pb-link">Full Player ↗</a>
    `;

    document.body.appendChild(bar);

    // Add padding to body so content isn't hidden behind bar
    document.body.style.paddingBottom = '62px';

    // Resize viz canvas
    setTimeout(() => {
      const vizEl = document.getElementById('pb-viz');
      if (vizEl) {
        vizEl.width = vizEl.offsetWidth * (window.devicePixelRatio||1);
        vizEl.height = vizEl.offsetHeight * (window.devicePixelRatio||1);
      }
    }, 100);

    // Bind controls
    document.getElementById('pb-play').addEventListener('click', () => {
      initAudio();
      togglePlay();
    });
    document.getElementById('pb-prev').addEventListener('click', () => { initAudio(); prevGenre(); });
    document.getElementById('pb-next').addEventListener('click', () => { initAudio(); nextGenre(); });
    document.getElementById('pb-genre').addEventListener('click', () => { initAudio(); nextGenre(); });
    document.getElementById('pb-mute').addEventListener('click', () => {
      state.isMuted = !state.isMuted;
      if (masterGain) masterGain.gain.setTargetAtTime(state.isMuted ? 0 : state.volume, audioCtx.currentTime, 0.05);
      document.getElementById('pb-mute').textContent = state.isMuted ? '🔇' : '🔊';
    });
    document.getElementById('pb-vol').addEventListener('input', function() {
      state.volume = this.value/100;
      this.style.setProperty('--pct', this.value+'%');
      if (masterGain&&audioCtx&&!state.isMuted) masterGain.gain.setTargetAtTime(state.volume, audioCtx.currentTime, 0.05);
      saveState();
    });

    // Listen for changes from the full player page
    window.addEventListener('storage', e => {
      if (e.key === 'cf_player') {
        try {
          const newState = JSON.parse(e.newValue||'{}');
          if (newState.genreIdx !== undefined && newState.genreIdx !== state.genreIdx) {
            state.genreIdx = newState.genreIdx;
            updateBarUI();
          }
          if (newState.isPlaying !== undefined && newState.isPlaying !== state.isPlaying) {
            if (newState.isPlaying) { initAudio(); startPlay(); }
            else stopPlay();
          }
        } catch(err) {}
      }
    });
  }

  function updateBarUI() {
    const g = GENRES[state.genreIdx];
    const iconEl = document.getElementById('pb-icon');
    const nameEl = document.getElementById('pb-name');
    const bpmEl = document.getElementById('pb-bpm');
    const playBtn = document.getElementById('pb-play');
    if (iconEl) iconEl.textContent = g.icon;
    if (nameEl) nameEl.textContent = g.name;
    if (bpmEl) bpmEl.textContent = (g.bpm + state.bpmOffset) + ' BPM';
    if (playBtn) {
      playBtn.textContent = state.isPlaying ? '⏸' : '▶';
      playBtn.style.setProperty('--pba', g.colorA);
      playBtn.style.setProperty('--pbb', g.colorB);
    }
    if (!state.isPlaying && vizFrame) { cancelAnimationFrame(vizFrame); vizFrame = null; }
  }

  /* ── Pulse animation when something plays ── */
  function pulseBar() {
    const bar = document.getElementById('cf-player-bar');
    if (!bar) return;
    bar.style.borderTopColor = GENRES[state.genreIdx].colorA;
    setTimeout(() => { bar.style.borderTopColor = 'rgba(168,85,247,0.2)'; }, 300);
  }

  /* ── Init ── */
  function init() {
    loadState();
    if (IS_PLAYER_PAGE) {
      // On full player page, don't render the bar (full player handles it)
      // Just expose the state for the full player to read
      return;
    }
    buildBar();
    updateBarUI();
    // Auto-resume if was playing
    if (state.isPlaying) {
      setTimeout(() => {
        initAudio();
        startPlay();
        startViz();
      }, 800);
    } else {
      // Start idle visualizer animation
      setTimeout(startViz, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.CFPlayer = {
    play: startPlay,
    stop: stopPlay,
    setGenre: (idx) => { state.genreIdx=idx; changeGenre(); },
    getState: () => ({...state}),
    getGenres: () => GENRES,
    init: initAudio,
  };
})();
