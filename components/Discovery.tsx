import Link from "./Link";
import { published } from "../lib/content";
import { buildIndex, search, type Filters } from "../lib/search";
import { subjects, levels, depths, kinds, tags, labels } from "../lib/taxonomy";
import { Card } from "./Card";
import { Empty } from "./Editorial";
export function Discovery({
  filters,
  action = "/explore",
  allowedKinds,
}: {
  filters: Filters;
  action?: string;
  allowedKinds?: string[];
}) {
  const all = published().filter(
    (i) => !allowedKinds || allowedKinds.includes(i.kind),
  );
  const results = search(buildIndex(all), filters);
  return (
    <>
      <form className="filters" action={action} method="get" role="search">
        <label>
          Search ideas
          <input
            id="search-query"
            type="search"
            name="q"
            maxLength={200}
            defaultValue={filters.q}
            placeholder="Try derivative or limits"
          />
        </label>
        {(
          [
            ["subject", "Subject", subjects],
            ["level", "Level", levels],
            ["depth", "Depth", depths],
            ["kind", "Content type", allowedKinds || kinds],
            ["tag", "Tag", tags],
          ] as const
        ).map(([name, label, values]) => (
          <label key={name}>
            {label}
            <select name={name} defaultValue={filters[name] || ""}>
              <option value="">All</option>
              {values.map((v) => (
                <option key={v} value={v}>
                  {v.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button type="submit">Find ideas</button>
        <Link prefetch={false} href={action}>
          Reset
        </Link>
      </form>
      <p role="status">
        {results.length} {results.length === 1 ? "idea" : "ideas"}
        {filters.q ? ` matching “${filters.q.slice(0, 200)}”` : ""}
      </p>
      <div className="grid">
        {results.map((r) => (
          <Card
            key={r.id}
            item={all.find((i) => i.id === r.id)!}
            query={filters.q}
          />
        ))}
      </div>
      {results.length === 0 && (
        <Empty>
          No matching published ideas. Try fewer filters or a broader
          mathematical term.
        </Empty>
      )}
      <p className="fine">
        Search covers published {Object.keys(labels).length} content types.
        Drafts are excluded.
      </p>
    </>
  );
}
