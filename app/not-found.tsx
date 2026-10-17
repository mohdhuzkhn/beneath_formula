import Link from "../components/Link";
export default function NotFound() {
  return (
    <>
      <h1>This page is not here.</h1>
      <p>The address may have changed, or the work may not be published.</p>
      <Link prefetch={false} href="/">
        Return home
      </Link>
    </>
  );
}
