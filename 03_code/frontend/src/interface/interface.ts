import {Feature} from "ol";

export interface Info {
    flag : string,
    id : number
    name : string,
    type : string,
    surface : number | null,
    capacity : number | null
}

export interface BuildingInfo {
    id : number,
    floors : {
        id : number,
        name : string
    }[],
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

export interface Suggestion {
    rooms : string[],
    people : string[]
}

export interface RoomSuggestion {
    room_id : number,
    room_name :string,
    room_type : string,
    room_surface : number | null,
    room_capacity : number | null,
    floor_name : string,
    building_name : string
}

