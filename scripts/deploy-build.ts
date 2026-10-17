import { execFileSync } from "node:child_process";
import path from "node:path";
const tsx = path.resolve("node_modules/tsx/dist/cli.mjs");
if (process.env.VERCEL_ENV === "production")
  execFileSync(process.execPath, [tsx, "scripts/release-check.ts"], {
    stdio: "inherit",
  });
execFileSync(process.execPath, [tsx, "scripts/validate.ts"], {
  stdio: "inherit",
});
execFileSync(
  process.execPath,
  [path.resolve("node_modules/next/dist/bin/next"), "build"],
  { stdio: "inherit" },
);
