import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("Set DATABASE_URL before running database migration");
const sql = postgres(url, { max: 1, prepare: false });
try {
  await sql.unsafe(
    fs.readFileSync(path.join(process.cwd(), "db", "engagement.sql"), "utf8"),
  );
  console.log("Engagement database migration completed.");
} finally {
  await sql.end();
}
