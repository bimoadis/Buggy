"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Skills", href: "/skills" },
  { label: "Docs",   href: "/docs" },
  { label: "GitHub", href: "https://github.com/x-cookie/cbughunter-k1", external: true },
];

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href.startsWith("http") ? false : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 68,
      display: "flex",
      alignItems: "center",
      background: "rgba(4,4,10,0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 48px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Image src="/logo.png" alt="buggy" width={28} height={28} style={{ borderRadius: 4 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em" }}>
            buggy
          </span>
        </Link>

        {/* Center links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {LINKS.map((link) => {
            const active = isActive(link.href);
            const base: React.CSSProperties = {
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              fontWeight: active ? 500 : 400,
              textDecoration: "none",
              padding: "7px 16px",
              borderRadius: 8,
              transition: "background 0.15s, color 0.15s",
              color: active ? "var(--text)" : "rgba(240,240,255,0.48)",
              background: active ? "rgba(255,255,255,0.07)" : "transparent",
              letterSpacing: "-0.01em",
            };
            if (link.external) {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={base}
                  onMouseEnter={e => { e.currentTarget.style.color = "rgba(240,240,255,0.9)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = active ? "var(--text)" : "rgba(240,240,255,0.48)"; e.currentTarget.style.background = active ? "rgba(255,255,255,0.07)" : "transparent"; }}>
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.label} href={link.href} style={base}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="https://github.com/x-cookie/cbughunter-k1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--accent)",
            background: "var(--accent-dim)",
            border: "1px solid rgba(90,133,255,0.22)",
            padding: "8px 20px",
            borderRadius: 8,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(90,133,255,0.20)"; e.currentTarget.style.borderColor = "rgba(90,133,255,0.42)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--accent-dim)"; e.currentTarget.style.borderColor = "rgba(90,133,255,0.22)"; }}
        >
          Download
        </a>
      </div>
    </nav>
  );
}
