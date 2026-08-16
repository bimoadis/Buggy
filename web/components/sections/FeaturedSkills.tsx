import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";

const FEATURED = [
  {
    domain: "Web",        domainSlug: "web-hunting",  cmd: "/hunt-xss",
    slug: "web-hunting/hunt-xss",          name: "XSS Hunter",
    desc: "DOM, reflected, stored, mutation-XSS — built from 174 H1 reports.",
  },
  {
    domain: "Auth",       domainSlug: "auth",         cmd: "/hunt-auth-bypass",
    slug: "auth/hunt-auth-bypass",         name: "Auth Bypass",
    desc: "JWT alg=none, RS256→HS256 confusion, SAML XSW — 12 bypass classes.",
  },
  {
    domain: "API",        domainSlug: "api-infra",    cmd: "/hunt-graphql",
    slug: "api-infra/hunt-graphql",        name: "GraphQL Hunter",
    desc: "Introspection, batching-DoS, IDOR via node(), SSRF via argument.",
  },
  {
    domain: "Enterprise", domainSlug: "enterprise",   cmd: "/cloud-iam-deep",
    slug: "enterprise/cloud-iam-deep",     name: "Cloud IAM Deep",
    desc: "AWS/Azure/GCP — 24+ privesc patterns, SSRF to IMDS chain.",
  },
  {
    domain: "Reporting",  domainSlug: "reporting",    cmd: "/triage-validation",
    slug: "reporting/triage-validation",   name: "Triage Validation",
    desc: "7-Question Gate runner — kills speculative reports before submission.",
  },
  {
    domain: "Web3",       domainSlug: "specialized",  cmd: "/web3-audit",
    slug: "specialized/web3-audit",        name: "Web3 Audit",
    desc: "10 DeFi bug classes — accounting desync, reentrancy, oracle manipulation.",
  },
];

function PlayIcon() {
  return (
    <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
      <path d="M0 0l8 4.5L0 9V0z" />
    </svg>
  );
}

export function FeaturedSkills() {
  return (
    <div style={{ padding: "64px 48px", background: "var(--bg)", borderBottom: "1px solid var(--b0)" }}>
      <ScrollReveal>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>
            Featured skills
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 9, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>
            <PlayIcon />
            all 6 have demos
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          The full workflow,{" "}
          <span style={{ color: "var(--text-fade)" }}>one command at a time</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p style={{ fontSize: 13, color: "rgba(240,240,255,0.38)", maxWidth: 460, lineHeight: 1.65, fontWeight: 300, marginBottom: 36 }}>
          Purpose-built for each attack class. Each card below has a recorded demo — click to watch it run live.
        </p>
      </ScrollReveal>

      <ScrollRevealGroup
        className="skills-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
        stagger={0.08}
      >
        {FEATURED.map((s) => (
          <ScrollRevealItem key={s.cmd}>
            <Link
              href={`/skills/${s.slug}`}
              className="skill-card"
              style={{
                background: "var(--s1)",
                border: "1px solid var(--b0)",
                borderRadius: 12,
                padding: "22px 24px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", background: "var(--s2)", padding: "3px 8px", borderRadius: 4 }}>
                  {s.domain}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 8px", borderRadius: 4 }}>
                  {s.cmd}
                </span>
              </div>

              {/* Name */}
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                {s.name}
              </div>

              {/* Desc */}
              <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                {s.desc}
              </div>

              {/* Demo CTA */}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 9, color: "#ef4444", letterSpacing: "0.05em" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: "rgba(239,68,68,0.15)", flexShrink: 0 }}>
                    <PlayIcon />
                  </span>
                  Watch demo
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(240,240,255,0.2)", letterSpacing: "0.04em" }}>
                  YouTube →
                </span>
              </div>
            </Link>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>

      <ScrollReveal delay={0.1} style={{ marginTop: 28, textAlign: "center" }}>
        <Link href="/skills" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>
          View all 51 skills →
        </Link>
      </ScrollReveal>
    </div>
  );
}
