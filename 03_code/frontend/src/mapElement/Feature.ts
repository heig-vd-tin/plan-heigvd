import {Feature} from "ol";
import {
    getLines,
    getPolygons,
    getLabels,
    getAllPolygons,
    getFloorRessource,
    getGlobalResource, getBuildings, getBuildingsFloors
} from "../api/api";
import {ressourceStyleFunction} from "./style";
import {GeoJSON} from "ol/format";
import {currentBuildingStore} from "../stores/currentBuilding";

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
export let backgroundFeatures : Feature[]
let globalResourcesFeatures : Feature[]

const geojsonTool = new GeoJSON()

// Fetch data to display when user ask the website
export async function fetchBaseFeatures() {
    const buildings = await getBuildings()
    const buildingStore = currentBuildingStore()
    console.log(buildings)
    for (const b of buildings) {
        const floors : {name : string}[] = await getBuildingsFloors(b.name)
        buildingStore.addBuildingInfo(
            b.name,
            floors.map(v => v.name),
            b.groundfloor,
            b.x,
            b.y,
            b.rotation,
            b.minZoom,
            b.maxZoom
        )
    }

    buildingStore.initStore()
    if (buildingStore.info !== undefined) {
        await fetchFloorFeatures(buildingStore.info.groundFloor)
    }

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
    if (globalResourcesFeatures != undefined){
        features.push(...globalResourcesFeatures)
    }
    if (f1 != undefined) {
        features.push(...f1)
    }
    features = features.filter(feature => {
        return filters.some(e => e === feature.getProperties().type)
    })
    features.forEach( feature => {
        feature.setStyle(ressourceStyleFunction)
    })
    return features
}

export function getResourcesList() : string[] {
    const set = new Set<string>()
    Array.from(floorsFeatures.values())
        .forEach(v => {
            v.resources?.forEach(w => set.add(w.getProperties().type))
        })
    globalResourcesFeatures.forEach(v => set.add(v.getProperties().type))
    return Array.from(set)
}
