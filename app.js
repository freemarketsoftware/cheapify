require('dotenv').config({ path: './.dev.env' })
const express = require('express')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const mongoose = require('mongoose')
const db = require('./db')
const mongo_uri = process.env.MONGO_URI

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

const filePath = "./data/file.txt";

const params = {
    Bucket: 'cheapify-dev',
    Body: fs.createReadStream(filePath),
    Key: "folder/" + Date.now() + "_" + path.basename(filePath)
}

// s3.upload(params, function (err, data) {
//     if (err) {
//         console.log("Error", err)
//     }
//     if (data) {
//         console.log("Uploaded in:", data.Location)
//     }
// })

const cors = require('cors')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')

const { engine } = require('express-handlebars')

const routes = require('./routes/index')
const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')

// SERVER
const app = module.exports = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 72 },
    resave: false
}))
app.use(cookieParser())

// ROUTING
app.use('/', routes)
app.use('/', authRoutes)
app.use('/', projectRoutes)

// DATABASE
mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', () => {

})
db.set(connection)

// UI ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'alt',
    partialsDir: __dirname + '/views/partials/',
}))
app.set('view engine', 'hbs')


app.listen(3000)
