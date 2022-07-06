import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import {StyleLike} from "ol/style/Style";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {featureStore} from "../stores/feature";

export function getOpenStreetMapLayer() {
    return new TileLayer({
        source :new OSM()
    })
}

export function setResourcesLayer(layer : VectorLayer<VectorSource>, filters : string[], building : string,  floor : string) {
    const resourcesFeatures = featureStore().getDisplayedResource(filters, building, floor)
    setFeaturesToLayer(layer, resourcesFeatures)
}

export function setBackgroundFeaturesToBackgroundLayer(layer : VectorLayer<VectorSource>, building : string) {
    const features = featureStore().getBackgroundFeatures(building)
    setFeaturesToLayer(layer, features)
}

export function setFloorFeaturesToFloorLayer(
    lineLayer : VectorLayer<VectorSource>,
    polygonLayer : VectorLayer<VectorSource>,
    labelsLayer : VectorLayer<VectorSource>,
    resourceLayer : VectorLayer<VectorSource>,
    filters : string[],
    building : string,
    floor : string
) {
    const floorFeatures = featureStore().getFloorFeatures(building, floor)
    if (floorFeatures != undefined) {
        setFeaturesToLayer(lineLayer, floorFeatures.lines)
        setFeaturesToLayer(polygonLayer, floorFeatures.polygons)
        setFeaturesToLayer(labelsLayer, floorFeatures.labels)
    }
    setResourcesLayer(resourceLayer, filters, building, floor)
}

export function setFeaturesToLayer (layer : VectorLayer<VectorSource>, features : Feature[] | undefined) : VectorSource | undefined {
    if (features != undefined) {
        const source = layer.getSource()
        if (source != null) {
            source.clear()
            source.addFeatures(features)
            return source
        }
    }
}

export function createEmptyVectorLayer(style : StyleLike) {
    return new VectorLayer({
        source : new VectorSource({ features: []}),
        style: style,
    })
}
