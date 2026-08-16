"use client";

import { useEffect, useRef, useState } from "react";

interface DemoVideoProps {
  videoId: string;
  title: string;
}

export function DemoVideo({ videoId, title }: DemoVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden bg-hero-bg aspect-video">
      {visible && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      )}
    </div>
  );
}
