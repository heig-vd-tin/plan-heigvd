const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const request = require("./database")

app.use(cors())


async function handleBasicRequestWithOneParameter(param, res, errorMsg, fn) {
    const rawData = await fn(param);
    console.log(rawData)
    const data = rawData.rows
    if (data.length !== 0) {
        res.status(200)
        res.json(data)
    }
    else {
        res.status(400)
        res.json( {error : errorMsg})
    }
}

async function handleFeaturesRequest(param, res, errorMsg, fn) {
    const rawData = await fn(param);
    const data = rawData.rows[0].json_build_object
    if (data.features !== null) {
        res.status(200)
        res.json(data)
    }
    else {
        res.status(400)
        res.json( {error : errorMsg})
    }
}

app.get('/api/buildings', async (req, res) => {
    const data = await request.getBuildings();
    res.json(data.rows)
})

app.get('/api/buildings/:buildingId/features', async (req, res) => {
    await handleFeaturesRequest(
        req.params.buildingId,
        res,
        'Building Building is inexistent or has no attached features',
        request.getFeaturesOfBuildingByBuildingId
    )
})

app.get('/api/buildings/:buildingId/floors', async (req, res) => {
    await handleBasicRequestWithOneParameter(
        req.params.buildingId,
        res,
        'Building is inexistent or has no attached floors',
        request.getFloorsOfBuildingByBuildingId
    )
})

app.get('/api/buildings/:buildingId/resources', async (req, res) => {
    handleFeaturesRequest(
        req.params.buildingId,
        res,
        'Building is inexistent or has no attached resources',
        request.getResourceOfBuildingByBuildingId
    )
})

app.get('/api/floors/:floorId/features', async (req, res) => {
    const rawLines = await request.getFeaturesOfFloorByFloorIdAndType(req.params.floorId, 'line');
    const rawPolygons = await request.getFeaturesOfFloorByFloorIdAndType(req.params.floorId, 'polygon');
    const rawLabels = await request.getLabelsOfFloorByFloorId(req.params.floorId);
    const rawResources = await request.getResourceOfFloorByFloorId(req.params.floorId);

    const lines = rawLines.rows[0].json_build_object
    const polygons = rawPolygons.rows[0].json_build_object
    const labels = rawLabels.rows[0].json_build_object
    const resources = rawResources.rows[0].json_build_object

    if (lines.features !== null || polygons.features !== null || labels.features !== null) {
        res.status(200)
        res.json({
            lines : lines,
            polygons : polygons,
            labels : labels,
            resources : resources,
        })
    }
    else {
        res.status(200)
        res.json({error : 'floor inexistent or has no feature attached'})
    }

})

app.get('/api/rooms/:roomId/resources', async (req, res) => {
    handleBasicRequestWithOneParameter(
        req.params.roomId,
        res,
        'room inexistent or has no resources attached!',
        request.getResourceOfRoomByRoomId
    )
})

app.get('/api/rooms/search/:search', async (req, res) => {
    const formattedReq = req.params.search.toLowerCase()
    await handleBasicRequestWithOneParameter(
        formattedReq,
        res,
        `No rooms has '${formattedReq}' in their name`,
        request.getRoomsByResearch,
    )
})

app.get('/api/rooms/:name', async (req, res) => {
    const formattedReq = req.params.name.toLowerCase()
    await handleBasicRequestWithOneParameter(
        formattedReq,
        res,
        'No rooms has this name',
        request.getRoomsByName
    )
})

app.listen(3001)
