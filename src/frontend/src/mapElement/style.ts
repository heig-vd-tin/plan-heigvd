// THis file group the differtent openlayers style

import {Text, Fill, Stroke, Style, Icon} from "ol/style";
import {FeatureLike} from "ol/Feature";
import {images} from "../data/image";
import {ColorLike} from "ol/colorlike";

// colors
const white     = 'rgba(245, 252, 252 , 1)'
const lightGrey = 'rgba(225, 232, 232 , 1)'
const grey      = 'rgba(180, 187, 187 , 1)'
const darkGrey  = 'rgba(100, 107, 107, 1)'
const black     = '#000'
const red       = 'rgba(220, 0, 0, 1)'

// text style
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

// style of the background layer when zoom is low
export const backgroundStyleFar = new Style({
    stroke: new Stroke({
        color: black,
        width: 1,
    }),
    fill: new Fill({
        color: darkGrey,
    })
})

// style of the background layer when zoom is middle
export const backgroundStyleMiddle = new Style({
    stroke: new Stroke({
        color: darkGrey,
        width: 1,
    }),
    fill: new Fill({
        color: grey,
    })
})

// style of the background layer when zoom is high
export const backgroundStyleNear = new Style({
    fill: new Fill({
        color: darkGrey,
    })
})

// style when a room is selected
const selectedRoomStyle = new Style({
    fill: new Fill({
        color: red,
    }),
    text: textLabel,
})

// function that apply a style when a room or a resource is selected
export function selectedStyleFunction (feature : FeatureLike) {
    if(feature.get('image_name') === undefined) {
        getFullName(feature, selectedRoomStyle)
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
        color: lightGrey,
    }),
    text: textLabel,
})

// function that apply no text to the label layer
function getNoName(style : Style) {
    style.getText().setText(``)
    return style
}

// function that apply just the first name to the label layer
function getHalfName(feature : FeatureLike, style : Style) {
    const name =  feature.get('name')
    style.getText().setText(`${name}`)
    return style
}

// function that apply the first and second name to the label layer
function getFullName(feature : FeatureLike, style : Style) {
    const name =  feature.get('name')
    const secondName = feature.get('second_name')
    if (secondName !== null) {
        style.getText().setText(`${name}\n${secondName}`)
    }
    else {
        labelStyle.getText().setText(`${name}`)
    }
    return style
}

// style applied to label layer when zoom is high
export function labelStyleNearFunction(feature : FeatureLike) {
    return getFullName(feature, labelStyle)
}

// style applied to label layer when zoom is middle
export function labelStyleMiddleFunction(feature : FeatureLike) {
    return getHalfName(feature, labelStyle)
}

// style applied to label layer when zoom is low
export function labelStyleFarFunction(feature : FeatureLike) {
    return getNoName(labelStyle)
}

// style applied when a room is hovered
const labelHoverStyle = new Style({
    fill: new Fill({
        color: grey,
    }),
    text: textLabel,
})

// function that apply a style when a room or a resource is hovered
export function hoverStyleFunction(feature : FeatureLike) {
    if(feature.get('image_name') === undefined) {
        return getFullName(feature, labelHoverStyle)
    }
    else {
        const imgName = feature.get('image_name').split('.')[0]
        const img = images.get(imgName)
        return getRessourceStyle(img, 0.25)
    }
}

// create the resource style
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

// style applied to the resource layer
export function ressourceStyleFunction (feature : FeatureLike) : Style {
    const imgName = feature.get('image_name').split('.')[0]
    const img = images.get(imgName)
    return getRessourceStyle(img, 0.2)
}

// create the style for the display by type
function getRoomByTypeStyle(color : ColorLike) {
    return new Style({
        fill: new Fill({
            color: color,
        }),
        text: textLabel,
    })
}

// get the color for the type of room
function getColorType(feature : FeatureLike) {
    switch (feature.get('type')) {
        case 'Auditoire' : return 'rgb(241,192,192)'
        case 'Laboratoire' : return 'rgb(198,198,238)'
        case 'Atelier' : return 'rgb(200,236,236)'
        case 'Service technique' : return 'rgba(200,200,200,1)'
        case 'Salle de cours' : return 'rgb(250,195,190)'
        case 'Bureau' : return 'rgb(193,231,205)'
        case 'Cafétéria' : return 'rgb(239,224,201)'
        case 'Salle de réunion' : return'rgb(230,253,215)'
        case 'Aula' : return 'rgb(255,163,163)'
        case 'Réception' : return 'rgb(230,255,228)'
        case 'Bibliothèque' : return 'rgb(215,248,255)'
        case 'Salle de conférence' : return 'rgb(235,255,213)'
        case 'Espace étudiants' : return 'rgb(241,206,219)'
        default  : return 'rgb(180,180,180)'
    }
}


// style applied to label layer when zoom is high when display by type is activated
export function roomByTypeNearStyleFunction (feature : FeatureLike) {
    const color = getColorType(feature) as ColorLike
    const style = getRoomByTypeStyle(color as ColorLike)
    return getFullName(feature, style)
}

// style applied to label layer when zoom is middle when display by type is activated
export function roomByTypeMiddleStyleFunction (feature : FeatureLike) {
    const color = getColorType(feature) as ColorLike
    const style = getRoomByTypeStyle(color as ColorLike)
    return getHalfName(feature, style)
}

// style applied to label layer when zoom is low when display by type is activated
export function roomByTypeFarStyleFunction (feature : FeatureLike) {
    const color = getColorType(feature) as ColorLike
    const style = getRoomByTypeStyle(color as ColorLike)
    return getNoName(style)
}
