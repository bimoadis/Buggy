import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { ArrowRight } from "@/components/icons";
import { CubeAccent } from "@/components/CubeAccent";

const QUESTIONS = [
  "Is this in scope?",
  "Can I prove it's exploitable?",
  "Is there real impact?",
  "Did I reproduce it twice?",
  "Is the PoC clean?",
  "Have I checked for duplicates?",
  "Would I be proud to send this?",
];

const PILLARS = [
  { symbol: "⬡", label: "Purpose-built",    desc: "Every skill was designed for a specific attack class — not adapted from a generic template." },
  { symbol: "○", label: "Zero setup",        desc: "Download a ZIP, upload to Claude. No API keys, no infrastructure, no code." },
  { symbol: "◇", label: "MIT License",       desc: "Fork the repo, edit the SKILL.md files, upload your version. 100% open source." },
  { symbol: "□", label: "Live target ready", desc: "Claude Code mode gives skills real HTTP access, tool execution, and streaming output." },
];

export function GateCallout() {
  return (
    <>
      {/* 7-Question Gate — darkest section */}
      <div style={{ background: "var(--hero)", padding: "64px 48px", borderTop: "1px solid var(--b0)", position: "relative", overflow: "hidden" }}>
        <CubeAccent variant="blue" size="lg" opacity={0.55}
          style={{ position: "absolute", top: -20, right: 0, zIndex: 0 }} />
        <CubeAccent variant="purple" size="md" opacity={0.40}
          style={{ position: "absolute", bottom: -10, right: 200, zIndex: 0 }} />
        <CubeAccent variant="blue" size="sm" opacity={0.30}
          style={{ position: "absolute", top: 30, left: 20, zIndex: 0 }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 12 }}>
              Quality gate
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
              The 7-Question Gate
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p style={{ fontSize: 14, color: "rgba(240,240,255,0.38)", lineHeight: 1.7, fontWeight: 300, maxWidth: 480, marginBottom: 40 }}>
              Every finding must clear all 7 before a report gets written.
              One wrong answer kills it. This is how your N/A ratio stays clean.
            </p>
          </ScrollReveal>

          <ScrollRevealGroup style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 36 }} stagger={0.06}>
            {QUESTIONS.map((q, i) => (
              <ScrollRevealItem key={i}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent2)", width: 18, flexShrink: 0, letterSpacing: "0.06em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(240,240,255,0.55)", fontWeight: 300 }}>{q}</span>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>

          <ScrollReveal delay={0.1}>
            <Link
              href="/docs/7-question-gate"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(130,89,239,0.85)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 8, textShadow: "0 0 14px rgba(130,89,239,0.60), 0 0 28px rgba(130,89,239,0.25)" }}
            >
              Read the full gate <ArrowRight size={9} />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Pillars */}
      <div style={{ background: "var(--s1)", borderTop: "1px solid var(--b0)", padding: "64px 48px" }}>
        <ScrollReveal>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            Why buggy
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 44 }}>
            The foundation for{" "}
            <span style={{ color: "var(--text-fade)" }}>bug hunting AI.</span>
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup
          className="pillars-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}
          stagger={0.1}
        >
          {PILLARS.map((p, i) => (
            <ScrollRevealItem key={p.label}>
              <div style={{
                padding: "28px 24px",
                borderTop: "1px solid var(--b0)",
                borderRight: i < 3 ? "1px solid var(--b0)" : undefined,
              }}>
                <div style={{ fontSize: 18, color: i % 2 === 0 ? "var(--accent)" : "var(--accent2)", marginBottom: 14, lineHeight: 1 }}>
                  {p.symbol}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 12, color: "rgba(240,240,255,0.38)", lineHeight: 1.65, fontWeight: 300 }}>
                  {p.desc}
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </>
  );
}
