import {defineStore} from "pinia";
import {ref} from "vue";


export const currentFloorStore = defineStore('currentFloor', () => {
    let building = 'Cheseaux'
    let floors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
    const id = ref(0)
    const floor = ref(' ')
    const currentFloorName = ref(' ')
    const previousFloorName = ref(' ')
    const nextFloorName = ref(' ')

    function up() {
        if (id.value < floors.length - 1) {
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
        floor.value = floors[id.value]
        currentFloorName.value = floor.value
        if (id.value === floors.length - 1) {
            nextFloorName.value = ' '
        }
        else {
            nextFloorName.value = floors[id.value + 1]
            if (building === 'Cheseaux') {
                nextFloorName.value = `${nextFloorName.value} | ${id.value - 3}`
            }
        }
        if (id.value === 0) {
            previousFloorName.value = ' '
        }
        else {
            previousFloorName.value = floors[id.value - 1]
            if (building === 'Cheseaux') {
                previousFloorName.value = `${previousFloorName.value} | ${id.value - 5}`
            }
        }
        if (building === 'Cheseaux') {
            currentFloorName.value = `${currentFloorName.value} | ${id.value - 4}`
        }
    }

    function initStore(b : string, f : string[], groundFloor : string) {
        building = b
        floors = f
        id.value = floors.indexOf(groundFloor)
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
