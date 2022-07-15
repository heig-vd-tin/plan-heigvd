import {Feature} from "ol";
import BaseLayer from "ol/layer/Base";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export interface Info {
    flag : string,
    id : number
    name : string,
    type : string | null,
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
    room_type : string | null,
    room_surface : number | null,
    room_capacity : number | null,
    floor_name : string,
    building_name : string
}

export interface  FloorLayers {
    polygonLayer : VectorLayer<VectorSource>,
    labelsLayer : VectorLayer<VectorSource>,
    lineLayer : VectorLayer<VectorSource>,
    resourceLayer : VectorLayer<VectorSource>
}

export interface  Layers {
    osmLayer : BaseLayer,
    backgroundLayer : VectorLayer<VectorSource>,
    floorLayer : FloorLayers
}
