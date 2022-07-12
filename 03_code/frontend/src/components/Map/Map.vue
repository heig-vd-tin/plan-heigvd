<template>
  <div ref="maproot" class="map"></div>
  <div
      class="zoomPanel"
      :style="isInfoPanelVisible ? {'right' : '300px'} : {'right' : '0px'}"
  >
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
  backgroundStyleFar,
  backgroundStyleMiddle,
  backgroundStyleNear,
  emptyStyle,
  labelStyleFunction,
  lineStyle,
  polygonStyle,
  ressourceStyleFunction,
} from "../../mapElement/style";
import {
  createEmptyVectorLayer,
  getOpenStreetMapLayer, setBackgroundFeaturesToBackgroundLayer,
  setFloorFeaturesToFloorLayer, setResourcesLayer
} from "../../mapElement/Layer";
import {currentFloorStore} from "../../stores/currentFloor";
import {filtersStore} from "../../stores/Filters";
import {currentBuildingStore} from "../../stores/currentBuilding";
import {getSelect, getInteractionData} from "../../mapElement/select";
import Tool from "../ToolPanel/Tool.vue";
import ZoomChange from "./ZoomChange.vue";
import {featureStore} from "../../stores/feature";
import {Info} from "../../interface/interface";
import {roomSelectedStore} from "../../stores/roomSelected";

// define the props component
const props = defineProps<{
  loadingFinished : boolean,
  isInfoPanelVisible : boolean
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
let backgroundLayer = createEmptyVectorLayer(backgroundStyleMiddle)
let resourceLayer = createEmptyVectorLayer(emptyStyle)

const selects = getSelect(labelsLayer, resourceLayer)

onMounted(() => {
  const osmLayer = getOpenStreetMapLayer()

  //mount the map
  map.value = new Map({
    target : maproot.value,
    layers: [
      osmLayer,
      backgroundLayer,
      polygonLayer,
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
        backgroundLayer.setStyle(backgroundStyleNear)
      }
      else if (zoom < 18) {
        lineLayer.setStyle(emptyStyle)
        polygonLayer.setStyle(emptyStyle)
        labelsLayer.setStyle(emptyStyle)
        backgroundLayer.setStyle(backgroundStyleFar)
        resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(emptyStyle))
      }
      else  {
        lineLayer.setStyle(lineStyle)
        polygonLayer.setStyle(polygonStyle)
        labelsLayer.setStyle(polygonStyle)
        backgroundLayer.setStyle(backgroundStyleMiddle)
        resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(ressourceStyleFunction))
      }
    }
  })

  // add the selection interraction to the map

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
const roomSelected = roomSelectedStore()

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


watch(() => roomSelected.selected, (newRoom) => {
  if (newRoom !== undefined) {
    const feature = featureStore().getRoomFeature(newRoom)
    if (feature !== undefined) {
      selects.select.getFeatures().clear()
      selects.select.getFeatures().push(feature)
      const extend = feature.getGeometry()?.getExtent()
      if (extend !== undefined) {
        view.fit(extend)
      }

      const info : Info[] = [{
        flag : 'room',
        id : newRoom.room_id,
        name : newRoom.room_name,
        type : newRoom.room_type,
        surface : newRoom.room_surface,
        capacity : newRoom.room_capacity
      }]
      emit('roomSelected', info)
    }
  }
})
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
  bottom :0 ;
  transition: right 0.3s ease-out;
  border: 1px solid var(--border-color);
}
</style>
