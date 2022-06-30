import {defineStore} from "pinia";
import {ref} from "vue";
import {BuildingInfo, buildingsInfo} from "../data/data";
import {currentFloorStore} from "./currentFloor";

export const currentBuildingStore = defineStore('currentBuilding', () => {

    const list = ['Cheseaux', 'St-Roch']
    const selected = ref('')
    const  info = ref<BuildingInfo | undefined>()

    function change(value : string) {
        selected.value = value
        info.value = buildingsInfo.get(value)
    }


    return {
        list,
        selected,
        info,
        change,
    }
})
