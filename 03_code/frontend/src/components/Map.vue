<template>
  <div ref="maproot" class="map"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {View, Map, Feature} from "ol";
import 'ol/ol.css'
import {
  backgroundStyle1,
  backgroundStyle2,
  emptyStyle,
  labelStyleFunction,
  lineStyle,
  polygonStyle,
  ressourceStyleFunction,
} from "../mapElement/style";
import {
  createEmptyVectorLayer,
  getOpenStreetMapLayer,
  setFeaturesToLayer
} from "../mapElement/Layer";
import {floorsFeatures, getDisplayedResource} from "../mapElement/Feature";
import {currentFloorStore} from "../stores/currentFloor";
import {filtersStore} from "../stores/Filters";
import {currentBuildingStore} from "../stores/currentBuilding";
import {getSelect, setInteraction} from "../mapElement/select";

// define the props component
const props = defineProps<{
  backgroundFeatures? : Feature[],
  selectedRoom? : string
}>()

const emit = defineEmits(['roomSelected', 'roomUnselected'])

const currentBuilding = currentBuildingStore()

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

  // add the selection interraction to the map
  const selects = getSelect(labelsLayer, resourceLayer)
  for (const select in selects) {
    map.value.addInteraction(selects[select])
  }

  function emitInteractionResult(data : string[]) {
    if (data.length > 0) {
      emit('roomSelected', data)
    } else {
      emit('roomUnselected')
    }
  }

  // event on room selection
  selects.selectRoom.on('select', (e) => {
    const data = setInteraction(e)
    emitInteractionResult(data)
  })

  // event on resource selection
  selects.selectResource.on('select', (e) => {
    const data = setInteraction(e)
    emitInteractionResult(data)
  })
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
