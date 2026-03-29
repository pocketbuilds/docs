/* Generate by @shikijs/codegen */
import { createSingletonShorthands, createBundledHighlighter } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import type { DynamicImportLanguageRegistration, DynamicImportThemeRegistration } from '@shikijs/types';

type BundledLanguage =
	| 'javascript'
	| 'js'
	| 'typescript'
	| 'ts'
	| 'tsx'
	| 'go'
	| 'svelte'
	| 'astro'
	| 'html'
	| 'shellscript'
	| 'bash'
	| 'sh'
	| 'shell'
	| 'zsh'
	| 'diff'
	| 'json'
	| 'css'
	| 'yaml'
	| 'toml'
	| 'md'
	| 'mdx';
type BundledTheme = 'github-light' | 'github-dark';

const bundledLanguages = {
	javascript: () => import('@shikijs/langs/javascript'),
	js: () => import('@shikijs/langs/javascript'),
	typescript: () => import('@shikijs/langs/typescript'),
	ts: () => import('@shikijs/langs/typescript'),
	tsx: () => import('@shikijs/langs/tsx'),
	go: () => import('@shikijs/langs/go'),
	svelte: () => import('@shikijs/langs/svelte'),
	astro: () => import('@shikijs/langs/astro'),
	html: () => import('@shikijs/langs/html'),
	shellscript: () => import('@shikijs/langs/shellscript'),
	bash: () => import('@shikijs/langs/shellscript'),
	sh: () => import('@shikijs/langs/shellscript'),
	shell: () => import('@shikijs/langs/shellscript'),
	zsh: () => import('@shikijs/langs/shellscript'),
	diff: () => import('@shikijs/langs/diff'),
	json: () => import('@shikijs/langs/json'),
	css: () => import('@shikijs/langs/css'),
	yaml: () => import('@shikijs/langs/yaml'),
	toml: () => import('@shikijs/langs/toml'),
	md: () => import('@shikijs/langs/md'),
	mdx: () => import('@shikijs/langs/mdx'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>;

const bundledThemes = {
	'github-light': () => import('@shikijs/themes/github-light'),
	'github-dark': () => import('@shikijs/themes/github-dark'),
} as Record<BundledTheme, DynamicImportThemeRegistration>;

const createHighlighter = /* @__PURE__ */ createBundledHighlighter<BundledLanguage, BundledTheme>({
	langs: bundledLanguages,
	themes: bundledThemes,
	engine: () => createJavaScriptRegexEngine(),
});

export const { codeToHtml } = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(createHighlighter);
