import { expect, test } from "vitest";
import { validateContent } from "../../lib/validation";
import { published } from "../../lib/content";
import sitemap from "../../app/sitemap";
import { safeJson, articleData } from "../../lib/seo";
import { inspectMarkdown } from "../../lib/markdown";
test("all repository content math links and graph validate", () =>
  expect(validateContent()).toHaveLength(8));
test("sitemap and structured data contain only truthful published data", () => {
  expect(sitemap().some((i) => i.url.includes("gradient-notes"))).toBe(false);
  expect(articleData(published()[0])["@type"]).toBe("Article");
  expect(safeJson({ x: "</script>" })).not.toContain("<");
});
test("long formula and wide image fixture has valid semantics", () => {
  expect(() =>
    inspectMarkdown(
      "$$\\sum_{k=1}^{100} k = \\frac{100(101)}{2}$$\n\n![Wide coordinate plane](https://example.org/licensed-plot.png)",
    ),
  ).not.toThrow();
});
