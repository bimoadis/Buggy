import { HeroPingOverlay } from "@/components/HeroPingOverlay";
import { HeroContent } from "@/components/HeroContent";
import { HeroCubes } from "@/components/HeroCubes";

/* Pre-computed star positions for a static galaxy field */
const STARS = [
  [415,18,1.1,0.9],[442,44,0.7,0.6],[468,12,0.5,0.8],[390,62,1.3,0.7],[510,30,0.6,0.5],
  [530,68,1.0,0.8],[475,90,0.8,0.6],[398,95,0.5,0.4],[525,110,1.2,0.9],[455,128,0.6,0.7],
  [490,22,0.4,0.5],[415,140,0.9,0.7],[535,155,0.5,0.6],[472,170,1.1,0.8],[405,185,0.6,0.5],
  [522,192,0.8,0.7],[388,210,0.4,0.6],[510,220,1.0,0.9],[448,235,0.6,0.5],[535,245,0.7,0.7],
  [395,258,1.2,0.8],[470,262,0.5,0.6],[522,278,0.9,0.7],[412,295,0.6,0.8],[488,300,0.4,0.5],
  [540,310,1.1,0.9],[420,325,0.7,0.6],[502,338,0.5,0.7],[380,342,1.0,0.8],[458,355,0.8,0.6],
  [528,365,0.6,0.5],[395,378,0.4,0.7],[475,390,1.2,0.9],[520,402,0.7,0.6],[408,415,0.5,0.7],
  [545,420,0.9,0.8],[440,432,0.6,0.5],[510,445,1.0,0.7],[390,455,0.4,0.6],[468,468,0.8,0.9],
  [535,478,0.5,0.5],[415,488,1.1,0.7],[480,498,0.6,0.6],[502,482,0.4,0.8],[370,472,0.9,0.7],
  [426,460,0.5,0.5],[557,442,0.7,0.6],[368,428,1.0,0.8],[546,398,0.6,0.7],[372,310,0.4,0.6],
  [558,285,0.8,0.5],[370,245,0.5,0.7],[558,200,0.9,0.8],[374,165,0.6,0.6],[555,135,0.4,0.5],
  [368,72,0.8,0.7],[558,52,0.5,0.6],[362,24,0.9,0.8],
] as const;

export function HeroSection() {
  return (
    <section style={{
      position: "relative",
      minHeight: "calc(100vh - 56px)",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      padding: "80px 48px",
      background: "var(--bg)",
    }}>
      <HeroPingOverlay />

      {/* Nebula gradients */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: [
          "radial-gradient(ellipse 40% 50% at 72% 40%, rgba(130,89,239,0.09) 0%, transparent 65%)",
          "radial-gradient(ellipse 30% 40% at 85% 65%, rgba(77,124,255,0.07) 0%, transparent 60%)",
          "radial-gradient(ellipse 55% 70% at 22% 48%, rgba(77,124,255,0.05) 0%, transparent 70%)",
        ].join(", "),
      }} />

      {/* Left — animated hero content (client component) */}
      <HeroContent />

      {/* Right — galaxy + floating cubes */}
      <div className="hero-diamonds" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "55%", pointerEvents: "none", zIndex: 2 }}>
        {/* Galaxy starfield — static layer */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 560 520" preserveAspectRatio="xMidYMid meet">
          {STARS.map(([cx, cy, r, op], i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="white"
              opacity={op}
              style={{ animation: `star-twinkle ${2.5 + (i % 7) * 0.7}s ease-in-out ${(i % 5) * 0.4}s infinite` }}
            />
          ))}
          {/* Faint nebula wisps */}
          <ellipse cx="480" cy="200" rx="60" ry="30" fill="rgba(130,89,239,0.04)" />
          <ellipse cx="420" cy="340" rx="50" ry="25" fill="rgba(77,124,255,0.04)" />
          <ellipse cx="510" cy="420" rx="45" ry="20" fill="rgba(154,114,240,0.03)" />
        </svg>

        {/* Floating cubes — client component with mouse parallax */}
        <HeroCubes />
      </div>
    </section>
  );
}
