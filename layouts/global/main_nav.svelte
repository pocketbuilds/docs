<nav class="container">
	<div class="left">
		<div class="brand">
			<a href="https://pocketbuilds.com/">
				<img src="/pocketbuilds.svg" alt="PocketBuilds logo" />
				<span>Pocket<strong>Builds</strong></span>
			</a>
		</div>
		<div>Documentation</div>
	</div>
	<div class="right">
		<div class="github">
			<a href="https://github.com/pocketbuilds/xpb">
				<img src="/github.svg" alt="GitHub Octocat Icon">
			</a>
		</div>
	</div>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left, .right {
		display: flex;
		gap: 15px;
		align-items: center;
		justify-content: flex-start;
	}
	.right {
		justify-content: flex-end;
	}
	.brand a {
		display: flex;
		gap: 10px;
		align-items: center;
		text-decoration: none;
		color: black;
	}
</style>
