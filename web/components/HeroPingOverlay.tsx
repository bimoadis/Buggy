"use client";
import { useEffect, useState } from "react";

const POSITIONS = [
  { x: "62%", y: "18%", delay: 0 },
  { x: "78%", y: "35%", delay: 0.9 },
  { x: "55%", y: "55%", delay: 1.8 },
  { x: "85%", y: "60%", delay: 0.5 },
  { x: "70%", y: "75%", delay: 2.3 },
  { x: "45%", y: "28%", delay: 1.4 },
  { x: "92%", y: "22%", delay: 2.7 },
  { x: "50%", y: "80%", delay: 0.2 },
];

export function HeroPingOverlay() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {POSITIONS.map((pos, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(0,49,255,0.55)" : "rgba(130,89,239,0.55)",
            animationDelay: `${pos.delay}s`,
          }}
          className="ping-dot"
        />
      ))}
    </div>
  );
}
