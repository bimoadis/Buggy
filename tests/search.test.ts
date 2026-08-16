import { describe, it, expect } from "vitest";
import { searchSkills, searchDomains, search } from "../web/lib/search";
import { skills } from "../web/content/skills";
import { domains } from "../web/content/domains";

describe("searchSkills", () => {
  it("returns empty array for empty query", () => {
    expect(searchSkills(skills, "")).toHaveLength(0);
  });

  it("finds hunt-sqli by command", () => {
    const results = searchSkills(skills, "/hunt-sqli");
    expect(results[0]?.id).toBe("web-hunting/hunt-sqli");
  });

  it("finds skills by name", () => {
    const results = searchSkills(skills, "OAuth Hunter");
    expect(results[0]?.id).toBe("auth/hunt-oauth");
  });

  it("returns at most 8 results", () => {
    expect(searchSkills(skills, "hunt")).toHaveLength(8);
  });

  it("results are sorted by score descending", () => {
    const results = searchSkills(skills, "sqli");
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });
});

describe("searchDomains", () => {
  it("returns empty for blank query", () => {
    expect(searchDomains(domains, "  ")).toHaveLength(0);
  });

  it("finds web-hunting domain", () => {
    const results = searchDomains(domains, "Web Hunting");
    expect(results[0]?.id).toBe("web-hunting");
  });
});

describe("combined search", () => {
  it("returns both domains and skills", () => {
    const results = search(skills, domains, "xss");
    const types = new Set(results.map((r) => r.type));
    expect(types.size).toBeGreaterThan(0);
  });

  it("returns max 10 results", () => {
    expect(search(skills, domains, "hunt")).toHaveLength(10);
  });
});
