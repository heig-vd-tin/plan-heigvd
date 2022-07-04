import fetch from 'cross-fetch'
import {Feature} from "ol";

export async function getBuildings() {
    return await fetch(`${import.meta.env.VITE_API_URL}/building`).then(res => res.json())
}

export async function getBuildingsFloors(building : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${building}/floors`).then(res => res.json())
}

export async function getAllPolygonsOfBuilding(building : string) : Promise<Feature[]> {
    return await fetch(`${import.meta.env.VITE_API_URL}/${building}/polygons`).then(res => res.json())
}

export async function getFeaturesOfFloor(building : string, floor : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${building}/${floor}/features`).then(res => res.json())
}

export async function getResourceOfBuilding (building : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${building}/resource`).then(res => res.json())
}

export async function getResourceOfRoom (building : string, room : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/${building}/${room}/resource`).then(res => res.json())
}

export async function getRoomGis (roomName : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomName}`).then(res => res.json())
}

export async function getPersonsOfRoom (room : string) {
    const resp = await fetch(`https://contacts.heig-vd.ch/search/${room}.json`).then(res => res.json())
    const obj = resp.people
    const p : string[] = []
    for (const letter in obj) {
        for (const person of obj[letter]){
            p.push(`${person.first_name} ${person.last_name}`)
        }
    }
    console.log(p)
    return p
}


