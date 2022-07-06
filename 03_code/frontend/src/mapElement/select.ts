import {Select} from "ol/interaction";
import {
    hoverStyleFunction,
    selectedStyleFunction
} from "./style";
import {pointerMove} from "ol/events/condition";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {SelectEvent} from "ol/interaction/Select";
import {Info} from "../interface/interface";

export function getSelect(
    roomLayer : VectorLayer<VectorSource>,
    resourceLayer : VectorLayer<VectorSource>
) {
    // Declaration of the Select layer
    const selectRoom = new Select({
        style : selectedStyleFunction,
        layers : [roomLayer, resourceLayer]
    })
    const selectRoomHover = new Select({
        condition: pointerMove,
        style: hoverStyleFunction,
        layers : [roomLayer, resourceLayer]
    });

    return {
        select: selectRoom,
        selectHover: selectRoomHover,
    }
}


export function getInteractionData(e : SelectEvent) : Info[] | null {
    const features = e.target.getFeatures()
    const data : Info[] = []
    if (features.getLength() > 0) {
        for (let i = 0; i < features.getLength(); i++) {
            const properties = features.item(i).getProperties()
            if (properties.image_name === undefined) {
                data.push({
                    flag: 'room',
                    name: properties.name,
                    type: properties.type,
                    surface: properties.surface,
                    capacity: properties.capacity
                })
            }
            else {
                data.push({
                    flag: 'resource',
                    name: properties.name,
                    type: properties.type,
                    surface: null,
                    capacity: null
                })
            }
        }
        return data
    }
    else return null
}
