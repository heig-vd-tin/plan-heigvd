import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from "ol/layer/Vector";
import OSM from 'ol/source/OSM';
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {fromLonLat, Projection} from "ol/proj";
import {Fill, Stroke, Style, Text} from 'ol/style';

const line = await fetch('http://localhost:3001/line').then(res => res.json())
const polygon = await fetch('http://localhost:3001/polygon').then(res => res.json())
const rooms = await fetch('http://localhost:3001/rooms').then(res => res.json())


/*
const eStepMain = await fetch('http://localhost:3001/e_step_main').then(res => res.json())
const cafetLines = await fetch('http://localhost:3001/lines_cafet').then(res => res.json())
const cafetPolylines = await fetch('http://localhost:3001/polylines_cafet').then(res => res.json())
const eStepCafet = await fetch('http://localhost:3001/e_step_cafet').then(res => res.json())
const room = await fetch('http://localhost:3001/room').then(res => res.json())
 */

const lineStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(20, 20, 20, 1)',
    width: 1,
  }),
})

const mapStyle = new Style({
  stroke: new Stroke({
    width: 0,
  }),
  fill: new Fill({
    color: 'rgba(220, 220, 220, 1)',
  })
})

const roomStyle = new Style({
  fill: new Fill({
    color: 'rgba(220, 220, 220, 1)',
  })
});

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
});

labelStyle.getText().setText(`Chillout`)

const style = [roomStyle, labelStyle]

const lineLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(line)}),
  style: lineStyle,
})
const polygonLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(polygon)}),
  style: mapStyle
})
const roomsLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(rooms)}),
  style: function (feature) {
    labelStyle.getText().setText(`${feature.get('name')}`)
    return [roomStyle, labelStyle]
  },
})
/*
const cafetLinesLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(cafetLines)}),
  style: lineStyle,
})
const cafetPolylinesLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(cafetPolylines)}),
  style: lineStyle
})
const cafetEStepLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(eStepCafet)}),
  style: mapStyle,
})



const roomLayer = new VectorLayer({
  source : new VectorSource({ features: new GeoJSON().readFeatures(room)}),
  style: style,
})
*/
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    polygonLayer,
    roomsLayer,
    lineLayer,

  ],
  view: new View({
    center: fromLonLat([6.66, 46.779]),
    zoom: 18
  })
});
