import { published, route } from "./content";
import { staticRoutes } from "./validation";

const publicPaths = new Set([...staticRoutes, ...published().map(route)]);

export function isTrackablePath(value: unknown): value is string {
  return typeof value === "string" && publicPaths.has(value);
}
