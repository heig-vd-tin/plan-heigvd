import {
    backgroundStyleFar,
    backgroundStyleMiddle,
    backgroundStyleNear,
    emptyStyle,
    labelStyleFarFunction,
    labelStyleMiddleFunction,
    labelStyleNearFunction,
    lineStyle,
    polygonStyle,
    ressourceStyleFunction,
    roomByTypeFarStyleFunction,
    roomByTypeMiddleStyleFunction,
    roomByTypeNearStyleFunction
} from "./style";
import {Map, View} from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {displayStore} from "../stores/display";
import {BuildingInfo, Layers} from "../interface/interface";

const zooms = {
    FAR : 17,
    MIDDLE: 19,
    NEAR : 21
}


export function createMap(target : HTMLElement | undefined, view : View, layers : Layers) {
    const map = new Map({
        target : target,
        layers: [
            layers.osmLayer,
            layers.backgroundLayer,
            layers.floorLayer.polygonLayer,
            layers.floorLayer.labelsLayer,
            layers.floorLayer.lineLayer,
            layers.floorLayer.resourceLayer
        ],
        view: view
    })

    // change map when Zoom change
    map.on('moveend', () => {
        const zoom = view.getZoom()
        if (zoom != undefined) {
            if (zoom >= zooms.NEAR) {
                layers.backgroundLayer.setStyle(backgroundStyleNear)
            }
            else if (zoom < zooms.FAR) {
                layers.floorLayer.lineLayer.setStyle(emptyStyle)
                layers.floorLayer.polygonLayer.setStyle(emptyStyle)
                layers.backgroundLayer.setStyle(backgroundStyleFar)
                layers.floorLayer.resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(emptyStyle))
            }
            else  {
                layers.floorLayer.lineLayer.setStyle(lineStyle)
                layers.floorLayer.polygonLayer.setStyle(polygonStyle)
                layers.backgroundLayer.setStyle(backgroundStyleMiddle)
                layers.floorLayer.resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(ressourceStyleFunction))
            }
            setLabelLayerStyleByZoom(layers.floorLayer.labelsLayer, zoom)
        }
    })
    return map
}


export function setLabelLayerStyleByZoom(labelsLayer : VectorLayer<VectorSource>, zoom : number | undefined) {
    const display = displayStore()
    if (zoom !== undefined) {
        switch (display.currentMode) {
            case 'DEFAULT' : {
                if (zoom >= zooms.NEAR) labelsLayer.setStyle(labelStyleNearFunction)
                else if (zoom >= zooms.MIDDLE) labelsLayer.setStyle(labelStyleMiddleFunction)
                else if (zoom >= zooms.FAR) labelsLayer.setStyle(labelStyleFarFunction)
                else labelsLayer.setStyle(emptyStyle)
                break
            }
            case 'BY_TYPE' : {
                if (zoom >= zooms.NEAR) labelsLayer.setStyle(roomByTypeNearStyleFunction)
                else if (zoom >= zooms.MIDDLE) labelsLayer.setStyle(roomByTypeMiddleStyleFunction)
                else if (zoom >= zooms.FAR) labelsLayer.setStyle(roomByTypeFarStyleFunction)
                else labelsLayer.setStyle(emptyStyle)
                break
            }
        }
    }
}

export function setView(view : View, buildingInfo : BuildingInfo) {
    if (buildingInfo != undefined) {
        view.setCenter(buildingInfo.center)
        view.setZoom(buildingInfo.zoom)
        view.setRotation(buildingInfo.rotation)
        view.setMaxZoom(buildingInfo.maxZoom)
        view.setMinZoom(buildingInfo.minZoom)
    }
}
