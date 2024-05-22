/** The Area type is used for results from Nominatim. */
export type Area = {
    place_id?: number;
    license?: string;
    osm_type?: string;
    /** What the area shows up as on OpenStreetMap. */
    display_name?: string;
    osm_id?: number;
    lat?: string;
    lon?: string;
    category?: string;
    type?: string;
    place_rank?: number;
    importance?: number;
    addresstype?: string;
    name?: string;
    boundarybox?: Array<string>;
}