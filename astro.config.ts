import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "astro-auto-import";
import pagefind from "astro-pagefind";
import { defineConfig, envField } from "astro/config";
import { execSync } from "node:child_process";
import transformLucideImports, {
  SUPPORTED_EXTENSIONS,
} from "vite-plugin-transform-lucide-imports";

function getSite() {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:4321";
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  const repository = process.env.GITHUB_REPOSITORY;
  const owner =
    process.env.GITHUB_REPOSITORY_OWNER ?? repository?.split("/")[0];
  const repo = repository?.split("/")[1];
  if (owner && repo) {
    if (repo === `${owner}.github.io`) {
      return `https://${owner}.github.io`;
    }
    return `https://${owner}.github.io/${repo}`;
  }
  return "https://docs.pocketbuilds.com";
}

function getBase() {
  if (process.env.NODE_ENV !== "production") return "/";
  if (process.env.BASE_PATH) {
    const normalized = process.env.BASE_PATH.replace(/\/+$/, "");
    if (normalized === "" || normalized === "/") return "/";
    return normalized.startsWith("/") ? normalized : `/${normalized}`;
  }
  const repository = process.env.GITHUB_REPOSITORY;
  const owner =
    process.env.GITHUB_REPOSITORY_OWNER ?? repository?.split("/")[0];
  const repo = repository?.split("/")[1];
  if (owner && repo && repo !== `${owner}.github.io`) {
    return `/${repo}`;
  }
  return "/";
}

export default defineConfig({
  site: getSite(),
  base: getBase(),
  output: "static",
  prefetch: true,
  trailingSlash: "never",
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    svelte(),
    autoImport({
      imports: [
        {
          "./src/components/ui/alert.astro": [["default", "Alert"]],
        },
      ],
    }),
    mdx(),
    sitemap(),
    pagefind(),
  ],
  env: {
    schema: {
      GIT_BRANCH: envField.string({
        context: "server",
        access: "public",
        default:
          process.env.GITHUB_REF_NAME ??
          execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
      }),
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@lucide/svelte"],
    },
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
    assetsInclude: "**/pagefind.js",
    plugins: [
      tailwindcss(),
      transformLucideImports({
        extensions: [...SUPPORTED_EXTENSIONS, ".astro"],
        onwarn(warning, defaultHandler) {
          if (
            warning.message.match(
              /Skipping optimization of (\S+) because \1 is already a tree shaken package/,
            )
          ) {
            return;
          }
          defaultHandler(warning.message);
        },
      }),
    ],
  },
});