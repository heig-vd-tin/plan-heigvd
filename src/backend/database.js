// Connect to the database and make the request

const {Pool} = require("pg");

// credentials for the connection to the database
const credentials = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'plan',
}

// connection
const pool = new Pool(credentials);

// SQL request to the database
async function getBuildings() {
    const text = `SELECT * FROM building;`
    return pool.query(text);
}

async function getFeaturesOfBuildingByBuildingId(buildingId) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) 
    FROM floor_geometry
    INNER JOIN floor
        ON floor.id = floor_geometry.idx_floor
    WHERE floor_geometry.type = 'polygon' AND floor.idx_building = ${buildingId};`
    return pool.query(text);
}

async function getFloorsOfBuildingByBuildingId(buildingId) {
    const text = `SELECT floor.id, floor.name
        FROM floor  
        WHERE floor.idx_building = ${buildingId}`
    return pool.query(text);
}

async function getResourceOfBuildingByBuildingId(buildingId) {
    const text =  `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(resource.*)::json)
    )
    FROM resource
    WHERE idx_floor IS NULL AND idx_building = ${buildingId};` ;
    return pool.query(text);
}

async function getFeaturesOfFloorByFloorIdAndType(floorId, type) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) 
    FROM floor_geometry
    WHERE idx_floor = ${floorId}
        AND floor_geometry.type = '${type}';`
    return pool.query(text);
}

async function getLabelsOfFloorByFloorId(floorId) {
    const text = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(room.*)::json)
    )
    FROM room 
    WHERE room.idx_floor = ${floorId};`
    return pool.query(text);
}

async function getResourceOfFloorByFloorId(floorId) {
    const text =  `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(resource.*)::json)
    )
    FROM resource
    WHERE idx_floor = ${floorId};`
    return pool.query(text);
}

async function getResourceOfRoomByRoomId(roomId) {
    const text =  `SELECT resource.name, resource.type
    FROM resource
    WHERE idx_room = ${roomId};`
    return pool.query(text);
}

async function getRoomsByResearch(search) {
    const text =  `SELECT room.id AS room_id, room.name AS room_name, room.type as room_type, room.surface as room_surface, room.capacity as room_capacity, floor.name as floor_name, building.name as building_name
    FROM room
    INNER JOIN floor
        ON room.idx_floor = floor.id
    INNER Join building
        ON floor.idx_building = building.id
    WHERE LOWER(room.name) LIKE '%${search}%'  OR LOWER(room.type) LIKE '%${search}%';`
    return pool.query(text);
}

async function getRoomsByName(room) {
    const text =  `SELECT room.id as room_id, room.name AS room_name, room.type as room_type, room.surface as room_surface, room.capacity as room_capacity, floor.name as floor_name, building.name as building_name
    FROM room
    INNER JOIN floor
        ON room.idx_floor = floor.id
    INNER Join building
        ON floor.idx_building = building.id
    WHERE LOWER(room.name) = '${room}' OR LOWER(room.type) = '${room}';`
    return pool.query(text);
}

module.exports = {
    getFeaturesOfFloorByFloorIdAndType,
    getLabelsOfFloorByFloorId,
    getFeaturesOfBuildingByBuildingId,
    getResourceOfFloorByFloorId,
    getResourceOfRoomByRoomId,
    getResourceOfBuildingByBuildingId,
    getBuildings,
    getFloorsOfBuildingByBuildingId,
    getRoomsByResearch,
    getRoomsByName
}
