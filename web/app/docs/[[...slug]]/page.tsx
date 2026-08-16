"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CountUpNumber } from "@/components/CountUpNumber";
import "@/app/mcptrade.css";
import { PromoBar } from "@/components/home/PromoBar";
import { MCNav } from "@/components/home/MCNav";
import { HunterTicker } from "@/components/home/HunterTicker";
import { MCFooter } from "@/components/home/MCFooter";

const DOC_SECTIONS = [
  { id: "overview", title: "Architecture & Overview", group: "GETTING STARTED" },
  { id: "quick-start", title: "Quick Start Guide", group: "GETTING STARTED" },
  { id: "install", title: "Installation & Setup", group: "GETTING STARTED" },
  { id: "7-question-gate", title: "7-Question Quality Gate", group: "QUALITY GATE" },
  { id: "chat-vs-code", title: "Claude Chat vs Code", group: "ENVIRONMENTS" },
  { id: "reporting", title: "Report Artifacts & CVSS", group: "REPORTING" },
  { id: "faq", title: "FAQ & Support", group: "SUPPORT" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const sec of DOC_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PromoBar />
      <MCNav />
      <HunterTicker />

      <div className="docs-layout">
        {/* Sticky Left Sidebar */}
        <aside className="docs-sidebar">
          <div className="sidebar-label">Documentation</div>

          {["GETTING STARTED", "QUALITY GATE", "ENVIRONMENTS", "REPORTING", "SUPPORT"].map((grp) => (
            <div key={grp} style={{ marginBottom: 18 }}>
              <div className="sidebar-label" style={{ fontSize: 9, color: "var(--text3)", marginBottom: 6 }}>
                {grp}
              </div>
              <div className="sidebar-nav">
                {DOC_SECTIONS.filter((s) => s.group === grp).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={activeSection === s.id ? "active" : ""}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="sidebar-divider" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11, fontFamily: "var(--font-geist-mono)" }}>
            <Link href="/skills" style={{ color: "var(--orange)", textDecoration: "none" }}>
              Explore 51 Skills →
            </Link>
            <a
              href="https://github.com/bimoadis/Buggy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text2)", textDecoration: "none" }}
            >
              GitHub Repository ↗
            </a>
          </div>
        </aside>

        {/* Main Document Content */}
        <main className="docs-content">

          {/* Section 1: Architecture Overview */}
          <section id="overview" className="doc-section">
            <div className="eyebrow">[ 01 · SYSTEM OVERVIEW ]</div>
            <h1 className="doc-title">
              BUGGY ARCHITECTURE &amp; <span className="hl">SECURITY INTELLIGENCE</span>
            </h1>
            <p className="doc-lead">
              Buggy is a specialized collection of 51 production-grade Claude AI skills built from hundreds of public HackerOne
              and Bugcrowd disclosures.
            </p>

            <div className="info-grid">
              <div className="info-cell">
                <div className="info-label">TOTAL SKILLS</div>
                <div className="info-value"><CountUpNumber target={51} suffix=" Skills" /></div>
              </div>
              <div className="info-cell">
                <div className="info-label">ATTACK DOMAINS</div>
                <div className="info-value"><CountUpNumber target={8} suffix=" Domains" /></div>
              </div>
              <div className="info-cell">
                <div className="info-label">DISCLOSED PATTERNS</div>
                <div className="info-value"><CountUpNumber target={574} suffix="+ H1 Disclosures" /></div>
              </div>
              <div className="info-cell">
                <div className="info-label">ENVIRONMENTS</div>
                <div className="info-value">Chat + Code</div>
              </div>
              <div className="info-cell">
                <div className="info-label">QUALITY GATE</div>
                <div className="info-value">7-Question Filter</div>
              </div>
              <div className="info-cell">
                <div className="info-label">LICENSE</div>
                <div className="info-value">MIT Open Source</div>
              </div>
            </div>

            <h2 className="doc-h2">How Skills Operate</h2>
            <p className="doc-p">
              Each skill is self-contained within a single <code className="inline">SKILL.md</code> context bundle that acts as a complete system prompt.
              Skills automatically load based on contextual triggers (e.g., encountering a JWT token loads the OAuth &amp; Auth skill,
              or an APK path loads the mobile red team skill).
            </p>
          </section>

          {/* Section 2: Quick Start */}
          <section id="quick-start" className="doc-section">
            <div className="eyebrow">[ 02 · QUICK START ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              GETTING STARTED IN <span className="hl">UNDER 5 MINUTES</span>
            </h2>
            <p className="doc-lead">
              Run bug hunts against live targets with Claude Code or perform static code review in Claude Chat.
            </p>

            <div className="term-box">
              <span className="lbl"># 1. Install Claude Code</span>
              {"\n"}<span className="kw">npm</span> install -g @anthropic-ai/claude-code
              {"\n\n"}<span className="lbl"># 2. Clone the Buggy Skill Repository</span>
              {"\n"}<span className="kw">git</span> clone https://github.com/bimoadis/Buggy.git buggy-skills
              {"\n"}<span className="kw">cd</span> buggy-skills
              {"\n\n"}<span className="lbl"># 3. Launch Claude Code &amp; Start Hunting</span>
              {"\n"}<span className="kw">claude</span>
              {"\n"}<span className="fn">/hunt</span> <span className="str">https://target.com</span>
            </div>

            <ul className="steps-list">
              <li>
                <span className="step-num">1</span>
                <div>
                  <strong style={{ color: "var(--text)" }}>Clone the repository:</strong> Contains all 51 skills grouped by domain.
                </div>
              </li>
              <li>
                <span className="step-num">2</span>
                <div>
                  <strong style={{ color: "var(--text)" }}>Launch Claude:</strong> Run <code className="inline">claude</code> inside the project root so skills auto-register.
                </div>
              </li>
              <li>
                <span className="step-num">3</span>
                <div>
                  <strong style={{ color: "var(--text)" }}>Execute slash command:</strong> Use <code className="inline">/hunt [target]</code> for full pipeline or <code className="inline">/hunt-sqli</code> for specific attack classes.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Installation */}
          <section id="install" className="doc-section">
            <div className="eyebrow">[ 03 · INSTALLATION GUIDE ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              INSTALLATION MODES FOR <span className="hl">CLAUDE CHAT &amp; CODE</span>
            </h2>

            <table className="doc-table">
              <thead>
                <tr>
                  <th>METHOD</th>
                  <th>ENVIRONMENT</th>
                  <th>SETUP TIME</th>
                  <th>CAPABILITIES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ZIP Upload</strong></td>
                  <td>Claude Chat (Web)</td>
                  <td>1 Minute</td>
                  <td>Static analysis, code audit, report generation</td>
                </tr>
                <tr>
                  <td><strong>Repo Clone</strong></td>
                  <td>Claude Code (CLI)</td>
                  <td>2 Minutes</td>
                  <td>Live HTTP requests, tool execution (nuclei/ffuf), terminal streaming</td>
                </tr>
                <tr>
                  <td><strong>API Prompt</strong></td>
                  <td>Anthropic API / SDK</td>
                  <td>Instant</td>
                  <td>Direct system prompt injection for automated pipelines</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 4: 7-Question Quality Gate */}
          <section id="7-question-gate" className="doc-section">
            <div className="eyebrow">[ 04 · QUALITY GATE ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              THE 7-QUESTION <span className="hl">QUALITY GATE</span>
            </h2>
            <p className="doc-lead">
              Every finding must clear all 7 questions before a report is written. A single &quot;No&quot; kills the report immediately.
              This guarantees zero speculative submissions and protects your program reputation.
            </p>

            <table className="doc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>QUESTION</th>
                  <th>VERIFICATION CRITERIA</th>
                  <th>ACTION ON FAILURE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>01</code></td>
                  <td><strong>In Scope?</strong></td>
                  <td>Target domain / wildcard matches bug bounty policy</td>
                  <td>KILL — Out of scope</td>
                </tr>
                <tr>
                  <td><code>02</code></td>
                  <td><strong>Proven Exploitable?</strong></td>
                  <td>Working PoC HTTP request/response or token extracted</td>
                  <td>KILL — Speculative / theoretical</td>
                </tr>
                <tr>
                  <td><code>03</code></td>
                  <td><strong>Real Impact?</strong></td>
                  <td>Demonstrates CIA impact (data leak, privilege gain, RCE)</td>
                  <td>KILL — Informational / Best practice</td>
                </tr>
                <tr>
                  <td><code>04</code></td>
                  <td><strong>Reproduced Twice?</strong></td>
                  <td>Finding verified with independent clean sessions</td>
                  <td>KILL — Flaky / Transient</td>
                </tr>
                <tr>
                  <td><code>05</code></td>
                  <td><strong>Clean PoC?</strong></td>
                  <td>Minimal non-destructive payload; no spam/DoS</td>
                  <td>REWRITE — Refine payload</td>
                </tr>
                <tr>
                  <td><code>06</code></td>
                  <td><strong>Duplicate Checked?</strong></td>
                  <td>Search public disclosures &amp; known endpoints</td>
                  <td>KILL — Probable duplicate</td>
                </tr>
                <tr>
                  <td><code>07</code></td>
                  <td><strong>Submit-Ready?</strong></td>
                  <td>Structured CVSS 3.1, impact narrative, and remediation</td>
                  <td>READY TO SHIP ✓</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 5: Chat vs Code */}
          <section id="chat-vs-code" className="doc-section">
            <div className="eyebrow">[ 05 · ENVIRONMENTS ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              CLAUDE CHAT VS <span className="hl">CLAUDE CODE</span>
            </h2>

            <div className="term-box">
              <span className="lbl"># Use Claude Chat when:</span>
              {"\n"}<span className="str">✓ Reviewing source code repositories</span>
              {"\n"}<span className="str">✓ Drafting Bugcrowd/H1 reports and CVSS scores</span>
              {"\n"}<span className="str">✓ Analyzing complex JWT or SAML token responses</span>
              {"\n\n"}<span className="lbl"># Use Claude Code when:</span>
              {"\n"}<span className="str">✓ Active subdomain enumeration and recon</span>
              {"\n"}<span className="str">✓ Live target probing via curl / HTTP tools</span>
              {"\n"}<span className="str">✓ End-to-end chained hunts with automated terminal feedback</span>
            </div>
          </section>

          {/* Section 6: Reporting */}
          <section id="reporting" className="doc-section">
            <div className="eyebrow">[ 06 · REPORT ARTIFACTS ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              STANDARDIZED <span className="hl">REPORT ARTIFACTS</span>
            </h2>
            <p className="doc-lead">
              Buggy outputs reports formatted specifically for HackerOne, Bugcrowd, and Intigriti triage teams.
            </p>

            <div className="term-box">
              <span className="lbl">## Vulnerability Report: [Vulnerability Title]</span>
              {"\n"}<span className="kw">**Target:**</span> https://target.com/api/v1/resource
              {"\n"}<span className="kw">**Vulnerability Class:**</span> Blind Time-based SQL Injection (CWE-89)
              {"\n"}<span className="kw">**CVSS 3.1:**</span> 9.1 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N)
              {"\n"}<span className="kw">**7-Question Gate:**</span> CLEARED (7/7)
              {"\n\n"}<span className="fn">### Steps to Reproduce:</span>
              {"\n1. Send GET request with parameter `q=1%20WAITFOR%20DELAY%20'0:0:8'`"}
              {"\n2. Observe delayed server response of 8.4 seconds."}
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section id="faq" className="doc-section">
            <div className="eyebrow">[ 07 · FAQ &amp; SUPPORT ]</div>
            <h2 className="doc-title" style={{ fontSize: 30 }}>
              FREQUENTLY ASKED <span className="hl">QUESTIONS</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }}>
              {[
                {
                  q: "Do I need an API key to use Buggy?",
                  a: "No API keys are required to use the skills in Claude Chat or Claude Code. You simply clone the repo or upload the skill ZIP.",
                },
                {
                  q: "Can I modify the skill prompts?",
                  a: "Yes. Buggy is 100% open-source under the MIT license. You can edit any SKILL.md to tailor it for specific target scopes or proprietary tools.",
                },
                {
                  q: "What makes Buggy different from generic AI security prompts?",
                  a: "Buggy skills are derived directly from 574+ disclosed HackerOne and Bugcrowd reports, including exact real-world bypass patterns and the mandatory 7-Question Gate.",
                },
              ].map((faq, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 22px" }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <MCFooter />
    </div>
  );
}
