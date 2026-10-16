"use client";
import Link from "next/link";
import { ThemeProvider, useTheme } from "next-themes";
import { useState } from "react";
import { site } from "../lib/site";
export const navigation = [
  ["Explore", "/explore"],
  ["Learning paths", "/paths"],
  ["Visual lab", "/lab"],
  ["Math to AI", "/math-to-ai"],
  ["Inquiry", "/inquiry"],
  ["Lectures", "/lectures"],
] as const;
function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      className="quiet"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      ◐ <span>Theme</span>
    </button>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider attribute="data-theme">
      <header className="masthead">
        <Link className="brand" href="/" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            ƒ
          </span>
          <span>
            {site.name}
            <small>A MATHEMATICAL EXPLORATION</small>
          </span>
        </Link>
        <div className="header-tools">
          <Link href="/search">Search ↗</Link>
          <ThemeButton />
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
        </div>
        <nav
          id="navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label="Main"
        >
          {navigation.map(([label, url]) => (
            <Link key={url} href={url} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer>
        <div>
          <Link className="footer-brand" href="/">
            {site.name}
          </Link>
          <p>{site.tagline}</p>
          <p>By {site.author}</p>
        </div>
        <nav aria-label="Footer">
          {[
            ["About", "/about"],
            ["Teaching", "/teaching"],
            ["Contact", "/contact"],
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["Copyright", "/copyright"],
          ].map(([label, url]) => (
            <Link key={url} href={url}>
              {label}
            </Link>
          ))}
        </nav>
        <p className="fine">
          An independent mathematical space. Demonstration content is labeled
          and awaits author editorial review.
        </p>
      </footer>
    </ThemeProvider>
  );
}
