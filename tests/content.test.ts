import { describe, it, expect } from "vitest";
import { skills, getSkill, getSkillsByDomain } from "../web/content/skills";
import { domains, getDomain } from "../web/content/domains";
import { getDemoId } from "../web/content/demos";

describe("skills content", () => {
  it("exports exactly 51 skills", () => {
    expect(skills).toHaveLength(51);
  });

  it("every skill has required fields", () => {
    for (const s of skills) {
      expect(s.id, `${s.id} missing id`).toBeTruthy();
      expect(s.name, `${s.id} missing name`).toBeTruthy();
      expect(s.command, `${s.id} missing command`).toMatch(/^\//);
      expect(s.domain, `${s.id} missing domain`).toBeTruthy();
      expect(["chat", "code", "both"]).toContain(s.env);
      expect(s.description.length, `${s.id} description too short`).toBeGreaterThan(20);
    }
  });

  it("every skill id is unique", () => {
    const ids = skills.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every skill command is unique", () => {
    const cmds = skills.map((s) => s.command);
    const unique = new Set(cmds);
    expect(unique.size).toBe(cmds.length);
  });

  it("getSkill returns the correct skill", () => {
    const skill = getSkill("web-hunting/hunt-sqli");
    expect(skill).toBeDefined();
    expect(skill?.command).toBe("/hunt-sqli");
  });

  it("getSkill returns undefined for unknown id", () => {
    expect(getSkill("nonexistent/skill")).toBeUndefined();
  });

  it("getSkillsByDomain returns only skills from that domain", () => {
    const webSkills = getSkillsByDomain("web-hunting");
    expect(webSkills.length).toBeGreaterThan(0);
    expect(webSkills.every((s) => s.domain === "web-hunting")).toBe(true);
  });

  it("skill domain matches a known domain slug", () => {
    const domainSlugs = new Set(domains.map((d) => d.slug));
    for (const s of skills) {
      expect(domainSlugs.has(s.domain), `${s.id} has unknown domain: ${s.domain}`).toBe(true);
    }
  });
});

describe("domains content", () => {
  it("exports exactly 8 domains", () => {
    expect(domains).toHaveLength(8);
  });

  it("every domain has required fields", () => {
    for (const d of domains) {
      expect(d.slug).toBeTruthy();
      expect(d.title).toBeTruthy();
      expect(d.description.length).toBeGreaterThan(20);
      expect(d.skillCount).toBeGreaterThan(0);
    }
  });

  it("getDomain returns correct domain", () => {
    const d = getDomain("auth");
    expect(d).toBeDefined();
    expect(d?.title).toBe("Auth & Identity");
  });

  it("skill counts match actual skills per domain", () => {
    for (const domain of domains) {
      const actual = getSkillsByDomain(domain.slug).length;
      expect(actual, `${domain.slug} count mismatch`).toBe(domain.skillCount);
    }
  });
});

describe("demos content", () => {
  it("getDemoId returns null for PENDING entries", () => {
    expect(getDemoId("web-hunting/hunt-sqli")).toBeNull();
  });

  it("getDemoId returns null for unknown skill", () => {
    expect(getDemoId("nonexistent/skill")).toBeNull();
  });
});
