export const skillDemos: Record<string, string> = {
  "web-hunting/hunt-xss":                "V58X4GdRdAc",
  "web-hunting/hunt-csrf":               "x15zzN5wv6A",
  "auth/hunt-auth-bypass":               "x7QwiHyBjqI",
  "auth/hunt-mfa-bypass":               "Jlx70Yu7PMY",
  "api-infra/hunt-graphql":              "Iqsu0TJ1IDc",
  "api-infra/hunt-api-misconfig":        "KLDVbIPoXOg",
  "enterprise/cloud-iam-deep":           "rCVaLt6OHeE",
  "enterprise/hunt-sharepoint":          "RWacLoOR9q8",
  "red-team/redteam-mindset":            "stViMe2AItg",
  "red-team/supply-chain-attack-recon":  "-tBz99CzU9s",
  "recon/offensive-osint":               "yfYNJwgbz0s",
  "recon/hunt-subdomain":               "Lxl585bed9w",
  "reporting/triage-validation":         "WBVyUIN-Nt4",
  "reporting/report-writing":            "sKi-h9gRTJQ",
  "specialized/web3-audit":              "zJvHObaszPM",
  "specialized/meme-coin-audit":         "4ejjOlkBNJ0",
};

export function getDemoId(skillId: string): string | null {
  const id = skillDemos[skillId];
  return id ?? null;
}
