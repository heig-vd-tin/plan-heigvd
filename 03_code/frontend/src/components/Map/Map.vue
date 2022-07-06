<template>
  <div ref="maproot" class="map"></div>
  <div class="zoomPanel">
    <Tool tool-name="Zoom" :is-last="true">
      <ZoomChange
        @zoom-up="zoomChange(1)"
        @zoom-down="zoomChange(-1)"
      />
    </Tool>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {View, Map} from "ol";
import 'ol/ol.css'
import {
  backgroundStyle1,
  backgroundStyle2,
  emptyStyle,
  labelStyleFunction,
  lineStyle,
  polygonStyle,
  ressourceStyleFunction,
} from "../../mapElement/style";
import {
  createEmptyVectorLayer,
  getOpenStreetMapLayer, setBackgroundFeaturesToBackgroundLayer,
  setFeaturesToLayer, setFloorFeaturesToFloorLayer, setResourcesLayer
} from "../../mapElement/Layer";
import {currentFloorStore} from "../../stores/currentFloor";
import {filtersStore} from "../../stores/Filters";
import {currentBuildingStore} from "../../stores/currentBuilding";
import {getSelect, getInteractionData} from "../../mapElement/select";
import Tool from "../ToolPanel/Tool.vue";
import ZoomChange from "./ZoomChange.vue";
import {featureStore} from "../../stores/feature";

// define the props component
const props = defineProps<{
  loadingFinished : boolean,
  selectedRoom? : string
}>()

const emit = defineEmits(['roomSelected', 'roomUnselected'])

// zoom
function zoomChange(n : number){
  const currentZoom = view.getZoom()
  if (currentZoom !== undefined) {
    view.setZoom(currentZoom + n)
  }
}

function adjustZoom() {
  if (innerWidth < 1024) {
    zoomChange(-1)
  }
}

// the view
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

  // change map when Zoom change
  map.value.on('moveend', () => {
    const zoom = view.getZoom()
    if (zoom != undefined) {
      if (zoom >= 20) {
        labelsLayer.setStyle(labelStyleFunction)
        backgroundLayer.setStyle(backgroundStyle2)
      }
      else {
        labelsLayer.setStyle(polygonStyle)
        backgroundLayer.setStyle(backgroundStyle1)
        resourceLayer.setStyle(ressourceStyleFunction)
      }
    }
  })

  // add the selection interraction to the map
  const selects = getSelect(labelsLayer, resourceLayer)
  map.value.addInteraction(selects.select)
  map.value.addInteraction(selects.selectHover)

  // event on selection selection
  selects.select.on('select', (e) => {
    const data = getInteractionData(e)
    if (data !== null) {
      emit('roomSelected', data)
    }
    else {
      emit('roomUnselected')
    }
  })
})

// stores
const currentBuilding = currentBuildingStore()
const currentFloor = currentFloorStore()
const filter = filtersStore()

watch(() => props.loadingFinished, () => {
  setBackgroundFeaturesToBackgroundLayer(backgroundLayer, currentBuilding.selected)
  setFloorFeaturesToFloorLayer(
      lineLayer,
      polygonLayer,
      labelsLayer,
      resourceLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )
})

watch(() => currentFloor.currentFloorName, () => {
  setFloorFeaturesToFloorLayer(
      lineLayer,
      polygonLayer,
      labelsLayer,
      resourceLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )
})

watch(() => filter.checked, (newFilters : string[]) => {
  setResourcesLayer(resourceLayer,newFilters, currentBuilding.selected, currentFloor.currentFloorName)
})

watch(() => currentBuilding.selected, () => {
  setBackgroundFeaturesToBackgroundLayer(backgroundLayer, currentBuilding.selected)

  if (currentBuilding.info != undefined) {
    view.setCenter(currentBuilding.info.center)
    view.setZoom(currentBuilding.info.zoom)
    view.setRotation(currentBuilding.info.rotation)
    view.setMaxZoom(currentBuilding.info.maxZoom)
    view.setMinZoom(currentBuilding.info.minZoom)
    adjustZoom()
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

.zoomPanel {
  position: absolute;
  background-color: var(--secondary-background-color);
  z-index: 2;
  width: 60px;
  right: 20px;
  bottom: 20px;
}
</style>
