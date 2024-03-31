const mongoose = require('mongoose')

const connectDb = async () => {
    const uri = process.env.URI
    try {
        console.log(uri)
        await mongoose.connect(uri)
        console.log("connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    } 
}

module.exports = connectDb;