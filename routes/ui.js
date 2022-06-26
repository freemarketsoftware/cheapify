var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const { getTranslations } = require('../translations')

const { authenticated, second } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators');

const { getUIConfig } = require('../services/uiService')
const { getPathing } = require('../services/pathing')
const { getLocationByIp } = require('../services/geolocation')

const User = require('../models/user')
const Ad = require('../models/ad')
const City = require('../models/city')
const Category = require('../models/category')
const Domain = require('../models/domain')


router.get('/', async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig();

    const locationCookie = req.cookies.location || null
    console.log(locationCookie)
    const ip = '192.222.174.165' || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
    const locationIp = await getLocationByIp(ip)

    if (locationCookie) {
        const city = City.find({})
        // redirect to location
    }
    // else if(locationIp) {
    // redirect to location
    // } 
    else {
        // redirect to city selection
    }


    res.render('main', {
        layout: 'index', uiConfig, locale
    })

})

router.get('/search', async (req, res) => {
    var category = req.query.category;
    var city = req.query.city;
    var term = req.query.term;
})





router.get('/:category/:city', async (req, res) => {
    const locale = 'en'
    const pathing = await getPathing({
        city: req.params.city,
        category: req.params.category
    });
    const uiConfig = await getUIConfig();
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
        layout: 'index', uiConfig, ads, breadcrumbs, list_mode: true, pathing, locale
    })
})


// /:region?
// router.get('/:city', async (req, res) => {
//     const city = 'gatineau'
//     const locale = 'en'
//     const pathing = await getPathing({
//         category: req.params.category
//     });
//     const uiConfig = await getUIConfig();
//     const breadcrumbs = []
//     res.render('main', {
//         layout: 'index', uiConfig, pathing,
//         helpers: {
//             translate: function (obj) { return obj[locale]; }
//         }
//     })
// })

// router.get('/:city/:category/:ad', async (req, res) => {
//     const locale = 'en'
//     const pathing = await getPathing(req.params.city, req.params.category);
//     const uiConfig = await getUIConfig();
//     //get domain, get category, get ad to generate breadcrumbs
//     const breadcrumbs = [{}, {}]


//     res.render('explorer/ad', {
//         layout: 'index', ads, pathing,
//         helpers: {
//             translate: function (obj) { return obj[locale]; }
//         }
//     })
// })


router.get('/create', [], async (req, res) => {
    const locale = 'en'
    const uiConfig = await getUIConfig();
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
    const uiConfig = await getUIConfig();
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
    const breadcrumbs = []
    const uiConfig = await getUIConfig();

    res.render('auth/login', {
        layout: 'index', locale,
    })
})

router.get('/register', async (req, res) => {
    const locale = 'en'
    const breadcrumbs = []
    const uiConfig = await getUIConfig();

    res.render('auth/register', {
        layout: 'index', locale,
    })
})

router.get('/reset', async (req, res) => {
    const locale = 'en'
    const breadcrumbs = []
    const uiConfig = await getUIConfig();

    res.render('auth/reset', {
        layout: 'index', locale
    })
})

router.get('/logout', [authenticated], async (req, res) => {
    const locale = 'en'
    const breadcrumbs = []
    const uiConfig = await getUIConfig();

    req.session.destroy()
    res.redirect('/')
})


module.exports = router