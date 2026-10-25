import { expect, test } from "vitest";
import { isTrackablePath } from "../../lib/engagement-routes";

test("engagement accepts published and static routes only", () => {
  expect(isTrackablePath("/")).toBe(true);
  expect(isTrackablePath("/concepts/what-is-a-derivative")).toBe(true);
  expect(isTrackablePath("/concepts/gradient-notes")).toBe(false);
  expect(isTrackablePath("/not-a-route")).toBe(false);
  expect(isTrackablePath("/explore?query=derivative")).toBe(false);
});
