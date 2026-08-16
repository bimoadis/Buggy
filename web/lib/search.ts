import type { Skill } from "@/content/skills";
import type { Domain } from "@/content/domains";

export interface SearchResult {
  type: "skill" | "domain";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score: number;
}

/* Score a string against a query — higher = better match */
function scoreMatch(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  // Word-level match
  const words = q.split(/\s+/);
  const matched = words.filter((w) => t.includes(w)).length;
  return (matched / words.length) * 40;
}

export function searchSkills(skills: Skill[], query: string): SearchResult[] {
  if (!query.trim()) return [];
  return skills
    .map((s): SearchResult & { score: number } => {
      const nameScore = scoreMatch(s.name, query);
      const cmdScore  = scoreMatch(s.command, query) * 0.9;
      const descScore = scoreMatch(s.description, query) * 0.5;
      const score     = Math.max(nameScore, cmdScore, descScore);
      return {
        type: "skill",
        id: s.id,
        title: s.name,
        subtitle: s.command,
        href: `/skills/${s.id}`,
        score,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function searchDomains(domains: Domain[], query: string): SearchResult[] {
  if (!query.trim()) return [];
  return domains
    .map((d): SearchResult => ({
      type: "domain",
      id: d.slug,
      title: d.title,
      subtitle: `${d.skillCount} skills`,
      href: `/skills/${d.slug}`,
      score: Math.max(scoreMatch(d.title, query), scoreMatch(d.description, query) * 0.5),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function search(skills: Skill[], domains: Domain[], query: string): SearchResult[] {
  const skillResults  = searchSkills(skills, query);
  const domainResults = searchDomains(domains, query);
  return [...domainResults, ...skillResults].slice(0, 10);
}
