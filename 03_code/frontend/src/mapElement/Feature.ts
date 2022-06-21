import {Feature} from "ol";
import {getLines, getPolygons, getLabels} from "../api/api";
import {floors} from "../data/data";

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
    const polygons = await getPolygons('E')
    const lines    = await getLines('E')
    const labels   = await getLabels('E')

    floorsFeatures.set("E", new FloorFeature(lines, polygons, labels))
}

export async function fetchOtherFeatures() {
    const floorsOfCheseaux = floors.get('Cheseaux')
    if ( floorsOfCheseaux != undefined) {
        for (const floor of floorsOfCheseaux) {
            if (floor != 'E') {
                const polygons = await getPolygons(floor)
                const lines    = await getLines(floor)
                const labels   = await getLabels(floor)

                floorsFeatures.set(floor, new FloorFeature(lines, polygons, labels))
            }
        }
    }
}
