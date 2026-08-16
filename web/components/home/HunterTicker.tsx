export function HunterTicker() {
  const tickerItems = [
    { fn: 'buggy.hunt("https://target.com")', res: "→ [sqli] signal detected" },
    { fn: 'claude.triage(finding="blind-sqli")', res: "→ [7-gate] passed (7/7)" },
    { fn: 'recon.subdomains("target.com")', res: "→ [142] active assets" },
    { fn: 'auth.audit_jwt(token="ey...")', res: "→ [none-alg] bypass found" },
    { fn: 'buggy.generate_report(cvss=9.8)', res: "→ [hackerone] markdown ready" },
    { fn: 'api.probe_graphql("api.target.com/v1")', res: "→ [introspection] enabled" },
    { fn: 'm365.enum_users("target.com")', res: "→ [pw-spray] safe mode" },
    { fn: 'mobile.decompile_apk("app.apk")', res: "→ [hardcoded-key] leaked" },
  ];

  const duplicated = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="hunter-ticker">
      <div className="ticker-badge">BUGGY</div>
      <div className="ticker-fade-left" />
      <div className="ticker-fade-right" />
      <div className="ticker-track">
        {duplicated.map((item, idx) => (
          <span key={idx} className="ticker-item">
            <span className="ticker-fn">{item.fn}</span>
            <span className="ticker-res">{item.res}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
