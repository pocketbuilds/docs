<script>
	export let body;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">
</svelte:head>

{#if body?.rendered}
	{@html body.rendered}
{/if}
