var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const { getConfig } = require('../helpers/ui')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')



router.get('/home',  async (req, res) => {
    res.render('home', { layout: 'index', value: 'test' })
})


router.get('/ads/:city/:category', async (req, res) => {
    const translations = {...getTranslations('LISTINGS'), ...getTranslations('AD'), ...getTranslations('HEADER')}
    const uiConfig = getConfig();
    const category = await Category.findOne({id: req.params.category})
    const city = await City.findOne({id: req.params.city})

    if(!category || !city) {
        return
    }

    const ads = await Ad.find({category, city})

    console.log(req.params.category)
    console.log(req.params.city)


    res.render('ads/list', { layout: 'index', ads })
})


router.get('/ad/:id', async (req, res) => {
    const uiConfig = getConfig();

    res.render('ads/ad', { layout: 'index', ads })
})


router.get('/create', [], async (req, res) => {
    // const user = await User.findOne({ email: req.session.user.email })
    const uiConfig = getConfig();

    const locale = 'fr'
    const categories = await Category.find({}).lean()
    const domains = await Domain.find({}).lean()
    const translations = { ...getTranslations('CREATE'), ...getTranslations('AD'), ...getTranslations('HEADER') }
    res.render('ads/create', {
        layout: 'index', translations, breadcrumbs: ['Home', 'Create'], categories, domains,
        helpers: {
            translate: function (obj) { return obj[locale]; }
        }
    })
})

router.get('/edit/:id', async (req, res) => {
    const translations = { ...getTranslations('EDIT'), ...getTranslations('AD'), ...getTranslations('HEADER') }
    const uiConfig = getConfig();



    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id })
    res.render('ads/edit', { layout: 'index', data: '' })
})


// Authentication

router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'index', value: 'test' })
})

router.get('/register', (req, res) => {
    res.render('auth/register', { layout: 'index', value: 'test' })
})

router.get('/reset', (req, res) => {
    res.render('auth/reset', { layout: 'index', value: 'test' })
})

router.get('/logout', [authenticated], (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router