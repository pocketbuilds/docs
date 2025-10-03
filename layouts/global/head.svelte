<script>
	import { makeTitle } from "../scripts/make_title.svelte";

	export let content, env;
</script>

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>

	<title>{ makeTitle(content.filename) }</title>

	<script type="module" src="/spa/core/main.js?{env.fingerprint}"></script>

	<link rel="icon" type="image/x-icon" href="/pocketbuilds.svg">
	<link rel='stylesheet' href="/css/fonts.css?{env.fingerprint}">
	<link rel='stylesheet' href="/css/global.css?{env.fingerprint}">
	<link rel='stylesheet' href="/spa/bundle.css?{env.fingerprint}">
</head>
