import {Text, Fill, Stroke, Style} from "ol/style";
import {FeatureLike} from "ol/Feature";

const lineStyle = new Style({
    stroke: new Stroke({
        color: 'rgba(20, 20, 20, 1)',
        width: 1,
    }),
})

const polygonStyle = new Style({
    stroke: new Stroke({
        width: 0,
    }),
    fill: new Fill({
        color: 'rgba(220, 220, 220, 1)',
    })
})

const roomStyle = new Style({
    fill: new Fill({
        color: 'rgba(220, 0, 0, 1)',
    })
})

const labelStyle = new Style({
    text: new Text({
        font: '15px Calibri,sans-serif',
        fill: new Fill({
            color: '#000',
        }),
        stroke: new Stroke({
            color: '#ffffff',
            width: 4,
        }),
    }),
})

function labelStyleFunction(feature : FeatureLike) {
    labelStyle.getText().setText(`${feature.get('name')}`)
    return labelStyle
}

export {polygonStyle, lineStyle, labelStyleFunction, roomStyle}
