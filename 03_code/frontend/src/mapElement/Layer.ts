import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import {StyleLike} from "ol/style/Style";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";


function getOpenStreetMapLayer() {
    return new TileLayer({
        source :new OSM()
    })
}

function setFeaturesToLayer (layer : VectorLayer<VectorSource>, features : Feature[] | undefined) : VectorSource | undefined {
    if (features != undefined) {
        const source = layer.getSource()
        if (source != null) {
            source.clear()
            source.addFeatures(features)
            return source
        }
    }
}

function createEmptyVectorLayer(style : StyleLike) {
    return new VectorLayer({
        source : new VectorSource({ features: []}),
        style: style,
    })
}

export {getOpenStreetMapLayer, setFeaturesToLayer, createEmptyVectorLayer}
