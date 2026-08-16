"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const LIVE_COMMANDS = [
  {
    cmd: 'buggy.hunt("https://target.com")',
    tag: "SQLI DETECTED",
    tagBg: "#FEF2F2",
    tagColor: "#DC2626",
    output: "Signal matched CWE-89 → Time-based blind injection verified with 8.4s sleep",
  },
  {
    cmd: 'claude.triage(finding="blind-sqli")',
    tag: "GATE 7/7 PASSED",
    tagBg: "#F0FDF4",
    tagColor: "#16A34A",
    output: "7-Question Gate cleared (7/7) → 0% speculative, submit-ready report generated",
  },
  {
    cmd: 'recon.subdomains("target.com")',
    tag: "142 ASSETS",
    tagBg: "#EEF5FF",
    tagColor: "#0660F1",
    output: "DNS buffer parsed → 142 live HTTP surfaces categorized with open ports",
  },
  {
    cmd: 'auth.audit_jwt(token="eyJhbGci...")',
    tag: "AUTH BYPASS",
    tagBg: "#F5F3FF",
    tagColor: "#7C3AED",
    output: "Algorithm 'none' vulnerability confirmed → Privilege elevated to superadmin",
  },
];

export function MCHero() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);

  const current = LIVE_COMMANDS[index];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTyping) {
      if (displayedText.length < current.cmd.length) {
        timeout = setTimeout(() => {
          setDisplayedText(current.cmd.slice(0, displayedText.length + 1));
        }, 40);
      } else {
        setShowOutput(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2800);
      }
    } else {
      setShowOutput(false);
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex((prev) => (prev + 1) % LIVE_COMMANDS.length);
        setIsTyping(true);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, current.cmd]);

  return (
    <section className="hero-section cyber-dot-bg">
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

        <div className="hero-ctas" style={{ marginBottom: 28 }}>
          <a href="#skills-table" className="btn-primary">
            START HUNTING →
          </a>
          <Link href="/skills" className="btn-secondary">
            VIEW 51 SKILLS
          </Link>
        </div>

        {/* Live Interactive Terminal Box */}
        <div
          style={{
            background: "var(--term-bg)",
            border: "1px solid #262626",
            borderRadius: 8,
            padding: "14px 18px",
            fontFamily: "var(--font-geist-mono)",
            maxWidth: 520,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, borderBottom: "1px solid #1F1F1F", paddingBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 10, color: "#666", marginLeft: 6, letterSpacing: "0.06em" }}>
                BUGGY INTERACTIVE TELEMETRY
              </span>
            </div>
            {showOutput && (
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: current.tagBg,
                  color: current.tagColor,
                  letterSpacing: "0.05em",
                }}
              >
                {current.tag}
              </span>
            )}
          </div>

          <div style={{ fontSize: 12.5, color: "#f5f5f5", display: "flex", alignItems: "center", minHeight: 22 }}>
            <span style={{ color: "var(--orange)", marginRight: 8, fontWeight: 700 }}>&gt;</span>
            <span style={{ color: "#38bdf8" }}>{displayedText}</span>
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 14,
                background: "var(--orange)",
                marginLeft: 4,
                animation: "cursor-blink 1s infinite",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#888",
              marginTop: 6,
              minHeight: 18,
              opacity: showOutput ? 1 : 0,
              transition: "opacity 0.25s ease",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
            {current.output}
          </div>
        </div>
      </div>

      {/* Right Column: Live Animated Architecture Diagram */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="hero-diagram-wrap">
          {/* Animated Connecting SVG Lines with Alternating Grey & Blue Flow */}
          <svg
            className="hero-svg-lines"
            viewBox="0 0 380 280"
            overflow="visible"
          >
            {/* 1. Claude (Top) -> Buggy Agent (Center) */}
            <path
              d="M 190 54 L 190 110"
              stroke="#d4d4d4"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
              style={{ animation: "dash-flow 1.2s linear infinite" }}
            />
            <path
              d="M 190 54 L 190 110"
              stroke="#0660F1"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeDashoffset="5"
              fill="none"
              style={{ animation: "dash-flow 1.2s linear infinite" }}
            />

            {/* 2. Buggy Agent (Center) -> Recon Engine (Bottom Left) */}
            <path
              d="M 165 158 Q 100 185 72 210"
              stroke="#d4d4d4"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
              style={{ animation: "dash-flow 1.5s linear infinite" }}
            />
            <path
              d="M 165 158 Q 100 185 72 210"
              stroke="#0660F1"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeDashoffset="5"
              fill="none"
              style={{ animation: "dash-flow 1.5s linear infinite" }}
            />

            {/* 3. Buggy Agent (Center) -> 7-Gate Triage (Bottom Right) */}
            <path
              d="M 215 158 Q 280 185 308 210"
              stroke="#d4d4d4"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
              style={{ animation: "dash-flow 1.5s linear infinite" }}
            />
            <path
              d="M 215 158 Q 280 185 308 210"
              stroke="#0660F1"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeDashoffset="5"
              fill="none"
              style={{ animation: "dash-flow 1.5s linear infinite" }}
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
