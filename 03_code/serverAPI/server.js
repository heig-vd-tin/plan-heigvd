const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const request = require("./database")

app.use(cors())

app.get('/:floor/lines', async (req, res) => {

    const data = await request.getFloorGis(req.params.floor, 'line');
    res.json(data.rows[0].json_build_object)
})


app.get('/:floor/polygons', async (req, res) => {
    const data = await request.getFloorGis(req.params.floor, 'polygon');
    res.json(data.rows[0].json_build_object)
})


app.get('/:floor/labels', async (req, res) => {
    const data = await request.getFloorLabels(req.params.floor);
    res.json(data.rows[0].json_build_object)
})

app.get('/polygons', async (req, res) => {
    const data = await request.getAllPolygons();
    console.log(data)
    res.json(data.rows[0].json_build_object)
})

app.get('/rooms/name', async (req, res) => {
    const data = await request.getAllRoomName();
    res.json(data.rows)
})

app.get('/rooms/:name', async (req, res) => {
    const data = await request.getRoomGis(req.params.name);
    res.json(data.rows[0].json_build_object)
})

app.get('/resource', async (req, res) => {
    const data = await request.getRessources('Cheseaux');
    res.json(data.rows[0].json_build_object)
})

app.get('/:floor/resource', async (req, res) => {
    const data = await request.getRessources(req.params.floor);
    res.json(data.rows[0].json_build_object)
})

app.listen(3001)
