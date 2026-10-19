# Execution ledger

Phase 0: source documents read completely (supplied master identifies v1.0). Reference inspected read-only. P0 mapped to phase owners and acceptance tests. Decisions and risks recorded. Proceed under user's explicit authorization, without phase approval pauses.

External blockers currently known: updated v1.1 absent; approved YouTube ID, contact address, canonical domain, deployment account, verified CV and editorial signoff absent. Continue engineering with explicit unavailable states.

## Implemented milestones

| Phase | Commit  | Actual evidence and outcome                                                                                                                                                                                         |
| ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | ac5f62d | Read both supplied files; reference README/package/content model inspected without mutation; PRD, ADRs and traceability created.                                                                                    |
| 1     | 91821cb | Locked Next/React/TS toolchain; initial lint/type/unit/build passed after fixing link lint and sandbox worker access.                                                                                               |
| 2     | 4be9786 | Responsive editorial shell, themes, tokens and route wireframes. Desktop/mobile/tablet screenshots later exercised in consolidated QA.                                                                              |
| 3     | eeed71b | Discriminated content schemas, taxonomy, stable routes, graph and negative fixtures.                                                                                                                                |
| 4     | f9d87f7 | Restricted MDX, KaTeX, anchors, references, public-only detail generation and authoring CLI. Eight records validate; seven are published demonstrations.                                                            |
| 5     | 53a6832 | Homepage and primary hubs/profile/contact/legal templates with honest empty states.                                                                                                                                 |
| 6     | 4e6325b | Published search index, URL-preserving GET filters, ordered learning paths and relationships. Initial search measurement: 1.62 ms/query at 100 records, 10.09 ms at 1000 (100 queries; local synthetic repetition). |
| 7     | 9e7c038 | Consent-loaded YouTube player, validated IDs, timestamps/transcript/playlist support, unavailable-video state. Mock ID exists only in tests.                                                                        |
| 8     | c1bbf67 | Lazy SVG lab, square/constant/absolute presets, two-sided step controls, numeric table/reset and mathematical edge-case tests.                                                                                      |
| 9     | db5d217 | Inquiry methods/limitations/revisions/disclosures, truthful review state and verified OpenStax source link.                                                                                                         |

## Hardening and QA in progress

59 unit/component/integration tests passed after adding author CLI and negative link tests. A complete browser run passed 28 checks, with two duplicate viewport-independent crawls intentionally skipped. Subsequent navigation/metadata hardening requires a final browser rerun before release reporting.

Observed and fixed: Prettier interpreted JSON frontmatter as YAML and inserted trailing commas; MDX is now independently validated and excluded from generic formatting. Code highlighting failed contrast at 4.22:1 on warm paper; explicit light/dark code backgrounds fixed the automated failure. Range output created multiple live regions; numeric labels are now ordinary text with a single result status. Homepage illustrative points now come from exact coordinates. Missing citation targets and reserved-route aliases fail validation.

Performance investigation: initial concurrent runs were below target. Isolated optimized article/lab measured 92/94 performance, 100 accessibility and best practices; preview SEO 66 reflects intentional noindex. Homepage still being optimized and remeasured; do not mark its performance gate passed from these preliminary results.

Browser download failed ENOSPC on C:, so installed Chrome is used locally. D: workspace has capacity. GitHub CLI is authenticated as mohdhuzkhn; independent remote does not yet exist. No Vercel auth file or VERCEL_TOKEN/PROJECT_ID/ORG_ID was available. No live deployment, DNS success or manual screen-reader pass has been claimed.
