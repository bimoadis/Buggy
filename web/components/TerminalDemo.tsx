"use client";
import { useEffect, useState, useRef } from "react";

type LineStyle = "cmd" | "section" | "progress" | "finding-crit" | "finding-high" | "detail" | "gate" | "pass" | "blank" | "dim";

interface Line {
  t: number;
  text: string;
  style: LineStyle;
}

const LINES: Line[] = [
  { t: 0,    text: "buggy@target ~ % /hunt https://target.com", style: "cmd" },
  { t: 380,  text: "",                                          style: "blank" },
  { t: 460,  text: "▸  Recon pipeline",                        style: "section" },
  { t: 820,  text: "   Subdomains    ████████░░  34 assets",   style: "progress" },
  { t: 1100, text: "   JS endpoints  █████████░  156 scanned", style: "progress" },
  { t: 1360, text: "   API surface   ████████░░  89 endpoints",style: "progress" },
  { t: 1580, text: "",                                          style: "blank" },
  { t: 1680, text: "▸  Scan  SQLi · XSS · IDOR · SSRF · Auth", style: "section" },
  { t: 2100, text: "   ─────────────────────────────────────", style: "dim" },
  { t: 2200, text: "   CRITICAL  /api/search?q=",              style: "finding-crit" },
  { t: 2350, text: "             Blind SQLi · CVSS 9.1",       style: "detail" },
  { t: 2480, text: "             Time-based, 8.4s delay",      style: "detail" },
  { t: 2650, text: "",                                          style: "blank" },
  { t: 2720, text: "   HIGH      /profile/bio",                style: "finding-high" },
  { t: 2870, text: "             Stored XSS · CVSS 7.6",       style: "detail" },
  { t: 3000, text: "             Admin panel sink → session hijack", style: "detail" },
  { t: 3180, text: "   ─────────────────────────────────────", style: "dim" },
  { t: 3280, text: "",                                          style: "blank" },
  { t: 3380, text: "▸  7-Question Gate",                       style: "section" },
  { t: 3680, text: "   01  In scope?         ✓",               style: "gate" },
  { t: 3830, text: "   02  Exploitable?      ✓",               style: "gate" },
  { t: 3960, text: "   03  Real impact?      ✓",               style: "gate" },
  { t: 4080, text: "   07  Submit-ready?     ✓",               style: "gate" },
  { t: 4250, text: "",                                          style: "blank" },
  { t: 4330, text: "   ◆ 2 findings cleared — /report",        style: "pass" },
];

const STYLE_MAP: Record<LineStyle, React.CSSProperties> = {
  cmd:           { color: "#e0e0ff", fontWeight: 600 },
  section:       { color: "#9a72f0", fontWeight: 500 },
  progress:      { color: "rgba(200,200,255,0.55)" },
  "finding-crit":{ color: "#f87171", fontWeight: 600 },
  "finding-high":{ color: "#fb923c", fontWeight: 600 },
  detail:        { color: "rgba(200,200,255,0.40)", fontWeight: 300 },
  gate:          { color: "rgba(200,200,255,0.50)" },
  pass:          { color: "#4ade80", fontWeight: 500 },
  blank:         { color: "transparent" },
  dim:           { color: "rgba(200,200,255,0.12)" },
};

export function TerminalDemo() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          LINES.forEach((line, i) => {
            setTimeout(() => setVisible(i + 1), line.t);
          });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll only within the terminal body — not the page */
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{
        background: "#080810",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.85,
      }}
    >
      {/* Window chrome */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
          ))}
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
          buggy — hunt session
        </span>
        {/* Signal dots */}
        <div style={{ display: "flex", gap: 3 }}>
          {[0, 150, 300].map((d) => (
            <span key={d} style={{
              width: 4, height: 4, borderRadius: "50%", background: "var(--accent)",
              display: "inline-block",
              animation: `dotpulse 2s ease-in-out ${d}ms infinite`,
            }} />
          ))}
        </div>
      </div>

      {/* Terminal body — ref for internal scrolling only */}
      <div ref={bodyRef} style={{
        padding: "16px 20px",
        minHeight: 320,
        maxHeight: 380,
        overflowY: "auto",
      }}>
        {LINES.slice(0, visible).map((line, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre",
              ...STYLE_MAP[line.style],
              lineHeight: line.style === "blank" ? "0.6" : undefined,
            }}
          >
            {line.text || " "}
          </div>
        ))}

        {/* Blinking cursor */}
        {visible > 0 && visible < LINES.length && (
          <span className="cursor" style={{ color: "var(--accent)", fontSize: 13 }}>▌</span>
        )}

        {/* Prompt after done */}
        {visible >= LINES.length && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ color: "var(--accent2)", fontSize: 11 }}>buggy@target ~ %</span>
            <span className="cursor" style={{ color: "var(--accent)", fontSize: 13 }}>▌</span>
          </div>
        )}
      </div>
    </div>
  );
}
