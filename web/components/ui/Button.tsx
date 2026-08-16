import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className,
  external,
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    ghost: "border border-white/20 text-white hover:border-white/50",
    outline: "border border-border text-text hover:border-primary hover:text-primary",
  };
  const cls = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
