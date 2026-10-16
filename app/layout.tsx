import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Beneath the Formula",
  description: "Beyond formulas. Understand the why.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
