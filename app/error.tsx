"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>Something interrupted this page.</h1>
      <button onClick={reset}>Try again</button>
      <Link href="/">Return home</Link>
    </>
  );
}
