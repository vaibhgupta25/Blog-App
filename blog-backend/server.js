const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectDb = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const { errorResponseHandler, invalidPathHandler } = require('./middlewares/errorHandlerMiddleware')

require("dotenv").config()
const app = express();
connectDb();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("server is running");
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(invalidPathHandler)
app.use(errorResponseHandler)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(PORT)
    console.log("listening")
})