<script>
	export let docsManager;
</script>

<div class="pager">
	<div class="left">
		{#if docsManager?.prev}
			{@const prev = docsManager.prev}
			<a href="/{prev.path}">
				<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
				Previous: {prev.fields.title}
			</a>
		{/if}
	</div>
	<div class="right">
		{#if docsManager?.next}
			{@const next = docsManager.next}
			<a href="/{next.path}">
				Next: {next.fields.title}
				<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
			</a>
		{/if}
	</div>
</div>

<style>
	.pager {
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: space-between;
	}
	a {
		display: flex;
		gap: 5px;
		border: 1px solid;
		padding: 10px 20px;
		margin: 20px 0;
		border-radius: 3px;
	}
</style>
