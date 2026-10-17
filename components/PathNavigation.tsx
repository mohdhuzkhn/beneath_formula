import Link from "./Link";
import { published, route } from "../lib/content";
export function PathNavigation({ id }: { id: string }) {
  const items = published();
  return (
    <>
      {items
        .filter(
          (i) => i.kind === "learning_path" && i.orderedContentIds.includes(id),
        )
        .map((path) => {
          if (path.kind !== "learning_path") return null;
          const position = path.orderedContentIds.indexOf(id);
          const prev = items.find(
            (i) => i.id === path.orderedContentIds[position - 1],
          );
          const next = items.find(
            (i) => i.id === path.orderedContentIds[position + 1],
          );
          return (
            <nav
              className="connections"
              aria-label={`Continue ${path.title}`}
              key={path.id}
            >
              <p>
                In{" "}
                <Link prefetch={false} href={route(path)}>
                  {path.title}
                </Link>
              </p>
              <div className="actions">
                {prev && (
                  <Link prefetch={false} href={route(prev)}>
                    ← Previous: {prev.title}
                  </Link>
                )}
                {next && (
                  <Link prefetch={false} href={route(next)}>
                    Next: {next.title} →
                  </Link>
                )}
              </div>
            </nav>
          );
        })}
    </>
  );
}
