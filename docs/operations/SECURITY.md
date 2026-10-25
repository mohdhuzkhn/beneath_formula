# Security and privacy decisions

Threat boundaries: only reviewed repository authors supply MDX. AST validation rejects imports/exports, expressions, raw HTML, unsafe links and non-allowlisted components; KaTeX trust is disabled. No remote MDX, upload, authentication, email collection, or third-party analytics endpoint exists. Optional engagement endpoints accept only allowlisted public paths and a browser-generated UUID which is HMAC-hashed server-side before storage.

CSP denies objects, foreign script origins, framing and foreign form submissions. Inline scripts remain enabled for static Next hydration/theme; inline styles are needed by mathematical typography. This is a documented tradeoff, not a strict nonce CSP. A future nonce approach requires dynamic rendering or generated script hashes; review before introducing any untrusted HTML. youtube-nocookie is the sole iframe host. No video connection occurs before consent.

Production deployment adds HSTS; preview adds noindex. Configure hosting preview authentication before uploading sensitive drafts. Drafts are excluded entirely even from previews in this release. Production canonical URL must be HTTPS. No secrets belong in Git; dependency audit and source scan run in CI.

Owner must finalize actual hosting privacy terms, contact channel, branding and editorial review before public release. If engagement is enabled, disclose aggregate view counting and anonymous browser follows, provision PostgreSQL backups, and keep `DATABASE_URL` and `ENGAGEMENT_SECRET` only in Vercel environment settings. No student identifiers are collected. Theme preference is local browser storage.
