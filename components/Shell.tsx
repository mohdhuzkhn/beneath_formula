import Link from "./Link";
import { site } from "../lib/site";
import { ThemeControls } from "./ThemeControls";
export const navigation = [
  ["Explore", "/explore"],
  ["Learning paths", "/paths"],
  ["Visual lab", "/lab"],
  ["Math to AI", "/math-to-ai"],
  ["Inquiry", "/inquiry"],
  ["Lectures", "/lectures"],
] as const;
function Navigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className="navigation" aria-label="Main">
      {navigation.map(([label, url]) => (
        <Link key={url} href={url}>
          {label}
        </Link>
      ))}
      {mobile && <Link href="/search">Search</Link>}
    </nav>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="masthead">
        <Link className="brand" href="/">
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
          <ThemeControls />
          <details className="mobile-menu">
            <summary>Menu</summary>
            <Navigation mobile />
          </details>
        </div>
        <div className="desktop-navigation">
          <Navigation />
        </div>
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
    </>
  );
}
