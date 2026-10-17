import { site } from "./site";
import { route } from "./content";
import type { Article } from "./schema";
export const safeJson = (data: unknown) =>
  JSON.stringify(data).replaceAll("<", "\\u003c");
export function articleData(item: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.summary,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt || item.publishedAt,
    author: { "@type": "Person", name: site.author },
    url: new URL(route(item), site.url).href,
  };
}
export function breadcrumbData(item: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ["Home", "/"],
      ["Explore", "/explore"],
      [item.title, route(item)],
    ].map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: new URL(url, site.url).href,
    })),
  };
}
