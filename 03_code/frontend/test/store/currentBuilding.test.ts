import {currentBuildingStore} from "../../src/stores/currentBuilding";
import {expect, test} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {BuildingInfo} from "../../src/interface/interface";

setActivePinia(createPinia())

const store = currentBuildingStore()

const obj : BuildingInfo = {
    floors : ['a', 'b'],
    groundFloor : 'a',
    center : [0, 0],
    rotation : 0,
    zoom : 18,
    minZoom : 0,
    maxZoom : 25,
}

store.addBuildingInfo(
    'test',
    obj.floors,
    obj.groundFloor,
    obj.center[0],
    obj.center[1],
    obj.rotation,
    obj.minZoom,
    obj.maxZoom
)

store.addBuildingInfo(
    'test2',
    obj.floors,
    obj.groundFloor,
    obj.center[0],
    obj.center[1],
    obj.rotation,
    obj.minZoom,
    obj.maxZoom
)

test('isDataAddToMap', () => {
    expect(store.buildingsInfo.get('test') !== undefined)
})

store.initStore()

test('isStoreInitialized', () => {
    expect(store.list === ['test, test2'])
    expect(store.selected === 'test')
    expect(store.info !== undefined && store.info === obj)
})

store.change('test2')

test('isStoreChanged', () => {
    expect(store.selected === 'test2')
    expect(store.info !== undefined && store.info === obj)
})

store.change('test3')

test('isStoreNotChangedWhenChangeToInexistentBuilding', () => {
    expect(store.selected === 'test2')
    expect(store.info !== undefined && store.info === obj)
})
