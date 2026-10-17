import fs from "node:fs";
import path from "node:path";
import { allContent, route, validateGraph } from "./content";
import type { Article } from "./schema";
import { inspectMarkdown } from "./markdown";
import { subjects, levels } from "./taxonomy";
export const staticRoutes = [
  "/",
  "/explore",
  "/paths",
  "/lab",
  "/math-to-ai",
  "/inquiry",
  "/lectures",
  "/about",
  "/teaching",
  "/search",
  "/contact",
  "/privacy",
  "/terms",
  "/copyright",
  ...subjects.map((s) => `/subjects/${s}`),
  ...levels.map((l) => `/levels/${l}`),
];
export function validateContent(input?: Article[]) {
  const items = input ? validateGraph(input) : allContent();
  const publicRoutes = new Set([
    ...staticRoutes,
    ...items
      .filter((i) => i.status === "published")
      .flatMap((i) => [route(i), ...i.aliases]),
  ]);
  const inspected = new Map(
    items.map((i) => [route(i), inspectMarkdown(i.body)]),
  );
  for (const item of items) {
    if (item.aliases.some((a) => staticRoutes.includes(a)))
      throw new Error("Alias collides with a principal route");
    if (
      item.body.includes("<InteractiveLab") &&
      item.kind !== "lab" &&
      !item.labIds.length
    )
      throw new Error("Embedded lab requires a lab relationship");
    if (
      item.body.includes("<VideoLesson") &&
      item.kind !== "lecture" &&
      !item.videoIds.length
    )
      throw new Error("Embedded video requires a lecture relationship");
    const own = inspected.get(route(item))!;
    for (const link of own.links) {
      if (link.startsWith("https:") || link.startsWith("mailto:")) continue;
      const [target, hash] = link.split("#");
      const targetPath = target.split("?")[0] || route(item);
      if (targetPath.startsWith("/images/")) {
        const asset = path.resolve("public", targetPath.slice(1));
        if (
          !asset.startsWith(path.resolve("public") + path.sep) ||
          !fs.existsSync(asset)
        )
          throw new Error(`Missing asset ${link}`);
        continue;
      }
      if (!publicRoutes.has(targetPath) && targetPath !== route(item))
        throw new Error(`Broken internal link: ${item.id} → ${link}`);
      if (hash) {
        const targetItem = items.find(
          (i) => route(i) === targetPath || i.aliases.includes(targetPath),
        );
        const anchors = [
          ...(inspected.get(targetItem ? route(targetItem) : targetPath)?.ids ??
            []),
          ...(targetItem?.references.map((r) => `ref-${r.id}`) ?? []),
        ];
        if (!anchors.includes(hash)) throw new Error(`Missing anchor: ${link}`);
      }
    }
  }
  return items;
}
