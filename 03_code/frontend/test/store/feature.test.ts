import {createPinia, setActivePinia} from "pinia";
import {featureStore} from "../../src/stores/feature";
import {ff, randomFeature} from "../data/testData";
import {expect, test} from "vitest";

setActivePinia(createPinia())

const store = featureStore()

store.addFloorFeature('Test', 'E', ff)
test('floorFeatureAdded', () => {
    expect(store.getFloorFeatures('test', 'E') === ff)
})

store.addBackgroundFeature('Test', randomFeature)

test('backgroundFeatureAdded', () => {
    expect(store.getBackgroundFeatures('test') === randomFeature)
})

store.addBuildingResourceFeature('test', randomFeature)
test('getDisplayedResource', () => {
    expect(store.getDisplayedResource(['test'], 'test', 'E') === [...randomFeature, ...randomFeature])
})

test('getCorrectResourcesTypeList', () => {
    expect(store.getResourcesTypeList() === ['test'])
})

test('getDisplayedResourceWhenFloorResourceIsNull', () => {
    ff.resources = null
    store.addFloorFeature('test', 'F', ff)

    expect(store.getDisplayedResource(['test'], 'test', 'F') === randomFeature)
})
