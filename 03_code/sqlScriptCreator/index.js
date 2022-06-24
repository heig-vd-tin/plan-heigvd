const fs = require('fs')

if (process.argv.length != 5) {
    throw 'command : node index.js <input path> <output path> <database Name>'
}

const inputPath = process.argv[2] // '../../02_plan/geojson'
const outputPath = process.argv[3] // '../../04_deploy/sql'
const dbName =  process.argv[4] // 'plan'

function main () {
    const init = `CREATE DATABASE ${dbName}`
    write('01_init', init)

    let create = `\\connect ${dbName}\n`
    create += `CREATE EXTENSION postgis;\n`
    create += `create table if not exists building (id serial primary key, name varchar(255));\n`
    create += `create table if not exists floor (id serial primary key, name varchar(255), idx_building int);\n`
    create += `create table if not exists floor_geometry (id serial primary key, idx_floor int, type varchar(255), geom geometry);\n`
    create += `create table if not exists room (id serial primary key, name varchar(255), idx_floor int, geometry geometry);\n`
    create += `create table if not exists resource (id serial primary key, type varchar(255), attached_to varchar(255), localisation geometry);\n`
    // create += `create table if not exists resource_type (id serial primary key, type varchar(255), icon varchar(255));\n`
    write('02_create', create)

    const buildings = fs.readdirSync(`${inputPath}`)
    let insert = `\\connect ${dbName}\n`
    for (const building of buildings) {
        insert += `insert into building (name) VALUES ('${building}');\n`
        insert += insertGlobalResourceData(building)

        const floors = fs.readdirSync(`${inputPath}/${building}`)
        for (const floor of floors) {
            if (floor != 'resource'){
                //insert += `insert into floor (name, idx_building) select '${floor}', id from building where name = '${building}';\n`
                //insert += insertFloorGeom(building, floor)
                //insert += insertRoomData(building, floor)
                insert += insertFloorRessourceData(building, floor)
            }

        }
    }
    write('03_insert', insert)
}

function write(filename, content) {
    fs.writeFile(`${outputPath}/${filename}.sql`, content, err => {
        if (err) {
            console.error(err);
        }
    })
}

function insertFloorGeom (buildingName, floorName) {
    try {
        const arrayOfFiles = fs.readdirSync(`${inputPath}/${buildingName}/${floorName}`)
        let content = ''
        for (const file of arrayOfFiles) {
            if (file.endsWith('.geojson') && file != 'E_Lines.geojson' && file != 'E_polylines.geojson' ) {
                const f = fs.readFileSync(`${inputPath}/${buildingName}/${floorName}/${file}`)
                console.log(file)
                const json = JSON.parse(f);
                let type = "line"
                if (json.features[0].geometry.type == 'MultiPolygon') {
                    type = "polygon"
                }
                for (const feature of json.features) {
                    content += `insert into floor_geometry (idx_floor, type, geom) select id, '${type}', ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}') from floor where name = '${floorName}';\n`
                }
            }
        }
        return content

    } catch(e) {
        console.log(e)
    }
}

function insertRoomData (buildingName, floorName) {
    const arrayOfFiles = fs.readdirSync(`${inputPath}/${buildingName}/${floorName}/rooms`)
    content = ''
    for (const file of arrayOfFiles) {
        if (file.endsWith('geojson')) {
            const json = JSON.parse(fs.readFileSync(`${inputPath}/${buildingName}/${floorName}/rooms/${file}`));

            let name = file.split('.')[0].replaceAll('_', ' ')
            if (name.startsWith('wc')) {name = 'WC'}

            content +=  insertRoom(name, floorName, json.features[0].geometry)
        }
    }
    return content
}

function insertRoom(roomName, floorName, gis) {
    return `insert into room (name, idx_floor, geometry) select '${roomName}', id, ST_GeomFromGeoJSON('${JSON.stringify(gis)}') from floor where name = '${floorName}';\n`
}

function insertGlobalResourceData(buildingName) {
    const arrayOfFiles = fs.readdirSync(`${inputPath}/${buildingName}/resource`)
    content = ''
    for (const file of arrayOfFiles) {
        if (file.endsWith('geojson')) {
            const json = JSON.parse(fs.readFileSync(`${inputPath}/${buildingName}/resource/${file}`));
            const type = file.split('.')[0]
            for (const feature of json.features){
                content +=  `insert into resource (type, attached_to, localisation) VALUES ('${type}', '${buildingName}', ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}'));\n`
            }
        }
    }
    return content
}

function insertFloorRessourceData (buildingName, floorName) {
    const arrayOfFiles = fs.readdirSync(`${inputPath}/${buildingName}/${floorName}/resource`)
    content = ''
    for (const file of arrayOfFiles) {
        if (file.endsWith('geojson')) {
            const json = JSON.parse(fs.readFileSync(`${inputPath}/${buildingName}/${floorName}/resource/${file}`));
            const type = file.split('.')[0]
            for(feature of json.features){
                content +=  `insert into resource (type, attached_to, localisation) VALUES ('${type}', '${floorName}', ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}'));\n`
            }
        }
    }
    return content
}

main()
