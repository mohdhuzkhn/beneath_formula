import { execFileSync } from "node:child_process";
import fs from "node:fs";
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split(/\r?\n/)
  .filter(Boolean);
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /AKIA[0-9A-Z]{16}/,
];
const bad = files.filter(
  (f) =>
    !f.includes("package-lock") &&
    fs.existsSync(f) &&
    patterns.some((p) => p.test(fs.readFileSync(f, "utf8"))),
);
if (bad.length) throw new Error(`Potential secrets in: ${bad.join(", ")}`);
console.log(
  `Secret pattern scan passed for ${files.length} source files. This is defense in depth, not a complete secret detector.`,
);
