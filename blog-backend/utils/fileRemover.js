const fs = require('fs')
const path = require('path')

const fileRemover = (filename, next) => {
    fs.unlink(path.join(__dirname, '../uploads', filename), (error, next) => {
        if (error && error.code === 'ENOENT') {
            console.log(`file ${filename} doesn't exist!`)
        } else if (error) {
            console.log("error occured while removing the file")
        }
    })
}

module.exports = fileRemover;