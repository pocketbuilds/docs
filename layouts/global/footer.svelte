<footer>
	<div class="wrapper container">
		<div class="left">
			© PocketBuilds 2025
		</div>
		<div class="right">
			<div class="plenti">
				<a href="https://plenti.co/" target="_blank" rel="noopener noreferrer">
					Made with
					<img src="/plenti.svg" alt="plentico planarian">
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid gainsboro;
		padding: 10px 0;
		flex-shrink: 0;
		background-color: #2b2b2b;
		color: gainsboro;
	}
	.wrapper {
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
	.plenti a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: white;
	}
	.plenti a img {
		max-width: 30px;
	}
</style>
