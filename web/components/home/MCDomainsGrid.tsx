import Link from "next/link";
import { domains } from "@/content/domains";
import { DomainIcon } from "@/components/DomainIcon";

export function MCDomainsGrid() {
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      {/* Header */}
      <div className="domains-section-head">
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            [ CLAUDE SECURITY SKILLS ]
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
            BUILT FOR OFFENSIVE<br />INTELLIGENCE
          </h2>
        </div>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", paddingTop: 4 }}>
          &gt; EXPLORE (↕↓)
        </div>
      </div>

      <p style={{ padding: "12px 28px 0", fontSize: 13, color: "var(--text2)", maxWidth: 480, lineHeight: 1.6 }}>
        51 ready-to-use skills for Claude Code + Chat. Built from 574+ HackerOne disclosures. Copy and run directly in your Claude environment.
      </p>

      {/* 3-Column Domain Feature Grid */}
      <div className="domains-grid-3">
        {domains.map((domain) => (
          <div key={domain.slug} className="domain-feature-cell">
            <div className="scanline" />
            <div className="domain-icon-box">
              <DomainIcon slug={domain.slug} size={44} color="var(--text)" />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: "var(--font-geist-mono)" }}>
              {domain.title}
            </div>
            <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.65, marginBottom: 20 }}>
              {domain.description.slice(0, 110)}...
            </div>
            <Link
              href={`/skills/${domain.slug}`}
              style={{
                background: "var(--text)",
                color: "var(--white)",
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
              LEARN MORE ({domain.skillCount})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
