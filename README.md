# Beneath the Formula

Independent mathematics exploration platform. Node 24 and npm are required.

Run `npm ci`, `npm run dev`; open http://localhost:3000. Run `npm run lint`, `npm run typecheck`, `npm run build` for the foundation gates. See docs/product for scope, architecture decisions and phase acceptance criteria.

No production account or secrets are required for local rendering. All demonstration material requires owner editorial review before public launch.

## Working features

Git-backed JSON-frontmatter MDX, strict taxonomy and relationship validation, KaTeX equations, semantic teaching components, TOC/anchors/citations, static content pages, search and URL filters, subject/level discovery, ordered paths, inquiry provenance/revisions, a consent-based YouTube adapter, a numerically tested secant-to-tangent lab, and optional privacy-aware engagement counts. No accounts, email collection, or third-party analytics.

## Commands

| Command                                  | Purpose                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`                            | Local development on port 3000                                                 |
| `npm run ci`                             | Format, lint, types, content, tests, secret scan and production build          |
| `npm run test:e2e`                       | Browser journeys, axe accessibility, responsive screenshots and link crawl     |
| `npm run test:performance`               | Three mobile Lighthouse runs per representative route against a running server |
| `npm run content:new -- concept my-slug` | Create a new draft without overwriting an existing file                        |
| `npm run content:validate`               | Schemas, graph, internal links/anchors and math validation                     |
| `npm run search:build`                   | Inspect the generated index and synthetic scaling benchmark                    |
| `npm run release:check`                  | Verify public-release configuration and actual owner-review flags              |
| `npm run build:deployment`               | Vercel build with production-only release gate                                 |
| `npm run smoke`                          | Smoke a configured TEST_BASE_URL, including draft exclusion                    |
| `npm run db:migrate`                     | Create optional PostgreSQL engagement tables after DATABASE_URL is configured  |

Local browser tests use installed Chrome on Windows; CI installs Playwright Chromium. Adjust playwright.config.ts executablePath if Chrome is elsewhere. A Windows process sandbox may require permission to launch Next's CSS workers or browsers; a normal local terminal does not have that sandbox restriction.

Read [Publishing](docs/editorial/PUBLISHING.md), [Deployment](docs/operations/DEPLOYMENT.md), [Operations](docs/operations/RUNBOOK.md), [Security](docs/operations/SECURITY.md), [Progress](docs/PROGRESS.md) and [Scope](docs/product/SCOPE.md). Supplied source documents are preserved in docs/reference; the supplied Master Plan identifies itself as v1.0 despite the request mentioning v1.1. Direct user authorization supersedes their phase-approval pauses.

For persistent view and follower counts, configure `DATABASE_URL` and a high-entropy `ENGAGEMENT_SECRET`, then run `npm run db:migrate`. The feature is intentionally unavailable until both are present. Public release needs a verified HTTPS canonical domain, professional contact, hosting setup/privacy details and author editorial/brand review. A real lecture needs an author-approved YouTube ID; no fake ID is published. A CV and credentials are optional and absent until supplied.
"# beneath_formula"
