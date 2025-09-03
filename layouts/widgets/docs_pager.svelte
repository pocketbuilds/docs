<script>
	export let docsManager;
</script>

<div class="pager">
	<div class="left">
		{#if docsManager?.prev}
			{@const prev = docsManager.prev}
			<a href="/{prev.path}">Previous: {prev.fields.title}</a>
		{/if}
	</div>
	<div class="right">
		{#if docsManager?.next}
			{@const next = docsManager.next}
			<a href="/{next.path}">Next: {next.fields.title}</a>
		{/if}
	</div>
</div>

<style>
	.pager {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
