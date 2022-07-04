import {Feature} from "ol";
import {
    getAllPolygonsOfBuilding,
    getBuildings, getBuildingsFloors, getFeaturesOfFloor, getResourceOfBuilding
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
    for (const b of buildings) {
        const floors : {name : string}[] = await getBuildingsFloors(b.name)
        buildingStore.addBuildingInfo(
            b.name,
            floors.map(v => v.name),
            b.ground_floor,
            b.x,
            b.y,
            b.rotation,
            b.min_zoom,
            b.max_zoom
        )
    }

    buildingStore.initStore()
    if (buildingStore.info !== undefined) {
        await fetchFloorFeatures(buildingStore.selected, buildingStore.info.groundFloor)
    }

    const rawBackground = await getAllPolygonsOfBuilding(buildingStore.selected)
    backgroundFeatures = geojsonTool.readFeatures(rawBackground)

    const globalResource = await getResourceOfBuilding(buildingStore.selected)
    console.log(globalResource)
    globalResourcesFeatures = geojsonTool.readFeatures(globalResource)
}

export async function fetchOtherFeatures(floors : string[], groundFloor : string) {
    for (const floor of floors) {
        if (floor != groundFloor) {
            await fetchFloorFeatures(currentBuildingStore().selected, floor)
        }
    }
}

async function fetchFloorFeatures(building : string, floor : string) {
    const floorFeatures = await getFeaturesOfFloor(building, floor)

    const polygons  = geojsonTool.readFeatures(floorFeatures.polygons)
    const lines     = geojsonTool.readFeatures(floorFeatures.lines)
    const labels    = geojsonTool.readFeatures(floorFeatures.labels)
    let resources
    if (floorFeatures.resources.features != null) {
        resources = geojsonTool.readFeatures(floorFeatures.resources)
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
