require('dotenv').config({ path: './.dev.env' })
const express = require('express')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const geolib = require('geolib');

const mongoose = require('mongoose')
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

const uiRoutes = require('./routes/ui')
const authRoutes = require('./routes/auth')
const adsRoutes = require('./routes/ads')

const handlebarsHelpers = require('./helpers/handlebarsHelpers')

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';

// SERVER
const app = module.exports = express()

// Setup CORS requests based on environment
if (env === 'development') {
    app.use(cors({
        origin: 'http://localhost:19006',
        credentials: true,
    }));
  } else {
    app.use(
      cors({
        origin: 'https://website.com',
        credentials: true,
      }),
    );
  }

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

app.options('*', cors());

// ROUTING
app.use('/', uiRoutes)
app.use('/auth', authRoutes)
app.use('/ads', adsRoutes)

// DATABASE
mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', () => {})

// UI ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'alt',
    partialsDir: __dirname + '/views/partials/',
    helpers: handlebarsHelpers
}))
app.set('view engine', 'hbs')


// hbs.handlebars.registerHelper('increasePrice', function(price) {
//   price+=10;
//   return price;
// })

app.listen(port)
