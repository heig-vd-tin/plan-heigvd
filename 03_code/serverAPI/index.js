const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const {Pool} = require('pg')


app.use(cors())

const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'planHEIG',
    password: 'admin',
    port: '5432'
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

app.get('/line', async (req, res) => {
    const data = await getFloorGis("floor_geometry", 'line');
    res.send(JSON.stringify(data.rows[0].json_build_object))
})


app.get('/polygon', async (req, res) => {
    const data = await getFloorGis("floor_geometry", 'polygon');
    res.send(JSON.stringify(data.rows[0].json_build_object))
})


app.get('/rooms', async (req, res) => {
    const data = await getAllRoomGis();
    res.send(JSON.stringify(data.rows[0].json_build_object))
})

/*
app.get('/polylines_cafet', (req, res) => {
    const raw = fs.readFileSync("E_Step/E_polylines_cafet.geojson");
    const json = JSON.parse(raw)
    res.send(JSON.stringify(json))
})

app.get('/e_step_cafet', (req, res) => {
    const raw = fs.readFileSync("E_Step/E_Step_cafet.geojson");
    const json = JSON.parse(raw)
    res.send(JSON.stringify(json))
})

app.get('/room', async (req, res) => {
    const data = await getGis("chillout");
    let geojson = data.rows[0].json_build_object
    geojson.properties = {name : "Chillout"}
    console.log(geojson.properties)
    res.send(JSON.stringify(geojson))
})
*/
app.listen(3001)
