"use client";
import dynamic from "next/dynamic";
const Lab = dynamic(() => import("./Lab"), {
  loading: () => (
    <p>
      Loading interactive controls. The explanation below remains available.
    </p>
  ),
  ssr: false,
});
export function LazyLab() {
  return (
    <>
      <Lab />
      <noscript>
        The square function has secant slope 2x+h and derivative 2x. The
        constant function has slope zero. At x=0, |x| has no two-sided
        derivative. Enable JavaScript to operate the controls.
      </noscript>
    </>
  );
}
