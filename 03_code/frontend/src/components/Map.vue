<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

import {View, Map, Feature} from "ol";
import 'ol/ol.css'

import {getRoomGis} from "../api/api";
import {
  backgroundStyle1, backgroundStyle2,
  emptyStyle,
  labelStyleFunction,
  lineStyle,
  polygonStyle, selectedRoomStyleFunction
} from "../mapElement/style";
import {
  createEmptyVectorLayer,
  getOpenStreetMapLayer,
  setFeaturesToLayer
} from "../mapElement/Layer";
import {FloorFeature} from "../mapElement/Feature";
import {Select} from "ol/interaction";

const props = defineProps<{
  zoom : number,
  center : number[],
  rotation : number,
  maxZoom : number,
  minZoom : number,

  floorFeatures? : FloorFeature,
  backgroundFeatures? : Feature[],
  interestsFeatures? : Feature[],
  selectedRoom? : string
}>()

const emit = defineEmits(['roomSelected', 'roomUnselected'])

let view = new View({
  center: props.center,
  zoom: props.zoom,
  rotation: props.rotation,
  constrainResolution: true,
  maxZoom : props.maxZoom,
  minZoom : props.minZoom
})

// the element which the map is attached
const maproot = ref<HTMLElement | undefined>(undefined)

// the reactive map
const map = ref<Map | undefined>(undefined)

// Declaration of the map layers
let lineLayer = createEmptyVectorLayer(lineStyle)
let polygonLayer = createEmptyVectorLayer(polygonStyle)
let labelsLayer = createEmptyVectorLayer(polygonStyle)
// let roomLayer = createEmptyVectorLayer()
let backgroundLayer = createEmptyVectorLayer(backgroundStyle1)
let ressourceLayer = createEmptyVectorLayer(emptyStyle)

const select = new Select({
  style : selectedRoomStyleFunction,
  layers : [labelsLayer]
})

onMounted(() => {
  const osmLayer = getOpenStreetMapLayer()

  //mount the map
  map.value = new Map({
    target : maproot.value,
    layers: [
      osmLayer,
      backgroundLayer,
      polygonLayer,
      // roomLayer,
      labelsLayer,
      lineLayer,
      ressourceLayer
    ],
    view: view
  })

  // change map when map move
  map.value.on('moveend', () => {
    const zoom = view.getZoom()
    if (zoom != undefined) {
      if (zoom >= 20) {
        labelsLayer.setStyle(labelStyleFunction)
        backgroundLayer.setStyle(backgroundStyle2)
      } else {
        labelsLayer.setStyle(polygonStyle)
        backgroundLayer.setStyle(backgroundStyle1)
      }
    }
  })

  map.value.addInteraction(select)
  select.on('select', (e) => {
    console.log(e.target.getFeatures())
    emit('roomSelected', 'test')
  })

})

watch(() => props.backgroundFeatures, (newFeatures) => {
  setFeaturesToLayer(backgroundLayer, newFeatures)
})

watch(() => props.floorFeatures, (newFeatures) => {
  if (newFeatures != undefined) {
    setFeaturesToLayer(lineLayer, newFeatures.lines)
    setFeaturesToLayer(polygonLayer, newFeatures.polygons)
    setFeaturesToLayer(labelsLayer, newFeatures.labels)
  }
})

watch(() => props.interestsFeatures, (newFeatures) => {
  /*if (newFeatures != undefined) {
    const source = ressourceLayer.getSource()
    if (source != null) {
      source.clear()
      source.addFeatures(newFeatures)
      console.log(source)
    }
  }*/
  setFeaturesToLayer(ressourceLayer, newFeatures)
})
/*
watch(() => props.selectedRoom, async (newRoom) => {
  if (newRoom != undefined) {
    const features = await getRoomGis(newRoom)
    const source = setFeatureToLayer(roomLayer, features)
    if (source != undefined) {
      view.fit(source.getExtent())
    }
  }
})*/



</script>

<style scoped>
.map {
  margin-top: 50px;
  height: 100%;
  width: 100%;
}
</style>
