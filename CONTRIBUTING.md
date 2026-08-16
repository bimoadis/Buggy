# Contributing to buggy

buggy is an open-source collection of Claude AI skills for bug bounty and security research. Contributions are welcome.

## What you can contribute

- **New skills** — SKILL.md files for additional vulnerability classes or attack techniques
- **Skill improvements** — Updated patterns from newly disclosed bug bounty reports
- **Web app** — UI improvements, new sections, or bug fixes in `web/`
- **Documentation** — Clearer install guides, usage examples, or FAQ answers
- **Tests** — Additional test coverage in `tests/`

## Skill format

Each skill lives in `skills/{domain}/{skill-name}/SKILL.md`. The file must contain:

```markdown
---
name: hunt-example
description: "Brief description of what the skill hunts for."
sources: hackerone_public, github
report_count: 12
---

## Crown Jewel Targets
...
```

Rules:
- One `SKILL.md` per folder — never more
- Domain must be one of: `web-hunting`, `auth-identity`, `api-infra`, `enterprise`, `red-team`, `recon-osint`, `reporting`, `specialized`
- `description` must be a single sentence, under 200 characters
- `report_count` must be the number of real disclosed reports the skill was built from

## Development setup

```bash
# Install dependencies
cd web && npm install

# Start dev server
npm run dev          # http://localhost:3000

# Type check
npm run typecheck

# Run tests
cd ../tests && npm install && npm test
```

## Commit conventions

All commits must follow conventional format:

```
feat(domain): short description
fix(component): what was broken
docs(skill): what was documented
chore: maintenance task
```

No `Co-Authored-By` lines. No references to AI tools in commit messages.

## Pull request checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] Tests pass (`npm test` in `tests/`)
- [ ] New skills include real CVE or HackerOne report references
- [ ] Commit messages follow conventional format

## License

By contributing, you agree your contributions are licensed under MIT.
