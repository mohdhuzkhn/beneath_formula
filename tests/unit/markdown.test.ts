import { expect, test } from "vitest";
import { inspectMarkdown } from "../../lib/markdown";
test("math, Unicode headings and explicit anchors", () => {
  const result = inspectMarkdown(
    '## شرح\n\n$x^2$\n\n<Proof id="proof">\nTrue.\n</Proof>',
  );
  expect(result.ids).toContain("شرح");
  expect(result.ids).toContain("proof");
});
test.each([
  'import x from "x"',
  "{process.env.SECRET}",
  "<script>bad</script>",
  '<Proof title={"bad"}>x</Proof>',
  "[bad](javascript:alert)",
  "![](https://example.org/a.png)",
  "$\\invalidcommand{x}$",
])("rejects unsafe or invalid source %s", (source) =>
  expect(() => inspectMarkdown(source)).toThrow(),
);
test("duplicate headings receive unique anchors", () =>
  expect(inspectMarkdown("## Same\n\n## Same").ids).toEqual([
    "same",
    "same-1",
  ]));
