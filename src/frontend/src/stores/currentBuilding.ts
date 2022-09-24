// store the data of the current building

import {defineStore} from "pinia";
import {ref} from "vue";
import {BuildingInfo} from "../interface/interface";



export const currentBuildingStore = defineStore('currentBuilding', () => {

    const buildingsInfo = new Map<string, BuildingInfo>()

    let list = ref<string[]>( [])
    const selected = ref('')
    const info = ref<BuildingInfo | undefined>()

    // change the current building and his data
    function change(value : string) {
        if (list.value.indexOf(value) !== -1 ){
            selected.value = value
            info.value = buildingsInfo.get(value)
        }
    }

    // add building data to the store
    function addBuildingInfo(
        name : string,
        id : number,
        floors : {id : number, name : string}[],
        groundFloor : string,
        x : number,
        y : number,
        rotation : number,
        minZoom : number,
        maxZoom : number
    ) {
        buildingsInfo.set(name, {
            id : id,
            floors : floors,
            groundFloor : groundFloor,
            center : [x, y],
            rotation : rotation,
            zoom : 18,
            minZoom : minZoom,
            maxZoom : maxZoom,
        })
    }

    // init the store
    function initStore() {
        list.value = Array.from(buildingsInfo.keys())
        change(list.value[0])
    }

    return {
        list,
        selected,
        info,
        buildingsInfo,
        change,
        addBuildingInfo,
        initStore
    }
})
