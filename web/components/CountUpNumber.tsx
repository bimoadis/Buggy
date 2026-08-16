"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            /* Ease-out quart for slick deceleration */
            const eased = 1 - Math.pow(1 - progress, 4);
            const val = Math.floor(eased * target);
            setCount(val);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
