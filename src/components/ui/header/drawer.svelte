<script lang="ts">
	import { cn } from "@modules/utils";
	import { MenuIcon } from "@lucide/svelte";
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		variant?: "overlay" | "bottom";
	}

	const { children, variant = "bottom" }: Props = $props();
</script>

<Dialog>
	<Dialog.Trigger class={cn("hover:preset-tonal btn-icon")}>
		<MenuIcon class="size-4" />
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-50 bg-surface-50-950/50 transition-opacity duration-200 opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"
		/>
		<Dialog.Positioner
			class={cn(
				"fixed inset-0 z-60 flex",
				variant === "overlay"
					? "justify-start items-stretch"
					: "justify-center items-end",
			)}
		>
			<Dialog.Content
				class={cn(
					"card backdrop-blur-lg shadow-xl overflow-y-auto hide-scrollbar-track motion-reduce:transition-none",
					variant === "overlay"
						? "border-r border-surface-200-800 bg-surface-50-950/90 w-[240px] h-dvh rounded-none p-4 space-y-4 transition-transform duration-300 ease-in-out -translate-x-full starting:data-[state=open]:-translate-x-full data-[state=open]:translate-x-0"
						: "border-t border-surface-200-800 bg-surface-50-950/90 w-full h-[80dvh] p-4 space-y-4 rounded-t-2xl transition-transform duration-300 ease-in-out translate-y-full starting:data-[state=open]:translate-y-full data-[state=open]:translate-y-0",
				)}
			>
				<header class="flex justify-between items-center gap-4">
					<Dialog.Title class="flex items-baseline gap-0.5">
						<span class="font-medium">Pocket</span>
						<span class="font-bold text-primary-400">Builds</span>
					</Dialog.Title>
					<Dialog.CloseTrigger
						class={cn("hover:preset-tonal btn btn-con rounded-full")}
					>
						&times;
					</Dialog.CloseTrigger>
				</header>
				<hr class="hr" />
				<div class="overflow-y-auto">
					{@render children()}
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
