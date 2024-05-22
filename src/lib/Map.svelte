<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
    import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/environment';
	import { popup, type Map } from 'leaflet';
	import { mapStore } from './map-vars';
    import { get } from 'svelte/store';

	let mapElement: HTMLElement;
	let map: Map;

	onMount(async () => {
		// If there is no check for browser, this whole thing stops working.
		if (browser) {
			const leaflet = await import('leaflet');

			// Init map and set view to Europe
			map = leaflet.map(mapElement).setView([53, 9], 5);

            mapStore.set(map)

			// Set up OpenStreetMap tiles, with attribution
			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(get(mapStore));

            // make popup
            var popup = leaflet.popup().setContent("<h1>Dette er Drammen</h1>")
            // Add a circle marker somewhere
            leaflet.circleMarker([59.75073,10.16494], {radius: 10}).bindPopup(popup).addTo(map)
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map');
			map.remove();
		}
	});
</script>

<div class="kart">
	<div bind:this={mapElement}></div>
</div>

<style>
	.kart div {
        height: 25rem;
    }
</style>
