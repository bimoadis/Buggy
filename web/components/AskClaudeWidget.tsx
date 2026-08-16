"use client";
import { useState, useRef } from "react";

interface Props {
  skillName: string;
  skillCommand: string;
  domain: string;
  description: string;
}

type State = "idle" | "loading" | "done" | "error";

export function AskClaudeWidget({ skillName, skillCommand, domain, description }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer]     = useState("");
  const [state, setState]       = useState<State>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const context = `Skill: "${skillName}" (${skillCommand}). Domain: ${domain}. Description: ${description.slice(0, 120)}.`;

  const submit = async () => {
    const q = question.trim();
    if (!q || state === "loading") return;
    setState("loading");
    setAnswer("");
    try {
      const res = await fetch("/api/ask-claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context }),
      });
      const data = await res.json() as { answer?: string; error?: string };
      if (data.error) throw new Error(data.error);
      setAnswer(data.answer ?? "");
      setState("done");
    } catch (e) {
      setAnswer((e as Error).message ?? "Something went wrong.");
      setState("error");
    }
  };

  const reset = () => {
    setQuestion("");
    setAnswer("");
    setState("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div style={{
      background: "var(--accent-dim)",
      border: "1px solid rgba(90,133,255,0.22)",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 12,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span style={{ color: "var(--accent)", fontSize: 10 }}>◆</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>
          Ask Claude
        </span>
      </div>

      <p style={{ fontSize: 11, color: "rgba(240,240,255,0.45)", lineHeight: 1.55, margin: "0 0 10px", fontWeight: 300 }}>
        Questions about {skillName}?
      </p>

      {/* Input */}
      {state !== "done" && state !== "error" && (
        <div style={{ display: "flex", gap: 6 }}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Ask anything…"
            disabled={state === "loading"}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 7,
              padding: "7px 10px",
              fontSize: 11,
              color: "var(--text)",
              fontFamily: "var(--font-sans)",
              outline: "none",
              minWidth: 0,
            }}
          />
          <button
            onClick={submit}
            disabled={!question.trim() || state === "loading"}
            style={{
              background: state === "loading" ? "rgba(90,133,255,0.4)" : "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "7px 10px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              cursor: state === "loading" ? "not-allowed" : "pointer",
              flexShrink: 0,
              letterSpacing: "0.02em",
              transition: "background 0.15s",
            }}
          >
            {state === "loading" ? "…" : "Ask →"}
          </button>
        </div>
      )}

      {/* Response */}
      {(state === "done" || state === "error") && (
        <div>
          <div style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${state === "error" ? "rgba(239,68,68,0.25)" : "rgba(90,133,255,0.12)"}`,
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 11,
            color: state === "error" ? "rgba(239,68,68,0.8)" : "rgba(240,240,255,0.65)",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            marginBottom: 8,
          }}>
            {answer}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={reset}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "5px 10px",
                fontSize: 10,
                color: "rgba(240,240,255,0.35)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}
            >
              Ask again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
