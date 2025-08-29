<script>
	import hljs from "../dist/highlight.min.js";
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import { HtmlSanitizer } from "../scripts/html_sanitizer.svelte";

	export let schema, parentKeys, field;

	const sanitizer = new HtmlSanitizer();

	sanitizer.AllowedAttributes['class'] = true;

	const marked = new Marked(
		markedHighlight({
			emptyLangClass: "hljs",
			langPrefix: "hljs language-",
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			},
		}),
	);

	let disabled, hidden;
	if (schema?.[parentKeys]?.options?.length) {
		disabled = schema[parentKeys].options.includes("disabled");
		hidden = schema[parentKeys].options.includes("hidden");
	}

	$: if (field.markdown) {
		renderHtml();
	}
	function renderHtml() {
		let htmlStr = marked.parse(field.markdown);
		htmlStr = sanitizer.SanitizeHtml(htmlStr);
		field.rendered = htmlStr;
	}
</script>

{#if !hidden}
	<textarea
		bind:value={field.markdown}
		class:disabled
		{disabled}
	></textarea>
{/if}

<style>
	textarea {
		background: white;
		border: 1px solid gainsboro;
		resize: vertical;
		overflow: auto;
		padding: 7px;
		font-family: sans-serif;
		font-size: small;
		white-space: pre-wrap;
		word-break: break-all;
		box-sizing: border-box;
		width: 100%;
	}
	textarea.disabled {
		resize: none;
		background-color: whitesmoke;
		border: 1px solid gainsboro;
	}
</style>
