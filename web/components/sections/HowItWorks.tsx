import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { ShieldIcon, TerminalIcon, FileCheckIcon } from "@/components/icons";

const STEPS = [
  {
    n: "01",
    icon: <ShieldIcon size={20} color="var(--accent)" />,
    title: "Install the skill bundle",
    body: "Download the ZIP from GitHub. Upload to claude.ai/customize/skills or drop the folder in your Claude Code project. No API keys, no infrastructure.",
  },
  {
    n: "02",
    icon: <TerminalIcon size={20} color="var(--accent2)" />,
    title: "Claude auto-loads by context",
    body: "Skills activate on signal — paste a JWT and the auth skill loads. Drop an APK path and the mobile pipeline loads. No manual selection.",
  },
  {
    n: "03",
    icon: <FileCheckIcon size={20} color="var(--accent)" />,
    title: "Gate before submit",
    body: "Every finding runs through the 7-Question Gate. One wrong answer kills the report. Your N/A ratio stays clean and your reputation stays intact.",
  },
];

export function HowItWorks() {
  return (
    <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--b0)", padding: "64px 48px" }}>
      <ScrollReveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          How it works
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 44 }}>
          Three steps to{" "}
          <span style={{ color: "var(--text-fade)" }}>your first finding</span>
        </h2>
      </ScrollReveal>
      <ScrollRevealGroup
        className="pillars-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
        stagger={0.12}
      >
        {STEPS.map((s, i) => (
          <ScrollRevealItem key={s.n}>
            <div style={{
              padding: "28px 28px",
              borderTop: "1px solid var(--b0)",
              borderRight: i < 2 ? "1px solid var(--b0)" : undefined,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                {s.icon}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                  {s.n}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.02em" }}>
                {s.title}
              </div>
              <div style={{ fontSize: 12, color: "rgba(240,240,255,0.38)", lineHeight: 1.7, fontWeight: 300 }}>
                {s.body}
              </div>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </div>
  );
}
