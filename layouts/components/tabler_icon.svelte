<script>
    /**
     * Search Tabler icons at https://tabler-icons.io/
     */
    export let icon;
    export let scale = "1";
    export let color = "white";
    export let background = "transparent";
    export let stroke_width = "2";
    export let width = "25px";
    export let height = "25px";
    export let viewBox = "0 0 24 24";
</script>

<svg {width} {height} {viewBox} style="transform: scale({scale}); color: {color}; background: {background}; stroke-width: {stroke_width};">
    <use href="/icons/{icon}.svg"></use>
</svg>
