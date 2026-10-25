"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Stats = { enabled: boolean; views: number; followers: number };
const visitorKey = "btf-visitor-id";
const followedKey = "btf-following";

function visitorId() {
  let id = localStorage.getItem(visitorKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(visitorKey, id);
  }
  return id;
}

async function readStats(path: string) {
  const response = await fetch(
    `/api/engagement?path=${encodeURIComponent(path)}`,
    {
      cache: "no-store",
    },
  );
  return response.ok ? ((await response.json()) as Stats) : null;
}

export function EngagementTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (sessionStorage.getItem(`btf-viewed:${pathname}`)) return;
    sessionStorage.setItem(`btf-viewed:${pathname}`, "1");
    void fetch("/api/engagement/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    });
  }, [pathname]);
  return null;
}

export function FollowButton() {
  const pathname = usePathname();
  const [stats, setStats] = useState<Stats | null>(null);
  const [following, setFollowing] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setFollowing(localStorage.getItem(followedKey) === "true");
    void readStats(pathname).then(setStats);
  }, [pathname]);

  async function startFollowing() {
    setPending(true);
    try {
      const response = await fetch("/api/engagement/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorId() }),
      });
      if (!response.ok) throw new Error("Follow unavailable");
      const result = (await response.json()) as {
        followers: number;
        alreadyFollowing: boolean;
      };
      localStorage.setItem(followedKey, "true");
      setFollowing(true);
      setStats((current) => ({
        enabled: true,
        views: current?.views ?? 0,
        followers: result.followers,
      }));
      setNotice(
        result.alreadyFollowing
          ? "You are already following new work."
          : "You are following new work.",
      );
    } catch {
      setNotice("Following is being set up. Please try again later.");
    } finally {
      setPending(false);
    }
  }

  if (!stats?.enabled)
    return (
      <p className="engagement-unavailable">Follow updates will open soon.</p>
    );

  return (
    <aside className="follow-card" aria-label="Follow Beneath the Formula">
      <p className="eyebrow">STAY WITH THE QUESTIONS</p>
      <h2>Follow new work</h2>
      <p>
        {stats.followers.toLocaleString()} reader
        {stats.followers === 1 ? " is" : "s are"} following the next article or
        video.
      </p>
      <button
        type="button"
        onClick={startFollowing}
        disabled={following || pending}
      >
        <span aria-hidden="true">{following ? "✓" : "♢"}</span>
        {following ? "Following" : pending ? "Following…" : "Follow updates"}
      </button>
      <p className="fine" role="status">
        {notice ||
          "One anonymous follow per browser. No email address is collected."}
      </p>
    </aside>
  );
}

export function ViewCount({ path }: { path: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    void readStats(path).then(setStats);
  }, [path]);
  if (!stats?.enabled) return null;
  return (
    <p className="engagement-count" aria-live="polite">
      {stats.views.toLocaleString()} {stats.views === 1 ? "view" : "views"}
    </p>
  );
}
