<script>
	export let video;
</script>

<video width="640" height="360" controls preload="metadata">
	<source src="/media/videos/{video}.mp4" type="video/mp4">
	Your browser doesn't support HTML5 video. Download it <a href="/videos/my-demo.mp4">here</a>.
</video>

<style>
	video {
		max-width: 100%;
		height: auto;
		margin: 10px 0;
	}
</style>
