<script>
	import AccordionButton from "../widgets/accordion_button.svelte";

	export let content, docsManager

	let open = true;

</script>

<nav class:open class:closed={!open}>
	<ul>
		{#if docsManager?.list?.length}
			{#each docsManager.list as doc }
				<li
					class:index={doc.type === "_index"}
					class:group={doc.type === "groups"}
					class:doc={doc.type === "docs"}
					class:current={doc.filename === content.filename}
				>
					<a href="/{doc.path}">{doc.fields.title}</a>
				</li>
			{/each}
		{/if}
	</ul>
	<AccordionButton direction="right" bind:open/>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		white-space: nowrap;
	}
	ul {
		list-style-type: none;
		padding-left: 0;
		overflow: hidden;
		overflow-y: auto;
	}
	nav.open ul {
		width: auto;
		min-width: 170px;
	}
	nav.closed ul {
		width: 0;
		min-width: 0;
	}
	.current a {
		color: green;
	}
	li {
		font-size: 1.1rem;
		margin: 8px 0;
	}
	.doc {
		font-size: 1rem;
		padding-left: 15px;
	}
</style>
