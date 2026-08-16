import Link from "next/link";
import { BugIcon, ArrowRight } from "@/components/icons";
import { CubeAccent } from "@/components/CubeAccent";

export function Footer() {
  return (
    <>
      {/* CTA band */}
      <div style={{ background: "var(--bg)", borderTop: "1px solid var(--b0)", padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <CubeAccent variant="blue"   size="md" opacity={0.35} style={{ position: "absolute", top: -10, left: 20, zIndex: 0 }} />
        <CubeAccent variant="purple" size="sm" opacity={0.28} style={{ position: "absolute", bottom: 0,  right: 40, zIndex: 0 }} />
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 10 }}>
          Ready to install your first skill?{" "}
          <span style={{ color: "var(--text-fade)" }}>Start in minutes.</span>
        </h2>
        <p style={{ fontSize: 14, color: "rgba(240,240,255,0.38)", marginBottom: 28, fontWeight: 300 }}>
          Browse all 8 attack domains — 51 specialized skills, MIT licensed.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, position: "relative", zIndex: 1 }}>
          <Link
            href="/skills"
            style={{ background: "var(--accent)", color: "#fff", padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans)", textDecoration: "none", display: "inline-block" }}
          >
            Browse all 8 domains
          </Link>
          <Link
            href="/docs"
            style={{ fontSize: 14, fontWeight: 500, color: "rgba(240,240,255,0.5)", display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none" }}
          >
            Read the install guide <ArrowRight />
          </Link>
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 16, letterSpacing: "0.04em" }}>
          Works with Claude Free, Pro, Teams, and Enterprise · MIT License
        </p>
      </div>

      {/* Footer bar */}
      <footer style={{
        background: "var(--hero)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BugIcon size={14} color="rgba(255,255,255,0.2)" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.02em" }}>
            buggy — MIT License
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {[
            { label: "Quick Start", href: "/docs/quick-start" },
            { label: "Install",     href: "/docs/install" },
            { label: "GitHub",      href: "https://github.com/bimoadis/Buggy", external: true },
          ].map((link) =>
            link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href}
                style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                {link.label}
              </Link>
            )
          )}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.10)" }}>
          Adapted from elementalsouls/Claude-BugHunter
        </span>
      </footer>
    </>
  );
}
