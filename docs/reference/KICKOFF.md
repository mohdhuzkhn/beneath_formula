# Coding-Agent Kickoff: Beneath the Formula

**Role:** Act as Principal Software Architect, Senior Full-Stack Engineer, Content Platform Engineer, QA Lead, and DevOps Lead.

**Required input:** Read `Beneath_the_Formula_Implementation_Master_Plan.md` in full. Treat it as the primary product/technical specification. This is a serious public mathematical knowledge platform, not a generic tuition website, PDF library, résumé, or rapid UI demo.

**Project goal:** Build a distinct website connecting school mathematics (IX–XII), rigorous derivations, origins and proofs of formulas, interactive mathematical labs, lectures, AI/ML mathematical bridges, and honest academic inquiry. The working brand is *Beneath the Formula*; make name/domain configurable. Build the platform **before** discussing article/research/video growth strategy.

**Existing reference:** Study `https://github.com/mohdhuzkhn/my-portfolio` read-only for reusable patterns, but create a **separate repository**. Do not change the existing project without permission.

## Execution rules
1. Follow phases 0 through 12 in the specification, sequentially; Phase 13 is post-launch maintenance.
2. Perform Phase 0 first: inspect the reference repo, choose/verify supported dependency versions, write a product requirements document, architecture, ADRs, phase backlog, risk register, and requirements-to-tests traceability.
3. Do not implement whole project as a single blind generation. Make small, reviewable commits/PRs and report tests, screenshots and residual risks at every phase gate.
4. Favor statically rendered, Git-backed MDX, strict TypeScript, accurate mathematical typesetting, accessible responsive design, curated relationships, static search, YouTube integration, and one mathematically verified interactive lab. No compulsory database, authentication, or AI tutor in v1.
5. Differentiate content types correctly: concepts, essays, derivations, lectures, visual labs, investigations, literature reviews, preprints and verified publications. Never fabricate research, citations, degrees, testimonials, historical facts or video IDs.
6. Make public publishing reproducible: schema validation, preview, PR checks, published-only search/sitemaps and documented rollback.
7. No secrets in Git, no untrusted MDX execution, no student personal data; use minimal analytics and click-to-load third-party video embeds.
8. Preserve all deferred P1/P2/P3 requirements in a backlog, but do not implement without approval.
9. If information is unknown, use centralized, explicitly labeled placeholders and report the decision; never fabricate identity or external accounts.
10. Definition of done includes code, tests, architecture docs, accessibility, security, performance baseline, deployment and operations guide, not only visual appearance.

## Required response now — Phase 0 only
Return:
- Architecture overview and proposed tech stack (including compatibility/version checks).
- P0/P1/P2/P3 scope matrix and work breakdown into phase-sized issues.
- Content taxonomy, graph and metadata model outline.
- Repo and deployment strategy plus ADR list.
- Risks, assumptions and external dependencies.
- Acceptance-test matrix and phase exit gates.
- Precise files you intend to create in Phase 0 and the tests/commands to validate them.

**Do not begin producing application features until Phase 0 has been reviewed and accepted.**
