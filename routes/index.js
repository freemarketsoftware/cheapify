var express = require('express')
var router = express.Router()
const db = require('../db')
const { registrationValidator, loginValidator } = require('../helpers/validators');
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Project = require('../models/project')

router.get('/', async (req, res) => {
    // console.log(await db.get().collection('cities').find().toArray())
    console.log(req.session)
    res.render('home', { layout: 'index', value: 'test' })
})


router.get('/auth/login', (req, res) => {
    res.render('auth/login', { layout: 'index', value: 'test' })
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', { layout: 'index', value: 'test' })
})

router.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/auth/reset', (req, res) => {
    res.render('auth/reset', { layout: 'index', value: 'test' })
})


router.get('/projects/list', (req, res) => {
    // const projects = 

    res.render('/projects/list', { layout: 'index', value: 'test' })
})

router.get('/projects/create', (req, res) => {
    res.render('projects/create', { layout: 'index', value: 'test' })
})

router.get('/projects/edit/:id', (req, res) => {
    res.render('projects/edit', { layout: 'index', value: 'test' })
})

// POST


// DELETE



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