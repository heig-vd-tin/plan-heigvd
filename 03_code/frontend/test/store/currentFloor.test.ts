import {createPinia, setActivePinia} from "pinia";
import {currentFloorStore} from "../../src/stores/currentFloor";
import {expect, test} from "vitest";

setActivePinia(createPinia())

const store = currentFloorStore()

const building = 'test'
const floors = ['A', 'B' ,'C']
const groundFloor = 'A'

store.initStore(building, floors, groundFloor)

test('isStoreCorrectlyInitialized', () => {
    expect(store.building === building)
    expect(store.floors === floors)
    expect(store.id === 0)
    expect(store.currentFloorName === 'A')
    expect(store.previousFloorName === 'B')
    expect(store.previousFloorName === ' ')
})

store.initStore('', floors, groundFloor)

test('isStoreNotChangedWhenVoidStringBuiding', () => {
    expect(store.building === building)
})

store.initStore(building, [], groundFloor)

test('isStoreNotChangedWhenVoidArrayFloors', () => {
    expect(store.floors === floors)
})

store.initStore(building, floors, '')

test('isStoreNotChangedWhenVoidStringForGroundFloor', () => {
    expect(store.id === 0)
})

store.initStore(building, floors, 'D')
test('isStoreNotChangedWhenInexistantGroundFloor', () => {
    expect(store.id === 0)
})

store.up()
test('isStoreNotChangedWhenInexistantGroundFloor', () => {
    expect(store.currentFloorName === 'B')
    expect(store.previousFloorName === 'C')
    expect(store.previousFloorName === 'A')
})

store.down()
test('isStoreNotChangedWhenInexistantGroundFloor', () => {
    expect(store.currentFloorName === 'A')
    expect(store.previousFloorName === 'B')
    expect(store.previousFloorName === ' ')
})
