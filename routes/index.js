var express = require('express')
var router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const User = require('../models/user')

router.get('/',  async (req, res) => {
    res.render('home', { layout: 'index', value: 'test' })
})

// Authentication

router.get('/auth/login', (req, res) => {
    res.render('auth/login', { layout: 'index', value: 'test' })
})

router.get('/auth/register', (req, res) => {
    res.render('auth/register', { layout: 'index', value: 'test' })
})

router.get('/auth/reset', (req, res) => {
    res.render('auth/reset', { layout: 'index', value: 'test' })
})

router.get('/auth/logout', [authenticated], (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router