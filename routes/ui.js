var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const { getUIConfig } = require('../services/uiService')
const { isLocaleValid } = require('../services/localeService')
const { getLocation, getLocationByPath } = require('../services/locationService')
const { getCategory } = require('../services/categoryService')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')





router.get('/:locale/create', [], async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = [{}, {}]
    // const categories = await Category.find({}).lean()
    // const domains = await Domain.find({}).lean()
    const translations = { ...getTranslations('CREATE'), ...getTranslations('AD'), ...getTranslations('HEADER') }
    res.render('ads/create', {
        layout: 'index', translations, breadcrumbs, uiConfig, locale: req.params.locale
    })
})

router.get('/:locale/edit/:id', async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = []

    const translations = { ...getTranslations('EDIT'), ...getTranslations('AD'), ...getTranslations('HEADER') }

    // const user = await User.findOne({ email: req.session.user.email })
    // const project = await Project.findOne({ _id: req.params.id })
    res.render('ads/edit', {
        layout: 'index', locale: req.params.locale
    })
})


// Authentication

router.get('/:locale/login', async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = []

    res.render('auth/login', {
        layout: 'index', locale, uiConfig, location, locale: req.params.locale
    })
})

router.get('/:locale/register', async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = []

    res.render('auth/register', {
        layout: 'index', locale, uiConfig, location, locale: req.params.locale
    })
})

router.get('/:locale/reset', async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = []

    res.render('auth/reset', {
        layout: 'index', locale, uiConfig, location, locale: req.params.locale
    })
})

router.get('/logout', [authenticated], async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig()
    const location = await getLocation(req)
    const breadcrumbs = []

    req.session.destroy()
    res.redirect('/')
})


router.get('/:locale?', async (req, res) => {
    const location = await getLocation(req)
    const locale = isLocaleValid(req.params.locale) ? req.params.locale : 'en'
    res.redirect(`/${locale}/ads/${location.path}`)
})


router.get('/:locale/ads/:location/:category?', async (req, res) => {
    // --> middleware
    const validLocale = isLocaleValid(req.params.locale)
    if (!validLocale) {
        return res.status(404).json({ message: 'Invalid locale' })
    }

    // --> middleware
    const validLocation = await getLocationByPath(req)
    if (!validLocation) {
        return res.status(404).json({ message: 'Invalid location' })
    }

    // --> middleware
    let validCategory = null
    if (req.params.category) {
        validCategory = await getCategory(req.params.category);
        // Check domains
        if (!validCategory) {
            return res.status(404).json({ message: 'Invalid category' })
        }
    }
    const uiConfig = await getUIConfig()
    res.setHeader('Set-Cookie', `location=${validLocation.path}; path=/`);


    if (validCategory) {
        // render category filtered with city
        // res.render('main', {
        //     layout: 'index', uiConfig, locale, location
        // })
        res.render('main', {
            layout: 'index', uiConfig, locale: req.params.locale, location: validLocation
        })
    } else {
        // render city without category filter
        res.render('main', {
            layout: 'index', uiConfig, locale: req.params.locale, location: validLocation
        })
    }
})



// router.get('/:locale/:location/search', async (req, res) => {
//     const locale = isLocaleValid(req.params.locale) ? req.params.locale : 'en'
//     var category = req.query.category;
//     var city = req.query.city;
//     var term = req.query.term;
// })

// router.get('/:category/:city', async (req, res) => {
//     const locale = isLocaleValid(req.params.locale) ? req.params.locale : 'en'
//     const uiConfig = await getUIConfig()
//     const location = await getLocation(req)
//     const breadcrumbs = []
//     // const translations = { ...getTranslations('LISTINGS'), ...getTranslations('AD'), ...getTranslations('HEADER') }

//     let selectedCategory = null
//     selectedCategory = await Category.findOne({ path: req.params.categoryordomain }).lean()
//     if (!selectedCategory) {
//         selectedCategory = await Domain.findOne({ path: req.params.categoryordomain }).lean()
//         if (!selectedCategory)
//             return res.status(404)
//     }

//     let ads = null
//     if (selectedCategory.domain) {
//         // Category
//         const interimDomain = await Domain.findOne({ _id: selectedCategory.domain }).lean()
//         breadcrumbs.push(
//             { path: `/${req.params.city}/${interimDomain.path}/`, name: interimDomain.name },
//             { path: `/${req.params.city}/${selectedCategory.path}/`, name: selectedCategory.name }
//         )

//         ads = await Ad.find({}).lean()
//     } else {
//         // Domain
//         breadcrumbs.push({ path: '/category/' + selectedCategory.path, name: selectedCategory.name })
//         ads = await Ad.find({}).lean()
//     }


//     ads = [
//         {
//             name: 'Selling my piano',
//             path: 'selling-my-piano',
//             description: `Hi, I\'m selling my piano as I have no more place in my home,
//                         great condition, one cord broke last year`,
//             price: `50`,
//             imgs: [`https://commons.wikimedia.org/wiki/File:Piano_Pleyel_en_la_Casa_de_las_B%C3%B3vedas.jpg?uselang=fr`,
//                 `https://commons.wikimedia.org/wiki/File:Pianoforte_Cristofori_1720.jpg?uselang=fr`],
//             category: `Music instruments`,
//             email: `bobthesellet@gmail.com`,
//             phone: `819-333-4432`,
//             owner: `Bob the seller`
//         }
//     ]


//     res.render('explorer/list', {
//         layout: 'index', uiConfig, ads, breadcrumbs, list_mode: true, locale
//     })
// })


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

module.exports = router