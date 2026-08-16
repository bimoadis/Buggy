"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { skills, Skill } from "@/content/skills";
import { domains } from "@/content/domains";

export function MCSkillsTable() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

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

  return (
    <section id="skills-table" style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div className="table-section-head">
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            [ SECURITY ANALYSIS ]
          </div>
          <div style={{ fontSize: 12, fontFamily: "var(--font-geist-mono)", color: "var(--text2)", letterSpacing: "0.05em" }}>
            51 SKILLS · CLAUDE CODE · DAILY PATTERNS
          </div>
        </div>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>
          &gt; FILTER (↕↓)
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="table-filter-bar">
        {/* Search */}
        <div className="table-search-input">
          <svg
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 14,
              height: 14,
              stroke: "var(--text3)",
              fill: "none",
            }}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search skill name, command, or vulnerability class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("all")}
            className={`table-btn-tab ${activeTab === "all" ? "active" : ""}`}
          >
            All ({skills.length})
          </button>
          {domains.map((d) => (
            <button
              key={d.slug}
              onClick={() => setActiveTab(d.slug)}
              className={`table-btn-tab ${activeTab === d.slug ? "active" : ""}`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div style={{ margin: "0 24px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--white)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--white)" }}>
            <thead>
              <tr style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", fontFamily: "var(--font-geist-mono)" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", width: 44 }}>#</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Skill &amp; Vulnerability</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Command</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Domain</th>
                <th style={{ padding: "10px 16px", textAlign: "center" }}>Env</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Reports</th>
                <th style={{ padding: "10px 16px", textAlign: "right", width: 90 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 48, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", fontSize: 13 }}>
                    No skills found matching &quot;{search}&quot;
                  </td>
                </tr>
              ) : (
                filteredSkills.map((skill, i) => (
                  <tr
                    key={skill.id}
                    style={{
                      borderBottom: i < filteredSkills.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "background 0.1s",
                      fontSize: 13,
                    }}
                  >
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--text3)", fontSize: 11 }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--text2)", maxWidth: 360, lineHeight: 1.4 }}>
                        {skill.description.slice(0, 75)}...
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <code style={{ fontFamily: "var(--font-geist-mono)", background: "#f4f4f2", border: "1px solid var(--border2)", padding: "2px 7px", borderRadius: 4, fontSize: 11, color: "var(--text)" }}>
                        {skill.command}
                      </code>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontSize: 11.5, color: "var(--text2)" }}>
                      {skill.domain}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 10,
                          fontWeight: 600,
                          background: skill.env === "both" ? "var(--green-bg)" : skill.env === "chat" ? "var(--orange-bg)" : "var(--purple-bg)",
                          color: skill.env === "both" ? "var(--green)" : skill.env === "chat" ? "var(--orange)" : "var(--purple)",
                          border: `1px solid ${skill.env === "both" ? "rgba(22,163,74,0.25)" : skill.env === "chat" ? "rgba(6,96,241,0.25)" : "rgba(124,58,237,0.25)"}`,
                        }}
                      >
                        {skill.env}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "var(--text3)" }}>
                      {skill.reportCount ? `${skill.reportCount}` : "—"}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <Link
                        href={`/skills/${skill.id}`}
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 10,
                          color: "var(--text)",
                          border: "1px solid var(--border)",
                          padding: "4px 8px",
                          borderRadius: 4,
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        VIEW →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
