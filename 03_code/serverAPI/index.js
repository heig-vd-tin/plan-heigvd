const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const {Pool} = require('pg')
require('dotenv').config()


app.use(cors())

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

app.get('/line', async (req, res) => {

    const data = await getFloorGis("floor_geometry", 'line');
    console.log(data.rows[0].json_build_object)
    res.json(data.rows[0].json_build_object)
})


app.get('/polygon', async (req, res) => {
    const data = await getFloorGis("floor_geometry", 'polygon');
    res.json(data.rows[0].json_build_object)
})


app.get('/rooms/gis', async (req, res) => {
    const data = await getAllRoomGis();
    res.json(data.rows[0].json_build_object)
})

app.get('/rooms/name', async (req, res) => {
    const data = await getAllRoomName();
    console.log(data)
    res.json(data.rows)
})

app.get('/rooms/:name', async (req, res) => {
    const data = await getRoomGis(req.params.name);
    res.json(data.rows[0].json_build_object)
})

app.listen(3001)
