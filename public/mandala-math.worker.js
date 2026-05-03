/*
  ChromaFlora Mandala Math Worker
  Offloads heavy point computation from main thread
  Protocol:
    IN:  { type:'compute', rings, steps, complexity, seed, time, noiseAmp, colorMode, color }
    OUT: { type:'frame', points: Float32Array(N*6), length: N*6 }
         each tuple: [x, y, r, g, b, a]
*/

/* ── Simplex noise 2D (Ashima Arts, public domain) ── */
const _G3=[{x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1},{x:1,y:0},{x:-1,y:0},{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:-1}];
const _p=[];for(let i=0;i<256;i++)_p[i]=i;
for(let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));[_p[i],_p[j]]=[_p[j],_p[i]];}
const _perm=new Uint8Array(512),_pm12=new Uint8Array(512);
for(let i=0;i<512;i++){_perm[i]=_p[i&255];_pm12[i]=_perm[i]%12;}
const _F2=0.5*(Math.sqrt(3)-1),_G2=(3-Math.sqrt(3))/6;

function noise2D(x,y){
  const s=(x+y)*_F2,i=Math.floor(x+s),j=Math.floor(y+s);
  const t=(i+j)*_G2,X0=i-t,Y0=j-t,x0=x-X0,y0=y-Y0;
  const i1=x0>y0?1:0,j1=x0>y0?0:1;
  const x1=x0-i1+_G2,y1=y0-j1+_G2,x2=x0-1+2*_G2,y2=y0-1+2*_G2;
  const ii=i&255,jj=j&255;
  const gi0=_pm12[ii+_perm[jj]],gi1=_pm12[ii+i1+_perm[jj+j1]],gi2=_pm12[ii+1+_perm[jj+1]];
  let n0=0,n1=0,n2=0;
  let t0=0.5-x0*x0-y0*y0;if(t0>=0){t0*=t0;n0=t0*t0*(_G3[gi0].x*x0+_G3[gi0].y*y0);}
  let t1=0.5-x1*x1-y1*y1;if(t1>=0){t1*=t1;n1=t1*t1*(_G3[gi1].x*x1+_G3[gi1].y*y1);}
  let t2=0.5-x2*x2-y2*y2;if(t2>=0){t2*=t2;n2=t2*t2*(_G3[gi2].x*x2+_G3[gi2].y*y2);}
  return 70*(n0+n1+n2);
}

function fbm(x,y,oct){let v=0,a=0.5,f=1;for(let i=0;i<oct;i++){v+=a*noise2D(x*f,y*f);a*=0.5;f*=2;}return v;}

/* ── ChromaFlora token palette ── */
const TOKENS=[
  [168,85,247],   // iris
  [34,211,216],   // aqua
  [236,72,153],   // bloom
  [249,115,22],   // ember
  [16,185,129],   // viridian
  [168,85,247],   // iris (repeated for even distribution)
];

function hexToRgb(hex){
  hex=hex.replace('#','');
  if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');
  return [parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)];
}

self.onmessage = function({ data }) {
  if (data.type !== 'compute') return;

  const {
    rings = 6,
    steps = 360,
    freq = 3,
    amp = 40,
    phase = 0,
    harm = 0,
    turb = 0,
    nScale = 0.02,
    nOct = 3,
    noiseT = 0,
    animT = 0,
    spin = 0,
    pulse = 0,
    weight = 1.2,
    opacity = 0.8,
    radius = 85,
    W = 800,
    H = 600,
    colorMode = 'palette',
    color = '#a855f7',
    mirror = true,
    golden = false,
    layers = 4,
    symmetry = 8,
  } = data;

  const cx = W / 2;
  const cy = H / 2;
  const maxR = Math.min(W, H) * 0.5 * (radius / 100);
  const rot = animT * spin;
  const customRgb = hexToRgb(color);

  // Pre-allocate generous buffer (layers * symmetry * steps * 6 floats * 2 for mirror)
  const maxPoints = layers * symmetry * (steps + 1) * 2 * 6;
  const buf = new Float32Array(maxPoints);
  let idx = 0;

  function getColor(s, total, lf, i, totalSteps) {
    switch (colorMode) {
      case 'rainbow': {
        const h = ((s / total * 360) + animT * 30) % 360;
        // Convert HSL to RGB (approximate)
        const hh = h / 60, c2 = 0.9, x2 = c2 * (1 - Math.abs(hh % 2 - 1));
        let r, g, b;
        if (hh < 1) { r=c2; g=x2; b=0; } else if (hh < 2) { r=x2; g=c2; b=0; }
        else if (hh < 3) { r=0; g=c2; b=x2; } else if (hh < 4) { r=0; g=x2; b=c2; }
        else if (hh < 5) { r=x2; g=0; b=c2; } else { r=c2; g=0; b=x2; }
        const lum = 0.65;
        return [Math.round(r*255*lum+255*(1-lum)*0.5), Math.round(g*255*lum+255*(1-lum)*0.5), Math.round(b*255*lum+255*(1-lum)*0.5)];
      }
      case 'gradient':
        return lf < 0.5 ? customRgb : [34, 211, 216];
      case 'mono':
        return [255, 255, 255];
      default: {
        const ti = Math.floor(lf * TOKENS.length) % TOKENS.length;
        return TOKENS[ti];
      }
    }
  }

  function pushPoint(x, y, rgb, alpha) {
    if (idx + 6 > buf.length) return;
    buf[idx++] = x;
    buf[idx++] = y;
    buf[idx++] = rgb[0];
    buf[idx++] = rgb[1];
    buf[idx++] = rgb[2];
    buf[idx++] = alpha;
  }

  // Compute mandala points
  for (let l = 0; l < layers; l++) {
    const lf = (l + 1) / layers;
    const R = golden
      ? maxR * (Math.pow(1.618, l - layers/2) / Math.pow(1.618, layers/2))
      : maxR * lf;
    const cR = Math.min(R, maxR);

    for (let s = 0; s < symmetry; s++) {
      const ba = (s / symmetry) * Math.PI * 2 + rot;
      const rgb = getColor(s, symmetry, lf, 0, steps);

      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const lt = theta + ba;
        let turbDisp = 0;
        if (turb > 0) {
          const nx = Math.cos(lt) * nScale + noiseT;
          const ny = Math.sin(lt) * nScale + noiseT;
          turbDisp = turb * fbm(nx, ny, Math.round(nOct));
        }
        const rw = Math.sin(freq * theta + phase + animT * pulse * 2) * amp
                 + Math.sin(freq * 2 * theta + phase) * amp * harm;
        const r = Math.max(0, cR + rw + turbDisp);
        const x = cx + r * Math.cos(lt);
        const y = cy + r * Math.sin(lt);
        pushPoint(x, y, rgb, opacity);
      }

      // Mirror
      if (mirror) {
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const lt = theta + ba;
          let turbDisp = 0;
          if (turb > 0) {
            const nx = Math.cos(-lt) * nScale + noiseT;
            const ny = Math.sin(-lt) * nScale + noiseT;
            turbDisp = turb * fbm(nx, ny, Math.round(nOct));
          }
          const rw = Math.sin(freq * theta + phase + animT * pulse * 2) * amp
                   + Math.sin(freq * 2 * theta + phase) * amp * harm;
          const r = Math.max(0, cR + rw + turbDisp);
          const mx = cx + r * Math.cos(-lt + rot * 2);
          const my = cy + r * Math.sin(-lt + rot * 2);
          pushPoint(mx, my, rgb, opacity);
        }
      }
    }
  }

  const result = buf.slice(0, idx);
  self.postMessage({ type: 'frame', points: result, length: idx }, [result.buffer]);
};
