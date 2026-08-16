import { describe, it, expect } from "vitest";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const SKILLS_ROOT = join(import.meta.dirname, "..", "skills");
const DOMAINS = [
  "web-hunting",
  "auth-identity",
  "api-infra",
  "enterprise",
  "red-team",
  "recon-osint",
  "reporting",
  "specialized",
];

describe("skills directory", () => {
  it("contains all 8 domain folders", () => {
    const dirs = readdirSync(SKILLS_ROOT);
    for (const domain of DOMAINS) {
      expect(dirs).toContain(domain);
    }
  });

  it("every skill folder contains a SKILL.md", () => {
    for (const domain of DOMAINS) {
      const domainPath = join(SKILLS_ROOT, domain);
      const skills = readdirSync(domainPath);
      for (const skill of skills) {
        const skillMd = join(domainPath, skill, "SKILL.md");
        expect(existsSync(skillMd), `Missing SKILL.md in ${domain}/${skill}`).toBe(true);
      }
    }
  });

  it("total skill count is 51", () => {
    let total = 0;
    for (const domain of DOMAINS) {
      const domainPath = join(SKILLS_ROOT, domain);
      total += readdirSync(domainPath).length;
    }
    expect(total).toBe(51);
  });
});
