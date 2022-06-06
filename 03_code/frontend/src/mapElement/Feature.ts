import {Feature} from "ol";
import {getLines, getPolygons, getRoomsGis} from "../api/api";

export class FloorFeature {
    lines : Feature[]
    polygons : Feature[]
    labels : Feature[]

    constructor(lines : Feature[], polygons : Feature[], labels : Feature[]) {
        this.lines = lines
        this.polygons = polygons
        this.labels = labels
    }
}

export const floorsFeatures = new Map<string, FloorFeature>()

export async function fetchBaseFeatures() {
    const polygons = await getPolygons()
    const lines    = await getLines()
    const labels   = await getRoomsGis()

    floorsFeatures.set("E", new FloorFeature(lines, polygons, labels))
}
