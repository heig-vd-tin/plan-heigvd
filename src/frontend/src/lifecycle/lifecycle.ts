// implement the data fetching strategy

import {getBuildings, getFloorsOfBuildings} from "../api/api";
import {currentBuildingStore} from "../stores/currentBuilding";
import {filtersStore} from "../stores/Filters";
import {currentFloorStore} from "../stores/currentFloor";
import {fetchBaseFeatures, fetchOtherFeatures} from "./fetchFeatures";
import {featureStore} from "../stores/feature";

// Function that init stores and fetch the data from the database
export async function loadAndDisplayBaseData() {
    await initBuildingStore()
    const buildingStore = currentBuildingStore()
    initFloorStore()
    if (buildingStore.info !== undefined) {
        const groundFloor = buildingStore.info.groundFloor
        const groundFloorId = buildingStore.info.floors
            .filter(f => f.name === groundFloor)[0].id

        await fetchBaseFeatures(
            groundFloor,
            groundFloorId,
            buildingStore.selected,
            buildingStore.info.id
        )
    }
    filtersStore().initStore(featureStore().getResourcesTypeList())
}

// Function that load the other data
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

// init the current building store with default data
async function initBuildingStore() {
    const buildings = await getBuildings()
    const buildingStore = currentBuildingStore()
    for (const b of buildings) {
        const floors : {id : number, name : string}[] = await getFloorsOfBuildings(b.id)
        buildingStore.addBuildingInfo(
            b.name,
            b.id,
            floors,
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

// init the current floor store with the default data
function initFloorStore() {
    const buildingStore = currentBuildingStore()
    if (buildingStore.info !== undefined) {
        currentFloorStore().initStore(
            buildingStore.selected,
            buildingStore.info.floors.map(f => f.name),
            buildingStore.info.groundFloor
        )
    }
}


