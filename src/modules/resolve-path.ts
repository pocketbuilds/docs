import { GIT_BRANCH } from "astro:env/server";

export function resolvePath(params: unknown, path: string) {
  void params;
  const resolved = path.replaceAll("[branch]", GIT_BRANCH);
  const base = import.meta.env.BASE_URL;
  if (base !== "/" && resolved.startsWith("/")) {
    return `${base.replace(/\/$/, "")}${resolved}`;
  }
  return resolved;
}
