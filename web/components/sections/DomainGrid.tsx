import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { CrosshairIcon, LockIcon, NetworkIcon, BuildingIcon, TargetIcon, EyeIcon, FileCheckIcon, ChainIcon } from "@/components/icons";
import { domains } from "@/content/domains";

const ICONS: Record<string, React.ReactNode> = {
  "web-hunting": <CrosshairIcon size={20} color="var(--accent)" />,
  "auth":        <LockIcon size={20} color="var(--accent2)" />,
  "api-infra":   <NetworkIcon size={20} color="var(--accent)" />,
  "enterprise":  <BuildingIcon size={20} color="var(--accent2)" />,
  "red-team":    <TargetIcon size={20} color="#ef4444" />,
  "recon":       <EyeIcon size={20} color="var(--accent)" />,
  "reporting":   <FileCheckIcon size={20} color="var(--accent2)" />,
  "specialized": <ChainIcon size={20} color="var(--accent)" />,
};

export function DomainGrid() {
  return (
    <div style={{ padding: "64px 48px", background: "var(--s1)", borderBottom: "1px solid var(--b0)" }}>
      <ScrollReveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          Attack domains
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          8 domains,{" "}
          <span style={{ color: "var(--text-fade)" }}>one install</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p style={{ fontSize: 13, color: "rgba(240,240,255,0.38)", maxWidth: 420, lineHeight: 1.65, fontWeight: 300, marginBottom: 36 }}>
          Install a single skill or an entire domain. Each subfolder is independent.
        </p>
      </ScrollReveal>

      <ScrollRevealGroup
        className="skills-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}
        stagger={0.07}
      >
        {domains.map((domain) => (
          <ScrollRevealItem key={domain.slug}>
            <Link
              href={`/domains/${domain.slug}`}
              className="skill-card"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--b0)",
                borderRadius: 12,
                padding: "22px 22px",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ marginBottom: 14 }}>
                {ICONS[domain.slug]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 5, letterSpacing: "-0.01em" }}>
                {domain.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 14, fontWeight: 300 }}>
                {domain.description.split("—")[0].trim()}
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                background: "var(--s1)",
                padding: "3px 8px",
                borderRadius: 4,
                border: "1px solid var(--b0)",
              }}>
                {domain.skillCount} skills
              </span>
            </Link>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </div>
  );
}
