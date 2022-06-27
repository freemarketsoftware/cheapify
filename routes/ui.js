var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const { getUIConfig } = require('../services/uiService')
const { getLocationConfig } = require('../services/locationService')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')


router.get('/', async (req, res) => {
    const location = await getLocationConfig(req)
    res.redirect(`/${location.path}`)
})

router.get('/:location/:category?', async (req, res) => {
    const locale = extractLocale()
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const pathLocation = req.params.location
    const pathCategory = req.params.category

    if(pathCategory) {
        // render category filtered with city
    } else {
        // render city without category filter
        res.render('main', {
            layout: 'index', uiConfig, locale, location
        })

    }


})

router.get('/search', async (req, res) => {
    var category = req.query.category;
    var city = req.query.city;
    var term = req.query.term;
})





router.get('/:category/:city', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []
    // const translations = { ...getTranslations('LISTINGS'), ...getTranslations('AD'), ...getTranslations('HEADER') }

    let selectedCategory = null
    selectedCategory = await Category.findOne({ path: req.params.categoryordomain }).lean()
    if (!selectedCategory) {
        selectedCategory = await Domain.findOne({ path: req.params.categoryordomain }).lean()
        if (!selectedCategory)
            return res.status(404)
    }

    let ads = null
    if (selectedCategory.domain) {
        // Category
        const interimDomain = await Domain.findOne({ _id: selectedCategory.domain }).lean()
        breadcrumbs.push(
            { path: `/${req.params.city}/${interimDomain.path}/`, name: interimDomain.name },
            { path: `/${req.params.city}/${selectedCategory.path}/`, name: selectedCategory.name }
        )

        ads = await Ad.find({}).lean()
    } else {
        // Domain
        breadcrumbs.push({ path: '/category/' + selectedCategory.path, name: selectedCategory.name })
        ads = await Ad.find({}).lean()
    }


    ads = [
        {
            name: 'Selling my piano',
            path: 'selling-my-piano',
            description: `Hi, I\'m selling my piano as I have no more place in my home,
                        great condition, one cord broke last year`,
            price: `50`,
            imgs: [`https://commons.wikimedia.org/wiki/File:Piano_Pleyel_en_la_Casa_de_las_B%C3%B3vedas.jpg?uselang=fr`,
                `https://commons.wikimedia.org/wiki/File:Pianoforte_Cristofori_1720.jpg?uselang=fr`],
            category: `Music instruments`,
            email: `bobthesellet@gmail.com`,
            phone: `819-333-4432`,
            owner: `Bob the seller`
        }
    ]


    res.render('explorer/list', {
        layout: 'index', uiConfig, ads, breadcrumbs, list_mode: true, locale
    })
})


// /:region?
// router.get('/:city', async (req, res) => {
//     const city = 'gatineau'
//     const locale = 'en'
//     const uiConfig = await getUIConfig();
//     const breadcrumbs = []
//     res.render('main', {
//         layout: 'index', uiConfig,
//         helpers: {
//             translate: function (obj) { return obj[locale]; }
//         }
//     })
// })

// router.get('/:city/:category/:ad', async (req, res) => {
//     const locale = 'en'
//     const uiConfig = await getUIConfig();
//     //get domain, get category, get ad to generate breadcrumbs
//     const breadcrumbs = [{}, {}]


//     res.render('explorer/ad', {
//         layout: 'index', ads,
//         helpers: {
//             translate: function (obj) { return obj[locale]; }
//         }
//     })
// })

//refactor with uiConfig
router.get('/create', [], async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = [{}, {}]
    // const user = await User.findOne({ email: req.session.user.email })
    const categories = await Category.find({}).lean()
    const domains = await Domain.find({}).lean()
    const translations = { ...getTranslations('CREATE'), ...getTranslations('AD'), ...getTranslations('HEADER') }
    res.render('ads/create', {
        layout: 'index', translations, breadcrumbs, categories, domains, uiConfig,
        locale
    })
})

router.get('/edit/:id', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []

    const translations = { ...getTranslations('EDIT'), ...getTranslations('AD'), ...getTranslations('HEADER') }



    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id })
    res.render('ads/edit', {
        layout: 'index', locale
    })
})


// Authentication

router.get('/login', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []

    res.render('auth/login', {
        layout: 'index', locale, uiConfig, location
    })
})

router.get('/register', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []

    res.render('auth/register', {
        layout: 'index', locale, uiConfig, location
    })
})

router.get('/reset', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []

    res.render('auth/reset', {
        layout: 'index', locale, uiConfig, location
    })
})

router.get('/logout', [authenticated], async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocationConfig(req)
    const breadcrumbs = []

    req.session.destroy()
    res.redirect('/')
})


module.exports = router