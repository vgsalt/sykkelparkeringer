import { Map } from "leaflet";
import { writable } from "svelte/store";

export const mapStore = writable<Map>();