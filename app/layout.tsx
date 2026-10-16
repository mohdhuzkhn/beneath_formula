import type { Metadata } from "next";
import "./globals.css";
import 'katex/dist/katex.min.css';
import {Shell} from '../components/Shell';
export const metadata: Metadata = {
  title: "Beneath the Formula",
  description: "Beyond formulas. Understand the why.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Shell><main id="main">{children}</main></Shell>
      </body>
    </html>
  );
}
