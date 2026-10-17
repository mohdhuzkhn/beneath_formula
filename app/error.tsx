"use client";
import Link from "../components/Link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>Something interrupted this page.</h1>
      <button onClick={reset}>Try again</button>
      <Link prefetch={false} href="/">
        Return home
      </Link>
    </>
  );
}
