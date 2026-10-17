export const presets = {
  square: "x²",
  constant: "3",
  absolute: "|x|",
} as const;
export type Preset = keyof typeof presets;
export function value(p: Preset, x: number) {
  return p === "square" ? x * x : p === "constant" ? 3 : Math.abs(x);
}
export function derivative(p: Preset, x: number): number | null {
  return p === "square"
    ? 2 * x
    : p === "constant"
      ? 0
      : x === 0
        ? null
        : Math.sign(x);
}
export function secant(p: Preset, x: number, h: number) {
  if (
    !Number.isFinite(x) ||
    !Number.isFinite(h) ||
    Math.abs(x) > 2 ||
    Math.abs(h) > 2 ||
    Math.abs(h) < 0.001
  )
    throw new RangeError("Use x in [-2,2] and 0.001 ≤ |h| ≤ 2.");
  return p === "square"
    ? 2 * x + h
    : p === "constant"
      ? 0
      : (Math.abs(x + h) - Math.abs(x)) / h;
}
