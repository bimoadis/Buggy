import Link from "next/link";

export function MCHero() {
  return (
    <section className="hero-section">
      {/* Left Column: Headlines & CTAs */}
      <div>
        <div className="hero-eyebrow">
          <span className="hero-badge-new">★ NEW</span>
          <span className="hero-eyebrow-text">
            CLAUDE 3.7 AGENT · 51 SECURITY SKILLS
          </span>
        </div>

        <h1 className="hero-title">
          OFFENSIVE SECURITY<br />
          <span className="hl">INTELLIGENCE VIA BUGGY</span>
        </h1>

        <p className="hero-desc">
          51 Production skills for bug hunting &amp; red teaming. Built from 574+ HackerOne &amp; Bugcrowd
          disclosures, audited via mandatory 7-Question Gate.
        </p>

        <div className="hero-ctas">
          <a href="#skills-table" className="btn-primary">
            START HUNTING →
          </a>
          <Link href="/skills" className="btn-secondary">
            VIEW 51 SKILLS
          </Link>
        </div>
      </div>

      {/* Right Column: Live Animated Architecture Diagram */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="hero-diagram-wrap">
          {/* Animated Connecting SVG Lines */}
          <svg
            className="hero-svg-lines"
            viewBox="0 0 380 280"
            overflow="visible"
          >
            <path
              d="M 190 54 L 190 110"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              style={{ animation: "dash 1.2s linear infinite" }}
            />
            <path
              d="M 165 158 Q 100 185 72 210"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              style={{ animation: "dash 1.6s linear infinite" }}
            />
            <path
              d="M 215 158 Q 280 185 308 210"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              style={{ animation: "dash 1.4s linear infinite reverse" }}
            />
            <text x="340" y="20" fontSize="12" fill="var(--border2)" fontFamily="monospace">· · ·</text>
            <text x="4" y="270" fontSize="12" fill="var(--border2)" fontFamily="monospace">· · ·</text>
          </svg>

          {/* Node 1: Claude (Top) */}
          <div className="node-claude">
            <span style={{ fontSize: 16, fontWeight: 900, fontFamily: "var(--font-geist-mono)", letterSpacing: -1 }}>
              A\
            </span>
            <div>
              <div className="node-label">CLAUDE</div>
              <div className="node-sub">Sonnet 3.7</div>
            </div>
          </div>

          {/* Node 2: Buggy Agent (Center) */}
          <div className="node-agent">
            <span style={{ fontSize: 16 }}>★</span>
            <div>
              <div className="node-label">BUGGY AGENT</div>
              <div className="node-sub">51 Skills · Active</div>
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--term-green)",
                boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                animation: "blink 2s ease infinite",
              }}
            />
          </div>

          {/* Node 3: Recon Engine (Bottom Left) */}
          <div className="node-recon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <path d="M12 12l5-5" />
            </svg>
            <div>
              <div className="node-label">RECON ENGINE</div>
              <div className="node-sub">Nuclei · ffuf</div>
            </div>
          </div>

          {/* Node 4: 7-Gate Triage (Bottom Right) */}
          <div className="node-gate">
            <span style={{ fontSize: 15, fontFamily: "var(--font-geist-mono)", fontWeight: 700, color: "var(--text2)" }}>
              ▦
            </span>
            <div>
              <div className="node-label">7-GATE TRIAGE</div>
              <div className="node-sub">0% N/A · Cleared</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
