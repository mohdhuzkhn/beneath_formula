const base = process.env.TEST_BASE_URL;
if (!base) throw new Error("Set TEST_BASE_URL to the verified deployment URL");
for (const path of [
  "/",
  "/health",
  "/explore",
  "/concepts/what-is-a-derivative",
  "/lab/secant-to-tangent",
  "/sitemap.xml",
  "/robots.txt",
]) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 200)
    throw new Error(`${path}: HTTP ${response.status}`);
  const text = await response.text();
  if (text.includes("Private-draft-sentinel")) throw new Error("Draft leakage");
  console.log(`${response.status} ${path}`);
}
const draft = await fetch(new URL("/concepts/gradient-notes", base));
if (draft.status !== 404) throw new Error("Draft route must be 404");
console.log("Deployment smoke passed; draft route is 404.");
export {};
