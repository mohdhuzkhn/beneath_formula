# Dependency decisions and observed compatibility

Node 24.7.0 / npm 11.19.0 host. package.json pins direct dependency versions; package-lock.json locks transitive resolution. Next 16.4.2 with React/React DOM 19.3.1 installed without peer conflicts and produced the static article build. Registry checks and actual install/build are the compatibility evidence.

Publishing: next-mdx-remote 6, unified/remark-gfm/remark-math, rehype-katex, rehype-slug and rehype-pretty-code. The KaTeX override uses the exact direct installed patched version across transitive renderers. Every authored formula is checked with trust=false and strict errors before compilation.

Validation: Zod discriminated schemas; native fs and JSON frontmatter. gray-matter was removed because its unnecessary YAML dependency chain had an advisory. Generic Prettier MDX formatting treated JSON frontmatter as YAML and introduced invalid trailing commas; content is excluded from that formatter and independently schema/math/link validated.

Lint: ESLint and typescript-eslint, replacing eslint-config-next after an advisory in its glob chain. Framework integration is tested through Next's actual typecheck/build and browser behavior. No warnings are suppressed to make a release pass.

UI: system fonts, Tailwind/PostCSS foundation with explicit design-token CSS, a small isolated theme control and SVG. Static/native links avoid per-link client router work and preserve no-JavaScript navigation. This trades SPA transitions for a simpler reading path; interactive controls remain isolated React components.

QA: Vitest, Testing Library/jsdom, Playwright with axe, Lighthouse. Browser installation hit ENOSPC on the host system drive, so local tests use installed Chrome; CI installs managed Chromium. Mobile and tablet runs emulate viewport/input, not real iOS/Safari devices.

Security audit evidence: artifacts/dependency-audit.json. Report counts from an actual audit; do not infer vulnerability absence from a successful install alone.
