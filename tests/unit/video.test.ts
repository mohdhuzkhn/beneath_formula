import { expect, test } from "vitest";
import { youtubeUrl } from "../../lib/video";
test("privacy enhanced embeds and timestamp fallback", () => {
  expect(youtubeUrl("abcdefghijk", 10, true)).toBe(
    "https://www.youtube-nocookie.com/embed/abcdefghijk?start=10&rel=0",
  );
  expect(youtubeUrl("abcdefghijk", 10)).toContain("&t=10s");
});
test.each(["bad", "https://evil.test", "abc<script>"])(
  "rejects invalid video identifiers %s",
  (id) => expect(() => youtubeUrl(id)).toThrow(),
);
test("rejects invalid times", () =>
  expect(() => youtubeUrl("abcdefghijk", -1)).toThrow());
