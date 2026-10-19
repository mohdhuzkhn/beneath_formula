# Operations and Phase 13 readiness

Owner: repository owner Muhammad Huzaifa; hosting/domain access remains owner-controlled. No additional collaborators or notification destinations have been invented.

Daily: automated health smoke when APP_URL is configured; investigate failed deploys or checks. Weekly: triage defects, broken links and correction requests, review Dependabot PRs, back up Git. Monthly: run full browser/accessibility/Lighthouse suite and inspect 404/error aggregates from the actual host. Quarterly: restore a backup into a fresh directory, rebuild and rehearse rollback. Do not claim field Core Web Vitals without sufficient real-user observations.

Triage: P0 security/privacy/content exposure or incorrect mathematical result blocks release and takes precedence. P1 broken core discovery/reading requires a focused fix with regression test. P2 polish enters backlog. Record reproducible steps, affected commit, impact, owner and verification; never include student data.

Incident: preserve logs with sensitive data redacted; pause deployment; roll back to known-good version; verify homepage, article, lab, sitemap and draft 404; communicate only through an owner-approved channel. Record root cause and remediation. Rotate exposed secrets through the owning service if any were added later.

Backup: `git bundle create <owner-controlled-path>/beneath-the-formula.bundle --all`; `git bundle verify <path>`; clone the bundle to a new empty directory and run `npm ci`, validation/tests/build. Git includes source, MDX and local SVG assets; no external hosted media assets currently exist. Never store account recovery codes or tokens in a bundle. Keep an off-device owner-controlled copy; a same-disk backup is only a recovery exercise.

Upgrade: one dependency family per branch, lockfile update, audit, all gates, protected preview, owner review, then merge. KaTeX override intentionally keeps transitive renderers on the patched installed version; re-evaluate it on upgrades. No P1 labs, visual graph, CMS, accounts, tracking or AI tutor are authorized by maintenance alone.

Manual release checks still required: screen-reader comprehension of formulas; actual iOS/Safari and Firefox compatibility; final editorial accuracy/identity/privacy review; production DNS and HTTPS; restore from the off-device backup location.
