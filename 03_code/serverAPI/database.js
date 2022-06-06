const {Pool} = require("pg");

const credentials = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'plan',
}

const pool = new Pool(credentials);

async function getFloorGis(tableName, type) {
    const text = `SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(${tableName}.*)::json)
    ) FROM ${tableName}
    WHERE idx_floor = '1' and type = '${type}'` ;
    return pool.query(text);
}

async function getAllRoomGis() {
    const text = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(room.*)::json)
    )
    FROM room` ;
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

module.exports = {getAllRoomName, getRoomGis, getFloorGis, getAllRoomGis}
