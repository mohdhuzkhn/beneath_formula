import type { MetadataRoute } from "next";
import { site } from "../lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.VERCEL_ENV === "production"
        ? { allow: "/", disallow: "/search" }
        : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
