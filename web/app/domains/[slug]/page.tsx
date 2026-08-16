import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import { CrosshairIcon, LockIcon, NetworkIcon, BuildingIcon, TargetIcon, EyeIcon, FileCheckIcon, ChainIcon } from "@/components/icons";
import { getDomain, domains } from "@/content/domains";
import { getSkillsByDomain } from "@/content/skills";

const ICONS: Record<string, React.ReactNode> = {
  "web-hunting": <CrosshairIcon size={18} color="var(--accent)" />,
  "auth":        <LockIcon size={18} color="var(--accent2)" />,
  "api-infra":   <NetworkIcon size={18} color="var(--accent)" />,
  "enterprise":  <BuildingIcon size={18} color="var(--accent2)" />,
  "red-team":    <TargetIcon size={18} color="#ef4444" />,
  "recon":       <EyeIcon size={18} color="var(--accent)" />,
  "reporting":   <FileCheckIcon size={18} color="var(--accent2)" />,
  "specialized": <ChainIcon size={18} color="var(--accent)" />,
};

const ENV_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  chat: { bg: "var(--accent-dim)",  color: "var(--accent)",  label: "Chat ✓" },
  both: { bg: "var(--accent2-dim)", color: "var(--accent2)", label: "Both ✓" },
  code: { bg: "rgba(234,179,8,0.1)", color: "#ca8a04", label: "Limited ⚠" },
};

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export default function DomainPage({ params }: Props) {
  const domain = getDomain(params.slug);
  if (!domain) notFound();
  const skills = getSkillsByDomain(params.slug);

  return (
    <>
      <Nav />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {/* Hero band */}
        <div style={{ background: "var(--hero)", padding: "64px 48px 56px", borderBottom: "1px solid var(--b0)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <ScrollReveal>
              <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "rgba(240,240,255,0.22)", textDecoration: "none", marginBottom: 24, display: "inline-block" }}>
                ← all domains
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 8 }}>
                {ICONS[params.slug]}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent2)" }}>
                  {skills.length} skills
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", marginBottom: 16 }}>
                {domain.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p style={{ fontSize: 15, color: "rgba(240,240,255,0.38)", maxWidth: 520, lineHeight: 1.7, fontWeight: 300 }}>
                {domain.description}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Skills grid */}
        <div style={{ padding: "56px 48px", maxWidth: 1280, margin: "0 auto" }}>
          <ScrollRevealGroup
            className="skills-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
            stagger={0.07}
          >
            {skills.map((skill) => {
              const env = ENV_STYLE[skill.env];
              return (
                <ScrollRevealItem key={skill.id}>
                  <Link
                    href={`/skills/${skill.id}`}
                    className="skill-card"
                    style={{
                      background: "var(--s1)",
                      border: "1px solid var(--b0)",
                      borderRadius: 12,
                      padding: "22px 24px",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 8px", borderRadius: 4 }}>
                        {skill.command}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: env.bg, color: env.color, padding: "3px 8px", borderRadius: 4 }}>
                        {env.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                      {skill.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 300, marginBottom: skill.reportCount ? 12 : 0 }}>
                      {skill.description}
                    </div>
                    {skill.reportCount && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                        {skill.reportCount} reports
                      </span>
                    )}
                  </Link>
                </ScrollRevealItem>
              );
            })}
          </ScrollRevealGroup>
        </div>
      </main>
      <Footer />
    </>
  );
}
