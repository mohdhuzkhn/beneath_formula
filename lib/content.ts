import fs from "node:fs";
import path from "node:path";
import { contentSchema, type Article } from "./schema";
import { sections } from "./taxonomy";
export const route = (item: Pick<Article, "kind" | "slug">) =>
  `/${sections[item.kind]}/${item.slug}`;
export function parseContent(source: string, file = "fixture.mdx"): Article {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match)
    throw new Error(`${file}: expected JSON frontmatter between --- lines`);
  return { ...contentSchema.parse(JSON.parse(match[1])), body: match[2], file };
}
export function validateGraph(items: Article[]) {
  const byId = new Map<string, Article>();
  const paths = new Set<string>();
  const slugs = new Set<string>();
  for (const item of items) {
    if (byId.has(item.id)) throw new Error(`Duplicate ID: ${item.id}`);
    if (paths.has(route(item)))
      throw new Error(`Duplicate route: ${route(item)}`);
    if (slugs.has(item.slug)) throw new Error(`Duplicate slug: ${item.slug}`);
    slugs.add(item.slug);
    byId.set(item.id, item);
    paths.add(route(item));
  }
  for (const item of items) {
    for (const alias of item.aliases) {
      if (paths.has(alias)) throw new Error(`Alias collision: ${alias}`);
      paths.add(alias);
    }
    const links = [
      ...item.prerequisites,
      ...item.connections.map((c) => c.target),
      ...item.labIds,
      ...item.videoIds,
      ...(item.kind === "learning_path"
        ? [...item.orderedContentIds, ...item.optionalBranches]
        : []),
    ];
    for (const link of links) {
      const target = byId.get(link);
      if (!target) throw new Error(`${item.id}: unknown ID ${link}`);
      if (link === item.id) throw new Error(`${item.id}: self relationship`);
      if (item.status === "published" && target.status !== "published")
        throw new Error(
          `${item.id}: public relationship to unpublished ${link}`,
        );
    }
    for (const link of item.labIds)
      if (byId.get(link)?.kind !== "lab")
        throw new Error("labIds must target labs");
    for (const link of item.videoIds)
      if (byId.get(link)?.kind !== "lecture")
        throw new Error("videoIds must target lectures");
    if (
      item.kind === "learning_path" &&
      new Set(item.orderedContentIds).size !== item.orderedContentIds.length
    )
      throw new Error("Duplicate path step");
    if (
      new Set(item.references.map((r) => r.id)).size !== item.references.length
    )
      throw new Error("Duplicate reference ID");
  }
  const active = new Set<string>(),
    done = new Set<string>();
  function visit(id: string) {
    if (active.has(id)) throw new Error(`Prerequisite cycle at ${id}`);
    if (done.has(id)) return;
    active.add(id);
    for (const p of byId.get(id)!.prerequisites) visit(p);
    active.delete(id);
    done.add(id);
  }
  for (const item of items) visit(item.id);
  for (const item of items)
    if (item.kind === "learning_path") {
      const position = new Map(item.orderedContentIds.map((id, i) => [id, i]));
      for (const [id, i] of position)
        for (const p of byId.get(id)!.prerequisites) {
          const pi = position.get(p);
          if (pi !== undefined && pi >= i)
            throw new Error(`Path prerequisite out of order: ${p}`);
        }
    }
  return items;
}
export function allContent(): Article[] {
  const dir = path.join(process.cwd(), "content");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => f.endsWith(".mdx"));
  return validateGraph(
    files.map((f) =>
      parseContent(fs.readFileSync(path.join(dir, f), "utf8"), f),
    ),
  );
}
export const published = () =>
  allContent().filter((item) => item.status === "published");
export const byId = (id: string) => published().find((item) => item.id === id);
export const readingTime = (body: string) =>
  Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
