import Link from "./Link";
export function Heading({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string;
  title: string;
  summary?: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {summary && <p className="lede">{summary}</p>}
    </header>
  );
}
export function Breadcrumbs({
  title,
  section,
  href,
}: {
  title: string;
  section?: string;
  href?: string;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link prefetch={false} href="/">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      {section && href && (
        <>
          <Link prefetch={false} href={href}>
            {section}
          </Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="empty">
      <p>{children}</p>
      <Link prefetch={false} href="/explore">
        Explore available demonstrations →
      </Link>
    </div>
  );
}
