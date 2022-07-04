const {parseCsv} = require("./utils");

function readData(data, f) {
    const map = new Map()
    data.forEach( d => {
        const res = f(d)
        map.set(res.key, res.value)
    })
    return map
}

function formatData (data, f) {
    let d = 'Null'
    if (data !== '') {
        d = f(data)
    }
    return d
}

function formatStringForSql(data) {
    return `'${data}'`
}

function readResourceData(inputPath) {
    const resourceData = parseCsv(`${inputPath}/resourceData.csv`)
    return readData(resourceData, (data) => {
        return {
            key :  data[0],
            value : {
                name : formatData(data[1], formatStringForSql),
                type :formatData( data[2], formatStringForSql),
                img : formatData(data[3], formatStringForSql)
            }
        }
    })
}



function readRoomData(inputPath, buiding) {
    const roomData = parseCsv(`${inputPath}/${buiding}/roomInfo.csv`)
    return readData(roomData, (data) => {
        return {
            key : data[0],
            value : {
                type : formatData(data[2], formatStringForSql),
                surface : formatData(data[1], parseFloat),
                capacity : formatData(data[3], parseInt)
            }
        }
    })
}

module.exports = {readRoomData, readResourceData}
