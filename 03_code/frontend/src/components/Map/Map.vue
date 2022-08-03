// Component that display the map. Contain the zoom change tool

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
  labelStyleFarFunction,
  labelStyleMiddleFunction,
  labelStyleNearFunction,
  lineStyle,
  polygonStyle,
  ressourceStyleFunction,
  roomByTypeFarStyleFunction,
  roomByTypeMiddleStyleFunction,
  roomByTypeNearStyleFunction,
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
import {BuildingInfo, Info, Layers} from "../../interface/interface";
import {roomSelectedStore} from "../../stores/roomSelected";
import {displayStore} from "../../stores/display";
import {StyleLike} from "ol/style/Style";
import {createMap, setLabelLayerStyleByZoom, setView} from "../../mapElement/map";

// define the props component
const props = defineProps<{
  loadingFinished : boolean,
  isInfoPanelVisible : boolean
}>()

const emit = defineEmits(['roomSelected', 'roomUnselected'])

// the view of the map (handle zoom, crs projection, center)
let view = new View()

// the dom element where the map is attached
const maproot = ref<HTMLElement | undefined>(undefined)

// the reactive map
const map = ref<Map | undefined>(undefined)

// Declaration of the map layers
const layers : Layers = {
  osmLayer : getOpenStreetMapLayer(),
  backgroundLayer : createEmptyVectorLayer(backgroundStyleMiddle),
  floorLayer : {
    lineLayer : createEmptyVectorLayer(lineStyle),
    polygonLayer : createEmptyVectorLayer(polygonStyle),
    labelsLayer : createEmptyVectorLayer(roomByTypeFarStyleFunction),
    resourceLayer : createEmptyVectorLayer(emptyStyle)
  }
}

// openlayers Select to add interraction with layer
const selects = getSelect(
    layers.floorLayer.labelsLayer,
    layers.floorLayer.resourceLayer
)

onMounted(() => {
  const osmLayer = getOpenStreetMapLayer()

  //create the map
  map.value = createMap(maproot.value, view, layers)

  // add the openlayers Select interaction to the map
  map.value.addInteraction(selects.select)
  map.value.addInteraction(selects.selectHover)

  // event on openlayers select selection
  selects.select.on('select', (e) => {
    const data = getInteractionData(e)
    if (data !== null) {
      roomSelected.selected = []
      roomSelected.selectedBySearch = false
      roomSelected.selected.push(...data)
      emit('roomSelected')
    }
    else {
      roomSelected.selected = []
      emit('roomUnselected')
    }
  })
})

// zoom
function zoomChange(n : number){
  const currentZoom = view.getZoom()
  if (currentZoom !== undefined) {
    view.setZoom(currentZoom + n)
  }
}

// adjust the zoom for small screen
function adjustZoom() {
  if (innerWidth < 1024) {
    zoomChange(-1)
  }
}

// stores
const currentBuilding = currentBuildingStore()
const currentFloor = currentFloorStore()
const filter = filtersStore()
const roomSelected = roomSelectedStore()
const display = displayStore()

// Detect when the base feature was fetch from the database and display it on the map
watch(() => props.loadingFinished, () => {
  setBackgroundFeaturesToBackgroundLayer(layers.backgroundLayer, currentBuilding.selected)
  setFloorFeaturesToFloorLayer(
      layers.floorLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )
  layers.floorLayer.resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(ressourceStyleFunction))
})

// Detect when the user change the floor and display it to the map
watch(() => currentFloor.currentFloorName, () => {
  setFloorFeaturesToFloorLayer(
      layers.floorLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )

  // display or not the resource layer after floor changed
  const zoom = view.getZoom()
  if (zoom !== undefined && zoom >=18) {
    layers.floorLayer.resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(ressourceStyleFunction))
  }
  else {
    layers.floorLayer.resourceLayer.getSource()?.getFeatures().forEach(f => f.setStyle(emptyStyle))
  }
})

// Detect when the user change one of the resources checkbox and display the correct icon
watch(() => filter.checked, (newFilters : string[]) => {
  setResourcesLayer(layers.floorLayer.resourceLayer, newFilters, currentBuilding.selected, currentFloor.currentFloorName)
})

// Detect when the user change the building
watch(() => currentBuilding.selected, () => {
  setBackgroundFeaturesToBackgroundLayer(
      layers.backgroundLayer,
      currentBuilding.selected
  )
  setView(view, currentBuilding.info as BuildingInfo)
  adjustZoom()
})

// Detect when the user click on a suggestion in the research bar
// add to the openlayers Select and send the data to the info panel
watch(() => roomSelected.selected, (newRooms) => {
  if (newRooms.length !== 0 && roomSelected.selectedBySearch) {
    // Add to the openlayers Select
    selects.select.getFeatures().clear()
    const feature = featureStore().getRoomFeature(newRooms[0].name, currentBuilding.selected, currentFloor.currentFloorName)
    if (feature !== undefined) {
      selects.select.getFeatures().push(feature)
      const extend = feature.getGeometry()?.getExtent()
      if (extend !== undefined) {
        view.fit(extend)
      }
    }
  }
  else if(newRooms.length === 0){
    selects.select.getFeatures().clear()
  }
})

// Detect when the user change the display mode
watch(() => display.currentMode, () => {
  setLabelLayerStyleByZoom(layers.floorLayer.labelsLayer, view.getZoom())
})

</script>

<style scoped>
.map {
  margin-top: 3em;
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
  height: clamp(80px, 30%, 100px);
}
</style>
