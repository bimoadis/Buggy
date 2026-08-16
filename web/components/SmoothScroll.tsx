"use client";
import { useEffect } from "react";

/* Returns true if `el` or any ancestor can scroll in the direction of `deltaY` */
function isInsideScrollable(el: Element, deltaY: number): boolean {
  let node: Element | null = el;
  while (node && node !== document.documentElement && node !== document.body) {
    const style = window.getComputedStyle(node);
    const oy = style.overflowY;
    if (oy === "auto" || oy === "scroll") {
      const canUp   = deltaY < 0 && node.scrollTop > 0;
      const canDown = deltaY > 0 && node.scrollTop < node.scrollHeight - node.clientHeight - 1;
      if (canUp || canDown) return true;
    }
    node = node.parentElement;
  }
  return false;
}

export const SCROLL_TO_EVENT = "buggy:scroll-to";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf: number;
    const LERP = 0.045;

    const onWheel = (e: WheelEvent) => {
      /* Pass wheel events through to scrollable child containers (e.g. chat modal) */
      if (e.target instanceof Element && isInsideScrollable(e.target, e.deltaY)) return;

      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 44;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      target += delta * 1.3;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    };

    const onScrollTo = (e: Event) => {
      const y = (e as CustomEvent<{ y: number }>).detail.y;
      target = Math.max(0, Math.min(y, document.body.scrollHeight - window.innerHeight));
    };

    const tick = () => {
      const actual = window.scrollY;
      if (Math.abs(actual - current) > 80) { target = actual; current = actual; }
      const diff = target - current;
      current += diff * LERP;
      if (Math.abs(diff) > 0.1) window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("buggy:scroll-to", onScrollTo);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("buggy:scroll-to", onScrollTo);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
