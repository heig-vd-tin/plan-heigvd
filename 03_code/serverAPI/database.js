const {Pool} = require("pg");

const credentials = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'plan',
}

const pool = new Pool(credentials);

async function getBuildings() {
    const text = `SELECT * FROM building`
    return pool.query(text);
}

async function getBuildingFloors(building) {
    const text = `SELECT floor.name FROM floor INNER JOIN building ON floor.idx_building = building.id WHERE building.name = '${building}'`
    return pool.query(text);
}

async function getFloorGis(floor, type) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) FROM floor_geometry
    WHERE idx_floor = (select id from floor where name = '${floor}' Limit 1) and type = '${type}';`
    console.log(text)
    return pool.query(text);
}

async function getAllPolygons(type) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) FROM floor_geometry
    WHERE type = 'polygon';`
    console.log(text)
    return pool.query(text);
}

async function getFloorLabels(floor) {
    const text = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(room.*)::json)
    )
    FROM room
    WHERE idx_floor = (select id from floor where name = '${floor}' limit 1) ;`
    return pool.query(text);
}

async function getRoomGis(roomName) {
    const text = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(room.*)::json)
    )
    FROM room WHERE room.name = '${roomName}'` ;
    return pool.query(text);
}

async function getAllRoomName() {
    const text = `SELECT name
    FROM room` ;
    return pool.query(text);
}

async function getRessources(floorName) {
    const text =  `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(resource.*)::json)
    )
    FROM resource
    WHERE attached_to = '${floorName}';` ;
    return pool.query(text);
}

module.exports = {getAllRoomName, getRoomGis, getFloorGis, getFloorLabels, getAllPolygons, getRessources, getBuildings, getBuildingFloors}
