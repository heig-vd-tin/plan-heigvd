import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Feature} from "ol";
import {StyleLike} from "ol/style/Style";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";


function getOpenStreetMapLayer() {
    return new TileLayer({
        source :new OSM()
    })
}

function createVectorLayer(features : Feature[], style : StyleLike){
    return new VectorLayer({
        source : new VectorSource({ features: new GeoJSON().readFeatures(features)}),
        style: style,
    })
}

function createEmptyVectorLayer(style : StyleLike) {
    return new VectorLayer({
        source : new VectorSource({ features: []}),
        style: style,
    })
}

export {getOpenStreetMapLayer, createVectorLayer, createEmptyVectorLayer}
