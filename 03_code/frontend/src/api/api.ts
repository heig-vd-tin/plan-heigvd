import fetch from 'cross-fetch'
import {Feature} from "ol";

async function getLines(floor : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${floor}/lines`).then(res => res.json())
}

async function getPolygons (floor : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${floor}/polygons`).then(res => res.json())
}

async function getAllPolygons() : Promise<Feature[]> {
    return await fetch(`${import.meta.env.VITE_API_URL}/polygons`).then(res => res.json())
}

async function getRoomsName () {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/name`).then(res => res.json())
}

async function getLabels(floor : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${floor}/labels`).then(res => res.json())
}

async function getRoomGis (roomName : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomName}`).then(res => res.json())
}

async function getGlobalResource () {
    return await fetch(`${import.meta.env.VITE_API_URL}/resource`).then(res => res.json())
}

async function getFloorRessource (floorName : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${floorName}/resource`).then(res => res.json())
}

export {getLines, getPolygons, getRoomsName, getRoomGis, getLabels, getAllPolygons, getGlobalResource, getFloorRessource}
