import type { MetadataRoute } from "next";
import { published, route } from "../lib/content";
import { staticRoutes } from "../lib/validation";
import { site } from "../lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes
      .filter((r) => r !== "/search")
      .map((r) => ({ url: new URL(r, site.url).href })),
    ...published().map((i) => ({
      url: new URL(route(i), site.url).href,
      lastModified: i.updatedAt || i.publishedAt,
    })),
  ];
}
