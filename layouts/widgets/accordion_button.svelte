<script>
	import TablerIcon from "../components/tabler_icon.svelte";

	/** The direction the accordion opens.
	 * @type {('left' | 'right' | 'up' | 'down')}
	*/
	export let direction = "horizontal";
	export let open = true;
</script>

<button
	type="button"
	class:horizontal={direction === "up" || direction === "down"}
	class:vertical={direction === "left" || direction === "right"}
	on:click={() => open = !open}
>
	<div class="inner">
		{#if open}
			{#if direction === "left"}
				<TablerIcon icon="chevron-compact-right"/>
			{:else if direction === "right"}
				<TablerIcon icon="chevron-compact-left"/>
			{:else if direction === "up"}
				<TablerIcon icon="chevron-compact-down"/>
			{:else}
				<TablerIcon icon="chevron-compact-up"/>
			{/if}
		{:else}
			<TablerIcon icon="chevron-compact-{direction}"/>
		{/if}
	</div>
</button>

<style>
	button {
		background-color: gainsboro;
		border: none;
		padding: 0;
		margin: 0 6px;
		overflow: visible;
		display: flex;
		justify-content: center;
		align-items: stretch;
	}
	button.horizontal {
		width: 100%;
		height: 2px;
		flex-direction: column;
		margin: 8px 0;
	}
	button.vertical {
		width: 2px;
		flex-direction: row;
		margin: 0 8px;
	}
	button .inner {
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button.horizontal .inner {
		height: 14px;
	}
	button.vertical .inner {
		width: 14px;
	}
	.inner :global(svg) {
		color: black !important;
	}
	.inner:hover :global(svg) {
		color: green !important;
	}
</style>
