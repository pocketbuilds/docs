<script>
	import DocsPager from "../widgets/docs_pager.svelte";
	export let title, docsManager;
</script>

<section>
	<h1>{title}</h1>

	<DocsPager {docsManager} />
</section>
