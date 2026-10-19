import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import fs from "node:fs";
import path from "node:path";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
fs.mkdirSync("artifacts", { recursive: true });
const runs = Number(process.env.PERF_RUNS || 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 5)
  throw new Error("PERF_RUNS must be 1–5");
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : undefined),
  chromeFlags: ["--headless", "--no-sandbox"],
  port: 9223,
  userDataDir: fs.mkdtempSync(path.resolve("artifacts/lighthouse-profile-")),
});
try {
  const results = [];
  for (const [name, path] of [
    ["home", "/"],
    ["article", "/concepts/what-is-a-derivative"],
    ["lab", "/lab/secant-to-tangent"],
  ]) {
    if (process.env.PERF_PAGE && process.env.PERF_PAGE !== name) continue;
    for (let run = 1; run <= runs; run++) {
      const result = await lighthouse(base + path, {
        port: chrome.port,
        output: ["json", "html"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        logLevel: "error",
      });
      if (!result) throw new Error("No Lighthouse result");
      fs.writeFileSync(
        `artifacts/lighthouse-${name}-${run}.json`,
        result.report[0],
      );
      fs.writeFileSync(
        `artifacts/lighthouse-${name}-${run}.html`,
        result.report[1],
      );
      const scores = Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [
          k,
          Math.round((v.score || 0) * 100),
        ]),
      );
      results.push({
        name,
        run,
        scores,
        lcp: result.lhr.audits["largest-contentful-paint"].numericValue,
        cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
      });
      console.log(name, run, scores);
    }
  }
  fs.writeFileSync(
    "artifacts/performance-summary.json",
    JSON.stringify(results, null, 2),
  );
  if (
    [...new Set(results.map((r) => r.name))].some((name) =>
      ["performance", "accessibility", "best-practices"].some((category) => {
        const values = results
          .filter((r) => r.name === name)
          .map((r) => r.scores[category])
          .sort((a, b) => a - b);
        return values[Math.floor(values.length / 2)] < 90;
      }),
    )
  )
    process.exitCode = 1;
} finally {
  await chrome.kill();
}
