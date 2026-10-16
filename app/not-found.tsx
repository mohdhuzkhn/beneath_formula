import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <h1>This page is not here.</h1>
      <p>The address may have changed, or the work may not be published.</p>
      <Link href="/">Return home</Link>
    </>
  );
}
