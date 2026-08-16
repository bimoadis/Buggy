"use client";
import { useState } from "react";

const NODE_H   = 68;
const NODE_GAP = 20;
const COL_H    = NODE_H * 3 + NODE_GAP * 2;
const Y1 = NODE_H / 2;
const Y2 = NODE_H + NODE_GAP + NODE_H / 2;
const Y3 = (NODE_H + NODE_GAP) * 2 + NODE_H / 2;

interface Step {
  id: string;
  label: string;
  sub: string;
  role: "input" | "output";
  title: string;
  explanation: string;
  bullets: string[];
}

const STEPS: Step[] = [
  {
    id: "choose-domain", role: "input",
    label: "Choose domain", sub: "Browse 8 security attack domains",
    title: "Pick your attack surface",
    explanation: "Browse 8 security domains — Web Hunting, Auth & Identity, API & Infra, Enterprise, Red Team, Recon & OSINT, Reporting, and Specialized. Each domain is independent; install only the skills your workflow needs.",
    bullets: [
      "8 domains, each targeting a specific attack surface",
      "No overlap — web-hunting installs independently from red-team",
      "Browse the full skill list before selecting a domain",
    ],
  },
  {
    id: "select-skill", role: "input",
    label: "Select skill", sub: "One skill or the full domain",
    title: "Choose your scope",
    explanation: "51 production skills across 8 domains. Install a single skill ZIP (e.g. just /hunt-sqli) or the entire domain at once. Each skill is a standalone SKILL.md — zero dependencies between skills.",
    bullets: [
      "Install one skill or the full domain in one ZIP",
      "Each skill is a standalone SKILL.md — the complete system prompt",
      "No lock-in — install exactly what you need, nothing more",
    ],
  },
  {
    id: "download-zip", role: "input",
    label: "Download ZIP", sub: "From GitHub in one click",
    title: "Get the skill file",
    explanation: "Navigate to the skill folder on GitHub, click Code → Download ZIP. Each ZIP contains exactly one SKILL.md — the complete context bundle that powers the slash command in Claude.",
    bullets: [
      "GitHub → skill folder → Code → Download ZIP",
      "ZIP contains one SKILL.md — the full skill context",
      "No API keys, no npm install, no configuration files",
    ],
  },
  {
    id: "upload-claude", role: "output",
    label: "Upload to Claude", sub: "claude.ai/customize/skills",
    title: "Activate in seconds",
    explanation: "Go to claude.ai/customize/skills and upload the ZIP. Claude reads the SKILL.md, registers the slash command, and makes it available workspace-wide immediately. No restart required.",
    bullets: [
      "Upload takes under 60 seconds",
      "Available in every conversation immediately",
      "No restart, no deploy, no infrastructure to manage",
    ],
  },
  {
    id: "run-command", role: "output",
    label: "Run command", sub: "/hunt-sqli, /hunt-xss, /triage...",
    title: "Execute the skill",
    explanation: "Type the slash command in any Claude conversation and attach your target. Claude runs the full workflow — recon signals, vulnerability patterns, PoC steps, and 7-Question Gate before any report.",
    bullets: [
      "/hunt-sqli target.com → blind SQLi scan with report",
      "/hunt-xss target.com → XSS across 174 H1 patterns",
      "/triage → 7-Question Gate on the current finding",
    ],
  },
  {
    id: "get-findings", role: "output",
    label: "Get findings", sub: "Report-ready markdown artifact",
    title: "Findings delivered",
    explanation: "Each skill produces structured, analyst-quality output — not a draft to clean up. Findings include CVSS score, PoC steps, impact statement, and a report-ready markdown artifact formatted for H1/Bugcrowd.",
    bullets: [
      "CVSS 3.1 scored findings with full reproduction steps",
      "PoC steps formatted for H1/Bugcrowd/Intigriti submission",
      "7-Question Gate cleared — no speculative reports shipped",
    ],
  },
];

const INPUT_STEPS  = STEPS.filter((s) => s.role === "input");
const OUTPUT_STEPS = STEPS.filter((s) => s.role === "output");

function FlowNode({ step, index, active, onClick }: {
  step: Step; index: number; active: number | null; onClick: (i: number) => void;
}) {
  const isActive = active === index;
  const isDimmed = active !== null && !isActive;
  const isInput  = step.role === "input";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(index)}
      onKeyDown={(e) => e.key === "Enter" && onClick(index)}
      style={{
        height: NODE_H,
        background: isActive ? "rgba(90,133,255,0.08)" : "var(--s2)",
        border: `1.5px solid ${isActive ? "rgba(90,133,255,0.5)" : "var(--b0)"}`,
        borderRadius: 10,
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: isActive
          ? "0 4px 24px rgba(90,133,255,0.2), 0 0 0 3px rgba(90,133,255,0.06)"
          : "0 1px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        opacity: isDimmed ? 0.28 : 1,
        transform: isActive ? "scale(1.04)" : isDimmed ? "scale(0.97)" : "scale(1)",
        transformOrigin: isInput ? "right center" : "left center",
        zIndex: isActive ? 3 : 1,
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        userSelect: "none",
        position: "relative",
        outline: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: isActive ? "var(--accent)" : "rgba(90,133,255,0.4)",
          flexShrink: 0,
          transition: "background 0.2s",
          boxShadow: isActive ? "0 0 6px rgba(90,133,255,0.6)" : "none",
        }} />
        <span style={{
          fontSize: 12, fontWeight: 600,
          fontFamily: "var(--font-sans)",
          letterSpacing: "-0.02em",
          color: isActive ? "var(--accent)" : "var(--text)",
          transition: "color 0.2s",
        }}>
          {step.label}
        </span>
      </div>
      <p style={{
        fontSize: 10, color: "var(--text-muted)", lineHeight: 1.35,
        margin: 0, paddingLeft: 12,
        fontFamily: "var(--font-mono)",
      }}>
        {step.sub}
      </p>
    </div>
  );
}

function ConnectorSVG({ fanOut, active }: { fanOut: boolean; active: number | null }) {
  const W = 68;
  const paths = fanOut
    ? [
        `M 0 ${Y2} C ${W / 2} ${Y2} ${W / 2} ${Y1} ${W} ${Y1}`,
        `M 0 ${Y2} L ${W} ${Y2}`,
        `M 0 ${Y2} C ${W / 2} ${Y2} ${W / 2} ${Y3} ${W} ${Y3}`,
      ]
    : [
        `M 0 ${Y1} C ${W / 2} ${Y1} ${W / 2} ${Y2} ${W} ${Y2}`,
        `M 0 ${Y2} L ${W} ${Y2}`,
        `M 0 ${Y3} C ${W / 2} ${Y3} ${W / 2} ${Y2} ${W} ${Y2}`,
      ];
  const id = fanOut ? "fo" : "fi";

  return (
    <svg width={W} height={COL_H} viewBox={`0 0 ${W} ${COL_H}`}
      style={{ flexShrink: 0, overflow: "visible" }} aria-hidden="true">
      <defs>
        <marker id={`${id}-arr`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="rgba(90,133,255,0.5)" />
        </marker>
      </defs>
      {paths.map((d, i) => {
        const lit = active === null || active === i;
        return (
          <g key={i}>
            <path d={d} stroke="rgba(90,133,255,0.06)" strokeWidth="1.5" fill="none" strokeDasharray="5 4" />
            <path
              d={d}
              stroke={`rgba(90,133,255,${lit ? 0.45 : 0.08})`}
              strokeWidth="1.5" fill="none"
              strokeDasharray="5 4"
              markerEnd={`url(#${id}-arr)`}
              style={{ animation: lit ? `dashflow 2.4s linear ${i * 0.5}s infinite` : "none" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ThreeSteps() {
  const [active, setActive] = useState<number | null>(null);

  const toggle  = (i: number) => setActive((prev) => (prev === i ? null : i));
  const goNext  = () => setActive((prev) => (prev === null ? 0 : (prev + 1) % STEPS.length));
  const goPrev  = () => setActive((prev) => (prev === null ? STEPS.length - 1 : (prev - 1 + STEPS.length) % STEPS.length));

  const activeStep   = active !== null ? STEPS[active] : null;
  const fanInActive  = active !== null && active < 3 ? active : null;
  const fanOutActive = active !== null && active >= 3 ? active - 3 : null;

  return (
    <section style={{
      background: "var(--s1)",
      borderTop: "1px solid var(--b0)",
      borderBottom: "1px solid var(--b0)",
      padding: "72px 48px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          Workflow
        </div>
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          Three steps.{" "}
          <span style={{ color: "var(--text-fade)" }}>No setup.</span>
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 380, lineHeight: 1.7, fontWeight: 300, marginBottom: 44 }}>
          Click any node to explore what happens at each step of the hunting workflow.
        </p>

        {/* Flow diagram — desktop */}
        <div className="steps-desktop" style={{ alignItems: "center", justifyContent: "center" }}>
          {/* Input column */}
          <div style={{ display: "flex", flexDirection: "column", gap: NODE_GAP, width: 210, flexShrink: 0 }}>
            {INPUT_STEPS.map((step, i) => (
              <FlowNode key={step.id} step={step} index={i} active={active} onClick={toggle} />
            ))}
          </div>

          <ConnectorSVG fanOut={false} active={fanInActive} />

          {/* Center hub */}
          <div style={{ height: COL_H, display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              background: "var(--s2)",
              border: "1.5px solid rgba(90,133,255,0.22)",
              borderRadius: 14, padding: "18px 16px", textAlign: "center", width: 158,
              boxShadow: "0 0 32px rgba(90,133,255,0.08), 0 6px 24px rgba(0,0,0,0.2)",
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "var(--accent-dim)", border: "1px solid rgba(90,133,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.04em" }}>
                  buggy
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 12, color: "var(--text)", margin: "0 0 2px", letterSpacing: "-0.03em" }}>
                claude.ai
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", margin: "0 0 12px", letterSpacing: "0.05em" }}>
                /customize/skills
              </p>
              <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                {[0, 300, 600].map((d) => (
                  <span key={d} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--accent)", display: "inline-block",
                    animation: `dotpulse 2.2s ease-in-out ${d}ms infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>

          <ConnectorSVG fanOut={true} active={fanOutActive} />

          {/* Output column */}
          <div style={{ display: "flex", flexDirection: "column", gap: NODE_GAP, width: 210, flexShrink: 0 }}>
            {OUTPUT_STEPS.map((step, i) => (
              <FlowNode key={step.id} step={step} index={i + 3} active={active} onClick={toggle} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="steps-mobile">
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ marginBottom: i < STEPS.length - 1 ? 10 : 0 }}>
              <FlowNode step={step} index={i} active={active} onClick={toggle} />
              {i === 2 && (
                <div style={{ textAlign: "center", padding: "8px 0", color: "var(--accent)", fontSize: 14, opacity: 0.4 }}>↓</div>
              )}
            </div>
          ))}
        </div>

        {/* Explanation panel */}
        <div style={{ marginTop: 28 }}>
          {activeStep === null ? (
            <p style={{
              textAlign: "center", fontSize: 10, fontFamily: "var(--font-mono)",
              color: "var(--text-muted)", letterSpacing: "0.1em",
              textTransform: "uppercase", opacity: 0.45, userSelect: "none",
            }}>
              ↑ click any node to explore
            </p>
          ) : (
            <div style={{
              background: "var(--s2)",
              border: "1px solid var(--b0)",
              borderRadius: 14,
              padding: "28px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(90,133,255,0.08)",
              animation: "panelIn 0.24s ease-out both",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5 }}>
                    Step {active! + 1} / {STEPS.length} · {activeStep.label}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--font-sans)", color: "var(--text)", letterSpacing: "-0.04em", margin: 0 }}>
                    {activeStep.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close panel"
                  style={{
                    width: 26, height: 26, borderRadius: "50%",
                    border: "1px solid var(--b0)", background: "transparent",
                    color: "var(--text-muted)", cursor: "pointer", fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>

              <p style={{ fontSize: 13, color: "rgba(240,240,255,0.50)", lineHeight: 1.8, marginBottom: 18, fontWeight: 300 }}>
                {activeStep.explanation}
              </p>

              <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {activeStep.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "rgba(240,240,255,0.65)" }}>
                    <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0, fontSize: 7 }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={goPrev} style={{
                  padding: "6px 14px", borderRadius: 7,
                  border: "1px solid var(--b0)", background: "transparent",
                  color: "var(--text-muted)", fontSize: 11, cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}>
                  ← Prev
                </button>
                <div style={{ flex: 1, display: "flex", gap: 5, justifyContent: "center" }}>
                  {STEPS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      border: "none", padding: 0, cursor: "pointer",
                      background: i === active ? "var(--accent)" : "var(--b0)",
                      transition: "background 0.15s",
                    }} />
                  ))}
                </div>
                <button onClick={goNext} style={{
                  padding: "6px 14px", borderRadius: 7,
                  border: "1px solid var(--b0)", background: "transparent",
                  color: "var(--text-muted)", fontSize: 11, cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}>
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .steps-desktop { display: none; }
        .steps-mobile  { display: block; }
        @media (min-width: 860px) {
          .steps-desktop { display: flex !important; gap: 0; }
          .steps-mobile  { display: none !important; }
        }
        @keyframes dashflow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -18; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
