import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "bg-secondary-light text-secondary-dark text-xs font-medium rounded-full px-2.5 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
}
