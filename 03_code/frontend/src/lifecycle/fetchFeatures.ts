import {getAllPolygonsOfBuilding, getFeaturesOfFloor, getResourceOfBuilding} from "../api/api";
import {GeoJSON} from "ol/format";
import {featureStore} from "../stores/feature";
import {Feature} from "ol";
import {FloorFeatures} from "../interface/interface";

const geojsonTool = new GeoJSON()

export async function fetchBaseFeatures(building : string, groundFloor : string) {
    await fetchFloorFeatures(building, groundFloor)
    await fetchBackgroundFeatures(building)
    await fetchBuildingResources(building)
}

export async function fetchOtherFeatures(buildings : string[], floors : string[], initialBuilding : string, initialGroundFloor : string) {
    for(const building of buildings) {
        for (const floor of floors) {
            if (building !== initialBuilding || floor !== initialGroundFloor) {
                await fetchFloorFeatures(building, floor)
            }
        }
    }

}

function formatFeatures(f : any) : Feature[] | null {
    if (f.features !== null) {
        return geojsonTool.readFeatures(f)
    }
    else {
        return null
    }
}

async function fetchFloorFeatures(building : string, floor : string) {
    const floorFeatures = await getFeaturesOfFloor(building, floor)

    const polygons  = formatFeatures(floorFeatures.polygons)
    const lines     = formatFeatures(floorFeatures.lines)
    const labels    = formatFeatures(floorFeatures.labels)
    const resources = formatFeatures(floorFeatures.resources)

    if (polygons !== null && lines !== null && labels !== null){
        const floorFeatures : FloorFeatures = {
            lines : lines,
            polygons : polygons,
            labels : labels,
            resources : resources
        }
        featureStore().addFloorFeature(building, floor, floorFeatures)
    }
}

async function fetchBackgroundFeatures(building : string) {
    const rawBackground = await getAllPolygonsOfBuilding(building)
    const backgroundFeatures = geojsonTool.readFeatures(rawBackground)
    featureStore().addBackgroundFeature(building, backgroundFeatures)
}

async function fetchBuildingResources(building : string) {
    const globalResource = await getResourceOfBuilding(building )
    const globalResourcesFeatures = geojsonTool.readFeatures(globalResource)
    featureStore().addBuildingResourceFeature(building, globalResourcesFeatures)
}
