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
            if (zoom >= 21) {
                layers.backgroundLayer.setStyle(backgroundStyleNear)
            }
            else if (zoom < 18) {
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
                if (zoom >= 21) labelsLayer.setStyle(labelStyleNearFunction)
                else if (zoom >= 19) labelsLayer.setStyle(labelStyleMiddleFunction)
                else if (zoom >= 18) labelsLayer.setStyle(labelStyleFarFunction)
                else labelsLayer.setStyle(emptyStyle)
                break
            }
            case 'BY_TYPE' : {
                if (zoom >= 21) labelsLayer.setStyle(roomByTypeNearStyleFunction)
                else if (zoom >= 19) labelsLayer.setStyle(roomByTypeMiddleStyleFunction)
                else if (zoom >= 18) labelsLayer.setStyle(roomByTypeFarStyleFunction)
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
