<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

import {View, Map} from "ol";

import {getLines, getPolygons, getRoomGis, getRoomsGis} from "../api/api";
import {labelStyleFunction, lineStyle, polygonStyle, roomStyle} from "../mapComponent/style";
import {createEmptyVectorLayer, createVectorLayer, getOpenStreetMapLayer} from "../mapComponent/Layer";
import 'ol/ol.css'
import {GeoJSON} from "ol/format";

const props = defineProps<{
  zoom : number,
  center : [],
  selectedRoom : string
}>()

const maproot = ref<HTMLElement | undefined>(undefined)
const map     = ref<Map | undefined>(undefined)
let roomLayer = createEmptyVectorLayer(roomStyle)

//mount the map
onMounted(async () => {
  const polygons = await getPolygons()
  const lines = await getLines()
  const rooms = await getRoomsGis()

  const osmLayer = getOpenStreetMapLayer()
  const lineLayer = createVectorLayer(lines, lineStyle)
  const polygonLayer = createVectorLayer(polygons, polygonStyle)
  const labelsLayer = createVectorLayer(rooms, labelStyleFunction)

  map.value = new Map({
    target : maproot.value,
    layers: [
      osmLayer,
      polygonLayer,
      roomLayer,
      lineLayer,
      labelsLayer
    ],
    view: new View({
      center: props.center,
      zoom: props.zoom,
      constrainResolution: true
    })
  })
})

watch(() => props.selectedRoom, async (newRoom) => {
  if (map.value != undefined) {
    const view = map.value.getView()
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
