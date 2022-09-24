import {Feature} from "ol";
import {GeoJSON} from "ol/format";
import {FloorFeatures} from "../../src/interface/interface";

export const randomFeature : Feature[] = new GeoJSON().readFeatures({
    type: "FeatureCollection",
    name: "chillout",
    crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
    features: [
        { type: "Feature", properties: { id: 1 , type : "test", name:"test"}, geometry: { type: "MultiPolygon", coordinates: [ [ [ [ 741338.553374806069769, 5906061.782963539473712 ], [ 741342.61152197944466, 5906065.031560317613184 ], [ 741342.720186439109966, 5906064.896877606399357 ], [ 741343.060145497089252, 5906065.164712542667985 ], [ 741342.960663949488662, 5906065.287151371128857 ], [ 741351.513456216780469, 5906071.931316887028515 ], [ 741358.372465878259391, 5906063.512583550997078 ], [ 741345.521553980419412, 5906053.229905378073454 ], [ 741338.553374806069769, 5906061.782963539473712 ] ] ] ] } }
    ]
})

export const randomFeature2 : Feature[] = new GeoJSON().readFeatures({
    type: "FeatureCollection",
    name: "chillout",
    crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
    features: [
        { type: "Feature", properties: { id: 1 , image_name : "bus.png"}, geometry: { type: "MultiPolygon", coordinates: [ [ [ [ 741338.553374806069769, 5906061.782963539473712 ], [ 741342.61152197944466, 5906065.031560317613184 ], [ 741342.720186439109966, 5906064.896877606399357 ], [ 741343.060145497089252, 5906065.164712542667985 ], [ 741342.960663949488662, 5906065.287151371128857 ], [ 741351.513456216780469, 5906071.931316887028515 ], [ 741358.372465878259391, 5906063.512583550997078 ], [ 741345.521553980419412, 5906053.229905378073454 ], [ 741338.553374806069769, 5906061.782963539473712 ] ] ] ] } }
    ]
})

export const randomFeature3 : Feature[] = new GeoJSON().readFeatures({
    type: "FeatureCollection",
    name: "chillout",
    crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
    features: [
        { type: "Feature", properties: { id: 1 , image_name : "test"}, geometry: { type: "MultiPolygon", coordinates: [ [ [ [ 741338.553374806069769, 5906061.782963539473712 ], [ 741342.61152197944466, 5906065.031560317613184 ], [ 741342.720186439109966, 5906064.896877606399357 ], [ 741343.060145497089252, 5906065.164712542667985 ], [ 741342.960663949488662, 5906065.287151371128857 ], [ 741351.513456216780469, 5906071.931316887028515 ], [ 741358.372465878259391, 5906063.512583550997078 ], [ 741345.521553980419412, 5906053.229905378073454 ], [ 741338.553374806069769, 5906061.782963539473712 ] ] ] ] } }
    ]
})

export const ff : FloorFeatures = {
    lines : randomFeature,
    polygons : randomFeature,
    labels : randomFeature,
    resources : randomFeature
}

