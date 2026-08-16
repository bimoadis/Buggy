interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ background: "var(--hero)", borderBottom: "1px solid var(--b0)", padding: "72px 48px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
          {eyebrow}
        </p>
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", marginBottom: 16 }}>
          {title}
        </h1>
        <p style={{ fontSize: 16, color: "rgba(240,240,255,0.42)", maxWidth: 560, lineHeight: 1.7, fontWeight: 300 }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
