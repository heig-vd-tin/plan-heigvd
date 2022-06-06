<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, onUpdated, ref, watch} from "vue";

import {View, Map, Feature} from "ol";

import {getLines, getPolygons, getRoomGis, getRoomsGis} from "../api/api";
import {labelStyleFunction, lineStyle, polygonStyle, roomStyle} from "../mapElement/style";
import {createEmptyVectorLayer, createVectorLayer, getOpenStreetMapLayer} from "../mapElement/Layer";
import 'ol/ol.css'
import {GeoJSON} from "ol/format";
import {FloorFeature} from "../mapElement/Feature";

const props = defineProps<{
  zoom : number,
  center : number[],
  floorFeatures? : FloorFeature,
  selectedRoom? : string
}>()

const maproot = ref<HTMLElement | undefined>(undefined)
const map     = ref<Map | undefined>(undefined)
let roomLayer = createEmptyVectorLayer(roomStyle)
let view = new View({
  center: props.center,
  zoom: props.zoom,
  constrainResolution: true
})

//mount the map
onUpdated(() => {
  if (props.floorFeatures != undefined) {
    const osmLayer = getOpenStreetMapLayer()
    const lineLayer = createVectorLayer(props.floorFeatures.lines, lineStyle)
    const polygonLayer = createVectorLayer(props.floorFeatures.polygons, polygonStyle)
    const labelsLayer = createVectorLayer(props.floorFeatures.labels, labelStyleFunction)

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
