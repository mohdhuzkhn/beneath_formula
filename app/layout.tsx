import { site } from "../lib/site";
import { safeJson } from "../lib/seo";
import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "../components/Shell";
import { EngagementTracker } from "../components/Engagement";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.tagline,
  alternates: { canonical: "/" },
  openGraph: { title: site.name, description: site.tagline, type: "website" },
  twitter: { card: "summary_large_image" },
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme='light'}",
          }}
        />
      </head>
      <body>
        <EngagementTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJson({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              author: { "@type": "Person", name: site.author },
            }),
          }}
        />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Shell>
          <main id="main">{children}</main>
        </Shell>
      </body>
    </html>
  );
}
