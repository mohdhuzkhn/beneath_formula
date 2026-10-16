# Author-controlled publishing

1. Create a branch and run `npm run content:new -- concept your-slug` (all schema kinds supported).
2. Edit JSON frontmatter inside `---` delimiters and Markdown/MDX body. JSON is deliberate: no YAML implicit dates or executable loaders. Keep immutable IDs and controlled taxonomy values.
3. Start as draft. Supply references, mathematical justification, accurate author/disclosure fields and corrections. Approved components accept only literal `id` and `title`; imports, expressions, HTML and arbitrary components are rejected.
4. Run content validation, unit tests and local preview. Published routes intentionally exclude drafts in every environment. To review a draft locally, change its status on the review branch, run the site, and revert that status before committing unless approved. Never include confidential material in a deployed preview.
5. Obtain human mathematical/editorial review. For public content set status published and the actual publication date. Demo samples remain explicitly labeled until replaced or approved. Submit a PR; quality checks must pass. Protect the branch and preview deployment in the hosting account.
6. Merge only after review. Search, graph and sitemap derive from published content; do not edit generated indexes by hand.

Corrections: append revisions with actual dates and descriptions; update updatedAt. Rename: keep ID and add the old absolute route to aliases; redirect checks reject collisions. Retirement: archive and remove published relationships, or provide an explicit replacement redirect. Do not claim peer review without verified evidence and consistent inquiry metadata.

Images require alt text and owned/licensed sources; no textbook scans or student identifiers. A supplied YouTube ID requires explicit owner approval and must pass validation. Missing CV, contact and credentials remain unavailable, never invented.
