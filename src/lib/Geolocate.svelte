<script lang="ts">
	import { browser } from "$app/environment";
    import getParkings from "$lib/getParkings";
	import { get } from "svelte/store";
    import {mapStore} from "./map-vars";

    async function getArea() {
        const leaflet = await import("leaflet");
        // If this is a browser (needed because of SSR)
        if (browser) {
            // If the navigator (browser) has geolocation support
            if ("geolocation" in navigator) {
                // Get current position of user.
                navigator.geolocation.getCurrentPosition((position) => {
                    // Reverse geocode
                    fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=13&format=jsonv2`).then((response) => {
                        response.json().then((data) => {
                            // Get parkings for the area.
                            getParkings(data.name);
                            // Create a marker indicating where the user is.
                            const popup = leaflet.popup().setContent("Din plassering");
                            leaflet.circleMarker([position.coords.latitude, position.coords.longitude], {radius: 8, color: "#d1252e"}).bindPopup(popup).addTo(get(mapStore));
                        })
                    })
                })
            } else {
                throw new Error("No geolocation support detected");
            }
        }
    }
</script>

<button on:click={() => getArea()}>Hent fra min plassering</button>