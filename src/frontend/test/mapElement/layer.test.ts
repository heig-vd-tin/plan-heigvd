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
import {FloorLayers} from "../../src/interface/interface";

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
    const layers : FloorLayers= {
        labelsLayer : createEmptyVectorLayer(emptyStyle),
        lineLayer : createEmptyVectorLayer(emptyStyle),
        polygonLayer : createEmptyVectorLayer(emptyStyle),
        resourceLayer :  createEmptyVectorLayer(emptyStyle)
    }

    setFloorFeaturesToFloorLayer(layers, [],'test', 'E')
    expect(layers.lineLayer.getSource()?.getFeatures() === randomFeature)
    expect(layers.resourceLayer.getSource()?.getFeatures() === randomFeature)
    expect(layers.polygonLayer.getSource()?.getFeatures() === randomFeature)
    expect(layers.labelsLayer.getSource()?.getFeatures() === randomFeature)
})

test('setBackgroundFeaturesToBackgroundLayer', () => {
    const layer = createEmptyVectorLayer(emptyStyle)
    store.addBackgroundFeature('test', randomFeature)
    setBackgroundFeaturesToBackgroundLayer(layer, 'test')
    expect(layer.getSource()?.getFeatures() === randomFeature)
})
