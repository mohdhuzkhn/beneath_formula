# Requirements to verification

| Requirement                                 | Phase | Planned implementation        | Evidence                                            |
| ------------------------------------------- | ----- | ----------------------------- | --------------------------------------------------- |
| Configurable identity, independent source   | 0–1   | lib/site.ts, Git              | build/config review                                 |
| Responsive navigation/themes/cards/TOC      | 2,4,5 | app, components               | Playwright/axe/screenshots                          |
| Orthogonal metadata and valid graph         | 3     | lib/schema.ts, lib/content.ts | unit invalid fixtures                               |
| Math/MDX/citations/publishing               | 4     | lib/mdx.tsx, content, scripts | compile and visibility tests                        |
| All navigation and truthful profile         | 5     | route templates, site config  | route crawl                                         |
| Published-only search, paths, relationships | 6     | search and graph services     | unit and E2E                                        |
| Video consent/fallback                      | 7     | Video component               | mocked E2E                                          |
| Correct accessible lab                      | 8     | math service and Lab          | analytic tests and browser controls                 |
| Inquiry/revisions/credible labels           | 9     | schema and detail template    | metadata tests                                      |
| SEO/privacy/security/performance            | 10    | metadata, headers, policies   | sitemap/axe/audit/baseline                          |
| End-to-end journeys and author workflow     | 11    | tests and docs                | recorded actual run                                 |
| CI/deployment/backup/recovery               | 1,12  | workflows and operations      | clean install/build/restore; live check conditional |
| Maintenance                                 | 13    | runbook and backlog           | operational readiness checklist                     |
