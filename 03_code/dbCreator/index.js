const fs = require('fs')

const inputPath = '../../02_plan/geojson'
const outputPath = '../../04_deploy/sql'
const dbName = 'plan'

function main () {
    const init = `CREATE DATABASE ${dbName}`
    write('01_init', init)

    let create = `\\connect ${dbName}\n`
    create += `CREATE EXTENSION postgis;\n`
    create += `create table if not exists building (id serial primary key, name varchar(255));\n`
    create += `create table if not exists floor (id serial primary key, name varchar(255), idx_building int);\n`
    create += `create table if not exists floor_geometry (id serial primary key, idx_floor int, type varchar(255), geom geometry);\n`
    create += `create table if not exists room (id serial primary key, name varchar(255), idx_floor int, geometry geometry);\n`
    write('02_create', create)

    let insert = `\\connect ${dbName}\n`
    const buildingName = 'Cheseaux'
    const floorName = 'E'
    insert += `insert into building (name) VALUES ('${buildingName}');\n`
    insert += `insert into floor (name, idx_building) select '${floorName}', id from building where name = 'Cheseaux';\n`
    insert += insertFloorGeom(floorName)
    insert += insertRoomData(floorName)
    write('03_insert', insert)
}

function write(filename, content) {
    fs.writeFile(`${outputPath}/${filename}.sql`, content, err => {
        if (err) {
            console.error(err);
        }
    })
}

function insertFloorGeom (floorName) {
    try {
        const arrayOfFiles = fs.readdirSync(`${inputPath}/${floorName}_Step`)
        let content = ''
        for (const file of arrayOfFiles) {
            if (file.endsWith('geojson') && file != 'E_Lines.geojson' && file != 'E_polylines.geojson' ) {
                const json = JSON.parse(fs.readFileSync(`${inputPath}/${floorName}_Step/${file}`));
                let type = ""
                if (json.features[0].geometry.type == 'MultiPolygon') {
                    type = "polygon"
                } else {
                    type = "line"
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

function insertRoomData (floorName) {
    const arrayOfFiles = fs.readdirSync(`${inputPath}/${floorName}_Step/rooms`)
    content = ''
    for (const file of arrayOfFiles) {
        if (file.endsWith('geojson')) {
            const json = JSON.parse(fs.readFileSync(`${inputPath}/${floorName}_Step/rooms/${file}`));

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

main()
