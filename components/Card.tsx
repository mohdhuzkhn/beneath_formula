import Link from "./Link";
import type { Article } from "../lib/schema";
import { route } from "../lib/content";
import { labels } from "../lib/taxonomy";
import { Highlight } from "./Highlight";
export function Card({ item, query }: { item: Article; query?: string }) {
  return (
    <article className="card">
      <p className="eyebrow">
        {labels[item.kind]}
        {item.demo ? " · Demonstration" : ""}
      </p>
      <h2>
        <Link prefetch={false} href={route(item)}>
          <Highlight text={item.title} query={query} />
        </Link>
      </h2>
      <p>
        <Highlight text={item.summary} query={query} />
      </p>
      <div>
        {item.levels.map((l) => (
          <Link prefetch={false} href={`/levels/${l}`} className="chip" key={l}>
            {l}
          </Link>
        ))}
      </div>
      <Link prefetch={false} className="card-link" href={route(item)}>
        Explore the idea <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
