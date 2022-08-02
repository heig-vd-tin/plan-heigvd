const fs = require('fs')

// write a sql file
function write(outputPath, filename, content) {
    fs.writeFile(`${outputPath}/${filename}.sql`, content, 'utf8', err => {
        if (err) {
            console.error(err);
        }
    })
}

// read a csv file
function parseCsv(path) {
    const file = fs.readFileSync(path).toString()
    const lines = file.split('\r\n')
    const datas =  lines.map(line => line.split(','))
    return datas
}


module.exports = {write, parseCsv}
