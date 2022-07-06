import {
    createEmptyVectorLayer,
    setBackgroundFeaturesToBackgroundLayer,
    setFeaturesToLayer,
    setFloorFeaturesToFloorLayer
} from "../../src/mapElement/Layer";
import {emptyStyle} from "../../src/mapElement/style";
import {expect, test} from "vitest";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {ff, randomFeature} from "../data/testData";
import {createPinia, setActivePinia} from "pinia";
import {featureStore} from "../../src/stores/feature";

setActivePinia(createPinia())

const layer = createEmptyVectorLayer(emptyStyle)

test('emptyLayerCreated', () => {
    expect(layer instanceof VectorLayer && layer.getSource() === null )
})

setFeaturesToLayer(layer, randomFeature)

test('featureSetToLayer', () => {
    expect(layer.getSource()?.getFeatures() === randomFeature)
})

const store = featureStore()

test('etFloorFeaturesToFloorLayer', () => {
    store.addFloorFeature('test', 'E', ff)
    const layer = createEmptyVectorLayer(emptyStyle)
    const layer2 = createEmptyVectorLayer(emptyStyle)
    const layer3 = createEmptyVectorLayer(emptyStyle)
    const layer4 = createEmptyVectorLayer(emptyStyle)
    setFloorFeaturesToFloorLayer(layer, layer, layer, layer, [],'test', 'E')
    expect(layer.getSource()?.getFeatures() === randomFeature)
    expect(layer2.getSource()?.getFeatures() === randomFeature)
    expect(layer3.getSource()?.getFeatures() === randomFeature)
    expect(layer4.getSource()?.getFeatures() === randomFeature)
})

test('setBackgroundFeaturesToBackgroundLayer', () => {
    const layer = createEmptyVectorLayer(emptyStyle)
    store.addBackgroundFeature('test', randomFeature)
    setBackgroundFeaturesToBackgroundLayer(layer, 'test')
    expect(layer.getSource()?.getFeatures() === randomFeature)
})
