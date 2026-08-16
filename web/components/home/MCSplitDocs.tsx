"use client";
import { useState } from "react";
import Link from "next/link";

const GATE_STEPS = [
  { num: "01", label: "In Scope?", pass: "Scope verified (wildcard / target domain policy match)" },
  { num: "02", label: "Proven Exploitable?", pass: "Working PoC HTTP request/response with token leak" },
  { num: "03", label: "Real CIA Impact?", pass: "Demonstrable privilege escalation / data breach" },
  { num: "04", label: "Reproduced Twice?", pass: "Verified on clean independent browser sessions" },
  { num: "05", label: "Clean PoC Payload?", pass: "Minimal, safe non-destructive payload verified" },
  { num: "06", label: "Duplicate Checked?", pass: "No duplicate found in public disclosures & endpoints" },
  { num: "07", label: "Submit-Ready Format?", pass: "CVSS 3.1 calculated + structured impact narrative" },
];

export function MCSplitDocs() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    const runNext = (step: number) => {
      if (step <= 7) {
        setTimeout(() => {
          setActiveStep(step);
          runNext(step + 1);
        }, 450);
      } else {
        setTimeout(() => {
          setIsRunning(false);
        }, 600);
      }
    };

    runNext(2);
  };

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
      {/* Left Column: Interactive 7-Question Gate Live Simulator */}
      <div className="split-left-col">
        {/* Dagger Sword SVG with Blue Accent */}
        <div style={{ marginBottom: 20 }}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="32,4 36,28 32,30 28,28" fill="var(--text)" />
            <rect x="18" y="29" width="28" height="5" fill="var(--text)" />
            <rect x="29" y="34" width="6" height="16" fill="var(--text2)" />
            <circle cx="32" cy="52" r="5" fill="var(--text)" />
            <line x1="32" y1="4" x2="32" y2="28" stroke="var(--border2)" strokeWidth="1" />
            <rect x="28" y="29" width="8" height="2" fill="var(--orange)" />
          </svg>
        </div>

        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text3)", fontFamily: "var(--font-geist-mono)", marginBottom: 8 }}>
          [ 7-QUESTION QUALITY GATE SIMULATOR ]
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 12 }}>
          ZERO SPECULATIVE.<br />
          <span style={{ background: "var(--text)", color: "var(--white)", padding: "0 8px", display: "inline-block" }}>
            100% SUBMIT-READY.
          </span>
        </h2>

        {/* Interactive Step-by-Step Gate Visualizer */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 14px", margin: "14px 0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", color: "var(--text2)", fontWeight: 700 }}>
              PROGRESS: {activeStep}/7 GATES
            </span>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              style={{
                background: isRunning ? "var(--border2)" : "var(--orange)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "var(--font-geist-mono)",
                cursor: isRunning ? "default" : "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.15s ease",
              }}
            >
              {isRunning ? "AUDITING..." : "▶ RUN LIVE GATE AUDIT"}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 12 }}>
            {GATE_STEPS.map((step, idx) => {
              const isPassed = activeStep > idx;
              const isCurrent = activeStep === idx + 1;
              return (
                <div
                  key={step.num}
                  style={{
                    height: 6,
                    borderRadius: 2,
                    background: isPassed ? "var(--orange)" : isCurrent ? "#60a5fa" : "var(--border2)",
                    boxShadow: isCurrent ? "0 0 8px rgba(6, 96, 241, 0.9)" : isPassed ? "0 0 4px rgba(6, 96, 241, 0.35)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}
          </div>

          {activeStep > 0 ? (
            <div style={{ fontSize: 11, fontFamily: "var(--font-geist-mono)", color: activeStep === 7 ? "var(--orange)" : "var(--text)" }}>
              <span style={{ color: "var(--orange)", fontWeight: 700, marginRight: 6 }}>
                [{GATE_STEPS[Math.min(activeStep - 1, 6)].num}]
              </span>
              <strong style={{ color: "var(--orange)" }}>{GATE_STEPS[Math.min(activeStep - 1, 6)].label}</strong> —{" "}
              <span style={{ color: "var(--text2)" }}>{GATE_STEPS[Math.min(activeStep - 1, 6)].pass}</span>
              {activeStep === 7 && (
                <div style={{ marginTop: 6, fontSize: 10, color: "var(--orange)", fontWeight: 700 }}>
                  ✓ ALL 7 QUALITY GATES CLEARED — ARTIFACT READY FOR HACKERONE / BUGCROWD
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 11, fontFamily: "var(--font-geist-mono)", color: "var(--text3)" }}>
              Click &quot;RUN LIVE GATE AUDIT&quot; to test a finding against all 7 questions.
            </div>
          )}
        </div>

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
