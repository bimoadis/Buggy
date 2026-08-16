import React from "react";

interface DomainIconProps {
  slug: string;
  size?: number;
  color?: string;
  className?: string;
}

export function DomainIcon({
  slug,
  size = 22,
  color = "currentColor",
  className = "",
}: DomainIconProps) {
  switch (slug) {
    case "web-hunting":
      /* Web Hunting: Globe with Crosshair Attack Target */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <circle cx="12" cy="12" r="2.5" fill="var(--orange)" stroke="none" />
        </svg>
      );

    case "auth":
    case "auth-identity":
      /* Auth & Identity: Cryptographic Shield & Keyhole */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="10" r="2" />
          <path d="M12 12v3" stroke="var(--orange)" strokeWidth="2" />
        </svg>
      );

    case "api-infra":
      /* API & Infrastructure: Interconnected Server Gateway */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" stroke="var(--orange)" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" stroke="var(--orange)" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="10" y1="18" x2="18" y2="18" />
        </svg>
      );

    case "enterprise":
      /* Enterprise: Platform Architecture Fortress */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" stroke="var(--orange)" />
          <line x1="9" y1="13" x2="9.01" y2="13" strokeWidth="2" />
          <line x1="9" y1="17" x2="9.01" y2="17" strokeWidth="2" stroke="var(--orange)" />
        </svg>
      );

    case "red-team":
      /* Red Team: Crossed Breach Swords & Target */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2" />
          <circle cx="12" cy="12" r="3" fill="var(--orange)" stroke="none" />
        </svg>
      );

    case "recon":
    case "recon-osint":
      /* Recon & OSINT: Scanning Radar Sonar */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--orange)" strokeWidth="2" />
          <path d="M12 12l7-7" stroke="var(--orange)" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case "reporting":
      /* Reporting: Verified 7-Gate Dossier */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" stroke="var(--orange)" strokeWidth="2" />
        </svg>
      );

    case "specialized":
      /* Specialized: Blockchain Cyber Vault Lock */
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1.5" fill="var(--orange)" stroke="none" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
}
