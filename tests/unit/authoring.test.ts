import { test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseContent } from "../../lib/content";
test("author CLI produces a valid excluded draft without overwriting files", () => {
  fs.mkdirSync("artifacts", { recursive: true });
  const dir = fs.mkdtempSync(path.resolve("artifacts/author-"));
  const cli = path.resolve("scripts/content-new.ts");
  const tsx = path.resolve("node_modules/tsx/dist/cli.mjs");
  execFileSync(process.execPath, [tsx, cli, "concept", "workflow-test"], {
    cwd: dir,
  });
  const source = fs.readFileSync(
    path.join(dir, "content/workflow-test.mdx"),
    "utf8",
  );
  expect(parseContent(source).status).toBe("draft");
  expect(() =>
    execFileSync(process.execPath, [tsx, cli, "concept", "workflow-test"], {
      cwd: dir,
      stdio: "pipe",
    }),
  ).toThrow();
}, 30000);
