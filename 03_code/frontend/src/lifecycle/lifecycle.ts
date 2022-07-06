import {getBuildings, getBuildingsFloors} from "../api/api";
import {currentBuildingStore} from "../stores/currentBuilding";
import {filtersStore} from "../stores/Filters";
import {currentFloorStore} from "../stores/currentFloor";
import {GeoJSON} from "ol/format";
import {fetchBaseFeatures, fetchOtherFeatures} from "./fetchFeatures";
import {featureStore} from "../stores/feature";

export async function loadAndDisplayBaseData() {
    await initBuildingStore()
    const buildingStore = currentBuildingStore()
    initFloorStore()
    if (buildingStore.info !== undefined) {
        await fetchBaseFeatures(
            buildingStore.selected,
            buildingStore.info.groundFloor
        )
    }
    filtersStore().initStore(featureStore().getResourcesTypeList())
}

export async function loadOtherData() {
    const buildingStore = currentBuildingStore()
    if (buildingStore.info !== undefined) {
        await fetchOtherFeatures(
            buildingStore.list,
            buildingStore.info.floors,
            buildingStore.selected,
            buildingStore.info.groundFloor
        )
    }
    filtersStore().initStore(featureStore().getResourcesTypeList())
}

async function initBuildingStore() {
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
}

function initFloorStore() {
    const buildingStore = currentBuildingStore()
    if (buildingStore.info !== undefined) {
        currentFloorStore().initStore(
            buildingStore.selected,
            buildingStore.info.floors,
            buildingStore.info.groundFloor
        )
    }
}


