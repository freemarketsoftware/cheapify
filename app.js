require('dotenv').config({ path: './.dev.env' })
const mongo_uri = process.env.MONGO_URI
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const { engine } = require('express-handlebars')

const routes = require('./routes/index');

// SERVER
const app = module.exports = express() 
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// ROUTING
app.use('/', routes)


// DATABASE
mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once("open", () => {})

// UI ENGINE
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'alt',
    partialsDir: __dirname + '/views/partials/',
}))
app.set('view engine', 'hbs')





app.listen(3000)