import {Select} from "ol/interaction";
import {
    labelHoverStyleFunction,
    ressourceHoverStyleFunction,
    ressourceSelectedStyleFunction,
    selectedRoomStyleFunction
} from "./style";
import {pointerMove} from "ol/events/condition";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {SelectEvent} from "ol/interaction/Select";

export function getSelect(
    roomLayer : VectorLayer<VectorSource>,
    resourceLayer : VectorLayer<VectorSource>
) {
    // Declaration of the Select layer
    const selectRoom = new Select({
        style : selectedRoomStyleFunction,
        layers : [roomLayer]
    })
    const selectRoomHover = new Select({
        condition: pointerMove,
        style: labelHoverStyleFunction,
        layers : [roomLayer]
    });
    const selectResource = new Select({
        style : ressourceSelectedStyleFunction,
        layers : [resourceLayer]
    })
    const selectResourceHover = new Select({
        condition: pointerMove,
        style : ressourceHoverStyleFunction,
        layers : [resourceLayer]
    })

    return {
        selectRoom: selectRoom,
        selectRoomHover: selectRoomHover,
        selectResource : selectResource,
        selectResourceHover : selectResourceHover
    }
}


export function setInteraction(e : SelectEvent) : {name : string, type : string, surface : number | null, capacity : number | null}[] | null {
    const features = e.target.getFeatures()
    const data = []
    if (features.getLength() > 0) {
        for (let i = 0; i < features.getLength(); i++) {
            const properties = features.item(i).getProperties()
            if (properties.name != undefined) {
                data.push({
                    name: properties.name,
                    type: properties.type,
                    surface: properties.surface,
                    capacity: properties.capacity
                })
            }
            else {
                console.log(properties.name)
                data.push({
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
