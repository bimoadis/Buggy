"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/* ── Domain-specific suggested questions ── */
const SUGGESTED: Record<string, string[]> = {
  "web-hunting": [
    "What payloads should I try first?",
    "How do I confirm blind injection?",
    "Which headers are most often reflected?",
  ],
  "auth": [
    "How do I test OAuth redirect_uri bypass?",
    "What makes a JWT vulnerable to key confusion?",
    "How do I chain auth bugs for higher impact?",
  ],
  "api-infra": [
    "How do I detect mass assignment flaws?",
    "Which CORS configurations are exploitable?",
    "How do I abuse GraphQL introspection?",
  ],
  "enterprise": [
    "How do I enumerate M365 from the outside?",
    "What Okta endpoints are commonly misconfigured?",
    "How does vCenter pre-auth RCE work?",
  ],
  "red-team": [
    "How do I extract secrets from an APK?",
    "What supply chain indicators should I look for?",
    "How do I identify detection blind spots?",
  ],
  "recon": [
    "What passive recon should I do first?",
    "How do I enumerate subdomains at scale?",
    "How do I trace identity fabric from OSINT data?",
  ],
  "reporting": [
    "What makes a finding get paid vs N/A?",
    "How do I score CVSS 3.1 correctly?",
    "What does the 7-Question Gate reject?",
  ],
  "specialized": [
    "What DeFi bug classes have the highest payouts?",
    "How do I identify reentrancy in Solidity?",
    "What signals indicate a rug pull contract?",
  ],
};

const FALLBACK = [
  "What does this skill produce?",
  "Who is this skill designed for?",
  "How do I get started quickly?",
];

interface Msg  { role: "user" | "assistant"; content: string; }
interface Props {
  skillName: string;
  skillCommand: string;
  domain: string;
  description: string;
}

/* ── React-component markdown renderer (no dangerouslySetInnerHTML) ── */
function inlineRender(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`") && p.length > 2)
      return <code key={i} style={{ fontFamily: "var(--font-mono)", background: "var(--accent-dim)", padding: "1px 5px", borderRadius: 3, fontSize: "0.88em", color: "var(--accent)" }}>{p.slice(1, -1)}</code>;
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4)
      return <strong key={i} style={{ fontWeight: 600, color: "var(--text)" }}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
      return <em key={i}>{p.slice(1, -1)}</em>;
    return p;
  });
}

function MdTable({ lines }: { lines: string[] }) {
  const isSep = (l: string) => /^\|[\s\-:|]+\|/.test(l.trim());
  const parseRow = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const headers = parseRow(lines[0]);
  const body = lines.slice(1).filter((l) => !isSep(l)).map(parseRow);
  return (
    <div style={{ overflowX: "auto", margin: "8px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12, lineHeight: 1.5 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "5px 10px", background: "var(--accent-dim)", borderBottom: "1px solid var(--b0)", fontWeight: 600, fontSize: 11, textAlign: "left", whiteSpace: "nowrap", color: "var(--accent)" }}>
                {inlineRender(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid var(--b0)" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "5px 10px", color: ci === 0 ? "var(--text)" : "var(--text-muted)", fontWeight: ci === 0 ? 500 : 300, verticalAlign: "top" }}>
                  {inlineRender(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MdMsg({ text }: { text: string }) {
  if (!text) return null;
  const blocks = text.split(/(```[\s\S]*?```)/g);
  return (
    <>
      {blocks.flatMap((block, bi) => {
        if (block.startsWith("```")) {
          const code = block.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
          return [
            <pre key={`cb-${bi}`} style={{ background: "rgba(0,0,0,0.35)", border: "1px solid var(--b0)", borderRadius: 6, padding: "10px 12px", fontSize: 11, fontFamily: "var(--font-mono)", overflowX: "auto", margin: "6px 0", whiteSpace: "pre", lineHeight: 1.55 }}>
              <code style={{ color: "rgba(240,240,255,0.82)" }}>{code}</code>
            </pre>,
          ];
        }
        return block.split(/\n\n+/).map((para, pi) => {
          if (!para.trim()) return null;
          const lines = para.split("\n").filter((l) => l.trim());
          if (lines.length >= 2 && lines.every((l) => l.trim().startsWith("|")))
            return <MdTable key={`${bi}-${pi}`} lines={lines} />;
          const isUl = lines.length > 0 && lines.every((l) => /^[-*] /.test(l));
          const isOl = lines.length > 0 && lines.every((l) => /^\d+\. /.test(l));
          if (isUl) return (
            <ul key={`${bi}-${pi}`} style={{ paddingLeft: 18, margin: "4px 0 8px", listStyleType: "disc" }}>
              {lines.map((l, li) => <li key={li} style={{ marginBottom: 3, lineHeight: 1.6 }}>{inlineRender(l.replace(/^[-*] /, ""))}</li>)}
            </ul>
          );
          if (isOl) return (
            <ol key={`${bi}-${pi}`} style={{ paddingLeft: 18, margin: "4px 0 8px", listStyleType: "decimal" }}>
              {lines.map((l, li) => <li key={li} style={{ marginBottom: 3, lineHeight: 1.6 }}>{inlineRender(l.replace(/^\d+\. /, ""))}</li>)}
            </ol>
          );
          return (
            <p key={`${bi}-${pi}`} style={{ margin: "0 0 6px", lineHeight: 1.65 }}>
              {para.split("\n").flatMap((line, li, arr) => [inlineRender(line), li < arr.length - 1 ? <br key={`br-${li}`} /> : null])}
            </p>
          );
        }).filter(Boolean);
      })}
    </>
  );
}

/* ── Avatar ── */
function BotAvatar({ size = 26 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="buggy"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: "1.5px solid rgba(6,96,241,0.4)",
      }}
    />
  );
}

/* ── Main component ── */
export function AskBuggyModal({ skillName, skillCommand, domain, description }: Props) {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput]     = useState("");
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Domain slug: "Auth & Identity" → "auth" etc. — try matching slug directly */
  const domainSlug = domain.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const questions  = SUGGESTED[domainSlug] ?? SUGGESTED[domain] ?? FALLBACK;
  const context    = `Skill: "${skillName}" (${skillCommand}). Domain: ${domain}. ${description.slice(0, 160)}.`;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 420);
    } else {
      document.body.style.overflow = "";
      setMsgs([]);
      setInput("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const history = [...msgs, userMsg];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res  = await fetch("/api/ask-claude", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: text.trim(), context }) });
      const data = await res.json() as { answer?: string; error?: string };
      setMsgs([...history, { role: "assistant", content: data.answer ?? data.error ?? "No response." }]);
    } catch {
      setMsgs([...history, { role: "assistant", content: "Network error — please try again." }]);
    }
    setLoading(false);
  }

  const modal = (
    <div className="cbug-backdrop" onClick={() => setOpen(false)}>
      <div className="cbug-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--b0)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "var(--hero)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BotAvatar size={34} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>buggy</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", letterSpacing: "0.06em", marginTop: 2 }}>{skillCommand} · {skillName}</div>
            </div>
          </div>
          <button className="cbug-close-btn" onClick={() => setOpen(false)}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 300, lineHeight: 1.65 }}>
              Ask anything about <strong style={{ fontWeight: 600, color: "var(--text)" }}>{skillName}</strong>. Try a suggestion below:
            </p>
          ) : (
            <>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start", gap: 8 }}>
                  {m.role === "assistant" && <BotAvatar size={26} />}
                  <div style={{
                    background:   m.role === "user" ? "var(--accent)" : "var(--s2)",
                    color:        m.role === "user" ? "#fff" : "var(--text-muted)",
                    border:       m.role === "user" ? "none" : "1px solid var(--b0)",
                    borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "4px 12px 12px 12px",
                    padding:      "10px 14px",
                    maxWidth:     "82%",
                    fontSize:     13,
                    lineHeight:   1.65,
                    fontWeight:   m.role === "user" ? 500 : 300,
                    wordBreak:    "break-word",
                  }}>
                    {m.role === "assistant"
                      ? (m.content
                          ? <MdMsg text={m.content} />
                          : loading && i === msgs.length - 1
                              ? (
                                <span style={{ display: "flex", gap: 4, alignItems: "center", height: 18 }}>
                                  {[0, 200, 400].map((d) => (
                                    <span key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block", animation: `typing-dot 1.4s ease-in-out ${d}ms infinite` }} />
                                  ))}
                                </span>
                              )
                              : null
                        )
                      : m.content
                    }
                    {loading && i === msgs.length - 1 && m.role === "assistant" && m.content && (
                      <span className="cbug-cursor" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Suggestion chips */}
        <div style={{ padding: "8px 14px 4px", borderTop: "1px solid var(--b0)", display: "flex", gap: 6, overflowX: "auto", flexShrink: 0, scrollbarWidth: "none" }}>
          {questions.map((q, i) => (
            <button key={q} className="cbug-chip-btn" style={{ animationDelay: `${i * 50}ms` }} onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: "8px 14px 14px", display: "flex", gap: 8, flexShrink: 0 }}>
          <input
            ref={inputRef}
            className="cbug-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={`Ask about ${skillName}…`}
            disabled={loading}
          />
          <button
            className="cbug-submit-btn"
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            data-active={input.trim() && !loading ? "" : undefined}
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        .cbug-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          background: rgba(4,4,10,0.72); backdrop-filter: blur(6px);
          animation: cbug-fade-in 180ms ease forwards;
        }
        .cbug-panel {
          background: var(--s1); border: 1px solid rgba(90,133,255,0.22); border-radius: 18px;
          width: 100%; max-width: 560px; height: 560px; max-height: 86vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(90,133,255,0.1);
          animation: cbug-enter 300ms cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .cbug-close-btn {
          background: none; border: 1px solid var(--b0); border-radius: 6px;
          cursor: pointer; color: var(--text-muted); font-size: 18px; line-height: 1;
          padding: 4px 10px; transition: background 0.12s, border-color 0.12s;
        }
        .cbug-close-btn:hover { background: var(--s2); border-color: rgba(90,133,255,0.3); }
        .cbug-chip-btn {
          background: var(--s2); border: 1px solid var(--b0); border-radius: 20px;
          padding: 5px 11px; font-size: 11px; color: var(--text-muted);
          white-space: nowrap; cursor: pointer; font-family: var(--font-sans); line-height: 1.4;
          flex-shrink: 0; transition: border-color 0.12s, background 0.12s, color 0.12s;
          animation: cbug-chip-in 220ms ease both;
        }
        .cbug-chip-btn:hover { border-color: rgba(90,133,255,0.45); background: var(--accent-dim); color: var(--accent); }
        .cbug-input {
          flex: 1; background: var(--s2); border: 1px solid var(--b0); border-radius: 10px;
          padding: 10px 13px; font-size: 13px; color: var(--text); font-family: var(--font-sans);
          outline: none; transition: border-color 0.15s;
        }
        .cbug-input:focus { border-color: rgba(90,133,255,0.5); }
        .cbug-input:disabled { opacity: 0.45; }
        .cbug-submit-btn {
          background: var(--s2); color: var(--text-muted); border: 1px solid var(--b0);
          border-radius: 10px; padding: 10px 16px; font-size: 16px; font-weight: 600;
          cursor: default; transition: background 0.15s, color 0.15s, border-color 0.15s;
          font-family: var(--font-sans); flex-shrink: 0;
        }
        .cbug-submit-btn[data-active] { background: var(--accent); color: #fff; border-color: transparent; cursor: pointer; }
        .cbug-submit-btn[data-active]:hover { background: var(--accent2); }
        .cbug-cursor {
          display: inline-block; width: 2px; height: 13px; background: var(--accent);
          border-radius: 1px; margin-left: 3px; vertical-align: text-bottom;
          animation: cbug-blink 800ms step-end infinite;
        }
        @keyframes cbug-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cbug-enter   { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes cbug-chip-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes cbug-blink   { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .cbug-panel > div:nth-last-child(2)::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Sidebar trigger card */}
      <div style={{ background: "var(--accent-dim)", border: "1px solid rgba(90,133,255,0.22)", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
          <span style={{ color: "var(--accent)", fontSize: 10 }}>◆</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>Ask buggy</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(240,240,255,0.45)", lineHeight: 1.55, margin: "0 0 10px", fontWeight: 300 }}>Questions about {skillName}?</p>
        <button onClick={() => setOpen(true)} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", background: "transparent", border: "none", padding: 0, cursor: "pointer", letterSpacing: "0.04em", fontWeight: 500 }}>
          Ask a question →
        </button>
      </div>

      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}

export const AskCbugModal = AskBuggyModal;
