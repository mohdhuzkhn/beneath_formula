# Contributing

Use Node 24 and `npm ci`. Start with docs/product/SCOPE.md and docs/editorial/PUBLISHING.md. Preserve stable IDs, truthful academic labels and reviewed mathematical content. Run `npm run ci` and `npm run test:e2e` before a PR. Keep content frontmatter strict JSON; MDX is intentionally excluded from generic Prettier YAML formatting and validated by content:validate.

Do not introduce a database, authentication, analytics, remote MDX, student data, unapproved videos or P1–P3 scope without explicit authorization. Use one logical change per commit and record test evidence.
