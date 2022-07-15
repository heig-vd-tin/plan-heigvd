import fetch from 'cross-fetch'
import {Feature} from "ol";

async function handleFetch(input : string) {
    return await fetch(input)
        .then(res => {
            if (!res.ok){
                return null
            }
            return res.json()
        })
}

export async function getBuildings() {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/buildings`)
}

export async function getFloorsOfBuildings(buildingId : number) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/buildings/${buildingId}/floors`)
}

export async function getFeaturesOfBuilding(buildingId : number) : Promise<Feature[]> {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/buildings/${buildingId}/features`)
}

export async function getFeaturesOfFloor(floorId : number) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/floors/${floorId}/features`)
}

export async function getResourceOfBuilding (buildingId : number) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/buildings/${buildingId}/resources`)
}

export async function getResourceOfRoom (roomId : number) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/rooms/${roomId}/resources`)
}

export async function getPeople (search : string) {
    const resp = await fetch(`https://contacts.heig-vd.ch/search/${search}.json`).then(res => res.json())
    const obj = resp.people
    const p : {id : string, name : string}[] = []
    for (const letter in obj) {
        for (const person of obj[letter]){
            p.push({id : person.id, name : `${person.first_name} ${person.last_name}`})
        }
    }
    return p
}

export async function getPersonLocation (id : string) {
    const resp = await fetch(`https://contacts.heig-vd.ch//people/details/${id}.json`).then(res => res.json())
    return resp.office
}

export async function getRoomSuggestions(input : string) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/rooms/search/${input}`)
}

export async function getRoomByName(name : string) {
    return await handleFetch(`${import.meta.env.VITE_API_URL}/api/rooms/${name}`)
}
