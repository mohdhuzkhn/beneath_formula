# BENEATH THE FORMULA
## Production Implementation Master Plan & Coding-Agent Execution Specification
**Document version:** 1.0  
**Date:** 17 October 2026  
**Status:** Engineering blueprint / implementation authorized in phases  
**Working name:** *Beneath the Formula* (brand, domain, and trademark availability not yet cleared)  
**Founder / author:** Muhammad Huzaifa  
**Reference project:** [AI Engineering Second Brain](https://github.com/mohdhuzkhn/my-portfolio)

> **Core mission:** Build a serious public platform where school and college students, aspiring AI/ML practitioners, educators, and academic reviewers can explore *why* mathematics works: foundations, motivations, derivations, proofs, visual experiments, cross-topic connections, lectures, and a transparent record of independent mathematical inquiry.

> **Engineering directive:** This document is the product and technical source of truth for the coding agent. Build the **platform infrastructure first**; editorial growth strategy, publication schedule, and substantive research/article production will be planned separately. Populate only a minimal set of clearly labeled, mathematically verified demonstration content necessary to test the system. Never invent qualifications, publications, citations, teaching outcomes, historical facts, or scientific claims.

---

# 0. Executive decisions and boundaries

## 0.1 The four audiences
1. **Classes IX–XII / matric and intermediate students:** understandable explanations and rigorous progression from curriculum topics to first principles.
2. **Advanced learners and AI/ML beginners:** pathways linking calculus, linear algebra, discrete mathematics, probability/statistics, and optimization to computation and machine learning.
3. **Academic faculty and admissions reviewers:** independently written expositions, reproducible investigations, formal mathematical development, verified references, and an honest academic profile.
4. **Schools/colleges evaluating the author as a teacher:** teaching philosophy, curated sample lessons, classroom resources, genuine experience, and direct professional contact.

All four use **the same content graph** with different discovery pathways. Do **not** make four disconnected sites. This site is an **individual mathematical identity**, while The Science Squad is an **associated coaching institution** shown only where relevant.

## 0.2 Brand principles
- Brand working title: **Beneath the Formula**; taglines may include **Beyond formulas. Understand the why.**
- Educational, editorial, elegant, curious, evidence-driven, mathematically rigorous.
- **Not** a generic tuition landing page, PDF warehouse, formula cheat sheet, résumé, paid course marketplace, or AI-chatbot-first product.
- Lead with intellectual work and student exploration. Keep a subtle professional profile and a clear author identity.
- Do not overstate expertise, results, degrees, research standing, peer review, or university affiliations.
- Begin with second-year calculus while serving Classes IX–XII and supporting deeper mathematics as a structural extension.

## 0.3 Build priorities / release gates
| Classification | Scope |
|---|---|
| **P0 / Initial public release** | Brand-neutral configuration, polished responsive design, homepage, content hub, MDX + mathematics, citations/references, SEO, topic detail pages, curriculum/depth filters, search, explicit topic relationships, YouTube embedding, visual-lab framework and **one working exemplar**, learning pathway pages, author/teaching profile, inquiry/research-note types, contact, CI/CD, tests, privacy/legal pages, deployment and recovery documentation. |
| **P1 / Early enhancement** | More interactive labs, visual topic graph, enhanced reading history without accounts (optional), reading-list exports, publication collection page enhancements, accessible glossary, advanced search refinements, event analytics and author-friendly editing workflow. |
| **P2 / After traction and clear requirements** | Optional editorial CMS, collaborators/reviewers, Urdu localization, offline/PWA reading, learner progress, controlled feedback, curated exercises, advanced search, custom media pipeline, optional subscriber newsletters. |
| **P3 / Only if justified** | Accounts, personalized paths, quizzes with persistence, database-backed editorial workflow, AI tutor/RAG with evaluation/guardrails, richer simulations, mobile app, integrations. |

**Scope invariant:** A future capability may receive an interface or extension seam now; it is **not** permission to implement that feature prematurely.

## 0.4 Definition of project completion
The project is not finished when a homepage screenshot looks attractive. It is finished when author-controlled, versioned mathematical content can be published by following documented steps and can be discovered, read, watched, linked, searched, previewed, tested, and maintained safely on a production website.

---

# 1. Product requirements and user journeys

## 1.1 Primary user journeys
**Journey A — School learner:** Open home → select Class XII / calculus → find *Differentiation* → understand prerequisites → read intuitive explanation → inspect derivation → interact with tangent-line visualization → watch related YouTube lecture → access next/previous topic and related concepts.

**Journey B — Formula-curious visitor:** Search *Why e?* or browse *Origins* → read engaging overview → follow mathematical proof and historical references → jump to exponential growth, logarithms, and calculus; distinguish historical motivation from theorem proof.

**Journey C — AI/ML learner:** Enter *Math to AI* → follow Calculus → Partial Derivatives → Gradients → Gradient Descent; move between abstract mathematics, visualization and reproducible Python code without losing the mathematical prerequisites.

**Journey D — University reviewer:** Open *Academic / Inquiry* → read authentic expository or investigation material, bibliography and corrections/revision history → review background and relevant academic interests → open reproducible source notebook/repository when available.

**Journey E — Teaching recruiter:** Open *Teaching* → see philosophy, verified experience, representative lecture and lessons, educational resources and professional contact; download CV only if a verified PDF is explicitly provided.

**Journey F — Author:** Add a new Markdown/MDX content item with metadata → run validation, formatting, math checks and tests → receive preview → approve/publish via Git → metadata/search/graph/sitemap automatically update.

## 1.2 Required top-level navigation
- **Home** `/`
- **Explore** `/explore` (browse ideas by subject, question, depth, type)
- **Learning Paths** `/paths` (Classes IX, X, XI, XII; calculus; Math to AI)
- **Visual Lab** `/lab`
- **Math to AI** `/math-to-ai`
- **Inquiry & Writing** `/inquiry` (expositions, investigations, literature notes, verified publications)
- **Lectures** `/lectures` (YouTube)
- **About / Teaching** `/about` and `/teaching`
- **Search** `/search`
- **Contact** `/contact`

Recommended canonical content routes:
- `/concepts/[slug]` — foundational explanation with linked depth sections
- `/essays/[slug]` — origins, why-questions, conceptual expositions
- `/derivations/[slug]` — proof/derivation-focused items
- `/inquiry/[slug]` — investigations and research-oriented writing
- `/lab/[slug]` — interactive exhibits
- `/lectures/[slug]` — lecture detail pages
- `/paths/[slug]` — curated sequences, prerequisites and progress hierarchy

Provide author-friendly route aliases and 301 redirects when slugs change; never break published links silently.

## 1.3 Page-level functional specifications
**Home:** restrained memorable hero; one-sentence mission; featured question, calculus launch collection, active paths, live visual lab, recently published work (only if actually populated), Math-to-AI bridge, author credit, optional video highlights, navigation CTAs; no fake visitor counts/testimonials.

**Explore:** filterable cards by subject (algebra, trigonometry, geometry, calculus, linear algebra, discrete mathematics, statistics/probability, mathematical history), school level (IX, X, XI, XII), advanced level, content type, conceptual depth, and tags; preserve filters in URL and work without JavaScript where practical.

**Content detail:** breadcrumbs; eyebrow/category; descriptive title; summary; publication/updated dates; genuine author; reading time (estimated); grade/depth labels; prerequisite links; prominent *Why this matters*; table of contents; mathematically rendered body; semantic theorem/proof/definition/example/caution components; references; linked video/lab; related topics; next steps; accessible share/copy link; footnotes, equation labels and anchor links; print-friendly stylesheet.

**Paths:** entry prerequisites, learning outcomes, ordered steps, subject/level, estimated effort only if meaningful; optional branches to advanced material, clear *learn next* navigation; no fictitious completion indicators.

**Video/lectures:** human-curated YouTube IDs, titles, short descriptions, topic and path relationships, optional timestamps, captions/transcripts when rights/permissions permit, playlist grouping, fallback open-in-YouTube link, missing/unavailable video gracefully handled.

**Visual Lab:** curated experiments with controls, text explanation, mathematical equations, reset functionality, responsive charts, numeric constraints, keyboard access, accessible fallback explanation; one tested end-to-end exemplar at launch (secant-to-tangent). Lab is supplementary, not a substitute for mathematical explanation.

**Inquiry:** clear content type and status: Expository Essay, Study Notes, Literature Review, Reproducible Investigation, Preprint, Peer-Reviewed Publication. *Published paper* or *peer-reviewed* may only appear where factual evidence supports the claim. Each inquiry entry supports references, version, revision/corrections, code/reproducibility references, and conflict/disclosure fields as appropriate. Empty collections get an honest explanation, not invented papers.

**About / teaching:** mission, teaching philosophy, genuine qualifications/experience, selected explanations, link to The Science Squad (context only), authentic educational work, and professional email/contact. Clearly distinguish personal research interests from proven achievements.

**Contact:** minimally invasive contact channel. Prefer mailto or a server-protected contact form; no public student data and no testimonials involving minors without appropriate consent.

---

# 2. Information architecture, taxonomy and learning graph

## 2.1 Orthogonal classification
Never represent all classification as a single `category` string. Model each axis explicitly:
- **Content type:** concept | essay | derivation | investigation | literature_review | publication | lab | lecture | learning_path | glossary.
- **Subject:** hierarchical controlled IDs, e.g. calculus/limits, calculus/differentiation, linear-algebra/matrices.
- **Curriculum:** optional institution/board-specific mapping separate from universal mathematics; levels IX, X, XI, XII, undergraduate, advanced, AI-ML; represent multiple applicable levels.
- **Depth:** intuition | foundation | rigorous | advanced; multiple depth sections within an item are allowed.
- **Knowledge connections:** prerequisite, builds_on, application_of, generalizes, related_to, historically_connected_to; avoid arbitrary untyped links.
- **Language/locale:** English first; schema allows Urdu and translations later; do not promise translations that do not exist.
- **Status:** draft | in_review | published | archived. Only `published` indexed publicly.

## 2.2 Relationship integrity
- Maintain stable, immutable `id` values separate from display titles or slugs.
- Store explicit relationships as stable IDs, never just copy/pasted URLs.
- Build-time validator must reject unknown IDs, duplicate IDs/slugs, self-prerequisites, prerequisite cycles (when semantically illegal), broken outbound internal links, and invalid path references.
- Generate inverse edges where reasonable (e.g. *required by*) without duplicating manual data.
- Every related-topic recommendation must be explainable; do not suggest random links based solely on word overlap.
- Knowledge graph is **structural data first**, visualization second; accessible list and path navigation exist regardless of graph canvas.

## 2.3 Authoring taxonomy governance
Keep central, typed definitions and documentation for subjects, levels, connections, tags and their naming conventions. Avoid uncontrolled tag sprawl and arbitrary aliases.

---

# 3. Technical architecture and architectural decisions

## 3.1 Recommended baseline
Use a **new, independent repository** (`beneath-the-formula` as a working slug), not a live refactor of AI Engineering Second Brain. Review the reference project's actual reusable patterns, especially Next.js + React + TypeScript, MDX/Fumadocs, styling, testing, search and CI conventions; reuse components only when portable and legally compatible.

**Release 1: content-first, Git-backed, static-first Next.js application**
- **Web:** Next.js App Router + React + strict TypeScript, supported stable versions; use compatible Node.js active LTS and lock versions in lockfile.
- **Styles/design:** Tailwind CSS, documented design tokens, accessible headless component primitives as needed; use typography-friendly components for theorem/proof and mathematical content.
- **Content:** local MDX files committed to Git; audited MDX compile pipeline; Zod metadata validation; Markdown/math rendering with `remark-math` + `rehype-katex` (evaluate actual supported versions/compatibility), code syntax highlighting and trusted whitelisted MDX React components.
- **Search:** generate an index from published content at build time; choose a proven client-search solution (e.g. FlexSearch) or static-compatible indexer after checking Next.js output behavior; no hosted search service needed initially.
- **Visual math:** React + SVG/Canvas and an appropriate lightweight, maintained plotting/math library where necessary. Abstract common controls/coordinate systems for reuse. Avoid a mandatory heavy graphing package on all pages.
- **Video:** YouTube player embed, click-to-load, vetted ID allowlist and verified official player options; do not host video files.
- **Data and DB:** **no production database required at v1**; Git/MDX is canonical and generated indexes are derived. Do not use Prisma/Postgres just because the reference repo uses them.
- **User auth:** none for public readers. Author identity verified by GitHub code ownership; publishing happens through reviewed commits/PRs. No public admin panel initially.
- **Forms:** mailto by default; optional contact endpoint only with appropriate server-side anti-spam, validation, limits and privacy notice.
- **Hosting:** Vercel is a straightforward default; alternatively a verified platform compatible with chosen Next features. GitHub + preview deployments + production domain.
- **Observability:** runtime error reporting and privacy-respecting aggregate analytics if needed, with data retention controls and consent where legally required.
- **Tests:** Vitest (unit/integration), React Testing Library for components, Playwright for end-to-end, axe-core accessibility checks, TypeScript/eslint/content validation.

## 3.2 Deployment diagram
```text
Content author (Git/PR)
       |
       v
GitHub repository -> CI (lint/typecheck/content/tests/security/build)
       |                                       |
       +---- Preview deployment (draft review)--+
       |
       v
Approved merge -> production build -> CDN / Next.js web app
                                      |
               +----------------------+-------------------------+
               |                      |                         |
       Static HTML/MDX pages   Search/graph indexes      Optional server routes
               |                      |                         |
           Visitors            Browser search         Contact/health only if used
               |
       On-demand YouTube embeds (third-party)
```

**No runtime database is on the primary reading path.** Faster, cheaper, more reliable and easier to back up for a small author-owned site.

## 3.3 ADRs required before coding
Record decisions in `docs/adr/`:
- ADR-001: new repo versus copying the reference; reusable components inventory.
- ADR-002: Next.js hosting and rendering mode (SSG vs ISR vs server rendering).
- ADR-003: MDX engine and security assumptions (only trusted repository authors).
- ADR-004: Git-content model vs CMS/database; migration seam.
- ADR-005: search implementation and incremental index build.
- ADR-006: mathematics/plotting/rendering stack.
- ADR-007: analytics, embeds and privacy approach.
- ADR-008: content IDs/relationship schema, slug migration/redirect strategy.

Document rejected alternatives and trade-offs. Do not invent benchmark results.

## 3.4 Future database expansion (not an MVP dependency)
When actual needs emerge: PostgreSQL + migration tooling for users, quizzes, feedback, editorial queues, progression and other transactional data; object storage for author-owned uploads; optional dedicated search engine at scale. Ensure **content IDs remain stable** and content repository stays portable. Separate personal account data from public editorial metadata. Document a future migration strategy rather than prematurely creating empty tables/services.

---

# 4. Repository architecture

Suggested directory blueprint (adapt to framework decisions):
```text
beneath-the-formula/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── explore/page.tsx
│   │   ├── search/page.tsx
│   │   ├── concepts/[slug]/page.tsx
│   │   ├── essays/[slug]/page.tsx
│   │   ├── derivations/[slug]/page.tsx
│   │   ├── inquiry/page.tsx
│   │   ├── inquiry/[slug]/page.tsx
│   │   ├── paths/[slug]/page.tsx
│   │   ├── lab/[slug]/page.tsx
│   │   ├── lectures/[slug]/page.tsx
│   │   ├── math-to-ai/page.tsx
│   │   ├── about/page.tsx
│   │   ├── teaching/page.tsx
│   │   └── contact/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx (optional)
│   ├── not-found.tsx
│   └── layout.tsx
├── content/
│   ├── concepts/ essays/ derivations/ investigations/
│   ├── literature-reviews/ publications/ paths/ labs/ lectures/
│   └── glossary/
├── data/
│   ├── taxonomy.ts
│   ├── connections.ts (or validated declarative JSON/YAML)
│   ├── playlists.ts
│   └── redirects.ts
├── components/
│   ├── layout/ content/ math/ graph/ labs/ video/ search/ ui/
├── lib/
│   ├── content/ graph/ search/ metadata/ security/ validation/
├── public/
│   ├── images/ diagrams/ fonts/ icons/
├── scripts/
│   ├── validate-content.ts
│   ├── build-search-index.ts
│   ├── check-links.ts
│   └── build-graph.ts
├── tests/
│   ├── unit/ integration/ e2e/ accessibility/
├── docs/
│   ├── adr/ product/ design/ editorial/ operations/
├── .github/
│   ├── workflows/ templates/
├── .env.example
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── package.json
```
Treat structure as intent, not instruction to create empty directories. Only add meaningful modules.

---

# 5. Content engineering specification

## 5.1 Versioned author-controlled content
- Content should compile deterministically from committed files.
- Git commit history is the baseline editorial version history; optional visible updated date/revision notes are derived from explicit metadata, not fabricated commit dates.
- Content changes require validation, preview, human mathematical review, then merge.
- Prevent draft/review content from public page discovery, search index, generated feeds and site maps. Protect previews from accidental indexing and sensitive draft leaks; preview deployment access may require authentication depending on hosting.
- Support both Markdown-only articles and trusted MDX interactive embeds.

## 5.2 Required frontmatter schema
Define a discriminated Zod union per content type. Shared example:
```yaml
id: concept-calculus-derivative-intuition
slug: what-is-a-derivative
kind: concept
status: published
title: "What Is a Derivative, Really?"
summary: "An intuitive and rigorous exploration of instantaneous change."
authorId: muhammad-huzaifa
locale: en
subjects: [calculus/differentiation]
levels: [XI, XII, undergraduate]
depths: [intuition, foundation, rigorous]
tags: [rate-of-change, limits]
publishedAt: "2026-11-01" # example only: replace with actual publication date
updatedAt: "2026-11-01"
prerequisites: [concept-calculus-limits]
related: [concept-calculus-gradient]
videoIds: []
labIds: [lab-secants-and-tangents]
references: []
readingTimeOverride: null
canonicalUrl: null
license: "All rights reserved" # configurable policy
```
Use a **real published date** only when actually published. Additional typed fields:
- **Inquiry:** `inquiryKind`, `researchStatus`, `abstract`, `version`, `methods`, `limitations`, `references`, `doi?`, `arxivId?`, `repositoryUrl?`, `dataUrl?`, `peerReviewed` (explicit verified boolean, default false).
- **Lecture:** `youtubeVideoId`, `playlistId?`, `durationSeconds?`, `timestamps?`, `captionsUrl?`, `relatedContentIds[]`.
- **Lab:** `componentId`, `parameterRanges`, `learningGoals`, `accessibilitySummary`, `relatedContentIds[]`.
- **Path:** `audience`, `entryRequirements[]`, `learningOutcomes[]`, `orderedContentIds[]`, `optionalBranches[]`.
- **Glossary:** `term`, `notation`, `definition`, `aliases`, `relatedContentIds[]`.

## 5.3 Article MDX component library
Define typed, documented reusable components:
`<Definition>`, `<Theorem>`, `<Proof>`, `<Derivation>`, `<Intuition>`, `<Example>`, `<Misconception>`, `<HistoricalNote>`, `<WhyItMatters>`, `<Challenge>`, `<Solution>`, `<Equation>`, `<InteractiveLab>`, `<VideoLesson>`, `<ReferenceList>`, `<FurtherReading>`, `<PrerequisiteLinks>`, `<Callout>`.

- Use CSS/semantic structure rather than icon/color as only meaning.
- For equations: support block and inline LaTeX, line wrapping/scroll behavior on narrow screens, semantic alternatives for screen readers, optional equation numbering/cross-references, footnotes and links.
- Establish CSS for mathematical typography, proofs, definitions, figures, captions, sources and code listings.
- MDX authored by trusted maintainers only; never execute arbitrary externally submitted MDX. Keep rich HTML disabled/sanitized for untrusted text fields.
- Validate cross-references and internal anchors as part of content CI.

## 5.4 Source integrity and publication policy
- At minimum support references with authors/title/year/publisher/URL/DOI/ISBN/page references where appropriate; validate syntax and hyperlink formats (availability checks should not fail every build due to flaky external servers).
- Maintain corrections/errata and meaningful updated dates.
- Display distinctions between mathematical proof, physical intuition, historical evidence, experiment and conjecture.
- Do not claim research originality, peer review, publication acceptance or affiliation without evidence.
- No copyright-infringing textbook scans, pirated books, unlicensed figures, or third-party PDFs. Support image/source credits and licenses.
- Do not falsely represent AI-assisted generated content as independently verified research; final mathematical/historical review remains human-owned.

## 5.5 Publishing operations
Provide template files and `npm`/`pnpm` scripts for new concept, essay, inquiry, lecture and lab; content validator; index generation; link check; local preview; PR checklist; correction process; retire/redirect.

---

# 6. Brand and design system

## 6.1 Visual strategy
Aim for a **high-end mathematical journal meets interactive science lab**: typography-led, generous whitespace, meticulous equation treatment, restrained motion and precise visual language. Do not imitate a generic LMS or copy the UI/design assets of the AI portfolio.

- Define reusable tokens for brand/background/text/semantic colors, borders, radius, shadows, spacing, type scale, math type, grid, and motion.
- Maintain contrast in both light/dark modes; user preference persists locally without tracking.
- Responsive at small mobile sizes, tablets and desktops; never cut equations or controls.
- Use real editorial illustrations or original mathematical SVG/plots; no decorative stock-person photos or invented reviews.
- Fonts must have proper web licenses and be efficiently self-hosted/subset where permitted; system fonts are acceptable.
- Consistent logo/icon/favicon/Open Graph covers; brand name and canonical site URL configurable so changing them does not require editing dozens of files.

## 6.2 Key wireframes to create before implementation
Home, Explore/filter page, Content detail (long article with formulas), Path page, Lab detail (controls and plot), Lecture detail, Inquiry article, Teaching profile, Search, mobile nav, empty/loading/not-found/error states, cookie/privacy controls if analytics requires.

## 6.3 Interaction rules
- Search, filter, TOC and responsive menus keyboard usable.
- Animations honor `prefers-reduced-motion` and never block reading.
- Buttons, cards and navigation have meaningful accessible labels/focus styles.
- Interactive plots have numeric/text alternatives and keyboard controls.
- Design should remain readable at 200% zoom and in print styles.

---

# 7. Knowledge discovery, paths and graph

## 7.1 Search
- Index published content titles, summaries, body (clean text), tags, subject, type, level and glossary aliases at build time.
- De-duplicate ranking, match mathematical spellings/symbols when reasonable (pi/π, derivative/differentiation, e/Euler's number) via curated synonyms.
- Support keyboard shortcut, highlighted query terms, empty state, accessible announcements and deep links to results.
- No external search API key required in v1.
- Test performance of index size for target content volume, e.g. 100 / 1000 articles; document scaling triggers.

## 7.2 Learning paths
- Define ordered material and prerequisites in machine-validatable data files.
- Render learning objectives and links to deeper detours without mixing an exam-specific track with the advanced mathematics track.
- Initial path *Second-Year Calculus Foundations* can use approved demonstration entries, clearly marked sample when substantive material is unfinished.
- `Math to AI` includes an explicit bridge from differentiation/gradient to optimization; do not falsely imply every machine learning technique requires the same prerequisites.

## 7.3 Graph
- Implement relationship service/data structure now and an accessible connections panel on each content page.
- Interactive graph visualization is P1 unless inexpensive and fast; it must be a lazy-loaded progressive enhancement with an accessible textual fallback.
- Avoid unreadable force-layout clutter and performance regressions.

---

# 8. YouTube / video system

## 8.1 Integration model
- Video records are curated in content metadata or a validated registry keyed by stable internal ID.
- Video URL built only from validated YouTube video identifiers; validate allowed host and ID patterns; no arbitrary user-controlled iframe URL.
- Use lazy-loading/click-to-play to reduce third-party requests before user interaction. Evaluate privacy-enhanced embed domain where appropriate and current YouTube embed terms/behavior.
- Include title, transcript/captions if available and lawful, related concept IDs, lecture sequence, timestamps, channel/playlist link.
- YouTube is the primary video host; site is the structured permanent companion, not a secondary video-storage system.
- Gracefully handle unavailable/removed video; manual fallback links.

## 8.2 Launch requirements
- Dedicated lectures index and individual lecture page.
- Embed on concept/essay pages through an explicit `VideoLesson` component.
- Integration smoke test with one valid public test video only if the author supplies/approves its ID; otherwise test with mocked player and use placeholder state clearly labeled.
- No automatic scraping/transcript copying from third parties.

---

# 9. Interactive Mathematical Visual Lab

## 9.1 Reusable infrastructure
Create reusable modules: `LabShell`, `ParameterSlider`, `MathValueInput`, `CoordinatePlane`, `FunctionPlot`, `Legend`, `ResetControls`, `ExplanationPanel`, `AccessibleDataTable`, `ExportSnapshot?` (later).

## 9.2 First flagship exhibit — secant to tangent
Inputs: function selection from vetted presets, fixed `x`, variable nonzero `h`, increment behavior, zoom/reset. Outputs: plot of function, points, secant line, slope `(f(x+h)-f(x))/h`, limiting slope if defined, explanatory text. Avoid division by zero, floating-point blowups, discontinuities, derivative singularities. Ensure axes/units labels and correct numerical behavior. Include analytic baseline tests for `f(x)=x^2`, constant function, and a cusp such as `|x|` where derivative at zero does not exist. An adjustable h is a mathematical limit *illustration*, not proof on its own.

## 9.3 Test criteria for every lab
- Correct calculations within documented tolerance/edge cases.
- Responsive, keyboard accessible controls with visible values and reset.
- Accessible static/text explanation, no-only-color legends.
- Resource budget; lazy-load when below the fold, cleanup listeners, no memory leaks.
- Clearly document when a plot is numerical approximation rather than exact proof.

---

# 10. Profile, authority, educational integrity

- Home/byline should consistently credit Muhammad Huzaifa without presenting the entire site as a commercial coaching center.
- About: story, mission, *verified* background, current mathematical interests and learning direction.
- Teaching: honest experience, subject levels, sample lecture, teaching philosophy, available services/contact if desired. The Science Squad contextual link can be included with no confusion about site ownership.
- Inquiry/publication: semantic separation between an explanatory essay, a reading note, an independent investigation, an unreviewed preprint, and a peer-reviewed paper.
- If CV download exists, use accurate current CV, date/version, and verified credentials; do not force CV as primary CTA.
- Expose authorship, editorial corrections and citations in a readable manner. Build an optional `Now / Learning` page only if author wants to keep it maintained.

---

# 11. SEO, discoverability, performance and accessibility

## 11.1 Discoverability
- Unique titles/descriptions/canonical URL per page; Open Graph/Twitter previews; sitemap of published canonical pages only; robots.txt; semantic HTML; breadcrumb links; redirect registry; stable slugs.
- Applicable structured data: `Person` for author, `WebSite`, `Article`/`BlogPosting` for editorial content, `BreadcrumbList`, and `VideoObject` only with verified fields. Do not create deceptive `ScholarlyArticle` metadata or rich-result promises.
- Search engine previews use real text and renderable equations; avoid JavaScript-only primary article content.
- Optionally an RSS/Atom feed for published articles, updated dates and correct canonical link.

## 11.2 Performance targets
- Initial article pages mostly prerendered and served via CDN.
- Performance budget: target Lighthouse >=90 for Performance/Accessibility/Best Practices/SEO on representative pages in a controlled test, and Core Web Vitals targets LCP <=2.5s, INP <=200ms, CLS <=0.1 at the 75th percentile where sufficient real-user data exists. Clearly identify lab pages as heavier and measure separately.
- Code-split graphs, labs, videos and search; optimize images/fonts and cache; avoid hydrating all reading content.
- Profile mobile loading on constrained network/device; baseline and regression testing.

## 11.3 Accessibility
- Target **WCAG 2.2 AA**; semantic headings, skip navigation, labels, robust focus management, alt text, captions/transcript strategy, 200% zoom, contrast, keyboard-only operation, reduced-motion support.
- Treat mathematical accessibility as a dedicated problem: test KaTeX output with screen readers, provide explanatory prose / accessible math markup where feasible and sensible fallback for advanced formulas.
- Automated tools cannot replace manual keyboard, reader and equation comprehension tests.

---

# 12. Security, privacy and reliability

## 12.1 Security baseline
- Least-privilege GitHub permissions, PR review/branch protection, environment-specific secrets, dependency scanning, Dependabot/renovation with compatibility testing, pinned CI actions where feasible.
- Strict TypeScript and Zod validation for all metadata, URL/IDs and runtime input.
- Minimize or eliminate server endpoints initially. Apply server-only secret access, rate limiting and anti-spam to contact endpoint if one exists.
- Trusted-only MDX compilation; no arbitrary client-supplied JSX/HTML/code execution.
- Content Security Policy and security headers appropriate to KaTeX/scripts/YouTube; test thoroughly and avoid an unworkably strict CSP that breaks platform. HTTPS, HSTS on configured production domain, safe external link targets, iframe sandbox/policies where compatible.
- No arbitrary file uploads in v1, no admin login, no database credentials exposed to browser.
- CI runs vulnerability checks and secret scanning. Store audit output as artifacts.

## 12.2 Privacy and minor learners
- No mandatory sign-up for school students; no collection of age, grades, WhatsApp numbers, addresses or other child/student identifiers.
- Privacy policy accurately discloses real hosting, third-party embeds, analytics, cookies and contact information handling.
- User gesture before third-party YouTube embed whenever practical; do not claim the third party collects zero data.
- No personalized analytics or ad tracking by default. If adding, implement consent where needed and retention limits.
- Contact form stores the least possible information and includes deletion/response rules.
- Don't display student names, photographs, results, testimonials or classroom screenshots without appropriate permissions.

## 12.3 Reliability and recovery
- Source stored in GitHub; generated site recreated from source and lockfile.
- Written environment setup, deploy, rollback, incident and dependency upgrade procedures.
- Backup content Git repository to owner-controlled location on a regular schedule, and exercise a clean restore. Include externally hosted image/media assets in backup inventory if used later.
- Define ownership of domain/registrar, DNS, hosting accounts and secret recovery; do not hardcode personal access tokens.
- Monitoring of availability, broken builds, 404 rates, and errors; alert owner by configured channel when practical.

---

# 13. Quality engineering and test plan

## 13.1 Automated checks
- **Type/lint/format:** strict TS, ESLint, formatter, no warnings ignored without issue.
- **Content validation:** schema errors; slug/ID collisions; missing required data; circular prereqs; broken internal references; missing math assets; incorrect publication visibility; malformed references; missing alt text where required.
- **Unit tests:** taxonomy, slug/path generators, relationship validator, math utilities, search normalization, metadata generation, lab functions.
- **Component tests:** article layout, table of contents, notation, breadcrumbs, lab controls, video consent/embed, search UI, states.
- **Integration tests:** MDX load, indexing published-only, route generation, graph generation, SEO metadata and sitemap behavior.
- **E2E tests:** all audience journeys A–F, navigation, search, filters, video fallback, visual lab function, contact fallback, preview draft access, missing slug 404, mobile and desktop.
- **Accessibility:** automated axe tests, manual keyboard, screen-reader smoke test including formulas, zoom and focus states.
- **Security:** dependency/secret scanning, CSP spot tests, no accidental access to unpublished content, input limits, no externally sourced MDX execution.
- **Performance:** Lighthouse CI and bundle budget; representative pages and low-end mobile simulation.
- **Visual:** representative responsive screenshot regression; validate plots/equations do not overflow.

## 13.2 Test fixture coverage
Test fixtures must cover: one valid published concept, one unpublished draft, a derivation, a lab, a lecture, a learning path, an inquiry, malformed metadata, dangling graph edge, graph cycle, invalid YouTube ID, missing reference, a long formula, non-Latin Unicode, wide image, malicious-looking user input, empty index, and a renamed slug with redirect.

## 13.3 Release blocking conditions
No public deployment if content validation, build, typecheck, critical security check, high-priority accessibility failure, core E2E journeys or mathematical exemplar correctness tests fail. Document justified temporary exceptions in tracked issues with owner and follow-up.

---

# 14. CI/CD, environments and release workflow

## 14.1 Environments
- **Local:** `npm install` or chosen package manager, `.env.example`, local dev and test.
- **Preview:** per PR, unique URL, appropriate draft access restrictions, noindex and safeguards; safe test data only.
- **Production:** protected default branch deployment, configured canonical domain, production-only environment config, versioned rollback.

## 14.2 GitHub Actions jobs
1. checkout/install/cache using lockfile
2. format + lint
3. TypeScript typecheck
4. content schema + link + graph validation
5. unit/integration/component tests
6. production build and generated asset checks
7. Playwright smoke E2E against preview or built server
8. accessibility/performance (at least on scheduled/pre-release runs; critical accessibility checks in PR)
9. dependency/secret scanning
10. deployment and post-deploy smoke tests where CI permissions permit

Use least privilege, branch protection and reproducible builds. Never give third-party CI PR jobs unrestricted production secrets.

## 14.3 Scripts / developer experience
Required commands, actual names may vary:
`dev`, `build`, `start`, `lint`, `format:check`, `typecheck`, `test`, `test:e2e`, `content:validate`, `content:new`, `search:build`, `graph:validate`, `links:check`, `ci`.

## 14.4 Release deliverables
Versioned changelog, deployed URL, DNS/HTTPS check, sitemap check, broken link scan, metadata audit, screenshots, performance baseline, test report, rollback commit, operational runbook.

---

# 15. Implementation phases — coding agent must execute sequentially

## PHASE 0 — Discovery, requirements and design ADRs
**Build:** inspect reference repo (read-only), select new repo name/package manager, enumerate reusable and risky dependencies, lock scope, document personas/journeys/functional matrix, risks, decisions, project board, epics, definition of done.
**Deliver:** `docs/product/PRD.md`, `docs/product/SCOPE.md`, `docs/architecture/SYSTEM_ARCHITECTURE.md`, initial ADRs, dependency matrix, milestone plan, traceability checklist.
**Exit gate:** every P0 requirement has a phase owner and a test/acceptance criterion; no unresolved foundational architecture contradiction.

## PHASE 1 — Repository foundation / developer experience
**Build:** fresh repository with Next.js, TypeScript strict, ESLint/Prettier, Husky optional, `.env.example`, CODEOWNERS/branch policy where possible, README, package scripts, GitHub Actions CI; starter layout, global theme, error/404 boundaries.
**Exit gate:** clean checkout installs, builds, lints and typechecks locally and in CI; no environment secrets needed to render home.

## PHASE 2 — Brand identity, UI/UX and design system
**Build:** design tokens; responsive header/footer, type system, dark/light, content widths, cards, navigation, breadcrumbs, page templates, accessible states; wireframe each key route. Deliver prototype screenshots at mobile/tablet/desktop.
**Exit gate:** design approval against brand brief, mobile keyboard navigation and representative article/equation layout.

## PHASE 3 — Information architecture, taxonomies and schemas
**Build:** controlled taxonomies; Zod per-content-type schemas; stable IDs, path builder, route resolver, level/depth filters, relationship model, redirects; example fixtures with deliberate validation errors.
**Exit gate:** all valid fixtures compile; invalid ones fail predictably; integrity checks catch duplicate/unknown/cyclic references.

## PHASE 4 — MDX publishing engine and mathematical typography
**Build:** typed MDX loader/compiler, math syntax with KaTeX, source citations, Markdown features, custom components, internal anchors, TOC, content detail templates, code/diagram integration, publication visibility and PR previews.
**Exit gate:** vetted exemplar renders accurately, long equations work on mobile, draft content not publicly published, build detects broken references.

## PHASE 5 — Homepage and principal sections
**Build:** Home, Explore, taxonomy subject/level pages, teaching/About, Inquiry index, editorial About, contact, 404 and empty/loading states; responsive UI and on-page navigation.
**Exit gate:** key audience journeys can navigate using keyboard and phone; no dead links/empty faux-counts.

## PHASE 6 — Search, relationships, and learning pathways
**Build:** published-only static search index, filters, deep links, synonyms, connected topics, prereq graph validity, path detail pages, Math-to-AI discovery view and accessible graph alternative.
**Exit gate:** index updates from content without manual changes; no draft leakage; tests prove prerequisites and relationships correct.

## PHASE 7 — YouTube and lecture integration
**Build:** lecture registry/content type, lecture listing/detail, validated click-to-play video embed, optional timestamps, captions/transcript fields, playlist linkage, related-content integration and missing-video fallback.
**Exit gate:** no unsolicited heavy third-party video load before interaction as designed; embeds and fallbacks work on mobile; all IDs validated.

## PHASE 8 — Visual Mathematics Lab framework
**Build:** reusable lab shell/control/graph layers; first correct interactive secant-to-tangent lab with test cases; lab index/detail; embed-lab component inside MDX.
**Exit gate:** analytic/cusp edge-case tests pass; plot and controls accessible on mobile and keyboard; lazy loading measured.

## PHASE 9 — Academic inquiry, credibility and profile infrastructure
**Build:** research-oriented metadata/types, references, bibliography/DOI support, revisions/errata, reproducibility/resource links, semantic publication labels, inquiry filters; verified personal profile and professional-contact page.
**Exit gate:** a test expository note and investigation can be represented accurately; system never falsely marks draft/preprint as peer-reviewed; CV fields optional.

## PHASE 10 — SEO, accessibility, security and performance hardening
**Build:** dynamic metadata, sitemap/robots, OG images, structured data, redirects, print styles, CSP and headers, privacy/terms/copyright pages, image optimization, Core Web Vitals budget, accessibility remediation and analytics decision.
**Exit gate:** SEO crawls published canonical pages; WCAG 2.2 AA target tested; automated and manual security/performance/accessibility audits recorded.

## PHASE 11 — Full QA and release-readiness
**Build:** Playwright suite for personas, screenshots, math checks, Lighthouse, link crawl, compatibility and data visibility tests; fix defects; complete project documentation, migration/rollback/recovery steps.
**Exit gate:** all P0 acceptance criteria pass and owner signs off on demo content and branding.

## PHASE 12 — Staging, production deployment and handover
**Build:** preview/prod environments, DNS/domain/HTTPS, deploy from protected main, production smoke run, Search Console/sitemap submission when available, monitoring, backup process, rollback demonstration, final handover docs.
**Exit gate:** verified live URL; no critical errors; reproducible deploy and rollback; README + onboarding clear; outstanding P1/P2 backlog tracked.

## PHASE 13 — Post-launch iteration (separate roadmap)
**Build:** fix defects based on real users; improve content navigation and page performance, add P1 interactive labs and knowledge graph only when measured value supports it. Plan article/research/video growth as a **separate editorial strategy**, not included in initial platform development signoff.
**Exit gate:** stable maintenance cadence, issue triage, monitored health and documented upgrade backlog.

---

# 16. Release acceptance criteria — testable checklist

**Platform identity**
- [ ] Brand name, tagline, author display, canonical domain and URLs configurable.
- [ ] Independent repo and deployed website clearly different from The Science Squad and AI Engineering portfolio while appropriately cross-linked.
- [ ] Home communicates *why, proof, connections and investigation* within the first screen.

**Navigation and experience**
- [ ] All top navigation sections have real route templates and purposeful empty states.
- [ ] IX–XII students can discover school-appropriate paths; Math/AI learners can discover advanced bridges.
- [ ] Content card, TOC, breadcrumbs, article pagination, references, related and prerequisite links work.
- [ ] Keyboard, mobile and dark/light behaviors pass accessibility checks.

**Content**
- [ ] Author can publish at least one concept, one essay/derivation, one path, one inquiry sample, one lecture sample, one lab sample through Git workflow (honestly labeled demonstrators).
- [ ] Draft content absent from public routes, search, sitemap and RSS.
- [ ] Math formulas compile and remain legible on phone and desktop.
- [ ] Broken links, duplicate slugs, dangling edges, invalid refs and metadata cause meaningful validation failures.
- [ ] Publication distinctions and citations represented truthfully.

**Technology**
- [ ] Search returns relevant, only-published indexed results.
- [ ] Relationship/prereq system works and is validated; graph visualization not required for v1.
- [ ] YouTube video IDs validated, lazy embeds/fallback tested.
- [ ] First interactive derivative lab mathematically and accessibly tested.
- [ ] CI pipeline reliably catches errors; clean build reproducible.
- [ ] Production has SEO, monitoring, backups and documented rollback.

**Operational**
- [ ] Threat and privacy assessment signed off; no student personal information collected in MVP.
- [ ] No fabricated academic credentials or publications in live copy.
- [ ] Owner has publishing guide, deployment guide, architecture overview and maintenance runbook.
- [ ] A backlog exists for remaining content and enhancements, separate from completed engineering work.

---

# 17. Coding agent operating protocol

1. **Do not start with UI implementation.** First inspect the reference project read-only, state assumptions, create requirements/ADRs and an issue-based execution board.
2. **Honor release priority.** P0 is committed. P1/P2/P3 are recorded but require later approval; do not expand scope implicitly.
3. **Iterative milestones:** Implement one phase at a time on separate commits/PRs, include summary, changed files, architecture decisions, test evidence, screenshots for UI, known issues and risks.
4. **Maintain requirement traceability:** map every P0 item to implementation file(s), acceptance criteria and tests in `docs/product/TRACEABILITY.md`.
5. **Reproduce:** choose deterministic package manager and lockfile, `.env.example` with safe defaults, seed/test fixtures (no invented site achievements), documented local setup and clean CI.
6. **Own mathematical quality:** agent may implement display logic and carefully verified exemplar; do not mass-generate mathematical essays, fictitious historical narratives or published research material without author editorial review.
7. **Do not modify the existing AI portfolio repo** without explicit authorization. The new platform owns its code and deployment.
8. **Surface blockers with alternatives**, not silent workarounds. If domain, personal facts, YouTube channel ID, contact email or brand decision is unavailable, use centralized configuration and clearly labeled placeholder; never invent an actual identity/account.
9. **No secrets in Git**, no unsafe use of MDX, no unnecessary user accounts/database, no untracked production resources.
10. **Stop at each phase gate**, verify against tests, then progress. A plausible-looking page is not a passing implementation.

**First action required from agent:** Return the PHASE 0 deliverables, the confirmed stack/dependency choice (with version compatibility checks), a P0 task breakdown, assumptions and proposed acceptance evidence, **before** writing application features.

---

# 18. Core risks and mitigations

| Risk | Mitigation |
|---|---|
| Brand unavailable / name changes | Central configuration + design assets separate; defer domain purchase until clearance. |
| Overengineering before content exists | Git-backed MDX, no mandatory auth/DB/CMS/AI services initially. |
| Incorrect formulas or historical claims | Verified exemplar, content review checklist, corrections/references, math unit tests. |
| Academic credibility undermined by exaggerated “papers” | Explicit content types and editorial statuses, provenance fields, no automatic peer-review badges. |
| A beautiful visual lab that gives wrong results | Calculation tests, edge cases, analytic comparisons, numeric limitations and accessible text. |
| Bad SEO from client-only content | Static/SSR-first rendered articles, canonical URLs, sitemap/schema validation. |
| Student privacy and third-party embeds | Avoid accounts, click-to-load YouTube, minimal analytics and data collection. |
| Large graph slows reading | Simple typed links first, optional lazy-loaded visualization later. |
| Plugin/version churn | ADRs, lockfile, supported stable dependencies, isolated MDX adapter and CI. |
| Key site becomes difficult to maintain | Documented workflows, fixtures, backups, releases, content templates and typed schemas. |

---

# 19. Agent handoff prompt

> Act as the **Principal Software Architect, Staff Frontend Engineer, Content Platform Engineer, QA Lead and DevOps Lead** for a production educational knowledge platform named *Beneath the Formula* (working name). Treat the attached master plan as the source of truth. The purpose is a distinctive, rigorous mathematical exploration platform, not a résumé, generic online academy, PDF repository, or rushed demo.
>
> Read every section. Inspect https://github.com/mohdhuzkhn/my-portfolio for reusable architecture **without modifying it**. Implement in the precise phase order 0–12; maintain requirements-to-tests traceability, ADRs, clear commit/PR milestones, robust mathematical and content validation, accessible responsive UX, Git-backed MDX publishing, a search/relationship/path layer, curated YouTube integration, and one rigorously tested mathematical visualization. Defer editorial production and research writing strategy to a separate subsequent project phase.
>
> Start by returning **Phase 0 documentation, architecture and version decisions, P0/P1 scoping, phase-wise issue backlog, risks, and acceptance gates**. Do not immediately generate an entire repository without validation. Never fabricate papers, citations, credentials, video IDs, domain availability or student outcomes. Explain implementation blockers and use clearly marked configuration placeholders. Each completed phase must include commands, tests, observed results and remaining risks before advancing.

---

# 20. Technical reference URLs (verify current releases before adoption)
- Next.js App Router MDX: https://nextjs.org/docs/app/guides/mdx
- Next.js metadata and SEO: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js Content Security Policy: https://nextjs.org/docs/app/guides/content-security-policy
- YouTube embed developer reference: https://developers.google.com/youtube/player_parameters
- Google Search article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- WCAG 2.2 recommendation: https://www.w3.org/TR/WCAG22/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- Playwright E2E testing: https://playwright.dev/docs/intro

**Final note:** Platform engineering and content strategy are distinct workstreams. Complete platform foundations, publish only truthful verified demonstrator content, and then plan the article, video, mathematical investigation and research-production strategy with the author in the next conversation.
