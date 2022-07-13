

function createTable(dbName) {
    let create = `\\connect ${dbName}\n`
    create += `CREATE EXTENSION postgis;\n`
    create += createBuildingTable()
    create += createFloorTable()
    create += createFloorGeometryTable()
    create += createRoomTable()
    create += createResourceTable()
    return create
}

function createBuildingTable() {
    return `CREATE TABLE IF NOT EXISTS building ( 
    id SERIAL PRIMARY KEY,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    ground_floor VARCHAR(6) NOT NULL,
    rotation FLOAT NOT NULL,
    zoom INT NOT NULL,
    min_zoom INT NOT NULL,
    max_zoom INT NOT NULL,
    name VARCHAR(255)
);\n`
}

function createFloorTable() {
    return `CREATE TABLE IF NOT EXISTS floor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    idx_building INT NOT NULL,
    CONSTRAINT fk_building
        FOREIGN KEY(idx_building)
            REFERENCES building(id)
            ON DELETE CASCADE
);\n`
}

function createFloorGeometryTable() {
    return `CREATE TABLE IF NOT EXISTS floor_geometry (
    id SERIAL PRIMARY KEY,
    idx_floor INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    geom GEOMETRY NOT NULL,
    CONSTRAINT fk_floor
        FOREIGN KEY(idx_floor)
            REFERENCES floor(id)
            ON DELETE CASCADE
);\n`
}

function createRoomTable() {
    return `CREATE TABLE IF NOT EXISTS room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    second_name VARCHAR(255),
    type VARCHAR(255),
    surface FLOAT,
    capacity INT,
    idx_floor INT NOT NULL,
    geometry GEOMETRY,
    CONSTRAINT fk_floor
        FOREIGN KEY(idx_floor)
            REFERENCES floor(id)
            ON DELETE CASCADE
);\n`
}

function createResourceTable() {
    return `CREATE TABLE IF NOT EXISTS resource (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    idx_building INT NOT NULL,
    idx_floor INT,
    idx_room INT,
    localisation GEOMETRY,
    CONSTRAINT fk_buildind
        FOREIGN KEY(idx_building)
            REFERENCES building(id)
            ON DELETE SET NULL,
    CONSTRAINT fk_floor
        FOREIGN KEY(idx_floor)
            REFERENCES floor(id)
            ON DELETE SET NULL,
    CONSTRAINT fk_room
        FOREIGN KEY(idx_room)
            REFERENCES room(id)
            ON DELETE SET NULL
);\n`
}

module.exports = {createTable}
