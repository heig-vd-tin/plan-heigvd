const {Pool} = require('pg')
const fs = require('fs')

const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'planHEIG',
    password: 'admin',
    port: '5432'
}

const pool = new Pool(credentials);

async function createGISTable(tableName, foreignKeyName) {
    const tableCreateQuery = `create table if not exists ${tableName} (id serial primary key, ${foreignKeyName} int , type varchar(255), geom geometry)`;
    await pool.query(tableCreateQuery);

    console.log(`creation table ${tableName} finished`);
}

async function insertGisData(tableName, type, data, foreignKeyName, foreignKey) {
    for (const feature of data) {
        const gisInsertQuery = `insert into ${tableName} (${foreignKeyName}, type, geom) VALUES (${foreignKey}, '${type}', ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}'))`;
        await pool.query(gisInsertQuery);
    }
}

async function createBuildingTable() {
    const buildingTableCreateQuery = `create table if not exists building (id serial primary key, name varchar(255))`;
    await pool.query(buildingTableCreateQuery)
    const buildingTableInsertQuery = `insert into building (name) VALUES ('Cheseaux')`;
    await pool.query(buildingTableInsertQuery)
    const getId = `select id from building where name = 'Cheseaux'`;
    const buildingId = await pool.query(getId)
    return buildingId.rows[0].id
}

async function createFloorTable(floorname, buildingId) {
    const floorTableCreateQuery = `create table if not exists floor (id serial primary key, name varchar(255), idx_building int)`;
    await pool.query(floorTableCreateQuery)
    const floorTableInsertQuery = `insert into floor (name, idx_building) VALUES ('${floorname}', ${buildingId})`;
    await pool.query(floorTableInsertQuery)
    const getId = `select id from floor where name = '${floorname}'`;
    const floorId = await pool.query(getId)
    return floorId.rows[0].id
}

async function createRoomTable() {
    const roomTableCreateQuery = `create table if not exists room (id serial primary key, name varchar(255), idx_floor int, geometry geometry)`;
    await pool.query(roomTableCreateQuery)
}

async function insertRoom(roomName, floorId, gis) {
    const roomTableInsertQuery = `insert into room (name, idx_floor, geometry) VALUES ('${roomName}', ${floorId}, ST_GeomFromGeoJSON('${JSON.stringify(gis)}'))`
    await pool.query(roomTableInsertQuery)
    const getId = `select id from room where name = '${roomName}'`
    console.log(getId)
    const roomId = await pool.query(getId)
    return roomId.rows[0].id
}

async function main () {
    const buildingId = await createBuildingTable()
    const floorId = await createFloorTable('E', buildingId)
    await createFloorGeomTable(floorId)
    await createRoomTable()
    await insertRoomData(floorId)

}

main()

async function insertRoomData (floorId) {
    const arrayOfFiles = fs.readdirSync("../../02_plan/geojson/E_Step/rooms")
    for (const file of arrayOfFiles) {
        if (file.endsWith('geojson')) {
            const json = JSON.parse(fs.readFileSync(`../../02_plan/geojson/E_Step/rooms/${file}`));

            let name = file.split('.')[0].replaceAll('_', ' ')
            if (name.startsWith('wc')) {name = 'WC'}

            const roomId = await insertRoom(name, floorId, json.features[0].geometry)
        }
    }
}

async function createFloorGeomTable (floor_id) {
    try {
        const arrayOfFiles = fs.readdirSync("../../02_plan/geojson/E_Step")
        await createGISTable('floor_geometry', 'idx_floor')
        for (const file of arrayOfFiles) {
            if (file.endsWith('geojson') && file != 'E_Lines.geojson' && file != 'E_polylines.geojson' ) {
                const json = JSON.parse(fs.readFileSync(`../../02_plan/geojson/E_Step/${file}`));
                let type = ""
                if (json.features[0].geometry.type == 'MultiPolygon') {
                    type = "polygon"
                } else {
                    type = "line"
                }
                await insertGisData('floor_geometry', type, json.features, 'idx_floor', floor_id)
            }
        }
    } catch(e) {
        console.log(e)
    }
}

