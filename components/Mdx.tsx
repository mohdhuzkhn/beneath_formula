import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { componentNames, inspectMarkdown } from "../lib/markdown";
import type { ComponentType, ReactNode } from "react";
type Props = { children?: ReactNode; title?: string; id?: string };
export async function Mdx({
  source,
  overrides = {},
}: {
  source: string;
  overrides?: Record<string, ComponentType<Props>>;
}) {
  inspectMarkdown(source);
  const components = Object.fromEntries(
    componentNames.map((name) => [
      name,
      ({ children, title, id }: Props) => (
        <aside className="callout" id={id}>
          <div className="callout-title">
            {title || name.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </div>
          {children}
        </aside>
      ),
    ]),
  );
  const { content } = await compileMDX({
    source,
    components: { ...components, ...overrides },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          [rehypeKatex, { trust: false, strict: "error", throwOnError: true }],
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark" },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
  return content;
}
