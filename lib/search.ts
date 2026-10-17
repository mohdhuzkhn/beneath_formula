import type { Article } from "./schema";
import { route } from "./content";
export const normalize = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replaceAll("π", " pi ")
    .replace(/differentiation/g, "derivative")
    .replace(/tangent/g, "secant")
    .replace(/euler[’']?s number/g, " e ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
export function buildIndex(items: Article[]) {
  return items
    .filter((i) => i.status === "published")
    .map((i) => ({
      id: i.id,
      url: route(i),
      title: i.title,
      summary: i.summary,
      kind: i.kind,
      subjects: i.subjects,
      levels: i.levels,
      depths: i.depths,
      tags: i.tags,
      text: normalize(
        `${i.title} ${i.summary} ${i.body.replace(/<[^>]*>/g, " ")} ${i.tags.join(" ")} ${i.subjects.join(" ")} ${"searchAliases" in i ? i.searchAliases.join(" ") : ""}`,
      ),
    }));
}
export type SearchEntry = ReturnType<typeof buildIndex>[number];
export type Filters = {
  q?: string;
  subject?: string;
  level?: string;
  depth?: string;
  kind?: string;
  tag?: string;
};
export function search(index: SearchEntry[], filters: Filters) {
  const terms = normalize((filters.q || "").slice(0, 200))
    .split(" ")
    .filter(Boolean);
  return index
    .filter(
      (i) =>
        (!filters.subject ||
          i.subjects.some(
            (s) => s === filters.subject || s.startsWith(filters.subject + "/"),
          )) &&
        (!filters.level || i.levels.some((l) => l === filters.level)) &&
        (!filters.depth || i.depths.some((d) => d === filters.depth)) &&
        (!filters.kind || i.kind === filters.kind) &&
        (!filters.tag || i.tags.some((t) => t === filters.tag)),
    )
    .map((i) => ({
      item: i,
      score: terms.reduce(
        (s, t) =>
          s + (normalize(i.title).includes(t) ? 5 : i.text.includes(t) ? 1 : 0),
        0,
      ),
    }))
    .filter((r) => !terms.length || terms.every((t) => r.item.text.includes(t)))
    .sort(
      (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
    )
    .map((r) => r.item);
}
