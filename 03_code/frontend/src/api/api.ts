import fetch from 'cross-fetch'

async function getLines() {
    return await fetch(`${import.meta.env.VITE_API_URL}/line`).then(res => res.json())
}


async function getPolygons () {
    return await fetch(`${import.meta.env.VITE_API_URL}/polygon`).then(res => res.json())
}

async function getRoomsName () {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/name`).then(res => res.json())
}

async function getRoomsGis() {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/gis`).then(res => res.json())
}

async function getRoomGis (roomName : string) {
    return await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomName}`).then(res => res.json())
}

export {getLines, getPolygons, getRoomsName, getRoomGis, getRoomsGis}
