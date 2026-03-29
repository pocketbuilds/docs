<script lang="ts">
	import { LaptopMinimalCheckIcon, MoonIcon, SunIcon } from "@lucide/svelte";
	import { SITE_MODE, type SiteMode } from "@modules/site-config";

	type Mode = SiteMode;
	const modes: Mode[] = ["system", "light", "dark"];
	let mode: Mode = $state(SITE_MODE);

	function applyMode(next: Mode) {
		mode = next;
		localStorage.setItem("mode", next);
		document.documentElement.setAttribute("data-mode", next);
	}
	function cycleMode() {
		const idx = modes.indexOf(mode);
		const next = modes[(idx + 1) % modes.length] ?? "system";
		applyMode(next);
	}

	$effect(() => {
		const stored = localStorage.getItem("mode");
		if (stored === "system" || stored === "light" || stored === "dark") {
			mode = stored;
		}
	});
</script>

<button
	class="btn-icon px-2 hover:preset-tonal"
	onclick={cycleMode}
	title="Toggle mode"
	aria-label="Toggle mode"
>
	{#if mode === "light"}
		<SunIcon class="size-4" />
	{:else if mode === "dark"}
		<MoonIcon class="size-4" />
	{:else}
		<LaptopMinimalCheckIcon class="size-4" />
	{/if}
</button>
