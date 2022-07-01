import {defineStore} from "pinia";
import {ref} from "vue";


export const currentFloorStore = defineStore('currentFloor', () => {
    let building = ''
    let floors = ref<string[]>([])
    const id = ref(0)
    const floor = ref('')
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
        floor.value = floors.value[id.value]
        currentFloorName.value = floor.value

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
        building = b
        floors.value = f
        id.value = floors.value.indexOf(groundFloor)
        setFloors()
    }

    return {
        id,
        floor,
        previousFloorName,
        currentFloorName,
        nextFloorName,
        down,
        up,
        initStore
    }
})
