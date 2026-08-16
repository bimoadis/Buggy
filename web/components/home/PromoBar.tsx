import Link from "next/link";

export function PromoBar() {
  return (
    <div className="promo-bar">
      <span className="star">★ ★ ★</span>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="promo-live">
          <span className="promo-live-dot" />
          LIVE
        </span>
        51 SPECIALIZED SKILLS ACROSS 8 ATTACK DOMAINS · BUGGY AI
      </span>
      <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
      <Link
        href="/skills"
        style={{
          color: "white",
          textDecoration: "none",
          opacity: 0.85,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        VIEW SKILLS →
      </Link>
      <span className="star">★ ★ ★</span>
    </div>
  );
}
