const {parseCsv} = require("./utils");

// read the data and store it in a map
function readData(data, f) {
    const map = new Map()
    data.forEach( d => {
        const res = f(d)
        map.set(res.key, res.value)
    })
    return map
}

// prepare the data for the SQL query
function formatData (data, f) {
    let d = 'Null'
    if (data !== '') {
        d = f(data)
    }
    return d
}

// prepare the data for a string
function formatStringForSql(data) {
    return `'${data}'`
}

// read the roomInfo.csv and return a map with the data
function readRoomData(inputPath, buiding) {
    const roomData = parseCsv(`${inputPath}/${buiding}/roomInfo.csv`)
    return readData(roomData, (data) => {
        return {
            key : data[0],
            value : {
                secondName : formatData(data[2], formatStringForSql),
                type : formatData(data[3], formatStringForSql),
                surface : formatData(data[1], parseFloat),
                capacity : formatData(data[4], parseInt)
            }
        }
    })
}

module.exports = {readRoomData}
