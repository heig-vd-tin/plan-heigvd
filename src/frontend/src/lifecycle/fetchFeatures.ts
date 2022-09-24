// fetch the data

import {getFeaturesOfBuilding, getFeaturesOfFloor, getResourceOfBuilding} from "../api/api";
import {GeoJSON} from "ol/format";
import {featureStore} from "../stores/feature";
import {Feature} from "ol";
import {FloorFeatures} from "../interface/interface";

const geojsonTool = new GeoJSON()

// main function to fetch base data
export async function fetchBaseFeatures(groundFloor : string, groundFloorId : number, buildingName : string, buildingId : number) {
    await fetchFloorFeatures(buildingName, groundFloor, groundFloorId)
    await fetchBackgroundFeatures(buildingName, buildingId)
    await fetchBuildingResources(buildingName, buildingId)
}

// main function to fetch other data
export async function fetchOtherFeatures(buildings : string[], floors : {id : number, name : string }[], initialBuilding : string, initialGroundFloor : string) {
    for(const building of buildings) {
        for (const floor of floors) {
            if (building !== initialBuilding || floor.name !== initialGroundFloor) {
                await fetchFloorFeatures(building, floor.name, floor.id)
            }
        }
    }
}

// format the features
function formatFeatures(f : any) : Feature[] | null {
    if (f.features !== null) {
        return geojsonTool.readFeatures(f)
    }
    else {
        return null
    }
}

// fetch the floor features of a floor
async function fetchFloorFeatures(buildingName : string, floorName : string, floorId : number) {
    const floorFeatures = await getFeaturesOfFloor(floorId)

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
        featureStore().addFloorFeature(buildingName, floorName, floorFeatures)
    }
}

// fetch the background feature of a building
async function fetchBackgroundFeatures(buildingName : string, buildingId : number) {
    const rawBackground = await getFeaturesOfBuilding(buildingId)
    const backgroundFeatures = geojsonTool.readFeatures(rawBackground)
    featureStore().addBackgroundFeature(buildingName, backgroundFeatures)
}

// fetch the resource of aa building
async function fetchBuildingResources(buildingName : string, buildingId : number) {
    const globalResource = await getResourceOfBuilding(buildingId )
    const globalResourcesFeatures = geojsonTool.readFeatures(globalResource)
    featureStore().addBuildingResourceFeature(buildingName, globalResourcesFeatures)
}
