import { get } from "svelte/store";
import { mapStore } from "./map-vars";
import type { OverpassResult } from "./types/overpass-result";

export default async function getParkings(area: string) {
    // Import Leaflet
    const leaflet = await import("leaflet");
    // Fetch Parkings through Overpass
    await fetch("https://overpass-api.de/api/interpreter", {
        "body": `data=[out:json];area[name="${area}"];nwr["amenity"="bicycle_parking"](area);out+geom;`,
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        "mode": "cors"
    }).then(response => {
        response.json().then((data: OverpassResult) => {
            data.elements.forEach((element) => {
                // No lat/lon? Bail
                // if (element.lat == null || element.lon == null) return;
                // Get security of the bicycle parking
                let security = "";
                switch (element.tags.bicycle_parking) {
                    case "stands":
                        security = "Middels/høy";
                        break;
                    case "wall_loops":
                        security = "Lav";
                        break;
                    case "bollard":
                        security = "Middels/høy";
                        break;
                    case "lockers":
                        security = "Høy";
                        break;
                    case "building":
                        security = "Høy";
                        break;
                    case "floor":
                        security = "Lav";
                        break;
                    case "shed":
                        security = "Høy";
                        break;
                    default:
                        security = "Ukjent";
                }
                let feeMessage = `Kost: ${element.tags.charge}`;
                if (element.tags.charge == "") {
                    feeMessage = `Gratis / ukjent kostnad`;
                }
                const popup = leaflet.popup().setContent(`<h1>Driftes av ${element.tags.operator}</h1><p>Har plass til ${element.tags.capacity} sykler.</p><p>Sikkerhetsnivået til parkeringen er ${security}</p><p>${feeMessage}</p>`);
                leaflet.circleMarker([element.lat, element.lon]).bindPopup(popup).addTo(get(mapStore));
            })
        })
    });
}