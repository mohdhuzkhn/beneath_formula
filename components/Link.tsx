import type { ComponentProps } from "react";
// Native navigation keeps the reading experience independent of router hydration.
// The prefetch prop is accepted for call-site compatibility but never reaches HTML.
export default function Link(
  props: ComponentProps<"a"> & { prefetch?: boolean },
) {
  const attributes = { ...props };
  delete attributes.prefetch;
  return <a {...attributes} />;
}
