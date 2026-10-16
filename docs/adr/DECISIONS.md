# Architecture decision records

001 Accepted: independent repository; reference inspected read-only. Reject copying a database-backed portfolio and unreviewed licensed assets.

002 Accepted: Next App Router, pre-rendered content, Node-compatible hosting. Reject mandatory CMS/ISR until content volume requires it.

003 Accepted: repository-only MDX with an allowlisted JSX component surface, no imports/exports/expressions; math validated before build. Reject remote MDX and arbitrary user HTML execution.

004 Accepted: Git canonical source and stable IDs. Future CMS adapters must emit the same schema; personal data remains separate.

005 Accepted: small published-only search index and deterministic token ranking. Measure 100/1000 records before considering hosted search.

006 Accepted: remark-math, rehype-katex and lightweight SVG plot with analytic presets. Reject large mandatory plotting bundles.

007 Accepted: no analytics, no student data, consent-loaded youtube-nocookie iframe. Third-party data handling is disclosed.

008 Accepted: immutable IDs, typed edges, acyclic prerequisites and explicit permanent redirects. Reject silent slug changes and random related links.
