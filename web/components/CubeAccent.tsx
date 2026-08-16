interface CubeAccentProps {
  variant?: "blue" | "purple" | "mixed";
  size?: "sm" | "md" | "lg";
  opacity?: number;
  style?: React.CSSProperties;
  className?: string;
}

/* Pre-computed star fields per size */
const STARS_SM = [
  [18,8,0.7,0.8],[42,15,0.5,0.6],[62,6,0.9,0.7],[80,22,0.4,0.5],[95,10,0.6,0.8],
  [28,30,0.5,0.6],[55,38,0.8,0.7],[75,28,0.4,0.5],[90,42,0.7,0.8],[15,45,0.5,0.6],
  [48,52,0.9,0.7],[70,58,0.4,0.5],[85,50,0.6,0.8],[32,65,0.5,0.6],[60,70,0.7,0.7],
  [10,60,0.4,0.5],[78,75,0.8,0.6],[45,80,0.5,0.7],[20,75,0.6,0.8],[65,85,0.4,0.6],
] as const;

const STARS_MD = [
  [22,10,0.8,0.8],[55,18,0.5,0.6],[88,8,0.9,0.7],[115,22,0.4,0.5],[140,12,0.6,0.8],
  [35,40,0.5,0.6],[72,48,0.8,0.7],[105,35,0.4,0.5],[132,45,0.7,0.8],[18,58,0.5,0.6],
  [60,65,0.9,0.7],[95,72,0.4,0.5],[125,62,0.6,0.8],[45,85,0.5,0.6],[80,92,0.7,0.7],
  [112,88,0.4,0.5],[148,78,0.8,0.6],[30,100,0.5,0.7],[65,108,0.6,0.8],[100,102,0.4,0.6],
  [138,95,0.7,0.5],[155,35,0.5,0.7],[8,82,0.6,0.6],[142,110,0.4,0.8],[25,115,0.8,0.6],
] as const;

const STARS_LG = [
  [25,12,0.9,0.8],[60,20,0.5,0.6],[100,10,1.0,0.7],[140,24,0.4,0.5],[170,14,0.6,0.8],
  [40,45,0.5,0.6],[85,55,0.9,0.7],[120,42,0.4,0.5],[158,48,0.7,0.8],[20,65,0.5,0.6],
  [70,75,1.0,0.7],[110,82,0.4,0.5],[148,70,0.6,0.8],[50,98,0.5,0.6],[90,105,0.7,0.7],
  [130,100,0.4,0.5],[170,88,0.9,0.6],[35,118,0.5,0.7],[75,125,0.6,0.8],[115,118,0.4,0.6],
  [155,112,0.7,0.5],[180,42,0.5,0.7],[8,92,0.6,0.6],[165,128,0.4,0.8],[28,132,0.9,0.6],
  [62,138,0.5,0.7],[102,140,0.7,0.8],[142,138,0.4,0.6],[175,60,0.6,0.7],[10,110,0.5,0.5],
] as const;

const SIZE_CONFIG = {
  sm: { vb: "0 0 100 90",  w: 100, h: 90,  stars: STARS_SM },
  md: { vb: "0 0 160 120", w: 160, h: 120, stars: STARS_MD },
  lg: { vb: "0 0 185 145", w: 185, h: 145, stars: STARS_LG },
};

export function CubeAccent({
  variant = "mixed",
  size = "md",
  opacity = 1,
  style,
  className,
}: CubeAccentProps) {
  const cfg = SIZE_CONFIG[size];
  const usePurple = variant === "purple" || variant === "mixed";
  const useBlue   = variant === "blue"   || variant === "mixed";

  /* Scale factors per size */
  const scales = { sm: 0.45, md: 0.65, lg: 0.80 };
  const s = scales[size];

  return (
    <div
      className={`cubes-float ${className ?? ""}`}
      style={{ opacity, pointerEvents: "none", ...style }}
    >
      <svg
        width={cfg.w}
        height={cfg.h}
        viewBox={cfg.vb}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id={`ga-lg-${size}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
            <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="rgba(77,124,255,0.55)" />
          </filter>
          <filter id={`ga-md-${size}`} x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(154,114,240,0.50)" />
          </filter>
          <filter id={`ga-sm-${size}`} x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="rgba(77,124,255,0.40)" />
          </filter>

          <linearGradient id={`bt-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a5fee" /><stop offset="100%" stopColor="#1e38c0" />
          </linearGradient>
          <linearGradient id={`bl-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1530a0" /><stop offset="100%" stopColor="#0c1f70" />
          </linearGradient>
          <linearGradient id={`br-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2244cc" /><stop offset="100%" stopColor="#1530a0" />
          </linearGradient>
          <linearGradient id={`pt-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7a52dc" /><stop offset="100%" stopColor="#5838b4" />
          </linearGradient>
          <linearGradient id={`pl-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#42268c" /><stop offset="100%" stopColor="#2c1870" />
          </linearGradient>
          <linearGradient id={`pr-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5838b4" /><stop offset="100%" stopColor="#42268c" />
          </linearGradient>
        </defs>

        {/* Stars */}
        {cfg.stars.map(([cx, cy, r, op], i) => (
          <circle
            key={i} cx={cx} cy={cy} r={r} fill="white" opacity={op}
            style={{ animation: `star-twinkle ${2.5 + (i % 7) * 0.6}s ease-in-out ${(i % 5) * 0.35}s infinite` }}
          />
        ))}

        {/* Primary cube */}
        {useBlue && (
          <g filter={`url(#ga-lg-${size})`} transform={`translate(${cfg.w * 0.38},${cfg.h * 0.06}) scale(${s})`}>
            <polygon points="62,0 124,36 62,72 0,36"    fill={`url(#bt-${size})`} opacity="0.97" />
            <polygon points="0,36 62,72 62,116 0,80"    fill={`url(#bl-${size})`} opacity="0.97" />
            <polygon points="62,72 124,36 124,80 62,116" fill={`url(#br-${size})`} opacity="0.97" />
            <polygon points="62,0 124,36 62,72 0,36" fill="none" stroke="rgba(140,180,255,0.5)" strokeWidth="1" />
          </g>
        )}

        {/* Secondary cube */}
        {usePurple && (
          <g filter={`url(#ga-md-${size})`} transform={`translate(${cfg.w * 0.60},${cfg.h * 0.44}) scale(${s * 0.7})`}>
            <polygon points="44,0 88,25 44,50 0,25"   fill={`url(#pt-${size})`} opacity="0.92" />
            <polygon points="0,25 44,50 44,82 0,57"   fill={`url(#pl-${size})`} opacity="0.92" />
            <polygon points="44,50 88,25 88,57 44,82"  fill={`url(#pr-${size})`} opacity="0.92" />
            <polygon points="44,0 88,25 44,50 0,25" fill="none" stroke="rgba(200,160,255,0.4)" strokeWidth="0.8" />
          </g>
        )}

        {/* Ghost micro cube */}
        {useBlue && (
          <g filter={`url(#ga-sm-${size})`} transform={`translate(${cfg.w * 0.08},${cfg.h * 0.52}) scale(${s * 0.5})`}>
            <polygon points="32,0 64,18 32,36 0,18"   fill={`url(#bt-${size})`} opacity="0.65" />
            <polygon points="0,18 32,36 32,58 0,40"   fill={`url(#bl-${size})`} opacity="0.65" />
            <polygon points="32,36 64,18 64,40 32,58"  fill={`url(#br-${size})`} opacity="0.65" />
          </g>
        )}

        {/* Scattered glowing tiles */}
        {useBlue && (
          <polygon
            points={`${cfg.w*0.82},${cfg.h*0.08} ${cfg.w*0.90},${cfg.h*0.13} ${cfg.w*0.82},${cfg.h*0.18} ${cfg.w*0.74},${cfg.h*0.13}`}
            fill="rgba(77,124,255,0.05)" stroke="rgba(77,124,255,0.28)" strokeWidth="0.6"
          />
        )}
        {usePurple && (
          <polygon
            points={`${cfg.w*0.15},${cfg.h*0.75} ${cfg.w*0.23},${cfg.h*0.80} ${cfg.w*0.15},${cfg.h*0.85} ${cfg.w*0.07},${cfg.h*0.80}`}
            fill="rgba(154,114,240,0.05)" stroke="rgba(154,114,240,0.25)" strokeWidth="0.6"
          />
        )}
        {useBlue && (
          <polygon
            points={`${cfg.w*0.88},${cfg.h*0.68} ${cfg.w*0.94},${cfg.h*0.72} ${cfg.w*0.88},${cfg.h*0.76} ${cfg.w*0.82},${cfg.h*0.72}`}
            fill="rgba(77,124,255,0.04)" stroke="rgba(77,124,255,0.22)" strokeWidth="0.5"
          />
        )}
      </svg>
    </div>
  );
}
