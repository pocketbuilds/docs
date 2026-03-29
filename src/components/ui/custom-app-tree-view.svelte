<script lang="ts">
	import { FileIcon, FileCodeIcon, FolderOpenIcon } from "@lucide/svelte";
	import {
		TreeView,
		createTreeViewCollection,
	} from "@skeletonlabs/skeleton-svelte";

	interface Node {
		id: string;
		name: string;
		children?: Node[];
	}

	const rootNode: Node = {
		id: "root",
		name: "",
		children: [
			{
				id: "my_project",
				name: "my_project",
				children: [
					{
						id: "my_project/hooks",
						name: "hooks",
						children: [{ id: "my_project/hooks/hooks.go", name: "hooks.go" }],
					},
					{
						id: "my_project/api",
						name: "api",
						children: [{ id: "my_project/api/api.go", name: "api.go" }],
					},
					{ id: "my_project/go.mod", name: "go.mod" },
					{ id: "my_project/go.sum", name: "go.sum" },
					{ id: "my_project/main.go", name: "main.go" },
				],
			},
		],
	};

	function getFolderIds(node: Node): string[] {
		if (!node.children) return [];
		return [node.id, ...node.children.flatMap(getFolderIds)].filter(
			(id) => id !== "root",
		);
	}

	const FILE_ICONS: Record<
		string,
		{ icon: typeof FileCodeIcon; class: string }
	> = {
		".go": { icon: FileCodeIcon, class: "text-blue-400" },
		".mod": { icon: FileCodeIcon, class: "text-yellow-400" },
		".sum": { icon: FileCodeIcon, class: "text-green-400" },
	};

	function getFileIcon(name: string) {
		const ext = name.slice(name.lastIndexOf("."));
		return FILE_ICONS[ext] ?? { icon: FileIcon, class: "text-surface-400" };
	}

	const collection = createTreeViewCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode,
	});
</script>

<TreeView
	{collection}
	defaultExpandedValue={getFolderIds(rootNode)}
	expandOnClick={false}
>
	<TreeView.Tree>
		{#each collection.rootNode.children || [] as node, index (node)}
			{@render treeNode(node, [index])}
		{/each}
	</TreeView.Tree>
</TreeView>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchText>
						<FolderOpenIcon class="size-4 text-yellow-400" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			{@const { icon: Icon, class: cls } = getFileIcon(node.name)}
			<TreeView.Item>
				<Icon class="size-4 {cls}" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
