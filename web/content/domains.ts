export interface Domain {
  slug: string;
  title: string;
  description: string;
  skillCount: number;
  icon: string;
  color: string;
}

export const domains: Domain[] = [
  {
    slug: "web-hunting",
    title: "Web Hunting",
    description: "Deep-dive skills for SQL injection, XSS, SSRF, RCE, business logic, and 15+ other web vulnerability classes — each built from real bug bounty reports.",
    skillCount: 22,
    icon: "🌐",
    color: "#0031FF",
  },
  {
    slug: "auth",
    title: "Auth & Identity",
    description: "OAuth 2.0 flows, JWT attacks, ATO chains, SAML bypasses, and MFA bypass techniques drawn from 19–40 disclosed reports each.",
    skillCount: 5,
    icon: "🔐",
    color: "#8259EF",
  },
  {
    slug: "api-infra",
    title: "API & Infrastructure",
    description: "Mass assignment, JWT/CORS flaws, GraphQL introspection, prototype pollution, cloud misconfiguration, and NTLM leak patterns.",
    skillCount: 4,
    icon: "⚙️",
    color: "#0031FF",
  },
  {
    slug: "enterprise",
    title: "Enterprise Platforms",
    description: "Attack chains for M365/Entra, Okta, VMware vCenter, SharePoint, IAM privilege escalation, and enterprise VPN lateral movement.",
    skillCount: 6,
    icon: "🏢",
    color: "#8259EF",
  },
  {
    slug: "red-team",
    title: "Red Team",
    description: "Full APK red-team pipeline, supply chain recon, IR detection evasion patterns, and red-team mindset for external engagements.",
    skillCount: 4,
    icon: "🎯",
    color: "#dc2626",
  },
  {
    slug: "recon",
    title: "Recon & OSINT",
    description: "5-stage recon pipeline, asset-graph methodology, subdomain enumeration, identity-fabric mapping, and crypto tracing.",
    skillCount: 3,
    icon: "🔍",
    color: "#0031FF",
  },
  {
    slug: "reporting",
    title: "Reporting & Hygiene",
    description: "7-Question Gate, report templates for H1/Bugcrowd/Intigriti/Immunefi, CVSS 3.1 scoring, evidence hygiene, and N/A-ratio reduction.",
    skillCount: 5,
    icon: "📋",
    color: "#16a34a",
  },
  {
    slug: "specialized",
    title: "Specialized",
    description: "Solidity/Rust smart contract audits for DeFi protocols and meme-coin rug-pull pattern detection for Web3 bug bounty.",
    skillCount: 2,
    icon: "⛓️",
    color: "#8259EF",
  },
];

export function getDomain(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}
