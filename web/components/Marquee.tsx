const ITEMS = [
  "/hunt-sqli", "/hunt-xss", "/hunt-oauth", "/hunt-idor", "/hunt-ssrf",
  "/hunt-rce", "/osint-methodology", "/cloud-iam-deep", "/triage-validation",
  "/hunt-saml", "/apk-redteam-pipeline", "/hunt-csrf", "/report-writing",
  "/web3-audit", "/m365-entra-attack", "/supply-chain-attack-recon", "/hunt-graphql",
  "/evidence-hygiene", "/hunt-auth-bypass", "/redteam-mindset",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      style={{
        background: "var(--hero)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: i % 4 < 2 ? "rgba(190,155,255,1)" : "rgba(130,165,255,1)",
                textShadow: i % 4 < 2
                  ? "0 0 6px rgba(180,130,255,1), 0 0 18px rgba(130,89,239,0.9), 0 0 38px rgba(130,89,239,0.55), 0 0 70px rgba(130,89,239,0.20)"
                  : "0 0 6px rgba(120,170,255,1), 0 0 18px rgba(77,124,255,0.9), 0 0 38px rgba(77,124,255,0.50), 0 0 70px rgba(77,124,255,0.18)",
                whiteSpace: "nowrap",
                padding: "0 20px",
              }}
            >
              {item}
            </span>
            <span style={{ color: "rgba(160,110,255,0.55)", fontSize: 10, textShadow: "0 0 8px rgba(130,89,239,0.7), 0 0 20px rgba(130,89,239,0.35)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
