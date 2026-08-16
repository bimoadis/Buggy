"use client";
import { useEffect, useRef } from "react";

// ── parallax depth per cube [x, y] ────────────────────────────────────────
const DEPTH = [
  [0.013, 0.010],
  [0.042, 0.032],
  [0.068, 0.054],
  [0.026, 0.020],
] as const;

const LERP = 0.062;
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ── physics cube types ─────────────────────────────────────────────────────
interface PCube {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  hw: number;
  opacity: number;
  fadeIn: boolean;
  fading: boolean;
  fadeSpeed: number;
  blue: boolean;
  fragment: boolean;
  dead: boolean;
}

const BLUE = { top: "#3a5fee", left: "#1530a0", right: "#2244cc", glow: "rgba(77,124,255," } as const;
const PURP = { top: "#7a52dc", left: "#42268c", right: "#5838b4", glow: "rgba(130,89,239," } as const;

let _id = 0;
const uid = () => ++_id;

function makeMain(w: number, h: number): PCube {
  const hw = 18 + Math.random() * 20;
  return {
    id: uid(),
    x: -hw * 3,
    y: hw + Math.random() * Math.max(hw, h - hw * 4),
    vx: 0.45 + Math.random() * 0.80,
    vy: (Math.random() - 0.5) * 0.20,
    hw,
    opacity: 0, fadeIn: true, fading: false, fadeSpeed: 0,
    blue: Math.random() > 0.45,
    fragment: false, dead: false,
  };
}

function makeFragments(cx: number, cy: number, n: number): PCube[] {
  return Array.from({ length: n }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.7 + Math.random() * 2.4;
    const hw = 3 + Math.random() * 10;
    return {
      id: uid(),
      x: cx + (Math.random() - 0.5) * 14,
      y: cy + (Math.random() - 0.5) * 14,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.8,
      hw,
      opacity: 0.65 + Math.random() * 0.30,
      fadeIn: false, fading: true,
      fadeSpeed: 0.33 + Math.random() * 0.67,
      blue: Math.random() > 0.45,
      fragment: true, dead: false,
    };
  });
}

function drawPCube(ctx: CanvasRenderingContext2D, c: PCube) {
  if (c.opacity <= 0) return;
  const { x, y, hw, opacity, blue, fragment } = c;
  const col = blue ? BLUE : PURP;
  const fh = hw * 0.57;
  const sh = hw * 0.70;

  if (!fragment) {
    ctx.shadowBlur = hw * 0.65;
    ctx.shadowColor = col.glow + "0.40)";
  }

  ctx.globalAlpha = opacity;

  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x + hw, y + fh);
  ctx.lineTo(x, y + 2 * fh); ctx.lineTo(x - hw, y + fh);
  ctx.closePath(); ctx.fillStyle = col.top; ctx.fill();

  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.moveTo(x - hw, y + fh); ctx.lineTo(x, y + 2 * fh);
  ctx.lineTo(x, y + 2 * fh + sh); ctx.lineTo(x - hw, y + fh + sh);
  ctx.closePath(); ctx.fillStyle = col.left; ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + 2 * fh); ctx.lineTo(x + hw, y + fh);
  ctx.lineTo(x + hw, y + fh + sh); ctx.lineTo(x, y + 2 * fh + sh);
  ctx.closePath(); ctx.fillStyle = col.right; ctx.fill();

  ctx.globalAlpha = opacity * 0.38;
  ctx.strokeStyle = col.glow + "1)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x + hw, y + fh);
  ctx.lineTo(x, y + 2 * fh); ctx.lineTo(x - hw, y + fh);
  ctx.closePath(); ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function pCY(c: PCube) { return c.y + c.hw * 0.92; }

// ── component ──────────────────────────────────────────────────────────────
export function HeroCubes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const auraRef      = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  // SVG parallax refs (4 fixed cubes)
  const p0 = useRef<SVGGElement>(null);
  const p1 = useRef<SVGGElement>(null);
  const p2 = useRef<SVGGElement>(null);
  const p3 = useRef<SVGGElement>(null);

  const mouse  = useRef({ x: 0, y: 0 });
  const sm     = useRef({ x: 0, y: 0 });
  const sizeOk = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parallaxRefs = [p0.current, p1.current, p2.current, p3.current];

    // ── canvas size ──────────────────────────────────────────────────────
    const pcubes: PCube[] = [];
    let spawnIn  = 600 + Math.random() * 600;
    let spawnAcc = 0;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 10 || height < 10) return;
      canvas.width  = Math.round(width);
      canvas.height = Math.round(height);
      if (!sizeOk.current) {
        sizeOk.current = true;
        // seed with several cubes at staggered x positions
        for (let i = 0; i < 5; i++) {
          const c = makeMain(canvas.width, canvas.height);
          c.x = -c.hw * 3 + (canvas.width / 5) * i * 0.6; // spread across entry
          c.opacity = 0.2 + Math.random() * 0.5;           // already partially visible
          c.fadeIn = true;
          pcubes.push(c);
        }
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ── mouse ────────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left - r.width  / 2;
      mouse.current.y = e.clientY - r.top  - r.height / 2;
    };
    window.addEventListener("mousemove", onMove);

    // ── RAF loop ─────────────────────────────────────────────────────────
    let last = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const ds = dt / 16.67;

      // smooth mouse
      sm.current.x = lerp(sm.current.x, mouse.current.x, LERP);
      sm.current.y = lerp(sm.current.y, mouse.current.y, LERP);
      const { x: mx, y: my } = sm.current;

      // aura
      if (auraRef.current) {
        const r = container.getBoundingClientRect();
        auraRef.current.style.left = `${mx + r.width  / 2}px`;
        auraRef.current.style.top  = `${my + r.height / 2}px`;
      }

      // SVG parallax — each cube drifts at different depth
      parallaxRefs.forEach((g, i) => {
        if (!g) return;
        const dx = (mx * DEPTH[i][0]).toFixed(2);
        const dy = (my * DEPTH[i][1]).toFixed(2);
        g.setAttribute("transform", `translate(${dx},${dy})`);
      });

      // skip canvas physics until size confirmed
      if (!sizeOk.current || canvas.width < 10 || canvas.height < 10) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const W = canvas.width;
      const H = canvas.height;

      // spawn
      spawnAcc += dt;
      if (spawnAcc >= spawnIn) {
        spawnAcc = 0;
        spawnIn  = 600 + Math.random() * 700;
        if (pcubes.filter(c => !c.fragment && !c.dead).length < 10)
          pcubes.push(makeMain(W, H));
      }

      // collision
      const fresh: PCube[] = [];
      const hit = new Set<number>();
      const live = pcubes.filter(c => !c.fragment && !c.dead && !c.fading);
      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          const a = live[i], b = live[j];
          if (hit.has(a.id) || hit.has(b.id)) continue;
          const dx = a.x - b.x;
          const dy = pCY(a) - pCY(b);
          if (Math.sqrt(dx * dx + dy * dy) < (a.hw + b.hw) * 1.45) {
            hit.add(a.id); hit.add(b.id);
            fresh.push(...makeFragments((a.x + b.x) / 2, (pCY(a) + pCY(b)) / 2, 5 + Math.floor(Math.random() * 5)));
            a.dead = true; b.dead = true;
          }
        }
      }

      // physics
      for (const c of pcubes) {
        if (c.dead) continue;
        c.x  += c.vx * ds;
        c.y  += c.vy * ds;
        c.vy += (c.fragment ? 0.045 : 0.006) * ds;

        if (!c.fragment) {
          if (c.y < 0)                 { c.y = 0;              c.vy =  Math.abs(c.vy) * 0.55; }
          const fl = H - c.hw * 2.2;
          if (c.y > fl)                { c.y = fl;             c.vy = -Math.abs(c.vy) * 0.55; }
        }

        if (c.fadeIn) {
          c.opacity = Math.min(1, c.opacity + 0.85 * (dt / 1000));
          if (c.opacity >= 1) { c.opacity = 1; c.fadeIn = false; }
        }
        if (c.fading) {
          c.opacity -= c.fadeSpeed * (dt / 1000);
          if (c.opacity <= 0) { c.dead = true; continue; }
        }

        if (c.x - c.hw > W + 20)                          { c.dead = true; continue; }
        if (c.y + c.hw * 1.85 < -120 || c.y > H + 120)   { c.dead = true; continue; }
        if (c.fragment && (c.x < -80 || c.x > W + 80))   { c.dead = true; continue; }
      }

      pcubes.push(...fresh);
      for (let i = pcubes.length - 1; i >= 0; i--)
        if (pcubes[i].dead) pcubes.splice(i, 1);

      ctx.clearRect(0, 0, W, H);
      for (const c of pcubes) if ( c.fragment) drawPCube(ctx, c);
      for (const c of pcubes) if (!c.fragment) drawPCube(ctx, c);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>

      {/* cursor aura */}
      <div ref={auraRef} style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(77,124,255,0.10) 0%, rgba(130,89,239,0.05) 40%, transparent 68%)",
        pointerEvents: "none", zIndex: 4, willChange: "left, top",
      }} />

      {/* ── SVG: 4 fixed parallax cubes (original) ─────────────────────── */}
      <svg width="100%" height="100%" viewBox="0 0 540 500" fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="crtr-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="6"  floodColor="rgba(140,90,255,0.95)" />
            <feDropShadow dx="0" dy="5" stdDeviation="14" floodColor="rgba(77,124,255,0.45)" />
          </filter>
          <linearGradient id="crtr-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#9868ff" />
            <stop offset="55%"  stopColor="#5040cc" />
            <stop offset="100%" stopColor="#2244cc" />
          </linearGradient>
          <linearGradient id="crtr-leg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6040d0" />
            <stop offset="100%" stopColor="#1e38c0" />
          </linearGradient>
          <filter id="hc-glow-lg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
            <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="rgba(77,124,255,0.5)" />
          </filter>
          <filter id="hc-glow-md" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="rgba(154,114,240,0.45)" />
          </filter>
          <filter id="hc-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(77,124,255,0.35)" />
          </filter>
          <linearGradient id="hc-btop"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3a5fee"/><stop offset="100%" stopColor="#1e38c0"/></linearGradient>
          <linearGradient id="hc-bleft" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1530a0"/><stop offset="100%" stopColor="#0c1f70"/></linearGradient>
          <linearGradient id="hc-bright" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2244cc"/><stop offset="100%" stopColor="#1530a0"/></linearGradient>
          <linearGradient id="hc-ptop"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7a52dc"/><stop offset="100%" stopColor="#5838b4"/></linearGradient>
          <linearGradient id="hc-pleft" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#42268c"/><stop offset="100%" stopColor="#2c1870"/></linearGradient>
          <linearGradient id="hc-pright" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5838b4"/><stop offset="100%" stopColor="#42268c"/></linearGradient>
        </defs>

        {/* constellation lines — updated to match tighter positions */}
        <line x1="360" y1="125" x2="392" y2="220" stroke="rgba(130,89,239,0.07)" strokeWidth="0.6" />
        <line x1="392" y1="220" x2="248" y2="298" stroke="rgba(77,124,255,0.06)"  strokeWidth="0.6" />
        <line x1="360" y1="125" x2="464" y2="142" stroke="rgba(77,124,255,0.05)"  strokeWidth="0.6" />
        <line x1="464" y1="142" x2="392" y2="220" stroke="rgba(130,89,239,0.05)" strokeWidth="0.4" />

        {/* large blue — float-a 9s */}
        <g style={{ animation: "float-a 9s ease-in-out infinite", transformOrigin: "360px 125px" }}>
          <g ref={p0}>
            <g filter="url(#hc-glow-lg)" transform="translate(288,42)">
              <polygon points="72,0 144,41 72,82 0,41"     fill="url(#hc-btop)" />
              <polygon points="0,41 72,82 72,132 0,91"     fill="url(#hc-bleft)" />
              <polygon points="72,82 144,41 144,91 72,132"  fill="url(#hc-bright)" />
              <polygon points="72,0 144,41 72,82 0,41" fill="none" stroke="rgba(140,180,255,0.5)" strokeWidth="0.8" />
            </g>
          </g>
        </g>

        {/* medium purple — float-b 7s, delay 1.8s — moved up+left */}
        <g style={{ animation: "float-b 7s ease-in-out 1.8s infinite", transformOrigin: "392px 222px" }}>
          <g ref={p1}>
            <g filter="url(#hc-glow-md)" transform="translate(340,175)">
              <polygon points="52,0 104,30 52,60 0,30"    fill="url(#hc-ptop)"  opacity="0.95" />
              <polygon points="0,30 52,60 52,98 0,68"     fill="url(#hc-pleft)" opacity="0.95" />
              <polygon points="52,60 104,30 104,68 52,98"  fill="url(#hc-pright)" opacity="0.95" />
              <polygon points="52,0 104,30 52,60 0,30" fill="none" stroke="rgba(200,160,255,0.4)" strokeWidth="0.7" />
            </g>
          </g>
        </g>

        {/* small blue — float-c 11s, delay 0.5s — moved up+right */}
        <g style={{ animation: "float-c 11s ease-in-out 0.5s infinite", transformOrigin: "248px 300px" }}>
          <g ref={p2}>
            <g filter="url(#hc-glow-sm)" transform="translate(210,262)">
              <polygon points="38,0 76,22 38,44 0,22"    fill="url(#hc-btop)"  opacity="0.85" />
              <polygon points="0,22 38,44 38,70 0,48"    fill="url(#hc-bleft)" opacity="0.85" />
              <polygon points="38,44 76,22 76,48 38,70"   fill="url(#hc-bright)" opacity="0.85" />
              <polygon points="38,0 76,22 38,44 0,22" fill="none" stroke="rgba(120,160,255,0.4)" strokeWidth="0.6" />
            </g>
          </g>
        </g>

        {/* tiny purple — float-d 8s, delay 3s — moved left+up */}
        <g style={{ animation: "float-d 8s ease-in-out 3s infinite", transformOrigin: "464px 142px" }}>
          <g ref={p3}>
            <g filter="url(#hc-glow-sm)" transform="translate(436,118)">
              <polygon points="28,0 56,16 28,32 0,16"    fill="url(#hc-ptop)"  opacity="0.75" />
              <polygon points="0,16 28,32 28,52 0,36"    fill="url(#hc-pleft)" opacity="0.75" />
              <polygon points="28,32 56,16 56,36 28,52"   fill="url(#hc-pright)" opacity="0.75" />
            </g>
          </g>
        </g>

        {/* scatter tiles */}
        {([
          [416,5, 438,12, 416,32, 394,19],
          [478,34, 494,43, 478,52, 462,43],
          [458,80, 478,91, 458,102, 438,91],
          [504,150, 522,160, 504,170, 486,160],
          [295,178, 309,186, 295,194, 281,186],
          [185,232, 201,241, 185,250, 169,241],
          [442,300, 462,311, 442,322, 422,311],
          [488,378, 510,391, 488,404, 466,391],
          [291,416, 309,426, 291,436, 273,426],
        ] as number[][]).map(([x1,y1,x2,y2,x3,y3,x4,y4], i) => (
          <polygon key={i}
            points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
            fill={i % 2 === 0 ? "rgba(77,124,255,0.06)" : "rgba(154,114,240,0.06)"}
            stroke={i % 2 === 0 ? "rgba(77,124,255,0.30)" : "rgba(154,114,240,0.28)"}
            strokeWidth="0.6"
          />
        ))}
      </svg>

      {/* ── Canvas: physics cubes floating L→R + shatter ───────────────── */}
      <canvas ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
