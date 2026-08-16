import Link from "next/link";

export function MCSplitDocs() {
  const docItems = [
    {
      title: "Architecture & Methodology",
      desc: "Full pipeline overview — skill auto-discovery, context injection, and 7-Gate triage.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "7-Question Quality Gate",
      desc: "Pre-submission triage rules and automatic rejection criteria for theoretical bugs.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Claude Chat vs Claude Code",
      desc: "Environment scope comparison, tool execution rules, and system prompt setup.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
    {
      title: "Quick Start & Setup",
      desc: "Four-step setup from clone to active live target hunting in Claude Code CLI.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "HackerOne / Bugcrowd Report Formats",
      desc: "Standardized CVSS 3.1 templates, evidence hygiene, and non-destructive PoC rules.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="split-docs-section">
      {/* Left Column */}
      <div className="split-left-col">
        {/* Exact Dagger Sword SVG */}
        <div style={{ marginBottom: 28 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="32,4 36,28 32,30 28,28" fill="var(--text)" />
            <rect x="18" y="29" width="28" height="5" fill="var(--text)" />
            <rect x="29" y="34" width="6" height="16" fill="var(--text2)" />
            <circle cx="32" cy="52" r="5" fill="var(--text)" />
            <line x1="32" y1="4" x2="32" y2="28" stroke="var(--border2)" strokeWidth="1" />
            <rect x="28" y="29" width="8" height="2" fill="var(--orange)" />
          </svg>
        </div>

        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text3)", fontFamily: "var(--font-geist-mono)", marginBottom: 12 }}>
          [ PRECISION TOOLS ]
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 14 }}>
          51 SKILLS.<br />
          <span style={{ background: "var(--text)", color: "var(--white)", padding: "0 8px", display: "inline-block" }}>
            ONE AGENT.
          </span>
        </h2>

        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 24, maxWidth: 360 }}>
          Production-ready context bundles for SQLi, XSS, SSRF, OAuth, JWT, and cloud infrastructure audits. Copy and run directly in Claude Code.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <Link
            href="/skills"
            style={{
              background: "var(--text)",
              color: "var(--white)",
              padding: "9px 18px",
              fontSize: 10,
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-geist-mono)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            VIEW SKILLS →
          </Link>
          <Link
            href="/docs"
            style={{
              border: "1px solid var(--text)",
              color: "var(--text)",
              padding: "8px 16px",
              fontSize: 10,
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-geist-mono)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            READ DOCS
          </Link>
        </div>
      </div>

      {/* Right Column: Documentation List */}
      <div className="split-right-col">
        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text3)", fontFamily: "var(--font-geist-mono)", marginBottom: 18 }}>
          [ DOCUMENTATION ]
        </div>

        {docItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              padding: "14px 0",
              borderBottom: idx < docItems.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                flexShrink: 0,
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text2)",
              }}
            >
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-geist-mono)", marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.55 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}

        <Link
          href="/docs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 20,
            fontSize: 10,
            color: "var(--text2)",
            textDecoration: "none",
            fontFamily: "var(--font-geist-mono)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          OPEN FULL DOCS →
        </Link>
      </div>
    </div>
  );
}
