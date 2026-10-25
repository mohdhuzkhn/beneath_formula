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
