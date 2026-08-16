"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Pre-calculated intro star positions */
const INTRO_STARS = [
  [12,8],[25,22],[42,6],[58,18],[74,30],[88,12],[102,25],[118,8],
  [15,42],[32,55],[50,38],[66,52],[82,44],[98,58],[112,42],[128,30],
  [8,65],[22,78],[38,62],[55,75],[70,68],[85,82],[100,72],[115,62],[130,78],
  [18,90],[35,105],[52,92],[68,108],[84,95],[100,110],[118,88],[135,102],
  [5,118],[20,130],[38,122],[55,135],[72,118],[90,130],[108,115],[125,128],
  [10,145],[28,155],[45,142],[62,158],[80,145],[96,158],[112,140],[130,152],
] as [number, number][];

const RINGS = [220, 320, 440, 580, 740];

export function GalaxyIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = sessionStorage.getItem("buggy-intro-done");
    if (!done) {
      setVisible(true);
      // Mark after the animation completes
      const t = setTimeout(() => {
        sessionStorage.setItem("buggy-intro-done", "1");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: "easeInOut" }}
          onAnimationComplete={() => setVisible(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--hero)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Expanding rings */}
          {RINGS.map((size, i) => (
            <motion.div
              key={size}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: size, height: size, opacity: 0 }}
              transition={{ duration: 1.8, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: `1px solid ${i % 2 === 0 ? "rgba(90,133,255,0.4)" : "rgba(154,114,240,0.3)"}`,
              }}
            />
          ))}

          {/* Star field fading in */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 140 160"
            preserveAspectRatio="xMidYMid slice"
          >
            {INTRO_STARS.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x} cy={y} r={0.6 + (i % 3) * 0.3}
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 + (i % 5) * 0.12 }}
                transition={{ duration: 0.6, delay: 0.04 * i, ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* BUGGY wordmark */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.18em" }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--accent)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Bug Hunter & Security Toolkit
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(52px, 8vw, 88px)",
                fontWeight: 800,
                letterSpacing: "-0.06em",
                lineHeight: 1,
                color: "var(--text)",
                margin: 0,
              }}
            >
              buggy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                marginTop: 8,
              }}
            >
              51 skills · 574+ H1 patterns
            </motion.p>
          </div>

          {/* Nebula glow behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(90,133,255,0.6) 0%, rgba(154,114,240,0.3) 40%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
