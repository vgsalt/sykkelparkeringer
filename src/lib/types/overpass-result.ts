export type OverpassResult = {
    version: number;
    generator: string;
    osm3s: [];
    elements: Element[];
}

type Element = {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: Tag;
}

type Tag = {
    access: string;
    amenity: string;
    bicycle_parking: string;
    capacity: number;
    covered: string;
    fee: string;
    charge: string;
    operator: string;
    colour: string;
    website: string;
}