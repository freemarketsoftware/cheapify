var express = require('express')
var router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const User = require('../models/user')
const Project = require('../models/project')

router.get('/',  async (req, res) => {
    res.render('home', { layout: 'index', value: 'test' })
})

router.get('/auth/login', (req, res) => {
    res.render('auth/login', { layout: 'index', value: 'test' })
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', { layout: 'index', value: 'test' })
})

router.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/auth/reset', (req, res) => {
    res.render('auth/reset', { layout: 'index', value: 'test' })
})


// USER //
// Profile
// Settings
//

// PROJECTS //
// List projects
//// List quotes of project 
// Create project
// Edit project
// Close project

// MAIN PAGE //
// Search
// Dynamic result list --> Request quote --> Send to select project page / or create new project, then list companies.
// 

// SEO //
// City
// Category
// Business


// 


// PATH PROJECT //
// GET projects (SELECT, CREATE, EDIT, DELETE)
// GET/POST projects/create
// GET/POST projects/edit/:id
// POST projects/close/:id
// DELETE projects/delete/:id



//MONGO CODE 
// const existingUser = await db.get().collection('users').findOne({email: req.body.email})
// const existingUser = await db.get().collection('users').findOne({email: req.body.email})
// const insert = await db.collection('users').insertOne(user)


module.exports = router