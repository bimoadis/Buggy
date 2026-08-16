export function MCStatsRow() {
  const domainTags = [
    "WEB HUNTING",
    "AUTH & IDENTITY",
    "API & INFRA",
    "ENTERPRISE",
    "RED TEAM",
    "RECON & OSINT",
    "REPORTING",
    "SPECIALIZED",
  ];

  return (
    <>
      {/* Row 1: 3 Large Stat Columns */}
      <div className="stats-numbers-row">
        {/* Col 1 */}
        <div className="stat-num-col">
          <div className="stat-large-val green">22</div>
          <div className="stat-col-title">WEB HUNTING SKILLS</div>
          <div className="stat-pill-tag">
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--term-green)",
                boxShadow: "0 0 4px rgba(34,197,94,0.6)",
                animation: "blink 2s ease infinite",
                display: "inline-block",
              }}
            />
            CLAUDE CODE
          </div>
        </div>

        {/* Col 2 */}
        <div className="stat-num-col">
          <div className="stat-large-val red">100%</div>
          <div className="stat-col-title">7-QUESTION GATE</div>
          <div className="stat-pill-tag">
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--term-green)",
                boxShadow: "0 0 4px rgba(34,197,94,0.6)",
                animation: "blink 2s ease infinite",
                display: "inline-block",
              }}
            />
            REJECT SPECULATIVE
          </div>
        </div>

        {/* Col 3 */}
        <div className="stat-num-col">
          <div className="stat-large-val orange">51</div>
          <div className="stat-col-title">TOTAL PRODUCTION SKILLS</div>
          <div className="stat-pill-tag">
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--term-green)",
                boxShadow: "0 0 4px rgba(34,197,94,0.6)",
                animation: "blink 2s ease infinite",
                display: "inline-block",
              }}
            />
            8 DOMAINS
          </div>
        </div>
      </div>

      {/* Row 2: 3 Detail Metric Columns */}
      <div className="stats-detail-row">
        {/* Col 1: Progress Rate */}
        <div className="stat-detail-col">
          <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
            [ TRIAGE QUALITY ]
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", color: "var(--text2)", fontWeight: 600 }}>
                VERIFIED EXPLOITS
              </span>
              <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", color: "var(--green)", fontWeight: 700 }}>
                51/51
              </span>
            </div>
            <div style={{ background: "var(--border)", height: 5, width: "100%" }}>
              <div style={{ background: "var(--green)", height: "100%", width: "100%" }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", color: "var(--text2)", fontWeight: 600 }}>
                SPECULATIVE SUBMISSIONS
              </span>
              <span style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", color: "var(--red)", fontWeight: 700 }}>
                0/51
              </span>
            </div>
            <div style={{ background: "var(--border)", height: 5, width: "100%" }}>
              <div style={{ background: "var(--red)", height: "100%", width: "0%" }} />
            </div>
          </div>
          <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)", color: "var(--text3)", letterSpacing: "0.08em", marginTop: 8 }}>
            [ ● SSR · ZERO FALSE POSITIVES ]
          </div>
        </div>

        {/* Col 2: Skills Tag Chips */}
        <div className="stat-detail-col">
          <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
            [ 51 SKILLS. ONE AGENT. ]
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {domainTags.map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid var(--border)",
                  padding: "4px 9px",
                  fontSize: 9,
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--text2)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)", color: "var(--text3)", letterSpacing: "0.08em" }}>
            [ ● SKILLS FOR AGENTS ]
          </div>
        </div>

        {/* Col 3: Verified Diamond Badge */}
        <div className="stat-detail-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div className="diamond-wrap">
            <div className="diamond-square" />
            <div className="diamond-dot top" />
            <div className="diamond-dot bottom" />
            <div className="diamond-dot left" />
            <div className="diamond-dot right" />
            <div className="diamond-check">✓</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-geist-mono)", marginBottom: 6 }}>
              ANALYSIS VERIFIED
            </div>
            <div style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)", color: "var(--text3)", letterSpacing: "0.08em" }}>
              [ ● 7-GATE PASS ]
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
