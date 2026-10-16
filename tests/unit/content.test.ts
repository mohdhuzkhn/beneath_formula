import { expect, test } from "vitest";
import { contentSchema, type Article } from "../../lib/schema";
import { parseContent, validateGraph, route } from "../../lib/content";
const base = {
  id: "one",
  slug: "one",
  kind: "concept",
  title: "A concept",
  summary: "A sufficiently descriptive summary",
  authorId: "muhammad-huzaifa",
  status: "published",
  publishedAt: "2026-10-17",
  subjects: ["calculus/limits"],
  levels: ["XII"],
  depths: ["foundation"],
  whyItMatters: "A useful foundation for calculus.",
};
const item = (changes = {}) =>
  ({
    ...contentSchema.parse({ ...base, ...changes }),
    body: "## Hello",
    file: "test.mdx",
  }) as Article;
test("valid schema and JSON MDX frontmatter", () => {
  expect(parseContent(`---\n${JSON.stringify(base)}\n---\nHello`).id).toBe(
    "one",
  );
  expect(route(item())).toBe("/concepts/one");
});
test.each([
  { slug: "../bad" },
  { status: "published", publishedAt: undefined },
  { levels: ["uncontrolled"] },
  { references: [{ id: "r", title: "No source" }] },
  { kind: "lecture", youtubeVideoId: "bad" },
  { kind: "lecture", youtubeVideoId: "abcdefghijk", videoApproved: false },
])("rejects invalid metadata %j", (changes) =>
  expect(() => item(changes)).toThrow(),
);
test("rejects duplicate IDs and routes", () => {
  expect(() => validateGraph([item(), item()])).toThrow("Duplicate ID");
  expect(() => validateGraph([item(), item({ id: "two" })])).toThrow(
    "Duplicate route",
  );
});
test("rejects dangling, self and cyclic prerequisites", () => {
  expect(() => validateGraph([item({ prerequisites: ["missing"] })])).toThrow(
    "unknown",
  );
  expect(() => validateGraph([item({ prerequisites: ["one"] })])).toThrow(
    "self",
  );
  expect(() =>
    validateGraph([
      item({ prerequisites: ["two"] }),
      item({ id: "two", slug: "two", prerequisites: ["one"] }),
    ]),
  ).toThrow("cycle");
});
test("rejects published edges to drafts", () =>
  expect(() =>
    validateGraph([
      item({ prerequisites: ["two"] }),
      item({ id: "two", slug: "two", status: "draft" }),
    ]),
  ).toThrow("unpublished"));
test("accepts aliases and rejects collisions", () => {
  expect(validateGraph([item({ aliases: ["/concepts/old"] })])).toHaveLength(1);
  expect(() => validateGraph([item({ aliases: ["/concepts/one"] })])).toThrow(
    "collision",
  );
});
