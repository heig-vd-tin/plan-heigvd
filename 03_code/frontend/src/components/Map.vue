<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

import {View, Map, Feature} from "ol";
import 'ol/ol.css'

import {getRoomGis} from "../api/api";
import {
  backgroundStyle1,
  backgroundStyle2,
  emptyStyle,
  labelHoverStyleFunction,
  labelStyleFunction,
  lineStyle,
  polygonStyle,
  ressourceHoverStyleFunction,
  ressourceSelectedStyleFunction,
  ressourceStyleFunction,
  selectedRoomStyleFunction
} from "../mapElement/style";
import {
  createEmptyVectorLayer,
  getOpenStreetMapLayer,
  setFeaturesToLayer
} from "../mapElement/Layer";
import {FloorFeature, floorsFeatures, getDisplayedResource} from "../mapElement/Feature";
import {Select} from "ol/interaction";
import {pointerMove} from "ol/events/condition";
import {currentFloorStore} from "../stores/currentFloor";
import {filtersStore} from "../stores/Filters";
import {currentBuildingStore} from "../stores/currentBuilding";

const props = defineProps<{
  backgroundFeatures? : Feature[],
  selectedRoom? : string
}>()

const emit = defineEmits(['roomSelected', 'roomUnselected'])

const currentBuilding = currentBuildingStore()
// currentFloorStore().initStore(currentBuilding.info.floors, currentBuilding.info.groundFloor)

let view = new View()

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
let resourceLayer = createEmptyVectorLayer(emptyStyle)

const select = new Select({
  style : selectedRoomStyleFunction,
  layers : [labelsLayer]
})

const selectResource = new Select({
  style : ressourceSelectedStyleFunction,
  layers : [resourceLayer]
})

const selectHover = new Select({
  condition: pointerMove,
  style: labelHoverStyleFunction,
  layers : [labelsLayer]
});

const selectResourceHover = new Select({
  condition: pointerMove,
  style : ressourceHoverStyleFunction,
  layers : [resourceLayer]
})

let selectedData: { name: string, type: string | null, surface: string | null, capacity: string | null }[] = []

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
      resourceLayer
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
      }
      else if (zoom <= 16 ){
        console.log('empty')
        resourceLayer.setStyle(emptyStyle)
      }
      else {
        labelsLayer.setStyle(polygonStyle)
        backgroundLayer.setStyle(backgroundStyle1)
        resourceLayer.setStyle(ressourceStyleFunction)
      }
    }
  })

  map.value.addInteraction(select)
  map.value.addInteraction(selectResource)
  map.value.addInteraction(selectHover)
  map.value.addInteraction(selectResourceHover)

  select.on('select', (e) => {
    selectedData = []
    const features = e.target.getFeatures()
    if (features.getLength() > 0) {
      for (let i = 0; i < features.getLength(); i++) {
        const properties = features.item(i).getProperties()
        selectedData.push({
          name: properties.name,
          type: properties.type,
          surface: properties.surface,
          capacity: properties.capacity
        })
      }
      console.log(selectedData)
      emit('roomSelected', selectedData)
    } else {

      emit('roomUnselected')
    }
  })

  selectResource.on('select', (e) => {
    selectedData = []
    const features = e.target.getFeatures()
    if (features.getLength() > 0) {
      for (let i = 0; i < features.getLength(); i++) {
        const properties = features.item(i).getProperties()
        selectedData.push({
          name: properties.type,
          type: null,
          surface: null,
          capacity: null
        })
      }
      emit('roomSelected', selectedData)
    } else {
      selectedData = []
      emit('roomUnselected')
    }
  })
})

selectResource.on('pointermove', (e) => {
  console.log('here')
  const features = e.target.getFeatures()
  if (features.getLength() > 0) {
    map.value.removeInteraction(select)
    map.value.removeInteraction(selectHover)
  }
})

watch(() => props.backgroundFeatures, (newFeatures) => {
  setFeaturesToLayer(backgroundLayer, newFeatures)
})

const currentFloor = currentFloorStore()

watch(() => currentFloor.floor, (newFloor : string) => {
  const features = floorsFeatures.get(newFloor)
  if (features != undefined) {
    setFeaturesToLayer(lineLayer, features.lines)
    setFeaturesToLayer(polygonLayer, features.polygons)
    setFeaturesToLayer(labelsLayer, features.labels)
  }
  setResourcesLayer(filter.checked, newFloor)
})

const filter = filtersStore()

watch(() => filter.checked, (newFilters : string[]) => {
  setResourcesLayer(newFilters, currentFloor.floor)
})

function setResourcesLayer(filters : string[], floor : string) {
  const resourcesFeatures = getDisplayedResource(filters, floor)
  setFeaturesToLayer(resourceLayer, resourcesFeatures)
}

watch(() => currentBuilding.selected, (newBuilding : string) => {
  if (currentBuilding.info != undefined) {
    view.setCenter(currentBuilding.info.center)
    view.setZoom(currentBuilding.info.zoom)
    view.setRotation(currentBuilding.info.rotation)
    view.setMaxZoom(currentBuilding.info.maxZoom)
    view.setMinZoom(currentBuilding.info.minZoom)
    currentFloorStore().initStore(newBuilding, currentBuilding.info.floors, currentBuilding.info.groundFloor)

  }
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
