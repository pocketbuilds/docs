<script lang="ts">
	import type { Pagefind } from "@/modules/pagefind";
	import { cn } from "@/modules/utils";
	import {
		BookIcon,
		ChevronRightIcon,
		HashIcon,
		SearchIcon,
	} from "@lucide/svelte";
	import {
		Dialog,
		Portal,
		Combobox,
		useListCollection,
		type ComboboxRootProps,
		useDialog,
	} from "@skeletonlabs/skeleton-svelte";
	import { prefetch } from "astro:prefetch";
	import { on } from "svelte/events";

	interface Search {
		query: string;
		status: "idle" | "searching" | "no-results" | "results" | "unavailable";
		items: (Result | Subresult)[];
	}

	interface Result {
		type: "result";
		href: string;
		title: string;
		excerpt: string;
	}

	interface Subresult {
		type: "subresult";
		href: string;
		title: string;
		excerpt: string;
	}

	const search: Search = $state({
		query: "",
		status: "idle",
		items: [],
	});

	let pagefindPromise: Promise<Pagefind | null> | null = null;

	function getPagefind() {
		if (pagefindPromise) {
			return pagefindPromise;
		}
		pagefindPromise = (async () => {
			if (import.meta.env.SSR) {
				return null;
			}
			try {
				const pagefind: Pagefind = await import(
					/* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`
				);
				await pagefind.options({
					baseUrl: import.meta.env.BASE_URL,
					excerptLength: 3,
					ranking: {
						termFrequency: 0,
					},
				});
				await pagefind.init();
				return pagefind;
			} catch {
				return null;
			}
		})();
		return pagefindPromise;
	}

	function normalizeHref(href: string) {
		const [beforeHash, hash] = href.split("#");
		const [path, query] = beforeHash.split("?");
		const normalizedPath = path.length > 1 ? path.replace(/\/+$/, "") : path;
		const rebuilt =
			query === undefined ? normalizedPath : `${normalizedPath}?${query}`;
		return hash === undefined ? rebuilt : `${rebuilt}#${hash}`;
	}

	const id = $props.id();
	const dialog = useDialog({
		id,
		onOpenChange(open) {
			if (!open) {
				return;
			}
			search.query = "";
		},
	});

	const collection = $derived(
		useListCollection<Result | Subresult>({
			items: search.items,
			itemToString: (item) => item.title,
			itemToValue: (item) => item.href,
		}),
	);

	const onInputValueChange: ComboboxRootProps["onInputValueChange"] = async (
		details,
	) => {
		search.query = details.inputValue.trim();
		if (search.query.length === 0) {
			search.status = "idle";
			return [];
		}
		search.status = "searching";
		const pagefind = await getPagefind();
		if (!pagefind) {
			search.status = "unavailable";
			search.items = [];
			return [];
		}
		const searchResult = await pagefind.debouncedSearch(search.query, {}, 200);
		// A more recent search call was made
		if (!searchResult) {
			return [];
		}
		search.items = (
			await Promise.all(
				searchResult.results.map(async (searchResult) => {
					const result = await searchResult.data();
					return [
						{
							type: "result" as const,
							href: normalizeHref(result.url),
							title: result.meta.title,
							excerpt: result.excerpt,
						},
						...result.sub_results
							.filter((subResult) => subResult.url !== result.url)
							.map((subResult) => ({
								type: "subresult" as const,
								href: normalizeHref(subResult.url),
								title: subResult.title,
								excerpt: subResult.excerpt,
							})),
					];
				}),
			)
		).flat();
		if (search.query.length === 0) {
			search.status = "idle";
			return [];
		}
		search.status = search.items.length === 0 ? "no-results" : "results";
	};

	const onValueChange: ComboboxRootProps["onValueChange"] = () => {
		dialog().setOpen(false);
	};

	const onHighlightChange: ComboboxRootProps["onHighlightChange"] = async (
		details,
	) => {
		const url = details.highlightedValue;
		if (!url) {
			return;
		}
		prefetch(normalizeHref(url));
	};

	$effect(() =>
		on(document, "keydown", (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				dialog().setOpen(true);
			}
		}),
	);
</script>

{#snippet result(item: Result)}
	<Combobox.Item
		class="p-2 grid grid-cols-[auto_1fr_auto] gap-4 items-center"
		{item}
	>
		{#snippet element(attributes)}
			<a {...attributes as any} href={item.href}>
				<BookIcon class="size-6 opacity-50" />
				<div class="space-y-1">
					<Combobox.ItemText>{item.title}</Combobox.ItemText>
					<p class="text-xs">{item.href}</p>
				</div>
				<ChevronRightIcon class="size-4 opacity-50" />
			</a>
		{/snippet}
	</Combobox.Item>
{/snippet}

{#snippet subresult(item: Subresult)}
	<Combobox.Item
		class="p-2 grid grid-cols-[auto_auto_1fr_auto] gap-4 items-center"
		{item}
	>
		{#snippet element(attributes)}
			<a {...attributes as any} href={item.href}>
				<svg class="w-6 h-12 opacity-50" viewBox="0 0 24 54">
					<g
						stroke="currentColor"
						fill="none"
						fill-rule="evenodd"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M8 6v42M20 27H8.3"></path>
					</g>
				</svg>
				<HashIcon class="size-4 opacity-50" />
				<div class="space-y-1">
					<Combobox.ItemText>{item.title}</Combobox.ItemText>
					<p class="text-xs text-surface-600-400 wrap-break-word [&>mark]:mark">
						{@html item.excerpt}
					</p>
				</div>
				<ChevronRightIcon class="size-4 opacity-50" />
			</a>
		{/snippet}
	</Combobox.Item>
{/snippet}

<Dialog.Provider value={dialog}>
	<Dialog.Trigger
		class={cn("px-2 btn-icon hover:preset-tonal md:hidden")}
		title="Search"
		aria-label="Search"
	>
		<SearchIcon class="size-4" />
	</Dialog.Trigger>
	<Dialog.Trigger class={cn("hidden md:flex justify-start btn preset-tonal")}>
		<SearchIcon class="size-4 opacity-60" />
		<span class="opacity-60">Search...</span>
		<span
			class="badge badge-icon preset-outlined-surface-500 text-xs opacity-30 hidden md:flex"
			>⌘ K</span
		>
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-60 bg-surface-50-950/50 backdrop-blur-[2px]"
		/>
		<Dialog.Positioner
			class="fixed inset-0 z-60 flex justify-center items-start mt-[5%] p-4"
		>
			<Dialog.Content
				class="card bg-surface-50-950/90 backdrop-blur-sm border border-surface-200-800 w-full max-w-[960px] space-y-4 shadow-[0_0_100px_rgba(0,0,0,0.25)] shadow-primary-500/50 transition transition-discrete duration-200 opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none"
			>
				<Combobox
					class="w-full flex flex-col"
					placeholder="Search..."
					{collection}
					inputValue={search.query}
					{onInputValueChange}
					{onValueChange}
					{onHighlightChange}
					inputBehavior="autohighlight"
					selectionBehavior="preserve"
					open={dialog().open}
				>
					<div class="px-4 pt-4 pb-4 lg:pb-2">
						<Combobox.Control class="input-group grid-cols-[auto_1fr]">
							<div class="ig-cell preset-tonal">
								<SearchIcon class="size-4" />
							</div>
							<Combobox.Input class="ig-input rounded-s-none" type="search" />
						</Combobox.Control>
					</div>
					<hr class="hr" />
					{#if search.status === "idle"}
						<span class="py-10 text-center opacity-50"
							>What can we help you find?</span
						>
					{:else if search.status === "searching"}
						<span class="py-10 text-center opacity-50">Searching...</span>
					{:else if search.status === "no-results"}
						<span class="py-10 text-center opacity-50">
							No results found for <code class="code">{search.query}</code>
						</span>
					{:else if search.status === "unavailable"}
						<span class="py-10 text-center opacity-50">
							Search index not available in dev. Run <code class="code"
								>pnpm run build</code
							>
							and serve <code class="code">dist/</code>.
						</span>
					{:else if search.status === "results"}
						<Combobox.Content
							class="relative px-4 py-2 border-none bg-transparent max-h-[50dvh] overflow-y-auto"
						>
							{#each collection.items as item (item)}
								{#if item.type === "result"}
									{@render result(item)}
								{:else if item.type === "subresult"}
									{@render subresult(item)}
								{/if}
							{/each}
						</Combobox.Content>
					{/if}
					<hr class="hidden lg:block hr" />
					<div class="hidden lg:flex gap-2 px-4 pb-4 pt-2">
						<span class="text-sm opacity-50"
							><kbd class="kbd">↑</kbd> <kbd class="kbd">↓</kbd> Navigate</span
						>
						<span class="text-sm opacity-50"
							><kbd class="kbd">⏎</kbd> Select</span
						>
						<span class="text-sm opacity-50"
							><kbd class="kbd">Esc</kbd> Close</span
						>
					</div>
				</Combobox>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Provider>
