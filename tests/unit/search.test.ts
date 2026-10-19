import { expect, test } from "vitest";
import { allContent, published } from "../../lib/content";
import { buildIndex, search, normalize } from "../../lib/search";
test("only published content enters search", () => {
  expect(buildIndex(allContent()).some((i) => i.id === "draft-gradient")).toBe(
    false,
  );
  expect(published()).toHaveLength(7);
});
test("rank titles and recognize synonyms", () => {
  expect(
    search(buildIndex(allContent()), {
      q: "differentiation",
    })[0].title.toLowerCase(),
  ).toContain("derivative");
  expect(normalize("π")).toBe("pi");
});
test("filters intersect, preserve Unicode and handle empty/malicious input", () => {
  expect(search(buildIndex(allContent()), { level: "IX" })).toEqual([]);
  expect(search([], { q: "<script>alert(1)</script>" })).toEqual([]);
  expect(normalize("شرح")).toBe("شرح");
  expect(
    search(buildIndex(allContent()), { kind: "lab", level: "XII" }),
  ).toHaveLength(1);
});
