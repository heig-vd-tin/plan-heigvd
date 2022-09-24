// create the insertion script


const fs = require('fs')
const {parseCsv} = require("./utils");
const {readRoomData} = require("./dataReading");

// main insert function, call the other after
function insertDataIntoTables(inputPath, dbName) {
    let insert = `\\connect ${dbName}\n`
    insert += visitBuildingFiles(inputPath)
    return insert
}

// visit files and apply a function on it
function visitFiles(path, f) {
    try {
        const files = fs.readdirSync(`${path}`)
        let res = ''
        files.forEach(file => {
            res += f(file)
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

// visit the building files and apply a function on it
function visitBuildingFiles(inputPath) {
    return visitFiles(`${inputPath}`, (building) => {
        let insert = ''
        if (building !== 'resourceData.xlsx' && building !== 'resourceData.csv') {
            insert += insertDataIntoBuildingTable(inputPath, building)

            let roomData
            if (building === 'Cheseaux') {
                roomData = readRoomData(inputPath, building)
            }

            insert += visitFloorFiles(inputPath, building, roomData)
            insert += insertResourceDataIntoResourceTable(`${inputPath}/${building}/resource`)
        }
        return insert
    })
}

// visit the floor files and apply a function on it
function visitFloorFiles(inputPath, building, roomData) {

    return visitFiles(`${inputPath}/${building}`, (floor) => {
        let insert = ''
        if (floor !== 'resource' && floor !== 'roomInfo.csv' && floor !== 'roomInfo.xlsx' && floor !== 'buildingData.json'){
            insert += `insert into floor (name, idx_building) select '${floor}', id from building where name = '${building}';\n`
            insert += insertDataIntoFloorGeometryTable(inputPath, building, floor)
            insert += insertDataIntoRoomTable(inputPath, building, floor, roomData)
        }
        return insert
    })
}

// create the script for the building
function insertDataIntoBuildingTable(inputPath, building) {
    const json = JSON.parse(fs.readFileSync(`${inputPath}/${building}/buildingData.json`))
    return `INSERT INTO building ( name, x, y, ground_floor, rotation, zoom, min_zoom, max_zoom) 
VALUES ('${building}', ${json.center[0]}, ${json.center[1]}, '${json.groundFloor}', ${json.rotation}, ${json.zoom}, ${json.minZoom}, ${json.maxZoom});\n`
}

// read a geojson file in a folder and apply a function
function readGeojsonFile(path, file, f) {
    if (file.endsWith('geojson')) {
        const json = JSON.parse(fs.readFileSync(`${path}/${file}`));
        const name = file.split('.')[0]
        return f(name, json)
    }
    else return ''
}

// create the insert script for the resources table
function insertResourceDataIntoResourceTable(path) {
    return visitFiles(path, file  => readGeojsonFile(path, file,(name, json) => {
        let content = ''


        json.features.forEach( feature => {
            const properties = feature.properties

            if (properties.room !== null) {
                content += `INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT '${properties.name}', '${properties.type}', '${properties.img}', null, building.id, floor.id, room.id, ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
INNER JOIN room
    ON floor.id = room.idx_floor
WHERE building.name = '${properties.building}' AND room.name = '${properties.room}';\n`
            }


            else if (properties.floor !== null) {
                content += `INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT '${properties.name}', '${properties.type}', '${properties.img}', null, building.id, floor.id, null, ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = '${properties.floor}' AND building.name = '${properties.building}';\n`
            }

            else {
                content += `INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT '${properties.name}', '${properties.type}', '${properties.img}', null, building.id, null, null, ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}')
FROM building
WHERE building.name = '${properties.building}';\n`
            }
        })
        return content
    }))
}

// create the insert script for the floor geometry table
function insertDataIntoFloorGeometryTable (inputPath, buildingName, floorName) {
    const path = `${inputPath}/${buildingName}/${floorName}`
    return visitFiles(path, file => readGeojsonFile(path, file,(name, json) => {
        let content = ''
        let type = "line"
        if (json.features[0].geometry.type === 'MultiPolygon') {
            type = "polygon"
        }
        json.features.forEach(
            feature => content += `insert into floor_geometry (idx_floor, type, geom) select id, '${type}', ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}') from floor where name = '${floorName}';\n`
        )
        return content
    }))
}

// visit all the geojson file and call the inserRoo function
function insertDataIntoRoomTable (inputPath, buildingName, floorName, data) {
    const path = `${inputPath}/${buildingName}/${floorName}/rooms`
    return visitFiles(path, file =>  {
        return readGeojsonFile(path, file, (name, json) => {
            name = name.replaceAll('_', ' ')
            if (name.startsWith('wc')) {
                name = 'WC'
            }
            return insertRoom(name, floorName, json.features[0].geometry, data)
        })
    })
}


// create the insert script for the room table
function insertRoom(roomName, floorName, gis, data) {
    let d
    if (roomName === 'WC' || roomName === 'Ascenseur' || roomName === 'vidoir') {
        d = {
            secondName : 'NULL',
            type : `'${roomName}'`,
            surface : 'NULL',
            capacity : 'NULL'
        }
    }
    else {
        d = data.get(roomName)
    }
    return `insert into room (name, second_name, type, surface, capacity, idx_floor, geometry) select '${roomName}',${d.secondName} , ${d.type}, ${d.surface}, ${d.capacity}, id, ST_GeomFromGeoJSON('${JSON.stringify(gis)}') from floor where name = '${floorName}';\n`
}

module.exports = {insertDataIntoTables}
