const fs = require('fs')
const {createTable} = require("./util/tableCreation");
const {write} = require("./util/utils");
const {insertDataIntoTables} = require("./util/dataInsertion");

function main () {
    if (process.argv.length !== 5) {
        throw 'command : node index.js <input path> <output path> <database Name>'
    }

    const inputPath = process.argv[2]   // '../../02_plan/geojson'
    const outputPath = process.argv[3] // '../../04_deploy/sql'
    const dbName =  process.argv[4]    // 'plan'

    const init = `CREATE DATABASE ${dbName} WITH OWNER "postgres"  ENCODING 'UTF8';`
    write(outputPath, '01_init', init)

    const create = createTable(dbName)
    write(outputPath,'02_create', create)

    const insert = insertDataIntoTables(inputPath, dbName)
    write(outputPath, '03_insert', insert)
    // console.log(insert)
}

main()
