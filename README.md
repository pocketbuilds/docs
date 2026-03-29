# PocketBuilds Docs

Public documentation site for PocketBuilds.

## Local development

```bash
pnpm install
pnpm dev
```

## Checks

```bash
pnpm run check
pnpm run build
pnpm run preview
```

## Writing docs

- Documentation lives in `src/content/docs/**`.
- Each page is Markdown/MDX with frontmatter (`title`, `description`).
- Routes do not include `/docs`, and numeric prefixes are stripped from the public URL.
  - Example: `src/content/docs/01-xpb-cli/01-installing-xpb.mdx` → `/xpb-cli/installing-xpb`

## Deployment (GitHub Pages)

This site is configured as a static build (`output: "static"`) and supports GitHub Pages base paths.

- Build output: `dist/`
- The included workflow publishes `dist/` to GitHub Pages on pushes to `main`.

## Config

For custom domains, set:

```text
SITE_URL=https://docs.example.com
```

For hosting under a subpath, set:

```text
BASE_PATH=/my-subpath
```

## Plugin docs

PocketBuilds is a marketplace where anyone can publish plugins. This docs site focuses on xpb itself (how to build/configure plugins). Plugin-specific documentation should live with the plugin (marketplace listing and repository README).

## Credits

This site’s layout and UX patterns draw inspiration from the Skeleton documentation experience.

- Skeleton: https://www.skeleton.dev/
- `@skeletonlabs/skeleton-svelte` (MIT)

Frameworks and tools:

- Astro
- Svelte
- Tailwind CSS
