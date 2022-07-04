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

async function getFloorGis(building, floor, type) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) 
    FROM floor_geometry
    INNER JOIN floor
        ON floor.id = floor_geometry.idx_floor
    INNER JOIN building
        ON building.id = floor.idx_building
    WHERE floor.name = '${floor}' 
        AND floor_geometry.type = '${type}'
        AND building.name = '${building}';`
    return pool.query(text);
}

async function getAllPolygons(building) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(floor_geometry.*)::json)
    ) 
    FROM floor_geometry
    INNER JOIN floor
        ON floor.id = floor_geometry.idx_floor
    INNER JOIN building
        ON building.id = floor.idx_building
    WHERE floor_geometry.type = 'polygon' AND building.name = '${building}';`
    return pool.query(text);
}

async function getFloorLabels(building, floor) {
    const text = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(room.*)::json)
    )
    FROM room
    INNER JOIN floor
        ON room.idx_floor = floor.id
    INNER JOIN building
        ON floor.idx_building = building.id 
    WHERE floor.name = '${floor}' AND building.name = '${building}';`
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

async function getRessourcesOfFloor(buildingName, floorName) {
    const text =  `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(resource.*)::json)
    )
    FROM resource
    INNER JOIN floor 
        ON resource.idx_floor = floor.id
    INNER JOIN building
        ON building.id = resource.idx_building
    WHERE floor.name = '${floorName}';` ;
    return pool.query(text);
}

async function getRessourcesOfBuidling(buildingName) {
    const text =  `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(resource.*)::json)
    )
    FROM resource
    INNER JOIN building
        ON building.id = resource.idx_building
    WHERE idx_floor IS NULL AND building.name = '${buildingName}';` ;
    console.log(text)
    return pool.query(text);
}

module.exports = { getRoomGis, getFloorGis, getFloorLabels, getAllPolygons, getRessourcesOfFloor, getRessourcesOfBuidling, getBuildings, getBuildingFloors}
