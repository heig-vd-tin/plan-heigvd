<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, onUpdated, ref, watch} from "vue";

import {View, Map, Feature} from "ol";

import {getLines, getPolygons, getRoomGis, getLabels} from "../api/api";
import {labelStyleFunction, lineStyle, polygonStyle, roomStyle} from "../mapElement/style";
import {createEmptyVectorLayer, createVectorLayer, getOpenStreetMapLayer} from "../mapElement/Layer";
import 'ol/ol.css'
import {GeoJSON} from "ol/format";
import {FloorFeature} from "../mapElement/Feature";
import VectorLayer from "ol/layer/Vector";
import {Geometry} from "ol/geom";

const props = defineProps<{
  zoom : number,
  center : number[],
  floorFeatures? : FloorFeature,
  selectedRoom? : string
}>()

const maproot = ref<HTMLElement | undefined>(undefined)
const map     = ref<Map | undefined>(undefined)

let lineLayer = createEmptyVectorLayer(lineStyle)
let polygonLayer = createEmptyVectorLayer(polygonStyle)
let labelsLayer = createEmptyVectorLayer(labelStyleFunction)
let roomLayer = createEmptyVectorLayer(roomStyle)

let view = new View({
  center: props.center,
  zoom: props.zoom,
  constrainResolution: true
})

//mount the map
onMounted(() => {
  const osmLayer = getOpenStreetMapLayer()

  map.value = new Map({
    target : maproot.value,
    layers: [
      osmLayer,
      polygonLayer,
      roomLayer,
      lineLayer,
      labelsLayer
    ],
    view: view
  })
})

watch(() => props.floorFeatures, (newFeatures) => {
  if (newFeatures != undefined) {

    const lineSource = lineLayer.getSource()
    const lineFeatures = new GeoJSON().readFeatures(newFeatures.lines)
    if (lineSource != null) {
      lineSource.clear()
      lineSource.addFeatures(lineFeatures)
    }

    const polygonSource = polygonLayer.getSource()
    const polygonFeatures = new GeoJSON().readFeatures(newFeatures.polygons)
    if (polygonSource != null) {
      polygonSource.clear()
      polygonSource.addFeatures(polygonFeatures)
    }

    const labelSource = labelsLayer.getSource()
    const labelFeatures = new GeoJSON().readFeatures(newFeatures.labels)
    if (labelSource != null) {
      labelSource.clear()
      labelSource.addFeatures(labelFeatures)
    }
  }
})

watch(() => props.selectedRoom, async (newRoom) => {
  if (newRoom != undefined) {
    const source = roomLayer.getSource()
    const roomFeature = new GeoJSON().readFeatures( await getRoomGis(newRoom))

    if (source != null) {
      source.clear()
      source.addFeatures(roomFeature)
      view.fit(source.getExtent())
    }
  }
})

</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
