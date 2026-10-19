import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("home, responsive navigation and theme", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-home-light.png`,
    fullPage: true,
  });
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "formula",
  );
  if (testInfo.project.name === "mobile") {
    await page.locator(".mobile-menu summary").click();
  }
  await expect(
    page.getByRole("navigation", { name: "Main", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    /dark|light/,
  );
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-home.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("school learner reads prerequisites proof and path", async ({ page }) => {
  await page.goto("/paths/second-year-calculus");
  await expect(
    page.getByRole("heading", { name: "Your route through the ideas" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "What is a derivative, really?", exact: true })
    .first()
    .click();
  await expect(page.locator(".katex-mathml").first()).toBeAttached();
  await page
    .getByRole("link", { name: "algebraic proof", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("2x");
  await expect(
    page.getByRole("navigation", { name: "On this page" }),
  ).toBeVisible();
});

test("dark inquiry contrast and magnified desktop reading", async ({
  page,
}, info) => {
  await page.goto("/inquiry/secant-error-study");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  if (info.project.name === "desktop") {
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
});
test("search URL filters and empty state", async ({ page }) => {
  await page.goto("/search");
  await page.getByLabel("Search ideas").fill("differentiation");
  await page.getByRole("button", { name: "Find ideas" }).click();
  await expect(page).toHaveURL(/q=differentiation/);
  await expect(
    page.getByRole("heading", { name: "What is a derivative, really?" }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Level", exact: true })
    .selectOption("IX");
  await page.getByRole("button", { name: "Find ideas" }).click();
  await expect(page.getByRole("status")).toContainText("0 ideas");
  await page.goto("/search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E");
  await expect(page.getByRole("status")).toContainText("0 ideas");
});
test("lab changes slopes resets and explains cusp", async ({
  page,
}, testInfo) => {
  await page.goto("/lab/secant-to-tangent");
  await expect(page.getByRole("status")).toContainText("2.5000");
  await page.getByRole("button", { name: "Halve the step" }).click();
  await expect(page.getByRole("status")).toContainText("2.2500");
  await page
    .getByRole("combobox", { name: "Function", exact: true })
    .selectOption("absolute");
  const base = page.getByRole("slider", { name: /Base point x/ });
  await base.focus();
  await base.press("Home");
  for (let i = 0; i < 20; i++) await base.press("ArrowRight");
  await expect(page.getByRole("status")).toContainText("No derivative");
  await page
    .getByRole("combobox", { name: "Approach direction" })
    .selectOption("-1");
  await expect(page.getByRole("status")).toContainText("-1.0000");
  await page.getByRole("button", { name: "Reset experiment" }).click();
  await expect(page.getByRole("status")).toContainText("2.5000");
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-lab.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("lecture placeholder makes no unsolicited video connection", async ({
  page,
}) => {
  const thirdParty: string[] = [];
  page.on("request", (r) => {
    if (/youtube|ytimg|googlevideo/.test(r.url())) thirdParty.push(r.url());
  });
  await page.goto("/lectures/derivative-companion");
  await expect(
    page.getByRole("heading", { name: "Lecture awaiting an approved video" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(thirdParty).toEqual([]);
});
test("reviewer sees inquiry limits and truthful profile", async ({ page }) => {
  await page.goto("/inquiry/secant-error-study");
  await expect(
    page.getByText("Not peer reviewed", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Limitations", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Revisions & corrections" }),
  ).toBeVisible();
  await page.goto("/teaching");
  await expect(
    page.getByText(/Verified experience, qualifications and a CV/),
  ).toBeVisible();
  await page.goto("/contact");
  await expect(
    page.getByText(/contact address has not yet been configured/),
  ).toBeVisible();
  await page.goto("/math-to-ai");
  await expect(
    page.getByRole("link", { name: "Explore a derivative" }),
  ).toBeVisible();
});
test("draft exclusion, redirect, sitemap and security headers", async ({
  request,
}) => {
  const draft = await request.get("/concepts/gradient-notes");
  expect(draft.status()).toBe(404);
  const missing = await request.get("/concepts/not-real");
  expect(missing.status()).toBe(404);
  const map = await request.get("/sitemap.xml");
  expect(await map.text()).not.toContain("gradient-notes");
  const index = await request.get("/search-index.json");
  expect(await index.text()).not.toContain("Private-draft-sentinel");
  const old = await request.get("/concepts/derivative-intuition", {
    maxRedirects: 0,
  });
  expect(old.status()).toBe(308);
  expect(old.headers()["location"]).toBe("/concepts/what-is-a-derivative");
  const home = await request.get("/");
  expect(home.headers()["content-security-policy"]).toContain(
    "object-src 'none'",
  );
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
});
test("critical accessibility and article overflow", async ({
  page,
}, testInfo) => {
  for (const url of [
    "/",
    "/explore",
    "/concepts/what-is-a-derivative",
    "/lab/secant-to-tangent",
    "/inquiry/secant-error-study",
  ]) {
    await page.goto(url);
    if (url.includes("/lab/"))
      await expect(page.getByRole("status")).toBeVisible();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations,
      `${url}: ${JSON.stringify(scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      url,
    ).toBe(true);
  }
  await page.goto("/concepts/what-is-a-derivative");
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-article.png`,
    fullPage: true,
  });
});
test("keyboard skip link and no-JS search", async ({ page, browser }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const nojs = await context.newPage();
  await nojs.goto("http://localhost:3000/explore?q=derivative");
  await expect(
    nojs.getByRole("heading", { name: "What is a derivative, really?" }),
  ).toBeVisible();
  await context.close();
});
