<script lang="ts">
    // Get area type
    import type { Area } from "$lib/types/area";
    import getParkings from "$lib/getParkings";

    let area = '';

    let results: Array<Area> = [];

    function getAreas() {
        // Get areas matching the search query from Nominatim
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${area}&format=jsonv2`).then((response) => {
            response.json().then(data => {
                console.log(data);
                results = data;
                return data;
            })
        })

        console.log(results);
    }
</script>

<input bind:value={area} placeholder="Søk område">

<button on:click={getAreas}>Søk</button>

<div class="search-results">
    {#each results as administrative}
        <a href="" on:click={() => {getParkings(administrative.name)}}>{administrative.display_name}</a>
    {/each}
</div>

