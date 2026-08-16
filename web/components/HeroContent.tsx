"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, stagger, EASE } from "@/lib/motion";
import { ArrowRight } from "@/components/icons";

export function HeroContent() {
  return (
    <div style={{ position: "relative", zIndex: 3, maxWidth: 600, flexShrink: 0 }}>

      {/* Ghost background glyph — "bug" in mono, zooms from 110% → 100% */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-8%",
          top: "42%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: -1,
          userSelect: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(72px, 16vw, 190px)",
          color: "rgba(90,133,255,0.032)",
          lineHeight: 1,
          display: "block",
          letterSpacing: "-0.06em",
          fontWeight: 800,
        }}>
          bug
        </span>
      </motion.div>

      {/* Stagger container — fires immediately on mount */}
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          51 skills · 15 commands · 574+ H1 patterns
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.05em",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "var(--text)", display: "block" }}>Turn Claude into </span>
          <span style={{ color: "var(--text-fade)", display: "block" }}>Bug hunter</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 16,
            color: "rgba(240,240,255,0.40)",
            maxWidth: 440,
            lineHeight: 1.68,
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          51 specialized skills built from real bug bounty disclosures. Auto-load by context.
          7-Question Gate before every submission.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          <Link
            href="/skills"
            style={{
              background: "var(--accent)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 7,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Browse all skills
          </Link>
          <a
            href="https://github.com/x-cookie/cbughunter-k1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(240,240,255,0.45)",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
            }}
          >
            View on GitHub
            <ArrowRight />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
