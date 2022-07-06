import {defineStore} from "pinia";
import {ref} from "vue";

export const filtersStore = defineStore('filters', () => {

    const list = ref<string[]>([])
    const checked = ref<string[]>([])

    function push(value : string) {
        checked.value = [...checked.value, value]
        checked.value.sort()
    }

    function remove(value : string) {
        checked.value = checked.value.filter(v => v !== value )
    }

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
