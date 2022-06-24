import {Feature} from "ol";
import {
    getLines,
    getPolygons,
    getLabels,
    getAllPolygons,
    getFloorRessource,
    getGlobalResource
} from "../api/api";
import {ressourceStyleFunction} from "./style";
import {GeoJSON} from "ol/format";

export class FloorFeature {
    lines : Feature[]
    polygons : Feature[]
    labels : Feature[]
    resources : Feature[] | null

    constructor(lines : Feature[], polygons : Feature[], labels : Feature[], resources : Feature[] | null) {
        this.lines = lines
        this.polygons = polygons
        this.labels = labels
        this.resources = resources
    }
}

export const floorsFeatures = new Map<string, FloorFeature>()

/*
interface Resource {
    img : string
    coordinates :Feature
}*/

export let globalResourcesFeatures : Feature[]

export let backgroundFeatures : Feature[]

const geojsonTool = new GeoJSON()

export async function fetchBaseFeatures(groundFloor : string) {
    await fetchFloorFeatures(groundFloor)

    const rawBackground = await getAllPolygons()
    backgroundFeatures = geojsonTool.readFeatures(rawBackground)

    globalResourcesFeatures = geojsonTool.readFeatures(await getGlobalResource())
}

export async function fetchOtherFeatures(floors : string[], groundFloor : string) {
    for (const floor of floors) {
        if (floor != groundFloor) {
            await fetchFloorFeatures(floor)
        }
    }
}

async function fetchFloorFeatures(floor : string) {
    const rawPolygons  = await getPolygons(floor)
    const rawLines     = await getLines(floor)
    const rawLabels    = await getLabels(floor)
    const rawResources = await getFloorRessource(floor)

    const polygons  = geojsonTool.readFeatures(rawPolygons)
    const lines     = geojsonTool.readFeatures(rawLines)
    const labels    = geojsonTool.readFeatures(rawLabels)
    let resources
    if (rawResources.features != null) {
        resources = geojsonTool.readFeatures(rawResources)
    } else {
        resources = null
    }

    floorsFeatures.set(floor, new FloorFeature(lines, polygons, labels, resources))
}

export function getDisplayedResource(filters : string[], floor : string) {
    let features : Feature[] = []
    const f1 = floorsFeatures.get(floor)?.resources
    features.push(...globalResourcesFeatures)
    if (f1 != undefined) {
        features.push(...f1)
        console.log(features)
    }
    features = features.filter(feature => {
        return filters.some(e => e === feature.getProperties().type)
    })
    features.forEach( feature => {
        const style = ressourceStyleFunction(`${feature.getProperties().type}.png`)
        feature.setStyle(style)
    })
    return features
}

export function getAllRessourceType() : string[] {
    return ['restaurant', 'bus']
}

/*
function createInterest(coordinates : number[][],  style : StyleLike) {
    const feature = new Feature({
        geometry : new MultiPoint(coordinates),
    })
    feature.setStyle(style)
    return feature
}
*/
