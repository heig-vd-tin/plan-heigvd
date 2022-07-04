const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const request = require("./database")

app.use(cors())

app.get('/building', async (req, res) => {
    const data = await request.getBuildings();
    res.json(data.rows)
})

app.get('/:building/floors', async (req, res) => {
    const data = await request.getBuildingFloors(req.params.building);
    res.json(data.rows)
})

app.get('/:building/polygons', async (req, res) => {
    const data = await request.getAllPolygons(req.params.building);
    res.json(data.rows[0].json_build_object)
})

app.get('/:building/resource', async (req, res) => {
    const data = await request.getRessourcesOfBuidling(req.params.building);
    res.json(data.rows[0].json_build_object)
})

app.get('/:building/:floor/features', async (req, res) => {
    const lines = await request.getFloorGis(req.params.building, req.params.floor, 'line');
    const polygons = await request.getFloorGis(req.params.building, req.params.floor, 'polygon');
    const labels = await request.getFloorLabels(req.params.building, req.params.floor);
    const resources = await request.getRessourcesOfFloor(req.params.building, req.params.floor);

    res.json({
        lines : lines.rows[0].json_build_object,
        polygons : polygons.rows[0].json_build_object,
        labels : labels.rows[0].json_build_object,
        resources : resources.rows[0].json_build_object,
    })
})

app.get('/rooms/:name', async (req, res) => {
    const data = await request.getRoomGis(req.params.name);
    res.json(data.rows[0].json_build_object)
})

app.listen(3001)
