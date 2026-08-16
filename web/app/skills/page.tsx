"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import "../mcptrade.css";
import { PromoBar } from "@/components/home/PromoBar";
import { MCNav } from "@/components/home/MCNav";
import { HunterTicker } from "@/components/home/HunterTicker";
import { MCFooter } from "@/components/home/MCFooter";
import { skills, Skill } from "@/content/skills";
import { domains } from "@/content/domains";

const BADGE_COLOR: Record<string, { bg: string; color: string }> = {
  "web-hunting": { bg: "#EEF5FF", color: "#0660F1" },
  "auth": { bg: "#EFF6FF", color: "#2563EB" },
  "api-infra": { bg: "#F5F3FF", color: "#7C3AED" },
  "enterprise": { bg: "#FDF2F8", color: "#DB2777" },
  "red-team": { bg: "#FEF2F2", color: "#DC2626" },
  "recon": { bg: "#ECFEFF", color: "#0891B2" },
  "reporting": { bg: "#F0FDF4", color: "#16A34A" },
  "specialized": { bg: "#F0FDFA", color: "#0D9488" },
};

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter((s: Skill) => {
      const matchDomain = activeTab === "all" || s.domain === activeTab;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.command.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q);
      return matchDomain && matchSearch;
    });
  }, [activeTab, search]);

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PromoBar />
      <MCNav />
      <HunterTicker />

      {/* Header Banner */}
      <div style={{ padding: "48px 28px 0", borderBottom: "1px solid var(--border)", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          [ CLAUDE SECURITY SKILLS ]
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, textTransform: "uppercase", lineHeight: 1.05 }}>
            51 PRODUCTION SKILLS<br />FOR BUG HUNTING
          </h1>
          <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", paddingTop: 4 }}>
            &gt; FILTER BY CATEGORY (↕↓)
          </div>
        </div>
        <p style={{ color: "var(--text2)", fontSize: 14, maxWidth: 520, lineHeight: 1.6, marginBottom: 20 }}>
          51 ready-to-use skills for Claude Code + Chat. Built from 574+ HackerOne disclosures. Copy and run directly in your Claude Code terminal.
        </p>

        <div style={{ display: "flex", gap: 20, marginBottom: 24, fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text3)", flexWrap: "wrap" }}>
          <div>
            <span style={{ color: "var(--text)", fontWeight: 700 }}>51</span> total skills
          </div>
          <div>
            <span style={{ color: "var(--text)", fontWeight: 700 }}>8</span> categories
          </div>
          <div>
            <span style={{ color: "var(--text)", fontWeight: 700 }}>Claude 3.7</span> powered
          </div>
          <div>
            <span style={{ color: "var(--text)", fontWeight: 700 }}>100% MIT</span> licensed
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, padding: "16px 28px", flexWrap: "wrap", maxWidth: 1400, margin: "0 auto" }}>
        <button
          onClick={() => setActiveTab("all")}
          style={{
            background: activeTab === "all" ? "var(--text)" : "var(--white)",
            border: `1px solid ${activeTab === "all" ? "var(--text)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)",
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 500,
            color: activeTab === "all" ? "var(--white)" : "var(--text2)",
            cursor: "pointer",
            fontFamily: "var(--font-geist-mono)",
            transition: "all 0.15s",
          }}
        >
          All ({skills.length})
        </button>
        {domains.map((d) => (
          <button
            key={d.slug}
            onClick={() => setActiveTab(d.slug)}
            style={{
              background: activeTab === d.slug ? "var(--text)" : "var(--white)",
              border: `1px solid ${activeTab === d.slug ? "var(--text)" : "var(--border)"}`,
              borderRadius: "var(--radius-sm)",
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 500,
              color: activeTab === d.slug ? "var(--white)" : "var(--text2)",
              cursor: "pointer",
              fontFamily: "var(--font-geist-mono)",
              transition: "all 0.15s",
            }}
          >
            {d.title} ({d.skillCount})
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div style={{ padding: "0 28px 16px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ position: "relative", maxWidth: 360 }}>
          <svg
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 13,
              height: 13,
              stroke: "var(--text3)",
              fill: "none",
              pointerEvents: "none",
            }}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search skills, commands, tags..."
            style={{
              width: "100%",
              padding: "8px 12px 8px 30px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--white)",
              fontSize: 12,
              fontFamily: "var(--font-geist-mono)",
              color: "var(--text)",
              outline: "none",
              boxSizing: "border-box",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Skills Card Grid matching live mcptrade.site */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 12,
          padding: "0 28px 48px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {filteredSkills.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 20px", color: "var(--text3)", fontFamily: "var(--font-geist-mono)" }}>
            No skills found matching &quot;{search}&quot;
          </div>
        ) : (
          filteredSkills.map((skill) => {
            const badge = BADGE_COLOR[skill.domain] || { bg: "#FFF4EE", color: "#FF6B00" };
            return (
              <div
                key={skill.id}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Card Head */}
                <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                      {skill.command}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 3 }}>
                      {skill.name}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: 2,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontFamily: "var(--font-geist-mono)",
                      flexShrink: 0,
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {skill.domain.split("-")[0]}
                  </span>
                </div>

                {/* Dark Code Block */}
                <div style={{ background: "var(--term-bg)", padding: "10px 14px", overflow: "hidden", fontFamily: "var(--font-geist-mono)", fontSize: 10, lineHeight: 1.7, color: "var(--term-white)" }}>
                  <span style={{ color: "var(--term-blue)" }}>claude</span> <span style={{ color: "var(--term-green)" }}>&quot;{skill.command} https://target.com&quot;</span>
                  {"\n"}<span style={{ color: "#737373" }}># auto-loads {skill.domain} patterns</span>
                </div>

                {/* Card Foot */}
                <div style={{ padding: "8px 14px", borderTop: "1px solid var(--border2)", display: "flex", alignItems: "center", gap: 6, background: "var(--bg)", marginTop: "auto" }}>
                  <span style={{ fontSize: 9, fontWeight: 500, padding: "2px 6px", borderRadius: 2, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text3)", fontFamily: "var(--font-geist-mono)" }}>
                    {skill.env}
                  </span>
                  {skill.reportCount && (
                    <span style={{ fontSize: 9, fontWeight: 500, padding: "2px 6px", borderRadius: 2, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text3)", fontFamily: "var(--font-geist-mono)" }}>
                      {skill.reportCount} reports
                    </span>
                  )}
                  <Link
                    href={`/skills/${skill.id}`}
                    style={{ marginLeft: "auto", fontSize: 9, color: "var(--text)", fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}
                  >
                    VIEW →
                  </Link>
                  <button
                    onClick={() => handleCopy(skill.id, skill.command)}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "3px 9px",
                      fontSize: 10,
                      color: copiedId === skill.id ? "var(--green)" : "var(--text3)",
                      cursor: "pointer",
                      fontFamily: "var(--font-geist-mono)",
                      transition: "all 0.15s",
                    }}
                  >
                    {copiedId === skill.id ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <MCFooter />
    </div>
  );
}
