"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SCROLL_TO_EVENT } from "@/components/SmoothScroll";

const NAV_H = 68;

interface Section {
  slug: string;
  title: string;
  label: string;
  group: string;
}

const GROUPS = ["Getting started", "Usage", "Quality", "Support"];

export function DocsSidebar({ sections, inline }: { sections: Section[]; inline?: boolean }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.slug ?? "");

  /* Scrollspy — highlights section currently in view */
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.slug))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: `-${NAV_H + 16}px 0px -60% 0px`, threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_H - 24;
    window.dispatchEvent(new CustomEvent(SCROLL_TO_EVENT, { detail: { y } }));
    setActiveId(slug);
  };

  /* Inline mode: plain nav block for embedding inside a grid column */
  if (inline) {
    return (
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10, paddingLeft: 10 }}>
          On this page
        </div>
        {sections.map((page) => {
          const active = page.slug === activeId;
          return (
            <button key={page.slug} onClick={() => scrollTo(page.slug)}
              className="docs-nav-link"
              style={{
                display: "block", width: "100%", textAlign: "left", background: "transparent",
                border: "none", borderLeft: `2px solid ${active ? "var(--accent)" : "transparent"}`,
                padding: "6px 10px", cursor: "pointer", borderRadius: "0 6px 6px 0",
                fontFamily: "var(--font-sans)", fontSize: 12,
                color: active ? "var(--text)" : "rgba(240,240,255,0.35)",
                fontWeight: active ? 500 : 400, transition: "color 0.15s, border-color 0.15s",
              }}>
              {page.title}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      borderRight: "1px solid var(--b0)",
      background: "var(--hero)",
      position: "sticky",
      top: NAV_H,
      height: `calc(100vh - ${NAV_H}px)`,
      overflowY: "auto",
    }}>
      <div style={{ padding: "28px 0 16px" }}>
        <div style={{
          padding: "0 24px 16px",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>
          Documentation
        </div>

        {GROUPS.map((group) => {
          const pages = sections.filter((s) => s.group === group);
          return (
            <div key={group} style={{ marginBottom: 4 }}>
              <div style={{
                padding: "4px 24px",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,240,255,0.16)",
              }}>
                {group}
              </div>
              {pages.map((page) => {
                const active = page.slug === activeId;
                return (
                  <button
                    key={page.slug}
                    onClick={() => scrollTo(page.slug)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 24px 10px 22px",
                      textDecoration: "none",
                      textAlign: "left",
                      background: active ? "rgba(90,133,255,0.09)" : "transparent",
                      border: "none",
                      borderLeft: `2px solid ${active ? "var(--accent)" : "transparent"}`,
                      cursor: "pointer",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    <div style={{
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      color: active ? "var(--text)" : "rgba(240,240,255,0.40)",
                      lineHeight: 1.25,
                      marginBottom: 2,
                      transition: "color 0.2s, font-weight 0.15s",
                      fontFamily: "var(--font-sans)",
                    }}>
                      {page.title}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: active ? "var(--accent)" : "rgba(240,240,255,0.18)",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                    }}>
                      {page.label}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ margin: "8px 24px", borderTop: "1px solid var(--b0)" }} />
      <div style={{ padding: "14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href="https://github.com/x-cookie/cbughunter-k1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(240,240,255,0.22)", textDecoration: "none", letterSpacing: "0.04em" }}
        >
          GitHub →
        </a>
        <Link
          href="/skills"
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(240,240,255,0.22)", textDecoration: "none", letterSpacing: "0.04em" }}
        >
          All skills →
        </Link>
      </div>
    </aside>
  );
}
