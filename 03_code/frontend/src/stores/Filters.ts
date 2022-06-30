import {defineStore} from "pinia";
import {ref} from "vue";
import {floorsFeatures, getResourcesList} from "../mapElement/Feature";

export const filtersStore = defineStore('filters', () => {

    const list = ref<string[]>([])
    const checked = ref<string[]>([])

    function push(value : string) {
        checked.value = [...checked.value, value]
        console.log(checked.value)
    }

    function remove(value : string) {
        checked.value = checked.value.filter(v => v !== value )
        console.log(checked.value)
    }

    function initStore() {
        list.value = getResourcesList()
        checked.value = list.value
    }

    return {
        list,
        checked,
        push,
        remove,
        initStore
    }
})
