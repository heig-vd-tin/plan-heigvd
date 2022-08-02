// Store the state of the filters tool

import {defineStore} from "pinia";
import {ref} from "vue";

export const filtersStore = defineStore('filters', () => {

    const list = ref<string[]>([])
    const checked = ref<string[]>([])

    // Add a checked element to the checked list
    function push(value : string) {
        checked.value = [...checked.value, value]
        checked.value.sort()
    }

    // remove an element of the checked list
    function remove(value : string) {
        checked.value = checked.value.filter(v => v !== value )
    }

    // init the store with the value
    function initStore(l : string[]) {
        list.value = l
        list.value.sort()
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
