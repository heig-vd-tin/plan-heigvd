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

const selects = getSelect(
    layers.floorLayer.labelsLayer,
    layers.floorLayer.resourceLayer
)

onMounted(() => {
  const osmLayer = getOpenStreetMapLayer()

  //mount the map
  map.value = createMap(maproot.value, view, layers)

  // add the selection interraction to the map
  map.value.addInteraction(selects.select)
  map.value.addInteraction(selects.selectHover)

  // event on selection selection
  selects.select.on('select', (e) => {
    const data = getInteractionData(e)
    if (data !== null) emit('roomSelected', data)
    else emit('roomUnselected')
  })
})

// stores
const currentBuilding = currentBuildingStore()
const currentFloor = currentFloorStore()
const filter = filtersStore()
const roomSelected = roomSelectedStore()
const display = displayStore()


watch(() => props.loadingFinished, () => {
  setBackgroundFeaturesToBackgroundLayer(layers.backgroundLayer, currentBuilding.selected)
  setFloorFeaturesToFloorLayer(
      layers.floorLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )
})

watch(() => currentFloor.currentFloorName, () => {
  setFloorFeaturesToFloorLayer(
      layers.floorLayer,
      filter.checked,
      currentBuilding.selected,
      currentFloor.currentFloorName
  )
})

watch(() => filter.checked, (newFilters : string[]) => {
  setResourcesLayer(layers.floorLayer.resourceLayer, newFilters, currentBuilding.selected, currentFloor.currentFloorName)
})

watch(() => currentBuilding.selected, () => {
  setBackgroundFeaturesToBackgroundLayer(
      layers.backgroundLayer,
      currentBuilding.selected
  )
  setView(view, currentBuilding.info as BuildingInfo)
  adjustZoom()
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

watch(() => display.currentMode, () => {
  setLabelLayerStyleByZoom(layers.floorLayer.labelsLayer, view.getZoom())
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
