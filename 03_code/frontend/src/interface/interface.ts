import {Feature} from "ol";

export interface Info {
    flag : string,
    name : string,
    type : string,
    surface : number | null,
    capacity : number | null
}

export interface BuildingInfo {
    floors : string[],
    groundFloor : string,
    center : number[]
    rotation : number,
    zoom : number,
    minZoom : number,
    maxZoom : number,
}

export interface FloorFeatures {
    lines : Feature[]
    polygons : Feature[]
    labels : Feature[]
    resources : Feature[] | null
}
