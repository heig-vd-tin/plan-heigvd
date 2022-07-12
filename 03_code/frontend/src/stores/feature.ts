import {defineStore} from "pinia";
import {Feature} from "ol";
import {ressourceStyleFunction} from "../mapElement/style";
import {FloorFeatures, RoomSuggestion} from "../interface/interface";

export const featureStore = defineStore('features', () => {
    const floorFeatures = new Map<string, FloorFeatures>()
    const backgroundFeatures = new Map<string, Feature[]>()
    const buildingResourceFeatures = new Map<string, Feature[]>()
    let roomSelectedFeature : Feature | undefined

    function addFloorFeature(building : string, floor : string, features : FloorFeatures) {
        const key = building + floor
        floorFeatures.set(key, features)
    }

    function addBackgroundFeature(building : string, features : Feature[]) {
        backgroundFeatures.set(building, features)
    }

    function addBuildingResourceFeature(building : string, features : Feature[]) {
        buildingResourceFeatures.set(building, features)
    }

    function getFloorFeatures(building : string, floor : string) {
        const key = building + floor
        return floorFeatures.get(key)
    }

    function getBackgroundFeatures(building : string) {
        return backgroundFeatures.get(building)

    }

    function getDisplayedResource(filters : string[], building : string, floor : string) {
        let features : Feature[] = []
        const key = building + floor
        const f1 = floorFeatures.get(key)?.resources
        const brf = buildingResourceFeatures.get(building)

        if (brf !== undefined){
            features.push(...brf)
        }
        if (f1 != undefined) {
            features.push(...f1)
        }
        features = features.filter(feature => {
            return filters.some(e => e === feature.getProperties().type)
        })
        features.forEach( feature => {
            feature.setStyle(ressourceStyleFunction)
        })
        return features
    }

    function getResourcesTypeList() {
        const set = new Set<string>()
        Array.from(floorFeatures.values())
            .forEach(v => {
                v.resources?.forEach(w => set.add(w.getProperties().type))
            })
        Array.from(buildingResourceFeatures.values())
            .forEach(v =>  {
                v.forEach(w => set.add(w.getProperties().type))
            })
        return  Array.from(set)
    }

    function getRoomFeature(roomSuggestion : RoomSuggestion) {
        const floorFeature = getFloorFeatures(roomSuggestion.building_name, roomSuggestion.floor_name)
        if (floorFeature !== undefined) {
            return roomSelectedFeature = floorFeature.labels
                .filter(v => v.getProperties().name === roomSuggestion.room_name)[0]
        }
    }

    return {
        floorFeatures,
        backgroundFeatures,
        buildingResourceFeatures,
        roomSelectedFeature,
        addFloorFeature,
        addBackgroundFeature,
        addBuildingResourceFeature,
        getFloorFeatures,
        getBackgroundFeatures,
        getDisplayedResource,
        getResourcesTypeList,
        getRoomFeature
    }
})
