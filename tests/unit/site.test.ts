import { expect, test } from "vitest";
import { site } from "../../lib/site";
test("safe local defaults without credentials", () => {
  expect(site.name).toBeTruthy();
  expect(new URL(site.url).protocol).toMatch(/^https?:$/);
  expect(site.email).toBe("");
});
