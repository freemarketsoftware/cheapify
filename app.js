require('dotenv').config({ path: './.dev.env' })
const express = require('express')

const mongoose = require('mongoose')
const db = require('./db')
const mongo_uri = process.env.MONGO_URI

const cors = require('cors')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')

const { engine } = require('express-handlebars')

const routes = require('./routes/index')
const authRoutes = require('./routes/auth')

// SERVER
const app = module.exports = express() 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 72 },
    resave: false
}))
app.use(cookieParser())

// ROUTING
app.use('/', routes)
app.use('/', authRoutes)

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
