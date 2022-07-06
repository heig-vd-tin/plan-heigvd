import {defineStore} from "pinia";
import {ref} from "vue";


export const currentFloorStore = defineStore('currentFloor', () => {
    let building = ''
    let floors = ref<string[]>([])
    const id = ref(0)
    const currentFloorName = ref('')
    const previousFloorName = ref('')
    const nextFloorName = ref('')

    function up() {
        if (id.value < floors.value.length - 1) {
            id.value++
            setFloors()
        }
    }

    function down() {
        if (id.value > 0) {
            id.value--
            setFloors()
        }
    }

    function setFloors() {
        currentFloorName.value = floors.value[id.value]

        if (id.value === floors.value.length - 1) {
            nextFloorName.value = ' '
        }
        else {
            nextFloorName.value = floors.value[id.value + 1]
        }

        if (id.value === 0) {
            previousFloorName.value = ' '
        }
        else {
            previousFloorName.value = floors.value[id.value - 1]
        }
    }

    function initStore(b : string, f : string[], groundFloor : string) {
        if (b !== ''  && groundFloor !== '' && f.indexOf(groundFloor) !== -1) {
            building = b
            floors.value = f
            id.value = floors.value.indexOf(groundFloor)
            setFloors()
        }
    }

    return {
        id,
        floors,
        previousFloorName,
        currentFloorName,
        nextFloorName,
        building,
        down,
        up,
        initStore
    }
})
