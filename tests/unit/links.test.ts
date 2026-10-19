import { expect, test } from "vitest";
import { allContent } from "../../lib/content";
import { validateContent } from "../../lib/validation";
const fixture = (body: string) => ({
  ...allContent().find((i) => i.id === "limits")!,
  body,
});
test.each([
  "[broken](/concepts/missing)",
  "[citation](#ref-missing)",
  "[anchor](#absent)",
  "![Plot](/images/missing.svg)",
  "<InteractiveLab />",
  "<VideoLesson />",
])("broken content dependency rejects %s", (body) =>
  expect(() => validateContent([fixture(body)])).toThrow(),
);
test("reserved route cannot be shadowed by alias", () =>
  expect(() =>
    validateContent([{ ...fixture("## Text"), aliases: ["/about"] }]),
  ).toThrow("principal"));
