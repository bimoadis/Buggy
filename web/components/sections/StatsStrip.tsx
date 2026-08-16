import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { CubeAccent } from "@/components/CubeAccent";

const SECONDARY = [
  { num: "8",   suffix: "",  label: "Attack domains" },
  { num: "15",  suffix: "",  label: "Slash commands" },
  { num: "574", suffix: "", label: "H1 patterns sourced" },
];

export function StatsStrip() {
  return (
    <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--b0)" }}>
      {/* Hero stat */}
      <ScrollReveal style={{ padding: "52px 48px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <CubeAccent variant="mixed" size="sm" opacity={0.28}
          style={{ position: "absolute", top: 0, right: 60, zIndex: 0 }} />
        <CubeAccent variant="purple" size="sm" opacity={0.22}
          style={{ position: "absolute", bottom: 0, left: 40, zIndex: 0 }} />
        <div style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "var(--text)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: "clamp(60px, 10vw, 96px)" }}>51</span>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginTop: 10,
        }}>
          Production-ready skills — ready to install today
        </div>
      </ScrollReveal>

      {/* 3-col secondary */}
      <ScrollRevealGroup
        className="stats-bar"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--b0)" }}
        stagger={0.1}
      >
        {SECONDARY.map((s, i) => (
          <ScrollRevealItem
            key={s.label}
            style={{
              padding: "32px 24px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid var(--b0)" : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 3 }}>
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 800,
                color: i % 2 === 0 ? "var(--accent)" : "var(--accent2)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}>
                {s.num}
              </span>
              {s.suffix && (
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(20px, 3vw, 34px)", fontWeight: 700, color: "var(--accent2)", lineHeight: 1 }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 10,
            }}>
              {s.label}
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </div>
  );
}
