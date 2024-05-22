<script lang="ts">
	import Geolocate from "$lib/Geolocate.svelte";
	import Map from "$lib/Map.svelte";
	import Search from "$lib/Search.svelte";

	import '$lib/css/main.css';
</script>

<main>
	<h1>Sykkelparkeringer</h1>
	<p>Kart for sykkelparkeringer</p>

	<div class="searching">
		<Geolocate />

		<span>eller</span>

		<Search />
	</div>


	<Map />
</main>