import {Text, Fill, Stroke, Style, Icon} from "ol/style";
import {FeatureLike} from "ol/Feature";
import {images} from "../data/image";

// colors
const white     = 'rgba(245, 245, 245 , 1)'
const lightGrey = 'rgba(235, 235, 235 , 1)'
const grey      = 'rgba(200, 200, 200 , 1)'
const darkGrey  = 'rgba(100, 100, 100, 1)'
const black     = '#000'
const red       = 'rgba(220, 0, 0, 1)'

const textLabel = new Text({
    font: '15px Avenir,sans-serif',
    fill: new Fill({
        color: black,
    }),
    stroke: new Stroke({
        color: white,
        width: 4,
    }),
})

export const emptyStyle = new Style({})

export const lineStyle = new Style({
    stroke: new Stroke({
        color: darkGrey,
        width: 1,
    }),
})

export const polygonStyle = new Style({
    fill: new Fill({
        color: white,
    })
})
export const backgroundStyle1 = new Style({
    stroke: new Stroke({
        color: grey,
        width: 1,
    }),
    fill: new Fill({
        color: lightGrey,
    })
})

export const backgroundStyle2 = new Style({
    fill: new Fill({
        color: grey,
    })
})

const selectedRoomStyle = new Style({
    fill: new Fill({
        color: red,
    }),
    text: textLabel,
})

export function selectedStyleFunction (feature : FeatureLike) {
    if(feature.get('image_name') === undefined) {
        selectedRoomStyle.getText().setText(`${feature.get('name')}`)
        return selectedRoomStyle
    }
    else {
        const imgName = feature.get('image_name').split('.')[0]
        const img = images.get(`${imgName}_selected`)
        return getRessourceStyle(img, 0.25)
    }
}

// label style
const labelStyle = new Style({
    fill: new Fill({
        color: white,
    }),
    text: textLabel,
})
export function labelStyleFunction(feature : FeatureLike) {
    const name =  feature.get('name')
    labelStyle.getText().setText(`${name}`)
    return labelStyle
}

const labelHoverStyle = new Style({
    fill: new Fill({
        color: grey,
    }),
    text: textLabel,
})
export function hoverStyleFunction(feature : FeatureLike) {
    if(feature.get('image_name') === undefined) {
        labelHoverStyle.getText().setText(`${feature.get('name')}`)
        return labelHoverStyle
    }
    else {
        const imgName = feature.get('image_name').split('.')[0]
        const img = images.get(imgName)
        return getRessourceStyle(img, 0.25)
    }
}

// Ressource style
function getRessourceStyle(imgUrl : string | undefined, scale : number) {
    if (imgUrl != undefined) {
        return new Style({
            image: new Icon({
                scale : scale,
                crossOrigin: 'anonymous',
                src: imgUrl,
            })
        })
    }
    else return new Style()
}

export function ressourceStyleFunction (feature : FeatureLike) : Style {
    const imgName = feature.get('image_name').split('.')[0]
    const img = images.get(imgName)
    return getRessourceStyle(img, 0.2)
}
