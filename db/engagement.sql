CREATE TABLE IF NOT EXISTS engagement_page_views (
  path TEXT PRIMARY KEY CHECK (path ~ '^/[^?]*$'),
  count BIGINT NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS engagement_followers (
  singleton BOOLEAN PRIMARY KEY DEFAULT true CHECK (singleton),
  count BIGINT NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS engagement_follower_visitors (
  visitor_hash CHAR(64) PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- These tables are queried only by the server-side Next.js API. The Supabase
-- Data API receives no grants for anonymous or authenticated browser roles.
ALTER TABLE engagement_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_follower_visitors ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE engagement_page_views FROM anon, authenticated;
REVOKE ALL ON TABLE engagement_followers FROM anon, authenticated;
REVOKE ALL ON TABLE engagement_follower_visitors FROM anon, authenticated;
