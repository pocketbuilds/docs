<script>
	export let title, content, components, allLayouts, allContent;
</script>

<section>
	<h1>{title}</h1>

	{#if components?.length}
		{#each components as component }
			<svelte:component this="{allLayouts["layouts_components_" + component.name + "_svelte"]}" {...component} {content} {allContent} {allLayouts} />
		{/each}
	{/if}
</section>
