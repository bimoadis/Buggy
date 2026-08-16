interface IconProps { size?: number; color?: string; strokeWidth?: number; }

const I = ({ size = 22, color = "currentColor", strokeWidth = 1.5, children }: IconProps & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const BugIcon = (p: IconProps) => (
  <I {...p}>
    <path d="M12 18c-3.314 0-6-2.686-6-6V9a6 6 0 1 1 12 0v3c0 3.314-2.686 6-6 6Z" />
    <path d="M6 9H3M21 9h-3M6 13H2M22 13h-4M8 18.5 6 21M16 18.5l2 2.5M12 18v3" />
    <circle cx="9.5" cy="9.5" r="1" fill={p.color ?? "currentColor"} stroke="none" />
    <circle cx="14.5" cy="9.5" r="1" fill={p.color ?? "currentColor"} stroke="none" />
  </I>
);

export const CrosshairIcon = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2.5" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
  </I>
);

export const LockIcon = (p: IconProps) => (
  <I {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1.5" fill={p.color ?? "currentColor"} stroke="none" />
    <line x1="12" y1="17.5" x2="12" y2="19" />
  </I>
);

export const NetworkIcon = (p: IconProps) => (
  <I {...p}>
    <rect x="2" y="9" width="5" height="4" rx="1" />
    <rect x="17" y="4" width="5" height="4" rx="1" />
    <rect x="17" y="16" width="5" height="4" rx="1" />
    <path d="M7 11h4.5M14.5 6h-4M7 13l3.5 5h4" strokeWidth="1.3" />
    <circle cx="12" cy="11" r="1.5" />
  </I>
);

export const BuildingIcon = (p: IconProps) => (
  <I {...p}>
    <rect x="3" y="4" width="5" height="17" rx="1" />
    <rect x="10" y="1" width="5" height="20" rx="1" />
    <rect x="17" y="7" width="5" height="14" rx="1" />
    <line x1="5" y1="9" x2="5" y2="9" strokeWidth="2" />
    <line x1="12" y1="6" x2="12" y2="6" strokeWidth="2" />
    <line x1="12" y1="11" x2="12" y2="11" strokeWidth="2" />
    <line x1="19" y1="12" x2="19" y2="12" strokeWidth="2" />
  </I>
);

export const TargetIcon = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    <path d="m16 8 3-3M5 19l3-3M16 16l3 3M5 5l3 3" strokeWidth="1.2" opacity="0.5" />
  </I>
);

export const EyeIcon = (p: IconProps) => (
  <I {...p}>
    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="1" fill={p.color ?? "currentColor"} stroke="none" />
    <path d="M15 9.5a4 4 0 0 1 0 5" opacity="0.4" />
  </I>
);

export const FileCheckIcon = (p: IconProps) => (
  <I {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <polyline points="14 2 14 8 20 8" />
    <polyline points="9 15 11 17 15 13" />
    <line x1="8" y1="11" x2="16" y2="11" />
  </I>
);

export const ChainIcon = (p: IconProps) => (
  <I {...p}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </I>
);

export const TerminalIcon = (p: IconProps) => (
  <I {...p}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </I>
);

export const ShieldIcon = (p: IconProps) => (
  <I {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <polyline points="9 12 11 14 15 10" />
  </I>
);

export const ArrowRight = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size - 1} viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.92007 0C6.00007 0 6.06674 0.0266667 6.12007 0.08L9.25341 3.34667C9.25341 3.34667 9.33341 3.48 9.33341 3.56V4.69333C9.33341 4.77333 9.30674 4.84 9.25341 4.90667L6.18674 8.09333C6.18674 8.09333 6.06674 8.17333 5.98674 8.17333H5.29341C5.04007 8.17333 4.92007 7.85333 5.09341 7.66667L7.98674 4.66667H0.320072C7.22607e-05 4.66667 -0.119928 4.24 0.146739 4.06667L0.880072 3.56C0.880072 3.56 1.00007 3.50667 1.05341 3.50667H7.90674L5.02674 0.506667C4.85341 0.32 4.97341 0 5.22674 0H5.92007Z" fill="currentColor" />
  </svg>
);
