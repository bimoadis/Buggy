import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { TerminalDemo } from "@/components/TerminalDemo";

export function TwoWaysSection() {
  return (
    <div
      style={{
        background: "var(--s1)",
        borderBottom: "1px solid var(--b0)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
      className="split-section"
    >
      {/* Left */}
      <div style={{ padding: "72px 48px", borderRight: "1px solid var(--b0)" }}>
        <ScrollReveal>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            Two ways to use
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", marginBottom: 20 }}>
            Static review<br />
            <span style={{ color: "var(--text-fade)" }}>or live hunt</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p style={{ fontSize: 14, color: "rgba(240,240,255,0.42)", lineHeight: 1.75, fontWeight: 300, maxWidth: 400, marginBottom: 32 }}>
            Every skill works in Claude Chat for code review artifacts.
            Connect Claude Code and the same skill gains live HTTP access,
            tool execution, and streaming output.
          </p>
        </ScrollReveal>
        <ScrollRevealGroup style={{ display: "flex", flexDirection: "column", gap: 0 }} stagger={0.08}>
          {[
            { label: "Claude Chat", note: "Upload ZIP → paste code → get findings artifact", env: "Chat ✓", bg: "var(--accent-dim)", tc: "var(--accent)" },
            { label: "Claude Code", note: "Install bundle → /hunt target.com → live scan",   env: "Code ✓", bg: "var(--accent2-dim)", tc: "var(--accent2)" },
          ].map((row) => (
            <ScrollRevealItem key={row.label}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderTop: "1px solid var(--b0)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: row.bg, color: row.tc, padding: "3px 8px", borderRadius: 4, marginTop: 2, flexShrink: 0 }}>
                  {row.env}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{row.note}</div>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>

      {/* Right — terminal */}
      <div style={{ padding: "72px 48px", display: "flex", alignItems: "center" }}>
        <ScrollReveal delay={0.2} style={{ width: "100%" }}>
          <TerminalDemo />
        </ScrollReveal>
      </div>
    </div>
  );
}
