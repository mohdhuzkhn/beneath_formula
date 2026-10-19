import { test, expect } from "@playwright/test";
import { published, route } from "../../lib/content";
import { staticRoutes } from "../../lib/validation";
test("published route and internal link crawl", async ({ request }, info) => {
  test.setTimeout(90000);
  const checked = new Set<string>();
  test.skip(
    info.project.name !== "desktop",
    "One HTTP crawl is independent of viewport",
  );
  for (const path of [...staticRoutes, ...published().map(route)]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html, path).not.toContain("Private-draft-sentinel");
    expect(html, path).toContain("<h1");
    const links = [...html.matchAll(/href="(\/(?!\/)[^"?#]*)/g)]
      .map((m) => m[1])
      .filter((h) => !h.startsWith("/_next/") && !h.endsWith(".svg"));
    for (const link of new Set(links)) {
      if (checked.has(link)) continue;
      const target = await request.get(link);
      expect(target.status(), `${path} → ${link}`).toBeLessThan(400);
      checked.add(link);
    }
  }
});
