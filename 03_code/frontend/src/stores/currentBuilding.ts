import {defineStore} from "pinia";
import {ref} from "vue";
import {currentFloorStore} from "./currentFloor";

export interface BuildingInfo {
    floors : string[],
    groundFloor : string,
    center : number[]
    rotation : number,
    zoom : number,
    minZoom : number,
    maxZoom : number,
}

export const currentBuildingStore = defineStore('currentBuilding', () => {

    const buildingsInfo = new Map<string, BuildingInfo>()

    let list = ref<string[]>( [])
    const selected = ref('')
    const info = ref<BuildingInfo | undefined>()

    function change(value : string) {
        selected.value = value
        info.value = buildingsInfo.get(value)
    }

    function addBuildingInfo(
        name : string,
        floors : string[],
        groundFloor : string,
        x : number,
        y : number,
        rotation : number,
        minZoom : number,
        maxZoom : number
    ) {
        buildingsInfo.set(name, {
            floors : floors,
            groundFloor : groundFloor,
            center : [x, y],
            rotation : rotation,
            zoom : 18,
            minZoom : minZoom,
            maxZoom : maxZoom,
        })
    }

    function initStore() {
        list.value = Array.from(buildingsInfo.keys())
        change(list.value[0])
    }

    return {
        list,
        selected,
        info,
        change,
        addBuildingInfo,
        initStore
    }
})
