import {Text, Fill, Stroke, Style, Icon} from "ol/style";
import {FeatureLike} from "ol/Feature";

const emptyStyle = new Style({})

const lineStyle = new Style({
    stroke: new Stroke({
        color: 'rgba(100, 100, 100, 1)',
        width: 1,
    }),
})

const polygonStyle = new Style({
    stroke: new Stroke({
        width: 0,
    }),
    fill: new Fill({
        color: 'rgba(245, 245, 245 , 1)',
    })
})

const backgroundStyle1 = new Style({
    stroke: new Stroke({
        width: 0,
    }),
    fill: new Fill({
        color: 'rgba(235, 235, 235 , 1)',
    })
})

const backgroundStyle2 = new Style({
    fill: new Fill({
        color: 'rgba(200, 200, 200 , 1)',
    })
})

const selectedRoomStyle = new Style({
    stroke: new Stroke({
        width: 0,
    }),
    fill: new Fill({
        color: 'rgba(220, 0, 0, 1)',
    }),
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

function selectedRoomStyleFunction (feature : FeatureLike) {
    selectedRoomStyle.getText().setText(`${feature.get('name')}`)
    return selectedRoomStyle
}

const labelStyle = new Style({
    fill: new Fill({
        color: 'rgba(245, 245, 245 , 1)',
    }),
    image: new Icon({
        scale : 0.05,
        crossOrigin: 'anonymous',
        src: `src/assets/bus.png`,
    }),
    text: new Text({
        font: '15px Avenir,sans-serif',
        fill: new Fill({
            color: '#000',
        }),
        stroke: new Stroke({
            color: '#ffffff',
            width: 4,
        }),
    }),
})

const labelHoverStyle = new Style({
    fill: new Fill({
        color: 'rgba(200, 200, 200 , 1)',
    }),
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
    const name =  feature.get('name')
    labelStyle.getText().setText(`${name}`)
    return labelStyle

}

function labelHoverStyleFunction(feature : FeatureLike) {
    labelHoverStyle.getText().setText(`${feature.get('name')}`)
    return labelHoverStyle
}

function ressourceStyleFunction (feature : FeatureLike) : Style {
    return new Style({
        image: new Icon({
            scale : 0.2,
            crossOrigin: 'anonymous',
            src: `src/assets/${feature.get('type')}.png`,
        })
    })
}

function ressourceHoverStyleFunction (feature : FeatureLike) : Style {
    return new Style({
        image: new Icon({
            scale : 0.25,
            crossOrigin: 'anonymous',
            src: `src/assets/${feature.get('type')}.png`,
        })
    })
}

function ressourceSelectedStyleFunction (feature : FeatureLike) : Style {
    return new Style({
        image: new Icon({
            scale : 0.25,
            crossOrigin: 'anonymous',
            src: `src/assets/${feature.get('type')}_selected.png`,
        })
    })
}

export {
    emptyStyle,
    polygonStyle,
    backgroundStyle1,
    backgroundStyle2,
    lineStyle,
    labelStyleFunction,
    selectedRoomStyleFunction,
    ressourceStyleFunction,
    labelHoverStyleFunction,
    ressourceHoverStyleFunction,
    ressourceSelectedStyleFunction
}
