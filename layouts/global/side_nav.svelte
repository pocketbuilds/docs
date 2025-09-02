<script>
	import AccordionButton from "../widgets/accordion_button.svelte";

	export let content, allContent;

	let open = true;

	$: index = allContent.find(c => c.type === "_index");
	$: groups = allContent.filter(c => c.type === "groups").sort(sortFunc);
	$: docs = allContent.filter(c => c.type === "docs");

	function getGroupDocs(group) {
		return docs.filter(c => c.fields.group === group.path);
	}

	function sortFunc(a, b) {
		if (a?.fields?.order != null && b?.fields?.order != null) {
			return a.fields.order - b.fields.order;
		}
		return -1;
	}

</script>

<nav class:open class:closed={!open}>
	<ul>
		<li class:current={index.filename === content.filename}>
			<a href="/">{index.fields.title}</a>
		</li>
		{#each groups as group}
			<li class="group" class:current={group.filename === content.filename}>
				<a href="/{group.path}">{group.fields.title}</a>
			</li>
			{#each getGroupDocs(group) as doc}
				<li class="doc" class:current={doc.filename === content.filename}>
					<a href="/{doc.path}">{doc.fields.title}</a>
				</li>
			{/each}
		{/each}
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
