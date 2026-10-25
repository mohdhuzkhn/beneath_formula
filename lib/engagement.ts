import { createHmac } from "node:crypto";
import postgres, { type Sql } from "postgres";

type CountRow = { count: string | number };

let client: Sql | undefined;

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  client ??= postgres(url, { max: 1, prepare: false, idle_timeout: 20 });
  return client;
}

export function engagementEnabled() {
  return Boolean(process.env.DATABASE_URL && process.env.ENGAGEMENT_SECRET);
}

function count(value: CountRow | undefined) {
  return value ? Number(value.count) : 0;
}

function visitorHash(visitorId: string) {
  const secret = process.env.ENGAGEMENT_SECRET;
  if (!secret) throw new Error("ENGAGEMENT_SECRET is not configured");
  return createHmac("sha256", secret).update(visitorId).digest("hex");
}

export async function engagementCounts(path: string) {
  const sql = database();
  if (!sql) return { enabled: false, views: 0, followers: 0 };
  const [views, followers] = await Promise.all([
    sql<
      CountRow[]
    >`SELECT count FROM engagement_page_views WHERE path = ${path}`,
    sql<
      CountRow[]
    >`SELECT count FROM engagement_followers WHERE singleton = true`,
  ]);
  return {
    enabled: engagementEnabled(),
    views: count(views[0]),
    followers: count(followers[0]),
  };
}

export async function recordView(path: string) {
  const sql = database();
  if (!sql || !engagementEnabled()) return null;
  const [row] = await sql<CountRow[]>`
    INSERT INTO engagement_page_views (path, count, updated_at)
    VALUES (${path}, 1, now())
    ON CONFLICT (path) DO UPDATE SET count = engagement_page_views.count + 1, updated_at = now()
    RETURNING count
  `;
  return count(row);
}

export async function follow(visitorId: string) {
  const sql = database();
  if (!sql || !engagementEnabled()) return null;
  const hash = visitorHash(visitorId);
  const inserted = await sql.begin(async (transaction) => {
    const rows = await transaction.unsafe<{ visitor_hash: string }[]>(
      `
      INSERT INTO engagement_follower_visitors (visitor_hash) VALUES ($1)
      ON CONFLICT (visitor_hash) DO NOTHING
      RETURNING visitor_hash
    `,
      [hash],
    );
    if (rows.length) {
      await transaction.unsafe(`
        INSERT INTO engagement_followers (singleton, count, updated_at)
        VALUES (true, 1, now())
        ON CONFLICT (singleton) DO UPDATE SET count = engagement_followers.count + 1, updated_at = now()
      `);
    }
    return rows.length > 0;
  });
  const rows = await sql<CountRow[]>`
    SELECT count FROM engagement_followers WHERE singleton = true
  `;
  return { followers: count(rows[0]), alreadyFollowing: !inserted };
}
