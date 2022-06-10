var express = require('express')
var router = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { getTranslations } = require('../translations')

const { authenticated } = require('../middlewares/authenticated')
const { registrationValidator, loginValidator } = require('../helpers/validators')

const User = require('../models/user')
const Ad = require('../models/ad')


router.get('/ads', async (req, res) => {
    // const projects = await Project.find({owner: req.session.user._id}).lean()

    const ads = [{
        title: 'asdasdMy first project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'asdasdMy second project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'open'
    },
    {
        title: 'asdasdMy third project',
        description: 'asdasdI want to build a complete deck around my house',
        status: 'closed'
    }]

    res.render('ads/ads', { layout: 'index', ads })
})


router.get('/ads/:id', async (req, res) => {

    res.render('ads/ads', { layout: 'index', ads })
})


router.get('/ads/create', [], async (req, res) => {
    // const user = await User.findOne({ email: req.session.user.email })
    const user = await User.findOne({ email: 'asdasd@gmail.com' })
    const ad = new Ad({
        owner: user._id,
    })
    const translations = {...getTranslations('CREATE'), ...getTranslations('AD'), ...getTranslations('HEADER')}
    const adSaved = await ad.save()
    user.ads.push(adSaved)
    const userSaved = await user.save()
    res.render('ads/create', { layout: 'index', adId: ad._id, translations, breadcrumbs: 'Hello' })
})

router.get('/ads/edit/:id', async (req, res) => {
    const translations = {...getTranslations('EDIT'), ...getTranslations('AD'), ...getTranslations('HEADER')}

    const user = await User.findOne({ email: req.session.user.email })
    const project = await Project.findOne({ _id: req.params.id })
    console.log(project)
    res.render('ads/edit', { layout: 'index', data: '' })
})


router.post('/ads/create', upload.array('pictures', 8), async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const ad = new Ad({
        owner: user._id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    })
    console.log(ad)
    console.log(req.files)
    return res.status(200).json({ valid: true })
})

router.post('/ads/edit/:id', async (req, res) => {
    const user = await User.findOne({ email: req.session.user.email })
    const ad = await Ad.findOne({ _id: req.params.id })
    if (ad && ad.owner === user._id) {
        ad.title = req.body.title
        ad.description = req.body.description
        await ad.save()
        return res.status(200).json({ valid: true })
    }
    //if(user owns project)
    // const project = Project.findOne({_id: req.param.id})
    return res.status(401).json({ valid: false })
})

module.exports = router

