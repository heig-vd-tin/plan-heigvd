import fetch from 'cross-fetch'

async function getLines() {
    return await fetch(`http://localhost:3001/line`).then(res => res.json())
}

async function getPolygons () {
    return await fetch(`http://localhost:3001/polygon`).then(res => res.json())
}

async function getRoomsName () {
    return await fetch(`http://localhost:3001/rooms/name`).then(res => res.json())
}

async function getRoomsGis() {
    return await fetch(`http://localhost:3001/rooms/gis`).then(res => res.json())
}

async function getRoomGis (roomName : string) {
    return await fetch(`http://localhost:3001/rooms/${roomName}`).then(res => res.json())
}

export {getLines, getPolygons, getRoomsName, getRoomGis, getRoomsGis}
