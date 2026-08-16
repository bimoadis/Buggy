"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/content/skills";
import { domains } from "@/content/domains";

export function MCSkillsTable() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchDomain = activeTab === "all" || s.domain === activeTab;
      const matchSearch =
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.command.toLowerCase().includes(search.toLowerCase()) ||
        s.domain.toLowerCase().includes(search.toLowerCase());
      return matchDomain && matchSearch;
    });
  }, [activeTab, search]);

  return (
    <section id="skills-table" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
      {/* Section Head */}
      <div className="table-section-head">
        <div>
          <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            [ 51 PRODUCTION-READY SECURITY CONTEXTS ]
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
            SKILL DIRECTORY
          </h2>
        </div>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>
          {filteredSkills.length} of {skills.length} SKILLS DISPLAYED
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="table-filter-bar">
        {/* Search Input */}
        <div className="table-search-input">
          <svg
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text3)" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by vulnerability, command (/hunt-sqli), or domain..."
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
                <AnimatePresence mode="popLayout" initial={false}>
                  {filteredSkills.map((skill, i) => (
                    <motion.tr
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        borderBottom: i < filteredSkills.length - 1 ? "1px solid var(--border)" : "none",
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
                          {(() => {
                            const isBoth = skill.env === "both";
                            const isCode = skill.env === "code";
                            const bg = isBoth ? "var(--orange-bg)" : isCode ? "#f5f3ff" : "#f0fdf4";
                            const col = isBoth ? "var(--orange)" : isCode ? "#7c3aed" : "#16a34a";
                            const border = isBoth ? "var(--orange-border)" : isCode ? "rgba(124,58,237,0.25)" : "rgba(22,163,74,0.25)";
                            return (
                              <span
                                style={{
                                  fontFamily: "var(--font-geist-mono)",
                                  fontSize: 10,
                                  padding: "2px 8px",
                                  borderRadius: 10,
                                  fontWeight: 600,
                                  background: bg,
                                  color: col,
                                  border: `1px solid ${border}`,
                                }}
                              >
                                {skill.env}
                              </span>
                            );
                          })()}
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
                            transition: "all 0.12s ease",
                          }}
                        >
                          VIEW →
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
