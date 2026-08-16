import { cn } from "@/lib/utils";
import type { Env } from "@/content/skills";

const styles: Record<Env, string> = {
  chat: "bg-primary-light text-primary",
  both: "bg-secondary-light text-secondary-dark",
  code: "bg-[#fef3c7] text-[#92400e]",
};

const labels: Record<Env, string> = {
  chat: "Chat ✓",
  both: "Both ✓",
  code: "Limited ⚠",
};

interface PillProps {
  env: Env;
  className?: string;
}

export function Pill({ env, className }: PillProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium rounded-full px-2.5 py-0.5",
        styles[env],
        className
      )}
    >
      {labels[env]}
    </span>
  );
}
