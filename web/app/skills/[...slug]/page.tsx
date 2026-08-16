import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import "@/app/mcptrade.css";
import { PromoBar } from "@/components/home/PromoBar";
import { MCNav } from "@/components/home/MCNav";
import { HunterTicker } from "@/components/home/HunterTicker";
import { MCFooter } from "@/components/home/MCFooter";
import { getSkill, getSkillsByDomain, skills } from "@/content/skills";
import { getDomain, domains } from "@/content/domains";
import { getDemoId } from "@/content/demos";
import { DemoVideo } from "@/components/DemoVideo";
import { AskBuggyModal } from "@/components/AskCbugModal";

/* Domain slug → filesystem folder name */
const DOMAIN_FOLDER: Record<string, string> = {
  "web-hunting": "web-hunting",
  "auth": "auth-identity",
  "api-infra": "api-infra",
  "enterprise": "enterprise",
  "red-team": "red-team",
  "recon": "recon-osint",
  "reporting": "reporting",
  "specialized": "specialized",
};

const BADGE_CLASS: Record<string, string> = {
  "web-hunting": "mc-badge-web",
  "auth": "mc-badge-auth",
  "api-infra": "mc-badge-api",
  "enterprise": "mc-badge-enterprise",
  "red-team": "mc-badge-red",
  "recon": "mc-badge-recon",
  "reporting": "mc-badge-reporting",
  "specialized": "mc-badge-specialized",
};

interface Props { params: { slug: string[] } }

export function generateStaticParams() {
  const domainPaths = domains.map((d) => ({ slug: [d.slug] }));
  const skillPaths = skills.map((s) => ({ slug: s.id.split("/") }));
  return [...domainPaths, ...skillPaths];
}

/* ── Domain listing ────────────────────────────────────────── */
function DomainPage({ domainSlug }: { domainSlug: string }) {
  const domain = getDomain(domainSlug);
  if (!domain) notFound();
  const domainSkills = getSkillsByDomain(domainSlug);
  const badgeClass = BADGE_CLASS[domainSlug] ?? "mc-badge-web";

  return (
    <div className="mc-page">
      <PromoBar />
      <MCNav />
      <HunterTicker />

      <section className="mc-skills-hero">
        <div className="mc-eyebrow">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/skills" style={{ color: "inherit", textDecoration: "none" }}>SKILLS</Link>
            <span>/</span>
            <span style={{ color: "var(--mc-text)" }}>{domainSlug.toUpperCase()}</span>
          </div>
          <span className="explore">&gt; {domainSkills.length} SKILLS ACTIVE</span>
        </div>

        <h1 className="mc-page-title">
          {domain.title} <span className="hl">SECURITY DOMAIN</span>
        </h1>
        <p className="mc-page-desc">{domain.description}</p>

        <div className="mc-meta-row mc-mono">
          <div>
            <b>{domainSkills.length}</b> <span className="dim">SKILLS IN DOMAIN</span>
          </div>
          <div>
            <b>{domain.icon}</b> <span className="dim">CATEGORY</span>
          </div>
          <div>
            <Link href="/skills" style={{ color: "var(--orange)", textDecoration: "underline" }}>
              ← All 8 Domains
            </Link>
          </div>
        </div>
      </section>

      {/* Domain Skills Grid */}
      <section className="mc-skills-grid">
        {domainSkills.map((skill) => (
          <div key={skill.id} className="mc-skill-card">
            <div className="mc-skill-card-head">
              <div className="mc-skill-name">{skill.command}</div>
              <span className={`mc-badge ${badgeClass}`}>{domain.title}</span>
            </div>

            <div className="mc-skill-desc">
              <strong style={{ color: "var(--mc-text)", display: "block", marginBottom: 2 }}>
                {skill.name}
              </strong>
              {skill.description.slice(0, 105)}...
            </div>

            <div className="mc-code-box">
              <span className="mc-tok-kw">claude</span> <span className="mc-tok-str">&quot;{skill.command} https://target.com&quot;</span>
              {"\n"}<span className="mc-tok-fn">→ trigger:</span> <span className="mc-tok-num">auto-loaded</span>
            </div>

            <div className="mc-skill-foot">
              <div className="mc-skill-tags">
                <span className={`mc-env-pill ${skill.env}`}>
                  {skill.env === "both" ? "Both ✓" : skill.env === "chat" ? "Chat ✓" : "Code ✓"}
                </span>
                {skill.reportCount && (
                  <span className="mc-mono">{skill.reportCount} reports</span>
                )}
              </div>
              <div className="mc-skill-actions">
                <Link href={`/skills/${skill.id}`} className="copy">
                  VIEW SKILL →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <MCFooter />
    </div>
  );
}

/* ── Skill detail ──────────────────────────────────────────── */
function SkillDetailPage({ skillId }: { skillId: string }) {
  const skill = getSkill(skillId);
  if (!skill) notFound();

  const domain = getDomain(skill.domain);
  const demoId = getDemoId(skillId);
  const badgeClass = BADGE_CLASS[skill.domain] ?? "mc-badge-web";

  /* Read SKILL.md from disk */
  let frontmatter: Record<string, unknown> = {};
  let bodyContent = "";
  const folderName = DOMAIN_FOLDER[skill.domain] ?? skill.domain;
  const skillName = skill.folderPath.split("/").pop() ?? "";
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "..", "skills", folderName, skillName, "SKILL.md"),
      "utf-8"
    );
    const parsed = matter(raw);
    frontmatter = parsed.data as Record<string, unknown>;
    bodyContent = parsed.content;
  } catch {
    bodyContent = skill.description;
  }

  /* Parse sources */
  const sources: string[] = typeof frontmatter.sources === "string"
    ? frontmatter.sources.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  /* Split body into ## sections */
  const sections: { heading: string; body: string }[] = [];
  let curH = "";
  let curB: string[] = [];
  for (const line of bodyContent.split("\n")) {
    if (line.startsWith("## ")) {
      if (curH || curB.some((l) => l.trim())) sections.push({ heading: curH, body: curB.join("\n").trim() });
      curH = line.replace(/^##\s+/, "");
      curB = [];
    } else {
      curB.push(line);
    }
  }
  if (curH || curB.some((l) => l.trim())) sections.push({ heading: curH, body: curB.join("\n").trim() });

  return (
    <div className="mc-page">
      <PromoBar />
      <MCNav />
      <HunterTicker />

      {/* Header Banner */}
      <section className="mc-skills-hero" style={{ paddingBottom: 24, borderBottom: "1px solid var(--mc-border)", background: "#fff" }}>
        <div className="mc-eyebrow">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/skills" style={{ color: "inherit", textDecoration: "none" }}>SKILLS</Link>
            <span>/</span>
            <Link href={`/skills/${skill.domain}`} style={{ color: "inherit", textDecoration: "none" }}>
              {skill.domain.toUpperCase()}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--mc-text)" }}>{skillName}</span>
          </div>
          <span className="explore">&gt; 7-QUESTION GATE READY</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <span className="mc-cmd-pill" style={{ fontSize: 13, padding: "5px 12px" }}>
            {skill.command}
          </span>
          <span className={`mc-badge ${badgeClass}`}>
            {domain?.title ?? skill.domain}
          </span>
          <span className={`mc-env-pill ${skill.env}`}>
            {skill.env === "both" ? "Both ✓" : skill.env === "chat" ? "Chat ✓" : "Code ✓"}
          </span>
          {skill.reportCount && (
            <span className="mc-mono" style={{ fontSize: 11, color: "var(--mc-text2)", background: "#f0f0ee", padding: "3px 8px", borderRadius: 4 }}>
              {skill.reportCount} disclosed reports
            </span>
          )}
        </div>

        <h1 className="mc-page-title" style={{ fontSize: "clamp(26px, 3.8vw, 38px)" }}>
          {skill.name}
        </h1>
        <p className="mc-page-desc" style={{ maxWidth: 740 }}>
          {skill.description}
        </p>
      </section>

      {/* 2-Column Content: Main Document + Dense Sidebar */}
      <div className="mc-docs-layout" style={{ gridTemplateColumns: "1fr 280px", padding: "36px 28px 80px", maxWidth: 1280, gap: 32 }}>
        {/* Main Content */}
        <div style={{ minWidth: 0 }}>
          {demoId && (
            <div style={{ marginBottom: 32 }}>
              <DemoVideo videoId={demoId} title={`${skill.name} demo`} />
            </div>
          )}

          {/* Quick Terminal Runner Box */}
          <div className="mc-term-box" style={{ margin: "0 0 28px" }}>
            <span className="lbl"># Run this skill in Claude Code:</span>
            {"\n"}<span className="kw">claude</span> <span className="str">&quot;{skill.command} https://target.com&quot;</span>
            {"\n\n"}<span className="lbl"># Or trigger via context in Claude Chat:</span>
            {"\n"}<span className="mut">&gt; Upload skill ZIP to claude.ai/customize/skills</span>
          </div>

          {/* Render Sections from SKILL.md */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {sections.map((sec, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--mc-border)", paddingBottom: 28 }}>
                {sec.heading && (
                  <h3 className="mc-mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 12 }}>
                    [ {sec.heading} ]
                  </h3>
                )}
                <div
                  className="mc-skill-body"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(sec.body) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dense Sidebar */}
        <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Metadata Card */}
          <div style={{ background: "#fff", border: "1px solid var(--mc-border)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--mc-border)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mc-text3)", fontWeight: 700 }}>
              Skill Specifications
            </div>
            <div style={{ padding: "6px 0" }}>
              {[
                { label: "Command", value: skill.command, mono: true },
                { label: "Domain", value: domain?.title ?? skill.domain, mono: false },
                { label: "Env", value: skill.env === "both" ? "Chat + Code" : skill.env, mono: true },
                { label: "Reports", value: skill.reportCount ? `${skill.reportCount} patterns` : "Disclosed", mono: true },
                { label: "License", value: "MIT Open Source", mono: true },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid #f4f4f2", fontSize: 12 }}>
                  <span className="mc-mono" style={{ color: "var(--mc-text3)", fontSize: 11 }}>{row.label}</span>
                  <span style={{ fontFamily: row.mono ? "var(--font-mono)" : "inherit", fontWeight: 600, color: "var(--mc-text)" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ask Buggy AI Modal */}
          <AskBuggyModal
            skillName={skill.name}
            skillCommand={skill.command}
            domain={domain?.title ?? skill.domain}
            description={skill.description}
          />

          {/* Sources List */}
          {sources.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid var(--mc-border)", borderRadius: 8, padding: 14 }}>
              <div className="mc-mono" style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mc-text3)", fontWeight: 700, marginBottom: 8 }}>
                Disclosed Sources ({sources.length})
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {sources.map((s) => (
                  <span key={s} className="mc-mono" style={{ fontSize: 10, background: "var(--mc-bg)", border: "1px solid var(--mc-border)", padding: "2px 7px", borderRadius: 4, color: "var(--mc-text2)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Direct GitHub Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a
              href={`https://github.com/bimoadis/Buggy/tree/main/skills/${folderName}/${skillName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mc-btn mc-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              DOWNLOAD SKILL ZIP →
            </a>
            <Link
              href={`/skills/${skill.domain}`}
              className="mc-btn mc-btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              ← More {domain?.title} Skills
            </Link>
          </div>
        </div>
      </div>

      <MCFooter />
    </div>
  );
}

/* Two-pass markdown→HTML */
function markdownToHtml(md: string): string {
  const ph: string[] = [];

  /* Code blocks */
  let text = md.replace(/```([\w-]*)\n?([\s\S]*?)```/g, (_m, lang: string, code: string) => {
    const escaped = code
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const langBadge = lang
      ? `<span style="font-family:var(--font-mono);font-size:9px;color:#a1a1aa;text-transform:uppercase;display:block;margin-bottom:4px;">${lang}</span>` : "";
    const id = ph.length;
    ph.push(`<div class="mc-term-box">${langBadge}<pre><code>${escaped.trimEnd()}</code></pre></div>`);
    return `\x02${id}\x03`;
  });

  /* Inline code */
  text = text.replace(/`([^`\n]+)`/g, (_m, c: string) => {
    const id = ph.length;
    ph.push(`<code class="mc-mono" style="background:#f1f1ef;border:1px solid var(--mc-border);padding:1px 5px;border-radius:4px;font-size:12px;color:var(--orange);">${c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code>`);
    return `\x02${id}\x03`;
  });

  text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* Tables */
  text = text.replace(
    /(?:^|\n)(\|[^\n]+\|)\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)*)/gm,
    (_match, headerLine: string, bodyLines: string) => {
      const headers = headerLine.split("|").map((h: string) => h.trim()).filter(Boolean);
      const rows = bodyLines.trim().split("\n").map((row: string) =>
        row.split("|").map((c: string) => c.trim()).filter(Boolean)
      ).filter((r: string[]) => r.length > 0);
      const thead = `<thead><tr>${headers.map((h: string) => `<th>${h}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`;
      return `<table class="mc-doc-table">${thead}${tbody}</table>`;
    }
  );

  text = text
    .replace(/\*\*\*([^*\n]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/^#{4} (.+)$/gm, "<h4 class='mc-doc-h2' style='font-size:15px;'>$1</h4>")
    .replace(/^#{3} (.+)$/gm, "<h3 class='mc-doc-h2' style='font-size:17px;'>$1</h3>")
    .replace(/^---$/gm, "<hr style='border:none;border-top:1px solid var(--mc-border);margin:20px 0;'>")
    .replace(/^[-*] (.+)$/gm, "<li style='margin-bottom:6px;'>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li style='margin-bottom:6px;'>$1</li>")
    .replace(/(?:<li style='margin-bottom:6px;'>.*\n?)+/g, (m) => `<ul style='padding-left:20px;margin-bottom:14px;color:var(--mc-text2);font-size:13.5px;'>${m}</ul>`)
    .replace(/<\/ul>\s*<ul>/g, "");

  text = text.replace(/\x02(\d+)\x03/g, (_m, i) => ph[Number(i)] ?? "");

  text = text
    .split(/\n{2,}/)
    .map((b) => {
      const t = b.trim();
      if (!t) return "";
      if (/^<(pre|ul|ol|h[1-6]|hr|div|table|blockquote)/.test(t)) return t;
      return `<p class="mc-doc-p">${t.replace(/\n/g, " ")}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  return text;
}

/* ── Route dispatcher ──────────────────────────────────────── */
export default function SkillsRouter({ params }: Props) {
  const { slug } = params;
  if (slug.length === 1) return <DomainPage domainSlug={slug[0]} />;
  return <SkillDetailPage skillId={slug.join("/")} />;
}
