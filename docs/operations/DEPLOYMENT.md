# Deployment and release

Target: Node 24 / Next.js on Vercel. `vercel.json` uses the lockfile and build-time validation. No database, background worker or runtime secrets are required.

1. Connect the independent GitHub repository to a new Vercel project. Do not attach or edit the portfolio project.
2. Configure preview access protection. Preview output has noindex; drafts are excluded entirely. Review drafts locally as documented in editorial/PUBLISHING.md.
3. Set NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_EMAIL. Use an owner-controlled HTTPS URL for production. Do not commit credentials. Verify domain ownership and registrar/DNS recovery details.
4. Complete author mathematical/brand review and update the privacy page to name the actual provider and retention policy. Run `npm run release:check` with EDITORIAL_APPROVED=true and HOSTING_PRIVACY_REVIEWED=true only when those reviews actually happened.
5. Require Quality gates / verify on main and owner review. Link Git deployments so PRs create protected previews and approved main builds deploy production. Keep production auto-deploy disabled until release checks and owner review are complete.
6. After deployment set TEST_BASE_URL to the returned URL, run `npm run smoke`, verify HTTPS/canonical/sitemap/robots and review browser console. Set GitHub variable APP_URL for the scheduled smoke workflow. Enable GitHub failure notifications for the owner.
7. Submit the sitemap to Search Console only after proving domain ownership. Record actual URL, deployment ID, Git SHA, timestamps and evidence in RELEASE_REPORT.md. A build or configuration file is not evidence of deployment.

Rollback: promote the prior known-good deployment in Vercel, then revert the faulty change by a reviewed Git revert. Re-run smoke and draft checks. Do not rewrite published history. If DNS is at fault, restore the previously recorded provider configuration; never guess records.

Production security: HSTS is enabled by VERCEL_ENV=production. Static hydration requires inline scripts; see SECURITY.md for the CSP tradeoff. Never place sensitive data in content, including drafts, because Git remains canonical.
