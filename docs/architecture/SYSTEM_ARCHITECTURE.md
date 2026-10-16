# Architecture

Git MDX → Zod/graph/link validation → trusted MDX compilation + KaTeX → Next App Router static pages. Published content feeds search, connections and sitemap. Browser islands handle filters, theme, consent video and lazy SVG lab. No database, login, student information or analytics.

Read-only reference inspection: https://github.com/mohdhuzkhn/my-portfolio README, package.json and contentlayer.config.ts. Observed Next 15.5.25, React 19.2.8, Contentlayer2/Fumadocs and Prisma/Postgres sync. Reuse the pattern of typed content, computed URLs/reading time and explicit relationships, with new original code. Do not copy assets or introduce its database/auth dependencies. Reference files were fetched, never modified.

Dependency check via npm registry: Next 16.4.2 requires Node >=20.9; React 19.3.1; next-mdx-remote 6 supports React >=16. Local Node 24.7.0, npm 11.19.0. Exact package lock governs reproducibility. Next/React compatibility is additionally checked by npm resolution and production build. Official references: https://nextjs.org/docs/app/guides/mdx and https://nextjs.org/docs/app/getting-started/installation.

Hosting target: Vercel-compatible Node Next runtime. Static article generation with dynamic URL-filter hubs; trusted local content only. Deployment access is external. No claim of live production until URL and HTTPS smoke tests pass.
