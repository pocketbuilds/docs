<script>
	import Footer from "./footer.svelte";
	import Head from "./head.svelte";
	import MainNav from "./main_nav.svelte";
	import SideNav from "./side_nav.svelte";
	import { DocsManager } from "../scripts/docs_manager.svelte";

	export let content, layout, allContent, allLayouts, env, user;

	$: if (env.local && user && $user) {
		$user.login();
	}

	let docsManager;
	$: if (content && allContent?.length) {
		docsManager = new DocsManager(content, allContent);
	}

</script>

<html lang="en">
	<Head {content} {env} />
	<body>
		{#if user && $user.isAuthenticated}
			<svelte:component this={$user.menu} {user} bind:content />
		{/if}
		<div class="wrapper" style={(user && $user.isAuthenticated) ? 'height: calc(100vh - 40px);' : ''}>
			<header>
				<MainNav />
			</header>
			<main>
				<SideNav {content} {docsManager} />
				<div class="content">
					<svelte:component this={layout} {...content.fields} {content} {allContent} {allLayouts} {user} {docsManager} />
				</div>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	</body>
</html>

<style>
	body {
		height: 100%;
		margin: 0;
	}
	.wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0 10px;
	}
	header {
		border-bottom: 1px solid gainsboro;
		padding: 10px 0;
		flex-shrink: 0;
	}
	main {
		display: flex;
		align-items: stretch;
		flex: 1 0 auto;
		margin: 10px 0;
	}
	.content {
		min-width: 0;
		flex: 1 1 100%;
	}
	footer {
		border-top: 1px solid gainsboro;
		padding: 10px 0;
		flex-shrink: 0;
	}
</style>
