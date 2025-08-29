<script>
	import AccordionButton from "../widgets/accordion_button.svelte";

	export let content, components, allLayouts, allContent;

	let open = false;

</script>

{#if components?.length}
	<div class="accordion" class:open class:closed={!open}>
		{#each components as component }
			<svelte:component this="{allLayouts["layouts_components_" + component.name + "_svelte"]}" {...component} {content} {allContent} {allLayouts} />
		{/each}
	</div>
	<AccordionButton direction="down" bind:open />
{/if}

<style>
	.accordion.open {
		max-height: none;
	}
	.accordion.closed {
		overflow-y: clip;
		max-height: 200px;
	}
</style>
